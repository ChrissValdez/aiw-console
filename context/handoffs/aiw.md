# Handoff — hilo `aiw`

> **Reescrito el 2026-08-06.** Sustituye al del 2026-08-03. Última sesión corrida en
> modo ESPEJO (cabina sin workspace montado); **la siguiente abre en Cowork, modo
> CONECTADO**. Toda cifra de aquí lleva su fecha de medición: es una medición fechada,
> no el estado de hoy. Se re-mide en el punto de uso.
>
> **La sustancia va DENTRO.** `context/aiw-console/records/` no llega al knowledge del
> Project, así que un puntero a un record no resuelve para quien lee esto.

---

## 0. LO PRIMERO QUE LA CABINA NUEVA NECESITA SABER

**El `git status` de `aiw` MIENTE desde una cabina Linux.** `aiw` **no tiene
`.gitattributes`**; la cabina de Cowork corre en Linux y no aplica la conversión CRLF
del Git de Windows. Medido por el hilo `aiw-console` el 2026-08-06: reporta del orden
de **119 ficheros «modificados» que en la máquina del operador son cero**.

**Consecuencia operativa, y es dura:** cualquier guarda de «árbol limpio» que la cabina
escriba **saltará siempre** si no pasa el `status` por `--ignore-cr-at-eol`. La forma:

```
git status --porcelain --ignore-cr-at-eol
```

Y al reportar un `git status` de `aiw`, la cabina **declara cuál de las dos lecturas
está dando**. Si no puede, pide el `git status` de Windows y lo dice.

**Que `aiw` gane un `.gitattributes` es hallazgo de otros hilos** (`aiw-console` lo tiene
como run con dueño). Se NOMBRA aquí y no se corrige desde este hilo.

**Corolario relacionado, medido y vigente:** `git checkout` **no se usa para deshacer en
este workspace**, porque reescribe finales de línea. Respaldo byte a byte fuera del repo
antes de escribir, y restaurar de ahí.

---

## 1. DÓNDE ESTÁ TODO — medido el 2026-08-06

| | |
|---|---|
| `aiw` HEAD | **`5d2c9ef`**, empujado a `origin/main` |
| árbol de `aiw` | **limpio** (medido en Windows) |
| runs | **46** — 25 `completed`, **21 `planned`**, **0 `active` en el canónico** |
| `queue_order` | denso, único y contiguo **1..46** |
| aristas `depends_on` | 21, **0 colgantes** |
| objetivos / fases | 6 objetivos (**no hay `O4`**), 33 fases, una vacía |
| canónico | `aiw/roadmap/roadmap.json` — **derivado ejecutando el resolvedor de la consola**, no tecleado |
| md5 del canónico | `5c7cf8bd9dc10f0f2657b693f9bf143b` (2026-08-03; **re-medir**) |

**El canónico se localiza por procedencia, no por preferencia:** `.project/roadmap.json`
declara `sources: [{path: "roadmap/roadmap.json"}]`. La consola prueba dos layouts de
`ROOT_LAYOUTS` y solo `repo_root` existe y conforma. **Deriva la ruta midiendo; no la
heredes de este documento.**

**El instrumento está certificado dos veces:** `aiw/.project/roadmap.json` y el canónico
coinciden en **126/126 comparaciones** (21 runs × 6 campos) al 2026-08-03. La proyección
no miente sobre los vivos; su límite es leerla por fragmentos, no su contenido.

---

## 2. EL ESTADO DE `#22` — y es lo primero que la sesión nueva atiende

**`#22` «Run the first real objective against a large repository with a test net» está
`active` en el canónico y NUNCA CORRIÓ.** Se abrió al principio de la sesión y la ventana
se perdió por agotamiento de turnos, no por un fallo.

**Verificado el 2026-08-06 en disco:** `locks/` vacío, `logs/007*` vacío, y la rama
`aiw/007-console-closure-mode-row-tag` **no existe** en `aiw-console`. **No se lanzó.**

**Lo que SÍ está hecho y commiteado:**

- El objetivo vive en `aiw/objectives/pending/007-console-closure-mode-row-tag.md`,
  **7 080 bytes, md5 `fb2aabbe6897c8de4f1a19637ce0ec76`**, LF, sin BOM, **trackeado por
  git** (importa: `D-024` dice que la cola archiva objetivos trackeados con `git mv`, y
  un `git mv` sobre un fichero sin trackear falla).
