# VEREDICTO — `#158` se cierra: el mando MARCA, no MIDE

> Registro escrito por la cabina el **2026-08-28**. Recoge la decisión del operador
> **Christopher Valdez Cantu**, el paquete del taller, y **cuatro cifras falsas de la cabina
> que el taller corrigió**.

---

## LA DECISIÓN DEL OPERADOR — VERBATIM

Sobre tres opciones dibujadas y con la recomendación explícita de la cabina, el operador
contestó, **verbatim**:

> **«d»**

Opción **D — MARCAR, NO MEDIR**: el mando de tamaño no enseña el número que la página pinta.
**Declara que el tamaño elegido no se cumplió.**

Las otras dos, y por qué no:

- **E — contrato primero.** Correcta y es su propia regla, pero **solo si de verdad quiere el
  px**. Con el aviso, el contrato deja de hacer falta.
- **F — seguir con B.** Le devolvía la decisión difícil de todos modos, solo que después de
  gastar un taller.

**Razón de D, y es del propio operador, escrita en el run anterior:** *«un mando que dice un
número que la pantalla no cumple es la clase de defecto que llevo toda la sesión vetando»*.
**El defecto es la mentira, no la ausencia del número.**

Y habla el mismo idioma que los dos runs anteriores: `#156` marca el campo que la previa
rechaza, `#157` declara que el dibujo conservado ya no corresponde, y este declara que el
tamaño pedido no se respetó. **Tres runs, un vocabulario.**

### Decisiones que la cabina tomó bajo D-071, y las explica

El operador contestó solo a la primera pregunta. Las otras dos las tomó la cabina:

1. **El aviso es SOLO MARCA, sin texto nuevo.** Precedente: el operador escribió él mismo el
   texto de la cinta de `#157` **después de verla**, y ese orden funcionó. Cuando la marca
   esté en pantalla, se le pedirá el texto a él.
2. **Este registro se escribe.** Cuatro cifras corregidas y el hallazgo del `focusCard` valen
   más que el chat donde nacieron.

---

## POR QUÉ SE CIERRA EL RUN EN VEZ DE ENMENDARLO

El `run_id` era `RUN-CANTU-EDITOR-SHOWS-THE-PAINTED-SIZE-001` y **describía el alcance**. Con
D, «enseñar el tamaño pintado» deja de ser lo que el run hace.

Regla de la casa, aplicada: **cuando el alcance lo describe el `run_id`, el run se cierra y se
abre otro.** Un identificador no se enmienda sin destruir y recrear, así que enmendarlo dejaría
la identidad mintiendo en todos los records futuros. Contrasta con `#156`, donde el alcance lo
describía el **título** y bastó estrecharlo.

Continúa en **`RUN-CANTU-EDITOR-SIZE-SHRINK-IS-DECLARED-001`**, `queue_order` **163**.

---

## EL HALLAZGO QUE CAMBIÓ LA PREGUNTA

Medido por la cabina el 2026-08-28 al verificar el paquete del taller, en
`src/builders/slides/layouts/renderStackSlide.js`:

- **`fitFocus`** (~`:817`) ajusta **`focusCard`** — **una sola** tarjeta — con el techo del
  autor.
- **`fitHistory`** (~`:902`) ajusta los `.j-history-item` con **otro tope**:
  `historyCapPx()` = `1.6 * rootFont` ≈ **25,6 px**, con suelo propio `HISTORY_FLOOR_PX` = 12.
  **Ese tope ignora el tamaño que el autor eligió.**

> **El mando es por paso. El «tamaño pintado» solo existe para el paso enfocado, y depende de
> dónde esté la previa, no de cuál se está editando.** Un canal que emita el factor no
> responde la pregunta que hace el mando: para la mayoría de los pasos no hay respuesta.

Eso es del **contrato**, no del transporte, y **ninguno de los tres caminos lo tocaba**. Es lo
que hizo insuficientes a A, B y F a la vez.

**Y queda vivo como riesgo de D**, escrito como condición de parada dentro del run nuevo: si el
booleano «tu tamaño se cumplió» solo es computable para el paso enfocado, hay que decidir qué
dice el mando de los demás — y esa decisión vuelve al operador.

---

## ⚠ CUATRO CIFRAS DE LA CABINA ERAN FALSAS — el taller las corrigió, la cabina las verificó

