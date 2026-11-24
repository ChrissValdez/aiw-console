# Lecciones: lo que estaba solo en la memoria de PC-Chris

> **Qué es esto.** Las reglas de la cabina de **LECCIONES** (`cantu-lessons` y `cantu-revisiones`) que aprendió el operador con ella. Lo pasó el coordinador de Método Cantú (Cuenta Chris, PC-Chris) el 2026-11-24, por orden del operador: *«Sí, a las dos»* (a «¿Les mando el cierre a MC-LandingPage y a CQL_Cabina y paso yo las reglas de la memoria?»).
>
> **Por qué.** Hasta hoy estas reglas solo vivían en la memoria de Claude Code de PC-Chris (`~/.claude/projects/C--Users-chris-Documents-AIW-Workspace/memory/`). Una sesión de la Cuenta Pato, de la nube u otro aparato no las ve. Aquí sí.
>
> **Cómo se lee.** Cada sección `###` es una memoria, copiada tal cual con su fecha. Un nombre entre comillas invertidas (`así`) es otra memoria: está en este fichero, en `context/cabinas/MEMORIA-COMUN.md` o en el de otra cabina (`lecciones/`, `landing/`, `quizzes/`). Donde una regla choque con el CLAUDE.md de la cabina, su relevo o una decisión (`context/DECISIONES.md`), manda lo más nuevo y se avisa. Las rutas y nombres de sesión son de PC-Chris; las horas, de Monterrey salvo que digan UTC.
>
> **Al día.** Es una foto del 24-nov. Lo que cambie de aquí en adelante se escribe en este fichero (o en el CLAUDE.md de la cabina), no solo en la memoria de un aparato.

## La cabina y cómo trabaja

### `cabina-lecciones-claude-code`

*Memoria de PC-Chris, última edición 2026-11-12.*

Desde el 2026-10-28 la cabina del hilo LECCIONES corre en Claude Code en esta PC y hace commit **y push** ella misma.
Sus reglas: `projects/aiw-console/context/cabinas/lecciones/CLAUDE.md` y `context/cabinas/REGLAS-DE-CABINA.md`. Su
relevo: `context/handoffs/cantu-lessons.md`.

**Why:** la app abre la sesión en `AIW_Workspace` y no en esa carpeta, así que el `CLAUDE.md` no se carga solo (medido el
2026-10-28). Un taller no es la cabina y no necesita nada de esto.

**How to apply:**
- Si la sesión es la cabina de LECCIONES, lee enteros esos dos ficheros antes de contestar.
- Las llamadas de git a la red, con `GIT_TERMINAL_PROMPT=0` y `GCM_INTERACTIVE=never`: si faltara una credencial, falla
  con el error literal en vez de esperar una ventana de GCM.
- GitHub Desktop está abierto y hace fetch solo.
- **En `aiw-console` escriben a la vez varias cabinas en Claude Code, y todas usan el mismo checkout y el mismo índice.**
  Medido el 2026-10-29 a las 10:34: había ficheros preparados por otra sesión y dos commits suyos sin publicar.
  - Ahí, commit **siempre con ruta**: `git commit -m … -- <rutas>`. Así no se lleva lo que otro preparó.
  - Antes del push, `git log origin/main..HEAD`: si hay commits ajenos sin publicar, se espera a que los publique su
    hilo.
- En el piloto, el operador pidió una tabla por paso con lo medido y la hora.
- **«Galería de lecciones»** (el operador, 2026-10-30) es el nombre de la plataforma de revisión. Cuando dice «la
  galería», es esa plataforma entera, no la carpeta de un ticket. No usar «consola», «índice» ni otros nombres.
- **Sin runs (D-083, 2026-10-30).** Este hilo ya no trabaja con runs ni con la consola de *features*. **Ninguna
  respuesta abre con la línea del run** («este encargo no tiene run…»): empieza por lo que importa. El tablero es la
  plataforma de revisión (`cantu-revisiones/abrir-galeria.cmd`; estado en `lecciones/estados.json`, en curso y
  pendientes en `lecciones/tablero.json`). El trabajo va por tickets RW, que la cabina lanza como sesiones enlazadas.
  `roadmap/roadmap.json` está congelado. El cierre D-082 sigue igual.
- **Las lecciones llevan un código por área: aritmética de ARI-01 a ARI-29 (RW-79, integrado el 2026-11-06 a las 21:29).**
  ARI-01–ARI-20 son la ruta esencial y ARI-21–ARI-29 la complementaria; álgebra será ALG-nn. Hubo dos cortes: RW-66
  (2026-10-30, quitó las «B») y RW-79 (de Lnn a ARI-nn). La tabla está en
  `cantu-lessons/docs/referencias/NUMERACION-DE-LECCIONES.md`. Los textos de antes de cada corte usan los códigos de su
  época, y una clave vieja que llega a la plataforma da 409. En un
  aparato nuevo, el botón corre `renumerar.mjs` (primero en simulación). Desde RW-67, `build.mjs --todas --sin-git` compila solo lo que
  no está al día, 3 a la vez, y pinta las miniaturas. Tras compilar se publican las páginas para la laptop: `node tools/revision/publicar-paginas.mjs`
  y, en `cantu-revisiones`, commit por ruta `-- lecciones` y push (RW-69, 2026-10-30). Si no se publica, la laptop ve
  lo de antes.
- **Archivar los tickets que terminan (el operador, 2026-10-30):** cada vez que un taller acaba, revisar
  `list_sessions` `linked` y archivar los integrados o sin nada que esperar. Antes, mirar `list_events` y apagar Remote
  Control. Quedan activos el que trabaja y los que esperan voto. Está en el contrato, en «Archivar los tickets que
  terminan».
- **Revisar por lección (el operador, 2026-10-31).** El operador revisa en la galería, en orden y por tandas (por
  ejemplo, L02 a L04, luego L05), y lo dice: «L02 a L04 revisadas». Por cada tanda hay un ticket corrector de web y uno
  de slide, no uno por lección. En una misma lección va primero la web, porque comparten borrador. Lo que vale para
  todas las lecciones sale a su propio ticket. El piloto es L01. Está en el contrato, «Revisar por lección».
- **El operador también habla con los talleres en su propia sesión**, y ahí puede pedir otra ronda después de que la
  cabina ya publicó. Pasó con RW-58 el 2026-10-29: la cabina publicó la ronda 1, y el operador aprobó la ronda 2 en la
  sesión del taller. Antes de dar por cerrado un ticket, o de leer un «aprobada», mira lo último de esa sesión
  (`list_events`) y el `git status`. Sus palabras se copian verbatim de ahí, no del informe del taller.

Ver `aiw-workspace-conventions` y `computadora-sin-python`.

**El id para escribirle a la cabina** es `local_3591b566-02e3-4c0e-8bca-146697b7fc03` (CL_Cabina; `get_session self`). `17a22d58…` es el id de su transcripción y los carriles reciben «no existe» (CR-GS y RW-76, 6-nov). Se pone así en cada encargo. **Ese id es de la cuenta principal.** En la suplementaria (desde el 12-nov) la cabina es `local_f6677f4f-97d5-4ff8-aad1-45b02f781ebb`: cada cuenta tiene sus propias sesiones de cabina y de carriles. Usa el de la cuenta en la que estás (`get_session self`).

**Abrir sesiones por Remote Control (medido el 12-nov, 15:14):** `start_session` sí abrió 8 carriles nuevos con un mensaje del operador escrito desde la laptop. El 30-oct y el 6-nov la app lo negaba. Se intenta siempre; solo si lo niega, va como agente de fondo o se le pide escribir desde la PC. En la suplementaria quedaron abiertos los 11 carriles (CR-SIS, AW, AS, AW2, AS2, AW3, AS3, RW, RS, PL y PE) en espera ligera: no leen su Arranque hasta el primer encargo.

**Tras un reinicio de la app (medido el 12-nov, 16:06):** Remote Control se apaga en todos los carriles, y el vigilante y lo que corría en segundo plano mueren. `set_remote_control` falla con «requires an active session. Send a message first». La receta: un mensaje de una línea a cada carril («la app se reinició: contesta "listo"»); al que trabajaba, que retome desde sus commits. Después, `set_remote_control` en cada uno, y rearmar el vigilante.

**`integrar.mjs` no rehace los mazos de slide (10-nov, CR-RS·02):** solo las webs. Si la entrega toca una slide, correr en cantu-lessons `node tools/revision/build.mjs drafts/web/…/<x>.web.draft.json --slide` y después `node tools/revision/publicar-paginas.mjs <COD…>`. El script vive en `cantu-lessons/tools/revision`, no en `_scratch`. Luego commit de `lecciones` por ruta en cantu-revisiones y push. Comprobarlo con el diff del `slide-mazo.html` publicado.

### `lecciones-tres-aparatos`

*Memoria de PC-Chris, última edición 2026-11-04.*

Chris revisa y vota la Galería de lecciones en tres aparatos, con estos nombres (2026-11-04):
- **PC-Chris:** la PC (DESKTOP-525K0IS), donde trabajan la cabina y los carriles;
- **Laptop-Chris:** la laptop de siempre (LAPTOP-PF6SOUAS en los commits «respuestas de … desde …», el único otro aparato que publicaba votos antes de Laptop-MC);
- **Laptop-MC:** la nueva (hostname TITI-TOTO-LAPTO, usuario «Metodo Cantu», repos en `%USERPROFILE%\AIW_Workspace\projects`), habilitada el 2026-11-04 solo para revisar y votar; Node 26.

Un aparato de revisión necesita lo de «Revisar en la laptop» del README de cantu-revisiones (RW-69):
- Git for Windows (GitHub Desktop no basta, porque el botón llama a `git`) y Node.js 24;
- cantu-revisiones y cantu-lessons, clonados uno al lado del otro;
- su nombre en git.

Sin compilar. Doble clic en `abrir-galeria.cmd` y, para subir, «Sincronizar».

**Why:** cada aparato vota en su disco y solo sube con «Sincronizar»; con tres, es más fácil que choquen.

**How to apply:** cuando pegue votos, pregunta o mira de qué aparato vienen (el commit dice «desde <hostname>»). Si un
botón no trae lo nuevo, sigue `lecciones-laptop-boton-viejo`.

### `lecciones-lanzar-sin-preguntar`

*Memoria de PC-Chris, última edición 2026-11-19.*

El 19-nov-2026 el operador dijo, tal cual: «ya no me preguntes si lanzar / lanza todas las correcciones y tanto 🔴; los 🟠 y 🟡 / y cuando acabe me avisas tu ejecutalas».

**Why:** las tarjetas y las preguntas de «¿lanzo?» lo frenaban; él quiere que la cabina ejecute la cola completa y le avise al final.

**How to apply:** en la cabina LECCIONES, las correcciones encargadas se lanzan como talleres (`user_asked`) sin tarjeta ni pregunta, encadenados con `_scratch/CR-LX/esperar.mjs` para no pasar de cinco a la vez ni tocar un borrador dos talleres. La cabina integra cada entrega con `integrar.mjs` y avisa al terminar todo. No frenar por tokens: «tu no pares hasta que termine el trabajo si se acaban los tokens dejalo acabase y reaundamos en ese moemnto / no te preocupes de los tokens». Si se agota el límite, se retoma al renovarse. Siguen siendo suyas las decisiones de diseño (las seis de CR-LX·07 §0), lo votado y borrar lo ajeno. Ver `tareas-largas-a-taller-anidado`, `lecciones-carriles-nunca-ociosos`.

### `lecciones-carriles-nunca-ociosos`

*Memoria de PC-Chris, última edición 2026-11-11.*

Chris, el 2026-11-10 (18:00): *«no veo nada ejecutandose en ningun carril de CL»*. Luego: *«porque paso no es la primera vez que pasa … es un error de la plataforma el flujo?»*.

Lo medido:
- CR-PL·60 se entregó a las 16:58 y la cabina lo integró hacia las 18:00. CR-SIS también estaba parado desde las 16:58.
- CR-RW·08 se entregó a las 17:54 y CR-RS·03 a las 17:55. A partir de ahí, ningún carril trabajaba.
- CR-AS·12 y CR-AW·01 estaban escritos desde las 17:05 «para cuando se libere un carril», y nadie los mandó.
- CR-RW esperaba un «arranca» explícito para su siguiente encargo.
- La plataforma marcaba 3 teselas en «Esperando variantes», pero `pendientes.mjs` daba 0, porque solo cuenta los 🚧:
  - ALG-06·EG: una ~ del operador sobre la 88, que ya estaba escrita;
  - ARI-24·S1: un fallo de la regla (CR-PL·61);
  - ARI-12·D4: una ronda lista sin publicar.

**Why:** la sincronización sí llega. Lo que falla es el flujo de la cabina. Encola el trabajo y espera a que algo la despierte. Cuando un carril termina, atiende ese aviso y no reparte lo demás. Además, mide los 🚧 y no lo que el operador ve marcado.

**How to apply:**
- **En cada aviso de un carril**, y en cada despertar del vigilante, correr `list_sessions {"linked": true}`. Si hay un carril parado y trabajo en cola, mandarlo en ese mismo turno, hasta el tope de 3.
- **Al mandarle a un carril el orden de varios encargos,** decirle «al entregar uno, sigue con el siguiente sin esperar».
- **En la tabla de cada cierre:**
  - cuántos carriles trabajan (de 3);
  - cuántas teselas hay en «Esperando variantes» en la portada (los enlaces `#…/guion-*` con «esperando»), hasta que `pendientes.mjs` las cuente (CR-PL·61).
