# Veredicto del piloto sobre `CLAUDE.md` v0 (cabina `cantu-studio`)

> Lo escribe la cabina del hilo `cantu-studio` el **2026-10-29**, al cerrar su primera sesión en Claude Code. Fue en la
> PC `DESKTOP-525K0IS`, de las 10:45 a las 10:55 más o menos, hora de la PC (UTC−6). **Studio sigue en pausa (D-079)**:
> la sesión solo midió el arranque, sin tickets ni cola. Responde a lo que pide la v0: «qué sirvió, qué faltó, qué
> estorbó». **Es un veredicto de la cabina, no del operador.** Los cambios de abajo se proponen para una v1, y se
> escriben cuando el operador lo diga.
>
> **Escritos el 2026-10-30 en la v1 del `CLAUDE.md`**, por palabra del operador: *«Sí, escribe la v1»*. La tabla del
> final de la v1 dice dónde quedó cada uno.

## En una línea

**El arranque funcionó tal como está escrito**: en orden, sin locks, sin pedir credenciales, y el canónico cuadró con
el relevo cifra por cifra. **Falló en lo mismo que el de `aiw-console`** (qué repos se miran) y en tres cosas propias:
no dice quién publica el commit que trajo el contrato, el paso 3 pide el validador cuando las herramientas no se tocan
en pausa, y el paso 4 no avisa de que la fecha de los ficheros de Lecciones no sirve. **Lo que más pesa del contrato no
se ejercitó**, porque el hilo está en pausa: la consola, un ticket, una QA y las herramientas en Windows.

**El push real es el del commit que trae este fichero**, y con él sale `1971b64`, el que trajo el `CLAUDE.md`. Si lo
estás leyendo en GitHub o en la otra computadora, entró.

## Lo que sirvió

| del `CLAUDE.md` | cómo se notó |
|---|---|
| **«La primera sesión», en orden** | los pasos 1 a 5 se hicieron tal como están escritos, de 10:45 a 10:48 |
| **«Si la línea de arriba no las cargó…, léelas enteras»** | la app abrió la sesión en `AIW_Workspace` y el `@../REGLAS-DE-CABINA.md` no cargó nada. El mensaje de arranque lo cubrió |
| **Las dos variables de git a la red** | `pull --ff-only`, `fetch`, `ls-remote` y `push --dry-run` respondieron en los dos repos sin ventanas ni preguntas |
| **Los dos md5 del canónico, medidos de antemano («La máquina»)** | árbol `de3a10ab…`, normalizado `b8b75d54…`, igual que el blob de HEAD. Como el contrato decía cuál era cuál, la comparación salió directa |
| **Las cifras del paso 3** | 277 runs, 267 / 10 (todos en O8) / 0, `history=267`, 0 errores: igual que el relevo |
| **El motor, nombrado en «Dónde vive todo»** | se confirmó midiendo: el canónico usa `lane` (12 runs) y el motor de `aiw-console` la conoce |
| **«Git», 7 (el checkout compartido)** | antes de escribir, el índice estaba vacío y `origin/main..HEAD` solo tenía `1971b64`, de este hilo. Se midió a las 10:46, a las 10:48 y a las 10:51 |
| **«Al reanudar», escrito en el contrato** | dejó claro qué no se hace en pausa: las peticiones nuevas se listaron y no se reconciliaron |

## Lo que faltó

1. **Qué repos se miran.** Lo mismo que vio la cabina de `aiw-console` (su veredicto, punto 1): «`aiw` y los de
   `projects/`» deja fuera `Acervo` y `PHD`, y además **`aiw/sandbox`**, que es un repo propio (lo ignora el
   `.gitignore` de `aiw`; HEAD `d407cbc`, «sandbox baseline (green)»). A las 10:45:25 se miraron los diez, sin lock.
   **Para la v1:** «en todo directorio del workspace con `.git`: la raíz, `projects/` y debajo de `aiw/`», derivado y
   no listado.
2. **El commit que trajo el `CLAUDE.md` estaba sin publicar, y el contrato no dice quién lo publica.** El paso 2 pide
   que el HEAD de `aiw-console` llegue a ese commit, y llegaba: `1971b64`. Pide también que `ls-remote` sea igual a
   `origin/main`, y lo era, pero los dos estaban en `25b7c72`, un commit por detrás del HEAD. El dry-run publicaba
   `25b7c72..1971b64`. **Para la v1:** «la cabina de Cowork deja su último commit sin publicar; lo publica el primer
   push real de esta cabina, porque es de este hilo (D-081, “Segunda enmienda”)».
