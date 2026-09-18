# HANDOFF — hilo `cantu-studio` (el proyecto)

> Escrito por la cabina al cerrar la sesión del **2026-09-16/18**. **Sustituye al relevo del
> 2026-09-16.**
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el canónico al abrir. Gana el
> disco.**

---

## ⚠ LO PRIMERO, PORQUE CAMBIA CÓMO TRABAJAS: LA CABINA TIENE SHELL

El relevo anterior decía que el workspace de bash estaba caído desde el 8 de septiembre y que
todo iba en guiones `.mjs` que pegaba el operador. **Falso el 2026-09-16 a las 20:06 UTC:**
`node` v22.23.2 y `git` 2.34.1 responden, y la cabina corrió TODA esta sesión sola — validador,
consola, motor de roadmap, builders, suites acotadas, commits.

**Consecuencia:** los 58 guiones de `_scratch\` siguen siendo la plantilla buena, pero **los corre
la cabina**, no el operador. Al operador le quedan cuatro cosas: pegar tickets, hacer push, dar
veredictos y mirar pantallas.

**El borrado caduca al reconectar.** Pasó tres veces: `rm` empieza a fallar con `Operation not
permitted` a media sesión. Se vuelve a pedir el permiso y sigue.

**Y git deja basura que HAY QUE BARRER:** después de varios `commit-tree`/`update-ref` quedaron
`.git/HEAD.lock` y hasta diez `tmp_obj_*` en `.git/objects`. **Un `HEAD.lock` que se queda bloquea
el siguiente commit de cualquier hilo.** Se borra y se declara, igual que el `index.lock`.

---

## ESTADO DEL CANÓNICO — medido el 2026-09-18, 04:16 UTC

| | |
|---|---|
| ruta | `projects/cantu-studio/.aiw/roadmap/roadmap.json` — **con `.aiw/`** |
| md5 al cerrar (árbol, CRLF) | `815ddf9b3a52cd758c6b5f788fffde52` |
| runs | **211**, `queue_order` denso `1..211` |
| `completed` | **206** · `active` **2** · `planned` **3** |
| activos | **`#207`** el del compilado que pisa otra lección, **encargado y corriendo esta noche**; **`#210`** la auditoría de interfaz, activa desde antes y esperando al operador |
| validador | **0 errores** con **217** `externalRunIds`, motor de `aiw-console` |
| ⚠ `checkInvariants` | **exige un `Set`**. Con un array LANZA `TypeError` (medido: NO se salta en silencio, como decía el relevo anterior); sin el campo devuelve 1 error, la arista colgante preexistente |
| HEAD `cantu-studio` | `608a4695` |
| HEAD `aiw-console` | `f47b6f0` |

---

## LO QUE SE HIZO — `#204`, `#205`, `#206`, y `#207` abierto

| run | qué dejó |
|---|---|
| `#204` **Rename the Core j-prefix render namespace** | `j-` → `cs-` y `j-author-lite-` → `cs-studio-`, 235 ficheros, con transformador en un módulo y dos guardas. **Y desmintió la frase que sostenía su propia parada**: `j-` NO es prefijo de `jame-` |
| `#205` **Validate the production lesson workflow** | Replanteado antes de correr sobre el flujo REAL. Encontró cuatro defectos, todos medidos, y demostró que el camino **nunca se había estrenado** |
| `#206` **Make the Moodle lesson output self-contained** | En dos rondas: el artefacto de Moodle se lleva dentro sus variables y las reglas globales que usa. **13 de 38 lecciones del corpus perdían formato** y ahora cero |
| `#207` **Stop compile from overwriting a different lesson** | ABIERTO Y ENCARGADO la noche del 17 al 18. Su informe estará esperando |

### El flujo de producción real del operador, medido, porque el roadmap lo describía mal

Escribe el borrador en **`cantu-lessons`** (repo hermano, `drafts/web/…`), le da Generate en el
editor, y el `.MOODLE.html` resultante **lo pega a mano en su Moodle** (metodocantu.com). El
camino `main.js` → `dist/` sobre `src/content` **NO es su camino**.

⚠ **En `cantu-lessons` escribe OTRO HILO, continuamente.** Commiteó cinco veces mientras esta
sesión medía. **Es solo lectura para este hilo**, y lo que se lea se lee desde un commit.

---

## ⚠ LOS CUATRO DEFECTOS QUE `#205` ENCONTRÓ, Y DÓNDE ESTÁN

1. **RESUELTO en `#206`:** el artefacto de Moodle nacía sin la base de estilos.
2. **ABIERTO, es `#207`:** compilar nombra el artefacto desde `lesson.title` y no desde el
   fichero (`server.js:779`), así que dos lecciones con el mismo título **se sobrescriben en
   silencio**. En la configuración del operador, esas lecciones son las suyas.
