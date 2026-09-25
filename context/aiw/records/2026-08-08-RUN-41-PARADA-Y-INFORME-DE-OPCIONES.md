# Record — `#41` «Make the queue survive the terminal that launched it» — PARADA con informe de opciones

**Fecha:** 2026-08-08. **Hilo:** `aiw`. **Máquina:** laptop nueva, primera sesión.
**Run:** `RUN-AIW-DECOUPLED-QUEUE-LAUNCHER-001`, `O7 — Long unattended execution` /
`O7.P1 — Decoupled queue launcher`, `queue_order` 41 al 2026-08-08.
**Desenlace:** el encargo **paró y entregó informe de opciones**. No escribió nada en el repo.
Una parada temprana es una entrega, no una incidencia.

Todas las cifras de este record llevan quién las midió. Las que midió el taller y la cabina
volvió a comprobar contra disco van marcadas **[verificado por cabina]**.

---

## 1. Qué se le pidió y qué devolvió

El ticket ordenaba construir el lanzador desacoplado, con dos condiciones de parada
explícitas: si el presupuesto de líneas no daba bajo la lectura más estricta, y si el diseño
mínimo no podía garantizar «sin huérfanos». **Las dos se activaron, y por razones
independientes.**

El taller no se limitó a razonarlo: construyó un lanzador y una réplica fiel de la topología
—mismos `liveChildren` / `ownedLock` / `reap` / `killTree`, mismos manejadores de señal, mismo
`execProc` con `shell:true` + `windowsHide:true`— **fuera del repo**, y mató consolas reales.

---

## 2. El hallazgo que decide el run

**El lanzador solo, embarcado hoy, es PEOR que el comportamiento actual.** Medido por el
taller en cuatro experimentos:

| # | experimento | resultado |
|---|---|---|
| 1 | Matar la consola lanzadora con `taskkill /T /F` | **la cola sobrevive** — queue, kernel y editor vivos; `edits.log` 36→54 y `STAGE.txt` 11→15 leídos desde fuera |
| 2 | `--stop` (tree-kill de la cola) | árbol entero muerto, edición congelada en 97 líneas, **cero huérfanos**; pero **el lock se filtra** |
| 3 | Matar la cola **sola**, sin `/T` | cola muerta, kernel muerto, **el editor sobrevive y sigue editando: 75 → 82 líneas** con su gobernador ya muerto |
| 4 | Lo mismo con `shell:false` | **cero supervivientes**, edición congelada en 23 |

**El experimento 3 es el incidente del 2026-07-11 reproducido bajo el diseño nuevo**, y
alcanzable con un «Finalizar tarea» corriente del Administrador de tareas. El 4 nombra la
causa: **el intermediario `cmd.exe` que introduce `shell:true`**, que es exactamente lo que el
post-mortem señaló y lo que `M4` metió para callar el aviso `DEP0190`.

Embarcar el lanzador primero **conserva la vía de escape del huérfano y elimina la consola que
hacía visibles los quince minutos oscuros**. Por eso el taller recomienda rechazar de plano las
opciones «solo lanzador», no aplazarlas.

**La premisa central del run es falsa, y esto es lo que hay que corregir en el roadmap.** El
`full_description` afirma que el mecanismo *«lives on the queue and launcher side rather than
inside the round loop, which is where the budget pressure is lowest»*. La causa raíz está en
**`kernel.mjs:100`**, dentro del bucle de rondas. **[verificado por cabina]**

---

## 3. El presupuesto de líneas: la lectura estricta ya está rota, y no por este run

**[verificado por cabina — coincide con la medición independiente de la cabina]**

| lectura | cuenta | contra el techo `~500` de `CONSTITUCION.md:29` |
|---|---|---|
| A — solo `kernel.mjs` | **478** | +22 de holgura |
| B — `kernel.mjs` + `queue.mjs` | **547** | **−47 pasado** |
| C — B + cualquier lanzador | **547 antes de la primera línea** | **−47 pasado** |

Bajo B o C **no cabe ningún lanzador, ni de una línea**. El taller **se negó a adoptar la
lectura que hacía caber su diseño** y devolvió la adjudicación. Es la conducta correcta.

Candidatos a borrado que el taller precisó, los dos documentación de registro duplicada en
otro sitio, no lógica: **`kernel.mjs:5-10`** (6 líneas, el changelog de endurecimiento del
2026-07-10) y **`kernel.mjs:62-67`** (6 líneas, la narrativa del incidente M3, ya registrada en
`logs/INCIDENT-2026-07-11.md`). **~12 líneas. [verificado por cabina]**

---

## 4. Tres correcciones del taller al ticket de la cabina — las tres verificadas

**4.1 La regla operativa está escrita CINCO veces en CUATRO ficheros, no dos.** El ticket
mandaba retirar dos copias. **[verificado por cabina, anclado por texto]**

