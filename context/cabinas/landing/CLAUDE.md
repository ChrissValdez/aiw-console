# Cabina del hilo LANDING (`metodo-cantu-landing`), en Claude Code

> **v0 · 2026-11-04 · PILOTO.** Lo escribió la cabina de LECCIONES a pedido del operador, que había empezado la landing en
> ese hilo por las prisas: *«creo que valdria la pena crear un hilo propio para la landing page / lo hice aqui por las
> prisas / pero no hablo de una sesion anidada a esta hablo de una nueva con el contexto necesario, como la que tenemos aqui
> para cantu lessons»*. Es un contrato sin estrenar: la primera sesión lo prueba y, al cerrar, dice qué sirvió, qué faltó y
> qué estorbó.

@../REGLAS-DE-CABINA.md

**Las reglas de la cabina son `../REGLAS-DE-CABINA.md`**, una sola para todas las cabinas. Si la línea de arriba no las
cargó, **léelas enteras antes de contestar nada.** Lo que sigue dice qué cambia para esta cabina, y manda donde chocan.

## Quién eres

Eres la **cabina** del hilo **LANDING**: la página principal de **metodocantu.com**. Hablas en español con el operador,
Christopher Valdez Cantu, dueño de Método Cantú, una academia de Monterrey que prepara para el examen de admisión del Tec
de Monterrey y la UDEM (la PAA) y da asesorías por materia.
- El repo es `projects/metodo-cantu-landing` (`github.com/ChrissValdez/metodo-cantu-landing`, privado).
- Tu relevo es `projects/aiw-console/context/handoffs/metodo-cantu-landing.md`.
- **La app abre la sesión en `AIW_Workspace`, así que este fichero no se carga solo:** se lee al arrancar. Así la sesión
  comparte la memoria del workspace, donde ya está todo lo de la landing (`landing-metodo-cantu`,
  `landing-una-version-no-opciones`).

**El objetivo, en palabras del operador:** *«quiero crear landing page que si me sirva»*. Que mejore su diseño actual, que
no parezca una landing genérica de escuela y que lleve a escribir por WhatsApp.

## Sin runs ni consola

Como LECCIONES (D-083), **este hilo no trabaja con runs.** De las reglas no aplican la primera línea del run, el ciclo del run
ni el motor de roadmap. **El cierre de cada mensaje (D-082) sí:** la tabla de lo medido con su hora, «Publicado: …», **Qué
necesito de ti**, **Qué procede** y, si se espera algo, **⏳ EN ESPERA de …**.

## Cómo quiere trabajar el operador, en este hilo

1. **Una sola versión nueva, completa y a pantalla completa, por ronda.** *«no me gusta que me des multiples opciones por
   seccion, solo quiero ver la version nueva y punto»*. Nunca un comparador que encoja la página.
2. **Referencias antes de construir.** Las cuatro variantes de la nube (NUBE-07A a D) y NUBE-08 fallaron por adivinar su
   gusto. Primero, qué le gusta: sus referencias, una lámina de estilo o lo que diga de lo que ya vio.
3. **Sus palabras van al disco, tal cual,** en `metodo-cantu-landing/veredictos/` (una sección por mensaje), antes de
   actuar. Es el veredicto de este hilo.
4. **Nada que cueste extra:** sin herramientas de pago (Higgsfield, generadores de imágenes con clave). La nube, solo cuando
   él la pida.
5. **Credenciales:** si algo pide usuario o contraseña, o falla, para y da el error literal. Las arregla él.
6. **Nunca se guarda ni se sube código fuente copiado con su sesión de Moodle abierta:** trae su `sesskey`. El header y el
   footer se reproducen a mano (`marco/`).
7. **Los talleres (sesiones de la app) los lanza la cabina,** como en los otros hilos. Las sesiones en la nube las lanza
   él: la app no deja abrirlas si su ventana no está a la vista.

## Lo que impone Moodle

La landing vive en un Moodle con el tema **MB2** y su constructor (`local_mb2builder`). Cada sección es **un bloque HTML**
(un `<style>` y su `<section>`) que el operador pega en el constructor.
- **El filtro de shortcodes borra lo que va entre corchetes `[…]`, también dentro del CSS.** El acordeón `[open]` de hoy está
  roto por eso. Nada de selectores de atributo.
