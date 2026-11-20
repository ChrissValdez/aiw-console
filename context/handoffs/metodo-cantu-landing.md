# HANDOFF — hilo `metodo-cantu-landing` (LANDING)

> **Quinto relevo: el dueño se va a trabajar otras cosas con otra cuenta y vuelve a esta misma conversación.** Lo escribió la cabina LANDING el
> **2026-11-20 hacia las 04:10** (`date`), en la PC (`DESKTOP-525K0IS`), al pedir el dueño: *«tengo que hacer un cambio
> de cuenta, necesito que el encargo acutal se pause de forma segura para que cuadno vuevla siga donde se quedo»* y, después, *«no voy a cambiar de cuenta aqui, voy a cambiar, avnazar otras cosas alla, y luevo volver aqui solo no quiero perder avances»*.
> Sustituye al cuarto (19-nov, 02:58); lo de antes está en el historial de git de este fichero.
>
> - **LANDING nunca toca lo de LECCIONES.**
> - **Todo lo de aquí lleva fecha. Contrástalo con el disco al abrir: gana el disco.**
> - **Al abrir,** la cabina lee enteros `context/cabinas/landing/CLAUDE.md` y `context/cabinas/REGLAS-DE-CABINA.md`, y
>   hace `git pull` en `metodo-cantu-landing` y en `aiw-console`.
> - **Siempre en español** (lo pidió el dueño), y cada mensaje cierra con «Qué necesito de ti», «Qué procede» y
>   «⏳ EN ESPERA de …».

## Dónde estamos

- **El taller AO terminó el encargo completo** (lo confirmó su `prototipos/AO-secciones-2-y-3/RELEVO.md`, 04:09); falta la revisión de la cabina (`encargos/AO-secciones-2-y-3.md`, carpeta
  `prototipos/AO-secciones-2-y-3/`).
  - Su estado exacto, lo hecho y lo que falta están en **`prototipos/AO-secciones-2-y-3/RELEVO.md`**.
  - Lo que lleva se commiteó tal cual, para no perderlo. **No está revisado ni en el índice.**
  - **Para seguir:**
    - si la conversación del taller (`local_83e75784-…`, «AO · secciones 2 y 3 de la landing») sigue abierta en esta
      cuenta, escríbele «sigue con AO desde tu RELEVO.md»;
    - si no, lanza un taller nuevo (`start_session`: user_asked, fresh, sin worktree, Opus 5.5, esfuerzo alto,
      wake_when_done) que lea el encargo y el `RELEVO.md` y termine, con los puertos 9090–9094.
- **Lo que AO tiene que entregar:**
  - **la 2 con otra narrativa:** tres variantes con texto nuevo, por aprobar;
  - **la 3, aprovechando el espacio:** tres variantes sobre la c de AN;
  - **las tijeras** entre la 6 y el footer marino, arregladas;
  - **en la 5,** «¿Cuánto cuesta?» cambiada por «¿Qué pasa cuando te escribo?» / «Revisamos tu caso y te decimos qué te
    conviene, con precios, días y horarios. Sin compromiso de inscripción.» (`veredictos/2026-11-20-cuanto-cuesta.md`).
- **Al entregar AO:** revisar `NOTAS.md` y las hojas, commitear la carpeta, ponerlo arriba en `index.html` con sus
  enlaces (AN pasa a `V` con su veredicto) y mandarle las hojas de la 2 y la 3.
- **El sitio publicado sigue siendo su original.** Nada se ha portado a Moodle.

## La estrategia vigente (desde el 20-nov, tras AM)

*«me gustaria un solo prototipo, Con las correcciones y comentarios que dije, pero... cada seccion con 3 variatnes
nuevas … estoy puliendo el prototipo actual, no pidiendo prototipos nuevos de cero»*
(`veredictos/2026-11-20-am-comentarios.md`).

- **Un solo prototipo, con tres variantes por sección** (`s1`…`s6` = a|b|c, la a por defecto, combinables).
- **Él descarta,** y la cabina deja en el índice solo los enlaces de lo que queda.
- **Lo decidido se fija** en la ronda siguiente y se borra lo que perdió.
- **Reemplaza la regla vieja** de «una sola versión, sin opciones por sección».

