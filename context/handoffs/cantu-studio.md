# HANDOFF — hilo `cantu-studio` (el proyecto)

> Escrito por la cabina al cerrar la sesión del **2026-09-25/30**, la primera en la **computadora
> nueva** (`desktop-525k0is`). **Sustituye al relevo del 2026-09-18/25.**
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el canónico al abrir. Gana el
> disco.**

---

## DÓNDE QUEDAMOS — medido el 2026-09-30 ~21:40 UTC

**227 runs · completed=218 · active=1 · planned=8 · densidad 1..227 OK · validador 0 errores con 217
externalRunIds · history=218 · md5 del canónico (árbol, CRLF) `4e3e090a96af6b1011bb87557b5a27d0`.**
HEAD de `cantu-studio`: `f09562ef`.

| | run | estado |
|---|---|---|
| **#219** | The SVG gate admits dashed lines, and nothing else | `planned` — **EL SIGUIENTE** |
| #220 | The hierarchy's published labels are silently dropped | `planned` |
| #221 | ANALYSIS STOP — the component petitions, read together | `planned` (enmendado: suma `calculation` y el HTML dentro de columnas) |
| #222 | The ten hand-written lessons move, once, to the editor's vocabulary | `planned`, depende de #217, #218 y #219 |
| #223 · #224 | Flujo de exportación · Plan de hosting | `planned` |
| **#225** | Auditoría de UX de Cantu Studio | **`active`, esperando al operador desde hace semanas** |
| #226 | Historial de edición por campo | `planned` |
| **#227** | The preview names the field that fails, and a procedure step without its formula is caught | `planned`, **al final por petición del operador** |

### Una pregunta pendiente del operador, hecha tres veces sin respuesta

**El `<` pegado a una letra dentro de una fórmula, detrás de un texto con formato**
(`<b>Ojo:</b> \(a<b\)`). Desde el `#218`, esos dos campos admiten formato, y el navegador lee
`<b\)` como una etiqueta: se come un cierre del motor y la fórmula se pierde sin aviso. Lo midió el
taller del `#218` en un navegador real. La cabina recomienda **un run corto antes de la migración
(`#222`)** que lo cierre en la compuerta de forma. **El operador no ha contestado.** Pregúntalo una
vez más, con la recomendación, al abrir; si no contesta, no insistas.

---

## LO QUE SE HIZO EN ESTA SESIÓN — `#215` a `#218`, y dos runs nuevos en la cola

- **`#215`** (alineación de fórmulas en Web) cerró con el pass de pantalla de los tres desplegables.
- **`#216`** (¿vuelve una lección publicada al editor?) midió y propuso: **17 de 42** entradas del
  corpus se importan, y **ninguna** de las dos lecciones publicadas. El problema grande no es el HTML:
  las lecciones están escritas en el vocabulario de Core, que es anterior al esquema del editor, y el
  compilador traduce del editor a Core pero no al revés. Guarda nueva `publishedLessonIsImportable`.
  El operador eligió las cinco recomendaciones: sus tres runs más una enmienda al `#221`.
- **`#217`** entregó el cierre del **comentario HTML sin cerrar** (`<!--`), que pasaba en 178 de 204
  campos y ahora en ninguno. Los otros dos puntos **se pararon por medición**: entre la puerta y el
  motor está la **lista blanca propia del compilador**, que el `#216` no midió y la cabina copió al
  ticket sin medir. QA 4/4.
- **`#218`** abrió esos dos campos (`timeline.details` y `rule.description` de Web) **en la puerta y
  en el compilador a la vez**, con una sola regla que el compilador ahora importa. Esto se hizo con
  autorización explícita del operador para tocar el compilador. QA en dos pasadas: la primera falló
  porque el servidor no se había reiniciado.
- **`#227`**, pedido por el operador al final de la cola: que la vista previa **nombre el campo que
  falla** (hoy dice «campos faltantes» aunque no falte nada) y que un paso sin fórmula no se vea
  «amontonado». Él mismo nombró el mecanismo: el panel gris desaparece (`renderTimeline.js:101`,
  `.no-math`, a propósito).

---

## LA COMPUTADORA NUEVA — lo que se midió y hay que saber

- **Modo del editor:** `AUTHOR_LITE_WORKSPACE_ROOT` = `C:\Users\chris\Documents\AIW_Workspace\projects\cantu-lessons`,
  como variable **de usuario de Windows**. Sin ella, el editor entra en modo interno y el explorador
  sale casi vacío. Al arrancar tiene que decir `[Storage] Mode: external`.
