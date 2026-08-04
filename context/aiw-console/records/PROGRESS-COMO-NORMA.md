# `progress` como norma — congelado de §15, QA humana legible por máquina, y el defecto de `closeout_result`

**Proyecto:** aiw-console
**Fecha:** 2026-08-03
**Run:** derivado por `queue_order` 46 del canónico `roadmap/roadmap.json` →
`RUN-CONSOLE-PROGRESS-NORMATIVE-001`, título cotejado EXACTO contra
`Freeze the shape of progress so human approval becomes machine-readable`.
La guarda de identidad no se disparó. El run estaba `active` al entrar y sigue
`active` al salir.
**Naturaleza:** encargo de taller. **Se ejecutó completo. Ninguna parada se disparó.**
**Archivos escritos en el repo:** `context/aiw-console/CONTRATO.md` (solo §15),
`context/PROCEDIMIENTO-DE-CLASIFICACION.md` (solo adición §9),
`tools/progress/progress.mjs` (nuevo, 129 líneas),
`tools/roadmap/roadmap-core.mjs`, `project-console/assets/project-console.js`,
`project-console/assets/project-shell.js`,
`tests/progress-normative.test.mjs` (nuevo, 329 líneas), y este record. **Ningún otro.**
**Lo que NO se escribió:** `roadmap/roadmap.json` (round-trip byte-idéntico verificado al
final: `serialize(parse(raw)) === raw` → `true`), ningún dato de run, ningún status,
ningún relleno de `closeout_result`, nada en `aiw` ni en `cantu-studio` (solo lectura),
`.project/` no se reemitió (lo hace el operador desde la consola), git en ninguna forma.

---

## Resultado en una línea

**La forma de `progress` es NORMA (CONTRATO §15, enmendado 2026-08-03): un validador
la rechaza malformada y un predicado único responde si una persona revisó un run; la
consola dice «satisfied» exactamente cuando el destino trae QA humana positiva y nunca
sin ella; cerrar un run exige ahora declarar su desenlace; y History dejó de pintar la
ausencia de desenlace como bloqueo. 0 datos de run tocados; 9 de 45 terminales siguen
sin `closeout_result` a propósito.**

---

## A. Medición previa (criterio A.3) — antes de tocar nada

### A.1 `progress` en los tres canónicos registrados

Los tres canónicos son los del registro `project-console/projects.json:4-8`.
Comando de la medición (léase «runs con la clave `progress` presente»):

```bash
node -e "…recorre objectives[].phases[].runs[] y filtra r.progress !== undefined…"
```

| Canónico (ruta) | Runs totales | Runs con `progress` |
|---|---:|---:|
| `projects/aiw-console/roadmap/roadmap.json` | 56 runs | **1** (`RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001`, `queue_order` 3, `completed`) |
| `aiw/roadmap/roadmap.json` | 46 runs | **0** |
| `projects/cantu-studio/.aiw/roadmap/roadmap.json` | 66 runs | **0** |

**Una sola variante viva** (guarda B.5: no se disparó): el único ejemplar es un array
de **13 entradas**, cada una con exactamente las cinco claves
`{cycle, stage, attempt, state, result}`, `state: "done"` en 13/13, etapas
`execution·ai_review·human_qa·correction·closeout`, y la QA humana con resultados
`changes_requested` (ciclos 1–3) y `passed` (ciclo 4). Idéntico al medido en
CONTRATO §15.a (tabla de MEDICION:278-284, conservada como acto pasado).

**Cifras del ticket, verificadas contra disco:** el `full_description` dice «1 de 65»
(cierto cuando se escribió §15: el run vivía en el roadmap de Cantu) y «0 de 42 en
aiw». **Reales hoy: 1 de 56 (aiw-console), 0 de 46 (aiw), 0 de 66 (cantu-studio)** —
el ejemplar migró a este canónico y las colas crecieron. La dirección de ambas
afirmaciones se sostiene; las cifras viejas no, y aquí quedan las reales.

### A.2 Lo que ya se pintaba (la mitad «YA SE PINTA» del congelado)

- Etiquetas de etapa (5): `project-console/assets/project-console.js:189-195`.
- Estados pintados (3): `waiting/running/done`, `project-console.js:196-200`; el
  motor deriva la frontera activa de `waiting|running`
  (`tools/roadmap/roadmap-core.mjs:799`, dentro de `statusProgressErrors`, :791).
- `result` guardado con `"result" in entry` (opcional para el lector):
  `project-console.js:3348,3363` (rollup «Human QA — …» y subtexto).
- `note` opcional, pintada cuando existe: `project-console.js:3379` — 0 ejemplares
  en disco.
- Tono negativo SOLO para `changes_requested`: `project-console.js:3352`.
- El proyector espeja la derivación del current stage: `tools/projector/project.mjs:493-500`.

### A.3 `closeout_result`: valores reales y quién lo escribe

Censo del canónico de este proyecto (56 runs; terminal = `completed`|`blocked`,
`TERMINAL_STATUSES`, `roadmap-core.mjs:176`; hoy hay 0 `blocked`):

| Valor | Runs |
|---|---:|
| `"completed_successfully"` | 33 |
| `"delivered_by_aiw_roadmap_O2"` | 1 |
| `"superseded_by_D-037_D-038"` | 1 |
| `"discarded_by_D-048"` | 1 |
| **ausente** | 20 (11 no terminales + **9 terminales**) |

