# HANDOFF — hilo `cantu-studio` (el proyecto)

> ⚠ **ANTES DE NADA — la mudanza del 2026-10-28 (D-081).** El trabajo pasó de la laptop a la PC y git es la fuente de
> verdad entre las dos computadoras; `_scratch` es desechable. Al reabrir este hilo, lee
> `context/cabinas/MUDANZA-2026-10-28.md` y haz su §2 antes que nada: el arranque en la PC, y revisar tu parte de
> `_scratch` (§3) para pasar a tu repo lo que siga vigente. Este aviso lo puso la cabina de LECCIONES a pedido del
> operador; lo de abajo es tu relevo, sin tocar.

> ⚠ **DESDE EL 2026-10-29, ESTE HILO VIVE EN CLAUDE CODE, EN PAUSA.** Decisión del operador (literal en
> `cantu-studio/records/DECISION-2026-10-29-STUDIO-SE-MUDA-A-CLAUDE-CODE-EN-PAUSA.md`). La cabina abre allá con
> `context/cabinas/cantu-studio/ARRANQUE.md`, y su configuración es `context/cabinas/cantu-studio/CLAUDE.md` v0. Studio
> sigue en pausa por D-079; el operador decide allá cuándo se reanuda. **Último publicado por la cabina de Cowork:**
> `cantu-studio` `a3d0bbcf`; `aiw-console`, el commit que trajo `context/cabinas/cantu-studio/`.
>
> **Formato de cierre de todo mensaje (D-082, 2026-10-29):** termina con «Qué necesito de ti» (cada cosa con su
> recomendación, o «Nada por ahora») y «Qué procede» (qué sigue y quién lo hace; si es esperar, **⏳ EN ESPERA de** <qué>).
> La tabla de lo medido, con la hora, va antes.

