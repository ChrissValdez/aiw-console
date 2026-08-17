# HANDOFF — hilo `cantu-studio` (el proyecto)

> Escrito por la cabina el **2026-08-17**, al cerrar la sesión que llevó `#104` → `#108`.
> **Sustituye al relevo del 2026-08-16.** Aquel no tenía cifras falsas; éste corrige **dos
> mediciones de capacidad** suyas y añade lo que enseñaron cinco cierres.
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el canónico al abrir. Gana el
> disco.**

---

## ⚠ LO PRIMERO: DERIVA LA RUTA Y PRUEBA LA CAPACIDAD

La ruta de montaje **cambia entre sesiones**. No la heredes. Prueba que se lee el workspace, que
`git log` responde, **que el borrado está habilitado** y que `.git` es escribible.

**Comprueba `.git/index.lock` en los cinco repos con `ls`, nunca corriendo git.** En esta sesión
no apareció ni uno, con `--no-optional-locks` en todo comando y `add`/`commit` solos en su
llamada.

### DOS LÍMITES DE LA CABINA, RE-MEDIDOS Y PEORES DE LO QUE DECÍA EL RELEVO ANTERIOR

1. **EL TOPE POR LLAMADA SON ~178 SEGUNDOS, aunque se pidan 600.** El relevo decía que
   `webCorpusFixtureNet.test.mjs` «no cabe»; ahora se sabe **por qué**. Consecuencia diaria: la
   suite se mide **por lotes de 6**, y algún lote **hay que partir en dos** cuando crece.
2. **`--test-concurrency=1` NO ES OPCIONAL.** Sin él, la contención del sandbox produce **rojos
   falsos**: en esta sesión un lote dio **10 fallos** y el mismo lote con concurrencia 1 dio
   **214/214 verdes**. **Un rojo sin `--test-concurrency=1` no se publica: se vuelve a medir.**

### EL BORRADO SE PIDE Y FUNCIONA

Probado otra vez: `rm` falla con `Operation not permitted` y **se pide con la herramienta**, es
por carpeta y persiste. Nunca se reporta como imposible.

---

## ⚠⚠ LA VÍA DE ESCRITURA DEL CANÓNICO ES LA CONSOLA, NO EL CLI

Sigue vigente y sigue siendo lo que más tiempo ahorra.

    cd projects/aiw-console
    PC_PORT=4731 node project-console/serve.mjs > <ruta escribible>/pc.log 2>&1 &
    POST http://127.0.0.1:4731/projects/cantu-studio/__project-console/roadmap/edit
      { op, args:{...}, apply:false }                    # dry-run -> remap + baseline
      { op, args:{...}, apply:true, baseline }           # compare-and-swap

**`/tmp` NO ES ESCRIBIBLE** en esta sandbox: los logs y los ficheros auxiliares van a
`_scratch/`. Medido esta sesión, dos veces.

`serve.mjs` re-emite los 7 artefactos de `.project/` él solo. Los procesos en segundo plano no
sobreviven entre llamadas: **levanta el servidor y haz el POST en la misma llamada**; el
`baseline` sí sobrevive.

**Nombres de argumento verificados:** `set-status` → `run`, `status`, `closeoutResult` ·
`set-text` → `targetType:"run"`, `targetId`, `title`, `summary`, `fullDescription` · `insert` →
`runId`, `title`, `summary`, `fullDescription` + una de `after`/`before`/`endOfPhase` · `move` →
una de `after`/`before`/`toOrder`.

**El canónico es `.aiw/roadmap/roadmap.json`** — con `.aiw/`. `.project/roadmap.json` es la
proyección. Forma `objectives[].phases[].runs[]`: **no hay `runs` en la raíz**.

---

## QUÉ SIGUE — lo primero al abrir

**`#108` `RUN-CANTU-SLIDE-NARRATIVE-AUDIT-AND-IMPLEMENT-001` está `active` y NO SE CIERRA
todavía.** Su ronda 1 está entregada y commiteada (`7fa8819`), pero el operador encontró cuatro
cosas en Narrativa y **tres exigen tocar el motor**, que el plan de quince runs declara de sólo
lectura. **Lo primero de la sesión es llevarle esa decisión**, no emitir un ticket.

Su veredicto verbatim y las cuatro mediciones están en
`context/cantu-studio/records/VEREDICTO-108-NARRATIVA.md`.

`137 runs` · `completados 108` · `densidad 1..137` · `un solo activo` · canónico **`f46afb9b`**
(md5 del árbol de trabajo) al cerrar.

**Detrás, por orden:** `#109` Lista con etiquetas · `#110` Gráfico SVG · `#111` Video · y el
resto de la cadena de quince.

**Y hay DOS runs que no existen todavía y el operador ya pidió:**