- Validado contra los parsers del propio kernel (importados, sin invocar `main()`):
  `project=console`, `maxRounds=3`, dos globs de scope, y `evaluateGuards` bloqueando
  CSS, `roadmap/`, `context/`, `.project/` y el derivador — **con contraprueba** de que
  los dos ficheros en scope pasan.

**El trabajo que ordena**, dictado por el hilo `aiw-console` y no rediseñado por nosotros:
pintar la etiqueta de `closure_mode` junto a la de `severity` añadiendo un segundo
`tags.push(...)` en **`v3RunRowTags`** de `project-console/assets/project-console.js`, con
la misma guarda de ausencia que ya usa `severity`; y añadir
**`correctness_model: "SPECIFIED"`** al fixture con clasificación de
`tests/classification-transport-and-console.test.mjs`.

**La función se ancla por NOMBRE, nunca por línea.** Medido dos veces que sus coordenadas
se mueven: el otro hilo la situó en `3409-3412` y estaba en `3419-3436`; sus llamadas en
`:3427`/`:4491` y estaban en `:3449` y `:4521`. Hay una **cuarta aparición** del nombre en
`:3169` que es **un comentario**, no una llamada — nos paró una vez; no vuelve a hacerlo.

**Verificación del objetivo, tras dos enmiendas:** «**`npm test` no gana ningún fallo
nuevo respecto a la línea base**», nunca «suite verde». La línea base son **exactamente
dos** fallos pre-existentes de `aiw-console`, medidos contando `AssertionError` sobre el
log entero el 2026-08-06:

- `tests/roadmap-engine.test.mjs:93`
- `tests/classification-care-budget.test.mjs:153`

Ambos ficheros, más `.gitattributes`, quedan **PROHIBIDOS al ejecutor**. Razón de fondo,
que es del taller y mejora la nuestra: `roadmap-engine.test.mjs` mide normalización de
EOL, así que dejarlo abierto permitiría **fabricar un verde cambiando la normalización en
vez del test**.

**El primero de esos dos no es deuda: es un pin de registro deliberado.** Su propio
mensaje instruye *«update the record, keep the test»*. Está diseñado para ponerse rojo
cuando la realidad cambia, y lo que descubrió es un cambio real en los datos de
`aiw-console`. Llamarlo «suite roja» fue vocabulario nuestro y era incorrecto.

**Para relanzar hacen falta cuatro condiciones, y todas se re-miden:** `aiw` limpio,
`aiw-console` limpio, sin rama `aiw/007*`, y **ventana concedida por el hilo
`aiw-console`**. La ventana se verifica por el **último commit que tocó los ficheros del
alcance**, no por el HEAD (`D-063`): en `aiw-console` escriben tres hilos y sus records de
Cantu mueven el HEAD sin tocar código. Al ceder la ventana, `project-console.js` estaba en
`6ee3277` (2026-08-04).

**Antes de relanzar hay que preguntar una cosa:** el run siguiente de `aiw-console` toca
ese mismo fichero y quedó liberado. **Si lo ejecutan y pinta las etiquetas, el `007` se
queda sin trabajo** y hay que retirarlo, no relanzarlo.

---

## 3. LA COMPUERTA `CONST §4` SOBRE LOS 21 — re-adjudicada el 2026-08-03

`CONST §4` (`aiw/CONSTITUCION.md:29-33`) exige, para todo run que **añada mecanismo**
—código o paso nuevo en kernel, cola, lanzadores o guards, según `D-055`—: incidente
documentado con cuatro campos, criterio de borrado en forma «se elimina si X», y
presupuesto de líneas contra el techo.

**El techo, verbatim de `aiw/CONSTITUCION.md:29`:** *«Techo duro del kernel: ~500 líneas.
Para añadir, se borra.»* **`kernel.mjs` tiene 478 líneas** (medido 2026-08-03, termina en
salto de línea) → **22 líneas de holgura**, que es la cifra que los propios runs citan.
El enforcement es **humano y documental**: ningún test, hook o check verifica el techo.

**Reparto: 8 runs NO detenidos por la compuerta, 13 sí.** Confirma el reparto heredado del
record del 2026-08-02, ahora medido contra disco.

**Los 8, con su declaración verbatim:**

| `#N` | título | por qué no lo detiene |
|---|---|---|
| 22 | Run the first real objective against a large repository with a test net | «this run measures, it does not add code or a new step» |
| 30 | Turn on push per project | «the push path already exists in the kernel and reports itself as not configured» |
| 34 | Write one manifest of identity and outcome per run | **tres criterios completos** (`D-055` caso 1) |
| 37 | Document what a run writes and where | «documentation is paper» |
| 40 | Document categories and batches | «documentation is paper» |
| 41 | Make the queue survive the terminal that launched it | **tres criterios completos** (`D-055` caso 2) |
| 45 | Run real long unattended sessions and count them honestly | «this run EXERCISES the mechanisms and measures the result; it adds none of its own» |
| 46 | Document how to run and audit an unattended window | «documentation is paper» |

