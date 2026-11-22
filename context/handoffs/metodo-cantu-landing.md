# HANDOFF — hilo `metodo-cantu-landing` (LANDING)

> **Sexto relevo: la landing pasa a la otra cuenta (la suplementaria).** Lo escribió la cabina LANDING el **2026-11-20
> hacia las 07:52** (`date`), en la PC, al pedir el dueño: *«dame el handsoff para cambiar de cuenta de forma limpia y
> seguir en la otra cuenta»*. Se siguió el «1. Cierre» de `context/cambio-de-cuenta/OTRA-CABINA-EN-LAPTOP.md`.
> Sustituye al quinto (20-nov, 04:10). Lo de antes está en el historial de git de este fichero.
>
> - **LANDING nunca toca lo de LECCIONES.**
> - **Todo lo de aquí lleva fecha. Contrástalo con el disco al abrir: gana el disco.**
> - **Al abrir:**
>   - lee enteros `context/cabinas/landing/CLAUDE.md` (su punto 1 tiene una enmienda del 20-nov) y
>     `context/cabinas/REGLAS-DE-CABINA.md`;
>   - haz `git pull` en `metodo-cantu-landing` y en `aiw-console`.
> - **Siempre en español** (lo pidió el dueño). Cada mensaje cierra con «Qué necesito de ti», «Qué procede» y
>   «⏳ EN ESPERA de …».

> **Adenda del 21-nov, 19:46 (`date`), en la PC: lo que pasó después del sexto relevo. Gana sobre lo de abajo.**
> - **La vigente, aprobada:** `metodo-cantu-landing/prototipos/AZ-textos-claros/landing.html` (el dueño: «Me gusto esta
>   nueva version»). En un solo fichero: `…/AZ-textos-claros/un-solo-fichero/landing-AZ.html`. El README y el índice la
>   marcan vigente; la tabla sección por sección está en el README. **Lo de «Lo decidido (AS)» de abajo quedó viejo.**
> - **El camino:** AT (la oferta y los paquetes) → AU (cinco ideas de la 4, ninguna) → AV (vuelta a AF: la 3, la 4 visor y la
>   6) → AW (pulido; sin la sección de preguntas; títulos centrados) → AX (el **menú de variantes**, `revision.js`) → AY (la
>   vigente sin variantes) → AZ (textos claros en la 4 y la 5). Veredictos en `veredictos/2026-11-20-a{t..x}-comentarios.md`
>   y `2026-11-21-ay-textos.md`.
> - **Cómo se revisa desde AX:** una sola página con el menú flotante «Variantes» abajo a la izquierda
>   (`prototipos/AX-menu-de-variantes/revision.js`, reusable; `?revision=no` lo esconde). El dueño lo pidió: abrir diez ligas
>   le costaba. **Textos:** se proponen en el chat, en tablas, y se corrigen ya aprobados (lo pidió para ahorrar).
> - **Uso:** el dueño **quitó el tope de uso** para LANDING el 20-nov a las 15:00. Talleres: Opus alto para diseño, Sonnet
>   medio para lo mecánico; nunca Fable. Puertos usados hasta AY: 9135–9139 (el siguiente, 9140).
> - **Abierto:** (1) **Moodle, en espera del dueño** (21-nov, 19:59): *«dame chance tenemos que diseñar una conexión para
>   que analices el código y después analicemos la mejor estrategia de integración»*. No se arma ningún bloque hasta entonces.
>   (2) El pedido de **Resuelve Esparza** (lista de estilo visual): **no**. El dueño: *«Resuelve esparza no, ya está trabajando
>   bien y trae su propio flujo»*; se le contestó a esa cabina.

## Dónde estamos

- **La página está completa y decidida.** La versión vigente es
  **`metodo-cantu-landing/prototipos/AS-pregunta-papas/landing.html`**, que se abre con `?movimiento=si`.
  - El `README.md` del repo la marca como vigente, con lo que quedó en cada sección.
  - En `index.html` está arriba, como «AS».
- **No hay ningún taller a medias.** AQ y AR terminaron, se revisaron y están commiteados. AS la hizo la cabina (una
  línea).
- **Al cerrar, todo está commiteado y subido:**
  - `metodo-cantu-landing` en `dd87ab7`;
  - `aiw-console` en el commit de este relevo.
- **El sitio publicado sigue siendo su original:** nada se ha portado a Moodle.
- **La cuenta principal quedó al 86 % semanal** (se renueva el sábado 21-nov a las 00:00, hora local). El dueño
  reservó el 12 % para otro trabajo: con esa cuenta, nada pasa del 88 % sin su sí. La cuenta suplementaria tiene su
  propio uso: míralo al abrir.

