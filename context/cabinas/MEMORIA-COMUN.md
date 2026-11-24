# Reglas comunes de las cabinas: lo que estaba solo en la memoria de PC-Chris

> **Qué es esto.** Las reglas que valen para **todas** las cabinas y talleres de Método Cantú: cómo quiere trabajar el operador, las cuentas, el workspace y las mañas de la máquina. Lo pasó el coordinador de Método Cantú (Cuenta Chris, PC-Chris) el 2026-11-24, por orden del operador: *«Sí, a las dos»* (a «¿Les mando el cierre a MC-LandingPage y a CQL_Cabina y paso yo las reglas de la memoria?»).
>
> **Por qué.** Hasta hoy estas reglas solo vivían en la memoria de Claude Code de PC-Chris (`~/.claude/projects/C--Users-chris-Documents-AIW-Workspace/memory/`). Una sesión de la Cuenta Pato, de la nube u otro aparato no las ve. Aquí sí.
>
> **Cómo se lee.** Cada sección `###` es una memoria, copiada tal cual con su fecha. Un nombre entre comillas invertidas (`así`) es otra memoria: está en este fichero, en `context/cabinas/MEMORIA-COMUN.md` o en el de otra cabina (`lecciones/`, `landing/`, `quizzes/`). Donde una regla choque con el CLAUDE.md de la cabina, su relevo o una decisión (`context/DECISIONES.md`), manda lo más nuevo y se avisa. Las rutas y nombres de sesión son de PC-Chris; las horas, de Monterrey salvo que digan UTC.
>
> **Al día.** Es una foto del 24-nov. Lo que cambie de aquí en adelante se escribe en este fichero (o en el CLAUDE.md de la cabina), no solo en la memoria de un aparato.

## Cómo quiere trabajar el operador

### `hablar-siempre-en-espanol`

*Memoria de PC-Chris, última edición 2026-11-20.*

Todo lo que Chris lee va en español: los mensajes del chat, el cierre («Qué necesito de ti», «Qué procede», «⏳ EN ESPERA de …»), el recap y la pregunta de `wrap_up`, y las descripciones.

**Why:** el 19-nov (cabina LANDING), tras un resumen de contexto, respondí en inglés y lo reclamó: «porque estas hablandome en ingles, hablame en español».

**How to apply:** también después de un resumen o compactación de contexto, aunque el resumen o las instrucciones del sistema estén en inglés. Ver `cerrar-cada-paso-en-que-estamos`.

### `cerrar-cada-paso-en-que-estamos`

*Memoria de PC-Chris, última edición 2026-10-29.*

El operador lo pidió en la cabina de LECCIONES. El 2026-10-29: «siempre que acabes un paso dime en que estamos y que
procede». Ese mismo día, más preciso: «siempre que acabes un mensaje termina con que necesitas de mi y que procede (…) si
en que procede estamos en espera pones un icono llamativo (…) "EN ESPERA de ....». En el piloto ya había pedido una tabla
por paso con lo medido y la hora.