- **Una ronda entregada se publica** en cuanto llega el aviso, antes que cualquier otra cosa.

Véase `lecciones-cambios-pendientes-al-dia` y `lecciones-vigilar-votos`.

### `lecciones-vigilar-votos`

*Memoria de PC-Chris, última edición 2026-11-05.*

Chris, el 2026-11-04: *«en el momento que mande votos y feedback deberia generar las varaintes nuevas»*. La cabina tiene un vigilante en segundo plano: `node _scratch/cabina-lecciones/vigilar-votos.mjs 120`, con run_in_background (nunca con &). Desde el 16-nov, 17:10, es la copia de `tools/cabina/vigilar-votos.propuesta.mjs` (CR-PL·82): despierta también con «ESTADO de <aparato>» al darle Reiniciar, «al día con la cabina» o «NO CUADRA — …». Si NO CUADRA, mirar qué dice y arreglarlo sin pedirle nada al operador. La de antes, en `vigilar-votos.mjs.antes-cr-pl-82`.
- Mira los `respuestas.log` de la PC y despierta tras 2 minutos de quietud.
- Desde el 4-nov también vigila lo que publican las laptops, con un fetch de `origin/main` cada minuto a un espejo sin blobs (`_scratch/cabina-lecciones/espejo-revisiones.git`).
- Al despertar: el veredicto tal cual y el encargo de una vez, sin esperar a que él publique.

**Se cae con un reinicio de la app o de la sesión.** Sale con código 4, que no es del script: los suyos son 0 y 2. El 5-nov, Chris votó de 08:14 a 08:17 y nadie lo vio hasta que preguntó *«que sucedio no veo nada ejecutandose?»*.

**Why:** él vota y espera ver las variantes nuevas sin tener que avisar ni pegar sus votos.

**How to apply:**
- Rearmarlo al arrancar y cada vez que avise que terminó, con el código que sea.
- Si sale con un código distinto de 0, leer `respuestas.json` (`actualizado`) y `git log origin/main` («respuestas de … desde …») para ver si hubo votos mientras no vigilaba, y procesarlos antes de rearmar.
- Los comentarios generales viven en `galerias/REVISADAS/respuestas.json` (`com:GEN-…`): revisarlos también.

Véase `cabina-lecciones-claude-code` y `lecciones-tablero-atendido-con-hora`.

**Cada comentario, con su entrada en el tablero (10-nov):** al despertar, recorrer todos los `com:*` de `respuestas.json` (sus `claves`) contra `lecciones/tablero.json` → `comentarios`. El de ARI-22·S3 de las 00:32 se quedó 17 horas sin encargo porque solo se leía lo nuevo del `respuestas.log`. Uno sin entrada es un encargo que falta.

### `lecciones-cambios-pendientes-al-dia`

*Memoria de PC-Chris, última edición 2026-11-16.*

Chris, el 2026-11-06: *«trata de mantener al dia todos los cambios pendientes»*. Más tarde: *«a veces ni hay nada trabajando y aun asi siempre lo veo ahi pendiente … no es la primera vez que me pasa»*. Veía 🚧 en 12 Lecciones slide (24 cambios) y no corría nada.

Las causas medidas:
- 12 esperaban un voto suyo en otra vista (el plan de colores);
- 10 eran apuntes pisados: una nota de sistema apuntada por slide encima del de su vista;
- 1 era falsa: «hoy» numerado como la 50 (CR-GW). La plataforma solo da «se queda» a la V0;
- además, la cabina miraba los votos y no la lista del 🚧.

**Why:** el 🚧 dice «decidido y la lección no lo apunta: le toca a la cabina». Él no tiene por qué perseguirlo.

**How to apply:**
- En cada cierre y cada vez que despierte el vigilante, correr:
  ```bash
  node _scratch/cabina-lecciones/pendientes.mjs
  ```
  Usa su propio servidor, Chrome sin ventana, y escribe `pendientes.json`. **Desde CARRILES v5 (9-nov), se corre con `pendientes.mjs 8798`.** Sin argumento usa el 8797, que ahora es el puerto de CR-SIS.
  - **Desde CR-PL·52 (9-nov, 18:10), también lee las vistas de sistema.** Una `SIS-…` con una sola ✓ deja 🚧 en cada escena de su `"en"` hasta que la lección lo trae. Una vista sin `"en"`, como `SIS-LLEVADAS`, no sale, y su pase lo sigue la cabina a mano. Hay una copia de antes en `pendientes.mjs.antes-cr-pl-52`. En la tabla del cierre va el total, y cuántos están en el taller, cuántos esperan su voto y cuántos no tienen encargo (deben ser 0).
- **Desde CR-PL·26** (integrado el 6-nov, `cantu-revisiones 5ec8671`), la plataforma pinta en rojo «sin encargo» lo que no esté declarado. Cada voto que deja algo por escribir se declara en el mismo paso que su encargo, en `lecciones/tablero.json` → `teselas`:
  ```json
  "L11·D8": { "estado": "en el taller", "donde": "CR-GS·14 y CR-LS·13", "el": "<ISO>" }
  ```
  O bien `{ "estado": "espera", "vista": "L01-D7", ... }`. Un `el` de antes de la última decisión de esa tesela no cuenta.
- Un comentario abierto deja su tesela en «esperando variantes». Cuando una ronda votada lo contesta, marcarlo «atendido» (con ISO), o su 🚧 no aparece.
- Las entradas de `teselas` ya escritas se pueden borrar, o dejar: no hacen nada.
- Una decisión de sistema se apunta con su propio código y `--en` (como `CR-GW08`, `CR-GS12`). Nunca sobre el apunte de la vista: desde CR-PL·25, `escrita.mjs` se niega.
- **Una ★ confirmada en un «antes y después»** (8-nov, 180–187) da 🚧 «por escribir» aunque la página ya la trae. Hay que apuntarla con `node tools/revision/escrita.mjs <L> <S> CR-GW V<n>`. Si la sección ya traía otra opción, se añade `--reemplazar`. Después, `publicar-paginas.mjs` de esas lecciones: solo cambia el manifiesto, y se commitea `lecciones` en cantu-revisiones. Que este paso vaya en cuanto llegue el voto.

- **Desde el 9-nov, `pendientes.mjs` lee también el guion de cada lección.** Las piezas «sin estado» (las slides de álgebra) no llevan 🚧, pero su guion sí dice «… sin encargo». Antes no se veía y el operador lo encontró. Al renumerar escenas, la plataforma pega cada vista a la escena de su mismo número y no lee la `vista` de las escritas. Eso da «sin encargo», «esperando» y «por votar» (las fantasma de ALG-01·D7/D8) falsos; lo arregla CR-PL·47, y hasta entonces se declaran en `teselas`.

- **Desde el 12-nov, la línea 💬** lee los `com:` de todos los `respuestas.json` contra `tablero.json` → `comentarios`. «SIN ENTRADA» tiene que dar 0. La plataforma no pone en «Esperando variantes» los comentarios de álgebra ni los de alcance general: ALG-17·S3 y ALG-05·D2 se quedaron un día sin encargo.

- **12-nov:** quitar una vista SIS- de la galería **no apaga su ✓**: la 326 siguió dando 🚧 en 15 secciones. Se apunta con `escrita.mjs <L> web <VISTA> V<n> --en … --nombre "… sustituida por la <m>"`. Y si un taller entrega un pase de sistema sin apuntes, los apunta la cabina al integrar (con el `motivo` de `pendientes.json`).

- **12-nov, 21:40: nunca juntar en main un cambio de lección sin publicarlo en el mismo paso.** La cabina juntó la tanda 3 de CR-SIS·16 y retuvo la publicación para esperar a CR-SIS·17. Resultado: 154 🚧 «por publicar» en las slides de aritmética, y el operador lo leyó como otro fallo de sincronización («no es la primera vez»). La plataforma pone en 🚧 **todas** las teselas de una pieza cuando su borrador cambia, no solo la escena que cambió; CR-PL·72 lo arregla. Si algo no debe publicarse todavía, se queda en la rama del taller, sin juntarlo.
- **Desde CR-PL·72 (integrado el 12-nov a las 22:3x; cantu-lessons aca05e67, cantu-revisiones 837516d):**
  - el 🚧 cuenta por escena, y solo lo que está en un taller;
  - lo que le toca a la cabina sale aparte, como 📤 «n por publicar · la cabina»;
  - todos los aparatos miden contra lo publicado;
  - `window.POR_PUBLICAR` es la guarda: nada atrasado más de 30 min.
  - `pendientes.mjs` es la copia propuesta por CR-PL. La de antes quedó en `pendientes.mjs.antes-cr-pl-72`.

- **12-nov, 23:15: antes de declarar una tesela, buscar si su clave ya existe en `teselas`** y reemplazar esa línea, sin añadir otra. Con la clave repetida manda la de abajo, que suele ser un «atendido» viejo: ARI-25·D3 siguió «sin encargo» y el operador lo vio. Se comprueba al final con un recuento de claves repetidas, que debe dar 0.

- **15-nov, se repitió («porque pasa esto? no es la primera vez»):** se encargaron 56 teselas (CR-LE·05, CR-PL·78) sin declararlas. **Declarar en el mismo paso que se escribe el encargo**, con `node ../../_scratch/cabina-lecciones/declarar-taller.mjs <lista.json>` (desde cantu-lessons) (lista ``clave, donde, fuente``; reemplaza la línea si la clave existe, CRLF) o a mano. Y `pendientes.mjs` **siempre con 8798**: sin argumento no escribió nada.

- **15-nov, 20:20: `pendientes.mjs 8798` tarda ~14 min** (204 guiones). Con `timeout 300` o `600` se cortaba sin escribir nada y parecía colgado. Correrlo en segundo plano con `timeout 1500` y mirar la hora de `pendientes.json`. La copia `pendientes-diag.mjs` imprime el avance por lección.

- **16-nov, 12:05 (el operador, desde la laptop: «me aparece todavía con cambios pendientes»):** 209 teselas seguían «en el taller» aunque sus carriles (CR-LE·05–11, CR-PL·78, CR-SIS·16, CR-GS·14, CR-LS·13…) ya estaban en main y publicados. La galería las pinta «n cambios pendientes · n en el taller» para siempre. **Al integrar y publicar un carril, en el mismo paso, marcar sus teselas «atendido»** con `node ../../_scratch/cabina-lecciones/atender-teselas.mjs "<clave>=><donde>" …` (desde cantu-lessons). Se cerraron 205 de una vez (ae6f1501). Y no recomendarle revisar un área sin mirar antes su fila en la galería.

- **16-nov, 14:50: cerrar «atendido» destapa lo que la tesela tapaba.** Tras cerrar las 205, salieron 21 «sin encargo»: 8 decisiones de sistema que la lección ya traía sin apunte (349, 359, 361, el tachado V11; se apuntan con `escrita.mjs … --en`; para la slide, una clave propia como `SIS-TACHADO-SLIDE`, porque una clave guarda una sola pieza) y 13+1 «votada sin ninguna ✓» de una galería vieja ya decidida en otra después: «atendido» **no** las apaga (la plataforma mira la vista votada antes que la decidida). Van a CR-PL·82 (adenda «lo más nuevo manda entre vistas») y se declaran en el taller. El conteo muestra un motivo por tesela: tras apuntar, volver a contar.

- **Desde CR-PL·82 (integrado el 16-nov, 17:10; cantu-lessons fab73aaf, cantu-revisiones a5319270):** integrar con `node tools/cabina/integrar.mjs <repo> <rama> <sha> [--seco] [--sin-cerrar]` (desde cantu-lessons; cierra las teselas del carril y apunta ramas-integradas; si choca, a mano y luego atender-teselas). Antes de decir «listo»: `node tools/cabina/cierre.mjs` (~11 min; ✔ solo con SIN ENCARGO 0, 🔧 0, 📤 0; deja `estado/cabina.json`, que cada aparato compara al «Reiniciar»). Correrlo tras cada integración. `tools/cabina/pendientes.mjs` sustituye al de _scratch.

Véase `lecciones-vigilar-votos` y `cabina-lecciones-claude-code`.

- **22-nov (CR-LX3·06): el taller escribió 23 ✓ y no corrió `escrita.mjs`.** Salieron 23 🚧 «sin encargo» tras integrar. Al integrar una ronda, si el cierre dice «todavía no está apuntada en la lección», la cabina corre `node tools/revision/escrita.mjs <L> <S> <GALERÍA> V<n>` (con `--reemplazar` si traía el apunte de una galería anterior). Se lee de cantu-lessons: basta commit y push, sin compilar ni publicar. Un ~ concreto escrito directo en la lección se queda «Votada · esperando variantes» hasta que haya una ✓: pide la opción única de la 9.6.

### `lecciones-ahorro-tokens`

*Memoria de PC-Chris, última edición 2026-11-18.*

**Desde el 10-nov, TALLER-COMUN v17, la 9.8** (Chris, 12:48: *«estoy deacuerdo con todo»*). Su principio: *«Trabajar mas lento no es solucion»*. Prefiere acabarse los tokens antes que producir lo mismo en más días. La meta es menos tokens por resultado, nunca menos ritmo: no proponer «nada nuevo hasta el viernes» ni nada parecido.
- **Lo medido** con `_scratch/cabina-lecciones/gasto-semana.json`, que sale de un script que suma el `usage` de los transcripts de `~/.claude/projects` desde el reinicio (viernes 11:00Z), por `message.id`. Del 6 al 10-nov:
  - releer el contexto en cada paso es el ~70 % del gasto;
  - **la cabina fue el 20,8 % de la semana** (5 648 pasos, contexto medio de 261k);
  - CR-GS 15,5 %, CR-GW 10,2 %, CR-PL 9,4 %;
  - LECCIONES, unos tres cuartos del total.
