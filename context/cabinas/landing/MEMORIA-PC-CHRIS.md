# Landing: lo que estaba solo en la memoria de PC-Chris

> **Qué es esto.** Las reglas de la cabina de **LANDING** (`metodo-cantu-landing`). Lo pasó el coordinador de Método Cantú (Cuenta Chris, PC-Chris) el 2026-11-24, por orden del operador: *«Sí, a las dos»* (a «¿Les mando el cierre a MC-LandingPage y a CQL_Cabina y paso yo las reglas de la memoria?»).
>
> **Por qué.** Hasta hoy estas reglas solo vivían en la memoria de Claude Code de PC-Chris (`~/.claude/projects/C--Users-chris-Documents-AIW-Workspace/memory/`). Una sesión de la Cuenta Pato, de la nube u otro aparato no las ve. Aquí sí.
>
> **Cómo se lee.** Cada sección `###` es una memoria, copiada tal cual con su fecha. Un nombre entre comillas invertidas (`así`) es otra memoria: está en este fichero, en `context/cabinas/MEMORIA-COMUN.md` o en el de otra cabina (`lecciones/`, `landing/`, `quizzes/`). Donde una regla choque con el CLAUDE.md de la cabina, su relevo o una decisión (`context/DECISIONES.md`), manda lo más nuevo y se avisa. Las rutas y nombres de sesión son de PC-Chris; las horas, de Monterrey salvo que digan UTC.
>
> **Al día.** Es una foto del 24-nov. Lo que cambie de aquí en adelante se escribe en este fichero (o en el CLAUDE.md de la cabina), no solo en la memoria de un aparato.

## La cabina y el proyecto

### `cabina-landing-claude-code`

*Memoria de PC-Chris, última edición 2026-11-23.*

Desde el 2026-11-04 la landing de Método Cantú tiene **hilo propio**. Lo pidió Chris: *«no hablo de una sesion anidada a esta hablo de una nueva con el contexto necesario, como la que tenemos aqui para cantu lessons»*.

- Su contrato es `projects/aiw-console/context/cabinas/landing/CLAUDE.md` (v0, piloto), y carga `../REGLAS-DE-CABINA.md`.
- Su relevo es `projects/aiw-console/context/handoffs/metodo-cantu-landing.md`.
- Los dos se escribieron en `aiw-console` `6d08e65`.
- La sesión abre en `AIW_Workspace` (así comparte esta memoria), y el `CLAUDE.md` se lee al arrancar: no se carga solo.

**El 2026-11-22 a las 20:37, la landing volvió a la cuenta principal, en la PC.** Del 18 al 22-nov se trabajó con la cuenta suplementaria, de AM a BB, y BB quedó como la vigente. Lo vigente está en las adendas del relevo y en el `README.md` del repo, no en el cuerpo del relevo, que quedó viejo. **Al cambiar de cuenta:** se hace el «1. Cierre» de `aiw-console/context/cambio-de-cuenta/OTRA-CABINA-EN-LAPTOP.md`. Al volver, `git pull` en los dos repos y se lee el relevo antes de tocar nada.

**Why:** la landing se había trabajado dentro del hilo de LECCIONES por las prisas.

**How to apply:**
- Si eres la cabina de LECCIONES y llega algo de la landing, apúntalo y mándalo al hilo LANDING; no lo trabajes ahí.
- Si eres la cabina LANDING, sigue «La primera sesión» de su `CLAUDE.md`: referencias antes de construir, y una sola versión a pantalla completa.

Véase `landing-metodo-cantu`, `landing-una-version-no-opciones` y `cabina-lecciones-claude-code`.

### `landing-metodo-cantu`

*Memoria de PC-Chris, última edición 2026-11-05.*

Desde el 2026-11-04 la landing de **metodocantu.com** (un Moodle con el tema MB2 y su constructor `local_mb2builder`) tiene repo propio: `projects/metodo-cantu-landing` → `github.com/ChrissValdez/metodo-cantu-landing` (privado).

- `secciones/01…07`: los bloques HTML que Chris pega en el constructor, tal cual (`<style>` + `<section>`).
- `marco/header.html`: reproducción del header del tema, azul `#0b2f4e`, de 88 px. Se cambia en los ajustes del tema, no se pega.
- `marco/footer.html`: el footer, que sí se edita en el constructor («Edit footer»).
- `imgs/`: las dos fotos y `logo-largo.png`, la versión para fondo oscuro.
- `vista.html`: la vista completa, que arma `herramientas/armar-vista.mjs`.
- `.claude/skills/`: `hallmark` (MIT) y `frontend-design` (oficial de Anthropic).

**Lo que Moodle impone:**
- su filtro de shortcodes borra lo que va entre corchetes `[…]`, también en el CSS: el acordeón `[open]` de las preguntas frecuentes está roto;
- el tema pisa enlaces y listas, de ahí los `!important`;
- el JavaScript solo debe usarse como mejora: la página tiene que funcionar sin él.