**Terminales sin `closeout_result`: 9 de 45** — la cabina creía **7 de 43**; desde esa
cuenta cerraron `#44` y `#45`, también sin valor. Los nueve, por `queue_order`:
4, 9, 39, 40, 41, 42, 43, 44, 45. En `aiw`: 46 de 46 runs sin la clave (25
`completed`, ninguno con valor). En `cantu-studio`: 63 de 66 sin la clave, 3 con valor.

**Quién lo escribe (cadena completa, medida):** el único escritor del campo en runs es
`core.setStatus` (`roadmap-core.mjs:1228`, escritura en :1261-1263 tras la edición),
relevado por el op `set-status` de `tools/roadmap/roadmap-plan.mjs:104-109`, invocado
por el modal de la consola (`project-console.js`, recolección en :6589-6596) vía
`POST /projects/<key>/__project-console/roadmap/edit` (`project-console/serve.mjs:418+`).
El proyector escribe un `closeout_result` sintético solo en la vista DERIVADA de
objetivos de aiw (`tools/projector/project.mjs:434`) — no toca canónicos. **El hueco
medido:** la consola omitía el argumento si la caja iba vacía
(`if (terminal && closeout)`, hoy `project-console.js:6595`) y el motor aceptaba el
cierre sin valor — ese silencio es el que produjo los 9.

### A.4 Línea base de verificación (antes de editar)

- `checkInvariants` con resolución cruzada del registro: **0 errores en los tres
  canónicos** (sin resolución cruzada, cantu-studio da 1 colgante legítimo §10.d:
  su run espera `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`, que vive aquí como `#4`).
- Suite completa: **464 tests, 462 verdes, 2 rojos** — exactamente los dos
  preexistentes nombrados por el ticket (E.17): `classification-care-budget.test.mjs:153`
  y `roadmap-engine.test.mjs:93`. Ningún tercero.

---

## B. Lo congelado (CONTRATO §15, la única edición normativa junto a la adición §9)

`CONTRATO.md` §15 quedó enmendado (líneas 1531-1632): título
«`progress`: opcional, y su forma interna CONGELADA — NORMA», con:

- **§15.a** — la medición original de 2026-07-23, conservada como acto pasado con
  puntero al estado vigente (regla de mantenimiento del propio contrato, CONTRATO:32-55).
- **§15.b** — la forma congelada, **la que ya existe y ya se pinta, sin estructura
  nueva**: opcional y ausente por defecto (sin cambio); presente → array no vacío;
  claves requeridas `cycle,stage,attempt,state`, opcionales `result,note`, ninguna
  otra; `cycle`/`attempt` enteros ≥ 1; `stage` cerrado en los 5 medidos; `state`
  cerrado en `waiting|running|done` (en disco solo hay `done`, pero congelar solo
  `done` haría insatisfacible la frontera que el propio motor exige a un `active`
  con `progress` — cada pieza lleva su testigo con `ruta:línea` en la sección);
  `result`/`note` string no vacía, `result` sin enum (criterio §14). El acoplamiento
  con `status` sigue siendo ley del acto de mutación (donde ya vivía); el validador
  estático valida la FORMA. El orden interno de entradas NO se congela (sin testigo).
- **§15.c** — **lo adjudicado por la cabina y el operador, escrito en la norma:** un
  run con entrada `stage:"human_qa"`, `state:"done"`, `result:"passed"` tiene QA
  humana positiva, y esa QA **SATISFACE** una arista `depends_on_human_approved` que
  apunte a él. **`completed` por sí solo NO la satisface.** `passed` es el único token
  positivo con ejemplar en disco y etiquetado «Passed» por la consola
  (`project-console.js:182`); `changes_requested` es el negativo medido; todo lo demás
  cierra en falso.
- La decisión `j` de la tabla de capa 2 (D-040, «NO se congela») **no se reescribió**:
  esa tabla «registra lo adjudicado en su fecha y no se reescribe» (CONTRATO:2034);
  §15 lleva el puntero de sustitución. **No se acuñó D-número nuevo:**
  `context/DECISIONES.md` está fuera del alcance autorizado; la adjudicación queda
  registrada en el ticket del run 46, en §15 y aquí. Si la cabina quiere numerarla,
  es un acto suyo posterior.

### B.1 La implementación única

`tools/progress/progress.mjs` (nuevo, hoja sin imports — el patrón exacto de
`tools/classification/classification.mjs`): vocabularios cerrados, allowlist de
claves de entrada, `progressShapeErrors()` (empuja errores, jamás lanza) y
`humanApprovalSatisfied()` (cerrado en falso). El motor la importa y re-exporta
(`roadmap-core.mjs:46-55` y :157-171); `checkInvariants` valida la forma de todo
`progress` presente (`roadmap-core.mjs:540-548`); el shell la inyecta al renderer
(`project-shell.js:31-36` y :543-548 → `setProgressModel`, `project-console.js:94-121`).
Sin inyección la consola cae al texto de hoy — **nunca a «satisfied»**.

### B.2 La consecuencia en consola (criterio B.7)

`v3HumanApprovalSection` (`project-console.js:4574-4596`): la fila del destino dice
**«work done · reviewed by a person — satisfied»** (verde, clase `is-satisfied`, la
misma que ya usaba la sección Dependencies) **exactamente cuando** el destino está
`completed` Y su `progress` trae la QA positiva. En todo otro caso — `completed` sin
QA, QA negativa, destino no terminado, modelo sin inyectar — la fila dice **lo mismo
que hoy**. Un destino no-`completed` con QA `passed` conserva sus palabras de espera:
la fila que el criterio B.7 nombra es la de «work done».