- **La 9.8:**
  - una corrección clara (dice qué cambiar, o aplica una regla o pieza ya votada) va directo a la lección, y si no gusta se revierte;
  - **una decisión, una vista:** las mismas variantes para varias slides van en UNA vista con el carrusel «Antes | Después» a la derecha. El modelo que eligió es `PROTO-A-SIS-ERROR-COMUN`. Nunca la misma ronda repetida en varias vistas (CR-AS·06 en ALG-01·D2, D3 y D6);
  - sin vista donde no hay que decidir (el título de una lección nueva);
  - un encargo por carril;
  - sesiones cortas, también la cabina;
  - arranque corto;
  - Sonnet para lo mecánico;
  - checklist y piloto en el bloque 2 de álgebra;
  - pasada de aritmética y congelarla;
  - medir el % de la semana por cambio publicado.
- **Ya no se re-ceba con «listo»:** cuesta un turno de unos 85k. La identidad del carril va en el mensaje del encargo.
- **La cabina debe gastar menos pasos:** juntar comandos y hacer scripts de rutina (integrar, compilar y publicar en un paso), y reabrirse desde el relevo.

Chris, el 2026-11-06: *«Busco dos cosas eficientar velocidad y gasto de tokens… si aumento el ritmo de trabajo me preocupa que no rindan toda la semana»*. Después: *«implementa el plan mas adecuado… acepto tus sugerencias»*. Quedó en CARRILES v2.

Medido ese día a las 15:49:
- 15 % de la semana gastado en un día de trabajo (el plan Ultra se reinicia los viernes a las 04:59);
- la cabina tenía el 70 % de su contexto, CR-GS el 77 % y CR-LS el 32 %.

Cada turno de una sesión larga vuelve a leer todo. Lo que más gastaba: los mensajes chicos de los carriles, que hacían que la cabina diera un turno entero cada vez.

**Medido el 17-nov (16 y 17-nov, `gasto-semana.mjs` con otro DESDE):**
- releer el contexto sigue siendo el 71 % del gasto; la salida, el 14 %;
- los carriles de Geometría trabajaron con **225–234k de contexto medio**, porque la cabina les mandó 02, 03, 04 y 05 en la misma sesión sin `clear_session`;
- eso rompe la regla v5 de abajo: limpiar cada carril al integrarlo y mandarle el siguiente encargo en limpio.

Chris preguntó si el gasto era necesario o era un plan ineficiente. La respuesta fue: las dos cosas, y la parte ineficiente es el contexto arrastrado.

**Why:** él quiere más ritmo sin quedarse sin tokens a media semana. Abrir más carriles agrega sesiones y coordinación.

**Desde el 9-nov, CARRILES v5** (Chris, 16:57: *«Sí, adóptala»*, tras *«Dame la estrategia que consdieres que mejore lo mas posible mi flujo de trabajo y gasto en tokens»*):
- Medido ese día:
  - por escena, 3–4 rondas y unas 7,7 h, 4,4 de ellas de espera del voto;
  - sesiones de 2 500 a 4 500 mensajes;
  - unos 88 000 tokens fijos al abrir una sesión;
  - la semana, al 67 % con 3,5 días por delante.
- **Los carriles:**
  - CR-AS y CR-AW (Álgebra slide y web) diseñan y escriben, sin un Guion que entregue a una Lección;
  - CR-SIS se encarga de todo lo de sistema: un solo voto por regla, censo con scripts y subagentes, la aplicación en un pase aparte;
  - CR-PL y CR-PE se abren solo por encargo.
  - CR-RS y CR-RW (aritmética) abiertos el 9-nov, a las 17:35, por pedido del operador. Las vistas SIS- van en REGLAS-SLIDE y REGLAS-WEB (formato PROTO-VISTAS, aprobado a las 17:27).
  - El operador pidió los carriles abiertos en espera y con Remote Control, para mandarles instrucciones desde la laptop. Eso pesa más que «abrir solo donde hay trabajo».
- **Las sesiones son cortas:** duran un bloque o un día y dejan un relevo de 30 renglones o menos. Esto sustituye a «compactar, no renovar»; la compactación queda como red.
  - **Al cerrar un carril, se limpia y no se archiva** (desde CR-AS, 9-nov, 17:46). `clear_session` sí funciona con Remote Control encendido, y la sesión lo conserva.
  - Después se le manda un aviso corto: quién es, «contesta solo listo, sin herramientas», y que siga su Arranque cuando llegue un encargo. Así no relee la v5 ni TALLER-COMUN mientras espera.
  - Sus worktrees se quitan. Antes de `git worktree remove`, quitar la unión de `tools/render/node_modules` con `[IO.Directory]::Delete(p, $false)` y volver a contar las 81 entradas del node_modules principal.
- **Se abre una sesión solo donde hay trabajo,** y nunca más de 3 a la vez.
- **El voto va directo al dueño** con un aviso de una línea. La cabina escribe encargo solo si hay que interpretar o si cruza carriles.
- A los dos días, comparar `_scratch/cabina-lecciones/latencia.mjs` y `rondas.mjs` con lo medido el 9-nov.

**How to apply (v2, lo que sigue valiendo):**
- Medir con `get_usage` (el plan y el contexto de cada sesión) en cada cierre largo.
- **Del 6-nov (21:50) al 9-nov, compactar en vez de renovar; desde la v5, sesiones cortas y la compactación solo como red.** Chris: *«no hubiera sido mejor pedirle que se compactara que abrir sesion nueva? a la otra pidele eso mejor y configuralo para el autocompact al 60%»*.
  - `~/.claude/settings.json` → `modelSettings`: `autoCompactWindow: 300000` para `claude-opus-5-5` y `claude-sonnet-5-5`, que es el 60 % de 500k. Es el número de tokens en el que compacta. Aplica a las sesiones que arrancan después; una sesión que ya corre lo toma solo si alguien escribe `/autocompact 300k` en ella. Por eso no se combina con `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE`: juntos darían 180k.
  - **Una sesión no puede compactar a otra.** Un «/compact» mandado con SendMessage llega como texto, y no hay herramienta para eso. Un carril que ya corría con 500k se compacta si Chris escribe `/compact` ahí; si no, se renueva como antes (relevo y sesión nueva).
  - Cada carril deja su relevo al día al cerrar cada encargo, porque la compactación puede llegar a media tarea.
  - La compactación no ocurre mientras la sesión está quieta; ocurre al mandar el siguiente mensaje. El 6-nov la cabina bajó así de 872k a 92k.
- Los carriles avisan una vez por tanda o encargo. Los modelos baratos van en el trabajo mecánico (CR-LS); Opus en el diseño y el código.
- Antes de abrir un carril nuevo, preguntar por el costo. Primero se usan los que están sin trabajo.

Véase `cabina-lecciones-claude-code` y `lecciones-cambios-pendientes-al-dia`.

### `lecciones-pulido-mitad-de-tokens`

*Memoria de PC-Chris, última edición 2026-11-20.*

El 20-nov-2026, ~00:40, Chris preguntó *«hay alguna manera de eficientar que haga el mismo trabajo y no gaste tantos tokens?»*. Aprobó todo, incluido Sonnet para los 🟡 de solo texto y esfuerzo medio (*«agregalo»*).

**Why:**
- Esa noche, con 2 talleres, la semana subía ~1.4 puntos por hora y se habría acabado antes de la renovación.
- El gasto salía de que cada subagente leía DISEÑO completo, de las segundas vueltas, de despertar por cada compilación, de mirar las fotos y de esfuerzo alto en todo.

**How to apply:**
- Las reglas viven en la sección «Desde el 20-nov, 00:45» al final de `cantu-lessons/docs/carriles/CR-LX/pulido.md` (b60fbb7d).
- Los talleres del pulido van con esfuerzo medio, puesto con `set_session_effort`.
- A cada taller que arranca de su fila, recordarle esa sección.
- No commitear en el checkout de cantu-lessons mientras corre un `integrar.mjs`: el 20-nov a las 00:45 un commit de docs quedó encima de la integración de ·16.

Esto sustituye, solo para el pulido CR-LX, la regla general de Opus con esfuerzo alto de `no-usar-fable` y `lecciones-ahorro-tokens`. Ver `uso-semanal-mezcla-proyectos`.

### `turno-de-cinco`

*Memoria de PC-Chris, última edición 2026-11-20.*

El 19-nov-2026, CR-LX·26 midió que 5 `build.mjs` a la vez dan lo mismo que en serie, salvo la hora; las miniaturas varían también en serie. La fila rinde 7,6 veces más. El informe es `cantu-lessons/docs/carriles/CR-LX/26.md`. El operador pidió *«que compile unas 5 lecciones a la vez»*.

**How to apply:**
- Los talleres compilan con `sh C:/Users/chris/Documents/AIW_Workspace/_scratch/CR-LX/turno-n.sh timeout 900 node tools/revision/build.mjs <borrador> [--slide]`. `TURNO_N` cambia el 5.
- El `turno.sh` viejo (`_scratch/CR-E2/01`) ya no se usa: espera a cero compilaciones y con el nuevo se queda sin turno. Todo encargo nuevo nombra el `turno-n.sh`.
- `integrar.mjs` llama a `build.mjs` sin turno, pero `turno-n` lo cuenta.
- Dos `build.mjs` en el **mismo** checkout siguen pisándose el índice: una por worktree.

Ver `lecciones-lanzar-sin-preguntar`.

### `apagar-pc-al-quedar-parado`

*Memoria de PC-Chris, última edición 2026-11-23.*

Chris (17-nov, 23:45) dio permiso a la cabina de LECCIONES para apagar la PC por la noche. Sus palabras: *«lo deje en la noche y no hay nada que puedas hacer ahsta que me despierte y vote / Si puedes avanzar trabajo aun no acabas, si te paraste completamente hasta que venga a votar / ahi si procede el apagado»*.

**Why:** para no tener que estimar un temporizador de apagado; él suele dejarlo con tiempo de más.

**How to apply:** «terminado» quiere decir que no queda nada que avanzar sin él.
- Ningún carril trabajando.
- Todo lo cerrado, integrado y empujado.
- Encargado todo lo que no espere un voto o una aprobación suya.
- El cierre en ✔ listo.

Entonces corre `shutdown /s /t 300`, que se cancela con `shutdown /a`. Si un carril está atorado, no apagues: queda prendida.

**Desde el 17-nov (23:50) es la metodología fija:** *«no usare el temporizador … tu decides cuando es el momento adecuado para apagar la PC, para que no corte trabajo a medias y se apage de forma segura / igual me mandas un aviso de que se va a pagar de forma segura / Y justo depsues el comando shutdown /a por si estoy enfrente de la PC / esta metodologia me gustaria manejarla de aqui en adelante»*.
- Ya no hay temporizador de respaldo: si la cabina no apaga, nadie apaga.
- Antes del comando, un aviso en el chat y por PushNotification al teléfono: que se apaga de forma segura y en cuánto tiempo.
- Justo después, el bloque `shutdown /a` para cancelar.

**Se arma solo cuando él lo pide, cada noche** (17-nov, 23:55): *«yo te lo pedire cada noche / no automaticamente decidas tu cuando haya un pare de trabajo apagar la PC … yo te avisare que me ire a dormir, y que cuando acabes hagas el protocolo de apagado despues de terminar lo que este en cola de trabajo / sino durante sesiones en el dia puede que en puntos intermedios que tengo que votar estes apague y apague la compu»*.
- Sin su aviso de «me voy a dormir», no se apaga nunca, aunque todo esté parado.
- El permiso vale solo esa noche: no pasa a la siguiente.

**También en DASHBOARD** (23-nov, 02:35): «me iré a dormir; quisiera que mandes a apagar esta PC cuando acabes este encargo». El mismo protocolo vale en otras cabinas. Antes de apagar, `list_sessions` (sin `linked`): si otra cabina trabaja, no se apaga.

Solo vale de noche, cuando él lo deja así; no lo hagas mientras él trabaja en la PC. Véase `cabina-lecciones-claude-code`.

### `lecciones-limpiar-scratch`

*Memoria de PC-Chris, última edición 2026-11-21.*

El 2026-11-11 el operador dijo «Sí, bórralos» y se borraron 101,8 GB (179 carpetas RW-*/CR-* cerradas). El disco pasó de unos 11 GB libres a 109 GB.

**Qué se queda siempre:**
- `cabina-lecciones`;
- CR-PE y CR-PE-03: datos de terceros, no se tocan;
- todo lo que no empiece por RW-/CR-;
- el encargo activo;
- de cada carril vivo, su último encargo numerado y sus carpetas sin número (`trabajo`, `galeria-img`, `prueba-NN`, `entregas`).

**Why:** los carriles copian sus herramientas del encargo anterior (CR-RS·10 sacó `pliega10.mjs` de `pliega09`). Si se borra el último, el siguiente encargo empieza de cero.

