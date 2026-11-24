# HANDOFF — hilo `metodo-cantu-landing` (LANDING)

> **Séptimo relevo: el cierre de la cabina suelta.** La cabina era MC-LandingPage, de la Cuenta Chris, en PC-Chris.
>
> - **Cuándo y cómo:** lo escribió esa misma cabina el **2026-11-24 a las 09:25** (`date`), en la PC. Siguió
>   `context/metodo-cantu/CIERRE-DE-CABINA.md`.
> - **Quién lo pidió:** el coordinador de Método Cantú, con el «Sí, a las dos» del operador.
> - **Adónde va la LANDING:** a la **Cuenta Pato**, por el PR 1 de `aiw-console` (D-087), que estaba por fusionar al
>   escribir esto.
> - **Qué sustituye:** el sexto relevo y sus tres adendas. Lo de antes está en el historial de git de este fichero.
>
> **Reglas:**
> - **LANDING nunca toca lo de LECCIONES.**
> - **Todo lo de aquí lleva fecha.** Contrástalo con el disco al abrir: gana el disco.
> - **Siempre en español.** Cada mensaje cierra con estas cinco partes:
>   - la tabla de lo medido, con su hora;
>   - «Publicado»;
>   - «Qué necesito de ti»;
>   - «Qué procede»;
>   - «⏳ EN ESPERA de …».
>
> **Al abrir:**
> 1. Lee enteros estos tres ficheros:
>    - `context/cabinas/landing/CLAUDE.md` (su punto 1 tiene una enmienda del 20-nov);
>    - `context/cabinas/REGLAS-DE-CABINA.md`;
>    - `context/metodo-cantu/PROYECTO.md`.
> 2. Haz `git pull --ff-only` en `Metodo_Cantu/metodo-cantu-landing` y en `aiw-console`.

## Dónde estamos (24-nov, 09:25)

**La vigente es BB**, aprobada el 22-nov.

- **Dónde está:** `prototipos/BB-la-vigente/landing.html`. Se abre con `?movimiento=si`.
- **Qué es:** AZ con dos títulos nuevos.
  - La 3 es «Con el Método Cantú sabes qué estudiar».
  - La 4 es «Elige tu horario», con la lista en dos grupos («Tu horario» y «Incluido en los dos»).
  - Es la a de BA. Él dijo *«La a»* (`veredictos/2026-11-22-az-titulos.md`).
- **El `README.md` del repo** trae la tabla de lo que quedó en cada sección.

**Lo último hecho**, en `metodo-cantu-landing`:

| commit | cuándo | qué |
|---|---|---|
| `bb7e3c9` | 22-nov, 15:39 | BB: la vigente con la 4 a; el índice y el README |
| `6a6b11d` | 23-nov, 22:12 | Veredicto: el título de la 2 suena agresivo |
| `0d7aa55` | 23-nov, 22:13 | Veredicto: las tres primeras propuestas para ese título, fuera |

**Medido al cerrar (24-nov, 09:24):**
- Los dos repos tienen `git status` limpio, y su `HEAD` es igual a `origin/main`.
  - `metodo-cantu-landing` está en `0d7aa55`.
  - `aiw-console` está en `92cace0`, antes de este relevo.
- En `metodo-cantu-landing` no hay ramas locales aparte de `main`.
- **No hay nada a medias:** ningún taller está abierto.

**Lo publicado:**
- **El repo:** https://github.com/ChrissValdez/metodo-cantu-landing (`main`).
- **El índice local:** se abre con doble clic en
  `C:\Users\chris\Documents\AIW_Workspace\Metodo_Cantu\metodo-cantu-landing\abrir-landing.cmd`. Queda en
  http://127.0.0.1:8792/.