### B.3 El validador y el test que FALLA (criterio B.8)

`checkInvariants` rechaza la forma malformada nombrando el run. El test que lo
demuestra FALLANDO existe y pasa: `tests/progress-normative.test.mjs` **B.1** recorre
ocho violaciones (clave inventada, etapa fuera de vocabulario, estado fuera de
vocabulario, `cycle` 0, `attempt` no entero, `result` vacío, `note` no string, falta
`cycle`) más no-array y array vacío, y exige el rechazo NOMBRADO de cada una. B.2-B.4
cubren el lado que pasa: el ejemplar, las variantes del lector (frontera sin `result`,
`note` presente) y los canónicos congelados de fixtures intactos y byte-idénticos.

---

## C. El segundo defecto, misma superficie

### C.1 `closeout_result` REQUERIDO al cerrar (criterio C.10)

**Motor** (`roadmap-core.mjs:1240-1256`, dentro de `setStatus`): un `set-status` a
`completed`|`blocked` sin `closeoutResult` y sobre un run que no lo lleva ya, se
REHÚSA con razón nombrada; un `closeoutResult` vacío o solo espacios se rehúsa
siempre («empty is not an outcome»). La obligación es POSTCONDICIÓN DEL ACTO: un run
que ya lleva desenlace puede cambiar entre estados terminales sin re-teclearlo.
Alcance deliberado: el acto de CERRAR (`set-status`), que es el que la medición cazó.
**Hueco declarado, no decidido aquí:** `insert` de un run que NACE terminal no tiene
canal de `closeout_result` y sigue como estaba — si la cabina quiere cerrarlo, es
adjudicación suya (ningún flujo real lo usa hoy; la consola inserta `planned` por
defecto).

**Consola** (`project-console.js:5814-5817`): el campo se llama en pantalla
**«Closeout result — required to close»**, con placeholder «What was the outcome of
this run?» y nota que dice quién rehúsa y por qué. La recolección no cambió: una caja
vacía viaja sin el argumento y el MOTOR rehúsa — la preview muestra la razón exacta.
Verificado end-to-end sobre una COPIA del canónico real vía `planEdit`: cierre de
`#46` sin valor → `ok:false`, razón nombrada; con valor → `ok:true`. (Copia en temp,
borrada; el canónico no se tocó.)

**Por qué esto NO contradice §14 ni §21, y por qué no hubo parada G.22:** §14 y §21
gobiernan el DATO almacenado — «`completed` exige `closeout_result`» como regla de
validación «pondría rojos dos runs que ya existen» (§21, CONTRATO:1953-1959). Eso
sigue intacto: `checkInvariants` no levanta NADA por ausencia, los 9 siguen válidos,
y ningún documento normativo fuera de §15 se tocó. Lo nuevo es una precondición del
ACTO de mutación — la clase de regla que el motor ya tenía («cerrar exige progress
todo done») y que ningún contrato gobierna. La decisión del operador está registrada
en el `full_description` del run 46: «closeout_result becomes REQUIRED at close,
with the console asking for it».

### C.2 History deja de pintar ausencia como bloqueo (criterio C.11)

`v3QueueRowCells`, rama `history` (`project-console.js:3460-3477`): antes, la celda
Closeout caía a la palabra **"Blocked"** cuando faltaba el valor — y en verde si el
run era `completed`. Ahora: valor presente → igual que siempre (frase en
sentence-case, verde solo en `completed`); ausente → **«No closeout recorded»**,
apagado (`is-muted`), nunca «Blocked», nunca verde. El status del run ya viaja en el
icono de la fila.

### C.3 Los 9 no se rellenan (criterios C.12-13)

**Cifra final, re-verificada tras todos los cambios: 9 de 45 runs terminales de este
canónico sin `closeout_result`** (la cabina creía 7 de 43 — la diferencia son los
cierres de `#44` y `#45`, posteriores a esa cuenta). Ninguno se rellenó: inventar un
desenlace sería afirmar un hecho falso sobre trabajo pasado. La obligación rige hacia
adelante. El test D.3 fija ambas mitades: la ausencia almacenada es dato válido y el
flip terminal de un run con valor no exige re-teclear.

---

## D. La adición al procedimiento

`context/PROCEDIMIENTO-DE-CLASIFICACION.md` ganó la sección **«9. La clasificación
entra con el alta — añadido 2026-08-03»** (líneas 220-238), vía su propia regla de
corrección (§8: hacia adelante, sección nueva). Contiene la regla adjudicada verbatim
del ticket y su caso medido en una línea: el primer run creado tras instituirse el
procedimiento (`RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001`, hoy `#47`) entró sin
clasificar el 2026-08-03 (su alta lo declara «sin clasificar, a propósito»,
`records/INSERCION-REGISTRO-DE-CAMPOS.md:149`), lo detectó el operador mirando la
pantalla — sin clasificar no es error del validador ni blocker de vista alguna
(`records/CLASIFICACION-EMISOR-Y-CONSOLA.md:643-645`) — y la clasificación llegó al
día siguiente por encargo aparte (`records/CLASIFICACION-Y-REPARACION-REGISTRO-DE-CAMPOS.md`;
`classified_at: 2026-08-03T06:31:16.363Z` contra el barrido de los otros doce a
`2026-08-02T07:27:15.8xx`). **Ninguna sección existente se reescribió.**

---

## E. Verificación