**Salvedad sobre `#30`:** de los seis no-mecanismo, cinco caen en categorías que `D-055`
excluye por escrito (papel y medición). `#30` no: su exclusión descansa en un argumento
propio. Es el único cuya exclusión es argumental y no categórica.

**Los 13 detenidos:**

- **Diez declaran «MECHANISM, INCIDENT PENDING»** en su propio texto: `#23`, `#28`, `#29`,
  `#32`, `#35`, `#36`, `#38`, `#39`, `#43`, `#44`.
- **Dos declaran «ITS INCIDENT IS DOCUMENTED; ITS DELETION CRITERION IS NOT»:** `#33`
  «Give every run an identity its log folder cannot silently overwrite» y `#42`.
- **`#31` «The intake»** lleva su adjudicación abierta, verbatim: *«Whether section 4
  reaches a new component that translates roadmap into contract […] IS AN OPEN QUESTION
  THAT MUST BE SETTLED IN DECISIONES.md BEFORE THIS RUN EXECUTES.»* Su propio texto añade
  el argumento a favor: *«D-055 defines mechanism as code or a new step in aiw — kernel,
  queue, launchers, guards — AND AN INTAKE IS NONE OF THOSE FOUR.»* **No se resolvió.**

**`#41` queda dentro pese a un hueco de la fuente.** `D-055` declara presupuesto de líneas
en tres lugares —la norma (`DECISIONES.md:1823`), el caso 1 (`:1857`) y el caso 4
(`:1936`)— y **no en el caso 2** (`:1860-1886`, que sí trae los cuatro campos y criterio de
borrado). La compuerta exige que **el run** lo declare, y `#41` lo declara en su texto
(`3. LINE BUDGET`). Es deuda documental de `DECISIONES.md`, no compuerta cerrada.

---

## 4. EL CRUCE QUE DECIDE QUÉ SE PUEDE ABRIR — medido el 2026-08-06

Cruzando la compuerta con `depends_on` (elegible = todas sus dependencias `completed`):

**Solo DOS runs son ejecutables: `#22` y `#41`.** Los dos con `deps=0`.

Los otros seis que `§4` no detiene están esperando aristas: `#30`→`#29`; `#34`→`#33`;
`#37`→`#33`,`#34`; `#40`→`#38`,`#39`; `#45`→ seis; `#46`→`#41`. Y de los once elegibles por
aristas, nueve están detenidos por la compuerta.

**El desbloqueo más barato del roadmap:** `#34` tiene sus tres criterios completos y está
bloqueado detrás de `#33`, al que la compuerta detiene **solo por el criterio de borrado
que falta**. Su incidente ya está documentado. **Una entrada de papel en `DECISIONES.md`
abre dos runs.** No se propuso; queda nombrado.

**AVISO QUE INVALIDA ESTE CRUCE, y hay que re-medirlo:** el hilo `aiw-console` adjudicó
que **un ciclo con `human_qa` positivo satisface una arista `depends_on_human_approved`, y
que `completed` a secas NO la satisface** — los cuatro estados no distinguen un run que
cerró una IA de uno que revisó una persona. Está en su `CONTRATO.md` §15 y entró en su
repo con el commit `6ee3277`. **La medición de arriba cuenta `depends_on` contra `status`,
que es la semántica vieja.** Cuando eso llegue por `DECISIONES.md`, **la elegibilidad de
los 21 se re-mide entera**. Hoy no cambia nada: los dos ejecutables no tienen aristas.

---

## 5. «EL TERCERO» — cerrado, no queda pendiente

El texto de dos runs vivos dice *«One of only three runs in this roadmap that can execute
on the strength of an incident that is already documented»*, y la sesión anterior solo
encontró dos. **El tercero es `#24` `RUN-AIW-TICKET-PARSE-REGRESSION-TEST-001`, ya
`completed`** — barrido sobre los 46, no sobre los vivos. Los tres:

| `#N` | `status` | caso de `D-055` |
|---|---|---|
| 24 | `completed` | caso 4, corregido por `D-056` |
| 34 | `planned` | caso 1 |
| 41 | `planned` | caso 2 |