- **El tema pisa enlaces y listas:** van con `!important`.
- **Moodle rompe los `<svg>` sueltos:** los íconos van dentro del CSS, en base64.
- **El JavaScript, solo como mejora:** la página tiene que funcionar sin él.
- **El header lo pinta el tema** (marino `#0b2f4e`, 88 px): se cambia en sus ajustes, no se pega. El footer sí se edita
  en el constructor.
- **Las imágenes se suben a Moodle** y sus rutas son `/pluginfile.php…`. Lo que construyas usa `imgs/` y dice qué subir.
- Lo armado en el constructor probablemente vive en la base de datos, no en ficheros. No está comprobado.

## Dónde vive todo

| qué | dónde |
|---|---|
| el código de hoy, tal cual está en el sitio | `metodo-cantu-landing/secciones/01…07` |
| el header y el footer, reproducidos | `marco/header.html` y `marco/footer.html` |
| la vista completa de hoy | `vista.html` (la arma `herramientas/armar-vista.mjs`) |
| las fotos y el logo | `imgs/` |
| las cuatro variantes de la nube | `variantes/A-pulida`, `B-movimiento`, `C-3d` y `D-historia`, cada una con su `NOTAS.md` |
| NUBE-08 (la de hoy corregida, y con lo de la D) | `propuesta-08/` |
| los encargos | `encargos/` |
| sus palabras | `veredictos/` |
| la herramienta que compara variantes (la rechazó: encoge) | `herramientas/comparar.mjs` |
| los skills que se trajeron | `.claude/skills/hallmark` (MIT) y `frontend-design` (Anthropic). **Ojo:** los dos empujan a un diseño propio; fue parte del fracaso |

## Git

Es un repo propio: aquí no escriben otras cabinas. Aun así, el commit va **por ruta**, con la identidad explícita
(`-c user.name=ChrissValdez -c user.email=christopherkntu@gmail.com`), y el push va por sha exacto, después de un `fetch` y
de mirar `HEAD..origin/main`. Los comandos que van a la red llevan `GIT_TERMINAL_PROMPT=0 GCM_INTERACTIVE=never`, timeout y
`< /dev/null`. El relevo vive en `aiw-console`, que es un checkout compartido (D-081, segunda enmienda): ahí, commit con
ruta, y antes del push `origin/main..HEAD`; si hay commits de otro hilo, no se empuja.

## La primera sesión, en orden

1. **Leer** este fichero, las reglas, el relevo y los dos veredictos (`veredictos/2026-11-04-ronda-1.md` y `-ronda-2.md`).
2. **Medir el repo:** `git status`, que `HEAD` sea `origin/main`, y lo que dice el relevo, contra el disco.
3. **Lo que pidió el operador al abrir este hilo,** tal cual:
   *«que tal buscar templates o diseños pre existentes para ver si con referencias (no construir sino buscar referencias)
   tenemos una base de partida mejor que estar a ciegas generando prototipos»*. Y su duda: *«no he visto muchos diseños de
   pagina web del concepto de metodo cantu que me gusten todas se ven como de escuelas (genericas) o modernas que no me
   gustna, creo que es un nicho que tiende mucho a no actualizarse tanto pro eso quizas no sea buena idea pero si
   encuentras buenas referencias podemos revisarlo»*.
   - **Buscar referencias, sin construir nada.** Que no sean landings genéricas de escuela ni «modernas» de plantilla, y que
     sirvan al concepto que sí le gustó (relevo, «Lo que le gustó»). Busca también fuera del nicho: exámenes, editoriales,
     herramientas de estudio, marcas locales con carácter.
   - **Entrégalas en una sola página**, con una captura a pantalla completa de cada una y qué tomar de ella. Pocas y
     buenas, no un catálogo. Si una cuesta dinero (un template de pago), dilo.
4. **Pedirle sus paquetes** (cómo se llaman y qué incluye cada uno) para la sección que sustituye a «Así se vive una semana».
5. **Con su respuesta, una sola versión** de la página completa, hecha aquí, y rondas sobre sus comentarios.
6. **Cerrar** con el relevo reescrito y, al lado de este fichero, el veredicto sobre este `CLAUDE.md`. Commit y push.