| Qué | Resultado |
|---|---|
| Suite completa (`node --test`) | **485 tests, 483 verdes, 2 rojos** — los dos preexistentes por nombre: `classification-care-budget.test.mjs:153` (C.3: el repo ya declara `care_budget` y el test espera ausencia) y `roadmap-engine.test.mjs:93` (los dos canónicos comparten EOL y el test espera que difieran). Son pins de registro deliberados, preexistentes y nombrados por el ticket; **ningún tercero apareció** |
| Tests nuevos | `tests/progress-normative.test.mjs`: **21 de 21 verdes** (la suite pasó de 464 a 485) |
| `checkInvariants` (motor nuevo, resolución cruzada del registro) | **0 errores en los tres canónicos** |
| Este canónico | **56 runs, denso 1..56 verificado (únicos, min 1, max 56), 0 colgantes** |
| Clasificación | **13 runs con los cuatro valores + `classified_at` intactos** (`queue_order` 44-56) |
| Run 46 | `active` al entrar, `active` al salir |
| `roadmap/roadmap.json` | round-trip `serialize(parse(raw)) === raw` → **`true`** (cero escrituras) |
| aiw / cantu-studio | solo LECTURA; 0 errores de invariantes con resolución cruzada |

---

## F. Packet de QA para el operador

Superficies nombradas como aparecen en pantalla. La consola se arranca con
`start-console.ps1` (sirve `http://127.0.0.1:8788/project-console/index.html`).
**Pasos que escriben: SOLO el 6 (y su deshacer, 7). Todo lo demás es lectura o
preview sin escritura.** El paso 6 escribe en el canónico de aiw-console vía la
consola (que reemite `.project/` sola tras cada escritura — comportamiento suyo de
siempre); su deshacer deja el canónico en su contenido anterior.

1. **Abrir el proyecto `aiw-console` → pestaña «Roadmap» → subvista «Run Queue» →
   grupo «History» (desplegarlo).** Esperado: las filas de runs cerrados que sí
   tienen desenlace siguen igual (p. ej. «Closeout — Completed successfully», en
   verde). Las filas de los runs `#4`, `#9`, `#39`, `#40`, `#41`, `#42`, `#43`,
   `#44`, `#45` dicen **«Closeout — No closeout recorded»**, en gris apagado.
   **Si alguna dice «Blocked»:** el defecto C.11 sigue vivo (History pintando
   ausencia como bloqueo). **Si sale en verde sin valor:** la ausencia se está
   disfrazando de éxito.
2. **En ese mismo grupo, click en la fila `#3` («…Roadmap v3 prototype…») para abrir
   su detalle.** Esperado: sección «Progress» con Round 1–4; Rounds 1–3 ruedan
   «Human QA — changes requested», Round 4 «Human QA — passed». **Si no:** el
   ejemplar congelado no es el que se pinta (defecto en §15.a/15.b o en el render).
3. **En el detalle de cualquier run cerrado sin desenlace (p. ej. `#45`), mirar la
   sección «Progress».** Esperado: «run closed» a secas, sin «· blocked» ni marca de
   problema. **Si aparece como problema:** la memoria del sistema sigue corrupta.
4. **Click en un run vivo (p. ej. `#46`) → botón de edición → modal «Edit run» →
   bloque «Status».** Esperado: al elegir `completed` o `blocked` en el desplegable
   aparece el campo **«Closeout result — required to close»** con su placeholder y
   la nota de que el core rehúsa cerrar sin él. **Si el campo no aparece o no se
   nombra requerido:** la consola no está pidiendo el desenlace (defecto C.10, lado
   consola).
5. **Con ese campo VACÍO, pulsar «Preview all changes».** Esperado: la preview
   muestra el rechazo del motor con la razón exacta
   («closing to completed requires a closeout_result …»). **Nada se escribe en una
   preview.** Cerrar el modal con Cancel/X — **no confirmar**. **Si la preview pasa
   en limpio:** el motor está aceptando cierres sin desenlace (defecto C.10, lado
   motor). *(El `#46` debe seguir `active` al terminar este paso.)*
6. **[ESCRIBE] La fila que dice la verdad completa.** En un run vivo cualquiera
   (p. ej. `#47`), abrir «Edit run» → bloque **«Waits on a person»** → añadir el run
   `#3` a la lista → «Preview all changes» → confirmar la escritura. Volver al
   detalle del run: sección «Waits on a person». Esperado: la fila del `#3` dice
   **«work done · reviewed by a person — satisfied»** en verde — el `#3` es el único
   run cuyo `progress` registra QA humana `passed`. **Si dijera «work done ·
   awaiting a person's review»:** el predicado §15.c no está llegando a la fila.
   *(Qué escribe: la clave `depends_on_human_approved` en ese run del canónico de
   aiw-console; la consola reemite `.project/` sola.)*
7. **[ESCRIBE — deshacer del 6]** En el mismo run, «Edit run» → «Waits on a person»
   → vaciar la lista → preview → confirmar. Esperado: la sección desaparece del
   detalle (lista vacía = clave ausente, el estado exacto anterior; el serializador
   es byte-exacto, verificable con `git diff` si se desea). **Si la clave quedara
   como lista vacía:** el motor perdió la regla ausencia-como-única-forma-vacía.
8. **Contraste negativo del 6 (lectura, hacerlo ANTES del 7 si se quiere ver):** en
   la misma sección, cualquier fila cuyo destino NO sea el `#3` (p. ej. si se añadió
   también `#44`, que está `completed` sin `progress`) debe seguir diciendo
   **«work done · awaiting a person's review»**. **Si dijera «satisfied»:** la
   consola está inventando una aprobación que nada registra — la invención exacta
   que la norma prohíbe.