## Lo que sigue

> **Adenda del 20-nov, 14:55 (en la PC, antes de cambiar):** el dueño dio feedback de AS
> (`metodo-cantu-landing/veredictos/2026-11-20-as-comentarios.md`): ajustes en la 1, la 2 y la 3; la 4 como la más débil
> (base: la b de AI, con cinco variantes); **la página no dice qué se vende**, y dio los paquetes. Pidió revisar primero el
> storytelling. La propuesta de la cabina está en `metodo-cantu-landing/storytelling/propuesta-oferta-2026-11-20.md`,
> **por aprobar**, con cuatro preguntas sobre los paquetes. **Lo primero en la otra cuenta:** que la apruebe o la corrija y
> conteste esas preguntas; luego, la ronda AT. La cuenta principal quedó al 90 % semanal: no se lanzó nada.

1. **Que el dueño revise AS** en el índice. Puede pedir retoques chicos.
2. **Pasarla a Moodle (MB2):** es la fase siguiente. El dueño dijo que conviene hacerla con cuenta fresca. Antes de
   empezar:
   - leer en el `README.md` del repo «Dónde vive» (un bloque HTML por sección, con prefijos de clase propios, imágenes por
     `pluginfile.php` y todo a WhatsApp);
   - leer el punto 6 del `CLAUDE.md`: **nunca subir código con la sesión de Moodle abierta**;
   - el SSH a su servidor de Moodle quedó para después (*«depsues trabajo en eso»*).
3. **Los datos que solo él tiene** (FALTA en `storytelling/texto-v2.md`) siguen sin entrar:
   - quién da las clases;
   - testimonios;
   - el paquete y el próximo grupo;
   - en cuánto tiempo contestan;
   - qué mide el express, cuánto dura y cómo llegan los resultados.

## Lo decidido, sección por sección (AS, 20-nov)

| sección | lo que quedó | veredicto |
|---|---|---|
| encabezado | el botón de WhatsApp, amarillo | `2026-11-20-ar-comentarios.md` |
| 1 · portada | sin caja y sin la frase de apoyo | `2026-11-20-ap-comentarios.md` |
| 2 | «No es falta de ganas: es que nadie te dijo qué estudiar.» y «Con Método Cantú sabes qué estudiar y en qué orden.»; las dos tarjetas; «Que cada hora cuente.» a mano junto al logo | ídem |
| 3 · los 4 pasos | la b de AQ: uno a la vez, flechas, la hoja del alto de la tarjeta y sin hueco abajo | `2026-11-20-aq-comentarios.md` |
| 4 | la a; la franja «¿Buscas asesoría para alguna materia?» · «También te ayudamos con materias de prepa y universidad.» | ídem |
| 5 | seis preguntas; entran «¿Todavía estoy a tiempo?», «Soy papá o mamá: ¿cómo veo su avance?» (antes de la última) y «¿Cómo me inscribo?»; el botón dorado | `2026-11-20-aq-comentarios.md`, `2026-11-20-ar-comentarios.md` |
| 6 | el footer marino con las burbujas, sin tijeras ni recorte | `2026-11-20-ap-comentarios.md` |

**La estrategia de pulido (desde el 20-nov, tras AM):** un solo prototipo, con hasta tres variantes por sección. Él
descarta, y lo decidido se fija en la ronda siguiente (`veredictos/2026-11-20-am-comentarios.md`). Con la página ya
decidida, lo que venga es una sola versión.

## El camino del 20-nov

| ronda | qué fue | quién |
|---|---|---|
| AM | un solo prototipo con las correcciones juntas | taller, Opus |
| AN | tres variantes por sección | taller, Opus |
| AO | la 2 con otra narrativa, la 3 sin espacio perdido, las tijeras | taller, Opus |
| AP | la 2 en otro diseño, la 3 con la hoja protagonista, las tijeras en el borde | taller, Opus |
| AQ | casi final: la 1 sin caja, la 2 con tarjetas y firma, tres de la 3 sobre AN | taller, Opus |
| AR | la 3 b fija, la franja de asesorías, dos preguntas nuevas | taller, Sonnet, esfuerzo medio |
| AS | la pregunta para los papás | la cabina, sin encargo |

**Sus palabras, tal cual:** `veredictos/` (80 ficheros al 20-nov, 07:52). Los encargos están en `encargos/`.

**Puertos de los talleres:** AM 9080–84, AN 9085–89, AO 9090–94, AP 9095–99, AQ 9100–04 (no lo usó: trabajó por
`file://`), AR 9105–09. El siguiente es 9110.

## Cómo se trabaja (lo que la memoria de la PC sabía)