3. **DEUDA NOMBRADA:** Moodle **escapa las flechas `=>`** de los scripts en línea de la lección al
   guardar, y eso mata el control `A- A+` y el ajuste de fórmulas anchas. La cabina le entregó un
   fichero parcheado a mano; el arreglo de motor no se ha hecho.
4. **BLOQUEADO, y no se abre sin respuesta:** el color de las fórmulas en Moodle. El `#` del
   hexadecimal de `\textcolor{#D08770}` hizo fallar tres fórmulas; en la segunda importación del
   operador **se compusieron solas, con el fichero byte a byte idéntico**. Se le preguntó TRES
   VECES qué cambió y no ha contestado. **La primera explicación de la cabina sobre ese fallo ya
   fue falsa una vez.**

Y fuera del montaje: **el tema de Moodle del operador tenía un script de accesibilidad escrito con
los nombres `j-`, muerto desde `#204`.** La cabina se lo reescribió y él lo instaló.

---

## LO QUE ESTA SESIÓN APRENDIÓ, Y VALE MÁS QUE LOS RUNS

### El criterio de la QA lo puso ÉL, y era mejor que el de la cabina

La cabina le ofrecía juzgar una lección de laboratorio. Él lo rechazó: *«no se trata de si la
lección se ve bien sino que pierde formatos cuando genera la version moodle»*. **Esa frase es el
criterio de QA de todo lo que toque salidas**, y fue lo que destapó el hueco de la ronda 2.

**Corolario operativo:** cuando se pueda, la QA se hace **sobre SU lección real**. La cabina la
construyó desde una copia fuera de los repos, con la huella del borrador declarada.

### Tres errores de medición de la CABINA en esta sesión, los tres declarados

1. **«`j-` es prefijo de `jame-`»** — copiada de una referencia del repo sin medir, escrita en la
   enmienda de un run. La desmintió el taller.
2. **La causa de las fórmulas** — la cabina culpó a `\def\hl#1{#1}` y la pantalla del operador lo
   desmintió: fallaban solo las tres con color hexadecimal.
3. **Una sonda que no desacotaba `:where()`** — dijo que la ronda 2 seguía rota. **Estuvo a un
   paso de publicar un rojo falso sobre trabajo correcto.**

**Los tres se corrigieron en público.** El patrón es siempre el mismo: **publicar sin remedir en
el punto de uso.**

### Los talleres contradijeron sus encargos DOCE veces y ganaron doce

`#204`: el alcance se quedaba corto en tres sitios. `#205`: el encargo pedía medir dos caminos y
solo uno era el del operador. `#206`: no eran 94 usos sino 92; los 63 árboles no se movieron; hay
**dos** ensambladores de Moodle y el encargo nombraba uno; y **un taller corrigió su propia
justificación publicada** tras medirla en navegador.

**Regla que sale: el encargo se escribe invitando a contradecirlo, y esa invitación se cobra.**

### La guarda ve lo que el ojo no puede

En `#206` el peligro real era emitir una regla `body`, que repintaría el curso entero del
operador. **Medido: el artefacto con esa regla se ve idéntico abierto suelto.** Ninguna QA humana
lo habría cazado. La guarda sí.

---

## DEUDA VIVA, CON UBICACIÓN

| qué | dónde |
|---|---|
| **Escapado de `=>` por Moodle** | scripts en línea de la lección; parche a mano en `QA/temp/RUN-JAME-PRODUCTION-LESSON-VALIDATION-001/A1-PARCHE-PARA-MOODLE.MOODLE.html` |
| **Color de fórmulas en Moodle** | BLOQUEADO, esperando al operador |
| **La tipografía Inter no viaja al fragmento de Moodle** | fuera de `#206` **por decisión explícita del operador**: pedir una fuente a internet es política institucional |
| **Una regla global cuyo sujeto lo creara un script en tiempo de ejecución** | quedaría fuera y **la guarda no lo vería**: usa el mismo criterio |
| `editor-ui`: **cinco `API_BASE` fijos a `localhost:3000`**, cero `import.meta.env` | la interfaz servida en otro puerto habla con la API del operador |
| `tools/dev/start-editor.ps1` **mata los puertos 3000/5173/5174/5175** | usarlo con su editor abierto se lo cierra |
| `dist/` de la raíz, desalineado | **puede no importarle a nadie**: no es el camino del operador. Revisar cuando llegue `#208` |
| `QA/temp` sin commitear | tres carpetas de esta sesión, más la deuda antigua |
| `tools/roadmap`: 11 de 173 en rojo, arista colgante preexistente | otro carril |

---

## LO QUE EL OPERADOR PIDIÓ Y NO SE LE HA DADO

**Que le expliquen en qué consiste un run antes de pedirle QA.** Lo dijo con estas palabras: *«que
estamos haciendo en este run, no entiendo que quieres que revise»*. Se le reescribió en llano y
funcionó. **La QA se pide en lenguaje de pantalla, con pasos cortos y el formato de respuesta
literal.**