- **BB:** http://127.0.0.1:8792/prototipos/BB-la-vigente/landing.html?movimiento=si.
  - En disco está en `C:\Users\chris\Documents\AIW_Workspace\Metodo_Cantu\metodo-cantu-landing\prototipos\BB-la-vigente\landing.html`.
  - La versión en un solo fichero es `…\BB-la-vigente\un-solo-fichero\landing-BB.html`.
- **En Moodle no hay nada:** el sitio publicado sigue con su landing original.

### Lo que espera al operador

**1. El título de la sección 2 de BB.**

Hoy la sección dice esto:
- el título: «2. No es falta de ganas: es que nadie te dijo qué estudiar.»;
- el subtítulo: «Con Método Cantú sabes qué estudiar y en qué orden.»;
- las dos tarjetas, «Estudiando por tu cuenta» y «Con Método Cantú»;
- al pie: «Que cada hora cuente.».

Sus palabras del 23-nov fueron: *«suena a uqe le estas diciendo Estas tontito, nosotros tre ayudamos, necesitamos un
stortytelling mejor»*.

**La primera ronda quedó fuera.** Él dijo: *«a muy complejo / b es lo mismo / c no suena bien»*.
- A: «El examen abarca mucho, y no todo pesa igual.»
- B: «Las ganas ya las traes.»
- C: «¿Por dónde empiezo?»

**Lo que busca:** algo simple, sin «ganas» y que no sea una pregunta.

**La segunda ronda** se le mandó en el chat el 23-nov, después de las 22:13. **No ha contestado.** Solo está escrita
aquí:

| | Título (2.) | Lo que dijo antes | Nota |
|---|---|---|---|
| **1 ★** | «Tu esfuerzo, bien dirigido.» | El 19-nov le sonó bien (`veredictos/2026-11-19-ab-comentarios.md`). | Es la recomendada. El alumno pone el esfuerzo y el método lo dirige. No le dice al alumno qué le falta, y cierra bien con «Que cada hora cuente.». |
| 2 | «Que tu esfuerzo se vea en tu puntaje.» | El 19-nov dijo que *«suena mucho mejor»* (`veredictos/2026-11-19-texto-v4-d-y-claridad-del-servicio.md`). | Con el pie, la sección tendría dos frases que empiezan con «Que…». Si la escoge, se propone quitar «Que cada hora cuente.». |
| 3 | «Estudiar por tu cuenta o con un plan.» | Nueva. | Nombra las dos tarjetas que vienen abajo. |

En las tres opciones se quedan el subtítulo, las tarjetas y el pie, salvo lo dicho en la 2.

- **Dónde está todo lo demás:** `C:\Users\chris\Documents\AIW_Workspace\Metodo_Cantu\metodo-cantu-landing\veredictos\2026-11-23-seccion-2-tono.md`.
- **Ojo al aplicar:** la 3 se titula «Con el Método Cantú sabes qué estudiar». Eso repite el subtítulo de la 2. Hay que
  enseñárselo y proponerle cambiar uno de los dos.

**2. Moodle (MB2), en espera de él** desde el 21-nov a las 19:59. Él dijo: *«dame chance tenemos que diseñar una
conexión para que analices el código y después analicemos la mejor estrategia de integración»*. Hasta entonces no se
arma ningún bloque.

**3. Los datos que solo él tiene.** Están marcados como FALTA en `storytelling/texto-v2.md`:
- quién da las clases, con su foto;
- de dos a tres testimonios;
- la duración, las horas por semana, el tamaño del grupo y cuántos simuladores;
- el próximo grupo;
- qué recibe el papá o la mamá;
- cómo es el examen diagnóstico gratis.

### Lo que sigue, en orden

1. **Cuando escoja el título de la 2:**
   1. Su palabra va tal cual a `veredictos/`.
   2. Se hace **BC**, una copia de BB en `prototipos/BC-…/` con la 2 nueva, y su encargo en `encargos/BC-….md`. Es un
      cambio de una línea, y lo puede hacer quien integra, sin taller.
   3. Se rehace el fichero único con `herramientas/unsolo.mjs` y las fotos con `fotos.mjs`.
   4. Se actualiza `index.html`: BC va arriba y BB pasa a `V` con su veredicto.
   5. Se actualiza el `README.md`.
   6. Commit, push y la captura para él.
   - **Puertos:** hasta BB se usaron del 9080 al 9149. **El siguiente es el 9150.**
