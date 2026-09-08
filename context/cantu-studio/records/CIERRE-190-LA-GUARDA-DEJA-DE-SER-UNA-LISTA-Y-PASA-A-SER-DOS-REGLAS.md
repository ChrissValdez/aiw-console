# CIERRE — `#190`: la guarda deja de ser una lista y pasa a ser dos reglas

**Fecha: 2026-09-07** · **Run:** `RUN-CANTU-DOCS-FLAT-PATH-SWEEP-001`
**Commit del trabajo:** `9b60a9de` · **Cerrado SIN QA de pantalla**, y se declara qué queda sin mirar

---

## Qué cierra

La **tercera y última** aparición del mismo defecto en esta sesión: un documento se movió de
`docs/X.md` a `docs/<subdirectorio>/X.md` y el puntero se quedó con la ruta plana.

| run | dónde lo arregló |
|---|---|
| `#187` | en la **vista de Docs** de la consola — 23 categorizados → 48 |
| `#189` | en la **prosa**, para dos rutas, y creó la guarda |
| **`#190`** | **la familia entera**, y convierte la guarda en regla |

---

## El censo, y por qué la cifra grande no era el trabajo

| | |
|---|---|
| referencias `docs/*.md` en todo el repo | 5 395 |
| que **no resuelven** | 3 734, repartidas en 272 ficheros |
| **de ellas, prosa viva** | **14 ficheros, 55 punteros muertos** |

De los 55: **50 repuntados**, **3 declarados sin destino**, **2 dejados intactos por ser dato y
no puntero**. Los 21 destinos se derivaron del disco y del mapa de disposición congelado.

**La diferencia entre 3 734 y 55 es el hallazgo**, no un descuento: casi todo lo que «no
resuelve» son records históricos y archivo, que citan la ruta que era cierta cuando se
escribieron. **Un record no se repunta — se lee con su fecha puesta.**

---

## ⚠ LA GUARDA DEJA DE LLEVAR NOMBRES

`legacyDocsPathSweep.test.mjs` pasa de nombrar rutas a llevar **dos reglas derivadas del disco
en cada ejecución, sin una sola excepción escrita a mano**:

- **R1 · ruta plana.** Descansa en la invariante medida de que **`docs/` no tiene ni un fichero
  en su raíz** — y **una prueba propia comprueba esa premisa**, para que si deja de ser cierta la
  regla se replantee en vez de ignorarse.
- **R2 · directorio muerto.** Una cita `docs/<dir>/…` cuyo `<dir>` no existe: cubre
  `docs/shared/`, `docs/ops/`, `docs/rewrite-dossiers/`.

**La separación entre las dos sale de la forma de la ruta, no de una lista.** Es el mismo patrón
que esta sesión lleva aplicando desde la cadena de las fórmulas: **una fuente derivada, no una
lista paralela que alguien tiene que acordarse de actualizar.**

Verificada con **7 inyecciones: 5 en rojo nombrando fichero y línea, 2 verdes a propósito** —
una demuestra que el punto ciego declarado es real, la otra que no hay ruido sobre el changelog.

---

## Lo verificado por la CABINA contra disco, no leyendo el reporte

| comprobación | resultado |
|---|---|
| rutas `docs/*.md` distintas citadas en los 12 ficheros de prosa | **34** |
| de ellas, **resuelven en disco** | **32** |
| no resuelven | **2**, y son dos de los tres huérfanos declarados: `docs/KB_INDEX.md` (README:59) y `docs/README.md` (README:60) |
| el tercer huérfano | `docs/project-console/run-protocol.md`, sigue citado en `docs/operations/OPERATIONS-RUN-PROTOCOL.md:91` — fichero que el taller **no tocó** |
| la guarda corrida sola | **9 de 9 en verde**: las 4 heredadas de `#189` + las 5 nuevas |
| finales de línea de los 13 ficheros | **100 % CRLF, línea por línea, ninguna mezclada** |
| `checkInvariants` sobre el canónico | **0 errores** — pero la frase con la que se publicó era falsa; ver la corrección de abajo |

---

## ⚠ UN ERROR DE LA CABINA, CAZADO Y CORREGIDO EN EL SITIO

La primera sonda comparó **el blob de `HEAD`, que este repo guarda normalizado a LF**, contra el
**árbol de trabajo, que es CRLF**. Devolvió **4 229 líneas cambiadas frente a 257** y marcó
`DIFIEREN` en doce de trece ficheros.

