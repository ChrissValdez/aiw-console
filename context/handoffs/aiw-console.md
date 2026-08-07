# Relevo — hilo `aiw-console`

**Fecha:** 2026-08-06 (cierre de tarde) · **Sustituye** al relevo del 2026-08-06 (mañana).
**Primera sesión en modalidad COWORK CONECTADO.** La siguiente arranca **en una laptop
nueva**: lee «§9 MIGRACIÓN» ANTES que nada.

La sustancia va DENTRO. Los punteros a records son procedencia, no respuesta.

---

## 1. DÓNDE ESTAMOS

**El `#48` «Batches in the roadmap schema, with the branch they determine» está `active`,
ENTREGADO por el taller y SIN QA.** `CRITICAL` · `SEMI_ATTENDED`.

**Su trabajo está en disco y NO COMMITEADO al cerrar esta sesión** (a menos que el bloque
de Git de §9 se haya corrido; verifícalo midiendo, no lo supongas). Cinco ficheros
modificados y siete sin rastrear — la lista exacta en §9.

**Lo que falta para cerrarlo son 3 pasos de QA de NO-REGRESIÓN**, y hay una trampa que
cuesta una vuelta entera si no se sabe:

> **El selector de lotes NO se dibuja en `aiw-console`, y ESO ES LO CORRECTO.**
> `renderBatchSelector` elimina su slot si el proyecto no declara lotes, y este canónico
> no declara ninguno porque el ticket prohibió poblarlo. Pedir «revisa el selector» manda
> al operador a mirar algo que por construcción no está.

**Los 3 pasos, ejecutables tal cual.** Reiniciar el proceso (`start-console.cmd`), no
recargar el navegador:

1. **PARADA.** Barra superior del árbol del Roadmap: **un solo** desplegable, el de
   carriles («Lane»). **Ningún** «Batch». Si aparece un «Batch», el selector se pinta sin
   vocabulario: defecto del `#48`.
2. Usar el desplegable de carriles (elegir uno, volver a «All»). Debe filtrar igual que
   siempre. Si falla, el filtro compuesto del `#48` rompió el de carriles.
3. Run Queue y árbol: `#48` en `active` con chips `CRITICAL` + `SEMI_ATTENDED`; el `#47`
   cerrado. Regresión de render si no.

**Con `PASA` en los tres, el cierre es `set-status active → completed`** con
`closeout_result` a decidir según los veredictos.

**Nadie ha visto NUNCA el selector de lotes en un navegador.** Está probado contra el
renderer real en `node:vm` —opciones, conteos, filtro en las dos superficies, reset— pero
eso no es un browser. Layout y CSS quedan pendientes. **Decisión tomada esta sesión: NO se
declara un lote de prueba en el canónico solo para mirarlo** —deja rastro en un fichero que
tres hilos leen— y se deja que lo cubra el `#50`, que ya trae QA visual de consola.

---

## 2. LO QUE ESTA SESIÓN ENTREGÓ

**El `#47` cerró con `closeout_result: "done with deviations"`.** Registro de fontanería de
campos opcionales de run + chip de `closure_mode` junto a `severity` en la fila.
**Absorbió 9 sitios de 17, no los 10 previstos:** `V3_BATCHABLE_OPS` no entra porque
`tests/depends-on-human-approved.test.mjs:341` lo pinea como TEXTO FUENTE y ese fichero
estaba fuera de alcance. **Cuesta UNA edición** y es trabajo de un run que lo tenga dentro.

**El `#48` construyó los lotes**: vocabulario `root.batches` con entradas
`{batch_id, title, branch}`, clave opcional `batch` en el run, ops `declare-batches` (no
batchable) y `set-batch` (batchable), transporte verbatim en el proyector, y desplegable en
la consola junto al de carriles. El invariante del interbloqueo vive en `checkInvariants` y
se prueba en LAS DOS direcciones sobre `tests/fixtures/batches/`.

**La frontera con `aiw` quedó escrita**, con seis puntos de aquel lado: leer el
vocabulario, resolver la rama del lote, apilar commits, el merge humano único al final,
dónde parar el dispatch, y dónde registrar la aprobación. **Nada de lo entregado ejecuta la
rama: la transporta.**

---

## 3. CIFRAS MEDIDAS, con su unidad

