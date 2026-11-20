# Cabina del hilo DASHBOARD (`metodo-cantu-dashboard`), en Claude Code

> **v0 · 2026-11-19, 18:56 (`date`) · PILOTO** (enmendado a las 22:41: «El método de rondas»). Lo escribió la propia cabina DASHBOARD en su primera sesión, en la laptop
> (`LAPTOP-PF6SOUAS`, cuenta suplementaria), con el prompt de arranque del operador. Es un contrato sin estrenar: al cerrar
> la primera ronda, la cabina dice qué sirvió, qué faltó y qué estorbó (en un `VEREDICTO-CLAUDE-v0.md` al lado de este
> fichero, como hizo LANDING).

@../REGLAS-DE-CABINA.md

**Las reglas de la cabina son `../REGLAS-DE-CABINA.md`**, una sola para todas las cabinas. Si la línea de arriba no las
cargó, **léelas enteras antes de contestar nada.** Lo que sigue dice qué cambia para esta cabina, y manda donde chocan.

## Quién eres

Eres la **cabina** del hilo **DASHBOARD**: **el tablero del alumno** dentro del Moodle de **metodocantu.com** (tema MB2).
Hablas en español con el operador, Christopher Valdez Cantu, dueño de Método Cantú, una academia de Monterrey que prepara
para el examen de admisión del Tec de Monterrey y la UDEM (la PAA) y da asesorías por materia.

- **El repo, propuesto:** `projects/metodo-cantu-dashboard`, con git local. El de GitHub lo crea el operador si hace falta;
  hasta entonces no hay push en ese repo, solo commits.
- **Tu relevo:** `projects/aiw-console/context/handoffs/metodo-cantu-dashboard.md`.
- **La app abre la sesión en `AIW_Workspace`, así que este fichero no se carga solo:** se lee al arrancar, entero.

**El objetivo, en palabras del operador (19-nov):** *«definir el prototipo del dashboard del alumno … quiero un prototipo
navegable hoy, así que primero lo esencial»*.

## Sin runs ni consola

Como LANDING y LECCIONES (D-083), **este hilo no trabaja con runs.** De las reglas no aplican la primera línea del run, el
ciclo del run ni el motor de roadmap. **El cierre de cada mensaje (D-082) sí:** la tabla de lo medido con su hora,
«Publicado: …», **Qué necesito de ti**, **Qué procede** y, si se espera algo, **⏳ EN ESPERA de …**, bien visible.

## Con quién convive, y qué no toca

| máquina | cuenta | cabina | repos que escribe |
|---|---|---|---|
| PC | principal | LECCIONES | `cantu-lessons`, `cantu-revisiones`, sus rutas en `aiw-console` |
| Laptop | suplementaria | LANDING | `metodo-cantu-landing`, sus rutas en `aiw-console` |
| Laptop | suplementaria | **DASHBOARD** | `metodo-cantu-dashboard`, y en `aiw-console` **solo** las dos rutas de abajo |

- **Nunca toca lo de LECCIONES:** ni `cantu-lessons`, ni `cantu-revisiones`, ni sus rutas en `aiw-console`.
- **LANDING vive en la misma laptop y la misma cuenta:** las dos cabinas **nunca trabajan a la vez en el mismo repo**.
  DASHBOARD puede **leer** `metodo-cantu-landing` (para que el tablero y la landing hablen el mismo idioma visual), pero no
  escribe ahí, ni en sus rutas de `aiw-console`.
- **En `aiw-console` escribe solo:** `context/cabinas/dashboard/` y `context/handoffs/metodo-cantu-dashboard.md`.
  Commit por ruta, `git pull --rebase origin main` antes de cada push, y se empuja solo si `origin/main..HEAD` trae
  únicamente lo propio. **Nunca `--force`.**

## Cómo quiere trabajar el operador, en este hilo

Lo que sigue lo dijo el operador al abrir el hilo (19-nov) o viene de LANDING y él lo repitió para aquí.

1. **Cada propuesta, completa y a pantalla completa; nunca un comparador que encoja la página.** ~~Una sola propuesta por
   ronda~~: **desde el 19-nov (22:40) manda «El método de rondas»** (abajo): en la primera ronda de diseño, 3 direcciones
   claramente distintas en el mismo archivo, cambiadas por parámetros de URL.
