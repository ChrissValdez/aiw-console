# HANDOFF — hilo `metodo-cantu-landing` (LANDING)

> **Tercer relevo: pasa a la laptop, con la cuenta suplementaria.** Lo escribió la cabina LANDING el **2026-11-18 a las
> 18:01** (`date`), en la PC (`DESKTOP-525K0IS`), al hacer el «1. Cierre» de
> `context/cambio-de-cuenta/OTRA-CABINA-EN-LAPTOP.md`. Sustituye al segundo (6-nov); lo de antes está en el historial de
> git de este fichero.
>
> - **La landing vive ahora en la laptop.** La sesión LANDING de la PC quedó cerrada y no toca nada hasta que vuelva con el
>   mismo «1. Cierre».
> - **La PC sigue con LECCIONES en la cuenta principal.** LANDING nunca toca lo de LECCIONES.
> - **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el disco al abrir. Gana el disco.** La cabina abre
>   leyendo enteros `context/cabinas/landing/CLAUDE.md` (v0, con los puntos 8 a 10) y `context/cabinas/REGLAS-DE-CABINA.md`.

## Dónde estamos

- **En espera de que el dueño corrija `storytelling/texto-v1.md`.** No hay nada a medias ni sin commitear.
- **Al cerrar** (18-nov, 18:01), los dos repos tenían `git status` limpio y `HEAD` igual a `origin/main`:
  - `metodo-cantu-landing` en `987f9e2`;
  - `aiw-console`, en el commit de este relevo.
- **El sitio publicado sigue siendo su original** (`secciones/`). Se comprobó el 18-nov a las 17:02 bajando
  metodocantu.com y buscando sus textos.
- **No se genera ningún prototipo hasta que apruebe el texto.** Sus palabras (18-nov): *«no quiero mas prototipos
  todavia, primero quiero revisar y analizar el storytelling … ultimadamente necesito una pagina que venda … el
  storytelling es primero despues ocupo uqe el diseño sea bueno»*.

## Lo que se hizo el 18-nov

1. **`storytelling/analisis.md`** (`3ded20c`) cuenta la historia que cuenta la página.
   - Las nueve versiones (4 al 6 de noviembre) contaron la misma historia, con las mismas seis piezas y otra piel.
   - **Les faltaba lo que vende:** quién está detrás, la prueba, la oferta y lo que está en juego. Además, no le hablaban
     al papá.
   - Se propuso una historia en ocho tiempos y se le hicieron tres preguntas.
2. **Sus respuestas** (`veredictos/2026-11-18-respuestas-storytelling.md`):
   - **De dónde llega la gente:** por recomendación y por Instagram; lo supone, no lo sabe.
   - **Qué manda:** el examen de admisión. Las asesorías son secundarias.
   - **Qué se juega el alumno:** depende de cada uno; entrar o la beca, porque algunos necesitan un puntaje alto para
     pedirla.
   - **El diseño:** tampoco lo ha convencido, pero *«todo el concepto de que la pagina tenga tematica de examen, se ve muy
     acrode al concepto»*.
3. **`storytelling/texto-v1.md`** (`101e17d`) es el texto de la página: solo texto, en una sola versión.
   - **La página es un examen de tres preguntas:**
     - la 1, en la portada: «¿Qué temas te están quitando puntos?»;
     - la 2, nueva: «¿Qué te juegas con tu puntaje?» (entrar o la beca);
     - la 3, en el cierre: «¿Qué necesitas?», con cuatro respuestas que son botones de WhatsApp. Entre ellas está la de la
       beca, con su mensaje nuevo, **M7**.
   - **Los cuatro pasos** dicen primero lo que gana el alumno.
   - **La persona, la prueba y la oferta** van a media página. Lo que solo tiene él va marcado como **FALTA**.
4. **Su duda:** *«eso de preguntas es interactivo? … me preocupa que no se lea facilmente si lo obligas a contestar?»*
   (`veredictos/2026-11-18-preguntas-interactivas.md`). Se ajustó el texto (`987f9e2`):
   - **las preguntas son la forma de la página, no un formulario;**
   - **nada se tiene que contestar para seguir leyendo;**
   - solo se tocan las respuestas de la pregunta 3, porque son los botones.

## Lo que sigue, en orden

1. **Él corrige el texto.** La cabina guarda sus palabras en `veredictos/`, tal cual, y aplica las correcciones. Si el
   cambio es grande, lo hace en un `texto-v2.md`; si es chico, en el mismo fichero, avisando.
2. **Con el texto aprobado, un solo prototipo**, hecho por un taller (sesión anidada, **Opus y esfuerzo alto, nunca
   Fable**). El encargo lleva:
   - **el texto aprobado como contenido**, en lugar de `prototipos/CONTENIDO.md`;
   - **la temática de examen como concepto**, en el tono académico de la D;
   - **«nada se tiene que contestar»;**
   - lo que impone Moodle (del `CLAUDE.md`);
   - las reglas de calidad de `encargos/PROTO-COMUN.md`.
