# Protocolo de cambio de cuenta

> El operador, 2026-11-12: cuando los tokens de una cuenta de Claude se acaban a mitad de semana, el trabajo sigue en la otra cuenta,
> justo donde se quedó, y luego vuelve. *«nunca quiero trabajarlas en simultáneo en el mismo proyecto, es para relevo, solo que quiero
> que el relevo sea sin fricción»*. Lo escribió la cabina de LECCIONES el mismo día.

## Lo fijo

- **Dos cuentas, nunca a la vez:** la **principal** y la **suplementaria**. La app de escritorio tiene una sola cuenta abierta: eso
  garantiza que no trabajen las dos.
- **La PC es la máquina de trabajo** (PC-Chris). La laptop y el celular solo la manejan a distancia, con Remote Control o Chrome
  Remote Desktop. Así el operador puede salir y apagar la laptop sin frenar nada (su razón, 12-nov).
- **Un solo usuario de Windows.** Las dos cuentas ven el mismo disco: los repos, `_scratch`, los worktrees de los carriles y la
  memoria de la cabina (`C:\Users\chris\.claude\projects\C--Users-chris-Documents-AIW-Workspace\memory\`). Lo único que cambia es la
  conversación y quién paga los tokens.
- **La verdad está en git, no en la conversación.** Lo que no está en GitHub no cuenta como hecho.
- **Esta carpeta:**
  - `HANDOFF.md` se reescribe en cada cambio; git guarda los anteriores;
  - `sincronia.mjs` revisa que todo esté en GitHub;
  - `ramas-integradas.txt` lista las ramas locales ya revisadas.

## 1. Cierre: la cuenta que se va

Empieza cuando el operador escribe «protocolo para cambiar de cuenta», o cuando la cabina ve el tope semanal en 90 % o más
(`get_usage`) y se lo avisa.

1. No se abre ningún encargo nuevo. Cada carril termina la lección en la que está, con su commit y su relevo; lo que no alcance a
   terminar se commitea tal cual en su rama y se dice en el handoff.
2. La cabina integra y publica lo entregado, y corre `pendientes.mjs`.
3. Corre `node projects/aiw-console/context/cambio-de-cuenta/sincronia.mjs` desde `AIW_Workspace` hasta que diga **EN ORDEN**:
   - una rama de carril sin integrar se integra, o se nombra en el handoff;
   - votos sin sincronizar: se le pide al operador «Sincronizar». La cabina nunca escribe en `respuestas.*`.
4. Reescribe `HANDOFF.md`:
   - de qué cuenta a cuál, la hora (`date`) y el resultado de `sincronia.mjs`;
   - por cabina: hecho y en GitHub, en curso, lo que sigue y lo que espera del operador.
5. Commit de `HANDOFF.md` por ruta y push. Se empuja solo si `origin/main..HEAD` trae únicamente ese commit.
6. Le dice al operador «listo, puedes cambiar». Desde ahí **no hace nada más**: espera a que el operador vuelva y escriba «ya volví,
   revisa la carpeta del protocolo».

**Si los tokens se acaban de golpe,** antes del cierre: el relevo se escribe tras cada tanda y los carriles hacen un commit por
lección. La cuenta que llega encuentra lo que quedó a medias con `sincronia.mjs` y sigue desde ahí; no lo rehace.

## 2. El cambio: lo hace el operador

En la PC, o desde fuera con Chrome Remote Desktop:

1. En la app de Claude, cerrar sesión desde el menú de la cuenta.
2. Entrar con la otra cuenta. Las credenciales las pone el operador; ninguna cabina las toca.
3. Abrir la cabina:
   - la primera vez en esa cuenta, pestaña Code, sesión nueva en `C:\Users\chris\Documents\AIW_Workspace`, y pegar el prompt de
     abajo;
   - las siguientes, abrir la sesión de la cabina que ya existe en esa cuenta y escribir «ya volví, revisa la carpeta del protocolo».
4. Si va a seguir fuera, activar Remote Control en esa sesión. En la laptop o el celular, claude.ai con la misma cuenta.

## 3. Arranque: la cuenta que llega

Antes de tocar nada:

1. Lee `HANDOFF.md` y este protocolo.
2. Lee lo de su cabina: en LECCIONES, `projects/aiw-console/context/cabinas/lecciones/CLAUDE.md` y el relevo
   `projects/aiw-console/context/handoffs/cantu-lessons.md`.
3. Corre `sincronia.mjs`, y en LECCIONES también `pendientes.mjs`. Con eso compara lo que dice el handoff con lo que hay en git.
4. Le dice al operador, en una tabla, dónde estamos y qué haría primero, y espera su «adelante».
5. **Nada se rehace sin mirar antes `git log origin/main`.**

**Los carriles:** sus sesiones son de la cuenta que las abrió y no aparecen en la otra. La cabina que llega abre las suyas, desde el
Arranque y el relevo de cada carril (`cantu-lessons/docs/carriles/CR-*.md`). Si el operador escribe por Remote Control, la app no deja
abrir sesiones: entonces va como agente de fondo de la cabina, o se le pide al operador que escriba desde la app de la PC.

## El prompt de la primera vez en una cuenta

```text
Eres la cabina de LECCIONES (CL_Cabina) del workspace AIW. Trabajas en otra cuenta de Claude, pero en la misma PC y en las mismas carpetas que la otra cuenta: nunca trabajan las dos a la vez. Antes de hacer nada:
1. Lee projects/aiw-console/context/cambio-de-cuenta/PROTOCOLO.md y sigue su «3. Arranque».
2. Lee projects/aiw-console/context/cambio-de-cuenta/HANDOFF.md: ahí está dónde nos quedamos y qué sigue.
3. Lee projects/aiw-console/context/cabinas/lecciones/CLAUDE.md y el relevo projects/aiw-console/context/handoffs/cantu-lessons.md.
4. Corre node projects/aiw-console/context/cambio-de-cuenta/sincronia.mjs desde AIW_Workspace.
Luego dime en una tabla dónde estamos y qué harías primero, y espera mi «adelante». No rehagas nada que ya esté en git. Cuando te escriba «protocolo para cambiar de cuenta», haz el «1. Cierre» y espera a que vuelva.
```

## Otras cabinas

La app cambia de cuenta para todas sus sesiones. Si en el momento del cambio trabaja otra cabina (phd-p2, Acervo, CQL, landing…),
cada una deja su apartado en `HANDOFF.md` con el mismo cierre. `sincronia.mjs` lista sus repos, pero solo los de LECCIONES bloquean el
cambio.