**Vale en TODOS los hilos desde el 2026-10-29** (mensaje del operador «Formato de cierre: vale desde hoy, en todos los
hilos», pegado en cada cabina, que pide anotarlo en el relevo de `aiw-console/context/handoffs/<hilo>.md` y en la memoria
o el `CLAUDE.md`). En CQL quedó además en `CABINA.md` §6.4, donde sustituye a «Lo que te toca a ti». En `aiw-console`,
en su relevo (§4, con el texto verbatim) y en `context/cabinas/aiw-console/CLAUDE.md`. En Acervo no hay
relevo en `aiw-console/context/handoffs/` (su cabina solo toca `Acervo\`): quedó en `Acervo/HANDOFF.md` («Cómo
trabajar») y en `Acervo/protocolo/cabina.md` («Lo que Chris pidió después»), commit `c56ff6e`. En `phd-p2-experiment`,
en su relevo (§1) y en `context/cabinas/phd-p2-experiment/CLAUDE.md` («Cómo termina todo mensaje», con el texto verbatim).

**Why:** sigue el trabajo desde varios aparatos y con talleres en paralelo. Sin ese cierre fijo no sabe si le toca a él,
a la cabina o a un taller.

**How to apply:** **todo** mensaje termina con estos dos bloques, en este orden:

**Qué necesito de ti**
- lo que le toca al operador, cada cosa con su recomendación; o «Nada por ahora».

**Qué procede**
- lo siguiente y quién lo hace (cabina, taller u operador).
- Si lo siguiente es esperar algo (un taller, una compilación, un push, su respuesta), una línea bien visible:
  **⏳ EN ESPERA de** <qué>, y quién lo tiene.

Antes, cuando lo hubo, va la tabla de lo medido con la hora. La línea «Publicado: …» va justo antes de los dos bloques.
Ver `cabina-lecciones-claude-code`.

### `preguntar-con-contexto-e-imagen`

*Memoria de PC-Chris, última edición 2026-11-15.*

Toda pregunta al operador lleva:
- la lección y la sección o slide (p. ej. «ALG-30·D3», no «ALG-30»);
- qué se ve hoy y qué se decide, en una frase;
- la foto (SendUserFile) o una vista en la galería.

Si no puedo dar ese contexto, la pregunta va a una vista de galería con fotos («Hoy» y las opciones), no al chat.

**Why:** el 13-nov, el operador: *«me preguntas sin contexto, imágenes, me dices alg 30 sin decirme slide o sección ni el contexto de la pregunta»*. Arrastré rótulos de informes (R17, «ALG-30, tres decisiones», «.cad») que él nunca vio.

Se repitió el 15-nov con las seis preguntas de pedagogía (PAUTA §D) dadas en una tabla de texto: *«dime esas preguntas con ejemplos, de preferencia imagenes y mas contexto / ni siquiera se cuando te refieres a web o slide»*. También las preguntas «de redacción» van a vista con fotos, y siempre se dice «web (la página que lee el alumno)» o «slide (la diapositiva de clase)».

**How to apply:** antes de listar decisiones abiertas, abrir el informe de origen y reescribir cada una con lección·sección, una frase y una imagen. Los códigos internos (R16, C9, G3) no van en la pregunta, o van con su explicación. Ver `qa-decir-donde-ruta-completa` y `cerrar-cada-paso-en-que-estamos`.

### `qa-decir-donde-ruta-completa`

*Memoria de PC-Chris, última edición 2026-10-29.*

Al pedirle una QA a Chris, decir **siempre dónde se hace**: la ruta completa del PDF (o del XML, la página, la pantalla), con la página. Nunca «tu QA del PDF» ni «en el PDF» sin decir cuál. **Y en «Qué necesito de ti», la liga directa a lo que tiene que revisar**, para que la pulse sin buscar nada.

**Why:** el 2026-10-29 (cabina CQL en Claude Code) cerré pidiendo «tu QA del PDF» con la ruta de la guía, pero no la de los PDF. Chris: «cuando me pidas un QA siempre dime en donde hacerlo nadamas dices en el PDF en que PDF?». Ese mismo día, más: «si necesitas que revise pdfs, en los que ncesito de ti, dame directamente la liga de lo que oucpas que revise». La guía `qa-visual-FINAL-2.md` además abreviaba las rutas con `...\PAA\...`. Choca con CABINA.md §6.2 (rutas siempre completas).

**How to apply:** en cada petición de QA, dentro de «Qué necesito de ti»:
- una liga markdown a cada fichero, con la ruta relativa a la carpeta de la sesión y los espacios como `%20`;
- además, una tarjeta de fichero con SendUserFile, que es la forma que se sabe que abre;
- al lado, la ruta absoluta `C:\Users\chris\Documents\AIW_Workspace\...`, cuántas preguntas van en él y la página por la que se empieza.

**Medido el 2026-10-29: `#page=N` no sirve.** El panel de navegador abrió `Matematicas.pdf#page=364` en la página 1. La página se da aparte, para que la escriba en el visor. Comprobar antes que el fichero existe y que sus páginas cuadran. Ver `cerrar-cada-paso-en-que-estamos`.

### `hora-con-date-antes-de-escribirla`

*Memoria de PC-Chris, última edición 2026-11-08.*

Pasó dos veces:
- la cabina LANDING escribió «01:52» y «02:15» en commits que eran de ~01:30 y ~08:05 (5-nov);
- la cabina de LECCIONES fechó adendas «13:55» y un mensaje «14:05» cuando eran las 13:47 y ~13:50 (6-nov), y hubo que corregir los encabezados;
- otra vez el 8-nov: cuatro notas y dos adendas con «15:07–15:12» que eran de las 15:05–15:07, y un «15:26» que eran las 15:24. Se escribe la hora que se espera y no la medida: el `date` va en el mismo comando que escribe el fichero, nunca antes de redactarlo.

**Why:** el veredicto y los encargos se leen como registro con hora. Una hora inventada desordena la secuencia de los votos y las entregas, y el operador revisa esos tiempos.

**How to apply:**
- Antes de escribir una hora en un fichero, en un commit o en un mensaje, correr `date '+%H:%M'` en el mismo comando que escribe, o justo antes.
- Para un commit ya hecho, usar su hora: `git log -1 --format=%ad --date=format:%H:%M`.
- Si sale una hora mal, se corrige en el fichero diciendo cuál era la buena. Los mensajes de commit no se reescriben.
- **La hora de llegada de un mensaje del operador** se saca del jsonl, del renglón con `"type":"user"` que lo trae (el primero, sin `tool_result`). Un `grep … | tail -1` de la frase encuentra el propio comando de la cabina, que también la lleva, y da su hora: así salieron «14:35» y «15:52» por 14:34 y 15:51 (LECCIONES, 7-nov).

Véase `cabina-lecciones-claude-code` y `cabina-landing-claude-code`.

### `entregas-no-rehacer-listas`

*Memoria de PC-Chris, última edición 2026-11-08.*

Una lista de entregas (`tanda-*.json`) o una pieza ya avisada a la cabina no se renombra, no se rehace y no se borra. Si algo tiene que cambiar, va en un fichero nuevo, y se avisa a la cabina antes de hacerlo.

**Why:** en CR-GS·14 (6-nov, 12:15–14:30) rehice las listas A y B tres veces (con L08–L10 dentro, luego como B2 y luego de vuelta). CR-LS recibió tres versiones distintas, y la cabina lo pidió expresamente. Los mensajes con la cabina se cruzan: ella ya había pasado una versión mientras yo hacía la siguiente.

**How to apply:**
- Antes de tocar un fichero ya avisado, mirar si la cabina ya lo pasó a otro carril. Ante la duda, fichero nuevo.
- Cada pieza se identifica por su md5.
- **También las variantes de una galería ya avisada:** una variante que cambia lleva número nuevo (la siguiente libre), nunca se rehace en su sitio. En CR-GW·16 ronda 2 (8-nov) rehice la 65 de S2 con la guía UDEM después de avisar; la cabina ya había publicado la galería y el operador votaba sobre ella: un voto a la 65 habría apuntado a otra cosa. La versión nueva pasó a ser la 67. Si llega una referencia tarde, se ofrece como variante nueva y se espera a la cabina.
- Ver también `galeria-no-escribir-en-la-pc`.

### `no-usar-fable`

*Memoria de PC-Chris, última edición 2026-11-09.*

**No lanzar sesiones ni talleres con Fable** (ni cambiarles el modelo a Fable), aunque el trabajo parezca pedir «la mejor calidad». Sus palabras, tras cancelar el PROTO-E de la landing, que corría con Fable 5.1: *«no lo quiero hacer con fable, consumio muchos tokens inecesariamente, no lo volvamos a hacer»* (2026-11-06).

**Why:** el PROTO-E corrió con Fable 5.1 en esfuerzo xhigh. Gastó mucho y el resultado no le estaba gustando. La calidad no vino del modelo.

**How to apply:**
- Talleres con Opus (el modelo por defecto) y esfuerzo alto. Si él pidiera Fable otra vez, recordarle esta regla antes de lanzar.
- Las REGLAS-DE-CABINA dicen «Fable solo si la decisión es difícil de revertir»; esta preferencia del operador manda sobre eso.
- **Fable 5.2 (9-nov):** preguntó si valía la pena para revisar lecciones; dijo *«si me va a dar resultados similares al ser un problema ya muy acotado, entonces no lo usemos porque ando corto de tokens»*. La cabina recomendó no usarlo. La razón: revisar lecciones es trabajo acotado y medible, que hacen scripts más Opus o Sonnet; y Fable 5.1 cuesta 2,5 veces Opus 5.5 por token ($10/$50 contra $4/$20). El precio de Fable 5.2 no estaba en la referencia de la cabina (al 6-oct). Solo valdría replantearlo si costara lo mismo o menos que Opus.

Véase `landing-metodo-cantu` y `cabina-lanza-talleres`.

### `uso-semanal-mezcla-proyectos`

*Memoria de PC-Chris, última edición 2026-11-20.*

El 19-nov-2026 Chris corrigió una estimación de costo. La cabina había sacado «~0.5 % de la semana por lección» de la subida de `get_usage`. Él, tal cual: *«no lo puedes tomar tan en serio, porque mucho uso lo estoy haciendo en proyectos en paralelo y mis tokens semanales no les falta tanto por vencerse, por eso meto prisa al ritmo de trabajo»*.

**Why:** la cuenta es una sola para todos sus hilos. La subida del % incluye lo que gastan los otros proyectos. Y lo que no se use antes de la renovación se pierde.

**How to apply:**
- No proyectar el costo de un trabajo desde el % de la cuenta. Si hace falta una cifra, decir que es un techo, que incluye otros hilos.
- Cerca de la renovación semanal, la prioridad es avanzar rápido; no proponer recortes de modelo para ahorrar.
- **Pero la ventana de 5 h sí manda.** El 19-nov, a las 20:08 y con la ventana en 96 %, él aclaró: *«el problema es el limite de 5 hrs»*. Si se llena, se paran todos sus hilos. Con más de 85 % de la ventana, pausar los talleres hasta la renovación: TaskStop a sus subagentes y `_scratch/CR-LX/hasta.mjs <ISO>` en segundo plano. Después, 3 subagentes por taller como máximo.
- 19-nov, 22:25: *«baja a 2 talleres de momento y ahi dejemoslo hasta que te pida aumento de ritmo»*. Se queda en 2 talleres activos, con 1 subagente cada uno, en dos filas encadenadas con `esperar.mjs`. No se sube por iniciativa propia.
- Ver `lecciones-lanzar-sin-preguntar` y `lecciones-ahorro-tokens`.

### `metodo-cantu-espanol-y-mate-separados`

*Memoria de PC-Chris, última edición 2026-11-07.*

Español y Matemáticas se estudian por separado. Hay dos diagnósticos, uno de Matemáticas y otro de Español. Solo se juntan en el
examen simulador. Lo dijo Chris el 2026-11-07, a las 13:53, en la cabina de LECCIONES.

**Why:** la cabina recomendó un diagnóstico inicial que repartiera las horas entre Español y Matemáticas, y ese reparto no existe.

**How to apply:**
- Ningún plan, coach ni diagnóstico reparte horas entre Español y Matemáticas.
- Las horas que sobran en Matemáticas no pasan a Español: van a las opcionales o al simulador.
- Esto vale también para la sesión estrategia-moodle y su página «Mi plan».

Relacionadas: `cabina-lecciones-claude-code`, `diagnostico-por-area`.

## Cabinas, talleres y cuentas

### `cabina-lanza-talleres`

*Memoria de PC-Chris, última edición 2026-11-11.*

Desde el 2026-10-29, la cabina lanza los talleres ella misma, como sesión anidada (`start_session`, contexto `fresh`,
con el «Cómo arrancar» del ticket como brief). No se le pide a Chris que lance nada. Chris lo pidió en la cabina de
Acervo: «no me pidas lanzar un taller lánzalo tú mismo como sesión anidada, para eso me cambié a Claude Code;
dejémoslo como regla de cabina». Quedó en `Acervo/protocolo/cabina.md`, «Quién eres», y reemplaza la regla vieja
«la cabina nunca lanza un taller por su cuenta».

En un turno que arrancó un aviso automático (p. ej., el `<side-sessions-event>` de que otro taller terminó), la app
rechaza `start_session` con `user_asked`. Ahí el siguiente taller va como tarjeta `own_initiative`, y hay que decirle
a Chris que es un clic y por qué (29-oct, ticket N tras el O). Pero una tarjeta no admite `cwd`: si el taller va en
otro repo que el de la sesión (p. ej. phd-p2-experiment desde AIW_Workspace), la tarjeta no sirve. Entonces se deja el
run creado y activo, y se le pide a Chris una palabra («lánzalo»), aclarando que es un límite de la app y no una
pregunta de permiso. Con su mensaje, `start_session` `user_asked` con el ticket ya redactado (31-oct, `#26`).

**Remote Control (medido el 2026-10-30, LECCIONES):** si Chris escribe por Remote Control, la app tampoco deja arrancar
la tarjeta (`proposal_id`): «you can start a session only on a message typed in the desktop app». No le preguntes
«¿lo arranco?», porque no ve la caja de la pregunta y no sabe a qué responder. Dile en una línea que pulse la tarjeta del
ticket, nombrándola, o que escriba desde la app de escritorio. Si pide «hazlo aquí» (pasó con RW-71), va como **agente de
fondo de la cabina** (`Agent`, `general-purpose`, `run_in_background`), con el ticket como brief y en los worktrees del
ticket. Se le avisa de que no podrá hablarle directamente, y se retira la tarjeta (`dismiss_task`) para que no corran
dos.

**Remote Control + turno abierto por el aviso de otra sesión (medido el 2026-11-11, CR-AS3):** la app rechaza
`user_asked` y tampoco deja proponer la tarjeta (`own_initiative`: «do not mention a card»). Lo que funcionó: mandar el
encargo con `SendMessage` a una sesión de carril ociosa del mismo tipo (CR-AS2 hizo CR-AS3·01), renombrarla
(`set_session_title`) y apuntarlo en la bitácora y en CARRILES. No hace falta pedirle nada a Chris.

**Turno de un temporizador (CronCreate), medido el 2026-11-19 en LANDING:** la app también rechaza `start_session`
`user_asked` («Start sessions only on the user's own words»). Con Chris dormido, una tarjeta esperaría horas. Lo que se
hizo: el taller W como **agente de fondo** (`Agent`, `general-purpose`, Opus, esfuerzo alto, `run_in_background`) con
el encargo como brief. Los siguientes de la serie (X1–X5) también salen de turnos automáticos: van igual, uno a la vez.
Al programar una ronda con temporizador, avisarle antes de que correrá como agente de fondo y no como sesión con fila
propia.

**Why:** Chris se cambió a Claude Code justamente para que la cabina orqueste sin que él copie prompts entre ventanas.
**How to apply:** en Acervo, cuando un ticket está listo y le toca, se lanza; uno a la vez y, mientras corre, no se
hace commit en el checkout que el taller usa. En CQL (cantu-quizzes-latex) Chris lo confirmó el 2026-10-30: «Sí,
lánzalos tú»; está en su `CABINA.md` §2 y en el registro, fila 440. Allí el taller no corre git, así que la cabina
sí escribe y commitea por nombre mientras corre, y puede haber varios talleres con superficies disjuntas. En otras
cabinas que todavía digan «Chris lanza», lo más probable es que Chris quiera lo mismo (su razón vale para todas):
proponerlo así.

**En LECCIONES (2026-10-30), y sin preguntar antes.** Chris: «como regla no te detengas a preguntarme cuando ocupes
lanzar un ticket / solo si es una desicion altamente critica, me preguntas antes de ejecutar / pero fuera de eso no
frenes los flujos de trabajo y de lanzamiento de tickets / como siempre los tickets no los lances en cabina lanzalos en
su propia conversacion anidada». Está en `aiw-console/context/cabinas/lecciones/CLAUDE.md`. La cabina escribe el ticket,
lo publica y lo lanza en el mismo turno. Solo pregunta antes si la decisión es altamente crítica: por ejemplo, borrar
algo, cambiar algo que el operador ya aprobó o una decisión de método. Ver `cabina-acervo-claude-code` y
`talleres-en-ola-paralela`.

**En cantu-studio (2026-10-30).** Chris contestó «Sí, alinéala» a la pregunta de si la cabina debía lanzar los talleres
como Acervo, CQL y LECCIONES. Quedó en la v1.1 de `aiw-console/context/cabinas/cantu-studio/CLAUDE.md`, sección «Lanzar
los talleres» (`15d6bc9`): se lanza en el mismo turno en que se abre el run. Lanzar no es una pregunta; decidir qué se
encarga sí lo es, y al reanudar nada se encarga sin que él apruebe el plan. Ver `cabina-cantu-studio-claude-code`.

### `tareas-largas-a-taller-anidado`

*Memoria de PC-Chris, última edición 2026-11-19.*

Cuando el operador pide una tarea, sobre todo una larga, la cabina la manda a un **taller nuevo anidado** (sesión enlazada), no a un
comando en segundo plano dentro de la cabina. Lo dijo el 19-nov (LECCIONES): *«cuando te pida tareas, en vez de mandarlas a segundo
plano especialmente las largas mandalas a un taller nuevo anidado»*. Una medida corta y local (unos minutos, sin juicio) puede seguir en
segundo plano: *«en este caso no hay problema»*.

**Why:** la cabina queda libre para atenderlo, y el trabajo largo tiene su propia sesión que él puede abrir y seguir.

**How to apply:** encargo escrito, `start_session` como taller anidado (`cabina-lanza-talleres`); la cabina integra y publica lo que
entregue. Ver `lecciones-ahorro-tokens`.

### `archivar-talleres-terminados`

*Memoria de PC-Chris, última edición 2026-10-31.*

Chris se lo pidió a la cabina de Lecciones el 2026-10-30: «siempre que acabe de ejecutarse un ticket revisa y archiva
en la lista de tickets cuales ya se pueden archivar para no acumular tickets». A la pregunta de si la pasaba a Acervo y
a P2 contestó «Sí, pásasela». Lecciones se la pasó a Acervo ese mismo día.

- **Cuándo:** cada vez que un taller termina (al integrarlo), `list_sessions` con `linked: true`.
- **Se archivan:** las sesiones integradas y cerradas, y las que quedaron a medias y ya no sirven.
- **Siguen activas:** la que trabaja y las que esperan algo de Chris (un voto, una revisión).
- **Antes de archivar:** `list_events` para ver lo último; si tiene Remote Control encendido, se apaga con
  `set_remote_control` (si no, la app no la archiva). Archivar se deshace con `unarchive_session`.
- **Después:** decírselo a Chris en una línea, sin pedirle nada.

**Why:** la lista de sesiones se llenaba de talleres ya cerrados de varias cabinas.
**How to apply:** Acervo la aplicó por primera vez el 30-oct (N, O, P, Q y R; R tenía Remote Control). En Lecciones está
en `aiw-console/context/cabinas/lecciones/CLAUDE.md` («Archivar los tickets que terminan», `39d345d`). Ver
`cabina-lanza-talleres` y `cabina-acervo-claude-code`.

### `mensajes-de-la-cabina-que-llegan-tarde`

*Memoria de PC-Chris, última edición 2026-11-09.*

El 2026-11-09, a las 14:11, a CR-GS le llegaron dos mensajes de CL_Cabina que ya estaban atendidos: el encargo de la 18 (enviado a
las 12:21, ya escrito, integrado y publicado) y el «18 integrada» de las 14:04. Para entonces la 17 ya estaba en main
(`82c5ed11`, cherry-pick de la cabina con el mismo contenido).

**Why:** rehacer un encargo ya cerrado gasta tokens y deja ramas que chocan con lo publicado.

**How to apply:** si un mensaje de la cabina trae un encargo, antes de tocar nada hacer `git fetch` y mirar en `git log origin/main`
el commit del encargo, el informe del carril y el veredicto «cerrada». Si ya está cerrado, no contestar (la regla de no acusar
recibo) y decirlo en una línea en el cierre. Ver `cabina-lecciones-claude-code` y `aiw-console-checkout-compartido`.

### `cambio-de-cuenta`

*Memoria de PC-Chris, última edición 2026-11-24.*

**Cómo se nombran (Chris, 2026-11-24):** las cuentas son **Cuenta Chris** (la que antes se llamaba «principal») y **Cuenta Pato**
(la «suplementaria»). **Nunca se dice «la laptop» para hablar de la otra cuenta:** cualquier cuenta puede trabajar en cualquier
aparato. Lo que importa es la división de cuentas. Sus palabras: *«no hables de la otra cuenta como laptop / puedo trabajar con esta
cuenta en diferentes aparatos y alla tambien / lo importante es la division de cuentas»*.
- **Aparatos:** laptop-Chris, PC-Chris (DESKTOP-525K0IS) y PC-Pato. Cada cuenta decide sobre los aparatos disponibles.
- Al nombrar dónde corre algo, se dicen los dos: «la cabina de LECCIONES, con la Cuenta Pato en laptop-Chris».
- El 24-nov, a las 09:15, LECCIONES se trabajaba con la Cuenta Pato en laptop-Chris, mientras la Cuenta Chris coordinaba desde PC-Chris.

**El reparto del trabajo entre las dos cuentas está en revisión (24-nov):** Chris lo está definiendo con la Cuenta Pato y lo pasará
cuando lo cierre. Hasta entonces, no se da por vigente la regla vieja de «nunca a la vez» (2026-11-12), ni se le sermonea por eso.

Lo de antes, que sigue mientras no llegue lo nuevo. Todo está en `aiw-console/context/cambio-de-cuenta/`:
- `PROTOCOLO.md`: el cierre, el cambio, el arranque y el prompt de la primera vez;
- `HANDOFF.md`: se reescribe en cada cambio;
- `sincronia.mjs`: dice EN ORDEN o lo que falta;
- `ramas-integradas.txt`: las ramas locales ya revisadas.

- **«protocolo para cambiar de cuenta»:** la cabina hace el cierre, dice «listo, puedes cambiar» y se queda esperando hasta
  «ya volví, revisa la carpeta del protocolo».
- **Al volver:** leer el HANDOFF y `git log origin/main` antes de tocar nada; nunca rehacer lo que ya esté en git.
- **El tope semanal se lee con `get_usage`** (mcp__ccd_session_mgmt). **Al 95 % la cuenta deja su relevo al día** (Chris, 24-nov,
  respuesta 8 del PR 1: *«Cada cuenta deja su relevo al día al 95 %, porque al 0 ya no puede hacer el cierre»*). Sin tokens, sus
  repos esperan; no pasan a la otra cuenta salvo que él lo diga. El tope de tres sesiones a la vez es por cuenta.

**Why:** que el relevo entre cuentas no tenga fricción ni desincronización: *«si se hace doble termina siendo pérdida»*.

**How to apply:**
- Cada cierre deja todo en GitHub; la verdad está en git.
- Las sesiones son de la cuenta que las abrió; desde la otra cuenta no se ven ni se les manda mensaje.
- Ver `cabina-lanza-talleres`, `cabina-lecciones-claude-code` y `lecciones-tres-aparatos`.

### `aiw-workspace-conventions`

*Memoria de PC-Chris, última edición 2026-11-24.*

Workspace `C:\Users\chris\Documents\AIW_Workspace\` (no es repo git). **Desde la
mudanza del 2026-11-24** (la misma en PC-Chris y en Laptop-Chris-CuentaPato):
`aiw\` y `aiw-console\` en la raíz; `Metodo_Cantu\` (carpeta, no repo) con
cantu-lessons, cantu-revisiones, cantu-studio, metodo-cantu-landing,
metodo-cantu-dashboard y cantu-quizzes-latex; `projects\` solo con
phd-p2-experiment y Resuelve-Esparza. `_reference\` y `_scratch\` siguen en la raíz.
**Las rutas `context/...` de los encargos se resuelven bajo `aiw-console\`**
(p. ej. `context/DECISIONES.md` = `aiw-console\context\DECISIONES.md`).
Notas, informes y herramientas de rondas cerradas siguen citando
`projects\<repo>`: leerlas traduciendo `projects/aiw-console` → `aiw-console` y
`projects/<repo>` → `Metodo_Cantu/<repo>`; esas herramientas fallan si se corren tal cual.

**Why:** los encargos citan rutas relativas que no existen desde la raíz del
workspace; sin esto, la primera lectura falla.

**How to apply:** régimen de los encargos de este operador (coordinación en
español): leer completas las lecturas de arranque declaradas; no re-medir
mediciones fechadas; toda cifra con fuente (`record §n` o `archivo:línea`);
inferencias marcadas `[NO VERIFICADO]`/`[INFERENCIA]`; hechos de disco fuera del
insumo se piden al operador como comando, no se leen ni recuerdan; el producto de
cada encargo es UN archivo nuevo en `context\aiw-console\records\` (estilo
MEDICION-/AUDIT-/DECISION-, con bloque «Lo que este record NO hace»);
`DECISIONES.md` es append-only y sus entradas cierran con «Criterio de
borrado:». El 2026-07-28 la última entrada era D-051.

### `aiw-console-checkout-compartido`

*Memoria de PC-Chris, última edición 2026-10-30.*

**D-081, «Segunda enmienda» (2026-10-29, palabra del operador en la cabina de LECCIONES, `aiw-console/context/DECISIONES.md`):**
las cabinas que corren en Claude Code en la PC comparten el checkout de `aiw-console`, y con él el índice y la rama.
Un `git commit` sin ruta se lleva lo que otra cabina dejó preparado. Un `git push` publica los commits locales de todos.

**Why:** medido dos veces el mismo día. A las 09:52 apareció debajo de un commit de CQL un commit de otro hilo, sin
publicar (`553c02a`), y solo se publicó con la palabra de Chris. A las 10:34 había en el índice dos ficheros de la cabina
de aiw-console, y su commit `be1521c` entró encima del de CQL medio minuto después.

**How to apply:** en `aiw-console`, y en cualquier repo donde trabaje más de una cabina a la vez:
- antes de commitear, `git diff --cached --name-only`, para ver si alguien dejó algo preparado;
- el commit, siempre con ruta: `git commit -F <msg> -- <ruta>…`. Así entra solo lo nombrado;
- antes del push, `git log origin/main..HEAD`, después de un `fetch`. Si hay commits de otro hilo, **no se empuja**: se
  espera a que su hilo los publique, o se le dice al operador;
- si solo está lo propio, se publica por sha exacto, `git push origin <sha>:refs/heads/main`, para no llevarse lo que
  otra cabina commitee entre la medida y el push. Después, `ls-remote`.
- **El sha exacto no protege de lo que queda debajo:** mi commit entra encima del HEAD de ese momento, y empujarlo publica
  todo lo que lleva debajo. El 2026-10-30 a las 10:07, la cabina de LECCIONES midió `origin/main..HEAD` limpio, y otra
  cabina hizo commit (`28e6212`, phd-p2) dos segundos antes que ella. Su push por sha lo publicó. Por eso:
  - `git log origin/main..HEAD` va **después** del commit y en una llamada aparte del push, nunca en la misma cadena;
  - si debajo del mío hay un commit ajeno, no se empuja: se espera a que su hilo publique, o se le dice al operador.

En CQL está también en `CABINA.md` §5.11 y en el relevo `aiw-console/context/handoffs/cantu-quizzes-latex.md`. Ver
`cabina-aiw-console-claude-code` y `cabina-lecciones-claude-code`.

## De la máquina (Windows, PC-Chris)

### `computadora-sin-python`

*Memoria de PC-Chris, última edición 2026-11-09.*

Medido el 2026-09-26 durante ALG-REUBICACION-AVANCE (cantu-quizzes-latex): `python`/`python3` son solo el alias de la Microsoft Store, sin intérprete. Node v24 sí está. TeX Live instalado es 2025 (`C:\texlive\2025`), aunque CADENA-DE-HERRAMIENTAS cita 2026. El checkout del repo es LF en todos los `.tex` (tras el cambio EOL de CABINA del 2026-09-25); AGENTS.md §3 describe un corpus mixto que esta máquina no tiene. Re-medido el 2026-10-29: `python` sigue siendo solo el alias de la Store, el lanzador `py` no existe (ni en Git Bash ni en PowerShell), y CQL tiene `core.autocrlf=false` y `eol=lf` en su config. En cambio, `cantu-lessons`, `aiw-console` y `cantu-revisiones` salen en CRLF (`core.autocrlf=true`, del gitconfig de sistema).

**Desde el 2026-10-29 (19:3x UTC) sí hay Python.** El operador instaló Python 3.12.10 con `winget install --id Python.Python.3.12 -e --source winget`, solo para su usuario: `C:\Users\chris\AppData\Local\Programs\Python\Python312\python.exe`, con el lanzador en `C:\Users\chris\AppData\Local\Programs\Python\Launcher\py.exe`. El `PATH` de usuario ya lo incluye, pero un proceso abierto antes de instalar (la app de Claude y sus consolas, una PowerShell vieja) sigue sin `py` y con `python` = alias de la Store: hay que llamarlo por la ruta completa hasta reiniciar. La instalación está pelada: no lleva paquetes. Cada repo usa su `.venv` (la de `phd-p2-experiment` ya está rehecha). Ese mismo día, `phd-p2-experiment` pasó a `core.autocrlf=input` en su `.git/config` y su árbol a LF, con la palabra del operador: en CRLF, 4 tests del contrato fallaban.

Medido en RW-60 (2026-10-29, 20:00): con `python.exe -I`, la consola de la app imprime en cp1252 y un «Δ» revienta con `UnicodeEncodeError`. `PYTHONIOENCODING=utf-8` no sirve, porque `-I` ignora las variables `PYTHON*`: va `python.exe -I -X utf8 script.py`. También ahí, un `node - <<'EOF'` que escribía JS con `\\(` y `\\w` dentro de una plantilla perdió las barras: se escribe el script con Write. Y el 2026-10-31, un `node -e "…"` entre comillas dobles con markdown dentro: bash ejecutó como órdenes lo que iba entre comillas invertidas, metió un texto mutilado en el informe y dejó ficheros vacíos (`.hoja`, `.par`…) en el directorio actual. Un texto con comillas invertidas va a un fichero con Write, y el script lo lee (o `node -e '…'` con comillas simples y sin texto dentro). Otra vez en RW-66 (2026-10-30): un `cat > f.mjs <<'EOF'` (heredoc entre comillas) dejó `'C:\\Program Files\\…'` con una sola barra y Chrome «no existía»; en rutas de Windows dentro de JS, barras normales (`C:/Program Files/…`).

Otra vez en CR-DS·01 (2026-11-08), y esta vez **sin error visible**: un `node - <<'EOF'` con un `new RegExp('…\\n…\\d…')` recibió una sola barra en cada sitio. El regex coincidió donde no debía y pegó una tabla al final de la línea 1 de un documento, que se commiteó y se empujó. El daño se vio una entrega después. Desde entonces: el texto con barras invertidas va con Edit, y un regex hecho en un script se arma con `String.fromCharCode(92)`. Antes de cada commit, `git diff` del fichero entero, no solo de las líneas que uno cree haber tocado.

Medido en RW-63 (2026-10-29): **Write y Edit decodifican la secuencia «barra invertida + u + cuatro cifras hex»** del texto que reciben: un regex de JS con el separador de línea U+2028 quedó con el carácter literal y el fichero dejó de compilar, y el escape de «<» para meter JSON en un `<script>` se convirtió en un «<» suelto (sin error). Con dos barras sí llega tal cual. Para escribir una sola barra seguida de u, generar la línea con un script que use `String.fromCharCode(92)`, y comprobar con `node --check` y `grep`.

**Why:** hasta el 2026-10-29, las herramientas del repo (`PAA/herramientas/*.py`, `verificar.py`, `compilar_banco.py`) no corrían aquí, y un taller que las asumiera se detenía. Con Python instalado podrían correr llamándolas por la ruta completa, pero no se ha medido si sus dependencias están.

Compilar el área de Álgebra completa (42 ficheros, ~1180 reactivos) con XeLaTeX + las dos banderas de memoria tarda ~150 s; dos compilaciones en carpetas externas distintas corren en paralelo sin chocar (medido en REP-ALG-PILOTO, 2026-09-26). El heredoc volvió a comerse barras en ese encargo.

Medido el 2026-10-29 (cabina CQL en Claude Code): la herramienta Edit dejó en LF un fichero CRLF entero (`aiw-console/context/handoffs/cantu-quizzes-latex.md`); para git da igual (el blob es LF) pero el árbol de trabajo cambia de régimen. Y `grep -c '\r$'`, `sed` y `cmp` de Git Bash se comen el `\r`: dieron «0 CRLF» en un fichero que sí lo era. `PAA/herramientas/cabina/cuadre_pc.py` no corre aquí; su port a Node da el mismo JSON. El mismo día, en Acervo, Edit **conservó** el CRLF de `Context_Pack_Acervo.md` (cuatro ediciones, una de varias líneas; 0 mixtos, medido con Node): el efecto no es constante, así que se mide en cada caso.

Medido el 2026-10-29 en Acervo: en Git Bash, `LANG` y `LC_ALL` están vacíos y `wc -w` **cuenta de menos** las
palabras con acentos (68,265 contra 71,254 con `LC_ALL=C.UTF-8`; Node con `split(/\s+/)` da 71,254). Un taller
reportó una «diferencia inexplicable» contra el relevo por eso: contar con `LC_ALL=C.UTF-8 wc -w`.

Medido el 2026-11-09 (cabina LECCIONES, relevo de aiw-console): **`sed -i` de Git Bash deja en LF un fichero CRLF entero**, aunque solo cambie un renglón. `git diff --stat` dice «1 línea» y el blob sale bien, porque git normaliza. El daño solo queda en el árbol de trabajo, y la siguiente sonda «LF suelto» de un script de relevo lo rechaza. Arreglo: tras el commit, `rm <f> && git checkout -- <f>` y contar con Node. Mejor aún, no usar `sed -i` en ficheros CRLF: la sustitución va en el script de Node que comprueba el CRLF.

**How to apply:** tras editar un fichero CRLF con Edit, devolverlo a CRLF y comprobar con Node (contar `\r\n` y comparar contra `git show HEAD:<f>` convertido). Escribir sondas en Node con la herramienta Write (no heredocs: Git Bash se come las barras invertidas de LaTeX/regex); medir EOL archivo a archivo en vez de fiarse de AGENTS.md §3. Ver `aiw-workspace-conventions`.

### `heredoc-come-barras`

*Memoria de PC-Chris, última edición 2026-11-19.*

En la herramienta Bash (Git Bash, PC-Chris), `node - <<'EOF' … EOF` y `cat > x.mjs <<'EOF'` llegaron con `\\` convertido en `\`: un `'\\(3.6\\)'` de JS quedó `'\(3.6\)'` y `'\\times'` se volvió TAB + «imes». El reemplazo no encontró nada y no dio error (CR-PL·78, ARI-26·S5, 15-nov).

**Why:** el script corre igual, pero con otras cadenas: un `VIEJO` que no casa da «0 cambios» callado, y una regex sin sus escapes puede casar de más.

**How to apply:** todo script con TeX (`\(`, `\times`, `\textcolor`), regex con `\.` `\(` `\b`, o `\u0001`, se escribe con la herramienta Write a `_scratch/…/trabajo/` y se corre con `node <fichero>`. Después, contar los cambios con un contador que se lea ANTES de aplicar (no `antes = n` después). Ver también `computadora-sin-python`.

**También sed:** un `sed 's/a\\|b/…/'` sobre un `.sh` que lleva `grep -q "x\|y"` lo deja en `x|y` y mete el patrón en otras líneas (CR-F2·01, 18-nov, dos veces: la cola quedó corriendo `cola3.sh|…|sh ciclo.sh $n`). Las colas y scripts con `\|` se escriben enteros con Write. Además, nunca editar con `sed -i` un `.sh` que ya corre: el sh lo lee a trozos; se hace otro script.

### `taskstop-no-mata-hijos`

*Memoria de PC-Chris, última edición 2026-11-20.*

TaskStop sobre un Bash de fondo (`timeout 3000 sh rehacer.sh …`) dijo «stopped», pero el `sh rehacer.sh` y su `timeout.exe` siguieron
vivos y compilaron a la vez que la tanda nueva (CR-A9·01, 2026-11-13): filas duplicadas en BLOQUES-PROVISIONALES y compilaciones mezcladas.

**Why:** el guion de prueba copia y devuelve el registro; dos a la vez lo dejan sucio y los resultados no valen. «Una compilación a la vez».

**How to apply:** tras TaskStop, buscar con `Get-CimInstance Win32_Process` (CommandLine con el nombre del guion) y matar con
`taskkill //F //T //PID <pid>` desde Git Bash; luego `git checkout -- docs/BLOQUES-PROVISIONALES.md` y relanzar. Ver `probar-galerias-locales`.

**CR-RS·15 (2026-11-18), dos trampas más al matar por CommandLine:**
- el filtro (`-match 'until'`) casa también con el propio comando que mata, si lleva ese texto: se mató a sí mismo y no corrió lo que seguía. Matar en un comando aparte, sin nada detrás;
- **CR-LX·15 (2026-11-19):** el filtro `-match 'esperar\.mjs\s+11'` casó también con `esperar.mjs 11 13`, la espera de otro taller (·24), y la maté. Con varios talleres en la PC, listar primero sin matar y matar solo el PID exacto que arrancó uno mismo (o anclar el final: `'esperar\.mjs 11$'`);
- matar con `Stop-Process` un `node` con puppeteer deja su Chrome huérfano con el perfil tomado: el siguiente arranque da «The browser is already running for …puppeteer_dev_chrome_profile-…» y luego `EBUSY … lockfile` sin atrapar. Matar con `taskkill /F /T` (al árbol) y comprobar que no quede `chrome.exe` con ese perfil.
- **CR-LX·19 (2026-11-20, 09:52):** al parar una cola de integración (bucle `while … sleep 60; integrar.mjs …`), el bucle ya había salido y su `integrar.mjs` llevaba 14 cherry-picks en main local; TaskStop lo cortó a media copia: cherry-pick en curso, `.git/index.lock` viejo y ficheros sin rastrear. Tras parar una cola, mirar `git status` y `origin/main..main` del repo; limpiar con `rm index.lock` (si no hay git.exe vivo), `cherry-pick --abort`, cotejar lo no rastreado con su commit de rama y `reset --keep origin/main`. Mejor: una sola cadena en un script que pare sola si una integración falla.

### `probar-ventanas-de-consola`

*Memoria de PC-Chris, última edición 2026-10-31.*

Medido en RW-56 (2026-10-29), al probar `cantu-revisiones/abrir-galeria.cmd`:

- **Abrir la ventana como un doble clic:** `Start-Process -FilePath <x.cmd> -PassThru` (ShellExecute). `spawn(…, {detached:true})` de Node NO sirve: crea `cmd.exe` sin consola y la consola nueva sale oculta, de `powershell`.
- **Cerrarla como con la X:** `(Get-Process -Id <cmd>).CloseMainWindow()`. En Windows 10 la ventana se ve como de `cmd.exe`; la de `conhost.exe` da `MainWindowHandle` 0. Todo lo de la consola muere en ~0,2 s.
- **Ctrl+C:** la sesión de Claude Code ignora Ctrl+C y los hijos lo heredan; para medirlo, el lanzador llama antes a `SetConsoleCtrlHandler(NULL, FALSE)`. Se manda con un powershell auxiliar: `FreeConsole` → `AttachConsole(pid)` → `SetConsoleCtrlHandler(NULL, TRUE)` → `GenerateConsoleCtrlEvent(0, 0)`. Teclas: `WriteConsoleInput` en `CONIN$`. En la 5.1, Ctrl+C en `Read-Host` mata al node hijo al momento, pero el script solo se corta con la tecla siguiente.
- **Por tubos (`cmd /d /s /c ""x.cmd" 2>&1"`):** el texto de `Read-Host "…"` no sale (usar `Write-Host -NoNewline` y `Read-Host` sin texto); `Read-Host` repite lo que lee; la 5.1 escribe en OEM 850 si no se pone `[Console]::OutputEncoding` a UTF-8 cuando `IsOutputRedirected`. `NoDefaultCurrentDirectoryInExePath=1`: un `.cmd` por su nombre suelto no se encuentra en la carpeta actual; dar la ruta completa.
- Con `$ErrorActionPreference='Stop'`, `& git … 2>$null` lanza en la 5.1: bajar a `Continue` para leer.
- **No cambies un `.cmd` mientras su ventana esté abierta.** `cmd` vuelve a leer el `.cmd` en marcha por su posición en
  el fichero: si el texto de arriba cambia de largo, al volver del `powershell` sigue en otro sitio. El `.ps1` sí se puede
  cambiar, porque PowerShell lo lee entero al arrancar. En RW-63 (2026-10-30), el merge dejó fuera el comentario nuevo de
  `abrir-galeria.cmd` hasta que el operador cerró la ventana. Para saber si hay una abierta:
  `Get-CimInstance Win32_Process | ? CommandLine -match 'abrir-galeria'`.

Medido en RW-70 (2026-10-30), con «Traer lo nuevo» (el servidor corre el `.ps1` en modo `-SoloTraer`):

- **Node, en Windows, para a sus hijos con él** (los mete en un *job*): si el botón para el servidor con `Stop-Process`,
  un `powershell` que el servidor lanzó, y su git, mueren al instante, a media vuelta. Esperar a que terminen antes de
  parar el servidor.
- **Un `.ps1` sin `[CmdletBinding()]` acepta un parámetro que no conoce sin error** (va a `$args`): corre entero. Quien lo
  llame con un modo nuevo tiene que comprobar antes que el `.ps1` del disco lo sabe.
- **Leer lo que dice una ventana de verdad:** `FreeConsole` → `AttachConsole(cmd)` → `CreateFileW("CONOUT$")` →
  `GetConsoleScreenBufferInfo` + `ReadConsoleOutputCharacterW`; foto con `PrintWindow(hwnd, dc, 2)` (enseña solo lo que
  cabe en la ventana). Molde: `_scratch\RW-70\trabajo\ventana.mjs`.
- **Recargar el código de un servidor node sin cambiar de proceso:** un `worker_threads` nuevo carga sus módulos del disco;
  un `import()` con `?v=` no (deja en memoria lo que importa). Así el `.ps1` lo sigue parando por su PID.

**Why:** cada punto costó una pasada fallida del banco (una dejó la ventana abierta con un servidor vivo).

**How to apply:** en cualquier ticket que pruebe un botón o una ventana de consola; ver `probar-galerias-locales` para puertos y servidores.
