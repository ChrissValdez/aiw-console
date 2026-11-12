# Herramientas de la cabina de LECCIONES

Copiadas tal cual desde `_scratch/cabina/` el 2026-10-28. Son ayudas de medición de la cabina, no código de lecciones.

| herramienta | qué hace |
|---|---|
| `pintar.mjs` | pinta la página web de una lección con el motor de Studio, sin el build completo (su salida era idéntica byte a byte al `web.html` del build). Uso de la cabina de Cowork: `node pintar.mjs <carpeta-salida> Lnn=<borrador> …` |

**No corre tal cual en Windows:** lleva la ruta de la VM de Cowork (`process.env.HOME + '/mnt/AIW_Workspace/…'`). Antes
de usarla aquí, la cabina la adapta y lo dice; si hace falta un cambio de código de verdad, va al ticket de herramientas.

## Las de Claude Code (subidas el 2026-11-12, para el cambio de cuenta)

Vivían en la carpeta temporal de la sesión de la cabina y se perdían con ella. Se corren desde `AIW_Workspace`, con Git Bash
y Node; dependen de `_scratch/cabina-lecciones/` (integrar, pendientes, vigilante, galerías), que está en el disco de la PC.

| herramienta | qué hace |
|---|---|
| `web-nueva.sh <sha> <LEC> <informe> "<título>" "<carril·nn>" "<línea del veredicto>"` | integra una lección web nueva de un carril: cherry-pick, filas del registro, build, páginas, veredicto y relevo |
| `slide-nueva.sh` (mismos argumentos) | lo mismo para una lección en slide (`build.mjs --slide`) |
| `slides-lote.sh <informe> "<carril·nn>" <sha…> -- <LEC…>` | un lote de lecciones en slide: un solo commit de páginas |
| `filas.mjs <informe> <LEC>` | copia al registro (`docs/BLOQUES-PROVISIONALES.md`) las filas de la §5 del informe que faltan |
| `anexar-veredicto.mjs <nota.md> vacio.txt` | añade una nota al veredicto vigente de `cantu-lessons` |
| `relevo.mjs <relevo.md> <HH:MM> <texto.txt>` | añade un renglón al relevo, tras el último «(apuntado a las …)», en CRLF |
| `leer-votos.mjs <antes-sha> <galería> [salida.md]` | lo que cambió en las claves de una galería, agrupado por vista |
| `merge3.mjs` | fusión a tres dentro de las cadenas JSON (los choques de `bloques.json`) |
| `uniones.mjs` y `quitar-uniones.mjs <dir>…` | listar y quitar uniones de un worktree antes de `git worktree remove` |
| `gasto-semana.mjs` | estima qué se llevó los tokens de la semana (los transcripts de `~/.claude/projects`) |