**How to apply:**
- Medir con un script que no siga uniones (lstat).
- Hacer una pasada en seco que liste las uniones, y quitarlas con `cmd /c rmdir` antes de `rmSync`.
- Cada borrado permanente necesita el sí explícito del operador.
- `respaldo-laptop-2026-11-10` vive en la laptop, no en la PC.

**21-nov, C: a 0 MB (sin el operador):** no se borró nada. Se **movieron** a `D:\AIW_frio\_scratch` las carpetas de los carriles cerrados (CR-LX2 y CR-LX/<nn>), con `_scratch/cabina-lecciones/mover-a-d.sh` (robocopy /MOVE /XJ). Se ganaron 38 GB. D: tiene unos 1.9 TB libres. Para medir, `medir-scratch.mjs <ruta>`.

Relacionado: `lecciones-carriles-nunca-ociosos`, `cabina-lecciones-claude-code`.

### `cr-pl-pedido-directo-del-operador`

*Memoria de PC-Chris, última edición 2026-11-04.*

En el carril CR-PL (la Galería de lecciones, `cantu-revisiones` + `cantu-lessons`), los encargos llegan de la cabina (CL_Cabina). Si el operador escribe un pedido **directamente** en la sesión del taller (le pasó con el modal de comentar de CR-PL·17, 2026-11-04), se atiende ahí mismo:
- rama propia desde `origin/main` en los dos worktrees (`_scratch\CR-PL\cantu-revisiones` y `\cantu-lessons`), p. ej. `cr-pl-17-modal`;
- commit en esa rama, sin push ni merge;
- informe en `docs/carriles/CR-PL/<n>-<algo>.md` con **sus palabras verbatim** y el renglón de la bitácora (`docs/carriles/CR-PL.md`);
- aviso a la cabina con `SendMessage`, que integra y publica.

**Why:** la cabina lo confirmó al integrar (2f0f5c5): «Si el operador te vuelve a pedir algo directamente, sigue así». Mantiene el orden del carril (la cabina integra) sin hacer esperar al operador.

**How to apply:** no pedir un encargo a la cabina antes de empezar; sí aplicar las paradas de siempre (votos, galerías, `escritas.json`, `estados.json`, CARRILES.md) y no tocar el 8791. Antes de cambiar de rama, mirar si el worktree trae ficheros sin commit (en CR-PL·17 apareció un `abrir-galeria.ps1` viejo: compararlo con su commit antes de devolverlo). Relacionado: `cabina-lanza-talleres`, `cerrar-cada-paso-en-que-estamos`.

## El flujo y lo que ya decidió el operador

### `lecciones-flujo-v11`

*Memoria de PC-Chris, última edición 2026-11-09.*

El operador aprobó los cuatro cambios del flujo el 2026-11-08 a las 15:07 («Primero las piezas, después las lecciones … probemos que tal jalan»). Están en `projects/cantu-lessons/docs/encargos/TALLER-COMUN.md` v11, sección 9, y en «El flujo de trabajo v11» del CLAUDE.md de la cabina.

- **Primero las piezas.** Un comentario de sistema abre una ronda de pieza en CR-GW, no rondas por sección. Es de sistema si dice «en general» o se repite en dos secciones. La ronda lleva tres variantes en dos secciones de muestra. La elegida va al catálogo `docs/referencias/piezas/` (CR-GW·18 lo creó) y se aplica de una vez en todas.
  - Su matiz: las piezas salen de verlas aplicadas, así que la ronda se abre en cuanto aparece el comentario.
  - Las piezas candidatas se votan en el «hoy» de la sección donde ya están.
- **Diseña quien escribe.** Cada lección es de un carril, que arma sus rondas y escribe la elegida. Desde ahí CR-GW es el carril de piezas.
- **Dos velocidades.** La ronda de dirección va ligera: fotos y tres líneas por opción. La revisión completa va solo al escribir.
- **Carriles de lecciones nuevos, cada uno en su worktree** (`_scratch\<ticket>\wt\cantu-lessons`).
  - La cabina junta su rama como las de CR-PL.
  - Desde la v14, dos compilaciones a la vez en la máquina, cada una en su copia (nunca dos en un checkout).
- **Lo de la cabina:**
  - tras cada voto, declarar la tesela en el tablero primero y empujarla (su pregunta de las 15:11). Pidió que fuera regla y no arreglo a mano (15:32): con CR-PL·37, la plataforma dice sola «recién votada» hasta tener noticias de la cabina, y el rojo «sin encargo» queda para cuando se pasa el margen, que es el plazo de la cabina;
  - publicar primero;
  - instrucciones solo por fichero.

- **v12 (2026-11-08, 16:19), dos correcciones del operador:**
  - **Tras un ~, variantes nuevas con número nuevo.** Reescribir la sección en su sitio para que la vuelva a votar fue un error repetido: *«en vez de traer nueva variantes, actualiza una variatne vieja»*. Además el comentario viejo seguía en la caja; eso va a CR-PL·39.
  - **La letra:** las cuentas de la 86 y la 87 salieron a 35 px; la tarjeta de pasos, a 29,1, y dice que está bien. Tope de 29,1 hasta votar la norma (CR-GW·20). La causa fue una palabra: el punto 22 decía «la cuenta, en grande». Un adjetivo en una regla del común se copia en todas las lecciones.

- **v13 (2026-11-08, 16:55), tres reglas de forma que no llevan ronda; se aplican con la norma en una sola pasada:**
  - punto 24, la negrita solo resalta, nunca un procedimiento entero;
  - punto 25, el bloque centrado y su contenido a la izquierda: es la regla 21.3 de DISEÑO, que ya existía y la 91 no siguió. El operador: «ya lo hemos mencionado muchas veces»;
  - punto 26, flechas y recuadros en vez de leyendas que lo explican. En aritmética se usan; en álgebra no, y sobraban descripciones.
  - Al encargar, citar la regla de DISEÑO que ya existe: una regla escrita no protege si el encargo no la cita.

- **v14 (2026-11-08, 19:16), el ritmo, TALLER-COMUN 9.5.** Se quejó: *«me tarod poco end ar feedback y mucho para verse reflejado»*. Aprobó «Sí, las seis»:
  - durante una pasada no se abren rondas de reglas que la toquen; lo votado entra en la siguiente, salvo «urgente»;
  - se publica lección por lección (meta: primer cambio visible a los 45 min);
  - sus pedidos a la plataforma, primeros en la fila de CR-PL;
  - una pieza ✓ se aplica ya desde la variante votada; el catálogo, en paralelo;
  - dos compilaciones a la vez;
  - la cabina publica galerías con `_scratch/cabina-lecciones/publicar-galeria.mjs` (15 s, `--seco`, `--md5`) y apunta una nota y una versión de DISEÑO por tanda.
  - Lo medido: DISEÑO v85→v92 en una hora; la pasada de álgebra, 0 lecciones en 46 min; la de aritmética rehízo dos secciones por una regla votada a mitad.

- **v15 (2026-11-08, 23:05), menos espera entre votos, TALLER-COMUN 9.6.** Volvió a quejarse: *«de nuevo mucho tiempo muerto entre votaciones … de que mando feedbacka que se vean reflejados los acmbios suele haber una espera larga»*. Lo medido: una corrección concreta tardaba de 13 a 26 min; las slides nuevas de ALG-01, 1 h 51 min, y al votarlas no le quedaba nada en cola. Aprobó «Sí, los cuatro»:
  - un ~ que dice qué cambiar se responde con **una sola** opción nueva (con número nuevo y su «antes y después», dentro de la vista). Las tres siguen en la primera ronda de una lección nueva y cuando el comentario es abierto;
  - en las rondas se avisa y se publica vista por vista, para que siempre tenga algo que votar;
  - dos velocidades de verdad: las opciones llevan las guardas y fotos en dos anchos (slide a 1920); la revisión completa y el informe largo, solo la elegida;
  - **la cabina avisa primero y documenta después.** Ante un voto, el mensaje al carril con sus palabras sale antes del veredicto, DISEÑO, el tablero y el relevo. Ante una entrega, publicar primero.
  - No recomendar más carriles en paralelo por los tokens: con estos cuatro no hace falta.

**Why:** de su voto a las variantes siguientes pasaban unos 40 minutos, casi todo cola, relevos y comprobaciones de producto terminado. Ese día, 15 secciones «meh» eran 4 comentarios de sistema.

**How to apply:**
- Una sección se arma con piezas del catálogo. Lo que no tiene pieza es una candidata.
- Medir si las rondas bajan a unos 15 minutos y decírselo al operador.
- El bloque 2 (ALG-07–14) va en dos carriles con worktree, cuando el catálogo esté.

Véase `cabina-lecciones-claude-code`, `lecciones-tres-variantes-por-seccion` y `lecciones-ahorro-tokens`.

### `lecciones-tres-variantes-por-seccion`

*Memoria de PC-Chris, última edición 2026-11-09.*

Chris, el 2026-11-07 a las 20:27, tras leer el piloto ALG-01 y ALG-02 (escrito directo al borrador con una sola versión por sección, método LOTE-2):
*«se me hace raro que las primeras lecciones web, me haga escoger entre variantes cuando no me da multiples variatnes, deberia traerme unas 3 variantes por seccion asi tengo comentarios mas claros que da y da mas opciones de diseño»*.

**Why:** con una sola versión solo puede decir sí/meh; con tres compara, comenta más claro y ve más diseño.

**How to apply:**
- Desde ALG-03, el encargo de cada lección web nueva pide, además del borrador, la ronda de tres variantes por sección en la galería web (CR-GW o el taller; la cabina dice quién en cada encargo). Cambia «una sola versión por sección» de `LOTE-2-LECCIONES-WEB.md`.
- En una lección ya votada, lo de «sí» se queda. Una «meh» cuyo comentario dice qué cambiar lleva **una sola** opción nueva (desde v15, 2026-11-08, 23:05: «Sí, los cuatro», TALLER-COMUN 9.6). Solo la «meh» abierta («no me gusta», sin decir qué) va a ronda de tres nuevas, con «hoy» plegado (así se hizo CR-GW·16).
- **Las slides nuevas, igual: tres por escena.** El 2026-11-08 a las 20:15 Chris eligió *«Sí, tres por escena»* para ALG-01 a 06, aunque la cabina recomendó una versión por slide, porque las reglas de la slide ya estaban votadas. Así se encargó (CR-GS·15):
  - la V1 va escrita en la lección;
  - la V2 y la V3 son de dirección, y las tres cumplen lo votado;
  - el color de un bloque nuevo va en la portada de su primera lección.
  No proponerle una sola versión para una lección nueva.
- **Excepción, el formato de un paso a paso (desde el 2026-11-09, DISEÑO v101, REGLA-SLIDE-PASO-A-PASO, aprobada en el chat):** no se escoge por cuál se ve mejor, sino por el papel del bloque. En una sección, decide la 165; el ejemplo guiado va siempre con la tarjeta del problema + el Procedimiento de Studio; lo corto, en una escena; y nunca dos bloques seguidos con el mismo formato. Por eso el ejemplo guiado ya no lleva ronda de tres. Chris batallaba: *«varios formatos para un ejemplo guiado / Y varios se ven bien / estoy batallando para escoger cuales y cuando usarlos»*. Tres opciones del mismo paso a paso, sin regla, lo dejan sin criterio.
  - **En álgebra, desde v103 (2026-11-09, entre las 02:40 y las 02:43):** todo paso a paso, de sección o de ejemplo, va en Studio en xlarge, en una sola versión, sin ronda de formato. En ALG-03 votó Studio contra la regla de v101 y, al preguntarle, contestó *«Sí, Studio en álgebra»*. La ronda de tres queda para lo que no es un procedimiento. Aritmética sigue con la regla de v101.
- Antes de inventar un bloque HTML, buscar el componente de Studio que ya existe: le molestó que ALG-02·S1 no usara el `conceptGrid` en modo Anatomía (`terms`).

Véase `galeria-una-vista-por-slide` y `cabina-lecciones-claude-code`.

### `lecciones-una-decision-cierra-sus-restos`

*Memoria de PC-Chris, última edición 2026-11-11.*

**Una decisión cierra sus restos** (TALLER-COMUN 9.9, v18; Chris lo aprobó el 2026-11-10 a las 14:13: *«Sí, adóptala»*).

Cuando un voto decide algo para varias slides o secciones (una vista SIS, o una ✓ con «tráela a las siguientes»), la misma entrega pliega en esas slides toda ronda abierta que ya quedó contestada. Cada vista lleva su línea «Lo decidió …». La cabina no publica una galería con restos.

**Why:** a Chris le quedaron seis opciones viejas «por votar» en ALG-01-D3 y ALG-01-D6, después de votar la 8 y la 9. Su queja (14:09): *«no es la primera vez que me pasa algo asi»*. La causa fue la cabina: al abrir `SIS-MAQUINA-Y-BARRA` (CR-AS·08), le dijo que **ignorara** la ronda vieja en vez de plegarla. Además, CR-AS·06 había repetido la misma ronda de enfoque en tres vistas.

