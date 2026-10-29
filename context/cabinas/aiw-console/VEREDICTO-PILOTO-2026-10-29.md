# Veredicto del piloto sobre `CLAUDE.md` v0 (cabina `aiw-console`)

> Lo escribe la cabina del hilo `aiw-console` el **2026-10-29**, al cerrar su primera sesión en Claude Code. Fue en la PC
> `DESKTOP-525K0IS`, de las 10:17 a las 10:30 más o menos, hora de la PC (UTC−6). Responde a lo que pide la v0: «qué
> sirvió, qué faltó, qué estorbó». **Es un veredicto de la cabina, no del operador.** Los cambios de abajo se proponen
> para una v1, y se escriben cuando el operador lo diga.

## En una línea

**El arranque funcionó tal como está escrito**: en orden, sin locks y sin pedir credenciales. Lo heredado del veredicto
de LECCIONES ya venía dentro y se notó. **Falló en dos cosas del mundo:** qué repos hay (se quedaban fuera dos) y qué
commit es el último de Cowork. Y **lo que más pesa del contrato no se ejercitó**, porque la cola no tenía nada:
escribir el canónico por la consola, emitir un ticket y publicar después de un cierre.

**El push real es el del commit que trae este fichero.** Si lo estás leyendo en GitHub o en la otra computadora, entró.

## Lo que sirvió

| del `CLAUDE.md` | cómo se notó |
|---|---|
| **«La primera sesión», en orden** | cada paso se pudo hacer tal como está escrito, y en unos tres minutos se tenía el estado entero |
| **Las dos variables de git a la red** (`GIT_TERMINAL_PROMPT=0`, `GCM_INTERACTIVE=never`) | `pull --ff-only`, `ls-remote` y `push --dry-run` respondieron sin abrir ventanas. Era el punto 5 de lo que le faltó a LECCIONES |
| **«Si la línea de arriba no las cargó…, léelas enteras»** | la app abrió la sesión en `AIW_Workspace` (igual que a LECCIONES), y el `@../REGLAS-DE-CABINA.md` no cargó nada. El aviso y el mensaje de arranque lo cubrieron |
| **La lista de secciones de las reglas que NO aplican** | ahorró separar a mano lo de Cowork en 876 líneas. Era el punto 1 de lo que estorbó a LECCIONES |
| **Las cifras del paso 3, con «md5 normalizado»** | el árbol da `927c6670…` (CRLF) y sin CR da `3e088141…`, igual que el blob de HEAD. Al decir cuál se esperaba, la comparación salió directa. 82 runs y 79 / 3 / 0, igual |
| **«Un aparato a la vez» (Git, 6)** | al arrancar detectó commits locales sin publicar. Volver a medir en el punto de uso detectó `0b4235a` (relevo de `phd-p2-experiment`), que **entró mientras la cabina medía**. Y antes del commit detectó tres cosas más: alguien publicó desde esta PC a las 10:20:30, `9a90a72` entró a las 10:24, y alguien lo publicó a las 10:26:39 |
| **«La máquina, medida el 2026-10-29»** | CRLF confirmado (`core.autocrlf=true` del gitconfig de sistema, `i/lf w/crlf`). La suite corre directa: **982 / 982 / 0 en 3,6 s** |
| **«Dónde vive todo»** | todas las rutas que cita existen: el relevo, el canónico, el motor, `REGLAS-DE-OPERACION-DEL-OPERADOR.md`, `tools/capturas/README.md` y el veredicto de LECCIONES |
| **El paso 4, la recomendación ya escrita** | se confirmó midiendo: #80 pausado, D-079 vigente (relevo de `cantu-studio`), D-074 sin run, y la última D es D-081 |

## Lo que faltó

1. **Qué repos se miran.** El paso 1 dice «locks primero en todos los repos (`aiw` y los de `projects/`)». **`Acervo` y
   `PHD`, en la raíz del workspace, también son repos**, y con esa frase se quedaron fuera: a las 10:17 se miraron
   siete, y los dos que faltaban se miraron a las 10:22 (sin lock). El `CLAUDE.md` de LECCIONES sí los nombraba.
   **Para la v1:** «en todo directorio del workspace con `.git`, en la raíz y en `projects/`», derivado y no listado.
   Así ya cubre los dos que la topología de las reglas no conoce (`cantu-revisiones` y `phd-p2-experiment`).
2. **El sha de referencia del paso 2.** El contrato dice que `553c02a` es «el último commit de la cabina de Cowork», y
   no lo es: el último es **`8dc9458`, el que trae este mismo `CLAUDE.md`**. Un contrato no puede nombrar el commit que
   lo contiene. «O más adelante» lo salvó. **Para la v1:** «el HEAD que da el relevo como último publicado, o uno
   posterior». Este relevo ya lo da: el commit que lo trae, hijo de `0b4235a`. Es el punto 4 de LECCIONES, que aquí
   volvió a pasar de otra forma.
