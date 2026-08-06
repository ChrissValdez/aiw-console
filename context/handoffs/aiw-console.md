# Relevo — hilo `aiw-console`

**Fecha:** 2026-08-06 · **Sustituye** al relevo del 2026-08-02.
**Última sesión en modalidad ESPEJO. La siguiente arranca en Cowork.**

La sustancia va DENTRO. Los punteros a records son procedencia, no respuesta.

---

## 1. DÓNDE ESTAMOS

**Cabeza de cola: `#47` «One registry for the plumbing every optional run field
repeats»**, `planned`, sin abrir, **desbloqueado**.

Estuvo parado porque el hilo `aiw` iba a correr su kernel sobre
`project-console/assets/project-console.js`. **No llegaron a lanzar**, la rama
`aiw/007-console-closure-mode-row-tag` nunca existió, y ese fichero sigue en `6ee3277`.
**Su objetivo se retira: lo pinta nuestro run.**

**DECIDIDO Y NO REABRIR — el `#47` lleva DOS cosas:**

1. **El registro de fontanería**, su alcance original: colapsar la enumeración mecánica
   que repite cada campo opcional. **10 de 17 sitios son absorbibles** —3 ramas del mismo
   algoritmo en el borrado, 3 enumeraciones de la misma op en el plan, 4 en la consola—.
   **7 NO entran, y el render es intocable**: ahí la etiqueta ES la semántica, y el run
   que añadió `depends_on_human_approved` descartó el rename para que la diferencia
   IA/humano viviera en la etiqueta de pantalla.
2. **Pintar `closure_mode` junto a `severity`** en la fila del árbol y en la de la Run
   Queue. **1 sitio de código + 1 de test.** Las dos superficies comparten una función,
   `v3RunRowTags`, **anclar al NOMBRE y no a la línea**; la llamada ya devuelve el valor
   y lo descarta. **Sin CSS**: el cajón ya pinta un `closure_mode` con la regla base, y
   el color queda reservado a la severidad. Extender las aserciones de
   `tests/classification-transport-and-console.test.mjs`, cuyo fixture «con
   clasificación» **necesita `correctness_model: "SPECIFIED"`** — sin él no hay
   `closure_mode` que derivar y la prueba no demuestra nada.

**NO entra en el `#47`:** unificar la escritura de las dos listas de dependencias. Toca
`depends_on` y arrastra la ventana de «tres roadmaps en reposo» que también necesita el
renombrado. **Son DOS runs esperando esa ventana, no uno.**

---

## 2. ⚠ TOPOLOGÍA — y una trampa NUEVA que la modalidad trae

**El sync del Project está RECORTADO.** No llegan: `context/aiw-console/records/`,
`tools/`, `tests/`, `project-console/`, `.project/`. **Sí llegan:**
`roadmap/roadmap.json`, `context/DECISIONES.md`, `context/handoffs/`,
`context/CLASIFICACION-DE-RUNS.md`, `context/PROCEDIMIENTO-DE-CLASIFICACION.md`,
`context/aiw-console/CONTRATO.md`. **Confirmado por dos hilos con sondas independientes.**

**⚠ TRAMPA DE LA MODALIDAD, medida por el hilo `cantu-studio`:** la cabina de Cowork corre
en **Linux** y **no aplica la conversión CRLF** del Git de Windows. **`aiw-console` NO
tiene `.gitattributes`**, así que **su `git status` desde la cabina MIENTE: reporta del
orden de 279 ficheros y 134 804 «inserciones» que en la máquina del operador son CERO.**

**Consecuencia dura: TODA guarda de árbol limpio de esta sesión es inservible sin
corregir.** Antes de reportar cualquier `git status`, pasarlo por `--ignore-cr-at-eol` y
**declarar cuál de las dos lecturas se está dando**.

**⚠ Este repo contiene el fork de consola DESCARTADO por `D-035`**, en
`docs/project-console/`, y `console/` es un prototipo retirado. **Ese aviso pesa MÁS en
Cowork**: la cabina puede abrir ese código y leerlo entero, lo que lo hace más creíble sin
hacerlo menos falso. **Y el validador `tools/project-console/validate-project-console-state.mjs`
lee ESE fork, no la consola viva: sale ROJO y es correcto que salga rojo.** La validación
real de escritura es `checkInvariants` del motor.

**En este repo escriben CUATRO hilos.** El `git add` va **siempre dirigido por nombre de
fichero, nunca `-A`**.

---

## 3. LOS DOS PINES QUE PARECEN DEUDA Y NO LO SON