**How to apply:**
- Antes de publicar una vista SIS, o de integrar una ✓ «para las siguientes», mira el `CAT` de la galería (`var CAT =` en `galeria.html`; las opciones van en `ops`). Toda vista de esas slides que tenga opciones sin votar va plegada en el mismo encargo.
- Nunca escribas «ignora esa ronda» en un cierre.
- El 🚧 cuenta los votos obsoletos (CR-PL·57) y tiene que dar 0, como «sin encargo».
- Las claves de vista de CR-GS no coinciden con las slides del mazo: `ALG-01-D3` es la D4.
- **Un pliegue que «se queda como hoy» lleva `"aprobada": "V0"` en el `CAT`.** Nunca texto con «la N». `idAprobada` busca `/\bla (\d+)\b/`, así que «como hoy (la 8 ✗)» se leyó como la 8 aprobada. Dio un falso «por escribir» en ARI-28·S5 (CR-RW·09, 10-nov; arreglado en 1bbf4ae). Al publicar un pliegue, corre `pendientes.mjs` y mira que no salga nada nuevo «sin encargo».

Véase `lecciones-ahorro-tokens` (la 9.8.2, «una decisión, una vista») y `lecciones-cambios-pendientes-al-dia`.

### `lecciones-renglon-web-como-hoy`

*Memoria de PC-Chris, última edición 2026-11-10.*

Chris cerró REGLA-TIPOGRAFIA-RENGLON el 2026-11-09 a las 20:52 con «Sí, como hoy» (DISEÑO v106). La prosa de la web ocupa todo el ancho de su tarjeta; a 1366 el renglón más largo llega a ~115 caracteres.

Antes descartó siete caminos:
- el tope dentro de la tarjeta (305): «se ve horrible ese hueco en blanco a la derecha»;
- la hoja angosta (310): «No me convence»;
- el relleno extra (311) y la hoja de 960 con letra grande (312);
- las combinaciones del panel de CR-SIS (hoja, letra, raya, aire);
- las maquetas de la investigación: título al margen (A) y pieza al lado (B), «se ven horrible».

**Why:** le molesta más un blanco dentro del marco de la tarjeta que un renglón largo. La investigación está en `docs/referencias/INVESTIGACION-RENGLON-WEB.md`.

**How to apply:**
- No reabrir el largo del renglón web ni proponer topes, hojas angostas o maquetas de layout salvo que él lo pida.
- Si una regla de sistema choca con «se ve un hueco blanco», mostrarle la foto antes de defenderla con números.
- La única vía sin probar fue la C, un índice fijo de la lección a un lado.

Relacionado: `lecciones-flujo-v11`, `galeria-una-vista-por-slide`.

### `lecciones-fuentes-udem`

*Memoria de PC-Chris, última edición 2026-11-17.*

Las guías del curso de matemáticas de la UDEM, que Chris considera *«muy buenas referencias de las lecciones de algebra»* (2026-11-08):

