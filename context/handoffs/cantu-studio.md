# HANDOFF — hilo `cantu-studio` (el proyecto)

> Escrito por la cabina al cerrar la sesión del **2026-08-28**. **Sustituye al relevo del
> 2026-08-27**, cuyas cifras ya están obsoletas.
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el canónico al abrir. Gana el
> disco.**

---

## ⚠ LA LECCIÓN DE ESTA SESIÓN, Y VA PRIMERA PORQUE SE REPITIÓ CUATRO VECES

> **LA SONDA ES PARTE DE LA AFIRMACIÓN. UN RESULTADO SIN CONTROL POSITIVO NO ES UNA MEDICIÓN.**

Cuatro casos, todos de esta sesión:

1. **La cabina corrió una guarda con `vitest`** y obtuvo «no test suite found». **Iba a reportar
   que el fichero estaba vacío.** El control positivo sobre un test que ya existía **falló
   igual**: esta casa usa `node:test` en los 154 ficheros y **vitest devuelve ese error en
   TODOS**. Era la sonda.
2. **El taller de `#156` reportó «6 rutas sólo del autor»** y las retiró él mismo: su barrido
   inyectaba claves que el bloque no admite y la unión discriminada fallaba entera.
3. **El taller de `#157` midió el `<aside>` equivocado** —el riel izquierdo— y repitió la
   medición antes de publicarla.
4. **`#154` abrió con CUATRO de las cinco mediciones de la cabina falsas**, y el taller las
   desmontó sin escribir una línea de producción.

**LA REGLA QUE SALE:** antes de publicar un cero, **demostrar que la sonda vería el uno**. Se hizo
seis veces esta sesión y las seis pagaron.

**Y LA SEGUNDA LECCIÓN, DE `#154` Y `#157`:** *cuando la cabina nombra por el mecanismo, se
equivoca.* Puso «Tamaño máximo de las fórmulas» y el operador lo corrigió a **«Tamaño de la
fórmula»**: de siete filas medidas, **seis pintan el número exacto** — la cabina había puesto la
excepción en el sitio de la regla.

---

## ESTADO DEL CANÓNICO — medido el 2026-08-28 a las 21:47

| | |
|---|---|
| ruta | `projects/cantu-studio/.aiw/roadmap/roadmap.json` |
| md5 al cerrar | `d706fd872f00a507a814a804ac396085` |
| runs | **178**, `queue_order` denso `1..178`, ids únicos |
| `completed` | **162** · `active` **0** · `planned` **16** |
| validador | **0 errores**, motor de `aiw-console` (2 479 líneas), `externalRunIds` = 157 |
| `.project/` | re-emitido por `serve.mjs` en cada escritura |

### Lo que cerró esta sesión — CUATRO runs, todos con QA humana aprobada

| # | run | veredicto |
|---|---|---|
| **154** | per-step formula size | «jalo bien» + «si jalo estas» (dos rondas) |
| **155** | hide premath in single view | «pass» |
| **156** | mark the field the preview refuses on | «pass» |
| **157** | declare a stopped preview | «pass» |

### La cola: el siguiente es `#158`

`#158` **«Open a channel so the editor can show the size the page actually paints»** — el canal
para que el mando enseñe el valor **pintado** y no sólo el pedido. **Dos talleres midieron que NO
hacía falta para cerrar `#154`**, porque el operador aceptó por adelantado que al desbordarse el
mando diga un número que la pantalla no cumple. **Sigue siendo real y ahora es el primero.**

Después: `#163` auditoría de UX, `#164` historial por campo, `#166`/`#167` el registro de activos.

---

## ⚠ LO PRIMERO DE LA PRÓXIMA SESIÓN

**Nada urgente está a medias.** Los cuatro runs cerraron con QA y **no queda ningún `active`**.

**Lo que conviene decidir antes de encadenar `#158`:** si sigue teniendo sentido después de que
`#156` y `#157` cambiaran el vocabulario de «lo que el editor te dice» — ahora los campos se
marcan solos y la previa declara cuándo miente. **Medirlo antes de emitir el ticket.**

---

## LO QUE QUEDA VIVO Y ES DEL OPERADOR

Nombrado, medido, **sin run**:

- **El suelo de 14 px es de DECREMENTO, no un tope inferior.** La valla del esquema admite
  `0.5rem` y el taller midió **8 px pintados**: hoy el autor puede empequeñecer la fórmula por
  debajo del suelo. **Cerrado por D-071 con el default conservador —se queda— tras preguntarle
  dos veces sin respuesta.** Revertirlo es una línea en la valla.
- **Vaciar un campo de enum tira el error a la RAÍZ del bloque** y no marca ningún campo. **18
  casos**, igual antes que después de `#156`: **no es regresión**. Arreglarlo obligaría a
  rediseñar `erroresRealesDelBloque`.
