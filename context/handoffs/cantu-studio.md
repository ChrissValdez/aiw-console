# HANDOFF — hilo `cantu-studio` (el proyecto)

> Escrito por la cabina al cerrar la sesión del **2026-09-30 al 2026-10-19**. **Sustituye al relevo del
> 2026-09-25/30.**
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el canónico al abrir. Gana el disco.**

---

## ESTADO: CANTU STUDIO ESTÁ EN PAUSA — D-079

**Decisión del operador, 2026-10-19** (literal en `cantu-studio/records/DECISION-2026-10-19-PAUSA-DE-CANTU-STUDIO-HASTA-TERMINAR-EL-PAA.md`,
y en `DECISIONES.md` como D-079): Studio se pausa mientras Lecciones termina el material del PAA.

- **Studio no abre trabajo nuevo.**
- **Lo nuevo que pida Lecciones se resuelve con un Bloque HTML**, y su petición se anota en
  `cantu-studio/PETICIONES-DE-LECCIONES.md` como **«para después de la pausa»**.
- **Solo se atiende un fallo que rompa una lección ya publicada.** Ese sí abre run, con el ritual de siempre.
- **Se retoma** cuando Lecciones termine el PAA y el operador reabra Studio. Lo que toca entonces lo dice D-078:
  el pulido grande del editor, entre la PAA y el EXANI II, para que lo usen maestros.

**Si abres este hilo durante la pausa:** mide el arranque, lee PETICIONES por si Lecciones anotó algo, y no
emitas tickets salvo un fallo de una lección publicada.

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

## LAS HERRAMIENTAS DE LA CABINA — se quedan en `_scratch/cabina-cs-20260930/`

- `abre.sh <qo> <run_id>` y `cierra.sh <qo> <run_id> <closeoutFile>`: planned→active y active→completed por la
  consola, con dry-run, baseline, md5 y campos cambiados.
- `cadena.mjs vN/cadena-vN.json dry|apply`: inserciones y movimientos (con `gen.py` por carpeta). Las cadenas largas
  agotan los 175 s: se parten de 4 en 4.
- `valida.mjs` (con `W=$HOME/mnt/AIW_Workspace`) y `status.mjs`.
- Se conservan porque sirven para retomar. Los mensajes de commit, los cierres y las cadenas ya aplicadas se
  borraron.