La frase dice «in this roadmap», no «entre los vivos». **Entre los 21 vivos son dos.**
Los `completed` no son un prefijo contiguo: `#24`–`#27` están intercalados entre vivos.

---

## 6. LOS DOS BLANCOS DESCARTADOS — con la medición que los descartó

`#22` pide, verbatim, *«a measurement of what the kernel actually did against a large
surface with a real test net»*. **Ningún run del roadmap nombra contra qué repositorio
corre** — comprobado leyendo los 21 textos verbatim.

**`cantu-studio` — DESCARTADO.** Tres obstáculos, el tercero decisivo:
1. **No está registrado** en `aiw/config.json` (`kernel.mjs:275` mata antes de tocar disco).
2. **No existe comando de verificación que funcione:** no tiene `package.json` en la raíz y
   ninguno de sus cuatro declara script `test`. Copiar `"npm test"` daría baseline rojo.
3. **Declara `aiw_managed: false`, `mode: external_manual_readonly`, «No hagas commits» y
   un guardarraíl `ACTIVE`** contra tocar el checkout monitoreado. El kernel commitea cada
   ronda. **Es política declarada por otro hilo y no se levanta desde aquí.**

*(Cifra corregida de paso: el audit del 2026-07-24 citaba «~262 casos» de test; el número
real medido son **350 en 32 archivos**.)*

**`cantu-quizzes-latex` — NO DISPONIBLE TODAVÍA.** Existe desde el 2026-08-06 como cuarto
proyecto con hilo propio, repo con contenido real, canónico de 3 objetivos y 10 fases sin
runs, y `.project/` emitido. **Pero no tiene comando de verificación y la máquina no tiene
toolchain de LaTeX — 0 de 8 binarios.** Su hilo avisará. Su sitio natural es como blanco de
`#45`, no de `#22`.

**`aiw-console` — EL BLANCO ELEGIDO.** Registrado como `console`, `verification: "npm test"`
ejecutable (`package.json:7-9` declara `"test": "node --test"`), `base_branch: "main"`.
Coste de habilitación **cero**. **No declara ningún guardarraíl** equivalente al de
`cantu-studio` y confirmaron que no lo declararán.