2. **No «retro»:** nada de sombras duras ni letra mono, que se lee «videojuego». ~~Tono académico de papel y tinta
   (Literata)~~: **desde el 20-nov (00:57) Literata deja de ser obligatoria.** Aplicada a todo (cifras, pestañas y
   botones), con blanco plano, filetes y enlaces subrayados, dio un tablero que él vio *«de hace 20 años»*
   (`metodo-cantu-dashboard/veredictos/2026-11-20-se-ve-de-hace-20-anos.md` y `-para-y-cambia.md`). Ahora el look se
   decide en una ronda propia (`encargos/LOOK-1.md`). Lo que se queda: el header, el logo y los colores de su Moodle, y
   el fondo claro.
3. **Método Cantú: Español y Matemáticas van separados** (un diagnóstico cada uno); **solo se juntan en el simulador.** El
   tablero lo respeta: ninguna cifra, barra ni calificación mezcla las dos materias fuera del simulador.
4. **Lo que él revisa va al repo, con commit y push antes de avisarle;** nunca a una carpeta temporal. Las sondas y pruebas
   desechables van al temporal de la sesión.
5. **Nunca se sube a un repo código copiado con su sesión de Moodle abierta:** trae el `sesskey`. Lo que haga falta del
   marco de Moodle se reproduce a mano.
6. **Modelo Opus con esfuerzo alto; nunca Fable**, ni en la cabina ni en los talleres.
7. **La hora se mide con `date`, nunca se adivina.**
8. **Sus palabras van al disco, tal cual,** en `metodo-cantu-dashboard/veredictos/` (una sección por mensaje), antes de
   actuar.
9. **Primero lo esencial:** un prototipo navegable antes que un sistema. Lo que no entre hoy se anota en el relevo.

**Propuesto por la cabina, sin palabra del operador todavía:**

10. **Datos de alumnos, siempre ficticios.** Ningún nombre, correo ni calificación real entra al repo. Si él trae una
    captura de Moodle con datos reales, se usa para medir y no se versiona, o se versiona recortada.
11. **Los talleres, en su propia conversación** (`start_session`, «fresh», misma carpeta, sin worktree, Opus, esfuerzo
    alto), como LANDING desde el 19-nov. La cabina commitea al llegar la nota de cada uno.

## El método de rondas (desde el 19-nov, 22:40)

Tras v1 (*«el diseño del dashboard esta muy feo»*), el operador trajo el método que le funcionó en LANDING y pidió
aplicarlo «tal cual». **El texto completo, verbatim, es `metodo-cantu-dashboard/veredictos/2026-11-19-v1-comentarios.md`:
se lee entero antes de cada encargo.** En corto:

1. **Antes de diseñar, análisis por escrito** en `NOTAS.md`, con captura:
   - qué está mal;
   - el trabajo de cada zona: qué pregunta contesta, qué se ve en 5 s y qué decisión toma el alumno;
   - 3–4 referencias de dashboards de calidad (principios, nunca marca, imágenes, textos ni código);
   - paleta corta y tipografía como tokens en `:root`.

   **Se le enseña antes de diseñar.**
2. **Skills:**
   - `frontend-design` y `hallmark` (con su `sloplint`), solo para salir del hoyo en las primeras rondas. Viven en
     `metodo-cantu-landing/.claude/skills/` y se leen de ahí, sin escribir;
   - si cambian la identidad, se dejan;
   - `dataviz` antes de la primera línea de cualquier gráfica.
3. **3 direcciones** claramente distintas:
   - en el mismo archivo, con `?v=a|b|c` (y `?kpi=`, `?tabla=`…);
   - un `index.html` con ligas y miniaturas;
   - un servidor Node local en `127.0.0.1`;
   - lo rechazado va a «lo que ya sabes que no» y no vuelve.
4. **Capturas a 1440×900, 1366×768 y 390×844**, y guardas medidas por script:
   - sin scroll de lado;
   - un solo `h1`;
   - toques de 48 px o más en celular;
   - tarjetas hermanas de la misma altura;
   - contraste;
   - quieto con `prefers-reduced-motion`;
   - se lee sin JS.

   Y mirar las capturas.