1. **FUSIONAR** — hoy obliga a poner el componente en la esquina superior izquierda del área.
   Quiere que fusione **independientemente de la posición** si hay **un solo** componente, y que
   **prohíba** fusionar cuadrantes con más de uno. Toca el contrato de rejilla.
2. **LOS DOS ICONOS de la paleta** — el de «Portada» no lo asocia, y el de «Libre» lo quiere «un
   poquito más alto» (es `SlideGridGlyph`, un SVG propio, `rect` 20×12, ratio 1.67, que **él
   mismo eligió sobre opciones dibujadas**).

---

## LAS DOS REGLAS DE OPERACIÓN QUE PUSO ESTA SESIÓN — permanentes

**1 · NO SE LE RECUERDA EL PUSH.** Retira explícitamente el «toca push — N commits». Mientras la
cabina commitee, él hace los push. **No se menciona ni al cerrar sesión.** El commit sigue siendo
obligación de la cabina.

**2 · TODA PETICIÓN DE REVISIÓN VA EN LISTA NUMERADA DE PASOS CORTOS.** Un paso por línea, sin
párrafos con la instrucción dentro. **Es la tercera vez que pide algo de esta familia.**

---

## LA LECCIÓN MÁS CARA DE LA SESIÓN: cuando el juicio es VISUAL, entrega el INSTRUMENTO

Para fijar cuatro tamaños de la Portada la cabina gastó **tres entregables fallidos y tres
turnos**, cada uno ofreciendo **candidatos suyos**. El cuarto le dio **deslizadores sobre el
render real** y el operador cerró los cuatro números **de una vez**.

**Las tres causas, porque son de la misma familia:**

1. **Escala mal anclada.** Se escaló con `1rem = 24px`; en la diapositiva **`1rem` son 16px** —el
   24px de `#j-infinity-root` fija el `em`, no el `rem`, y está escrito en `comp_global.css`.
2. **El CSS del motor sobre la página del visor.** `comp_global.css` declara
   `body, html { height:100vh; overflow:hidden; display:flex }`. Inyectarlo en la propia página
   la colapsa. **Cada diapositiva va en un iframe con documento propio.**
3. **Orden de las hojas.** `renderTitleSlide` devuelve su `<style>` **pegado al `<section>`**, o
   sea en el `body`. Un override en el `<head>` **pierde** por orden. Va **al final del body**,
   y con **guarda que lo comprueba antes de escribir el fichero**.

---

## EL CICLO, Y UN PASO QUE LA CABINA SE SALTÓ

**Turno 1 — ABRIR Y ENCARGAR.** Derivar, dry-run `planned → active`, **aplicar**, verificar,
publicar el parte, y debajo el ticket.

**LA CABINA SE SALTÓ EL «APLICAR» UNA VEZ** y emitió el ticket con el run en `planned`. **La
guarda de aborto del propio ticket lo cazó**, el taller no tocó nada. Es la mejor prueba de que
esa guarda no es higiene: **está escrita para cazar al ticket, y cazó a quien lo escribió.**

**Turno 2 — MEDIR, COMMITEAR, ENTREGAR QA. EL RUN NO SE CIERRA AQUÍ.**

**Turno 3 — CERRAR con su veredicto, escribirlo a disco VERBATIM, y encadenar.**

---

## EL TALLER CONTRADIJO A LA CABINA EN **CINCO** RUNS SEGUIDOS, Y ACERTÓ LAS CINCO

**No es anécdota: es el mecanismo funcionando, y hay que seguir invitándolo en cada ticket.**

1. **`#105`** — «1536px son *exactamente* el `max-width` del título»: **falso**. El `80%` resuelve
   contra la caja de contenido (`1920 − 2·5rem = 1760`), o sea **1408px**. La cabina afirmó una
   identidad **sin preguntarse contra qué resuelve el porcentaje**.
2. **`#106` r1** — «las flechas ya calculan el destino con `moveOpenItemTo`»: **conflaciona dos
   funciones**. Calcula `slideGridNeighbourCell`; `moveOpenItemTo` sólo aplica. **El matiz decidió
   la mudanza.**
3. **`#106` r3** — la cabina le encontró a él una **incoherencia**: usó el peor caso del contrato
   (celda del 4×4) para decidir que el nombre no cabía, **en el mismo reporte donde ya había
   descartado el 4×4 por inalcanzable**. La celda real de plantilla es `171,67 × 143px`.
4. **`#107`** — «nueve o más llamadas a `setFlowDrafts`»: son **8 apariciones, 7 llamadas**; la
   octava está **dentro de un comentario**. Y había una **novena escritura que no es llamada** —el
   inicializador de `useState`— que la cabina no vio.
5. **`#108`** — contra **el plan**, no contra la cabina: la entrada R4 dice que `narrativeType` es
   el único campo motor-legible que falta, y **`dimmed`/`dimmedOpacity` también lo son**. El
   inventario 9.1 **se contradice dentro de su propia entrada**.