- **Talleres:**
  - se lanzan como sesión anidada (`start_session`: user_asked, fresh, sin worktree, wake_when_done);
  - Opus 5.5 con esfuerzo alto para diseñar, Sonnet con esfuerzo medio para lo mecánico, **nunca Fable**;
  - cada uno escribe solo en `prototipos/<ID>/` y no usa git, `_scratch` ni el puerto 8792;
  - no usan los skills `hallmark` ni `frontend-design`;
  - se les dice «si lanzas algo en segundo plano, espera y sigue»;
  - la cabina los lanza: nunca se le pide al dueño.
- **Las palabras del dueño van a `veredictos/` antes de actuar.** Las decisiones, en una tabla.
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
- **`index.html` es CRLF:** se edita con un script de Node que pasa a LF, cambia con guardas que fallan si no casan y
  reescribe `\r\n`. Después se comprueba «LF sueltos: 0». Los scripts se escriben con la herramienta de escribir o con
  un heredoc entre comillas (`<<'EOF'`), nunca con `node -e "..."` que lleve comillas invertidas.
- **Cuando se le pide escoger,** se le da la recomendación con su porqué (lo pidió así), en una tabla, y se le cita
  tal cual.

## Lo que hay en el repo (al 20-nov, 07:52)

| ruta | qué es |
|---|---|
| `README.md` | **«La versión vigente»** arriba, y luego cómo vive la landing en Moodle |
| `index.html` | **la página de entrada:** «Lo que sigue», el nuevo arriba con sus enlaces, las versiones anteriores con su veredicto (`V`), lo que se rescata y lo que no, y el mapa |
| `abrir-landing.cmd` + `.ps1` | **el botón que usa el dueño:** hace `git pull`, levanta `node direccion/servidor.mjs` en 8792 si no está y abre el navegador |
| `direccion/servidor.mjs` | el servidor local (`127.0.0.1:8792`) |
| `storytelling/` | los textos aprobados y el análisis |
| `prototipos/` | de A a AS. **Vigente: AS**; las demás son historia |
| `encargos/` | un encargo por ronda, con sus reglas en `RONDA-EFG.md` y `RONDA-QRSTU.md` |
| `veredictos/` | sus palabras, tal cual |

## Técnico

- **La memoria de la PC no viaja.** Lo necesario está en este relevo y en el `CLAUDE.md`.
- **Capturas:** `puppeteer-core` de `projects/cantu-lessons/tools/render/` por `createRequire`, solo leyendo de ahí.
  - Chrome está en `C:/Program Files/Google/Chrome/Application/chrome.exe`.
  - Un navegador por página.
  - Para cerrar procesos, solo los propios.
- **Su Windows tiene las animaciones apagadas** (Chrome lo lee como `reduce`): los prototipos aceptan
  `?movimiento=si`.
- **La hora se mide con `date` antes de escribirla.**
- **La vista previa de la app** usa `landing-lamina` de `AIW_Workspace/.claude/launch.json`, que no está en ningún
  repo:
  - `"runtimeExecutable": "node"`;
  - `"runtimeArgs": ["projects/metodo-cantu-landing/direccion/servidor.mjs"]`;
  - `"port": 8792`.

## Git

- **`metodo-cantu-landing`:**
  - el commit va por ruta, con identidad explícita (`-c user.name=ChrissValdez -c user.email=christopherkntu@gmail.com`);
  - el mensaje termina con `Co-Authored-By`;
  - antes del push: `fetch` y comprobar que `HEAD..origin/main` está en 0;
  - el push va por sha (`git push origin <sha>:refs/heads/main`);
  - los comandos de red llevan `GIT_TERMINAL_PROMPT=0 GCM_INTERACTIVE=never`, un timeout y `< /dev/null`.
- **`aiw-console`:**
  - LANDING escribe solo `context/cabinas/landing/` y este fichero;
  - el commit va por ruta, y antes de empujar se hace `git pull --rebase origin main`;
  - se empuja solo si `origin/main..HEAD` trae solo lo propio;
  - nunca `--force`.

## Abierto, para después

- **Nada se ha probado en Safari, en Firefox ni en un celular real.**
- **A 320 px,** la etiqueta «Con Método Cantú» de la hoja de la portada se sale durante su animación de entrada.
- **La franja de asesorías:** a 1024 y a 320 px, «universidad.» cae sola en el último renglón. Al dueño no le molestó.
- **El contorno de los botones dorados sobre fondo claro** contrasta 1.6:1. El texto del botón sí pasa.
- **`_scratch/landing/` en la PC** (de la cabina de LECCIONES): no se borra sin su palabra.