**Un campo opcional de run de la clase `lane` —vocabulario en raíz + clave + selector—
cuesta 23 SITIOS en 4 archivos.** La predicción del `#47` era **11**, y no era falsa: era
para la clase «lista de referencias con op propia», que es otra. El registro absorbió
**2 filas de ops donde la forma pre-registro cobraba 6 sitios**; los otros 21 no los cubre
ningún registro. **El registro NO estorbó en ningún punto** — medido y reportado, que es la
mitad del valor de haberlo estrenado.

**El precedente de los carriles, re-medido hoy: 8 archivos de código, 375 sitios `lane`,
488 con `barrier`, 29 de test.** Creció desde los 333/430/25 del relevo anterior porque el
código creció; el método reproduce. **Este canónico no guarda ni una clave `lane`, y
`aiw/kernel.mjs` tiene CERO apariciones de `lane`, `barrier` y `batch`.** Coste pagado en
los dos lados, consumidores cero. Es el precedente que el `#48` existe para no repetir.

**`depends_on_human_approved`: CERO runs lo llevan como campo.** Las 6 apariciones del
literal son prosa, en 4 runs — **5 en `full_description` y 1 en un `summary`**.

**Suite: 529 tests, 527 pasan, 2 fallan** al cierre del `#48` (era 497/495/2 al abrir la
sesión). **Los DOS son PINES DE REGISTRO DELIBERADOS, no deuda:**
`tests/roadmap-engine.test.mjs:93` —su mensaje instruye «update the record, keep the
test»— y `tests/classification-care-budget.test.mjs:153`. **Nunca se reparan y NUNCA son
gatillo de una parada por regresión.** El criterio es no ganar fallos NUEVOS.

---

## 4. ⚠ CORRECCIÓN AL RELEVO ANTERIOR — hacia adelante, no hacia atrás

**El §8 del relevo del 2026-08-06 (mañana) afirmaba: «1 arista `depends_on_human_approved`
— `#53` → `RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001`, no colgante y única en todo el
canónico».**

**ES FALSO. Medido en disco: esa arista NO EXISTE.** Las claves del `#53` son
`run_id, queue_order, title, summary, full_description, status, depends_on,
correctness_model, work_type, blast_radius, failure_surfaces, external_effects,
classified_at`. Ninguna es `depends_on_human_approved`.

El §4 de aquel mismo relevo decía lo contrario y correcto («nada en este repo obedece esa
lista todavía»). **El relevo se contradecía consigo mismo y la mitad que coincidía con el
disco era la otra.** No se reescribe hacia atrás: se corrige aquí.

---

## 5. LA MODALIDAD COWORK, medida — y lo que la tabla heredada tenía mal

**Capacidades PROBADAS esta sesión, no supuestas:**

| Capacidad | Resultado |
|---|---|
| Leer cualquier fichero del workspace | **SÍ** |
| Comandos de solo lectura (node, validador, suite) | **SÍ** |
| Leer estado de Git en los cinco repos | **SÍ** |
| Crear y sobrescribir ficheros | **SÍ** |
| **ESCRIBIR EL CANÓNICO por el motor** | **SÍ — probado 3 veces** |
| Re-emitir `.project/` | **SÍ — 6 ficheros, layout `repo_root`** |
| **BORRAR** | **NO — `Operation not permitted`** |
| Commit / push | **NO** |

**Tres correcciones medidas a la tabla heredada:**

1. **HAY RED Y LECTURA DEL REMOTO.** `git ls-remote origin` devolvió EXIT 0. D-064 afirma
   «no hay credenciales y no hay red al remoto» y hoy es falso. No cambia nada operativo
   —Git sigue siendo del operador— pero deja de ser una pared medida.
2. **`.git` SÍ es escribible, solo no borrable.** `touch .git/loquesea` funciona. Es peor
   que «no escribible»: se puede ensuciar `.git` sin poder limpiarlo.
3. **`fs.renameSync` sobre el canónico funciona.** La escritura estaba declarada como NO
   PROBADA por si el temporal-y-renombrado chocaba con la prohibición de borrar. No choca.

**D-064 dice la VERDAD sobre la re-emisión automática, CON UN MATIZ:** `serve.mjs` llama a
`writeProjectFolder` tras un `applyPlan` exitoso — pero **`applyPlan` a pelo NO re-emite**.
Conducir el motor directamente y conducir la consola no son lo mismo. **Quien conduzca el
motor debe re-emitir explícitamente, dentro del camino de éxito.**