**Era falso, y era el reflejo exacto de la quinta forma de fallar: medir con la herramienta
equivocada.** Con una diferencia que merece quedar escrita — **esta vez produjo un ROJO, no un
verde.** La constitución avisa de los verdes porque nadie los cuestiona; este caso enseña que la
herramienta equivocada también fabrica alarmas, y una alarma falsa sobre el trabajo del taller es
tan cara como un verde falso.

El delator estuvo a la vista: **`AGENTS.md` daba 1 340 líneas cambiadas y el fichero tiene 670**
— exactamente el doble, que es lo que sale cuando *todas* las líneas cuentan como borrada y
añadida. Un fichero no cambia entero.

La comparación correcta da **257**, que **coincide byte a byte con la cifra del taller**. Y el
`git add` lo confirmó por el otro lado sin que nadie se lo pidiera:
*«warning: CRLF will be replaced by LF»*, doce veces.

---

## El taller rozó dos condiciones de parada y NO paró — la cabina respalda las dos

- **Condición 2.** Su censo encontró **9 ficheros de prosa viva que la cabina no había medido**,
  con 21 punteros muertos. La condición decía *«y es mucha»*. **Veintiún punteros de la misma
  forma, con destino derivable del mismo mapa, no son un cambio de alcance: son el alcance.**
- **Condición 3.** Hablaba de *un* puntero sin destino y aparecieron **tres**. Pero el criterio 2
  del propio ticket ya instruía para ese caso, literalmente: *«Lo mismo para cualquier otro que no
  exista en ningún sitio»*.

Y **verificó las dos cifras del ticket** en vez de creerlas: 33 rutas distintas, 17 muertas.

---

## La trampa de `_historical_run_record` saltó otra vez

El directorio existe, pero **los cuatro handoffs están en el archivado**. Es la misma trampa que
el ticket mandaba leer, y saltó igual. **Queda dicho por tercera vez.**

---

## Lo que queda SIN MIRAR, y es el segundo cierre seguido sin QA sobre documentación

Todo lo cambiado es prosa y una guarda, verificable contra disco, y la cabina lo verificó. **Lo
que ningún ojo humano ha mirado: si los 50 punteros repuntados llevan al documento que el lector
esperaba, y no solo a uno que existe.** La guarda comprueba **existencia, no pertinencia**.

**Se nombra explícitamente que son dos cierres seguidos sin QA sobre la misma superficie**
—`#189` y `#190`—, para que el operador decida si eso acumula riesgo.

---

## Suite

**2 390/0 → 2 395/0.** La guarda sola: **9/9**.

---

## ⚠ CORRECCIÓN — la segunda cifra falsa del mismo cierre, y esta se publicó

**Escrita el 2026-09-07, minutos después del cierre, al abrir `#191`.**

En el parte de `#190` y en el mensaje del commit `ea745bf9` la cabina publicó:

> `checkInvariants: 0 errores sin externalRunIds, que es la lectura más estricta`

**Las dos mitades son falsas.**

1. **La sonda no midió lo que dijo medir.** `checkInvariants` espera un **`Set`** en
   `externalRunIds` y la cabina le pasó un **array**. La rama que consulta esa colección hace
   `.has()`, así que **con un array habría lanzado** — y no lanzó, porque con el canónico de
   entonces **nunca llegó a esa rama**. El `0 errores` no era el resultado de la comprobación:
   era el resultado de no haberla alcanzado. Se destapó sola al abrir `#191`, cuando el mismo
   comando **sí** llegó a la rama y reventó con `externalRunIds.has is not a function`.
2. **«Sin `externalRunIds`» no es más estricto: es incorrecto.** Con el `Set` real, derivado del
   servidor, son **159 ids** y el resultado es **0 errores**. Con el `Set` vacío sale **1**, y ese
   uno es una **arista legítima** —`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` hacia
   `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`, que vive en otro proyecto—. Vaciar la colección no
   endurece la prueba: **fabrica un colgante donde no lo hay.**

**La cifra buena es `0 errores` con los 159 `externalRunIds` del servidor**, medida el 2026-09-07.
El número coincide por casualidad; el fundamento no, y el fundamento es lo que se publica.

**El commit `ea745bf9` queda con la frase falsa dentro.** No se reescribe historia: se corrige
hacia adelante, y esta es la corrección.

**Y es la misma forma de fallar dos veces en un solo cierre**, la quinta de la constitución —
medir con la herramienta equivocada. La primera vez fabricó un rojo (LF contra CRLF). La segunda
fabricó **un verde**, que es la peligrosa, **y encima lo vistió de rigor** llamándolo «la lectura
más estricta». La constitución avisa de los verdes; no avisaba de que la cabina los adorne.