---

## G. Declarado: lo no verificado y las fronteras

- **La detección por el operador del caso §9 del procedimiento** (D.15) está
  registrada aquí por adjudicación del ticket; lo verificable en disco es su
  consecuencia: alta sin clasificar el 2026-08-03, marca de clasificación un día
  después del barrido de los demás, y que ningún mecanismo lo señala como error. No
  hay registro escrito del momento de la detección en pantalla, y no se inventó.
- **No se acuñó D-número** para la adjudicación de §15.c: `context/DECISIONES.md`
  queda fuera del alcance autorizado. Queda apuntado en §15 y aquí.
- **El validador del fork descartado** (`tools/project-console/validate-project-console-state.mjs`,
  D-035) no se tocó: su `assertRoadmapV3RunProgress` (:1501) valida otra superficie
  (`.aiw/roadmap/roadmap.json` del fork, con `active` OBLIGADO a llevar `progress` y
  orden interno estricto). La norma nueva vive en el motor de este repo; ese archivo
  sigue siendo del encargo D-035 y sus dos divergencias (obligación en `active`,
  orden interno) quedan declaradas aquí, no reparadas.
- **`docs/project-console/assets/project-console.js`** es la copia congelada del
  AUDIT (md5 distinto del asset vivo desde el fork inicial); no se sincroniza.
- **Hueco declarado sin decidir:** `insert` de un run nacido terminal no pasa por la
  regla de cierre (C.1 arriba). Ningún flujo real lo usa hoy.
- **`.project/` de este repo quedó sin reemitir a propósito** — lo reemite el
  operador desde la consola (botón **«Re-emit .project/»**, o automáticamente tras
  su primera escritura); hasta entonces las vistas derivadas describen el estado
  anterior a este encargo.
- Los dos tests rojos preexistentes quedan como estaban (fuera de alcance por
  ticket); ninguno guarda relación con estas superficies.

---

# H. ENMIENDA 2026-08-04 — la lista sugerida abarata la obligación

**Adición al record, no reescritura.** Todo lo anterior (secciones A–G) es una
medición fechada el 2026-08-03 y se conserva intacta; esta sección corrige hacia
adelante. **Lo único que queda superado por escrito son los pasos 4 y 5 del packet
de QA (§F)**, reemplazados por H.7 — la pantalla que describen cambió.

**Fecha:** 2026-08-04
**Run:** el mismo, derivado de nuevo por `queue_order` 46 →
`RUN-CONSOLE-PROGRESS-NORMATIVE-001`, título cotejado EXACTO contra
`Freeze the shape of progress so human approval becomes machine-readable`. La guarda
de identidad no se disparó. `active` al entrar, `active` al salir.
**Naturaleza:** encargo de taller. **Se ejecutó completo. Ninguna parada del ticket
se disparó** (las cinco condiciones de parada se comprueban una a una en H.1).
**Archivos escritos:** `project-console/assets/project-console.js`,
`context/aiw-console/CONTRATO.md` (solo la adición §14.a — ver la desviación
declarada en H.5), `tests/closeout-suggested-list.test.mjs` (nuevo, 280 líneas) y
este record. **Ningún otro.**
**Lo que NO se escribió:** `roadmap/roadmap.json` (round-trip byte-idéntico
verificado al final), `tools/roadmap/roadmap-core.mjs` (**el motor no se tocó en esta
enmienda**: sigue con los cuatro hunks que le dejó el 2026-08-03 y ni uno nuevo — la
obligación no se relajó ni un byte), ningún dato de run, ningún status, ningún
relleno de `closeout_result`, ninguna clasificación, nada en `aiw` ni en
`cantu-studio`, `.project/` sin reemitir (lo hace el operador), git en ninguna forma.

## Resultado en una línea

**Cerrar un run a mano dejó de exigir redactar: la superficie de cierre ofrece cinco
desenlaces sugeridos con `done as specified` preseleccionado y una entrada visible
para escribir uno propio. La obligación NO se relajó — el motor sigue rehusando el
cierre mudo, sin una línea nueva — y la lista no es un vocabulario: el motor no
conoce ninguno de los cinco tokens y sigue aceptando cualquier texto no vacío.
0 runs existentes tocados; los 9 de 45 terminales sin desenlace siguen sin él.**

---

## H.1 Las cinco paradas del ticket, comprobadas una a una

| Parada | Condición | Medido | Resultado |
|---|---|---|---|
| A.2 | §15 ya declara un vocabulario para `closeout_result` | §15 (CONTRATO:1564-1665) gobierna `progress` y **no menciona `closeout_result` ni una vez** (`grep -n closeout_result CONTRATO.md` → ninguna coincidencia en ese rango). El único «sin enum» de §15 es el de `progress[].result`, y cita el criterio de §14 | **NO se dispara** |
| B.3 | La implementación obliga a cerrar la lista | No obliga: la lista vive solo en la pantalla y el motor no la conoce. Probado por test, no por lectura — `B.2` de la suite nueva falla si el motor llega a nombrar cualquiera de los cinco tokens | **NO se dispara** |
| B.7 | La implementación lleva a que el motor rellene el campo | El motor no se editó en esta enmienda: `git diff -U0 -- tools/roadmap/roadmap-core.mjs` sigue mostrando **exactamente los cuatro hunks del 2026-08-03** (importación y reexportación de `progress`, forma en `checkInvariants`, obligación en `setStatus`), sin una línea nueva. El test `C.1` prueba que un `set-status` mudo se rehúsa y **deja el run intacto, sin clave inventada**; el test `C.2` prueba que la caja vacía no manda argumento, de modo que la negativa **sigue siendo alcanzable desde la pantalla** | **NO se dispara** |
| F.17 | Exige tocar un documento normativo aparte de la precisión en `CONTRATO.md` | Solo `CONTRATO.md`, una adición de 32 líneas. `PROCEDIMIENTO-DE-CLASIFICACION.md`, `DECISIONES.md` y `CONSTITUCION.md` sin tocar | **NO se dispara** — con una desviación de ubicación declarada en H.5 |
| F.18 | Cualquier otra decisión no autorizada | Una condición apareció y **no se decidió**: el hueco de `insert` (H.4), que el ticket ya anticipaba en C.8-9. Se midió, se cifró el coste y se recomienda, sin tocar nada | **NO se dispara** |

