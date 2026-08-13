# MODELO DE VEREDICTO — DOS EN EL ÍTEM, TRES EN EL RUN

`RUN-CONSOLE-VERDICT-MODEL-001` — «The verdict model: two tokens on an item, three on the run,
and the disposition that says it is fixed here» (`queue_order` 54, derivado del roadmap por
orden y verificado contra el título exacto antes de empezar; no se tecleó el id).

**Todas las cifras son mediciones fechadas del 2026-08-11**, salvo la del defecto de `stopped`,
que el encargo fechó el 2026-08-10 y aquí se re-midió idéntica antes de tocar nada.

---

## A. Qué se entregó, y dónde

| Pieza | Ruta |
|---|---|
| Los dos vocabularios, la cuarta disposición, la guarda y `stopped` derivado | `project-console/assets/run-report-renderer.js` |
| El motivo escrito de la guarda (`.rr-guard-reason`) | `project-console/assets/run-report-renderer.css` |
| Suite del modelo: las tres situaciones de la guarda y `stopped` | `tests/run-report-verdict-model.test.mjs` (9 tests) |
| La cuarta disposición en los datos de ejemplo | `tests/fixtures/reports/CASO-{2,3,4}-*.report.json`, `tests/fixtures/reports-volume/CASO-2-volumen-28.report.json` |
| Copias QA byte-idénticas (pin de `reports-qa-fixture.test.mjs`) | `tests/fixtures/reports-qa/reports/RUN-QA-REPORT-{DEVELOPMENT,LESSON,MECHANICAL,VOLUME}-001/report.json` |
| Dos afirmaciones que seguían al código que miden, actualizadas | `tests/run-report-renderer.test.mjs`, `tests/run-report-domain-blind.test.mjs` |

**El montaje del `#53` NO SE TOCÓ** (§F). `roadmap/roadmap.json` y los siete de `.project/`
salen como entraron: cero escrituras, cero CRLF re-verificado al cierre. Nada de git.

---

## B. LA LISTA ÚNICA: qué la consumía (criterio 1, medido antes de cortar)

`RR_VERDICTS = ["APPROVED","CHANGES_REQUIRED","BLOCKED"]` vivía en
`run-report-renderer.js:25` y la consumían **cuatro sitios**:

1. `run-report-renderer.js:344` — `rrVerdictBarHtml`, la barra ÚNICA que pintaba los botones
   de veredicto para el ítem (l.526), la decisión del ejecutor (l.581) **y** el run (l.620).
   El mismo array servía las dos preguntas distintas.
2. `run-report-renderer.js:604` — el recuento de la tarjeta del run
   (`RR_VERDICTS.concat([pendiente])`), que solo cuenta pasos que NO son el run.
3. `tests/run-report-domain-blind.test.mjs:101` — pin estructural del array literal.
4. `tests/run-report-renderer.test.mjs:97` — afirmaba los tres tokens ofrecidos sobre la
   PRIMERA tarjeta, que es un ítem.

El montaje del `#53` no la consumía: no parsea el reporte y los bytes viajan intactos.

**Ahora son dos listas** (`run-report-renderer.js:35-36`): `RR_ITEM_VERDICTS` con dos tokens
para ítems y decisiones, `RR_RUN_VERDICTS` con tres para el run. La barra recibe el vocabulario
del paso como parámetro; el recuento itera la del ítem, que es lo único que cuenta.

---

## C. POR QUÉ `BLOCKED` NO SE PIERDE EN EL ÍTEM (criterio 2)

`BLOCKED` en el ítem era redundante POR CONSTRUCCIÓN, y el record lo deja medido:

- **Que algo detenga todo lo declara el EMISOR**, no el operador: `stop: true`, y hay
  exactamente **cuatro ítems así en los fixtures** (R1 y R2 de CASO-1, D1 de CASO-2, K3 de
  CASO-3 — medido con grep antes de cortar).
- **La consecuencia se deriva, nunca se elige**: un ítem `stop` no aprobado ya bloquea el run,
  y desde este run eso queda ESCRITO en el veredicto (`stopped: true`, §E) — antes ni siquiera
  se emitía, con lo que el token `BLOCKED` del ítem ni registraba esa información.