## Lo decidido sección por sección (al 20-nov, 04:10)

| sección | estado | de dónde |
|---|---|---|
| 1 · portada | **por decidir:** a (barra a todo lo ancho, pegada al contenido) o b (sin caja) de AN | `2026-11-20-an-descartes.md` |
| 2 · el villano | **en AO:** otra narrativa. Rechazó todos los acomodos del texto aprobado (AK, AM, AN b/c; la a de AN tampoco lo convence) | `2026-11-20-an-segunda-ronda.md` |
| 3 · los 4 pasos | **la c de AN** (uno a la vez, flechas a los lados). **En AO:** que no desaproveche espacio (su captura `2026-11-20-an-seccion-3-espacio.webp`) | ídem |
| 4 · así son tus clases | **por decidir:** a de AN (la de AC con la franja de asesorías en caja blanca) o la de AC tal cual. Fuera todo lo de AD a AL | `2026-11-20-an-descartes.md` |
| 5 · preguntas | **la c de AN** (el botón dorado). Pregunta nueva en lugar de «¿Cuánto cuesta?» | `2026-11-20-an-segunda-ronda.md`, `2026-11-20-cuanto-cuesta.md` |
| 6 · cierre | **la a de AN** (footer marino, con las burbujas): «excelente». **En AO:** las tijeras | `2026-11-20-an-segunda-ronda.md` |

## El camino del 19 al 20-nov

| ronda | qué fue | su veredicto |
|---|---|---|
| AJ, AK, AL | la sección 4, una y otra vez | AK: «over do it»; volver a la 4 de AC. AL la pulió |
| AM | un solo prototipo, sin variantes, con las correcciones juntas (portada sin huecos, la 2 alineada, renglón del diagnóstico en la 3) | portada «amontonada», la 2 no gusta, la 4 de AL «la empeoró»; cambia de estrategia |
| AN | AM con tres variantes por sección | descartes en dos tandas (arriba) |
| AO | la 2 y la 3, las tijeras y la pregunta de la 5 | **en pausa** |

Todo está en `veredictos/` (sus palabras, tal cual; 73 ficheros al 20-nov, 04:10), `encargos/` y el índice.

## Pendiente de su respuesta

- **La 1 y la 4:** a o b, y a o AC. En el índice hay un enlace de cada una, con lo ya decidido.
- **Si le late «¿Qué pasa cuando te escribo?».**
- **La pregunta de los papás** («¿Cómo me entero del avance de mi hijo?»): falta la respuesta.
- **El botón de WhatsApp de la cabecera** (amarillo o con contorno): AM lo dejó abierto y él no lo ha contestado.
- **Los datos que solo él tiene** (FALTA en `storytelling/texto-v2.md`):
  - quién da las clases: foto real y una línea;
  - testimonios;
  - el paquete y el próximo grupo;
  - en cuánto tiempo contestan;
  - qué mide el diagnóstico express, cuánto dura y cómo llegan los resultados.

## Lo que hay en el repo (al 20-nov, 04:10)

| ruta | qué es |
|---|---|
| `index.html` | **la página de entrada:** «Lo que sigue», el nuevo arriba con los enlaces de sus variantes (`VARIANTES`), las versiones anteriores con su veredicto (`V`), lo que se rescata y lo que no, y el mapa. Es CRLF: se edita con scripts de Node que reescriben `\r\n` |
| `abrir-landing.cmd` + `.ps1` | **el botón de la laptop:** hace `git pull`, levanta `node direccion/servidor.mjs` en 8792 si no está y abre el navegador. El dueño lo usa en cualquier aparato |
| `direccion/servidor.mjs` | el servidor local (`127.0.0.1:8792`) |
| `storytelling/` | los textos aprobados (`texto-secciones-1-2-aprobado.md`, `texto-seccion-4-aprobado.md`, `texto-secciones-5-6-aprobado.md`) y el análisis |
| `prototipos/` | de A a AO, cada uno con `landing.html`, `NOTAS.md`, `capturas/` y `herramientas/`. Vigente: **AN**; en pausa: **AO** |
| `encargos/` | un encargo por ronda (`AM-un-solo-prototipo.md`, `AN-tres-variantes-por-seccion.md`, `AO-secciones-2-y-3.md`…) con sus reglas en `RONDA-EFG.md` y `RONDA-QRSTU.md` |
| `veredictos/` | sus palabras, tal cual |
| `inventario/miniaturas/` | la primera pantalla de cada versión, para el índice |