---

## H.2 Lo construido, y dónde vive cada pieza

**Los cinco valores, transcritos verbatim y en el orden del ticket**, en una
constante de la PANTALLA y en ningún otro sitio
(`project-console/assets/project-console.js:5763`):

```
done as specified · done with deviations · superseded · not needed · partially done
```

- **Por qué viven en la consola y no en el motor** (:5754-5762, el comentario lo
  fija): la obligación es del motor, la lista no. Una lista que el motor conociera
  estaría a una edición de convertirse en el enum que §14 rehúsa. El test `B.2`
  (`tests/closeout-suggested-list.test.mjs:150`) vigila esa frontera: falla si
  `roadmap-core.mjs` o `roadmap-plan.mjs` llegan a contener cualquiera de los cinco.
- **La preselección** (:5773-5791): `done as specified` va seleccionado cuando el run
  **va a cerrarse** (hoy `planned` o `active`) y el campo está vacío. Con el campo
  lleno se selecciona lo que hay: si el valor almacenado es uno de los cinco, ese; si
  no lo es —el caso real de este canónico, `completed_successfully` en 33 runs— se
  selecciona «Write my own outcome…» **con el texto almacenado en la caja, verbatim**,
  nunca reescrito a un valor de la lista.
- **La vía visible para escribir uno propio** (:5849): la entrada
  «Write my own outcome…», última del desplegable, abre la caja «Your own outcome».
  El handler que la revela (:6355-6368) lee el desplegable, así que caja y selección
  no pueden discrepar; y no borra lo tecleado al volver atrás.
- **La recolección** (:6641-6657): manda el texto que el operador está mirando.
  **La preselección se detiene ahí** — «Write my own» con la caja vacía manda
  `set-status` **sin** `closeoutResult`, y el motor rehúsa con su razón exacta.

**Qué NO cambió:** `tools/roadmap/roadmap-core.mjs` (`setStatus`, la obligación de
C.1 arriba), el aviso «Closing to completed or blocked REQUIRES a closeout result»,
la celda de History («No closeout recorded», C.2 arriba), y la vía de escritura.

---

## H.3 El defecto que la enmienda pudo introducir, encontrado y cerrado antes de entregar

**Una preselección ingenua habría rellenado los 9.** La primera versión preseleccionaba
`done as specified` en **todo** run con el campo vacío, terminal incluido. La consola
solo manda al motor las operaciones cuyo valor **cambió**
(`v3BatchOpChanged`, `project-console.js:6483-6488`): con esa versión, abrir el `#45`
—cerrado sin desenlace— para **corregirle una errata del título** producía
`"" → "done as specified"`, y eso es un cambio: el batch habría escrito en un run
pasado un desenlace que nadie afirmó. Exactamente el relleno que el ticket prohíbe.

**Cerrado así** (:5773-5780): un run **ya terminal sin desenlace** no está cerrándose
—se cerró antes de que la regla existiera— y recibe una entrada honesta,
**«(no outcome recorded)», preseleccionada**, que vale cadena vacía. La consola no
manda argumento, el detector no ve cambio, y no se escribe nada. Si el operador
quiere darle un desenlace a uno de los 9, lo elige: es un acto deliberado suyo, la
capacidad que ya tenía. **La preselección pertenece al ACTO de cerrar, y solo ahí.**

Los dos tests que fijan esto son `D.1` (`tests/closeout-suggested-list.test.mjs:237`)
y `D.2` (:245).

---

## H.4 El hueco declarado por el encargo anterior: `insert` de un run nacido terminal

**Medido hoy, criterio C.8 del ticket: SÍ, hoy se puede crear un run ya cerrado sin
desenlace, y no solo desde la línea de comandos — desde la pantalla.** La cadena, con
su `archivo:línea`:

| Eslabón | Ruta:línea | Qué falta |
|---|---|---|
| Motor | `tools/roadmap/roadmap-core.mjs:830` | `insertRun` desestructura sus opciones: **no hay `closeoutResult`** |
| Motor | `tools/roadmap/roadmap-core.mjs:839` | admite los cuatro `STATUSES`, terminales incluidos, **sin condición añadida** |
| Motor | `tools/roadmap/roadmap-core.mjs:879-887` | el run candidato se construye con siete claves; `closeout_result` **no es una de ellas y no hay por dónde pasarla** |
| Relevo | `tools/roadmap/roadmap-plan.mjs:48-58` | el despacho de `insert` relega ocho argumentos; **ninguno es el desenlace** |
| Pantalla | `project-console/assets/project-console.js:6048-6049` | el desplegable «Status» del formulario de alta ofrece **los cuatro**, `completed` y `blocked` incluidos |
| Pantalla | `project-console/assets/project-console.js:6603` | la recolección manda ese `status` tal cual |