**Y `applyWrite` llama a `validate()` SIN argumentos y exige `result.code === 0`.** Inyectar
un validador de otra firma produce un rollback silencioso que parece un fallo del motor y es
un fallo de quien lo conduce. **La autoridad correcta es `writtenFileValidator` de
`serve.mjs`: `checkInvariants` + `hasRoadmapTreeShape`, devolviendo `{code, output}`.**

---

## 6. ⚠⚠ EL CANDADO — propiedad de este repo, y su solución

**`git status` y `git diff` REFRESCAN EL ÍNDICE, y para eso toman `.git/index.lock`.** La
cabina puede crearlo y no puede borrarlo. **Resultado: cada lectura de git de la cabina deja
un candado que BLOQUEA el siguiente `git add` del operador.** Costó dos bloques de Git
fallidos en esta sesión antes de encontrar la causa.

**LA SOLUCIÓN, probada con el candado puesto:**

```
git --no-optional-locks status ...
git --no-optional-locks diff --numstat --ignore-cr-at-eol
```

Devuelven exactamente lo mismo sin tocar el índice. **La opción va ANTES del subcomando.**

**NO ES INFALIBLE:** un barrido de los cinco repos que agotó su tiempo dejó candados nuevos
en `aiw`, `aiw-console` y `cantu-studio` pese a usarla. **Un comando que se corta a mitad
puede dejarlos igual.** Comprobar candados es parte de cerrar sesión.

**Protocolo ante un candado, y el orden importa:** NO borrarlo de entrada. Primero
antigüedad y tamaño, después procesos `git` vivos —**eso lo mira el operador, la cabina no
ve procesos de Windows**—, y sólo con las dos cosas se quita. Borrarlo mientras otro escribe
corrompe el índice.

---

## 7. CRLF — y la corrección que el relevo anterior tenía a medias

**`aiw-console` NO tiene `.gitattributes`.** La cabina corre en Linux y no aplica la
conversión del Git de Windows: su lectura cruda reporta ~279 ficheros y ~134 800
«inserciones» que en la máquina del operador son CERO.

**`--ignore-cr-at-eol` es opción de `git diff`, NUNCA de `git status`.** Y hay un segundo
matiz que costó una lectura falsa: **tampoco sirve con `--name-only`**, que sigue listando
los 277. **La única lectura fiable es `--stat` o `--numstat`:**

```
git --no-optional-locks diff --numstat --ignore-cr-at-eol
```

**Toda guarda de árbol limpio se construye sobre `diff`, y se declara cuál de las dos
lecturas se está dando.**

**El validador `tools/project-console/validate-project-console-state.mjs` NO EMITE
`history=` NI `ready_next=`** — lee la topología del fork de D-035 y sale EXIT 1 con 25
`Missing JSON file: .aiw/...`. **Es CORRECTO que salga rojo.** Consecuencia dura: **la guarda
`if ($v -notmatch "history=$esperado")` que prescriben las reglas de cabina es INSERVIBLE en
este repo.** Aquí la guarda se construye sobre el canónico —contar runs, contar `active`,
comprobar el `run_id` esperado— o sobre `checkInvariants`.

---

## 8. ⚠ LA FALSA CONSOLA

`docs/project-console/` es el fork **DESCARTADO por D-035**; `console/` es un prototipo
retirado. **La consola viva es `project-console/`.** En Cowork este aviso pesa MÁS: la
cabina puede abrir ese código y leerlo entero, **lo que lo hace más creíble sin hacerlo
menos falso**.

**En este repo escriben CUATRO hilos.** El `git add` va **siempre dirigido por nombre de
fichero, nunca `-A`**, y la cabina declara por nombre cada fichero que escribe.

---

## 9. MIGRACIÓN A LA LAPTOP NUEVA — estado medido el 2026-08-06 ~22:50

**Lo que falta por commitear en ESTE repo** (HEAD `b2a5079` = `origin/main`):

Modificados — trabajo del taller del `#48`:
`tools/roadmap/roadmap-core.mjs` · `tools/roadmap/roadmap-plan.mjs` ·
`project-console/assets/project-console.js` · `tools/projector/project.mjs` ·
`tests/roadmap-engine.test.mjs`

Sin rastrear:
`context/aiw-console/records/LOTES-EN-EL-SCHEMA-Y-LA-RAMA-QUE-DETERMINAN.md` ·
`tests/roadmap-batches.test.mjs` · `tests/fixtures/batches/project/package.json` ·
`tests/fixtures/batches/project/roadmap/roadmap.json` ·
`tests/fixtures/batches/project/.project/roadmap.json` ·
`tests/fixtures/batches/project/.project/snapshot.json` ·
`tests/fixtures/batches/project/.project/docs_index.json`