| ubicación | idioma | ¿en el ticket? | ¿en alcance? |
|---|---|---|---|
| `logs/INCIDENT-2026-07-11.md:97` | español | sí | sí |
| `kernel.mjs:67` | inglés | sí | sí |
| **`queue.mjs:4-6`** | inglés | **NO** | sí |
| **`records/CRONICA.md:67`** | español | **NO** | no |
| **`records/CRONICA.md:86`** | español | **NO** | no |

Retirar solo las dos del ticket habría dejado en pie la doble verdad que el run existe para
matar, **una de ellas en un fichero que el propio ticket ponía en alcance**.

**4.2 `CONSTITUCION.md` NO contiene la regla.** El ticket decía «si también está ahí,
verifícalo». Resuelve a **no**: cero aciertos en sus 46 líneas. **[verificado por cabina]**

**4.3 El comando de tests no existía declarado en ningún sitio y el taller lo derivó:**
`node --test "tests/*.test.mjs"`. No hay `package.json`; los 12 ficheros de `tests/` son
módulos de `node:test`. **[verificado por cabina]**

---

## 5. La línea base: 51/51 verde, y la cabina NO puede medirla

El taller reportó **51 tests, 51 pass, 0 fail**, antes y después, en las dos shells.

**La cabina midió 50/51 y la discrepancia es de la cabina, no del taller.** El único fallo es
`sandbox-objective.test.mjs:15` con `[create-sandbox] could not delete .git/logs/refs/heads/main: EPERM`
— la pared de «no puedo borrar» del montaje de la cabina, no un fallo del repo.

**Regla que sale de aquí: la cabina NO establece la línea base de `aiw`.** Su entorno no puede
correr esa suite sin un falso rojo. La línea base la mide el taller o el operador, siempre.

*(Del mismo modo, el taller midió que `node --test tests/` —forma de directorio— falla con
`MODULE_NOT_FOUND` en Node v24.19.0; en la VM de la cabina, con Node v22.22.3, funciona. Es
diferencia de versión, y manda la máquina del operador.)*

---

## 6. Lo que la cabina APORTA al informe, y que el taller debe verificar, no creer

El taller valoró la opción 2 —executor como hijo directo— como cara, porque `shell:false`
rompería `npm` y el `verifyCmd` de forma libre. **Medido por la cabina: `execProc` tiene
exactamente TRES llamantes, y solo UNO necesita el cambio.**

    kernel.mjs:236   execProc('claude', args, …)      ← flags fijos sin espacios; NO necesita shell
    kernel.mjs:325   execProc(verifyCmd, [], …)       ← cadena libre; SÍ necesita shell
    kernel.mjs:382   execProc(verifyCmd, [], …)       ← cadena libre; SÍ necesita shell

**Hipótesis, no hecho:** `shell:false` solo en la llamada de `:236` cierra la vía del huérfano
—que es la única de las tres que engendra el proceso largo y editor— **sin tocar `verifyCmd`**,
que conserva su shell y por tanto sus tuberías y sus `&&`. El radio de explosión sería mucho
menor que el que el informe estimó.

**Esto lo escribió quien planifica, así que es justo lo que hay que ordenar verificar.** El
propio `kernel.mjs:97` avisa de la restricción: *«kernel args are fixed flag tokens without
spaces; verifyCmd is already one string»* — que es la mitad del argumento, medida y escrita por
alguien más.

**Y un artefacto que hay que descartar antes de creer nada:** el taller midió que `claude` no
está en el PATH de su entorno y que con `shell:false` daba `ENOENT`. **Esa medición es de un
proceso que arrancó antes de que el PATH de usuario se arreglara en esta máquina.** Se vuelve a
medir en sesión nueva antes de usarla como argumento. El `ENOENT` de `npm` → `npm.ps1` sí es
real, y es otra razón para dejar `verifyCmd` con shell.

---

## 7. El árbol quedó intacto

**[verificado por cabina]** `aiw` con la lectura `-c core.autocrlf=true --no-optional-locks`:
seis ficheros sucios, **todos de la cabina** —`roadmap/roadmap.json` más los cinco de
`.project/`, de la apertura del run— y **cero ficheros sin trackear**. `kernel.mjs`, `queue.mjs`,
`tests/`, `logs/` y `CONSTITUCION.md` limpios. El taller no escribió en el repo, como declaró.

---

## 8. Lo que queda abierto, y a quién le toca

1. **Qué lectura gobierna el techo `~500`.** Del operador, en `DECISIONES.md`. La lectura
   estricta lleva rota 47 líneas desde antes de este run, así que hoy no es la operativa de
   hecho — pero constatar eso es una adjudicación, no una medición.
2. **Si se acepta el radio de explosión de tocar la vía de spawn.** Del operador.
3. **Si cerrar la vía del huérfano es «mecanismo» bajo `CONST §4`** o es reparación de código
   existente. `D-055` define mecanismo como código o un paso nuevo; esto modifica un paso que
   ya existe. **Se nombra, no se adjudica aquí.**
4. **`records/CRONICA.md:67` y `:86`** llevan la regla en presente y quedan fuera de alcance.
5. El `status` de `#41` — ver la respuesta de cabina del mismo día.