`node --test` da **497 tests, 495 pasan, 2 fallan**. **Los dos son PINES DE REGISTRO
DELIBERADOS, no deuda:**

- `tests/roadmap-engine.test.mjs:93` — descubrió que **los dos canónicos reales ya
  comparten EOL**, luego el parámetro que toleraba la divergencia dejó de ser portante.
  Su propio mensaje instruye: **«update the record, keep the test»**.
- `tests/classification-care-budget.test.mjs:153`.

**Su remedio es actualizar el record y conservar el test, nunca repararlo.** Y de ahí sale
una regla: **un test cuyo propósito es dispararse ante un cambio deliberado NO puede ser
el gatillo de una parada por regresión.** Ya costó una parada de taller en esta sesión.

---

## 4. LO QUE ESTA SESIÓN ENTREGÓ

**El piloto de clasificación cerró.** Los doce runs vivos clasificados, y el procedimiento
escrito en `context/PROCEDIMIENTO-DE-CLASIFICACION.md`. Reparto: **6 CRITICAL · 3 MAJOR ·
3 MODERATE · 0 MINOR** y **4 `ATTENDED` · 6 `SEMI_ATTENDED` · 2 `UNATTENDED`**. **Esta
cola no produce ningún MINOR**, y es dato de calibración, no defecto.

**`progress` es norma** en `CONTRATO.md` §15: una **QA humana con resultado positivo
satisface** una arista `depends_on_human_approved`; **`completed` solo, jamás**. Cerrar un
run **exige desenlace**, con lista sugerida —`done as specified` por defecto, más
`done with deviations`, `superseded`, `not needed`, `partially done`— y texto libre. **La
lista es SUGERIDA, no vocabulario cerrado.** History dejó de pintar la ausencia como
bloqueo, y **los 9 runs terminales sin desenlace NO se rellenaron**: inventar un desenlace
que nadie declaró sería afirmar un hecho falso sobre trabajo pasado.

**`depends_on_human_approved` existe**: campo opcional de run con seis invariantes,
transporte verificado y superficie propia. **La frontera con `aiw` está fijada por dos
tests que se ponen rojos si alguien la cruza a medias.** **Nada en este repo obedece esa
lista todavía, y es correcto.**

**Cuatro entradas nuevas de decisión.** `D-062`: un contenedor sin runs es **VÁLIDO y no
deriva nada** — el chequeo que el contrato describía **nunca se implementó**. `D-063`: el
cuarto proyecto y los tres acuerdos con `aiw`.

**`cantu-quizzes-latex` es el cuarto proyecto y tiene hilo propio** desde el 6-ago.
Registrado, canónico de 3 objetivos y 10 fases **sin runs** —estrenando `D-062`— y
`.project/` emitido. **Este hilo ya no escribe en ese repo.**

---

## 5. CIFRAS MEDIDAS, con su unidad, porque no se pueden ir a buscar

**Dar de alta un campo opcional de run cuesta 17 SITIOS en 3 archivos de código**, más
**1 sitio en 1 archivo de test existente**. La pieza compartida existe pero **el campo no
pasa por ella**. **Y el coste depende de QUÉ CLASE de cosa guarda el campo:** un token de
vocabulario cerrado ~2 sitios; una lista de forma propia +2; **una lista de REFERENCIAS a
otros runs +3 más**, por la integridad referencial al borrar.

**El precedente de los carriles, entero:** 8 archivos de código, **333 sitios** —430 con
`barrier`— y 25 de test, **sin módulo compartido**. **Este canónico no guarda ni una clave
`lane`**, y `kernel.mjs` de `aiw` no contiene ni `lane` ni `barrier`. **Coste pagado en
los dos lados, consumidores cero.**

**La puerta de operaciones por lote pegado está medida y sin emitir. DOS runs, y el corte
es de invariante, no de tamaño:** el primero son **12 sitios** —8 de la puerta, 3 de la
guarda de identidad por `queue_order`+título, 1 del respaldo con nombre único— sobre las
**11 ops agrupables**; el segundo son **4 sitios** y **afloja `checkIdentityPreserved`**,
que hoy sanciona un id por tipo. **El motor ya acepta un lote sobre runs distintos**,
medido con `planEdit`; lo impide el cliente. **Y hay un defecto real ya destapado:** la
previa pasa **el mismo nodo «antes»** a todas las sub-ops, así que un lote multi-run
pintaría cada diff contra el run equivocado.

---

## 6. LO QUE QUEDA ABIERTO, CON SU CONDICIÓN DE CIERRE