**Tamaño medido el 2026-08-06:** 297 ficheros trackeados, **8 623 486 bytes ≈ 8,6 MB** —
`.md` 174 ficheros/4,41 MB, `.json` 59/2,08 MB, `.mjs`+`.js` 51/**1,66 MB de código**.
No es un sandbox. **La comparación contra «los repos pequeños» anteriores NO es medible:**
el `path` de `sandbox` en `config.json` ya no existe en disco.

**Restricción propia que se conserva en cualquier blanco:** el alcance queda **fuera de
`context/`**. Ahí viven los records de los tres hilos y los handoffs.

---

## 7. LA MEDICIÓN QUE `#22` PROMETE: SALEN 4 DE 5

Su texto promete medir cinco cosas. Medido con `ruta:línea` el 2026-08-06:

- **Rondas consumidas** — sale del log.
- **En qué bloqueó el reviewer** — sale del log.
- **Dónde se fue el tiempo del executor** — exige unir `STAGE.txt` con `config.json` a
  mano; el kernel **no congela los límites vigentes en el log**.
- **Si los timeouts están bien dimensionados** — igual que el anterior.
- **Si el tope de diff truncó algo que el reviewer necesitaba — NO SE PUEDE MEDIR.** El
  marcador de truncamiento (`kernel.mjs:394`) entra solo en el prompt del reviewer, el
  prompt **no se escribe nunca a disco** (`:402-403` guarda solo la respuesta), la longitud
  del diff no se mide, y `prompts/reviewer.md` no pide denunciarlo.

**Adjudicado por cabina, y se mantiene:** `#22` entrega cuatro de cinco y **declara la
quinta como hueco medido**. **No se añade código para cerrarla** — sería mecanismo nuevo
bajo `CONST §4`, y el propio texto de `#22` declara *«No mechanism under CONST §4»*.
**El hueco tiene destino:** si una ventana contra repo grande muestra que el reviewer
bloqueó por diff truncado, **eso es el incidente con sus cuatro campos**, y el mecanismo
entra por la puerta.

---

## 8. HALLAZGOS SUELTOS — nombrados, sin ticket, todos de `aiw`

Ninguno se corrigió: no eran alcance de `#22`.

1. **`config.json` usa la clave `path`, no `root`.** El kernel la lee como `project.path`
   (`kernel.mjs:276`). Un ticket de esta cabina la llamó `root` por copiarla de un audit
   viejo en vez de medirla.
2. **El proyecto `sandbox` de `config.json` tiene un `path` que no existe en disco.**
   Abortaría hoy si alguien lo apuntara.
3. **`base_branch` no tiene ninguna validación** y se usa a ciegas en seis sitios
   (`kernel.mjs:312, 318, 333, 393, 435, 457`).
4. **`verification` solo admite `"npm test"` en la práctica**, y los dos proyectos que
   `config.json` declara lo tienen así. **Que admita otra cosa —una compilación de LaTeX—
   es trabajo de `aiw`, y es prerequisito de que `cantu-quizzes-latex` sea blanco.**
   Probablemente mecanismo bajo `CONST §4`. Lo pidió el hilo `aiw-console`.
5. **`aiw` no tiene `.gitattributes`** — ver §0.
6. **`git_history.json` NO aparece en el `git status` de `aiw`**: está ignorado. Es
   `D-053` adjudicación 4 **ya ejecutada aquí**, y `aiw` es el único de los tres donde lo
   está. Si la consola pinta un banner de artefacto no cargado sobre `aiw`, **no es
   avería: es pulsar Sync History**. Deuda §8.3 del handoff anterior: **CERRADA**, sin
   nada que reparar en `aiw`.

---

## 9. LOS OTROS HILOS — estado al 2026-08-06, según ellos

**`aiw-console`** en **`ca64caf`**, árbol limpio, **56 runs, 0 `active`**. Su run que toca
`project-console.js` quedó **liberado** al confirmarles que no lanzamos.

**Dos entradas nuevas de `DECISIONES.md` que obligan a este hilo:**
- **`D-062`** — un contenedor sin runs es válido y no deriva nada.
- **`D-063`** — registra el cuarto hilo y **los tres acuerdos** que se intercambiaron por
  mensajes: (a) la ventana se verifica por el **último commit que tocó los ficheros del
  alcance**, no por el HEAD; (b) el criterio de un objetivo ajeno es **«no gana fallos
  nuevos»** y nunca «suite verde»; (c) **un pin de registro no es deuda**.

**`cantu-quizzes-latex`** — cuarto proyecto, hilo propio desde el 2026-08-06. Ver §6.

**Recordatorio permanente:** en `aiw-console` escriben ahora **cuatro** hilos. El `git add`
sobre ese repo va **SIEMPRE dirigido a ficheros por su nombre**, nunca `-A`.

---

## 10. LO QUE HACE LA SESIÓN NUEVA, EN ORDEN

1. **Arranque de Cowork:** declarar hilo, derivar la ruta de montaje, probar capacidad, y
   **leer este handoff desde disco contrastando sus cifras contra el canónico**. Gana el
   disco.
2. **Re-medir el árbol de `aiw` con `--ignore-cr-at-eol`** y declarar cuál lectura da.
3. **Decidir el destino de `#22`.** Está `active` sin haber corrido. Antes de relanzar,
   preguntar al hilo `aiw-console` si su run ya pintó las etiquetas: si lo hizo, el `007`
   se retira; si no, se pide ventana nueva y se relanza con las cuatro condiciones.
4. **Si `#22` no puede relanzarse pronto**, el otro ejecutable es **`#41` «Make the queue
   survive the terminal that launched it»** — `deps=0`, tres criterios de `§4` completos,
   sin blanco externo. `#22` **no se mueve de su posición**: su sitio delante del manifest,
   las señales de media ejecución, los worktrees y las noches desatendidas es correcto.
5. **Pendiente de decisión del operador, sin resolver:** qué hacer con la rama del `007`
   **no aplica** — nunca existió.

---

## 11. RASTRO DE LA SESIÓN — ficheros en `_scratch\` (fuera de todos los repos)

Los produjo esta sesión. **La cabina no puede borrar; los borra el operador.**

Desechables ya: `elegibles.mjs`, `baseline-console.txt`, `_cowork_write_test.txt`,
`AIW-22-ENMIENDA.md`, `AIW-22-ENMIENDA-2.md`.

Vale la pena conservar hasta que `#22` cierre: `AIW-22-PREFLIGHT.md` (52 KB, la medición de
superficie de arranque), `AIW-22-OBJETIVO.md` (copia byte a byte del objetivo),
`AIW-CONST4-HECHOS.md` (88 KB, la tabla de la compuerta), `AIW-21-CORPUS.md` (los 21 textos
verbatim, 48 788 caracteres), `AIW-TERCERO.md`.

**Nada de esto entró en ningún repo, y así debe seguir.**
