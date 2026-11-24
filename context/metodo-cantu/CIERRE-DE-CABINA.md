# El cierre de una cabina suelta, para pasar al modelo mixto

> **v0 · 2026-11-24, 09:00 (`date`).** Lo escribió el coordinador de Método Cantú, en la PC, tras el «Sí, escríbelo» del operador al modelo mixto (`PROYECTO.md` §3.1 y §6; D-086).
>
> **Para quién:** la cabina suelta de un área que pasa a cabina anidada al coordinador (LECCIONES) o a talleres del coordinador (LANDING). Lo lee **entero** antes de empezar.

## Por qué

La cabina que siga al área no hereda la conversación de esta, solo sus ficheros. **Lo que no quede en git no pasa.** La memoria de la PC tampoco basta: un taller fresco o un coordinador en la nube no la ven.

## Lo que hace toda cabina al cerrar

1. **No abre nada nuevo.** Termina o integra lo que tenga a medias. Lo que no pueda cerrar lo deja **nombrado** en el relevo: qué es, en qué rama o carpeta, y qué le falta.
2. **Las ramas locales sin juntar a `main`:** cada una se junta o se declara en el relevo (para qué era, si sirve, y si se puede borrar; **borrarla pide el sí del operador**).
3. **Reescribe su relevo**, `aiw-console/context/handoffs/<repo>.md`, con la hora de `date`. **Arriba, un bloque «Dónde estamos» que sustituye a lo viejo**, no una adenda más. Lleva:
   - lo último hecho, con sus commits;
   - lo publicado, con su liga;
   - **lo que espera al operador**, con la liga y la ruta completa de cada cosa;
   - la cola de lo que sigue, en orden, y con qué puerto o número empieza;
   - las herramientas que la mudanza del 24-nov rompió, y si las arregló.
   Lo de antes queda en el historial de git del fichero; lo vencido no se arrastra.
4. **Pasa a ficheros las reglas de su área que solo están en la memoria de la PC** (`C:\Users\chris\.claude\projects\C--Users-chris-Documents-AIW-Workspace\memory\`). Van a su `context/cabinas/<área>/CLAUDE.md` o a un fichero al lado, que el `CLAUDE.md` cite. **Las memorias no se borran.**
5. **Commit y push**, con las reglas de `PROYECTO.md` §4: rutas propias, identidad explícita, `origin/main..HEAD` medido en `aiw-console` y push por sha. Comprueba que sus repos quedan limpios e iguales a `origin/main`.
6. **Avisa al coordinador** con una línea: los sha y «cierre hecho». Luego **espera**, sin hacer nada más. La archiva el operador.

## Lo propio de LECCIONES

- **Lo que espera al operador:** las tres vistas de CR-LX3·07 en la galería CR-LX3 (`docs/carriles/CR-LX3/07.md`, c05f1bbc) y lo que más tenga la cola.
- **Las ramas locales que `sincronia.mjs` marca** (24-nov): `cr-fig-04` (2 commits), `cr-lx-13-hoja` (2), `cr-lx3-01` (4), `cr-lx3-02` (1) y `cr-lx3-06` (1).
  - `cr-lx3-01`, `-02` y `-06` **ya están** en `context/cambio-de-cuenta/ramas-integradas.txt` (líneas 188, 189 y 193): la cabina confirma que lo que traen ya está en `main` (por ejemplo, entró por cherry-pick) y lo dice en el relevo.
  - `cr-fig-04` y `cr-lx-13-hoja` **no están** en esa lista: se juntan o se declaran.
  - Los worktrees de esas rondas que ya no existen no se tocan: el `git worktree prune` espera el sí del operador.
- **`cantu-lessons` y `cantu-revisiones` tenían commits de GitHub sin bajar** (1 y 3, la misma medición): se bajan antes de cerrar.
- **`tools/cabina/pendientes.mjs`** termina sin salida tras la mudanza: escribe en `_scratch/cabina-lecciones/`, que ya no existe. Se arregla o queda como primer pendiente del relevo. Lo mismo con el vigilante de votos y el script que abre la galería, si apuntan a rutas viejas.
- **Las reglas de la memoria de la PC que son de LECCIONES** (unas 30 en `MEMORY.md`: el flujo v11, los votos, los carriles nunca ociosos, el turno de cinco, fusionar `bloques.json`, la tesela con hora, el pulido a mitad de tokens, el 8791 con el código viejo, las tres variantes por sección, los apuntes de sistema con `--en`, entre otras) pasan a ficheros como dice el punto 4.
- **El relevo** sustituye el «Dónde estamos» del 19-nov.

## Lo propio de LANDING

- **Lo que espera al operador:** el título nuevo de la sección 2 de BB (`metodo-cantu-landing/veredictos/2026-11-23-seccion-2-tono.md`), y Moodle, que espera a que él diseñe la conexión.
- **El relevo** sustituye su «Dónde estamos», «Lo que sigue» y «Lo decidido (AS)», que quedaron viejos (lo dice su adenda del 22-nov).
- **Las reglas de la memoria de la PC que son de LANDING** (académico, no «retro»; lo que revisa va al repo; tres variantes por sección; el índice con el enlace de cada variante; nunca subir código con sesión de Moodle abierta) pasan a ficheros como dice el punto 4.