**Las tres reglas mecánicas de runs mixtos** — hueco de `CLASIFICACION-DE-RUNS.md` §7.
**La población real es la nuestra sola: de los 21 runs de `aiw`, NINGUNO resultó mixto.**

**La calibración de los `completed`** — sin un solo caso.

**La irreversibilidad sin eje propio** — hueco declarado **sin testigo**.

**Un `.gitattributes` para este repo y para `aiw`** — sin él, toda guarda de árbol limpio
desde la cabina es inservible (§2). **Un cambio de una línea con un renormalizado detrás
que toca el árbol entero en un commit.** Sirve a tres repos; conviene medir qué necesita
cada uno antes de emitirlo.

**Distinguir una fase vacía OLVIDADA de una en espera** — `D-062` lo deja sin mecanismo;
se resolvería avisando, no rechazando.

**El `insert` de un run nacido terminal no tiene canal de `closeout_result`** — medido:
hoy se puede crear un run ya cerrado sin desenlace, desde la pantalla, con cero avisos.
**0 datos malos en 56 runs**, así que no urge.

**`cantu-quizzes-latex` emitió 4 artefactos y se esperaban 6** — faltan `guardrails.json`
y `no_claims.json`. **Hipótesis sin verificar:** derivan de `governance/`, que ese repo no
tiene. **Si el aviso de la consola los nombra como no cargados, es defecto del emisor y es
NUESTRO.** Está pendiente de una mirada a pantalla.

---

## 7. LOS DEFECTOS DE MÉTODO DE LA CABINA — seis, todos medidos aquí

1. **Una tabla terminada solo admite sí o no.** Aísla la pregunta que decide los valores
   y preséntala antes que la tabla.
2. **Antes de declarar que el modelo falla, relee la definición y busca el caso.** Se
   emitieron tres «huecos del modelo» y **dos eran lectura**. El peor: confundir
   `closure_mode` con una escala de riesgo. **No lo es: mide PRESENCIA** —cuánta persona
   hace falta DENTRO del run— mientras `severity` mide DAÑO. Se cruzan.
3. **Cuenta `blast_radius`, no lo razones — y guarda la RAZÓN junto al valor.** Hubo dos
   runs con valor correcto y razón falsa.
4. **Una cifra marcada «por verificar» no puede ser el gatillo de una parada.** Ni un pin
   de registro tampoco (§3).
5. **Si quieres confirmar una predicción de derivación, déjala FUERA del ticket.** Escrita
   en el criterio, el taller verifica la aritmética de quien la escribió, no la del motor.
6. **Un bloque de Git que depende de una re-emisión debe verificarla antes de commitear.**
   Costó dos turnos y un `.project/` desfasado en disco.

**Seis paradas de taller atraparon errores reales de la cabina en esta sesión.** Entre
ellas: una cifra caducada usada como gatillo; una `severity` derivada mal a mano
—`COSMETIC`×`LOCAL` = MINOR, y `SILENT` suma un paso → **MODERATE**—; una entrada de
decisión escrita en una forma que el log no usa; y un alcance de contrato que no cabía en
las dos secciones autorizadas. **La cláusula «para y reporta» se gana su sitio en todos
los tickets.**

---

## 8. ESTADO MEDIDO EN DISCO

Medido el 2026-08-06 desde la raíz del repo, **en la máquina del operador** (Windows,
`core.autocrlf=true`, **sin `.gitattributes`**), no desde la cabina. Cada valor lleva el
comando que lo produjo. Los comandos de canónico llevan delante este prólogo, que lo
aplana:

```
$j = Get-Content roadmap\roadmap.json -Raw | ConvertFrom-Json
$runs = @($j.objectives | ForEach-Object { $_.phases } | ForEach-Object { $_.runs })
```

**HEAD y limpieza del árbol.** Rama `main`, HEAD en **`81e065f`** — *«handoff(aiw):
relevo del 6-ago - compuerta CONST 4 re-adjudicada sobre los 21 (8 no detenidos / 13 si),
cruce con depends_on deja solo 22 y 41 ejecutables, el tercero es 24 ya completed, dos
blancos descartados con medicion, objetivo 007 escrito y validado pero NO lanzado, y la
trampa de CRLF con su guarda»*. **El árbol NO está limpio:** un solo fichero rastreado
modificado, `context/DECISIONES.md`, y **cero sin rastrear**.
Comandos: `git log -1 --format="%h %s"` · `git branch --show-current` ·
`git status --porcelain -uall`.