- **Ensombrecer el dibujo de la previa.** Descartado **dos veces** por el operador —al elegir la
  cinta y al aprobarla—. **Compatible con la cinta** si algún día hace falta.
- **`renderStackSlide.js:772` tiene un ternario cuyas dos ramas son idénticas.** Nombrado **tres
  veces**, sin tocar: el guion del motor viaja DENTRO del HTML y los 63 árboles fijados lo
  capturan verbatim, así que una limpieza cosmética los movería.
- **`contentScale`** — palanca por paso sobre la fórmula grande que **APAGA el autoajuste**. Cero
  claves de zod, tres comentarios. **Se queda cerrada a propósito.**
- **El respaldo a nivel de BLOQUE del tamaño de fórmula.** El taller de `#154` opinó que debería
  existir **pero no como espejo del paso**, y que la pregunta real es si el bloque *sustituye* al
  paso para el caso común. **Es decisión del operador.**
- **Carrera latente con KaTeX** (preexistente): `fitFocus` mide antes de que KaTeX termine.
- **`StackSlideSchema.steps` no lleva** el `.superRefine` de «sólo el último paso puede ser
  resultado» que sí lleva el timeline de Web.
- **`automatico={false}`** en el montaje del `SizeStepper` es **prop muerta**.
- **El mapa `REFERENCE-SLIDE-WEB-COMPONENT-MAPPING.md` sigue con cuatro afirmaciones obsoletas**
  que cuatro runs seguidos han encontrado. **Sin run.**

---

## MÉTODOS QUE FUNCIONARON Y CONVIENE REUSAR

- **La PARADA DE ANÁLISIS pagó las dos veces que se usó.** En `#156` desmintió media premisa —el
  árbol de errores correcto ya se calculaba y se tiraba en la última línea— y en `#157` desmontó
  el síntoma entero. **Las dos ahorraron un taller cada una.**
- **Dibujarle las opciones.** En `#157` se le pusieron delante **tres tratamientos dibujados** y
  contestó en dos líneas, con el texto ya escrito. **Va quince veces.**
- **Empezar FOTOGRAFIANDO cuando la decisión se tomó sobre una reconstrucción.** `#157` lo hizo
  criterio 1: la cabina no ve interfaces, dedujo el comportamiento leyendo el fuente, y **el
  taller confirmó los cuatro puntos antes de escribir**. Si hubiera fallado, la decisión del
  operador se habría tomado sobre algo falso.
- **Guardas que EJECUTAN en vez de leer.** La de `#157` extrae la condición del fichero y la corre
  contra su tabla de verdad: no comprueba que la línea siga escrita igual, sino que **siga
  decidiendo igual**. Y recorta ramas **balanceando llaves**, no con dos regex cercanas.
- **Verificación por MUTACIÓN con restauración garantizada.** `#155` 6/6, `#157` 9/9.
- **La prueba de «cero borrados» como argumento.** `erroresDelFormulario.js` salió **+81/−0**: eso
  demuestra que la función original está intacta sin leer una línea del diff.
- **Balance de paréntesis para verificar dónde CIERRA un envoltorio JSX.** En `#155` era la
  comprobación que más importaba: si el cierre caía 7 líneas más abajo, el paso de resultado se
  quedaba sin su única fórmula.
- **Montar un banco FUERA del repo con las librerías reales** cuando no hay jsdom. `#155` probó
  así que esconder un campo no borra el dato.

### ⚠ CÓMO FABRICAR UN BORRADOR INVÁLIDO — costó dos intentos, no lo redescubras

- **Un bloque nuevo NACE VÁLIDO.** Probado contra el esquema: sus tres pasos vienen rellenos.
- **«Insertar JSON» NO SIRVE.** Valida con el mismo esquema y rechaza en la puerta — medido:
  `{"ok":false,"errors":["Bloque 1 (stackSlide) — steps.1.math: Este campo es obligatorio"]}`.
- **LA PUERTA QUE SIRVE ES LA RANURA DEL BORRADOR**, que hace `reset()` sin validar: se escribe el
  borrador en `jame_draft_buffer_slide` desde la consola, se recarga y se pulsa **«Restaurar
  Borrador»**. **Verificar antes de entregarlo que falla por la ruta que se quiere y sólo por
  ésa**, y que `hasUsefulDraftBuffer` daría verdadero.
- **Siempre en una SEGUNDA INSTANCIA en otro puerto** — otro origen, otro almacenamiento.
  `npm run dev -- --port 5199` desde `editor-ui`. **`vite.config.js` NO fija `strictPort`**: si el
  puerto está ocupado Vite se va al siguiente sin avisar, y acabas pegando en un origen y mirando
  otro. **Leer el puerto que imprime.**

---