**Prueba de ejecución** (dry-run sobre `tests/fixtures/lanes`, sin escribir; `planEdit`
nunca escribe, `applyPlan` sí):

```
node --input-type=module -e "import { planEdit } from './tools/roadmap/roadmap-plan.mjs';
  for (const status of ['completed','blocked']) {
    const p = planEdit({ filePath:'tests/fixtures/lanes/project/roadmap/roadmap.json', op:'insert',
      args:{ runId:'RUN-BORN-TERMINAL-001', title:'t', summary:'s', fullDescription:'d', status, after:'RUN-FIX-BASE-001' } });
    console.log(status, 'ok:'+p.ok, 'errores:'+(p.errors||[]).length, 'avisos:'+(p.warnings||[]).length,
      'lleva closeout_result:'+/closeout_result/.test((p.serialized.split('RUN-BORN-TERMINAL-001')[1]||'').slice(0,600))); }"

completed ok:true errores:0 avisos:0 lleva closeout_result:false
blocked ok:true errores:0 avisos:0 lleva closeout_result:false
```

Sin error y **sin advertencia**: el alta pasa limpia.

**NO se reparó, y el motivo es el criterio C.9 del ticket.** No basta con que lo cubra
la superficie de cierre: `insert` es un acto distinto de `set-status`, no pasa por él,
y ninguna edición de la pantalla de cierre lo alcanza. Cerrarlo exige tocar la
operación de inserción, que el ticket excluye.

**Coste medido de cada opción, para la cabina:**

| Opción | Qué toca | Coste | Riesgo |
|---|---|---|---|
| **A. Canal de desenlace en `insert`** | `roadmap-core.mjs` (3 líneas: opción, validación, escritura), `roadmap-plan.mjs` (1 línea), formulario de alta de la consola (campo + recolección, ~6 líneas), tests | ~10 líneas de producción + tests | Bajo. Es la simetría exacta de `setStatus`, misma clase de regla (precondición del acto) |
| **B. Quitar los terminales del alta** | Solo la consola (`:6048`) | 1 línea | Retira una capacidad que existe hoy y el hueco sigue abierto por CLI. **Es adjudicación**: nadie decidió que un run no pueda nacer cerrado |
| **C. Dejarlo** | Nada | 0 | El hueco sigue; ningún flujo real lo usa (la consola inserta `planned` por defecto y el canónico no tiene un solo run nacido terminal) |

**Recomendación explícita: la A**, y **no urgente**. Es la única que cierra el hueco sin
retirar capacidad, y es la simetría natural de la regla que ya rige el cierre. Nada
obliga a hacerla hoy: el hueco no ha producido un solo dato malo en 56 runs. La B
parece barata y no lo es — decide, en una línea de pantalla, algo que nadie adjudicó.

---

## H.5 La precisión en el contrato, y una desviación declarada

`CONTRATO.md` ganó **§14.a — «PRECISIÓN — la lista de la consola es SUGERIDA, no un
vocabulario»** (líneas 1531-1562): dice que los cinco son sugerencia y no enum, que
viven solo en la pantalla, que el motor sigue aceptando cualquier texto no vacío, que
la preselección no es default del motor, y que un run ya terminal sin desenlace no se
rellena. **No relaja nada y no cambia una coma de §14, §15 ni §21.**

**DESVIACIÓN DECLARADA, no decidida a espaldas de la cabina.** El ticket autorizaba la
precisión **en §15**. Se escribió **en §14**. El motivo es de archivo, no de fondo:
§15 gobierna `progress` y no menciona `closeout_result` ni una vez (H.1); §14 **es** la
sección de `closeout_result` y la que declara que no se convierte en enum — una nota
sobre la naturaleza de una lista de desenlaces, archivada bajo `progress`, quedaría
donde nadie la buscará. El texto es exactamente el autorizado; solo cambia el número de
sección, dentro del mismo documento y sin tocar ningún otro. **Moverla a §15 es un
corta-y-pega de 32 líneas si la cabina prefiere la letra del encargo.**

---

## H.6 Verificación

Toda cifra es del canónico de este proyecto (`roadmap/roadmap.json`) salvo donde se
diga otra cosa. Los comandos se ejecutaron desde `projects/aiw-console/`.

| Qué | Comando | Resultado |
|---|---|---|
| Suite completa | `node --test` | **497 tests, 495 verdes, 2 rojos** — los dos preexistentes por nombre: `classification-care-budget.test.mjs:153` y `roadmap-engine.test.mjs:93`. **Ningún tercero apareció** (la suite pasó de 485 a 497) |
| Tests nuevos | `node --test tests/closeout-suggested-list.test.mjs` | **12 de 12 verdes** |
| El test que DEBE fallar si la obligación cae | `C.1` replicado contra una **copia mutante** del motor (en temp) con la regla de cierre borrada | **ROJO**, como debe: «a mute close to completed must be refused». Con el motor real: verde. La copia se borró; el motor del repo no se tocó |
| Un desenlace fuera de la lista se acepta | `B.1` (4 casos, incluidos prosa con fecha y un emoji) | verde, y **guardado byte a byte** |
| `checkInvariants` | motor del repo, sobre el canónico | **0 errores** |
| Este canónico | conteo directo | **56 runs; denso 1..56** (56 únicos, min 1, max 56); **0 colgantes**; 45 terminales, 10 `planned`, 1 `active` |
| Clasificación | conteo directo | **13 runs con los cuatro valores y `classified_at`** — intactos, ni uno escrito |
| **Terminales sin `closeout_result`** | conteo directo, **antes y después** | **9 de 45**, los mismos por `queue_order`: **4, 9, 39, 40, 41, 42, 43, 44, 45**. La cifra del encargo anterior se confirma: sigue siendo 9 de 45, ninguno rellenado |
| Run 46 | lectura | `active` al entrar, **`active` al salir** |
| `roadmap/roadmap.json` | round-trip `serialize(parse(raw)) === raw` y `git diff` | **`true`**; el único cambio del árbol de trabajo en ese archivo es `#46` `planned → active`, **anterior a este encargo** (lo activó el operador) |
| `aiw` / `cantu-studio` | — | **ni leídos ni escritos en este encargo** |