- **Original:** `C:\Users\chris\OneDrive\EducaTalento\Asesorias Chris\Matemáticas\`
  - `OT24 - AM - Álgebra I-20240903T235319Z-001.zip`: guías 01–06 (números, fundamentos, radicales, división de polinomios, productos notables, factorización), con respuestas;
  - `PR24 - AM - Álgebra II-20240903T235235Z-001.zip`: guías 07–13 (expresiones racionales, ecuaciones de primer grado, desigualdades, sistemas, logaritmos, cuadráticas, cónicas);
  - además `PR24-AM-GEOMETRÍA ANALÍTICA-…zip` y la carpeta `Mate 3` (OT25).
  - En cada zip: `1. Guías/PDF/BC` en español y `MC` en inglés.
- **Copia de trabajo:** `projects/cantu-lessons/fuentes/udem/Algebra 1/` y `Algebra 2/`, con `MC/` y `Respuestas/`. `fuentes/` está en `.gitignore`, así que vive por aparato: el 8-nov ya no estaba en la PC y se rehízo de los zips con `System.IO.Compression.ZipFile` en PowerShell. `tar` muestra mal los acentos de los nombres.
- Son PDF de imagen: se leen página por página con Read, no con `pdftotext`.
- Lo que la cabina ya sacó de ellas: `docs/referencias/COMO-EXPLICAN-LAS-GUIAS-UDEM.md`.
- Desde ALG-03, el encargo de cada lección de álgebra cita la guía de su tema.

**16-nov: solo las de álgebra.** Las demás de la UDEM (carpeta «Mate 3», el zip «GEOMETRÍA ANALÍTICA», con contraseña) Chris las juzga de mala calidad: *«no las usemos de referencia»*. Para geometría, datos y funciones, ninguna referencia sin encontrarla y que él la apruebe antes (docs/referencias/FUENTES-EVALUADAS.md, 5b970764).

**16-nov, 19:39: las aprobadas para Geometría, Datos y Funciones.** Chris le dijo a la cabina *«Dime que referencias recomiendas dejar y usa eso»*. La cabina eligió 13, y quedaron en `docs/referencias/FUENTES-GEO-DATOS-FUNCIONES.md`, sección «Aprobadas» (bb6d7306), cada una con su papel. Son, entre otras, IM, Wu, Kiseliov, MathBits, Stat Trek, GAISE II, Paul's Notes y la SEP/DGB.
- **Fuera:** Math is Fun.
- **IXL:** sus términos prohíben que la abra un agente.
- **Las prohibidas para IA (§6.1)** las lee Chris. Entre ellas está la guía oficial de la PAA, que es la que más falta.
- **El patrón del 16-nov:** los lectores abrieron cuatro páginas antes de ver los términos. En cada encargo de fuentes, que revisen primero los términos y después el contenido.

Véase `lecciones-tres-variantes-por-seccion` y `cabina-lecciones-claude-code`.

### `nota-error-comun-es-naranja`

*Memoria de PC-Chris, última edición 2026-11-15.*

La nota «Error común» de la slide (clase `wrn`) es **la naranja**. En informes, DISEÑO y todo lo que llegue al operador se dice «la nota naranja» o «la nota Error común», **nunca «la nota roja»**.

**Why:** la cabina CL lo pidió el 15-nov (CR-SIS·29): la v127 del DISEÑO la llamó «nota roja» y confundió. Desde la v128 la nota de la slide también lleva el error en el título («Error común: sumar arriba y abajo»), 171 notas de álgebra.

**How to apply:** al escribir sobre esa nota, nómbrala por su título o su color real; el rojo es otra cosa (el tachado, los signos de la regla 10). Relacionado: `cabina-lecciones-claude-code`.

## Integrar y el tablero

### `lecciones-fusionar-bloques-json`

*Memoria de PC-Chris, última edición 2026-11-09.*

En cantu-lessons cada bloque HTML de `*.bloques.json` y `*.web.draft.json` es UN renglón JSON. Si dos carriles añaden reglas al final del mismo `<style>`, aunque sea en sitios distintos, git choca en todo el renglón. Pasó con la adenda de CR-GW·31 contra CR-LW·23 en ALG-04, 05 y 06 (2026-11-09).

**Cómo se resolvió:**
1. Fusión a tres partiendo cada `\n` escapado en su renglón: `ours` = HEAD, `base` = el padre del commit, `theirs` = el commit.
2. `git merge-file --diff3 -p`.
3. Los choques que quedan: si la base está vacía y un lado es prefijo del otro, se toma el más largo. El carril ya traía lo del otro hilo.
4. Se deshace la partición, se valida con `JSON.parse`, se escribe en CRLF y se hace `git add`.
5. Se comprueba contra el md5 LF del carril. Si difiere, se hace un diff por clave JSON: solo debe diferir `slideBlocks`, que es lo de main.

**Why:** a mano son 6 ficheros de 120–170 KB con un solo renglón por bloque. Elegir un lado entero pierde lo del otro hilo.

**How to apply:**
- Escribir el script con Write, no con heredoc del Bash: el heredoc dejó `\\n` en `\n` y la partición no hizo nada.
- En Node, `execFileSync('git', [...])`, no `execSync`: por cmd.exe el `^` de `commit^` se pierde y la base sale igual al commit. O usar `~1`.
- Un `cat > fichero` sin heredoc ni `</dev/null` cuelga el Bash hasta su tiempo límite.

Va con `cabina-lecciones-claude-code` y `computadora-sin-python`.

### `lecciones-integrar-a-mano-y-tablero-espera`

*Memoria de PC-Chris, última edición 2026-11-18.*

Aprendido el 18-nov (CR-EST·01/02, CR-FUN·01):

- **Rama juntada a mano** (choque en `BLOQUES-PROVISIONALES.md`, `codigos.json` o el DISEÑO): `integrar.mjs` vuelto a correr dice «nada que juntar» y **no compila ni publica** — o, si el parche cambió al resolver, vuelve a chocar. Entonces a mano: `build.mjs <borrador de codigos.json>` web y `--slide` (en serie), `publicar-paginas.mjs <códigos>` con `CANTU_REVISIONES_DIR`, commit por ruta de `lecciones` en cantu-revisiones, push de los dos y el renglón en `ramas-integradas.txt`.
- **Al resolver con «los dos lados»,** revisar duplicados: el segundo choque de `codigos.json` dejó FUN-01 dos veces y `build.mjs` tronó («código de antes de RW-…»).
- **Dos carriles con la misma v del DISEÑO:** el que entra después se renumera (cabecera, renglón y sus menciones en SISTEMA-SLIDE/WEB y `prueba-colores-bloque.mjs`).
- **Filas del registro fuera de la rama** (las pegaba para compilar y las restauraba): en main da 🔴 «etiqueta registrada». Pedir que vayan en la rama.
- **Tablero, tesela en «espera»:** `vista` tiene que ser una escena de lección (`EST-05-S3`); una `SIS-…` se descarta y la plataforma la da «sin encargo (lo declarado es de antes…)». El motivo va en `porque`.
- **Galería plegada sin nada que votar:** el generador deja el script de copiar/pegar sin su barra y la página truena (`querySelector` de null). Se publicó con una guarda (`_scratch/cabina-lecciones/guarda-copiar.mjs`); falta arreglar el generador.

Relacionado: `lecciones-fusionar-bloques-json`, `lecciones-cambios-pendientes-al-dia`.

### `lecciones-tablero-atendido-con-hora`

*Memoria de PC-Chris, última edición 2026-11-05.*

En `cantu-lessons/lecciones/tablero.json` → `comentarios`, cuando la cabina pasa un comentario a `"estado": "atendido"`, el campo `"el"` lleva la hora completa en ISO UTC (`"2026-11-05T00:04:44.000Z"`), no solo `"2026-11-04"`.

**Why:** CR-PL·17 reabre un atendido si el operador lo editó después. Con solo el día, `editadoDespues` de `servidor/portada.js` lo da por editado después si la edición es del mismo día o posterior («mejor reabrirlo de más»). El 2026-11-04, el comentario de L04·D8 lo editó a las 17:22 y la cabina lo atendió a las 18:04, apuntado con solo el día. Por eso la slide salía «Esperando variantes» en vez de «Por escribir».

**How to apply:**
- Al marcar atendido, pon en `el` la hora de ese momento (`new Date().toISOString()`) o la del commit que lo marca.
- Al probar una publicación, si una slide con comentario atendido sale «Esperando variantes», mira si el comentario tiene `editado` del mismo día que un `el` sin hora.

Véase `cabina-lecciones-claude-code` y `lecciones-vigilar-votos`.

### `lecciones-medir-tras-cambiar-tablero`

*Memoria de PC-Chris, última edición 2026-11-22.*

Cada vez que la cabina hace commit y push en `lecciones/tablero.json` (teselas en el taller, comentarios apuntados, atendidos), corre `node tools/cabina/cierre.mjs` en el mismo paso. Así `estado/cabina.json` queda al día. Si hay una compilación en marcha, se corre al terminarla.

**Why:** el 22-nov, a las 15:28, el «Reiniciar» de la Laptop-MC dio «NO CUADRA»: la cabina había cambiado el tablero tres veces después de su medida del día anterior. El operador se preocupó por la sincronización («Es muy facil que se desincronize…»). Se le propuso esto como «la parte de la cabina». La de la laptop es CR-PL·85, que sube y trae sola.

**How to apply:**
- Lo mismo vale para apuntar comentarios y para las teselas de una entrega.
- Comprueba el JSON **antes** de escribirlo. El 22-nov se empujó un `tablero.json` roto (2fcc8e78): el renglón anterior iba sin coma, y los renglones van en CRLF.

Relacionado: `lecciones-cambios-pendientes-al-dia`, `lecciones-tres-aparatos`.

### `lecciones-8791-codigo-viejo`

*Memoria de PC-Chris, última edición 2026-11-12.*

El 8791 guarda en memoria el `portada.js` que leyó al arrancar, y la cabina junta el código de CR-PL en ese mismo checkout de la PC.

Pasó dos veces:
- 9-nov: ALG-01·D7, que llevó a CR-PL·50 (aviso suave y reinicio con «Sincronizar»);
- 11-nov, 02:2x: con el código de antes de CR-PL·65, ARI-12·D4 salió «sin encargo» en rojo y ARI-11·D11 salió ⏳ «esperando variantes, sin encargo».

**CR-PL·66** se integró el 11-nov, 03:3x (cantu-revisiones cf97280):
- la página mira `/api/codigo` al abrir, al volver a la pestaña y cada 45 s;
- si la galería la arrancó el botón, la reinicia sola sin perder lo escrito;
- si no puede, aviso fijo, y los conteos en gris con «código de antes».
- Hizo falta un «Sincronizar» en la PC y en cada laptop para cargarlo; desde ahí, solo.

`pendientes.mjs` no ve lo que enseña un servidor viejo, porque arranca uno nuevo cada vez. Para reproducirlo: `REV_DIR=<copia con el portada.js viejo>` y otro puerto.

**Why:** el operador perdió la confianza en la alarma («no es la primera vez… y no sé por qué»).

**How to apply:**
- Si el operador ve algo que `pendientes.mjs` no ve, sospechar primero de su servidor con código viejo.
- Si un día falla el reinicio solo (aviso fijo), decirle «Sincronizar».
- **12-nov, 17:29, en la laptop:** aun después de CR-PL·66, con «Sincronizar» siguió viendo «sin encargo» en ALG-01 y ALG-06 slide y muchos 🚧 de álgebra, con `pendientes.mjs` en 0. Se arregló al cerrar la ventana negra y abrir otra vez `abrir-galeria.cmd`. Ese es el primer paso: cerrar y reabrir la galería; las fotos y `git -C cantu-lessons` solo si sigue saliendo.

Relacionado: `lecciones-cambios-pendientes-al-dia`.

### `lecciones-laptop-boton-viejo`

*Memoria de PC-Chris, última edición 2026-11-03.*

La laptop (`LAPTOP-PF6SOUAS`) se quedó en `cantu-revisiones` `5d4680e` (2026-11-02, 02:00), con el botón de antes de CR-PL·02. El botón nuevo junta solo los votos de dos aparatos con `servidor/juntar.mjs`. El viejo se para antes de traer nada, así que el arreglo nunca le llega. Le pasó al operador el 2026-11-02 y otra vez el 2026-11-03.

**Why:** el operador vota en los dos aparatos. Si la PC publica votos de una galería en la que la laptop tiene votos sin publicar, el `git pull --ff-only` no puede escribir encima.

**How to apply:**
- Si el mensaje del botón trae «El botón no los junta (nunca hace merge ni stash)», es el botón viejo. El botón nuevo, en ese caso, junta los votos.
- La salida a mano, en la laptop, una sola vez:
  1. copiar los `respuestas.*` que chocan en `AIW_Workspace\_scratch\votos-laptop-<fecha>\<galería>\`;
  2. `git checkout --` de esos ficheros;
  3. `git pull --ff-only`;
  4. `node servidor\juntar.mjs <esa carpeta>`;
  5. el doble clic, que publica lo juntado.
- Los votos de la laptop no los ve el vigilante de la PC: léelos del remoto cuando la laptop publique.
- Al escribir rutas de Windows con `node -e` desde Git Bash, las barras se comen letras (`\v`, `\r`). Escríbelas con un `.mjs` hecho con Write y `String.fromCharCode(92)`.

Véase `cabina-lecciones-claude-code` y `lecciones-vigilar-votos`.

### `modo-seco-comprobar-antes`

*Memoria de PC-Chris, última edición 2026-11-17.*

En CR-FIG·04 (2026-11-17) puse un modo «seco» con `sed -i` en un script que edita el worktree; el `sed` no casó la línea (las barras y comillas) y el script **escribió de verdad** mientras el `--todas` de antes compilaba en ese worktree. Lo revertí con `git checkout -- <mis ficheros>` en menos de un minuto, pero las piezas de esa ventana quedaron por recompilar.

**Why:** un `sed` que no casa no da error, y el build lee `tools/revision` en cada pieza.

**How to apply:** los scripts que escriben en un worktree llevan el destino por variable obligatoria (sin valor por omisión) y el modo seco escrito con Edit, no con sed; antes de correrlo, `grep` que el modo seco está. Nunca se aplica nada en un worktree con un build corriendo: los cambios van a un segundo worktree. Va con `heredoc-come-barras`.

## Galerías

### `galeria-no-escribir-en-la-pc`

*Memoria de PC-Chris, última edición 2026-11-03.*

Desde el 2026-11-03 (CR-GS·06), la cabina de LECCIONES pidió: **no escribir las tandas en `projects/cantu-revisiones/galerias/<galería>/` de la PC**. Cada tanda se queda en la copia de prueba (con `galeria.html` completo e `img/`), y el aviso a la cabina lleva la ruta absoluta de la copia y el md5 del `galeria.html`. La cabina publica desde ahí.

**Why:** al publicar, la cabina deja la galería de la PC como en git para que «Traer lo nuevo» del operador no choque (el botón se para si un fichero cambió en la PC y en el remoto). Si el carril escribe ahí mientras ella limpia, o después, el operador se queda con un choque o con fotos rotas.

**How to apply:**
- Genera con la variable de destino del generador (`RW61_DEST`, `RW59_DEST`, `RW68_DEST`) apuntando a la copia de prueba.
- Prueba sobre la copia.
- Avisa con la ruta y el md5, y di que no publique los `respuestas.*` de la copia: son copias viejas.

Para comparar, usa `git show origin/main:…`, porque el checkout principal suele ir atrás. Ver `probar-galerias-locales`.

### `galeria-una-vista-por-slide`

*Memoria de PC-Chris, última edición 2026-11-10.*

El operador, en la ronda 1 de RW-59 (2026-10-29): «no quiero repetir slide / si una slide tiene muchas variantes nimodo en esa pagina veo todas las variantes de esa slide / asi vamos palomeando y filtrando slides». Antes ya había pedido el formato de RW-53 tal cual («este formato me confunde»): una imagen por opción, la slide entera, 3 por fila.

**Why:** vota slide por slide y filtra; una decisión de sistema repartida en vistas por escena le hace ver la misma slide varias veces.

**How to apply:**
- Una vista por slide; el generador debe negarse a repetir una slide o un número de opción.
- Una decisión de sistema sin decidir va como opciones dentro de la vista de cada slide; ya decidida, se aplica en las fotos y se resume en un recuadro de la portada.
- En una ronda nueva: las claves de cada slide se conservan, las opciones nuevas llevan números nuevos (sello «ronda N»), lo marcado ✗ va plegado en «Las que dejé fuera por lo que dijiste», sus comentarios en «Lo que dijiste de esta slide» y los votos de vistas que desaparecen entran como `semilla`. Nunca se escribe `respuestas.json`; el mapeo de claves va en el informe.
- `proto.mjs` borra las fotos de su código: guardar antes en `fotos/<código>-r1/` las que la galería seguirá citando.
- (RW-59 ronda 3) Con la ronda votada entera, se aprueba **por escena**: ✓ sin comentario que pida algo = se escribe ya en el borrador (respaldo antes, ensayo en seco, verificar que solo cambió `slideBlocks`); la ronda siguiente lleva solo lo pendiente, con la opción que votó para comparar. Los prototipos de esa ronda parten del borrador ya escrito.
- (RW-59 ronda 4) Antes de escribir lo aprobado, comparar byte a byte cada escena con la copia de prototipo que se fotografió (`proto/<L>/`): lo escrito debe ser lo que vio. Las fotos nuevas de cada ronda van en su carpeta propia (`fotos/<código>-rN/`): el nombre de la imagen en la galería sale de la ruta, y con el mismo nombre el navegador puede mostrar la vieja. Un comentario que no tocó sigue en su clave de una ronda a otra: comparar con la copia anterior y citarlo una vez.
- (RW-59 traspaso, 2026-11-01) La plataforma toma las fotos y las decisiones de las versiones de la galería que hay en git: dos rondas publicadas en un solo commit pierden la de en medio (L08·D2 quedó «tu ✓, sin foto»). Publicar cada ronda antes de armar la siguiente. Desde RW-75, al escribir una opción se apunta con `tools/revision/escrita.mjs` (si no, la slide no pasa a «por revisar»); desde el 2026-11-01 las galerías siguen en carriles (`docs/carriles/CARRILES.md`: CR-GS la galería de slide, CR-LS los borradores).
- (CR-GW·25, 2026-11-08) Vale igual en las galerías web y en el «antes y después». CR-GW metió la 195 en una vista aparte, `v-ALG-04-S1-195`, junto a la `v-ALG-04-S1` de la 188. La plataforma no la juntó con la sección: la tesela quedó en «Esperando variantes» y el voto habría ido a otra clave. La cabina la publicó sin ver los `data-s`.
  - Al encargar una ronda sobre una sección que ya tiene vista, decir «dentro de la misma vista».
  - `publicar-galeria.mjs` ya se niega a publicar una vista nueva cuyo id sea el de otra más un sufijo.
- (CR-SIS·02, 2026-11-09) **Vale también en REGLAS-SLIDE y REGLAS-WEB.** La ronda sobre un ~ de una regla va dentro de su misma `REGLA-…`, con números nuevos y la ronda anterior plegada. La cabina encargó `REGLA-TIPOGRAFIA-RENGLON-HUECO` como clave nueva, y el publicador la rechazó. Una clave nueva solo cuando es otra regla: el gris de la 167 fue `REGLA-SLIDE-ENFASIS-GRIS`, porque la 167 ya estaba cerrada con su ✓.

Relacionado: `probar-galerias-locales`, `cabina-lecciones-claude-code`.

### `galeria-web-por-seccion`

*Memoria de PC-Chris, última edición 2026-11-01.*

RW-64 (2026-10-29) llevó el método de galería de slides a la web de las 29 lecciones: una vista por sección **solo donde
hay algo que decidir** (39 de ~160), «sin cambio» con liga a la web en la portada, `pieza: 'web'` en el catálogo.
Generador, sondas y módulos de opciones en `_scratch\RW-64\trabajo\` (`foto-web.mjs`, `proto.mjs`, `comun.mjs`).

**Why:** el operador quiere pocas rondas en la web; lo que inflaba la galería era una regla ya decidida y no barrida
(29 v61, la cadena con la partida sola arriba: 21 secciones).

**How to apply:**
- Foto = la sección del título (con su franja) al título siguiente, a 1366 px, ancho de la hoja; >2 400 px, en dos.
  Lo plegado o el paso a paso que cambia se abre antes (FOTO_ANTES). «Hoy» de la web compilada si su sha256 es el del borrador.
- Un censo de regla visual (zigzag, cursiva) no basta con buscar texto: las cadenas dibujadas (SVG, rejillas HTML,
  KaTeX con `&amp;`) se escapan. Buscar y luego mirar la foto de cada candidata. La primera pasada de RW-64 lo pagó.
- Studio: la «Tabla» rechaza `\hphantom`/`\mathrlap` (sus «=» no se alinean sin Bloque HTML); la «Tarjeta» rechaza `<i>`
  (solo b, strong, br, div). Los «%» de los borradores llevan espacio duro: comparar textos sin normalizarlo falla.
- Una sola decisión de aprobar (sin alternativa honesta) va como vista de una opción, «Hoy».
- (2026-10-30, molde nuevo) Votos «✓ Se queda» (una sola por sección; otra la pasa a ~) · «~ Referencia» · «✗ Fuera».
  Cada descripción, dos o tres renglones: qué cambia respecto a «Hoy», por qué, en qué fijarse; las medidas, plegadas.
  Nada de instrucciones de voto ni explicación del taller a la vista. La galería web es el guion web de la lección.
- (2026-10-30, RW-66) Las lecciones van L01–L29 sin «B»; tabla en `docs/referencias/NUMERACION-DE-LECCIONES.md`.
  `lib.mjs` lee los códigos en vivo de las carpetas de `lecciones/`; `fotos/`, `proto/` y `vistas/` usan el código como
  nombre de carpeta. Tras el renombrado de RW-66, no correr nada hasta migrar esos nombres; si se corre antes, mezcla
  lecciones sin dar error. Migrado el mismo día con `renumerar.mjs --traducir` (respaldo en `_backups\RW-64\antes-RW-66\`).
  La herramienta no toca las copias `.web.draft.json` y deja `.antes-RW-66` junto a cada fichero.
  Para comparar con la galería publicada, normalizar los finales de línea antes: mi generador mezcla CRLF y LF, y la de
  cantu-revisiones sale toda en CRLF (`* text=auto`).
  Las fotos llevan pintada la insignia con el código de su fecha: se repintan en la ronda siguiente.
- (2026-10-31, ronda 2) Votos pegados en el chat (sin `respuestas.json`): van como `semilla` + `semCom`, las ✗ con `fuera`,
  las escritas con `aprobada`. La opción nueva usa un número que en su lección quizá ya tiene otra sección: armarla sola
  (`proto.mjs L02 3 --secs S1 --vivo` → `o3-S1`) para no pisar fotos ni informes votados. `escribir.mjs` aplica la op
  al borrador vivo y compara cada sección con su prototipo antes de escribir. `compilar()` espera a que no corra otro
  `build.mjs` (RW-59 y RW-73 compilan a la vez). La migración traduce también el texto que una op escribe en el borrador
  (comentarios HTML con un código): es lo correcto para lo que se escriba después de RW-66.
- (2026-11-01, ronda 2 votada) Al fotografiar la web real para comparar con el prototipo, pasar el `FOTO_ANTES` de
  `vistas/<L>.mjs` (`ANTES`): sin él, L04·S1 midió 381 px menos («Para saber más» cerrado). Cada escritura, con su
  `--respaldo <carpeta>` propio. Una foto no idéntica con las mismas alturas suele ser el corrimiento subpíxel de lo de
  arriba: `capas.mjs` mide las cajas desde el título de la sección y lo prueba. Esta vez la cabina pidió commit por
  ruta, sin push (antes: «no toques git»): seguir lo que diga cada turno.

Relacionado: `galeria-una-vista-por-slide`, `probar-galerias-locales`, `computadora-sin-python`.

### `galeria-foto-que-cambia-nombre-nuevo`

*Memoria de PC-Chris, última edición 2026-11-16.*

`publicar-galeria` (cantu-revisiones) no sobrescribe una foto de `img/` que ya existe con ese nombre. Si una entrega cambia una foto (p. ej. la unidad en ESCALA 3 y SOMBREADA 3, CR-FIG·03), hay que darle **un nombre nuevo** y apuntar la vista a ese nombre.

**Why:** en CR-FIG·03 (2026-11-16) la cabina tuvo que copiar a mano las 6 fotos cambiadas (f101fb61) y pidió que no se repita.

**How to apply:** al corregir una vista ya publicada, nombrar distinto las fotos que cambian (sufijo de ronda o de encargo), y decir en el informe qué fotos son nuevas. Va con `galeria-una-vista-por-slide` y `galeria-no-escribir-en-la-pc`.

### `probar-galerias-locales`

*Memoria de PC-Chris, última edición 2026-10-31.*

Medido en RW-54 (2026-10-29), al probar `cantu-revisiones/servidor/servidor-galeria.mjs`:

- `docs/moldes/RW-53/galeria.html` + `galeria/` **no trae `proto/`** (las 54 PNG; RW-53 pesaba 176 MB). Para ver la galería con imágenes, copia las PNG citadas desde `_scratch/RW-53/proto/` (6,2 MB) a la carpeta de prueba.
- En esta PC, Windows reserva los puertos **49705–50944** (`netsh int ipv4 show excludedportrange protocol=tcp`): `listen` da EACCES. Otro programa en `0.0.0.0:P` **no** impide tomar `127.0.0.1:P`.
- Lanzar servidores como hijos de un script de Node (`spawn`) y pararlos por su handle cumple TALLER-COMUN §5 sin buscar PIDs. Si se lanza con Bash en segundo plano, el PID sale de `Get-NetTCPConnection -LocalPort P -State Listen`; comprobar su `CommandLine` antes de `Stop-Process` (la tarea de Git Bash reporta luego «exit 127»: no es un fallo).
- El navegador de la app abre `http://127.0.0.1:P/` y registra los POST de `fetch`, pero no el `sendBeacon` de `pagehide`.
- (RW-59, ronda 2) Al medir con puppeteer, **no esperar el `onload` de imágenes `loading="lazy"` dentro de un `<details>` plegado** («Las que dejé fuera»): nunca cargan y la prueba muere por `ProtocolError` (timeout). Filtrar `!img.closest('details:not([open])')` y probar esas aparte poniéndoles `loading='eager'`.
- (RW-59) Una galería que el operador puede estar usando se arma primero en `_scratch/<ticket>/galeria-rN/`, se prueba allí y se escribe al final; antes y después, `md5sum` de `respuestas.json`/`.log` para mostrar que no se tocaron.
- (RW-63) Desde la portada, `node servidor/servidor-galeria.mjs` **sin argumentos arranca en el 8791** (el del operador). Los bancos de RW-54 y RW-56 apuntan al checkout principal y escriben en su propio `_scratch`: para reusarlos, copiarlos y adaptarlos como `_scratch/RW-63/adaptar-rw54.cjs` y `pruebas-boton.mjs`. En Git Bash, un argumento que empieza por `/` (`/galerias/RW-61/`) se vuelve ruta de Windows: `MSYS_NO_PATHCONV=1`. Los `respuestas.*` copiados al worktree salen como `??`: borrarlos antes de entregar con el árbol limpio.
- (RW-61, migración de RW-66) Para comprobar que un generador da **exactamente** la `galeria.html` publicada, comparar con CRLF → LF: el blob de git va en LF, la del disco sale en CRLF (autocrlf) y la del generador es mixta (el CRLF del molde). Las tres dieron el mismo md5 con LF y distinto tal cual. Comparar además el catálogo `var CAT`, los ids y `img/` byte a byte.
- (RW-68) **En la plataforma (RW-65)** la pestaña se abre con `#L12/guion-slide` y una vista con `#L12-D2`; lo que se mide tiene que salir de la `.vista` que no está `hidden`. La prueba de RW-61 (`probar-plataforma.mjs`) leía `document.querySelector('.op .desc')`, que es la primera vista de toda la página, y daba por buena otra galería.