3. **El validador del paso 3 no tiene con qué correr.** «Las herramientas de la cabina» dice que no se adaptan durante
   la pausa, y `valida.mjs` espera `W=$HOME/mnt/AIW_Workspace`. La cabina escribió una sonda de solo lectura fuera del
   workspace, en el scratchpad de la sesión, que hace lo mismo: `checkInvariants` del motor de `aiw-console` con los
   `externalRunIds` de `serve.mjs`. **Medido:** importar `serve.mjs` no levanta servidor (solo escucha si se corre
   directo, `RUN_DIRECTLY`), así que no choca con la consola del operador en el 8788. **Para la v1:** decir que el
   validador de arranque se corre así, o dejar un `valida.mjs` para Windows.
4. **Los `externalRunIds` del relevo no se pueden comparar.** El relevo da 254 y hoy salen 278: crecen con los
   canónicos de los otros proyectos, no con este. **Para la v1:** sacarlos de las cifras que se contrastan, o decir que
   cambian.
5. **La fecha de los ficheros de Lecciones no sirve.** El paso 4 pide las peticiones «después del 2026-10-17». En la
   PC, todos los `PARA-CANTU-STUDIO-*` de octubre tienen la fecha del checkout, 2026-10-28 17:17. Lo que sirve es
   `git log` sobre esos ficheros. **Para la v1:** «por fecha de commit, no por fecha del fichero». Encontró un fichero
   nuevo, `PARA-CANTU-STUDIO-2026-10-21.md` (peticiones 32 a 36), cambiado por última vez el 10-23 (`0ea7445`).
6. **Los cambios sin commitear del repo del proyecto.** «Un aparato a la vez» habla de commits que no se esperaban, no
   de cambios en el árbol. En `cantu-studio` había uno que no es de esta cabina:
   `tools/studio/editor-ui/package-lock.json` (`@emnapi/wasi-threads` 1.2.2 → 1.2.3, dependencia opcional), con fecha
   del 2026-09-26, anterior a la mudanza. No se tocó. **Para la v1:** «si hay cambios sin commitear en `cantu-studio`,
   se nombran y no se tocan».

## Lo que estorbó

Del contrato, nada: no hubo regla de Cowork que separar a mano. Lo que estorbó fue el relevo, que choca con el contrato
en tres sitios. Los tres se corrigen hacia adelante en el relevo de esta sesión:

1. **Dónde se miran las peticiones durante la pausa.** El relevo («Si abres este hilo durante la pausa») decía «lee
   PETICIONES por si Lecciones anotó algo». Pero `PETICIONES-DE-LECCIONES.md` solo se pone al día al reanudar: lo que
   anota Lecciones está en sus `PARA-CANTU-STUDIO-*`, como dice el contrato. Leyendo PETICIONES no se habría
   encontrado nada.
2. **El md5 «del árbol».** El relevo da `b8b75d54…` como md5 del árbol. Lo era en la VM, en LF; en la PC es el
   normalizado. El contrato ya lo avisaba.
3. **Dónde están las herramientas.** El relevo decía que «se quedan en `_scratch/cabina-cs-20260930/`». Desde la
   mudanza están en `context/cantu-studio/herramientas-cabina/`.

## Lo que no se ejercitó

Escribir el canónico por la consola, emitir un ticket, montar una QA, las herramientas de la cabina en Windows, abrir
el editor en la PC y correr la suite de `compiler-api` en Windows. Todo eso espera a que el operador reanude Studio.

## Lo medido

| hora | qué | resultado |
|---|---|---|
| 10:45:25 | locks, con `ls` | ninguno en los diez directorios con `.git` |
| 10:45:58 | `cantu-studio`: pull / ls-remote / dry-run | «Already up to date»; HEAD = `origin/main` = `ls-remote` = `a3d0bbcf`; «Everything up-to-date» |
| 10:46:30 | `aiw-console`: fetch / pull / ls-remote / dry-run | al día; `ls-remote` = `origin/main` = `25b7c72`; HEAD `1971b64`; el dry-run publicaba `25b7c72..1971b64` |
| 10:47:23 | el canónico | 277 · 267 / 10 / 0 · denso 1..N · ids únicos · 0 errores · 278 `externalRunIds` · árbol `de3a10ab…` · normalizado `b8b75d54…` |
| 10:47:51 | peticiones de Lecciones | 32 a 36 en `PARA-CANTU-STUDIO-2026-10-21.md`; ninguna 37 ni posterior |
| 10:51:49 | `aiw-console` antes de escribir | `pull --ff-only` al día; índice vacío; `origin/main..HEAD` = `1971b64` |