**Puertos de los talleres:** AK 9070–74, AL 9075–79, AM 9080–84, AN 9085–89, AO 9090–94. El siguiente, 9095.

## Técnico: lo que no viaja y lo que conviene saber

- **La memoria de la laptop no viaja.** Las reglas que vivían solo ahí ya están en el `CLAUDE.md` (puntos 11 a 14).
- **La vista previa de la app** usa la configuración `landing-lamina` de `AIW_Workspace/.claude/launch.json`. No está en
  ningún repo. Si en la PC no está, se agrega:
  - `"name": "landing-lamina"`;
  - `"runtimeExecutable": "node"`;
  - `"runtimeArgs": ["projects/metodo-cantu-landing/direccion/servidor.mjs"]`;
  - `"port": 8792`.
- **Capturas:** `puppeteer-core` de `projects/cantu-lessons/tools/render/` por `createRequire`, solo leyendo de ahí.
  - Chrome está en `C:/Program Files/Google/Chrome/Application/chrome.exe`.
  - **Un navegador por página:** las pestañas de fondo se traban.
  - Para cerrar procesos, solo los propios, filtrando por línea de comandos, y `taskkill /T` del árbol de su `node`.
    Nunca un Chrome ajeno.
- **Su Windows tiene las animaciones apagadas, y Chrome lo lee como `reduce`.** Los prototipos aceptan `?movimiento=si`.
  Al capturar, emular `no-preference` y también `reduce`.
- **Rutas con ñ** (`diseño-actual`): en Node, `fileURLToPath`, no `URL.pathname`. En Bash, un heredoc con acentos puede
  fallar: el contenido se escribe con la herramienta de escribir.
- **Mirar la hora con `date` antes de escribirla.**
- **`direccion/servidor.mjs`** todavía tiene en su mapa de votos la ruta `/archivo/referencias-admision/votos`, de una
  carpeta ya borrada. No estorba, pero sobra.
- **`inventario/entrada-1440.webp`** es una captura vieja de la página de entrada.

## Git

- **`metodo-cantu-landing`:**
  - el dueño también puede commitear: al abrir, `git pull`, o `fetch` y mirar `HEAD..origin/main`;
  - el commit va por ruta, con identidad explícita (`-c user.name=ChrissValdez -c user.email=christopherkntu@gmail.com`)
    y `--no-optional-locks`;
  - el push va por sha exacto (`git push origin <sha>:refs/heads/main`).
- **`aiw-console`:**
  - LANDING escribe solo `context/cabinas/landing/` y `context/handoffs/metodo-cantu-landing.md`;
  - el commit va por ruta, y antes de empujar se hace `git pull --rebase origin main`;
  - nunca `--force`.
- **Comandos de red:** llevan `GIT_TERMINAL_PROMPT=0 GCM_INTERACTIVE=never`, un timeout y `< /dev/null`.

## Abierto, para después

- **La entrada a Asesorías en el celular:** al quitar la línea de la portada, abajo de 1024 px solo se llega bajando a
  la oferta. M la puso en el menú, pero en celular el menú no se ve.
- **A 320 × 568, el botón del diagnóstico** queda bajo el pliegue. El WhatsApp del header sí se ve.
- **El contorno de los botones dorados sobre fondo claro** contrasta 1.6:1. El texto del botón sí pasa.
- **Nada se ha probado en Safari, en Firefox ni en un celular real.**
- **`_scratch/landing/` en la PC** (de la cabina de LECCIONES): no se borra sin su palabra.
- **SSH a su servidor de Moodle,** para después (*«depsues trabajo en eso»*).