> **PRIMERA SESIÓN EN CLAUDE CODE — 2026-10-29, de 10:45 a 10:55 (hora de la PC, UTC−6), por la cabina de
> `cantu-studio`.** Studio sigue en pausa (D-079): no se emitió ningún ticket ni se tocó la cola. Arranque medido:
> - **Locks:** ninguno, en los diez directorios con `.git` (`aiw`, `aiw/sandbox`, `Acervo`, `PHD` y los seis de
>   `projects/`).
> - **La prueba del push:** `cantu-studio` en `a3d0bbcf` = `origin/main` = `ls-remote`. `aiw-console` en `1971b64`, un
>   commit por delante de `origin/main` (`25b7c72`). En los dos, `pull --ff-only`, `ls-remote` y `push --dry-run`
>   respondieron sin pedir credenciales. **El primer push real es el del commit que trae este relevo**, y con él sale
>   `1971b64`.
> - **El canónico, igual que el 2026-10-19:** 277 runs · completed 267 · planned 10 (#268–#277, en O8) · active 0 ·
>   `history=267` · 0 errores con el motor de `aiw-console` (278 `externalRunIds`: crecen con los otros proyectos, no
>   con este). md5 **normalizado** `b8b75d54…`. El que «Dónde quedamos» llama «del árbol» lo era en la VM, en LF; **el
>   del árbol en la PC es `de3a10ab…`**.
> - **Lecciones anotó las peticiones 32 a 36** en `cantu-lessons/docs/PARA-CANTU-STUDIO-2026-10-21.md` (último cambio
>   el 2026-10-23, `0ea7445`). Se listaron, no se reconciliaron: 32, «Para saber más» y la nota «Ver cálculo» a
>   16/24 px (*sigue haciendo falta*); 33, un componente «Ley» (al archivo); 34, la escala de letra en Studio, para
>   quitar el puente de las 29 lecciones (*al frente de la cola al reanudar*); 35, el fondo de la «Nota destacada» sutil
>   de la slide, desde la paleta; 36, confirmar que «Generar Slides» declara siempre las variables de la paleta. Según
>   Lecciones, ninguna rompe una lección publicada. **La fecha de esos ficheros en la PC (2026-10-28 17:17) es la del
>   checkout: las peticiones nuevas se buscan con `git log`.**
> - **Sin commitear en `cantu-studio`, y no es de la cabina:** `tools/studio/editor-ui/package-lock.json`
>   (`@emnapi/wasi-threads` 1.2.2 → 1.2.3, dependencia opcional; el fichero es del 2026-09-26, anterior a la mudanza).
>   No se tocó; se decide al reanudar.
> - **El validador en la PC**, mientras las herramientas no se adapten: una sonda de solo lectura fuera del workspace,
>   con `checkInvariants` del motor de `aiw-console` y `externalRunIdsFor` de `serve.mjs`. Importar `serve.mjs` no
>   levanta servidor.
> - **El veredicto sobre el `CLAUDE.md` v0** está en `context/cabinas/cantu-studio/VEREDICTO-PILOTO-2026-10-29.md`. Sus
>   cambios para una v1 esperan la palabra del operador.

> **MUDANZA HECHA — 2026-10-29, en la PC (`desktop-525k0is`), por la cabina de `cantu-studio`.** Arranque medido:
> `cantu-studio` en `9e8a02c4` = `origin/main` (copia local; la VM no tiene credenciales para consultar GitHub),
> `aiw-console` por delante de `a0c3d9c`, sin `index.lock`. De las 112 entradas de `_scratch` que §3 asigna a este hilo,
> se copió lo vigente (copia, no movimiento; byte a byte, comparado con `cmp`):
> - los 4 bancos de QA → `cantu-studio/QA/bancos/` (con `DE-DONDE-VIENE.md`);
> - `medicion/` y `guiones/` de `RUN-CANTU-COMPILE-NEVER-OVERWRITES-ANOTHER-LESSON-001`, que su `LEEME.md` promete y no
>   estaban en git → su carpeta de `QA/temp/`;
> - las herramientas de la cabina → `aiw-console/context/cantu-studio/herramientas-cabina/` (se copian a `_scratch` para
>   usarlas; ver su `LEEME.md`);
> - 5 páginas de decisión → `aiw-console/context/cantu-studio/records/anexos/`.
>
> **Lo demás (~100 entradas) es trabajo intermedio de runs cerrados y se queda en `_scratch`.** No son de este hilo:
> `_LEC_variantes4` y `L06-v2-capturas` (de LECCIONES). `QA/temp/` en la PC: 3 484 ficheros versionados y 23 ignorados
> (salidas regenerables de los #216–#218). `node_modules`: completo según `npm ls`, binarios de Windows x64; falta que el
> operador abra el editor una vez en la PC. **Corrección:** la limpieza del 2026-10-19 borró capturas `.png` que algunos
> informes citan; el texto de las mediciones sí está en git.

> Escrito por la cabina al cerrar la sesión del **2026-09-30 al 2026-10-19**. **Sustituye al relevo del
> 2026-09-25/30.**
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el canónico al abrir. Gana el disco.**

---

## ESTADO: CANTU STUDIO ESTÁ EN PAUSA — D-079

**Decisión del operador, 2026-10-19** (literal en `cantu-studio/records/DECISION-2026-10-19-PAUSA-DE-CANTU-STUDIO-HASTA-TERMINAR-EL-PAA.md`,
y en `DECISIONES.md` como D-079): Studio se pausa mientras Lecciones termina el material del PAA.

- **Studio no abre trabajo nuevo.**
- **Lo nuevo que pida Lecciones se resuelve con un Bloque HTML.** Precisión del operador, 2026-10-20: **Lecciones
  mantiene sus peticiones al día ella misma** en sus `docs/PARA-CANTU-STUDIO-*.md`, y **la cabina las reconcilia en
  `PETICIONES-DE-LECCIONES.md` al reanudar**, no durante la pausa.
- **La pausa dura hasta que Lecciones termine el temario.**
- **Solo se atiende un fallo que rompa una lección ya publicada.** Ese sí abre run, con el ritual de siempre.
- **Se retoma** cuando Lecciones termine el PAA y el operador reabra Studio. Lo que toca entonces lo dice D-078:
  el pulido grande del editor, entre la PAA y el EXANI II, para que lo usen maestros.

**Para reanudar:** en Claude Code, con `context/cabinas/cantu-studio/ARRANQUE.md` y el `CLAUDE.md` de esa carpeta. El prompt de Cowork (`cantu-studio/PROMPT-PARA-REANUDAR-TRAS-LA-PAUSA.md`) queda sustituido.

**Si abres este hilo durante la pausa:** mide el arranque, mira si Lecciones anotó algo en sus
`cantu-lessons/docs/PARA-CANTU-STUDIO-*.md` (por `git log`; `PETICIONES-DE-LECCIONES.md` solo se pone al día al
reanudar), y no emitas tickets salvo un fallo de una lección publicada. *(Corregido el 2026-10-29: decía «lee
PETICIONES».)*

---

## DÓNDE QUEDAMOS — medido el 2026-10-19

**277 runs · completed=267 · active=0 · planned=10 · history=267 · validador 0 errores con 254 externalRunIds ·
md5 del canónico (árbol) `b8b75d541bac7349ca361d9488b70263`.**

- Los 10 `planned` (#268–#277) viven en el **objetivo archivado O8 «Archive — non-vital work, promoted when
  Lessons asks»**: contrato del cálculo vertical, migración de las diez lecciones escritas a mano, «explicación
  matemática básica» (contrato y editor), «Takeaway» (contrato y editor), flujo de exportación, plan de hosting,
  auditoría de UX, historial de edición por campo. **Ninguno hace falta para el PAA.**
- **Suite de `tools/studio/compiler-api`: 3000 / 3000 / 0.** La roja histórica H-1 se arregló en el #267 (era el
  corte de la prueba, no los esquemas; roja desde el #47).
- **Peticiones de Lecciones: de la 1 a la 31 cerradas.** La 22.2 quedó «sin prisa». La 28.1 salió por la salida D
  (L01·D2 conserva su Bloque HTML). La parte 5 de la 31 (`\allowbreak`) no entra, por decisión del operador.

## LO QUE SE HIZO EN ESTA SESIÓN — a grandes rasgos

- **La cola se puso al día y lo no vital se archivó** en O8 (decisión del 2026-10-10). Desde entonces solo entran
  peticiones de Lecciones y seguridad del editor (D-077, D-078).
- **La revisión por lote de L01 (#254)** se cerró por decisión, y de ella salieron las notas del paso «Ver cálculo»
  y «Error común» como piezas (#255–#258).
- **Peticiones 22 a 31**, cada una con su run, su QA y su fila en PETICIONES. Las últimas:
  - **29 (#263):** «Ver cálculo» no parte renglones; encoge hasta el **60 %** y alinea en el «=».
  - **30 (#264):** el paso de resultado elige su verde con **`"resultGreen": "strong"`**.
  - **31 (#265 y #266, en paralelo):** el «Diagrama jerárquico», la caja de la fórmula del procedimiento y la
    «Lista con etiquetas» se acomodan en pantallas angostas.
- **#267:** la suite queda en verde antes de la pausa.

## HECHOS MEDIDOS QUE CONVIENE SABER

- **El Moodle real usa MathJax 3.2.2** (`tex-mml-chtml`, sin configuración propia) y **conserva los guiones** dentro
  de la página. `\textcolor` funciona. Medido el 2026-10-19 sobre una página real pegada por el operador:
  `cantu-studio/records/MEDICION-2026-10-19-EL-MOODLE-REAL-USA-MATHJAX-3.2.2.md`.
- **El criterio de la regla 35 de Lecciones** (sin scroll horizontal) vive en
  `cantu-lessons/tools/revision/lib/navegador.mjs` (`medirDesborde`), **no** en `tools/render/lib/measure.mjs`.
- **El permiso de borrado se pierde en cada reconexión.** Se vuelve a pedir con la herramienta sobre
  `C:\Users\chris\Documents\AIW_Workspace`. Sin él, git deja `tmp_obj_*` en `.git/objects/`; se borran después.
- **`git status` del repo entero agota el tiempo**; las sondas van dirigidas a carpetas.

## LO NOMBRADO Y NO CONSTRUIDO — ninguno bloquea el PAA

| hallazgo | dónde se midió |
|---|---|
| En el teléfono, la palomita del verde claro sigue en `#A3BE8C` fijo aunque el resultado lleve otro color | #264 |
| «Se obtiene:» parte su fórmula en línea en el teléfono | #263 |
| El ajuste en modo «A la izquierda, en bloque» (`commons.js`) probablemente deja la misma caja desplazable; nadie lo usa en L01–L07 | #266 |
| Los nodos de celular del diagrama no se abren sin guiones (`onclick`); el Moodle real sí los conserva | #265 |
| Altura de la 22.2 (dos columnas) y márgenes en un teléfono real | revisión de L01 |
| La ENMIENDA propuesta para el comentario de `webCorpusFixtureNet.test.mjs` no se escribió en la prueba; está en el reporte del #266, §7 | #266 |
| El título de H-1 («los cinco `path`») ya no dice la verdad; renombrarla la sacaría de la comparación por nombre | #267 |
| Una página antigua del Moodle (prefijo `j-`) muestra `<%2%1%>` y `<%18%20%>` donde deberían cerrar etiquetas; sin comprobar en una lección actual | 2026-10-19 |

## FUERA DE ESTE HILO, Y NO ES DE LA CABINA

- `.claude/launch.json` de la **raíz del workspace** lleva una configuración que añadió el taller del #264 para su
  propio editor.
- El repo `aiw` tiene `tmp_obj_*` sueltos en `.git/objects/` que esta cabina no creó.

## CÓMO SE TRABAJA AQUÍ — las reglas del operador que siguen vigentes

- **QA: un run a la vez. Nada de preguntas de clic durante la QA**; el operador escribe el resultado. Cada mensaje de
  QA tiene la forma fija: **1. Archivo para abrir · 2. Pasos con lo esperado · 3. Veredictos a tomar**, como mucho
  ~4 pasos, sin consola y sin «Insertar JSON». Estado, hallazgos y commits van en otro mensaje, antes.
- **Los borradores de QA los monta la cabina** en `cantu-lessons/drafts/{web|slide}/qa_cabina/qa_<fecha>/`, con el
  nombre = slug del título. La cabina solo crea y borra ahí, y **nunca commitea en cantu-lessons**.
- **Pieza nueva = primero un Bloque HTML aprobado.** Arreglos visuales y peticiones de Lecciones pueden ir en QA por
  lote; lo importante lleva su propia QA.
- **En paralelo solo con superficies disjuntas**, y nada estructural en la cola con un taller en vuelo.
- **`add` dirigido, identidad explícita, `--no-optional-locks`, lock y `tmp_obj_*` comprobados tras cada escritura.**

## LAS HERRAMIENTAS DE LA CABINA — desde la mudanza, en `context/cantu-studio/herramientas-cabina/`

*(Corregido el 2026-10-29: decía «se quedan en `_scratch/cabina-cs-20260930/`». Se copian a `_scratch` y se adaptan a
Windows en el primer uso real; ver su `LEEME.md`.)*

- `abre.sh <qo> <run_id>` y `cierra.sh <qo> <run_id> <closeoutFile>`: planned→active y active→completed por la
  consola, con dry-run, baseline, md5 y campos cambiados.
- `cadena.mjs vN/cadena-vN.json dry|apply`: inserciones y movimientos (con `gen.py` por carpeta). Las cadenas largas
  agotan los 175 s: se parten de 4 en 4.
- `valida.mjs` (con `W=$HOME/mnt/AIW_Workspace`) y `status.mjs`.
- Se conservan porque sirven para retomar. Los mensajes de commit, los cierres y las cadenas ya aplicadas se
  borraron.