---

## H.7 Packet de QA — los pasos que cambian

**Estos dos pasos SUSTITUYEN a los pasos 4 y 5 de §F.** Los pasos 1, 2, 3, 6, 7 y 8 de
§F siguen válidos tal cual. Superficies nombradas como aparecen en pantalla; la consola
se arranca con `start-console.ps1` (sirve
`http://127.0.0.1:8788/project-console/index.html`). **Ninguno de estos tres pasos
escribe.**

**4′. El desplegable de desenlaces, y la preselección.** Proyecto `aiw-console` →
pestaña **«Roadmap»** → subvista **«Run Queue»** → click en un run vivo (p. ej. el
`#46`) → botón de edición → modal **«Edit run»** → bloque **«Status»**. Elegir
`completed` en el desplegable de estado. Esperado: aparece
**«Closeout result — required to close»**, ahora como **desplegable**, con estas seis
entradas en este orden — `done as specified`, `done with deviations`, `superseded`,
`not needed`, `partially done`, `Write my own outcome…` — y **`done as specified` ya
seleccionado**. Debajo, la nota que dice que los cinco son una sugerencia y no un
vocabulario.
**Si hay que teclear para cerrar:** la enmienda no llegó a la pantalla.
**Si falta alguno de los cinco, o el orden cambió:** la lista se transcribió mal.
**Si «Write my own outcome…» no está:** se cerró el vocabulario — el defecto que el
ticket prohíbe. *(Cerrar el modal con Cancel/X. El `#46` debe seguir `active`.)*

**5′. La vía propia, y que el motor sigue rehusando.** En el mismo modal, con
`completed` elegido, seleccionar **«Write my own outcome…»**. Esperado: aparece la caja
**«Your own outcome»**, vacía. Escribir cualquier texto que no esté en la lista (p. ej.
`abandonado al retirarse el proveedor`) y pulsar **«Preview all changes»**: la preview
debe **aceptarlo**. Después, **vaciar la caja** y volver a pulsar **«Preview all
changes»**: la preview debe mostrar el rechazo del motor con su razón exacta
(«closing to completed requires a closeout_result …»). **Una preview no escribe nada.**
Cerrar con Cancel/X — **no confirmar**.
**Si el texto propio se rechaza:** la lista se volvió un enum.
**Si con la caja vacía la preview pasa en limpio:** la obligación se volvió decorativa
y volvió el cierre mudo — el defecto más grave que esta enmienda podía causar.
*(El `#46` debe seguir `active` al terminar.)*

**Paso 9 (NUEVO, lectura, y es el que protege los 9 runs pasados).** En el grupo
**«History»**, abrir el detalle de un run cerrado **sin** desenlace (p. ej. el `#45`) →
botón de edición → modal **«Edit run»** → bloque **«Status»**. Esperado: el desplegable
de desenlaces muestra **«(no outcome recorded)»** seleccionado, **no**
`done as specified`. Cambiar **solo el título** (añadir y quitar una letra vale) y
pulsar **«Preview all changes»**: la preview debe listar **únicamente el cambio de
texto**, sin fila de «Closeout result». Cerrar con Cancel/X.
**Si apareciera `done as specified` preseleccionado, o la preview trajera una fila de
Closeout:** la consola está rellenando runs pasados con un desenlace que nadie afirmó.

---

## H.8 Declarado: lo no verificado y las fronteras de esta enmienda

- **Nada se verificó en un navegador real.** El render, la recolección y el detector de
  cambios se ejercitan con el renderizador REAL dentro de `node:vm`
  (`tests/helpers/console-dom.mjs`), que **no** es un navegador: el evento `change` que
  revela la caja «Your own outcome», el foco y el CSS quedan fuera de su alcance y con
  el operador (pasos 4′ y 5′). Lo verificable sin navegador —qué HTML se pinta, qué
  carga útil se construye, qué contesta el motor— está fijado por los 12 tests.
- **El paso 6 de §F (el único que escribía) no se re-ejecutó** en este encargo: escribe
  en el canónico y esta enmienda no necesitaba escribir. Sigue siendo válido.
- **No se acuñó D-número** para §14.a: `context/DECISIONES.md` queda fuera del alcance.
- **`docs/project-console/assets/project-console.js`** (copia congelada del AUDIT) y
  `tools/project-console/validate-project-console-state.mjs` (fork descartado, D-035)
  **no se tocaron**; siguen como los dejó §G.
- **`.project/` sigue sin reemitir**, a propósito: lo hace el operador desde la consola
  (botón **«Re-emit .project/»**). Hasta entonces las vistas derivadas describen el
  estado anterior.
- **Los dos tests rojos preexistentes** siguen rojos y siguen fuera de alcance; ninguno
  toca esta superficie.