- **El run conserva su `BLOCKED`**, donde significa lo suyo: este run no puede cerrarse. Es
  además el único de los tres tokens que el kernel parsea a nivel de RUN
  (`aiw/kernel.mjs:213`, `parseVerdict`: la escalera del supervisor) — separar el ítem no toca
  nada que el kernel lea.

No apareció ningún caso que este ticket no contemplara: no había en el código ni en los
fixtures un solo uso de `BLOCKED` como dato de ítem (era solo un botón que la barra ofrecía).

---

## D. LA CUARTA DISPOSICIÓN: `this_run`, y por qué ese nombre (criterio 4)

Las tres que existían — `new_run`, `operator_fixed`, `discard` — **nombran el destino del
arreglo**, y las tres lo mandan fuera. La cuarta sigue la misma gramática y nombra el destino
que faltaba: **`this_run`** — el arreglo es del run que se está juzgando.

La razón del nombre es la **oposición exacta con `new_run`**: dentro de un `verdict.json`, el
par `new_run`/`this_run` se explica solo — el arreglo viaja a un run nuevo, o se queda en
este. `fix_here` u `owed_here` describían la consecuencia y no el destino, y rompían la serie.
La sugerencia del ticket se adopta porque la simetría la gana, no porque viniera sugerida.

En `RR_DEFAULT_DISPOSITIONS` va primera: la serie queda ordenada por cercanía (este run, un
run nuevo, las manos del operador, la papelera). Glosa en las dos lenguas del chrome
(«this run fixes it» / «este run lo arregla»).

**Decisión del criterio 9, declarada:** los fixtures SÍ se actualizan. Los tres CASO que
curaban `verdict_disposition_options` (CASO-2, CASO-3, CASO-4) y las cinco listas del fixture
de volumen llevan ahora `this_run` delante, y sus copias QA se re-sincronizaron byte a byte
(el pin de `reports-qa-fixture.test.mjs` lo exige y quedó en verde). Sin esto, ningún test
ejercitaba la cuarta desde DATOS del reporte: solo desde los defaults del renderizador. Se
midió en navegador, antes de actualizar el de volumen, que un reporte que cura las tres viejas
sigue siendo legal y simplemente no ofrece la cuarta — los datos del reporte mandan.

---

## E. LA GUARDA (criterio 5) y `stopped` (criterio 6)

**La guarda es una GUARDA, no una agregación.** El veredicto del run NUNCA se calcula desde
los ítems: `rrRunApprovedGuard` (renderer) solo responde si APPROVED firmaría una
contradicción, y con qué palabras. Un run puede ser APPROVED con pasos en `CHANGES_REQUIRED`
únicamente si **cada uno lleva disposición Y ninguna es `this_run`**. Si no:

- el botón APPROVED del run queda `disabled` **con el motivo escrito al lado**
  (`.rr-guard-reason`): «APPROVED is not available for the run: 1 change still carries no
  disposition.» / «…: 1 fix is owed to this run itself.» — en la lengua del chrome del momento;
- el manejador de click lo **rehúsa en el modelo**, no solo en la pintura (un click sintético
  sobre el botón deshabilitado no registra nada — probado);
- y si el APPROVED es ANTERIOR a la contradicción, la firma se rehúsa (`rrSignBlocks`), el
  motivo aparece en el aviso de la firma, y el APPROVED seleccionado **sigue clicable** para
  retirarlo — resolver es del operador, la interfaz solo impide firmar.

La guarda lee la **disposición efectiva** — la del botón o la tecleada en «escribe otra…»
(`rrEffectiveDisposition`, compartida con la salida): teclear `this_run` a mano retiene igual,
y solo espacios NO es una disposición (antes la salida emitía `""`; ahora `null`, y la guarda
lo cuenta como falta). Cubre ítems Y decisiones del ejecutor: son pasos firmables con la misma
maquinaria de disposición, y dejarlos fuera habría dejado firmar la contradicción por ahí.

**Los tres tests que el criterio exige**, en `tests/run-report-verdict-model.test.mjs`:

| Situación | Test |
|---|---|
| Todo aprobado → APPROVED disponible y la firma completa | `guard 1/3` |
| Ítems corregidos hacia adelante (las tres viejas) → APPROVED coherente | `guard 2/3` |
| Un arreglo debido aquí, o sin disposición → APPROVED retenido, con motivo escrito, click rehusado, y liberación al re-enrutar | `guard 3/3` |

Más tres al borde: `this_run` tecleado retiene igual; el APPROVED anterior a la contradicción
no firma y puede retirarse; el motivo habla la lengua del momento.

**`stopped` — el defecto medido, reparado.** Re-medido antes de tocar: **cero** apariciones de
`stopped` en renderizador y montaje contra **veinte** de `stop`. Ahora `rrStopped` deriva y
`rrVerdictOutput` lo emite (tras `decided_at`, como el ejemplo del contrato): `true` si y solo
si un ítem con `stop: true` lleva `CHANGES_REQUIRED`. Con dos tokens en el ítem, «rechazado»
es exactamente eso, que es la letra del contrato («cuando el operador rechazó un ítem stop»);
un `stop` pendiente no ha sido rechazado y `stopped` se queda en `false` — y en el momento de
la firma las dos lecturas convergen, porque la compuerta exige todos los veredictos. No hay
control en la superficie que lo toque (test estructural incluido); el operador lo ve derivarse
en la vista previa del JSON antes de firmar. La persistencia sigue siendo del `#55`.

---

## F. LO QUE NO CAMBIÓ, LO QUE SIGUE EN VERDE, Y LO QUE SOLO SE NOMBRA

**El renderizador sigue ciego al dominio (criterio 7).** El veto de 94 tokens corre intacto y
en verde sobre JS y CSS; ningún cambio exigió conocimiento de dominio. El corolario
estructural del mismo fichero (`run-report-domain-blind.test.mjs:101`) afijaba el array único
literal: se actualizó para afijar los DOS arrays nuevos, porque ese pin sigue al código que
mide — el veto de tokens no se tocó. Igual con `run-report-renderer.test.mjs:97`, que afirmaba
tres tokens sobre una tarjeta de ítem: ahora afirma dos en el ítem y tres en el run.

**El montaje del `#53` funciona sin tocarse (criterio 10).** No asume tokens: no parsea el
reporte (los bytes van del fetch al renderizador intactos). Sus 21 tests + los 13 de la ruta
en verde, y humo en navegador real con los fixtures QA: capa abierta desde el detalle del run,
tarjetas de ítem con dos tokens (ningún `BLOCKED` en ítem), APPROVED del run retenido con su
motivo pintado y estilado, `"stopped": true` en la vista previa con el `stop` rechazado.

**Criterio 8, verificado por los pins existentes que siguen en verde:** la disposición solo
aparece con `CHANGES_REQUIRED` (también en el run, cuyo comportamiento no se tocó);
`chosen_option` sigue siendo un dato aparte; no existe «aprobar todo» en ninguna lengua; el
firmante nace vacío y solo existe tecleado.

**Suite (criterio 11).** Base re-verificada antes de cortar: **634/633/1**. Al cierre:
**643/642/1** — nueve tests nuevos, cero fallos nuevos, y el único rojo sigue siendo el pin de
`classification-care-budget.test.mjs:153`, que no se repara y no es gatillo.

**El contrato de CQL se leyó entero y solo se nombra (criterio 12).**
`projects/cantu-quizzes-latex/docs/CONTRATO-REPORTE-DE-CAMBIOS-v1.md`, rev.5: su **§7 todavía
dice `ok | no | duda`** como vocabulario del `verdict.json` de esa cabina. Esa enmienda es de
su hilo y aquí no se toca. Nada del contrato resultó incompatible: la regla 5 del §7 es
literalmente lo que `stopped` deriva, y el reparto del §15 ya muda renderizador e índice a
esta consola. Ninguna de las tres condiciones de PARA-Y-REPORTA se dio.

**Dos punteros de cola desfasados, corregidos de paso y declarados:** los comentarios del
renderizador decían «#54 adds the endpoint» — escrito cuando el endpoint ERA el 54. La
inserción de este run lo corrió al `#55`, y los dos comentarios (cabecera y `rrVerdictOutput`)
lo dicen ahora. El código de esos puntos no cambió de conducta.