**Las variantes:** cuatro encargos `encargos/NUBE-07A–D`.
- Son pulida, scroll, 3D y otra historia.
- Corren en la nube con el entorno **MC-LadingPage** (red Custom: Google Fonts, Fontshare, jsDelivr, unpkg y gestores de paquetes), Opus 5.5 en esfuerzo «extra».
- Cada una entrega en `variantes/<X>-…/` y en su rama.
- Después: una página para comparar y votar (como la Galería), una segunda ronda sobre la ganadora, y los bloques para pegar en Moodle.

**Ronda 1, el 2026-11-04 a las 23:00: ninguna gana.** Chris dijo, sobre las cuatro: *«ninguna me gusto mas que la actual. Senti que empeoraron mi landing page actual en vez de mejorarla»*. Está tal cual en `veredictos/2026-11-04-ronda-1.md`.
- Las variantes cambiaron fuentes, colores, textos y orden. La identidad de la actual le gusta, así que la dirección es **corregir lo que está roto sin rediseñar**.
- Lo que está roto, medido a 390 px:
  - «acompañamiento» no cabe en el título de la sección 2, y la página se ensancha a 446 px;
  - el «+/−» del acordeón no aparece;
  - las fotos pesan 2,7 MB en PNG;
  - la foto de la portada está oculta en el celular;
  - dice «Mantienen dudas» donde va «Mantienes».
- **De la D sí rescató el contenido:** la opción múltiple (abrir y cerrar con una pregunta de examen), los textos más cortos y las ilustraciones de los cuatro pasos. Odió su diseño: colores y fotos en duotono.
- **NUBE-08** (encargo escrito el 4-nov, 23:08) es la de hoy corregida más eso, con la identidad bloqueada y sin Hallmark ni frontend-design para el diseño. Se vota por sección, a pantalla completa (`propuesta-08/votar.html`).
- **NUBE-08 se entregó el 4-nov a las 23:35** (UTC 05:35). Está en `main` desde `29944e1`, junto con B y C, dentro de `propuesta-08/`: `hoy-corregida/`, `con-D/` (portada, método, preguntas frecuentes y cierre), las dos vistas y `votar.html`.
- La cabina la probó a 390 px: sin desborde, con la foto de la portada visible, el «+/−» del acordeón y nada de Unsplash ni Wikimedia.
- **El concepto de NUBE-08 fracasó:** «hoy, corregida» se le ve idéntica y «con lo de la D», horrible.
- **De la D original rescata el concepto, no el diseño:**
  - la portada como pregunta de examen de opción múltiple;
  - poco texto;
  - «Más horas de estudio no sirven si estudias a ciegas»;
  - «Tu ruta en cuatro pasos», con sus apoyos visuales;
  - que no parezca una landing genérica.

  No quiere su letra ni sus detalles de color, ni «Así se vive una semana» tal cual, porque venden paquetes distintos. Su original le gusta, pero tiene mucho texto. Todo está tal cual en `veredictos/2026-11-04-ronda-2.md`.
- **Siguiente paso (lluvia de ideas):** una sola versión, el concepto de la D con un diseño visual nuevo y pulido. Antes, sus páginas de referencia, o una lámina de estilo.
- **Referencias entregadas el 2026-11-05 (00:15)** por la cabina LANDING: `referencias/index.html` (`334e4ad`), seis de 38 sitios: Brilliant, Fiveable, Shape Up, Tally, El Moro y la plantilla «Profe» de Framer. Se le pidió qué le gusta de cada una y sus paquetes; con eso, la versión única.
- **Capturar sitios externos:** Chrome de la PC + el `puppeteer-core` de `cantu-lessons/tools/render` (con `createRequire`, solo lectura). El panel de la app no muestra un HTML local con imágenes relativas fuera del proyecto. Lo que Chris revisa va al repo, nunca a `_scratch` (`landing-revisar-en-repo`).
- **5-nov: tres prototipos en sesiones anidadas** (`prototipos/A-lenguaje`, `B-3d` y `D-pulida`; la entrada es `prototipos/index.html`, `562ff02`). Sus únicas referencias que le encantan son oryzo.ai y dala.craftedbygc.com. **La PC de Chris tiene apagado «Mostrar animaciones en Windows»:** Chrome lo trata como `prefers-reduced-motion` y las páginas se ven quietas. Al medir movimiento, emularlo; a él, decirle cómo verlo. Él puede escribirle directo a una sesión anidada: leer su transcripción y llevar sus palabras a `veredictos/`.
- **5-nov, 00:20: ninguna de las seis referencias le gustó.** Refero no se le recomendó: es una biblioteca de pantallas de apps, USD 120 al año. Después dijo que está atorado (`veredictos/2026-11-05-atorado.md`).
- También se quejó del comparador: encogía las variantes. Lo que se compare tiene que poder abrirse a pantalla completa.

**Why:** Chris quiso aprovechar el crédito de cortesía de 250 USD para sesiones en la nube, que venció el 2026-11-05 a la 1:59 (GMT-6), en dejar la landing excelente. Pidió no gastar en herramientas de pago (Higgsfield, etc.).

