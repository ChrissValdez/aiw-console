# Una cabina a la laptop, con la otra cuenta, mientras la PC sigue

> El operador, 2026-11-18, ~17:50: *«ayudame a hacer el relevo de cuenta para otro proyecto … es para MC-Landing page … quiero ahi
> hacer protocolo de cambio de cuenta para no usarlo aqui sino en la otra cuenta en la laptop y dejar esto trabajando hasta que acabe
> las lecciones»*. Lo escribió la cabina de LECCIONES el mismo día. Es una variante de `PROTOCOLO.md`; lo que no diga aquí, vale de
> allá.

## Lo que cambia respecto a `PROTOCOLO.md`

- **Las dos cuentas trabajan a la vez, pero nunca en el mismo proyecto ni en la misma máquina:**

  | máquina | cuenta | cabina | repos que escribe |
  |---|---|---|---|
  | PC-Chris | la de siempre (principal) | LECCIONES y sus carriles | `cantu-lessons`, `cantu-revisiones`, `aiw-console` (lo de LECCIONES) |
  | Laptop | la otra (suplementaria) | LANDING | `metodo-cantu-landing`, `aiw-console` (solo lo de LANDING) |

  Sigue en pie la regla del operador: *«nunca quiero trabajarlas en simultáneo en el mismo proyecto»*.
- **La sesión LANDING de la PC se cierra** (cierre de abajo) y no se usa mientras la laptop trabaja. La landing vive en la laptop hasta
  que vuelva con el mismo cierre.
- **La laptop no ve la memoria de la PC** (`C:\Users\chris\.claude\…\memory\`). Todo lo que LANDING necesita ya está escrito en sus
  ficheros, medido el 18-nov: una sola versión por ronda (CLAUDE.md, 1), nunca subir código con la sesión de Moodle abierta (6), lo
  que revisa va al repo y nunca a `_scratch` (8), nunca Fable (9) y el tono académico, no «retro» (relevo).

## Lo compartido: `aiw-console`

Las dos máquinas empujan a `aiw-console`. Para no chocar:
- **LANDING escribe solo lo suyo:** `context/cabinas/landing/`, `context/handoffs/metodo-cantu-landing.md` y sus veredictos.
  LECCIONES no toca esas rutas.
- **Commit por ruta, y antes de empujar:** `git pull --rebase origin main`. Se empuja solo si `origin/main..HEAD` trae únicamente lo
  propio (D-081, 2.ª enmienda).
- Si el push choca, se repite `pull --rebase` y push. Nunca `--force`.

## 1. Cierre, en la PC (la sesión LANDING de ahora)

El operador le escribe a la cabina LANDING:

```text
protocolo para cambiar de cuenta: la landing pasa a la laptop con la otra cuenta. Lee aiw-console/context/cambio-de-cuenta/OTRA-CABINA-EN-LAPTOP.md y haz su «1. Cierre».
```

La cabina LANDING:
1. No abre nada nuevo. Termina lo que tenga a medias o lo commitea tal cual, y lo dice en el relevo.
2. Reescribe su relevo (`context/handoffs/metodo-cantu-landing.md`) con la hora (`date`), «pasa a la laptop, cuenta suplementaria», lo
   hecho, lo que sigue y lo que espera del operador.
3. Commit y push en `metodo-cantu-landing` y en `aiw-console` (como arriba). Comprueba en los dos: `git status` limpio y `HEAD` igual a
   `origin/main`.
4. Dice «listo, puedes cambiar a la laptop» con los dos sha, y desde ahí **no hace nada más**.

## 2. La laptop, lo hace el operador

1. **Enchufada y sin suspenderse:** si la laptop se duerme, la sesión se para. En Windows, Configuración → Sistema → Inicio/apagado y
   suspensión → «Al estar enchufado, suspender: Nunca», y la tapa abierta (o «Al cerrar la tapa: no hacer nada»).
2. **Los repos al día**, en la misma estructura que la PC (`Documents\AIW_Workspace\projects\…`), para que las rutas de los ficheros
   valgan:
   - si ya están: `git pull` en `metodo-cantu-landing` y en `aiw-console`;
   - si no: `git clone` de los dos desde GitHub dentro de `AIW_Workspace\projects\`. Las credenciales de GitHub las pone el operador.
3. **Claude, con la otra cuenta:** abrir la app, entrar con la cuenta suplementaria, pestaña Code, sesión nueva en la carpeta
   `AIW_Workspace` de la laptop, y pegar el prompt de abajo. Las siguientes veces, abrir esa misma sesión y escribir «ya volví, revisa
   el relevo».

## 3. El prompt de la primera vez en la laptop

```text
Eres la cabina LANDING del workspace AIW (la landing de metodocantu.com, repo Metodo_Cantu/metodo-cantu-landing). Trabajas en la laptop con la otra cuenta de Claude, mientras la PC sigue con LECCIONES en la cuenta principal: nunca tocas lo de LECCIONES. Antes de hacer nada:
1. Lee aiw-console/context/cambio-de-cuenta/OTRA-CABINA-EN-LAPTOP.md.
2. Lee enteros aiw-console/context/cabinas/landing/CLAUDE.md y aiw-console/context/cabinas/REGLAS-DE-CABINA.md.
3. Lee tu relevo aiw-console/context/handoffs/metodo-cantu-landing.md.
4. Haz git pull en metodo-cantu-landing y en aiw-console, y compara el relevo con el disco: gana el disco.
Luego dime en una tabla dónde estamos y qué harías primero, y espera mi «adelante». En aiw-console escribe solo lo tuyo, commit por ruta y git pull --rebase antes de cada push. Cuando te escriba «protocolo para cambiar de cuenta», haz el «1. Cierre» de ese fichero y espera.
```

## 4. Volver a la PC

El mismo «1. Cierre», ahora en la laptop. Después, en la PC, la sesión LANDING de siempre: «ya volví, revisa el relevo»; hace
`git pull` en los dos repos antes de tocar nada.
