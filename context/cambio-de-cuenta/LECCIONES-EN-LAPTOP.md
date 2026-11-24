# LECCIONES en la laptop, con la cuenta de pato

> El operador, 2026-11-19, 02:15: *«hazlo como promtp nuevo para abrirlo si desde la cuenta de pato, pero en la Laptop y no en la PC,
> se podra?»*. Lo escribió la cabina de LECCIONES de la cuenta principal, en la PC, tras su cierre (`HANDOFF.md`, 02:08). Es una
> variante de `PROTOCOLO.md`: lo que no diga aquí, vale de allá.

## Se puede, con dos condiciones

1. **La PC no corre LECCIONES mientras tanto.** Sigue la regla *«nunca quiero trabajarlas en simultáneo en el mismo proyecto»*. La
   sesión de LECCIONES de la principal en la PC se queda esperando.
2. **La laptop pasa a ser la máquina de trabajo:** enchufada, sin suspenderse (Configuración → Sistema → Inicio/apagado y suspensión
   → «Al estar enchufado, suspender: Nunca») y con la tapa abierta. Si se duerme, la sesión se para.

**Lo que la laptop no tiene de la PC** (no está en git):
- **`_scratch`:** las herramientas de los carriles (`turno.sh`, generadores), los worktrees y los registros de la guarda del desborde
  (`lecciones/*/_generado/slide-mazo.desborde.json`). Las de la cabina (`publicar-galeria.mjs`, `vigilar-votos.mjs`,
  `guarda-copiar.mjs`) ya están en git, en `context/cabinas/lecciones/herramientas/cabina/`.
- **La memoria de la cabina,** que vive en `C:\Users\chris\.claude\…\memory\` de la PC. Lo esencial ya está en el CLAUDE.md de la
  cabina, en REGLAS-DE-CABINA y en el relevo.
- **Puede faltar:** `aiw-console` clonado, `node_modules` de `tools/render`, o Chrome en otra ruta. El arranque de abajo lo mide antes
  de trabajar.

**Lo más simple, si no hace falta llevarse el trabajo:** entrar con la cuenta de pato **en la PC** y manejarla desde la laptop con
Remote Control (`PROTOCOLO.md`, §2). Así no se instala nada.

## Lo que hace el operador en la laptop

1. Enchufarla y ponerla sin suspensión (arriba).
2. En `Documents\AIW_Workspace\projects\`, `git pull` en `cantu-lessons`, `cantu-revisiones` y `aiw-console`, o `git clone` de los
   que falten. Las credenciales de GitHub las pone el operador.
3. En la app de Claude, entrar con la cuenta de pato, pestaña Code, **sesión nueva** en la carpeta `AIW_Workspace` de la laptop, y
   pegar el prompt de abajo.

## El prompt

```text
Eres la cabina de LECCIONES (CL_Cabina) del workspace AIW. Trabajas en la LAPTOP con la cuenta de pato; la PC, con la cuenta principal, queda en espera y no toca LECCIONES mientras tú trabajes. Antes de hacer nada:
1. Lee aiw-console/context/cambio-de-cuenta/LECCIONES-EN-LAPTOP.md, PROTOCOLO.md (su «3. Arranque») y HANDOFF.md de esa carpeta.
2. Lee enteros aiw-console/context/cabinas/lecciones/CLAUDE.md, aiw-console/context/cabinas/REGLAS-DE-CABINA.md y el relevo aiw-console/context/handoffs/cantu-lessons.md.
3. Haz git pull en cantu-lessons, cantu-revisiones y aiw-console, y compara el HANDOFF con git log origin/main: gana el disco.
4. Mide la laptop, sin instalar nada: hostname, ruta de AIW_Workspace, versiones de git y node, si existe Chrome y en qué ruta, si cantu-lessons/tools/render/node_modules existe, y si node tools/cabina/pendientes.mjs 8797 corre (desde cantu-lessons). Las herramientas de la cabina están en aiw-console/context/cabinas/lecciones/herramientas/cabina/: traen rutas de la PC (C:/Users/chris/..., DESKTOP-525K0IS, la ruta de Chrome); dime cuáles hay que adaptar.
5. Corre node aiw-console/context/cambio-de-cuenta/sincronia.mjs desde AIW_Workspace.
Luego dime en una tabla dónde estamos, qué le falta a la laptop para trabajar (y cómo lo arreglarías) y qué harías primero, y espera mi «adelante». No rehagas nada que ya esté en git; nunca toques el 8791, ni respuestas.*, ni votes. Cuando te escriba «protocolo para cambiar de cuenta», haz el «1. Cierre» de PROTOCOLO.md y espera.
```

## Volver a la PC

El mismo «1. Cierre», ahora en la laptop: todo a GitHub y el HANDOFF reescrito. Después, en la PC, la sesión de LECCIONES de la
principal: «ya volví, revisa la carpeta del protocolo». Hace `git pull` antes de tocar nada.