2. **Moodle,** cuando él lo abra.
3. **Los datos del punto 3,** cuando los dé.

### Las herramientas después de la mudanza del 24-nov

- **El repo cambió de carpeta.** Ahora está en `AIW_Workspace\Metodo_Cantu\metodo-cantu-landing`; antes estaba en
  `projects\`.
- **`abrir-landing.cmd` y `.ps1` funcionan.** Se probaron a las 09:25 con `-SinNavegador -SinEsperar`, desde la carpeta
  nueva:
  - el pull salió al día;
  - el servidor arrancó en 8792;
  - el servidor se apagó.
- **La vista previa de la app (`landing-lamina`) ya no existe.** `AIW_Workspace/.claude/` está vacía (medido el 24-nov).
  - No estaba en ningún repo.
  - Si hace falta, se rehace con `node`, `Metodo_Cantu/metodo-cantu-landing/direccion/servidor.mjs` y el puerto 8792.
- **Las capturas** usan `puppeteer-core` de `Metodo_Cantu/cantu-lessons/tools/render/`. Sigue ahí (medido).
- **Las rutas `projects\…` de los prototipos viejos son historia:** no se corrigen.
- **`_scratch/landing/` ya no existe:** él vació `_scratch` el 24-nov.

## El camino

- De A a AL: búsqueda, rondas de diseño y textos.
- 20-nov: de AM a AS, con tres variantes por sección.
- 20 y 21-nov: de AT a AZ.
  - AT: la oferta y los paquetes.
  - AX: el menú de variantes.
  - AZ: textos claros.
- 22-nov: BA y BB.
- **El detalle:** el `README.md` y el `index.html` del repo.
- **Sus palabras, tal cual:** en `veredictos/`. El 24-nov tenía 87 ficheros: 81 `.md` y 6 imágenes.
- **Los encargos:** en `encargos/`, uno por ronda.

## Cómo se trabaja (lo que la memoria de la PC sabía)

- **Talleres:**
  - se lanzan como sesión anidada (`start_session`: user_asked, fresh, sin worktree, wake_when_done);
  - Opus 5.5 con esfuerzo alto para diseñar, Sonnet con esfuerzo medio para lo mecánico; **nunca Fable**;
  - cada uno escribe solo en `prototipos/<ID>/` y no usa git, `_scratch` ni el puerto 8792;
  - no usan los skills `hallmark` ni `frontend-design`;
  - se les dice «si lanzas algo en segundo plano, espera y sigue»;
  - los lanza quien coordina, nunca el dueño.
- **Cada ronda va en una carpeta nueva.** Las de antes son historia y no se tocan.
- **Las palabras del dueño van a `veredictos/` antes de actuar.** Las decisiones, en una tabla.
- **Los textos se proponen en el chat:**
  - van en tablas, con una recomendación y su porqué;
  - ya aprobados, se aplican sin otra ronda (lo pidió para ahorrar).
- **Para revisar variantes,** se usa una sola página con el menú flotante «Variantes», abajo a la izquierda
  (`prototipos/AX-menu-de-variantes/revision.js`). Se esconde con `?revision=no`. Lo pidió él: abrir diez ligas le
  costaba.
- **Al entregar un taller:**
  1. leer `NOTAS.md` y mirar las capturas;
  2. commitear la carpeta;
  3. actualizar `index.html`:
     - el nuevo arriba (la tarjeta, `NUEVOS` y `VARIANTES`);
     - el anterior a `V`, con su veredicto;
     - los descartes en `tr.fuera`;
     - el mapa;
     - la miniatura en `inventario/miniaturas/<id>.webp`;
  4. push;
  5. mandarle las capturas.
- **`index.html` es CRLF:**
  - se edita con un script de Node que pasa a LF, cambia con guardas que fallan si no casan y reescribe `\r\n`;
  - después se comprueba que quedan 0 LF sueltos;
  - los scripts se escriben con la herramienta de escribir o con un heredoc entre comillas (`<<'EOF'`), nunca con
    `node -e "..."` que lleve comillas invertidas.

## Lo que hay en el repo (al 24-nov)

| ruta | qué es |
|---|---|
| `README.md` | **«La versión vigente»** (BB) arriba, con la tabla por sección, y luego cómo vive la landing en Moodle |
| `index.html` | **La página de entrada:** el nuevo arriba con sus enlaces, las versiones anteriores con su veredicto (`V`), lo que se rescata y lo que no, y el mapa |
| `abrir-landing.cmd` y `.ps1` | **El botón que usa el dueño:** hace `git pull --ff-only`, levanta `node direccion/servidor.mjs` en 8792 si no está y abre el navegador |
| `direccion/servidor.mjs` | El servidor local (`127.0.0.1:8792`) |
| `storytelling/` | Los textos aprobados y el análisis |
| `prototipos/` | De A a BB. **La vigente es BB**; las demás son historia |
| `encargos/` | Un encargo por ronda (`<ID>-….md`; el de BB es `BB-la-vigente.md`). Las reglas de las primeras rondas están en los `RONDA-*.md` |
| `veredictos/` | Sus palabras, tal cual |

## Técnico

- **La memoria de la PC no viaja.** Lo necesario está en este relevo, en el `CLAUDE.md` y en `PROYECTO.md`.
- **Capturas:**
  - con `puppeteer-core` de `Metodo_Cantu/cantu-lessons/tools/render/`, cargado por `createRequire` y solo leyendo de
    ahí;
  - Chrome está en `C:/Program Files/Google/Chrome/Application/chrome.exe`;
  - un navegador por página;
  - para cerrar procesos, solo los propios.
- **Su Windows tiene las animaciones apagadas** (Chrome lo lee como `reduce`). Por eso los prototipos aceptan
  `?movimiento=si`.
- **La hora se mide con `date` antes de escribirla.**

## Git

- **`metodo-cantu-landing`:**
  - el commit va por ruta, con identidad explícita: `-c user.name=ChrissValdez -c user.email=<el de la cuenta>`;
  - el mensaje termina con `Co-Authored-By`;
  - antes del push, `fetch`, y se comprueba que `HEAD..origin/main` está en 0;
  - el push va por sha: `git push origin <sha>:refs/heads/main`;
  - los comandos de red llevan `GIT_TERMINAL_PROMPT=0 GCM_INTERACTIVE=never`, un timeout y `< /dev/null`.
- **`aiw-console`** (`PROYECTO.md` §4):
  - LANDING escribe solo `context/cabinas/landing/` y este fichero;
  - antes de escribir, `fetch`; si el árbol está limpio y solo va detrás, `pull --ff-only`;
  - el commit va por ruta;
  - se empuja solo si `origin/main..HEAD` trae solo lo propio, y por sha;
  - **nunca** rebase, `--force` ni `reset --hard`.

## Abierto, para después

- **Nada se ha probado en Safari, en Firefox ni en un celular real.**
- **A 320 px,** la etiqueta «Con Método Cantú» de la hoja de la portada se sale durante su animación de entrada.
  - Se midió en AS: [NO VERIFICADO] en BB.
- **La franja de asesorías,** de AS: a 1024 y a 320 px, «universidad.» cae sola en el último renglón. Al dueño no le
  molestó.
  - [NO VERIFICADO] en BB: la 4 cambió en AZ y en BA.
- **El contorno de los botones dorados sobre fondo claro** contrasta 1.6:1. El texto del botón sí pasa.