**⚠ Declaración de lectura, exigida por §2.** Este `git` **no acepta
`--ignore-cr-at-eol` en `git status`** —es opción de `git diff`—, así que la lectura
tolerante a CR se da con `git diff --stat --ignore-cr-at-eol`. **Las dos lecturas
coinciden en el fichero** y difieren solo en el volumen: la cruda dice *52 insertions(+),
1 deletion(-)*; la tolerante a CR dice *51 insertions(+)*. **La lectura que se está dando
aquí es la TOLERANTE A CR**, y el modificado es real, no ruido de fin de línea.

**Total de runs y desglose por `status`.** **56 runs** en total: **46 `completed`** y
**10 `planned`**. No existe ningún otro valor de `status` en el canónico.
Comando: `$runs.Count` · `$runs | Group-Object status`.

**Densidad y unicidad de `queue_order`.** **Es denso y único de 1..56**: 56 valores
distintos, mínimo 1, máximo 56, sin huecos ni repetidos.
Comando: `$qo = @($runs | ForEach-Object { $_.queue_order })` ·
`(@($qo | Select-Object -Unique)).Count` · `($qo | Measure-Object -Min -Max)` ·
`1..56 | Where-Object { $qo -notcontains $_ }`.

**Los diez runs `planned`, por `queue_order`, con título verbatim y `depends_on`.**
Comando: `$runs | Where-Object status -eq 'planned' | Sort-Object queue_order`,
imprimiendo `queue_order`, `run_id`, `title` y `depends_on`.

- **47** · `RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001` ·
  *«One registry for the plumbing every optional run field repeats»* ·
  `depends_on: []`
- **48** · `RUN-CONSOLE-BATCHES-001` ·
  *«Batches in the roadmap schema, with the branch they determine»* ·
  `depends_on: ["RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001",
  "RUN-CONSOLE-PROGRESS-NORMATIVE-001", "RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001"]`
- **49** · `RUN-CONSOLE-DIGEST-CABINA-001` ·
  *«Digest for the cockpit»* ·
  `depends_on: []`
- **50** · `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` ·
  *«Global console renders Cantu (parity, operator QA)»* ·
  `depends_on: ["RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001"]`
- **51** · `RUN-CONSOLE-UI-UX-001` ·
  *«UI/UX of the global console»* ·
  `depends_on: ["RUN-CONSOLE-PARIDAD-RENDER-CANTU-001"]`
- **52** · `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` ·
  *«Move cantu-studio's canonical roadmap out of .aiw before the cutover can delete
  it»* · `depends_on: []`
- **53** · `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` ·
  *«Cutover: retirement of Cantu's local console and deletion of .aiw»* ·
  `depends_on: ["RUN-CONSOLE-PARIDAD-RENDER-CANTU-001", "RUN-CONSOLE-UI-UX-001",
  "RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001"]`
- **54** · `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` ·
  *«Repair the five texts that describe this repo falsely»* ·
  `depends_on: []`
- **55** · `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` ·
  *«Expose the four container operations in the console frontend»* ·
  `depends_on: []`
- **56** · `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` ·
  *«Deep visual audit of the console, led by the operator»* ·
  `depends_on: []`

**Conteo de campos de clasificación.** **13 runs con `correctness_model`**, **13 con
`classified_at`**, **4 con `external_effects`**. Los trece son `queue_order` 44..56: los
diez `planned` de arriba más 44, 45 y 46, ya `completed`, que conservan su clasificación.
Doce llevan `classified_at` del 2026-08-02T07:27Z —los del piloto— y el `#47`, insertado
después, lo lleva del 2026-08-03T06:31Z.
Comando: `@($runs | Where-Object { $null -ne $_.<campo> }).Count` para cada uno de los
tres campos.

**Aristas que salen de runs vivos, y colgantes.** Runs vivos = los 10 `planned` (no hay
ningún otro `status` sin cerrar). Salen de ellos **8 aristas `depends_on`**, y **0 son
colgantes**: los 8 destinos existen como `run_id` en el canónico. Aparte, **1 arista
`depends_on_human_approved`** —`#53` → `RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001`—,
también no colgante y única en todo el canónico. En el grafo completo `depends_on`
—incluidos los `completed`— hay **30 aristas** y **0 colgantes**.
Comando: `$ids = @($runs | ForEach-Object { $_.run_id })` · recorrer
`$runs | Where-Object status -eq 'planned'` sumando `@($_.depends_on)` y contando las que
cumplen `$ids -notcontains $d`.