**How to apply:**
- Cuando avise que terminaron, traer las ramas `nube-07…` (o `claude/…`), armar la comparación y llevar sus votos a una segunda ronda.
- Nunca subir al repo código fuente copiado con su sesión de Moodle abierta: trae su `sesskey`. Del que pegó el 4-nov no se guardó nada.

Véase `cabina-lecciones-claude-code`.

## Lo que ya decidió el operador

### `landing-una-version-no-opciones`

*Memoria de PC-Chris, última edición 2026-11-20.*

**Vigente desde 2026-11-20 (tras AM):** un solo prototipo, el de hoy pulido con sus comentarios, y **cada sección con tres variantes nuevas** (`s1`…`s6` = a|b|c). Sus palabras: *«me gustaria un solo prototipo, Con las correcciones y comentarios que dije, pero... cada seccion con 3 variatnes nuevas … estoy puliendo el prototipo actual, no pidiendo prototipos nuevos de cero»*.

**Why:**
- Se estaba ciclando: cada ronda de una sola versión le cambiaba algo que luego no le gustaba (la 4 de AL «la empeoró»).
- Escoger entre tres por sección sobre la misma página le ayuda a decidir sin empezar de cero.

**How to apply:**
- Cada ronda parte de la página vigente; las variantes se reconocen como esa sección, pulida.
- Todo a pantalla completa, con el enlace de cada variante en el índice.
- **La regla de antes (2026-11-04):** *«no me gusta que me des multiples opciones por seccion, solo quiero ver la version nueva y punto»*. Quedó reemplazada. Lo que sigue valiendo de ella:
  - nada en marcos encogidos;
  - no injertar ideas de otra variante en el diseño de hoy sin cuidar su forma de contarlo.

Véase `landing-metodo-cantu`.

### `landing-academico-no-retro`

*Memoria de PC-Chris, última edición 2026-11-05.*

Lo que a Chris le gustaba de la variante D es lo **académico**: libro de texto, hoja de examen, notas del profe. Aprobó («Sí, así», 2026-11-05) el PROTO-D en tono académico clásico:
- serif de libro (Literata) y Geist;
- papel y tinta marino;
- nota al margen en cursiva;
- figuras numeradas y fichas.

Dos rondas antes las rechazó:
- la limpia, «nivel Apple»: «perdido el estilo retro»;
- la de examen impreso: «más retro videojuego que retro académico».

**Why:** «decir retro no era la palabra». Esto se lee como videojuego:
- sombras duras desplazadas;
- rayitas de margen;
- monoespaciada en mayúsculas;
- tramas de puntos;
- cantos 3D en botones;
- boletos troquelados.

**How to apply:** en la landing (y en A/B si van hacia ahí), el carácter va por tipografía de libro y composición editorial (rayas de formulario, figuras, cursivas al margen), sin esos adornos. Relacionado: `landing-metodo-cantu`, `landing-una-version-no-opciones`.

### `landing-revisar-en-repo`

*Memoria de PC-Chris, última edición 2026-11-05.*

En el hilo LANDING, todo lo que Chris va a revisar se genera **en el repo `metodo-cantu-landing`**, se commitea y se publica antes de avisarle. Nunca en `_scratch`. Sus palabras (2026-11-05): *«generalo en el repo todo el contenido a revisar sino se puede desincronizar el contenido entre computadoras»*.

**Why:** revisa desde varios aparatos (PC y laptops). Lo que vive en `_scratch` no viaja con `git pull`. El 5-nov la cabina le dejó en `_scratch` una copia de las referencias con las capturas dentro, y él lo corrigió.

**How to apply:**
- Las páginas a revisar, sus capturas y sus copias van al repo.
- Las sondas y pruebas desechables van al directorio temporal de la sesión.
- Ya está en `context/cabinas/landing/CLAUDE.md`, punto 8 de «Cómo quiere trabajar».
- Es distinto de `galeria-no-escribir-en-la-pc`, que es de LECCIONES.

Véase `landing-metodo-cantu` y `cabina-landing-claude-code`.

### `landing-indice-con-variantes`

*Memoria de PC-Chris, última edición 2026-11-19.*

En `index.html` de `metodo-cantu-landing`, cada prototipo nuevo (y los anteriores que tengan parámetros) lleva **el enlace de cada variante**, no solo «abrir» y «sus notas». Se llena el objeto `VARIANTES` (id → lista de `[parámetro, qué cambia]`); el pintado lo hace `variantes(v)`. Sin variantes: «Una sola versión, sin variantes.»

Un solo «abrir», con `?movimiento=si`: el «abrir con movimiento» aparte se quitó.

**Why:** 19-nov el dueño pidió «siempre ahorita y de ahora en adelante el link de cada propuesta y el link de sus variantes», y no entendía la diferencia entre abrir y abrir con movimiento. Las animaciones de su Windows ya estaban prendidas, así que los dos enlaces se veían igual.

**How to apply:** al poner al día el índice con una ronda nueva, leer los parámetros de cada `landing.html` (`get('…')`) y de sus NOTAS (`?sin=`, `?con=`, `?s4=`…), y meter todos a `VARIANTES` antes de hacer commit. Ver `cabina-landing-claude-code`.