**Why:** sin esto, la prueba en el navegador muestra imágenes rotas que parecen culpa del servidor, y un puerto «ocupado» puede ser reservado.

**How to apply:** en cualquier ticket que pruebe una galería (`talleres-en-ola-paralela` para los puertos compartidos con otros talleres).

## Slides

### `riel-slide-medir-calculado`

*Memoria de PC-Chris, última edición 2026-10-30.*

RW-55 (2026-10-29): la cabina dijo que D3/D4/D5 de L02 llevaban el riel `.17em solid #5E81AC` porque la regla `.pan.riel` está en su CSS. Pero ningún elemento usa la clase `riel`: pintan la raya arriba. El riel real lo llevan D6 (.95em hasta la tinta), D8 (1.1em) y D10 (1.3em). Además, las cifras de encogido de RW-47 (versión 2) ya no valían tras RW-53.

**Why:** los bloques de L02 copian un CSS común con variantes que no se usan, así que buscar en el texto cuenta reglas muertas.
**How to apply:**
- Para saber qué pinta una escena, mide `getComputedStyle` en el mazo compilado con el navegador sin red de `tools/revision/lib/navegador.mjs` + `tools/render/lib/offline.mjs`, y `JAME_CORE.goTo(k)`.
- Respalda también `lecciones/index.html` antes de compilar, porque `build.mjs` reescribe la portada.
- El borrador va en CRLF: para serializarlo, `JSON.stringify(x,null,2)+'\n'` y luego cambia `\n` por `\r\n`.
- (RW-60) Un inventario de bordes de las slides ya existe como sonda: `_scratch/RW-60/trabajo/bordes.mjs`. Da el borde
  calculado de cada elemento y de sus `::before`/`::after`, la regla que lo pone y de dónde sale su variable (`--riel`,
  `--a`). Los pares frío y cálido van por variable en línea (L03·D2) o por una regla `+ .hoja` de la escena.
- (RW-60) Un prototipo de slide con un hex que no está en la paleta activa sale rojo en `colores` y `html-slide` (el hex
  sin anotar en el comentario), además de `registro` en toda copia `L0xP`. Es lo esperado: se declara y se comprueba que no
  falla nada más. Para aplicar un color nuevo de verdad, entra antes a `metadata/color-palettes/slide/`.
- Ver `aiw-workspace-conventions` y `computadora-sin-python`.

### `pm-katex-pegado`

*Memoria de PC-Chris, última edición 2026-10-29.*

RW-58 (2026-10-29): el operador dijo que el ± de L02·D5 se veía «amontonado/pegado». La primera ronda le sumó aire a los lados (`\mathbin{\mkern2mu\pm\mkern2mu}`) y él siguió viéndolo pegado. Lo que señalaba era el glifo: en KaTeX_Main (Computer Modern), el palo vertical del + toca la raya de abajo. Aprobó («Así queda bien») esta forma: `\mathbin{\mkern2mu\rlap{\raisebox{.093em}{\small $+$}}\raisebox{-.325em}{\small $-$}\mkern2mu}`, que deja 7 px de hueco, va centrada en el eje y queda con el aire del ×.