3. **Publicar en Moodle y medir** de qué botón llegan los mensajes de WhatsApp. Se le sugirió preguntar «¿Cómo nos
   conociste?» al contestar cada WhatsApp, durante unas semanas.

## Lo que se espera del dueño

- **Sus correcciones a `storytelling/texto-v1.md`,** sobre todo a la pregunta 2.
- **Los datos que solo él tiene.** Se piden una sola vez y nada se detiene por ellos; lo que no llegue, no se pone:
  1. quién da las clases: una foto real y una línea. **Es el más importante:** hoy la página no muestra a nadie;
  2. una señal de confianza: desde qué año prepara alumnos, cuántas generaciones lleva o sus estrellas en Google;
  3. de dos a tres testimonios, con permiso; mejor si uno entró con beca;
  4. el paquete de admisión (duración, horas por semana, tamaño del grupo y simuladores) y la fecha del próximo grupo;
  5. cómo se entera el papá del avance;
  6. en cuánto tiempo contestan por WhatsApp;
  7. definir el diagnóstico express. El examen lo hace el hilo de `cantu-quizzes-latex`, no este.
- **Qué no le gustó del prototipo E.** Nunca lo dijo; no hay que insistir.

## Lo que hay en el repo

| ruta | qué es |
|---|---|
| `storytelling/texto-v1.md` | **el texto de la página, v1, por corregir. Es el contenido que manda** para el próximo prototipo |
| `storytelling/analisis.md` | la historia que cuenta la página, qué le falta para vender y la historia en ocho tiempos |
| `secciones/`, `marco/`, `vista.html` | **su página original,** tal cual está en Moodle |
| `prototipos/D-pulida/` | **la D académica que aprobó** («Sí, así»), en Moodle. Tiene el botón del express |
| `prototipos/A-lenguaje/`, `B-3d/` | el lenguaje de Oryzo y Dala en Moodle (61 KB), y el 3D con Three.js fuera de Moodle (0,28 MB) |
| `prototipos/E-recomendada/` | **borrador cancelado** (con Fable); lo commiteó él en `c0eb048` |
| `prototipos/index.html` | la entrada a los prototipos, a pantalla completa |
| `prototipos/CONTENIDO.md` | el contenido común de A, B y D. **Lo sustituye el texto de `storytelling/`** |
| `prototipos/analisis-A-B.md`, `comparacion-cuatro.md` | A y B como landing; las cuatro comparadas (la cabina recomendó la D como base) |
| `prototipos/diagnostico-express.md` | la propuesta del diagnóstico express gratis |
| `referencias/` | seis referencias que no le gustaron; `oryzo.md` y `dala.md`, **las dos que le encantaron** |
| `encargos/PROTO-*.md` | los encargos de los talleres; `PROTO-COMUN.md` tiene las reglas de calidad. `PROTO-E` está cancelado |
| `veredictos/` | **sus palabras, tal cual,** una por mensaje (16 ficheros, medido el 18-nov a las 18:03) |
| `variantes/`, `propuesta-08/` | las rondas del 4-nov (NUBE-07A–D y NUBE-08), que fallaron |

## Lo que se sabe de su gusto

- **La temática de examen** le parece *«muy acrode al concepto»* (18-nov), aunque ningún prototipo lo ha terminado de
  convencer.
- **Que se lea fácil:** nada que obligue a contestar o a tocar para entender.
- **Tono académico, no «retro»:** aprobó la D (libro de texto y hoja de examen, serif de libro, cursiva al margen). Se
  le leyeron como «videojuego» las sombras duras, la letra monoespaciada en mayúsculas, las tramas de puntos, los cantos
  3D y los boletos troquelados.
- **Su original le gusta,** pero *«siento que tiene mucho texto»*.
- **De la D le gustó el concepto:**
  - la portada como pregunta de examen;
  - el poco texto;
  - «Más horas de estudio no sirven si estudias a ciegas»;
  - la ruta en cuatro pasos con apoyos visuales.
- **Le encantaron Oryzo y Dala** (*«la animacion, la paleta de colores, todo»*); de A y B dijo que *«se ven muy bien
  especialmente B»*.
- **No quiere:**
  - landings genéricas de escuela ni «modernas» de plantilla;
  - opciones por sección: una sola versión completa, a pantalla completa;
  - comparadores que encojan;
  - Fable.
- **Siente que se cicla:** cada vuelta de diseño sin la historia resuelta lo regresa al mismo punto.

## Decisiones vigentes

- **Manda el examen de admisión;** las asesorías son secundarias. Van en tres lugares: una entrada en la portada, una
  ficha más chica y la respuesta C del cierre.