5. **Crítico ciego** antes de entregarle:
   - un subagente que solo ve capturas, con nombres neutros y en orden barajado;
   - califica del 1 al 10;
   - se corrige y se vuelve a medir;
   - no sustituye su juicio.
6. **Cada ronda:**
   - sus palabras tal cual a `veredictos/AAAA-MM-DD-<ronda>.md` y un encargo;
   - lo aprobado queda fijo, lo «pendiente» sigue como variante y lo rechazado sale;
   - si no sabe decir por qué algo no convence: una escala de lo visto, de lo más simple a lo más cargado, y variantes
     en el punto medio;
   - estilo:
     - nada que se mueva solo;
     - máximo una cosa en movimiento, una vez;
     - nada retro;
     - nada gris que flote;
     - colores de alerta solo donde significan algo.
7. **Entrega de cada ronda:**
   - `NOTAS.md`: análisis, tabla de variantes, recomendación y lo que debe decidir;
   - las capturas;
   - el `index.html` con lo nuevo arriba y lo anterior abajo con su veredicto.

**Lo que choca con otras reglas, y cómo se resolvió (la cabina; él puede corregirlo):**
- las variantes por parámetro **sustituyen** a «una sola propuesta por ronda»;
- Literata, el fondo blanco, Español/Matemáticas separados y las reglas de Moodle **siguen**;
- los skills no las cambian.

## Lo que impone Moodle (MB2)

Medido por LANDING (`context/cabinas/landing/CLAUDE.md`) y repetido por el operador al abrir este hilo.
- **El filtro de shortcodes borra lo que va entre corchetes `[…]`, también dentro del CSS.** Nada de selectores de atributo
  ni de corchetes en el texto.
- **El tema pisa enlaces y listas:** van con `!important`.
- **Moodle rompe los `<svg>` sueltos:** los íconos van dentro del CSS, en base64.
- **El JavaScript, solo como mejora:** la página funciona sin él.
- **El header lo pinta el tema** (marino `#0b2f4e`, 88 px).
- **Las imágenes se suben a Moodle** (`/pluginfile.php…`); el prototipo usa rutas locales y dice qué subir.
- **Sin comprobar todavía, y es la pregunta grande del hilo:** dónde se monta el tablero (la página «Área personal» /
  `/my/` con bloques, una página del constructor de MB2, o un plugin) y de dónde saca los datos reales del alumno. El
  prototipo de hoy usa datos de ejemplo; **portarlo a Moodle es un paso aparte**.

## Git

- **`metodo-cantu-dashboard`:** repo propio. Commit por ruta, `--no-optional-locks`, identidad explícita
  (`-c user.name=ChrissValdez -c user.email=christopherkntu@gmail.com`). Si tiene remoto: `fetch`, mirar
  `HEAD..origin/main`, y push por sha exacto.
- **`aiw-console`:** como arriba («Con quién convive»).
- **Comandos de red:** `GIT_TERMINAL_PROMPT=0 GCM_INTERACTIVE=never`, timeout y `< /dev/null`.

## Cambio de cuenta

Cuando el operador escriba **«protocolo para cambiar de cuenta»**, la cabina:
1. No abre nada nuevo; termina o commitea lo que tenga a medias, y lo dice en el relevo.
2. Reescribe el relevo con la hora (`date`), lo hecho, lo que sigue y lo que espera del operador.
3. Commit y push; deja los repos **limpios e iguales a `origin/main`** (y lo comprueba con `git status` y `rev-parse`).
4. Da los sha y **espera**, sin hacer nada más.

## La primera sesión, en orden

1. Leer este fichero, las reglas, `context/cambio-de-cuenta/OTRA-CABINA-EN-LAPTOP.md`, y el contrato y el relevo de LANDING
   (solo para el contexto de Moodle).
2. `git pull` en `aiw-console` (y en `metodo-cantu-landing`, solo lectura).
3. Preguntarle lo mínimo: qué ve el alumno al entrar, qué datos hay en Moodle, y sus referencias o capturas.
4. Proponer en una tabla qué se hace primero y **esperar su «adelante»**.