## EL VEHÍCULO PARA ESCRIBIR EL CANÓNICO — usado **nueve veces** el 2026-08-28, sin un fallo

**El CLI de `cantu-studio` no escribe.** La vía es la consola:

```
cd projects/aiw-console && node project-console/serve.mjs      # arranca SIEMPRE en 8788; --port se ignora
POST http://127.0.0.1:8788/projects/cantu-studio/__project-console/roadmap/edit
     { op, args, apply:false }            → devuelve baseline y remap
     { op, args, apply:true, baseline }   → aplica
```

**⚠ EL SERVIDOR NO SOBREVIVE ENTRE LLAMADAS DE BASH.** Hay que levantarlo y hacer el POST **en la
misma llamada**. Esperar con `curl` en bucle, no con `sleep` a ciegas.

**Ops usadas:** `set-status {run, status, closeoutResult}`, `set-text {targetType:'run', targetId,
title?, summary?, fullDescription?}`, `insert {runId, title, summary, fullDescription, before}`.

**`set-text` ACEPTA `title` en los runs** — comprobado en el motor. Sirvió para **estrechar el
título de `#156` sin destruir su `run_id`**, que seguía siendo verdad.

### `checkInvariants` y `externalRunIds`

**`externalRunIdsFor` NO se exporta desde `roadmap-core.mjs`: vive en `project-console/serve.mjs`.**

```js
import { checkInvariants } from '.../tools/roadmap/roadmap-core.mjs';
import { externalRunIdsFor } from '.../project-console/serve.mjs';
const ext = await externalRunIdsFor('cantu-studio');
checkInvariants(obj, { externalRunIds: ext });
```

### Los runs NO viven en la raíz

Se recorre `objectives[].phases[].runs[]`. Leer `obj.runs` devuelve **0**, que es una sonda mal
escrita y no un canónico vacío.

---

## LÍMITES DE LA CABINA — RE-MEDIDOS EL 2026-08-28

- **`add` y `commit` funcionan. CERO locks** en toda la sesión, en más de treinta operaciones.
- **`git push`: sin ruta a GitHub. Es del operador. NO SE LE RECUERDA. NUNCA.**
- **Tope de una llamada de bash: ~120 s en esta sesión.** **Un `git status`/`diff` sin acotar en
  `cantu-studio` lo revienta** — pasó una vez; se comprobó el lock en los cinco repos antes de
  seguir y no había. **Acotar siempre con `-- ruta` y `-uno`/`-uall`.**
- **La suite completa NO cabe.** Correr los ficheros que el run tocó sí, y basta para el delta.
- **La cabina NO VE INTERFACES.** Todo juicio visual es del operador. **Cuando haya que
  enseñarle algo, dibujárselo** — funciona.
- **`_scratch/` NO es todo de la cabina.** Se borra lo suyo y se lista lo que no.

---

## REGLAS DEL OPERADOR VIGENTES

- **D-070** — ticket de run nuevo → sesión nueva. **Suspendido desde el 2026-08-27 por petición
  suya**; dijo «yo te aviso cuando toque reiniciar el hilo». **Siguió suspendido toda esta
  sesión.** La recomendación de sesión **se declara igual, por sus méritos.**
- **D-071** — la decisión no crítica la toma la cabina y **la explica al tomarla**. Se usó en el
  cierre de `#154` para las dos líneas que no contestó.
- **D-061** — ampliar el alcance sólo por veredicto humano, con las cuatro condiciones **escritas
  una a una dentro del run**. Se usó en `#154` y **la tercera salió sin tensión**.
- **Identidad:** cuando el alcance que sale lo describía el **título**, se estrecha el título y
  el `run_id` se queda —hecho en `#156`—. **Cuando lo describe el `run_id`, se cierra y se abre
  otro.** No se enmienda un identificador.
- **SIEMPRE se declara MODELO + ESFUERZO + SESIÓN antes de un ticket**, juntos.
- **El operador decide cuándo se cierra la sesión.**
- **Toda petición de revisión en lista numerada de pasos cortos**, con el nombre que él ve en
  pantalla, y **con el formato literal de respuesta que se le pide**.
- **Las decisiones que no son pasos van numeradas aparte y con recomendación explícita.**
- **Mensajes de commit y textos largos POR FICHERO**, nunca por línea de shell.
- **`add` dirigido por nombre, nunca `-A`. El trabajo del taller y el cierre del roadmap van en
  commits SEPARADOS.**
- **El taller nunca toca git.** La cabina commitea; el operador publica.
- **La ranura del operador (`localhost:5173`) no se toca**, y **`preview_start` no se llama**: ha
  navegado solo a su editor dos veces. El taller de `#157` fotografió con **Chrome de perfil
  propio por CDP** sobre una segunda instancia — doble aislamiento, y funcionó.