3. **Los commits de otros hilos sin publicar.** Al arrancar, el local iba **3 commits por delante** de `origin/main`, y
   ninguno era de esta cabina: `85eee7c` (`cantu-studio`), `8dc9458` (este `CLAUDE.md`) y `0b4235a`
   (`phd-p2-experiment`). Los hilos de Cowork commitean y no publican, así que **el push de una cabina en Claude Code
   publica lo suyo y lo que tenga debajo**, porque la historia es lineal. El contrato no lo prevé. La cabina lo dijo y el
   operador respondió «Cierra ahora». Mientras tanto, lo que había debajo cambió tres veces: alguien publicó esos tres
   desde esta PC a las 10:20:30, entró `9a90a72` (`phd-p2-experiment`, 10:24), y alguien lo publicó a las 10:26:39.
   Al final, el push de la cabina llevó solo lo suyo. **Para la v1:** «justo antes de cada push, se listan con su hilo los commits ajenos que lleva; si hay alguno
   que el operador no ha visto, se le dice antes de publicar».
4. **El §6 del relevo no es «el oficio medido» en Claude Code**, aunque así lo llama «Dónde vive todo». Una parte es de
   la API de `serve.mjs` y sigue valiendo: los nombres de argumentos, las rutas de POST y `PC_PORT`. Otra parte era de
   la VM de Cowork: el servidor que muere entre llamadas, `pkill` que mata la propia shell, la suite en tandas y el
   permiso de borrado que caduca. **El relevo nuevo ya los separa** (§6). **Para la v1:** apuntar a «§6, lo que es de
   `serve.mjs`», no al §6 entero.
5. **Sin ejercitar** (no es culpa del contrato: la cola no tenía nada):
   - levantar la consola en otro puerto con `PC_PORT` y pararla por su PID;
   - el primer `set-status` real y su md5;
   - emitir un ticket y que el operador lo abra en otra sesión de la app;
   - el ciclo «commit que fija algo → push → `rev-list` = 0» dentro de un run;
   - el permiso de Claude Code para `git push`: la sesión corrió en modo *bypass* y la app no preguntó nada, como en
     LECCIONES;
   - que el borrado esté habilitado (arranque de las reglas, punto 4) **dentro del workspace**: la cabina no creó nada
     ahí que tuviera que borrar.

   Reanudar el `#80` pondría a prueba casi todo esto de una vez.
6. **«Arranque de las reglas» se puede leer de dos formas:** el arranque entero de las reglas, con sus siete pasos, o
   solo los locks. La cabina hizo los siete, salvo la prueba de borrado (punto 5). **Para la v1:** decir cuál.

## Lo que estorbó

1. **Leer el veredicto de LECCIONES cargó el `CLAUDE.md` de LECCIONES en esta sesión.** Claude Code carga el `CLAUDE.md`
   de la carpeta de cada fichero que se lee, y la v0 invita a leer ese veredicto («está hecho sobre su veredicto»). No
   mandó nada aquí, pero dejó en la sesión las reglas de otra cabina, y algunas chocan con las de esta: allí, la
   estructura de `cantu-revisiones` y su primera sesión. **Para la v1:** «si lees algo de la carpeta de otra cabina, su
   `CLAUDE.md` entra en la sesión y no manda aquí».
2. **La topología de `REGLAS-DE-CABINA.md` está vencida**: dice «CINCO proyectos» y «cuatro relevos», y hay nueve repos
   y seis relevos. La cabina tiene que saber que esa tabla no se cree. Las reglas son copia verbatim del Project, así que
   **esto se nombra y no se toca**: le toca al operador.
3. **«La consola del operador vive en el puerto 8788».** Es cierto, pero a las 10:19 no escuchaba nadie. No estorbó; lo
   anoto para que nadie dé por levantada la consola.

## Para versionar, si el operador lo aprueba

- La **v1 de este `CLAUDE.md`**, con los puntos 1, 2, 3, 4 y 6 de «lo que faltó» y el 1 de «lo que estorbó».
- Nada más: esta cabina no tiene herramientas propias que versionar. Las de captura ya viven en `tools/capturas/`.

## Lo que el piloto deja hecho

- **El arranque completo y medido**, con la tabla en el §0 del relevo (`context/handoffs/aiw-console.md`).
- **El primer push real de la cabina**: el commit que trae este fichero y el relevo. Lleva solo ese commit, porque lo
  ajeno ya estaba publicado.
- **La cabina se da por mudada en lo que se probó**: leer, medir y publicar. El ciclo de un run en Claude Code queda
  para la sesión que reanude el `#80`.