Más este relevo: `context/handoffs/aiw-console.md`.

**LOS OTROS REPOS — NO son de este hilo, se NOMBRAN y no se tocan:**

| repo | estado medido | riesgo para la migración |
|---|---|---|
| `cantu-studio` | limpio, HEAD = `origin/main` = `0ff12d5` | ninguno |
| `aiw` | 5 ficheros de `.project/` (+1/-1, timestamps) y `objectives/pending/_probe.md` sin rastrear | bajo; el `_probe.md` huele a sonda que nadie borró |
| `cantu-quizzes-latex` | **9 modificados sin commitear** | **se pierden si no se empujan** |
| `cantu-lessons` | 1 modificado y **SIN REF REMOTA `origin/main`** | **ALTO — si no está en GitHub, NO VIAJA** |

**`cantu-lessons` es el que puede costar trabajo de verdad.** No tiene ref remota; hay que
comprobar si tiene remoto configurado y si su rama se ha empujado alguna vez, **antes** de
apagar la máquina vieja.

**`.gitattributes` sigue sin existir en `aiw` ni en `aiw-console`.** En la laptop nueva, si
`core.autocrlf` difiere, el clon puede salir con el árbol entero modificado.
**RECOMENDACIÓN TOMADA: NO meterlo durante la migración** — su renormalizado toca el árbol
completo y mezclarlo con trabajo pendiente hace ilegible el diff. **Es su propio run, y
conviene hacerlo en la máquina nueva con los tres roadmaps en reposo.**

**Primer acto en la laptop nueva:** el arranque de sesión completo —derivar la ruta de
montaje, PROBAR las capacidades una por una, localizar el canónico midiendo, leer este
relevo y contrastar sus cifras contra el disco—. **La ruta de montaje CAMBIA entre sesiones
y entre máquinas: se deriva, nunca se hereda.**

---

## 10. LO QUE QUEDA ABIERTO, CON SU CONDICIÓN DE CIERRE

**La QA del `#48`** — §1. Es lo único que bloquea su cierre.

**El selector de lotes sin ver nunca en un browser** — lo cubre el `#50`.

**`V3_BATCHABLE_OPS` sin absorber** — una edición en
`tests/depends-on-human-approved.test.mjs:341`, en un run que tenga ese fichero en su
alcance. Llevaría el coste del campo siguiente de 11 a 10.

**Un `.gitattributes` para `aiw-console` y para `aiw`** — §9.

**La mitad de `aiw` en los lotes** — seis puntos escritos en el record del `#48`. **Es del
hilo `aiw`; este hilo lo NOMBRA y no lo lleva.**

**Unificar `setDeps` con la op de aprobación humana, y el rename de `depends_on`** — las dos
quieren la ventana de «tres roadmaps en reposo». **Son DOS runs esperándola.**

**Los 9 runs terminales sin `closeout_result`** — no se rellenan: inventar un desenlace que
nadie declaró sería afirmar un hecho falso sobre trabajo pasado.

---

## 11. DEFECTOS DE MÉTODO DE LA CABINA, medidos en esta sesión

1. **Escribir un paso de QA sin comprobar que la superficie puede mostrarlo.** Ocurrió DOS
   veces: pedir un run sin clasificar en la Run Queue —donde sólo hay runs vivos y los 43
   sin clasificar están todos `completed`— y estar a punto de pedir el selector de lotes en
   un proyecto sin lotes. **Antes de escribir «mira X», medir que X es visible ahí.**
2. **Presentar un grep literal como una medición.** «5 sitios de op en la consola» incluía
   un sitio de RENDER; el texto del run decía 4 y decía bien. La cifra era correcta y la
   unidad estaba mal.
3. **Inyectar una función con firma inventada en vez de leer la que el código usa.** Produjo
   un rollback que parecía del motor y era mío.
4. **Ejecutar la re-emisión fuera del camino de éxito.** Re-emitió `.project/` tras un apply
   fallido, ensuciando seis ficheros que nadie pidió.
5. **Correr un barrido de cinco repos en un solo comando.** Agotó su tiempo y dejó tres
   candados. Las mediciones pesadas van repo a repo.

**El taller contradijo a la cabina en dos puntos sustantivos y en los dos tenía razón**
—el sitio de render mal contado y los 9 sitios absorbidos en vez de 10—, y paró en la
frontera del alcance en vez de ampliarla. **La separación adversaria sigue pagando.**