**Why:** la slide corre KaTeX sin `trust`, así que `\htmlClass` no funciona, y el CSS no distingue el `.mbin` del ± del ×. Solo queda armarlo en TeX.
**How to apply:**
- Ante una queja visual sobre un glifo, pedir o mirar el recorte y medir el perfil de tinta del propio glifo, no solo el aire a sus lados.
- Para otro ± de slide, copiar el TeX de L02·D5. En MathJax (la web) no está probado.
- Las variantes y sondas están en `_scratch\RW-58\pm\` y en `docs/informes/RW-58.md`.
- Ver `riel-slide-medir-calculado`.

### `censo-slide-medir-lo-pintado`

*Memoria de PC-Chris, última edición 2026-11-06.*

Al medir letra y aire de las slides (13/censo.mjs), cada atajo dio casos falsos que llegaron a un aviso a la cabina y tuve que corregir:

- **La caja de `.katex`** mide un renglón aunque la cuenta tenga cuatro (L12·D2 salía «pegado arriba»). Medir la unión de lo que pinta, solo en `.katex-html`.
- **La copia MathML** (`.katex-mathml`) tiene cajas fuera de lugar (L11·D5 al 155 %).
- **Un SVG** se mide por sus formas, no por su caja: el viewBox esconde el aire (L07·D6).
- **Las barras hechas con cajas** pintadas son tinta (L17·D2).
- **Las cuentas en HTML con la letra de KaTeX** son fórmula, no texto (L23).
- **La negrita dentro de un renglón normal** es énfasis, no título (L20·D6).
- **El salto entre slides** se mide por el máximo del papel, no por la mediana (L29·D12, L07·D8).
- **CR-GS·14, otras cuatro:**
  - El aire de una tarjeta se mide bajo su título, no desde él. Con el título contado, 15 de las 28 tarjetas «arriba» salían por error.
  - Dos tarjetas lado a lado se miden juntas.
  - Un texto a 29,3 px es pie, no cuerpo: no cuenta como salto.
  - Un título con su subtítulo dentro, en un bloque aparte, se mide por su texto propio (L16·D5).

**Why:** el primer informe dio por defectos casos que en la foto estaban bien, y la cabina eligió casos para la vista con base en ellos.

**How to apply:**
- Antes de avisar, cotejar cada caso extremo con su foto (`13/hoy/Lnn/molde-Dnn.png`).
- Una galería CR-GS lleva una imagen por opción: para una vista de sistema, apilar las hojas (`13/apilar.mjs`).
- Ver también `cr-gs-reglas-mazo-y-numeros`.

### `norma-slide-nota-con-cuenta`

*Memoria de PC-Chris, última edición 2026-11-06.*

Al aplicar la norma de letra de la slide (CR-GS·14), bajar una nota o una pregunta a 29,3 px rompió la guarda de letra de `build.mjs` en siete lecciones: el exponente de su KaTeX baja a 24,8 px. Las notas a 33,1 px (la G6 con `c0940`) ya estaban así a propósito. Otras dos trampas del mismo día:
- Una regla por familia y clase (`.pn5 .k`, `.cu5 .k`) también agranda la variante en versales de la misma clase (`.riel > .k` es rótulo). Hay que nombrar la variante (`&.a2 .k`).
- Subir una frase al cuerpo puede encoger el dibujo de al lado, y su rótulo SVG baja de 28 px (L21·D2).

**Why:** el censo no mide el texto dentro del SVG ni los exponentes como texto; solo la guarda de `build.mjs` lo vio, después de compilar 29 copias.

**How to apply:**
- Tras compilar, leer en cada log el «semáforo» y comparar sus fallas de `letra` con las del borrador de hoy. El registro en rojo es normal en las copias H.
- Ninguna regla baja de 33,1 px una nota o una pregunta que lleve cuenta.
- Si una pieza cambia los pasos de un procedimiento (L21·D7, la 6), se entrega con ella el `.slide.variantes.json`: `notasDelEjemplo` con la razón de cada nota y las `filas` de la estructura nueva. Si no, «notas» sale en rojo. La cabina lo pidió el 6-nov.
- Ver también `censo-slide-medir-lo-pintado` y `cr-gs-reglas-mazo-y-numeros`.

### `cr-gs-reglas-mazo-y-numeros`

*Memoria de PC-Chris, última edición 2026-11-05.*

Aprendido en CR-GS·12, cuarta adenda (2026-11-04):

- **Una regla CSS de sistema** aplicada a muchas slides lleva una clase propia de sus valores, no una clase común. La hoja de
  cada bloque vale para todo el mazo, así que con una clase común manda la última regla. Con `.n12` común, L22·D2 tomaba el
  tamaño de D3 y D4.
- **`_scratch/CR-GS/12/numeros.json` no se rehace** después de publicar una tanda: las vistas de la tanda toman de él su
  número de base. El que vale es `numeros.antes-e.json` más `reservados.json`.
- **Bajar texto a 29 px** con un exponente, una fracción en línea o una prima dentro deja esos signos a 0,847 del texto (24,8
  px). En esas notas, el texto baja solo a 33,1 px.
- **Antes de avisar** una entrega de sistema, compilarla (`S12.mjs`) y medirla (`12/notas-px.mjs`). Las cuatro cosas de arriba
  solo salieron al compilar.

**Why:** cada una costó una entrega corregida o una vista renumerada.
**How to apply:** en cualquier cambio de sistema de CR-GS sobre bloques HTML de slide. Ver `galeria-una-vista-por-slide` y
`probar-galerias-locales`.

### `cr-ls-apuntes-de-sistema`

*Memoria de PC-Chris, última edición 2026-11-06.*

En `escrita.mjs`, una decisión de sistema (la nota a la G6, la «Respuesta» a 1.833rem…) se apunta con **su propio código** (p. ej. `CR-GS12`, nunca `CR-GS`, que es el de la galería) y `--en <slides>`: `node tools/revision/escrita.mjs L29 slide CR-GS12 V1 --en D10 --nombre "…"`. Nunca `escrita.mjs L29 D10 CR-GS Vn --nombre …`: eso reemplaza el apunte por slide de la vista de esa slide.

**Why:** en CR-LS·12 apunté así 24 notas y pisé el apunte de RW-61 (una vista que cubre L29·D8–D17): la plataforma dio 10 «cambios pendientes» falsos y el operador lo vio (CR-LS·13, 6-nov). El arreglo fue `37ff100`.

**How to apply:** antes de apuntar, mirar qué hay en esa clave; la plataforma (`cantu-revisiones/servidor/portada.js`, `apuntada`/`sistemaEn`) da una vista por escrita si cada código de la vista tiene `{de: galería, op}` o un sistema con ese código en su `en`. El «en» va en la escena donde se ve el cambio (L06·D18, no D16). **CARRILES v2 (6-nov 15:54, ahorro y velocidad):** un solo mensaje a la cabina por tanda, al cerrarla (commits, lo medido, qué publicar), salvo decisión o fallo; antes de escribir algo de un voto, releer el `respuestas.json` de la galería (los votos cambian sobre la marcha); al pasar del 60 % de contexto, relevo al final de la bitácora; CR-LS va en Sonnet tras la tanda C de CR-GS·14 (Opus si hay juicio de diseño). En la corrida, vigilar solo fallos, no cada commit.

**`--reemplazar` (la cabina, 2026-11-06 15:08):** si `escrita.mjs` se niega porque la slide guarda otro apunte de **la misma vista** (clave heredada, p. ej. RW-59 → CR-GS en L05·D5, L07·D2/D6) y lo que apunto es la decisión vigente de su galería, uso `--reemplazar` sin preguntar y lo digo en el informe. Pregunto solo si son dos vistas distintas sobre la slide (L11·D9: paso a paso RW-61 y color CR-GS) o si no sé cuál es la vigente. Comprobar en una copia propia de la plataforma en otro puerto (8795; el 8791 es del operador) con `_scratch/CR-LS/pendientes13.mjs`. Relacionado: `galeria-una-vista-por-slide`.

### `slide-letra-nunca-fijar-lo-encogido`

*Memoria de PC-Chris, última edición 2026-11-11.*

Al reacomodar una slide que el motor encogía (fitEngine, `data-geometry-fit` < 1), no se fija la letra en rem al tamaño encogido de «hoy». Eso es encogerla a mano: la guarda `letra-tarjeta` (CR-SIS·08) no lo ve, y la regla del operador de la 317 (10-nov: «nunca se encoge») lo prohíbe. Pasó con la 9 de ARI-19·D3 (CR-RS·07); hubo que retirarla antes del voto y hacer la 10 (CR-RS·08).

**Why:** la letra «igual que hoy» de un encargo no vale si hoy ya está encogida; la referencia es el nivel de la norma (29,3 · 35,2 · 42,2 · 50,7; las fórmulas 38,7 · 46,5 · 55,8).

**How to apply:**
- Medir con la guarda letra-tarjeta y con la letra que el motor escribe en línea en cada pieza.
- Si no cabe a su tamaño, primero menos relleno (probarlo sin compilar, inyectando CSS) y después reacomodar en una sola opción a voto.
- Un tamaño escrito que se calibró con la escena ya encogida puede quedar fuera de nivel al dejar de encoger (ARI-26·D4: 63,3 px): llevarlo a su nivel.
- Si el tope de 3 niveles choca con la letra a su nivel, decirlo en la galería.

Ver `norma-slide-nota-con-cuenta`.

### `aprovechar-css-por-slide`

*Memoria de PC-Chris, última edición 2026-11-18.*

En las slides de Geometría con la 1 (aprovechar-0x.mjs de CR-G2·03), tres trampas que costaron rondas en CR-G3·04 (17-nov):

- **El `<style>` de cada Bloque HTML vale en todo el mazo** (no hay shadow DOM ni iframe): una regla «para una slide» sin acotar cambia todas las de la lección. Acotarla con un atributo propio en su `.a15` (`[data-ap-css="<tag>"]`).
- **La `CAJA` del fichero común** solo reconoce `<div class="a15 gfs…"( data-ap-k="…")?>`: con otro atributo detrás, la slide se queda sin `ap1` **en silencio** (y `mide` no la marca: sin ap1 no mide holgura). El atributo extra va después de `conAprovechar`, con una guarda que falle si no hay `ap1`.
- **Por qué encoge:** el ajuste del mazo mide el déficit de la celda a la letra natural (scrollHeight − clientHeight > 1 px). Medir la holgura solo quitando el font-size de `.a15` engaña; hay que cargar el mazo con el ajuste apagado (`window.CANTU_GEOMETRY_FIT = true` antes de cargar, como el `mide` de la 05).
- En la forma B (`.pn.uno`) las columnas van en `fr`: bajar la k no da holgura a «Los datos»; la da ensanchar su columna (1,2fr).

**Why:** la ronda 6 perdió la 1 en 20 slides por el atributo, y el CSS de una slide se coló a toda la lección.
**How to apply:** en cualquier carril que añada CSS o atributos por slide sobre el fichero común. Ver `lecciones-flujo-v11`.

### `lecciones-guardas-tabla-y-kern`

*Memoria de PC-Chris, última edición 2026-11-14.*

Dos guardas del validador de lecciones que no se adivinan (CR-A11·01, 14-nov-2026):

- **Una `<table>` dentro de un Bloque HTML** pide una regla CSS cuyo selector **termine en `table`** con `font-size:inherit`
  (`revision.mjs`: `(^|[\s>+~])table$`). `.tv{font-size:inherit}` no basta: va `.jv-losa table{font-size:inherit}`. Sin una letra
  propia en la tabla: KaTeX a su tamaño (la norma 94 topa la cuenta de la losa en 24,3 px).
- **La partida de una cadena con `\mathrel{\phantom{=}}`:** `formaCuenta.mjs` cuenta el SVG de `\cancel` como tinta de la columna.
  Solo cuando un renglón de abajo **empieza** con `\dfrac{\cancel…`, la partida necesita `\kern-0.2em`. En los demás casos, el kern
  la deja 4 o 5 px fuera. Se mide antes de recompilar con un `forma.mjs` (la guarda con depurar) sobre la web ya compilada.

**Why:** cada intento fallido es una compilación de 5 a 30 min en la cola de la PC. En CR-A11 se gastaron unas seis.

**How to apply:** en cualquier carril de álgebra con tablas en Bloques HTML o con fracciones tachadas. Ver `probar-galerias-locales`
y `lecciones-ahorro-tokens`.

## Estado que guardaba la memoria (fotografía; lo vigente está en el relevo)

### `lecciones-cr-lx2-segunda-pasada`

*Memoria de PC-Chris, última edición 2026-11-21.*

El 20-nov a las 15:05 Chris eligió la A («vamos con tu recomendacion»): reintentar los cambios del pulido CR-LX·14–25 que rompían una guarda y volvieron a main, con otra redacción que sí pase. Encargo: `_scratch/CR-LX2/ENCARGO.md`. Ramas `cr-lx2-<nn>`; informes `docs/carriles/CR-LX2/<nn>.md`.

**Cerrado el 21-nov a las 00:39 (cierre.mjs ✔, todo al día):**
- **Segunda pasada:** seis ramas, todas integradas. Hechos 123 de 208, más 10 en parte.

  | rama | sha | hechos |
  |---|---|---|
  | cr-lx2-25 | `1c4baa5a` | 27/36 |
  | cr-lx2-19 | `782fadda` | 25 + 4 parte/36 |
  | cr-lx2-24 | `78c74050` | 11/17 |
  | cr-lx2-15 | `31258a46` | 19 + 6 parte/32 |
  | cr-lx2-17 | `4d776930` | 26/55 |
  | cr-lx2-18 | `74535d31` | 15/32 |

- **cr-lx2-26 `49602603`:** los 137 sin motivo, que resultaron 138. 8 hechos, 40 ya hechos antes y 90 «no» con su motivo: 60 no cabe, 16 decisión del operador, 6 ya decidido, 5 sistema y 3 de otra lección.
- **GEO-05:** el berenjena también en D13 (`d72c37d4`).
- **cr-lx-13-hoja (S7, KaTeX sin versalitas):** la hoja y `copiar-puente.mjs` se trajeron sobre main y se aplicaron a las 434 copias (`486283e1`). Build `--todas` de 217 webs en 29 min, 0 rojos; páginas en cantu-revisiones `0434f689`.
- **Dossier de 12 decisiones** (las 296 del operador): https://claude.ai/artifact/2PWF9bYnPFRnZ2jdFXqabo, fuente en `_scratch/CR-LX/dossier/` (con `mapa.json`). Espera sus votos («1A, 2B…»).

**Why:** Chris quería usar los tokens de la semana antes del 21-nov a las 00:00 sin desperdiciarlos (`pausa-al-88-semanal`).

**How to apply:**
- Lo que queda es actualizar `_scratch/CR-LX/lista-no-hecho.md` con los informes CR-LX2 (15, 17, 18, 19, 24, 25 y 26) y dársela.
- Cuando vote el dossier, aplicar cada decisión con `mapa.json`.
- Las grandes (1, 2, 4 y 5) son rondas de varias horas.

### `lecciones-cr-lx3-votos-dossier`

*Memoria de PC-Chris, última edición 2026-11-21.*

El 21-nov a las 02:01, Chris votó las 12 decisiones del dossier con las recomendaciones de la cabina: «vamos con tus reocmendaciones». La línea votada fue «1A, 2A, 3A, 4A, 5A, 6A sin carpetas, 7A, 8A, 9A, 10A, 11A, 12A».

- **Dónde está:** `projects/cantu-lessons/docs/carriles/CR-LX3/VOTOS.md` (commit `2b851bcf`), con `dossier-mapa.json` al lado. El encargo común es `_scratch/CR-LX3/ENCARGO.md`.
- **Primera ola**, lanzada a las ~02:10:
  - CR-LX3·01, decisiones 7 y 12 (generador de la slide): `local_6f0d1039-2259-4cc4-9ad6-61f70e44e742`;
  - CR-LX3·02, decisiones 1 y 10; es el único taller que toca la hoja común: `local_20dd9e3c-22b8-4a35-8043-13be4f9fc01f`;
  - CR-LX3·03, decisiones 9, 6 y 8: `local_46b2f541-8d87-4e7c-8cb7-951fd46a5f12`.
- **Primera ola integrada el 21-nov a las 09:44** (cierre ✔). Las tres ramas se juntaron a mano: un choque en GEO-44, resuelto con `_scratch/CR-LX3/fusiona.mjs`, que parte por `\n` escapado y por `>`. Después, build `--todas` de 434 piezas en 2 h 25 min, con 0 rojos.
  - cantu-lessons `1e47ff55` (DISEÑO v148), páginas en cantu-revisiones `831b59bb`, y las filas en R.
  - Integrar.mjs, que compila de una en una, no sirve con más de unas 20 lecciones.
- **La segunda ola** (la 3: 42 ids en 32 lecciones), lanzada con su sí: CR-LX3·04, `local_d2ffdd01-3dc9-42f1-aac5-0fecccac5d2a`. Desde un turno automático no se puede lanzar un taller: queda en tarjeta.
- **La ronda de la 3** (los 35 que cambian un ejemplo): CR-LX3·05, rama cr-lx3-05 `5a419145`, juntada por ff a mano (integrar.mjs las pasaría a «atendido») y publicada el 21-nov 20:32 como galería nueva «CR-LX3» (prefijo crlx3:, 33 vistas, 96 opciones, revisiones `fa6cc0ec`); 59 teselas en «espera». El cierre las cuenta 0 en «Esperando variantes»: es lo normal (solo cuenta lo ya votado).
- **Lo que sigue:** la 3, después la 2, la 4 y la 5 (con tres variantes en la galería, unas 150 vistas en varios días) y al final la 11.

**Why:** son decisiones de diseño suyas, ya votadas. Los talleres no escriben en DISEÑO: dejan el texto en su informe y la cabina lo pega al integrar, así no chocan entre ellos.

**How to apply:**
- Al entregar cada rama, probar el cherry-pick sobre main e integrar en fila. Puede haber choques en el mismo borrador entre ·02 y ·03 (ver `lecciones-fusionar-bloques-json`).
- Después, pegar los textos para DISEÑO con una versión nueva.
- Studio está en pausa: lo que solo se pueda hacer ahí, va como petición.

### `pausa-al-88-semanal`

*Memoria de PC-Chris, última edición 2026-11-21.*

El 20-nov-2026 a las ~00:40, Chris puso una pausa al 88 % del uso semanal: reservaba el 12 % para otro trabajo. Después la
movió a 86, 87, 90, 93 y 95.

- **15:00, cabina LANDING:** la quitó desde ese hilo: *«olvidate de ese bloqueo de porcentajes quita esa restriccion y ponte a
  trabajar en l oquet e pedi»*.
- **19:08, cabina LECCIONES:** lo subió a **97 %** para lanzar el taller de los 137 sin motivo: *«si lanzalo y sube»*.
- **15:33, cabina LECCIONES:** volvió a poner tope: *«déjalo en 96%… estoy administrando los tokens el día de hoy y voy a trabajar
  en otra cosa a la vez… mientras mas cerca la hora más te libero»*.

**Why:** reparte los tokens del día entre varios hilos y no quiere que se acaben antes de la renovación (21-nov 00:00, hora de
la PC). Prefiere que avance el trabajo, pero administrado.

**How to apply:**
- En LECCIONES, `get_usage` en cada vuelta. Al **97 %**, mandar «pausa» a los talleres: cada uno termina la lección, commit,
  relevo y para.
- Avisarle hacia el 96 %. Él sube el tope cuanto más cerca esté la hora.
- Las integraciones casi no gastan: siguen aunque haya pausa.
- Gastar sin desperdiciar sigue valiendo: ver `lecciones-ahorro-tokens`.
- Si vuelve a mover el tope, se reescribe este fichero.
