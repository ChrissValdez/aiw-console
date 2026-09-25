# HANDOFF — hilo `cantu-studio` (el proyecto)

> Escrito por la cabina al cerrar la sesión del **2026-09-18/25**, que termina con una **MUDANZA
> DE COMPUTADORA**. **Sustituye al relevo del 2026-09-16/18.**
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el canónico al abrir. Gana el
> disco.**

---

## ⚠ LO PRIMERO: ESTA SESIÓN CIERRA PARA MUDARSE DE MÁQUINA

El operador sigue en **otra computadora**, con la misma estructura de carpetas y los mismos repos.
Al cerrar, los cinco repos quedaron **sin nada real pendiente de commitear**. Lo que hay que saber
del otro lado:

- **`QA/temp/` NO VIAJA ENTERO.** Se commitearon sus **29 documentos `.md`** (368 KB, el rastro de
  por qué se hizo cada cosa) y las **5 hojas de QA** al nivel de `QA/`. Los otros **1 045 ficheros
  y 39 MB** —copias del motor de antes de cada sabotaje, renders del corpus, volcados— **se quedan
  atrás a propósito**: son andamio reproducible por los guiones que sí viajan.
- **`dist/` ESTÁ EN `.gitignore`** (`**/dist/`). El HTML de Moodle reemitido por el `#213` **no
  viaja**. No hace falta: el operador ya lo pegó en su curso y le dio pass.
- **`_scratch\` y `_backups\` están fuera de todo repo** y tampoco viajan. Los guiones de consola
  (`_STUDIO_*.mjs`) hay que rehacerlos o copiarlos a mano; su forma está descrita más abajo.

---

## LA CABINA TIENE SHELL, Y CORRE TODO ELLA

Medido de nuevo toda esta sesión: `node` v22.23.2 y `git` responden, y la cabina corrió sola el
validador, la consola, los motores, suites acotadas, borrados y commits. **Al operador le quedan
cuatro cosas:** pegar tickets, hacer `push`, dar veredictos de pantalla y aportar lo que vive fuera
del montaje.

**Ojo con dos trampas de medición que mordieron esta sesión:**

1. **Un comando de git que muere a mitad no dice «nada»: no dice nada.** Un `git diff --name-only
   HEAD` en `cantu-studio` se quedó sin salida porque git estaba renormalizando finales de línea y
   el comando agotó su tiempo. La cabina estuvo a un paso de publicar «el taller no tocó nada»
   sobre 20 ficheros modificados. Con `status --porcelain -uno` salió la verdad.
2. **`git status` en `aiw` engaña, y esta vez casi cuesta un commit falso de 8 778 líneas.** Ese
   repo **no tiene `.gitattributes`**: mostraba 125 ficheros modificados con +8 778/−8 778, simetría
   exacta que es la firma del ruido de finales de línea. Medido con
   `git diff --ignore-cr-at-eol --numstat`: **solo 6 ficheros tenían cambio real.**

---

## DÓNDE QUEDAMOS — estado al 2026-09-25

**221 runs · completed=214 · active=2 · planned=5 · densidad 1..221 OK · validador 0 errores con
217 externalRunIds.**

| | run | estado |
|---|---|---|
| **#215** | The author picks the formula alignment in Web, as Slide already allows | **`active` — SOLO FALTA LA QA DE PANTALLA** |
| **#216** | A published lesson can be brought back into the editor | `planned` |
| #217 | ANALYSIS STOP — las cinco peticiones de componentes | `planned` |
| #218 | Flujo de exportación de producción | `planned` |
| #219 | Plan de hosting y despliegue | `planned` |
| **#220** | Auditoría de UX de Cantu Studio | **`active`, esperando al operador desde hace semanas** |
| #221 | Historial de edición por campo | `planned` |

### Lo único pendiente del operador ahora mismo

**La QA del `#215`, y son tres desplegables.** Arranca el editor (`npm --prefix tools/studio run
dev`, API en `localhost:3000`, interfaz en `http://localhost:5173`) y comprueba que en los TRES
sitios el desplegable **«Alineación de las fórmulas»** dice **«Centradas (por defecto)»** y **«A la
izquierda, en bloque»**:

1. Web → **«Procedimiento matemático»**
2. Web → **«Explicación guiada»** (con el bloque en modo fórmulas)
3. Diapositiva → **«Procedimiento matemático»**

**Trampa declarada por el taller:** hay **dos** bloques llamados «Procedimiento matemático», uno por
carril. No son el mismo.

Con su `ok`, el `#215` cierra y sigue el `#216`.

---

## LO QUE SE CERRÓ EN ESTA SESIÓN, Y LO QUE ENSEÑÓ

**`#208` a `#215`, ocho runs.** Lo que merece sobrevivir no son los arreglos, son los patrones:

- **`#208`–`#209` · El arreglo era MEMORIA, no otra parada.** La parada del `#207` ya existía y
  bastaba en cuanto el origen viajara; lo que faltaba era que la ranura local recordara de qué
  fichero salió el borrador. *Cuando la solución parece pedir un guardia nuevo, preguntarse primero
  si lo que falta es un dato.* Y con eso **la parada del `#207` la vio por fin un humano** — aquel
  run había cerrado declarando que nadie podía provocarla.
- **`#210` · Dos casos que comparten mecanismo son un censo, no una pareja.** Los dos que el recado
  reportaba estaban **mal localizados los dos**; el censo real derivado del esquema eran cinco
  campos en seis renglones, más **una capa entera que nadie había mirado** (el compilador), que
  necesitó autorización explícita del operador porque `CLAUDE.md:490` la protege.
- **`#211` · La parada de análisis desmintió la premisa de su propio encargo**, por segunda vez en
  este proyecto. El ancla no se perdía dentro de la fórmula sino **entre pasos**, y el `#170` ya lo
  había arreglado así para Slide.
- **`#212` · La red de no-regresión estaba CERTIFICANDO el defecto**: el árbol fijado llevaba los
  ocho `undefined` como salida esperada. Y la lección publicada **no regresó: nació rota** —
  `rowSpan` nunca existió en el motor de Web.
- **`#213` · La huella de un hueco es un pliegue a mano.** Web no dibujaba el `result`, y lo que lo
  decidió no fue el historial ni los records: fue que **el fixture de referencia lo plegaba a mano**
  porque el motor no lo leía.
- **`#214` · El operador revocó un contrato ya aprobado, y la medición le dio la razón por escrito.**
  El ADR-006 se aprobó en forma (a) —regla siempre activa— y **Slide ya tenía la forma (b)
  construida y aprobada desde antes**, con su campo y su control montado. **Nadie midió si (b) ya
  existía antes de elegir (a).** Regla nueva: *antes de elegir entre dos formas, preguntar si una de
  las dos ya está en disco y aprobada.*
- **`#214` r3 y `#215` · Las guardas subieron de categoría dos veces.** Una pasó de comprobar que
  una cadena aparece en el código a **extraer el ajustador emitido y ejecutarlo** —un sabotaje que
  resta un solo relleno deja verde la comprobación de cadena y solo enrojece la que ejecuta—. Otra
  demostró que una palabra llega a tres mandos **renderizando la pieza real con React** y contando
  en el bundle construido.

---

## LOS ERRORES DE LA CABINA EN ESTA SESIÓN, Y LA GUARDA QUE SALIÓ DE CADA UNO

1. **Emitió el ticket del `#211` sin abrir el run.** El canónico decía `planned` mientras el taller
   trabajaba. Lo cazó **la guarda de estado del guion de cierre**, no la disciplina.
2. **Republicó coordenadas ajenas como medición propia** (`renderRule.js:80/96/108`: solo la `:96`
   es la fórmula). *Un dato ajeno que se republica sin medir es un dato inventado con mejor letra.*
3. **Escribió el `Scope` del `#214` de memoria** y dejó fuera una de las cuatro superficies del ADR.
   *El `Scope` se DERIVA del contrato.*