- **Lo que se juega el alumno es entrar o la beca.** La página no elige por él: se lo pregunta.
- **La temática de examen se queda,** y las preguntas son la forma, no un formulario.
- **El diagnóstico express gratis:** aprobado como idea; sus detalles están por definir.
  - Por ahora es solo el botón «Haz tu diagnóstico express gratis».
  - **DIAG** se define una sola vez y lleva a WhatsApp con M6 mientras no exista el examen.
- **El dorado** es el color de la acción principal.
- **Los mensajes de WhatsApp** están en `storytelling/texto-v1.md`: van del M1 al M7, y el M7 (la beca) es nuevo.
- **La recomendación de la cabina** (`comparacion-cuatro.md`), que él no ha confirmado: la D como base y la B, más
  adelante, como página de campaña.

## Reglas (en el `CLAUDE.md`, puntos 1 a 10)

- **Una sola versión por ronda,** completa y a pantalla completa.
- **Sus palabras van a `veredictos/`, tal cual, antes de actuar.** Él a veces les escribe directo a las sesiones
  anidadas: hay que leer su transcripción.
- **Lo que él revisa va al repo,** con commit y push antes de avisarle. Nunca en `_scratch`.
- **Nunca Fable** (*«consumio muchos tokens inecesariamente, no lo volvamos a hacer»*).
- **No se generan prototipos sin su feedback.**
- **Nunca se sube código copiado con su sesión de Moodle abierta** (trae su `sesskey`).
- **Nada que cueste extra; la nube, solo si él la pide.** Si algo pide credenciales o falla, se para y se da el error
  literal.
- **El cierre de cada mensaje:** la tabla de lo medido con su hora, «Publicado: …», «Qué necesito de ti», «Qué procede»
  y, si se espera algo, «⏳ EN ESPERA de …».

## En la laptop: lo que no está en los ficheros

La laptop no ve la memoria de la PC. Lo que la cabina aprendió ahí y sirve aquí:
- **Mirar la hora con `date` antes de escribirla,** en commits, relevos y mensajes. Dos commits del 5-nov llevan una hora
  supuesta y equivocada.
- **Los scripts de Node con rutas de Windows o con `\`** se escriben a un fichero (con la herramienta de escribir), no
  por heredoc: el heredoc se come las barras.
- **Para medir y capturar,** en la PC se usó Chrome (`C:/Program Files/Google/Chrome/Application/chrome.exe`) con el
  `puppeteer-core` de `projects/cantu-lessons/tools/render/node_modules`, por `createRequire` y solo leyendo de ahí.
  - **En la laptop puede no estar `cantu-lessons`.** Si no está, se puede instalar `puppeteer-core` en el directorio
    temporal de la sesión, o usar el navegador de la app.
  - Para el 3D: `--use-angle=swiftshader --enable-unsafe-swiftshader`.
  - En la PC está apagado «Mostrar animaciones en Windows», y Chrome lo trata como `prefers-reduced-motion`: al medir,
    emular `no-preference`. En la laptop, comprobarlo.
- **Las rutas** son las mismas que en la PC si los repos están en `Documents\AIW_Workspace\projects\`. Si no, se derivan
  al abrir.

## Git

- **`metodo-cantu-landing`** es un repo propio, pero **el dueño también commitea** (`c0eb048`).
  - Al abrir: `git pull`, o `fetch` y mirar `HEAD..origin/main`.
  - El commit va por ruta, con la identidad explícita (`-c user.name=ChrissValdez -c user.email=christopherkntu@gmail.com`).
  - El push va por sha exacto.
- **`aiw-console` lo empujan las dos máquinas.**
  - LANDING escribe solo `context/cabinas/landing/`, `context/handoffs/metodo-cantu-landing.md` y sus veredictos.
  - El commit va por ruta, y antes de empujar se hace `git pull --rebase origin main`.
  - Se empuja solo si `origin/main..HEAD` trae únicamente lo propio. Si el push choca, se repite el `pull --rebase` y el
    push. **Nunca `--force`.**
- Los comandos que van a la red llevan `GIT_TERMINAL_PROMPT=0 GCM_INTERACTIVE=never`, un timeout y `< /dev/null`.

## Abierto, para después

- **`_scratch/landing/`, en la PC:** quedan `comparar/`, `ramas/` y `A-pulida-*` (21 MB) de la cabina de LECCIONES.
  Parecen copias de `variantes/`. No se borran sin su palabra.
- **SSH a su servidor de Moodle** desde la app, para trabajar código. Él dijo *«depsues trabajo en eso»*.
- **El `h1` oculto del tema** («Método Cantú»): quitarlo en los ajustes, no esconderlo.
- **Las sesiones de prototipos de la PC** (`proto-a`, `proto-b`, `proto-d` y `proto-e`) están archivadas y son de la
  cuenta principal. En la laptop, si hace falta un taller, se lanza uno nuevo con su encargo.
