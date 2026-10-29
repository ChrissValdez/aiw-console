# Veredicto del piloto sobre `CLAUDE.md` v0

> Lo escribe la cabina de LECCIONES el **2026-10-29**, al cerrar la primera sesión en Claude Code (en la PC
> `DESKTOP-525K0IS`, del 2026-10-28 a las 23:19 al 2026-10-29 a las 08:55, hora de CDMX). Es lo que pedía el `CLAUDE.md`
> v0: «qué sirvió, qué faltó, qué estorbó». **Es un veredicto de la cabina, no del operador.** Los cambios de abajo se
> proponen para una v1 y se escriben con su palabra.

## En una línea

**El contrato funcionó para lo que importaba**: la cabina publicó desde la primera sesión, sin locks y sin tocar
credenciales. **Falló en dos supuestos sobre el mundo**: dónde abre la app la sesión y cómo se hizo la copia de la laptop.

## Lo que sirvió

| del `CLAUDE.md` | cómo se notó |
|---|---|
| **El paso 1b, la prueba del push antes de escribir** | con las dos llamadas a la red (`ls-remote` y `push --dry-run`) se supo antes de escribir nada que GitHub aceptaba la credencial. Lo que lo probó del todo fue una traza HTTP: `401` sin credencial, y luego `200 OK` en `git-receive-pack` |
| **Git: locks primero, `pull --ff-only` antes de escribir, `add` por nombre, `add` y `commit` solos, identidad explícita** | 4 commits y 4 pushes en tres repos, **ningún lock**, nada arrastrado sin querer |
| **«La cabina publica», y la línea del cierre** | los cuatro pushes entraron a la primera. La línea «publicado: `<repo>` hasta `<sha>`» se entiende sola |
| **La tabla «dónde vive todo»** | fue exacta. Cada ruta que citaba existía |
| **El paso 3: los ficheros que se esperan diferentes salen de `git diff --name-only <sha>..HEAD`** | explicó los 13 que tocaron los commits de hoy, sin razonar |
| **El paso 6, con D-081 ya escrita** | bastó leerla y contrastarla, y su hueco salió en la primera lectura |
| **«Ves más que el workspace, pero solo tocas el workspace»** | dejó medir, sin escribir, lo que vive fuera: la directiva de Appx, la versión de la app y los procesos |
| **«La cabina nunca lanza un taller por su cuenta»** | RW-54 se ofreció como tarjeta de la app, y la pulsó el operador |

## Lo que faltó

1. **Dónde se abre la sesión.** El `CLAUDE.md` dice que la sesión se abre en `context/cabinas/lecciones/`, con
   `AIW_Workspace` añadido. **Medido: se abrió en `AIW_Workspace`.** Así no se cargaron ni el `CLAUDE.md` ni su
   `@../REGLAS-DE-CABINA.md`, y la cabina los leyó porque el mensaje de arranque lo pedía. **Para la v1:** decir que la
   app puede abrir en `AIW_Workspace`, y que entonces la primera orden del mensaje de arranque es leer los dos ficheros.
   Ese mensaje hay que mantenerlo aunque la sesión se abra en la carpeta buena.
2. **Qué hacer con un `comparar` en NO.** El paso 3 suponía una copia entera, con dos diferencias esperadas. El NO real
   sumaba 17 439 ficheros entre los que faltan y los que difieren, y hubo que escribir tres sondas para saber qué
   significaba: carpeta, si está en git, finales de línea. **Para la v1:** «si el `comparar` da NO, se desglosa con las
   sondas de `herramientas/` antes de decir qué falló», con las sondas versionadas (ver abajo).
3. **Los finales de línea entre las dos máquinas.** En la PC, `cantu-lessons`, `aiw-console` y `cantu-revisiones` salen
   en CRLF (`core.autocrlf=true`, del gitconfig de sistema), y en la laptop los árboles eran LF. Un manifiesto por
   tamaño los ve todos como diferentes: fueron 5 161 falsas alarmas. **Para la v1:** una línea sobre eso.
4. **El sha de referencia del 1b.** El `CLAUDE.md` decía «el HEAD que da el relevo». El relevo daba los sha de la laptop
   antes de los commits de la mudanza (`19ca1dc8` y `04f558e8`). El listón bueno era el del mensaje del operador
   (`a0c3d9c` y `44ab3ef`). **Para la v1:** el relevo da el último sha publicado de cada repo, y el 1b se mide contra
   ese.
5. **Cómo llamar a git cuando sale a la red.** Sin `GIT_TERMINAL_PROMPT=0` y `GCM_INTERACTIVE=never`, una credencial que
   faltara abriría una ventana y el comando se quedaría esperando hasta el timeout; matarlo puede dejar un lock. Con las
   dos variables, falla con el error literal, que es lo que pide el `CLAUDE.md`. **Para la v1:** escribirlo en «Git».
6. **El permiso de Claude Code para `git push`** (Git, punto 6) **no se probó**: la sesión corrió en modo *bypass* y la
   app no preguntó nada. El permiso de las credenciales sí se probó.

## Lo que estorbó

1. **Una parte grande de `REGLAS-DE-CABINA.md` no aplica aquí.** Son unas 876 líneas, y varias secciones describen
   Cowork: el montaje en `/sessions/…`, la tabla «Puede / NO puede» (que dice que no hay push), «el borrado se pide con
   la herramienta», «el operador publica» y el ciclo de una sola pegada. La tabla «Qué cambia respecto a Cowork» lo
   resolvió, pero la cabina tiene que leerlo todo para saber qué ignorar. **Para la v1:** sin tocar las reglas, que son
   copia verbatim, que el `CLAUDE.md` liste por su título las secciones que no aplican.
2. **El README de la mudanza contaba con un `.claude/launch.json`** para levantar la galería, y ese fichero vivía en la
   raíz del workspace de la laptop: no llegó a la PC. Ya se resolvió (molde v3: un comando desde `cantu-revisiones`). Lo
   anoto porque es la misma clase de cosa que el punto 1 de «lo que faltó»: una configuración local que se da por
   presente.

## Para versionar, si el operador lo aprueba

- **Las herramientas de la mudanza** irían a `herramientas/`, en esta carpeta: `_scratch/cabina/mudanza/mudanza.mjs` y
  las tres sondas de esta sesión (`_scratch/cabina/mudanza/sondas/`). La enmienda a D-081 apunta a `mudanza.mjs`, que
  hoy vive en algo desechable.
- **Los permisos en `.claude/settings.json`:** todavía no. Con *bypass* no hay nada que medir en la PC. En la laptop se
  anota qué pregunta la app y con qué forma de comando, y entonces se versiona.

## Lo que el piloto deja hecho

- **«Pendiente de estreno»** (la estructura de `cantu-revisiones` y el molde de galería) **ya está hecho:**
  `cantu-revisiones` `956bccb`, `MOLDE-DE-GALERIA` v3 y `TALLER-COMUN` v8 (`cantu-lessons` `8004ff4`). En la v1 esa
  línea pasa a decir dónde quedó.
- **La mudanza no está verificada.** El relevo dice qué copia el operador y cómo se vuelve a medir.