4. **Dejó un fichero huérfano al commitear el `#215`**: `FormulaAlignmentField.jsx`, la pieza que
   los tres mandos importan, sin versionar y sin ignorar — en un clon limpio el editor no
   construiría. Lo encontró el taller, no la cabina.
   **GUARDA NUEVA, YA EN USO EN TODOS LOS COMMITS:** después de preparar el índice, listar los
   ficheros **sin versionar y no ignorados** bajo los directorios tocados:
   `git ls-files --others --exclude-standard <dirs>`. *El `add` dirigido protege de arrastrar lo que
   no toca; no protege de dejarse algo fuera.*
5. **Compuso un mensaje de commit con `-m`** y el shell se comió las comillas invertidas, dejando un
   hueco a mitad de una frase. *Los mensajes van por fichero, siempre.*
6. **Hizo una pregunta sin recomendación** (si el `result` debía dibujarse). Se corrigió midiendo:
   el gemelo de Slide sí lo dibuja.

---

## DEUDA VIVA, NOMBRADA Y SIN DUEÑO

- **Tres ficheros de `dist/`** siguen enseñando `undefined`, por las otras dos causas del `#210`: un
  `rule` de Slide sin `description` requerido, y un módulo que no exporta el `title` de la lección.
- **Un fichero huérfano en `dist/staging`** sin fuente con ese nombre.
- **`renderStepGrid.js`**: parcial completo que no invoca nadie. Tres auditorías del repo lo
  registran y una pide revisión de seguridad antes de exponerlo (emite manejadores de ratón en
  línea). **Nombrado, no abierto: es del operador.**
- **`LessonContextBar`, `LessonBreadcrumbBar`, `EditorShell` y `ThreePaneLayout`**: cero
  importadores. Código muerto medido.
- **El defecto F2 de ancho del `#43`**, medido en el `#214` y no disparado.
- **Dos cajas del corpus** que siguen saliéndose 5 px: es el suelo de 0,5 mordiendo, no el defecto.
- **El comentario de `SlideStackEditor.jsx:987`** aún dice que la pregunta del rótulo no se ha
  contestado. Ya se contestó el 2026-09-21.
- **La hoja de QA de la ronda 1 del `#215`** dice la palabra vieja en seis sitios.
- **Moodle usa MathJax** y todo lo de esta tanda se midió con **KaTeX**.

---

## CÓMO SE TRABAJA AQUÍ (lo que no cambia)

- **El ciclo:** turno 1 abre el run **y** emite el ticket; turno 2 mide, cierra y commitea; turno 3
  encadena. El operador solo pega el ticket.
- **La consola:** `projects/aiw-console/project-console/serve.mjs` en un puerto libre, POST a
  `/projects/cantu-studio/__project-console/roadmap/edit` con `{op,args,apply,baseline}`. Dry-run
  siempre antes de aplicar, con el `remap` publicado. `serve.mjs` re-emite `.project/` solo.
- **El canónico:** `projects/cantu-studio/.aiw/roadmap/roadmap.json`. El motor que lo conoce es el
  de `aiw-console` (2 479 líneas, sabe de `lane` y `barrier`), **no** el de `cantu-studio`.
- **El validador** `checkInvariants` **devuelve un ARRAY** de cadenas, no un objeto con `.errors`.
  Leerlo mal da un verde falso sobre un canónico sucio.
- **Los guiones de `_scratch`** tienen la forma madura: guardas de identidad, título y estado que
  abortan; respaldo byte a byte antes de escribir; dry-run; verificación campo a campo contra el
  estado anterior con la lista de cambios permitidos; y borrado del respaldo al cerrar el run.
- **`git stash` NO es byte-seguro en `cantu-studio`** (`* text=auto` devuelve LF donde había CRLF).
  Las restauraciones se verifican **por hash**.
- **Commits:** `add` dirigido por nombre, nunca `-A`, más la guarda de huérfanos. Identidad
  explícita en cada commit. **El `push` es del operador y no bloquea nada — y no se le recuerda.**