**El patrón de los fallos de la cabina es siempre el mismo: SONDAS QUE NO DISTINGUEN.** Código de
comentario, una función de otra, un porcentaje de su base. **Antes de publicar, pregúntate si la
sonda puede ver lo que buscas.**

---

## «CAPACIDAD EN EL MOTOR, CERRADA EN EL ESQUEMA» VA POR LA **OCTAVA** VEZ

`layout.rows`, coordenadas, tipos de lámina, tamaños, la Portada, el asterisco derivado del
esquema, el selector de tamaño reusable, y ahora **`dimmed` en los cinco tipos de ítem**.

**Cuando encuentres una capacidad cerrada, NÓMBRALA; no la abras por tu cuenta.**

**Y su gemelo, nuevo esta sesión: A VECES LA CAPACIDAD TAMPOCO ESTÁ EN EL MOTOR.** Los tamaños de
la Portada y los del título de Narrativa **no eran huecos de esquema**: eran CSS fijo. Antes de
prometer un selector, **mide si el motor sabe pintarlo**.

---

## LA SUITE

    node --test --test-concurrency=1 "tools/author-lite/compiler-api/tests/*.test.mjs" \
      "tools/dev/tests/*.test.mjs" "tools/roadmap/tests/*.test.mjs"

**Al cerrar: 1581 / 1576 pasan / 5 fallan.** compiler-api 1401 · dev 7 · roadmap 173.

**LOS CINCO FALLOS TIENEN TRES CAUSAS, NO UNA:**

1. **Dependencia huérfana** — `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` apunta a un
   run que no está en este canónico. **3 pruebas.**
2. **`clearProgress` B7** — no hay ningún run terminal con registro de progreso.
3. **`C5 [SENTINEL]`** — **exige CERO runs `active`**. **Se enciende y se apaga con el ciclo**, y
   esta sesión lo confirmó **dos veces seguidas prediciéndolo**: al cerrar `#104` bajó a 4, al
   abrir `#105` volvió a 5.

**Ninguno se toca. Si ves 4 en vez de 5, mira si hay run activo antes de celebrar nada.**

---

## LO QUE EL OPERADOR HA DICHO Y RIGE — sus palabras

> **«el titulo de la leccion y el del bloque de portada son diferentes, el titulo de portada toma
> como referencia el de leccion para llenarse la primera vez, pero no son el mismo campo»**

> **«yo no borro o modifico los archivos tu lo haces, y commiteas yo solo hago el push»**

> **«siempre antes de ponerme un ticket dime el modelo que recomiendas esfuerzo y si es la misma
> sesion o nueva»**

> **«el qa dame instrucciones mas claras, donde me meto para revisar eso, y que quieres que
> revise»** — y su forma definitiva: **lista numerada, pasos cortos.**

> **«siempre que cerremos sesion, me generas (actualizas) el handoff y el prompt de reinicio»**

**Y cuatro backticks** cuando un ticket lleve bloques de código dentro.

---

## ABIERTO Y SIN DUEÑO — nombrado, no reparado

- **`dimmed`/`dimmedOpacity`**: el motor los aplica a **cualquier** ítem, el esquema sólo los
  declara en la Tarjeta.
- **`handleDuplicateDraft`** guarda sin `scopeDraftToFlow` — inocuo hoy, propagaría la mezcla con
  un fichero anterior a `#106`.
- **La Portada sembrada estando en Web** desaparece del lienzo al primer cambio a Slide.
  **Conducta anterior a `#107`**, verificada idéntica con y sin acotar.
- **El tope del título vs el de la descripción** en la Portada: 1408 contra 1536px. Decisión del
  operador si deben igualarse.
- **La rama `isLessonGated`** de `RealPreviewPanel`, sin llamante.
- **Las tildes rotas** — UTF-8 doble en los dos gemelos del esquema.
- **`SlidePreviewPanel.jsx`**, muerto y sin retirar.
- **El alias `columns`**, que el motor lee y el esquema no conoce.
- **El build nunca limpia `dist/`** (pero `dist/` **no** está versionado: medido, 0 ficheros).

---

## SEIS RUNS SEGUIDOS SIN MÁS PRUEBA QUE EL OJO DEL OPERADOR

El proyecto **no tiene renderizador de React**. Toda la superficie visual del editor —Portada,
panel, mapa de rejilla, cruz de movimiento— lleva **seis runs consecutivos** sin cobertura
automática. **Se nombra en cada cierre para que el operador decida si acumula riesgo.**

---

## AL CERRAR SESIÓN

**El operador lo pidió y es permanente:** la cabina **actualiza este handoff Y entrega el prompt
de reinicio**, sin que se lo pidan. El prompt vive en
`context/cantu-studio/PROMPT-DE-REINICIO.md`.