| Lo que la cabina publicó en el ticket | Lo medido | De dónde salió el error |
|---|---|---|
| «**63** árboles fijados capturan el guion verbatim» | **3** | 63 es el nº de ficheros de `corpus/` en `compiler-api/tests/fixtures` (66 = 63 corpus + 3 webRenderHarness). Contó la **carpeta** |
| «hay **UN SOLO** productor: `fitEngine`» | **cuatro** motores, **dos** vocabularios | La sonda buscaba **una** clave y su resultado se leyó como «productores» |
| «**22** montajes de `SizeStepper`» | **21** | El 22º es `<SizeStepperCampo`, subcomponente interno del propio mando |
| control positivo: «otros **cinco** ficheros» | **16** | `head -5` en la sonda, y la lista truncada leída como completa |

**Los cuatro productores, medidos:** `fitEngine` (`data-geometry-fit`, 14) · `renderArithmetic`
(`data-arith-fit`, 5) · `renderStackSlide` (**no emite**) · `renderTable` (**no emite**).

**La del 63 tuvo consecuencia real:** se le vendió al operador «tocar el stack mueve 63
árboles» como el coste principal de la opción B. **Mueve 3**, y enganchar en `fitEngine` mueve
**0**. Si esa cifra hubiera pesado en su elección, habría elegido sobre algo falso.

**La del control positivo es la peor:** es literalmente el corolario escrito en las reglas de
la cabina —*una lista truncada leída como completa*— cometido **en la sonda que existía para
demostrar que otra sonda era fiable**.

---

## DONDE LA CABINA DISCREPA DEL TALLER, Y ESTÁ MEDIDO

El taller tituló: **«la mitad emisora del camino 2 ya está construida»**. **Es un exceso.**

Lo que le concedemos entero: el titular de la cabina **«HOY NO EXISTE NINGÚN CANAL» era
falso**. `src/builders/web/partials/renderLayout.js` tiene un protocolo `postMessage`
previa→padre **en producción**: escucha `JAME_A11Y_INIT` (~`:140`), emite `JAME_A11Y_UPDATE`
(~`:168`) y `JAME_A11Y_READY` (~`:200`), con guarda `if (window.parent !== window)`.

Pero, medido:

- `renderLayout` **solo lo usa `web/buildSingleWebLesson.js`**. Es **carril Web** y **no se
  inyecta en la previa de diapositiva**, que es donde vive el mando.
- **`finalScale` no es el factor de ajuste.** Es `jame_global_font_scale`: el **zoom de
  accesibilidad del lector**, acotado 0,8–1,3, disparado **al pulsar un botón**. El comentario
  del código lo dice: `// Ruta B (Moodle)`.
- **Nadie escucha**: cero `JAME_A11Y` en todo `editor-ui/src`.

> **Lo construido es el precedente del transporte, no medio canal.** Baja el riesgo del camino
> 2 de «inventar» a «copiar un patrón probado». No adelanta trabajo.

---

## LO QUE QUEDA MEDIDO Y NO SE REDESCUBRE

- **Camino 3 —emitir el factor en el marcado— DESCARTADO CON PRUEBA.** El factor sale de
  `scrollWidth/clientWidth` y `getComputedStyle`, y las pasadas re-corren en `fonts.ready`,
  `resize` y mutación: **el mismo marcado da factores distintos en la misma página**. Si algún
  día vuelve la pregunta del número pintado, este camino ya está cerrado.
- **Camino 1 —proxy—** sigue vivo: quita el `SecurityError` pero compra **acceso, no dato**, y
  tropieza con **5 `http://localhost:3000` cableados** en `editor-ui/src`.
- **Enganchar en `fitEngine.pasada()`** (~`:438-454`) mueve **0 árboles** y sirve a **9 de los
  21 montajes** — **no a los tres del `SlideStackEditor`, que son los que abrieron el run**.
- **Las celdas de rejilla no tienen identificador**, y ponérselo movía **+15 árboles**. D
  existe en parte para no pagar eso.

---

## CIERRE SIN QA — SE DECLARA

`#158` cerró **sin QA humana**. Es legítimo: el encargo era de medición, **no se escribió una
línea de producción** —guarda vacía para `src/` y `tools/`, HEAD sin mover en `5de823eb`— y
todo lo cambiado es verificable contra disco, verificado por la cabina.

**Superficie que queda sin mirar: ninguna.**

**Es el primer cierre sin QA de esta serie:** `#154`, `#155`, `#156` y `#157` cerraron los
cuatro con QA humana aprobada. No hay dos seguidos.

---

## FUENTES

- Paquete del taller:
  `QA/temp/RUN-CANTU-EDITOR-SHOWS-THE-PAINTED-SIZE-001/ENCUADRE-DE-LOS-TRES-CAMINOS.md`
  (en `cantu-studio`)
- `closeout_result` de `RUN-CANTU-EDITOR-SHOWS-THE-PAINTED-SIZE-001` en
  `.aiw/roadmap/roadmap.json`