- **`editor-ui/package-lock.json` sale modificado** por el `npm install` de esta computadora
  (`@emnapi/wasi-threads` 1.2.2 → 1.2.3). No es de ningún run y **no se ha commiteado**. Decisión
  del operador si entra.
- **El shell de la cabina aparece y desaparece.** La sesión empezó SIN `device_bash`: solo podía
  listar, copiar a la nube y escribir. A mitad de sesión apareció. Las herramientas del puente se
  desconectan y vuelven a menudo: si una llamada falla con «not connected», **comprueba si lo que
  mandaste se ejecutó** (un commit puede no haber entrado) antes de repetirlo.
- **El permiso de borrado caduca en cada reconexión.** Pasó cuatro veces. Se vuelve a pedir.
- **Sin shell, el `stage` no llega a más de 7 carpetas de profundidad.** El código del editor está a
  9 o 10.
- **Las suites largas no caben en la cabina:** tope de 180 s por llamada, y un proceso lanzado en
  segundo plano muere con la llamada. La guarda del `#217` no se pudo correr desde aquí. Sus cifras
  son del taller.
- **El operador tiene Claude Code instalado en la PC** (`claude` 2.1.284) y maneja sesiones de Remote
  Control desde la laptop. **Queda pendiente** probar si se pueden lanzar tickets de taller así.

---

## LOS ERRORES DE LA CABINA EN ESTA SESIÓN, Y SU GUARDA

1. **Dijo «no tengo shell» y era una medición que caducó en la misma sesión.** El shell apareció
   después. Se corrigió en voz alta. *Una capacidad del puente se vuelve a medir cuando algo cambia.*
2. **Copió al ticket del `#217` que esos campos «se pintan crudos»**, medido por el `#216` solo contra
   la puerta y el motor. El compilador escapa y lanza. Es la trampa (E) otra vez. *Una afirmación
   sobre lo que ve el alumno se mide contra la CADENA ENTERA: puerta → compilador → motor.*
3. **Borró el respaldo del canónico de un run todavía abierto** (el `#218`). Lo declaró.
4. **Hizo un `add` en la misma llamada que otro commit.** Terminó bien, pero la regla dice que cada
   uno va solo.
5. **`set-deps` con `addDep: [id]` falla** con «not a known run»: recibe una CADENA, no una lista. Lo
   cazó el dry-run sobre copia.

---

## CÓMO SE TRABAJA AQUÍ (lo que no cambia)

- **Los pasos de QA van COMPLETOS en el chat**, con el JSON exacto, lo que tiene que ver y el formato
  de respuesta. **Regla del operador del 2026-09-30.** La hoja del taller es el respaldo; el vehículo
  es la respuesta. **Primer paso de toda QA que toque el compilador o el esquema del servidor:
  reiniciar `npm --prefix tools/studio run dev`.**
- **El operador contesta pegando lo que ve.** Eso vale más que un «SÍ».
- **La consola:** `projects/aiw-console/project-console/serve.mjs` con `PC_PORT`, POST a
  `/projects/cantu-studio/__project-console/roadmap/edit` con `{op,args,apply,baseline}`.
  `serve.mjs` re-emite `.project/` solo.
- **Dry-run de TODA la cadena, antes de aplicar:** con `planEdit` de `roadmap-plan.mjs` sobre una
  copia del canónico, paso a paso, escribiendo el `serialized` de cada uno. La plantilla solo valida
  el primer paso; esto valida todos. Se usó en todas las inserciones de esta sesión.
- **El canónico:** `projects/cantu-studio/.aiw/roadmap/roadmap.json`. Motor: el de `aiw-console`.
  `checkInvariants` **devuelve un array**.
- **Commits por plumbing** (`write-tree` / `commit-tree` / `update-ref`), mensaje por fichero, `add`
  dirigido, `diff --cached --name-only HEAD` exacto, `ls-files --others --exclude-standard` sobre lo
  tocado, y después borrar `tmp_obj_*` y comprobar locks.
- **Los guiones del taller en `QA/temp/<run>/` entran con `add -f`** (`.mjs` y `.salida.txt`). Los
  `.json` y `.html` de salida no entran.
- **El `push` es del operador y no se le recuerda.**
