# CONTENEDORES SIN RUNS — MANDA EL CÓDIGO

**Fecha:** 2026-08-04
**Encargo:** enmienda de contrato adjudicada por la cabina. Papel, no código.
**Decisión registrada:** `D-062` en `context/DECISIONES.md`.
**Ficheros escritos:** `context/aiw-console/CONTRATO.md` (cuatro sitios),
`context/DECISIONES.md` (una entrada al final), este record.
**Ficheros NO tocados:** ningún archivo de código, test, fixture, roadmap canónico ni
`.project/`. No se ejecutó git en ninguna forma que escriba.

---

## 1. La adjudicación

§12.b afirmaba DOS cosas sobre un contenedor con 0 runs, y sólo una es falsa.

- **«No recibe token — ninguno» es VERDADERO** y se conserva íntegro.
- **«El validador lo rechaza como dato malformado» es FALSO** y se retira.

La regla queda: **un contenedor sin runs es VÁLIDO y NO DERIVA NADA.**

## 2. Por qué es falso — manda el código

El chequeo **nunca se implementó**. Verificado de primera mano el 2026-08-04, leyendo
el disco:

- `tools/roadmap/roadmap-core.mjs`, `checkInvariants` (bloque de fase, `:465-482`):
  las únicas condiciones sobre una fase son que sea un objeto, que `phase_id` sea una
  cadena no vacía, que todas sus claves estén en `PHASE_ALLOWED_FIELDS` y que `runs`
  sea un array. **Una lista vacía satisface las cuatro**, y el bucle `for (const run
  of phase.runs)` que sigue simplemente no se ejecuta. No hay mínimo de runs por
  ninguna parte.
- `tools/roadmap/roadmap-core.mjs:1881-1885` lo dice en prosa, en un comentario del
  propio motor:

  > `// An empty phase is legal in the v3 model: the phase contract is the field`
  > `// allowlist plus phase_id uniqueness, with no minimum run count on either side`
  > `// (the source project's canonical roadmap already carries empty phases and validates green).`
  > `// Nothing is auto-seeded here; a fabricated placeholder run would invent an`
  > `// identity the operator never asked for, to satisfy a rule that does not exist.`

  La última línea nombra exactamente lo que este record corrige: *a rule that does not
  exist*.
- El motor trata la fase vacía como caso normal en las dos operaciones que la rozan:
  `insert --end-of-phase` sobre una fase sin runs **avisa y anexa al final global**
  (`:864-866`), no falla; y `delete-phase` refuta si la fase **tiene** runs
  (`:1966-1969`) — es decir, la fase vacía es precisamente la que sí se puede borrar.
- Búsqueda negativa: no existe en `tools/` ni en `tests/` ningún chequeo que rechace
  un contenedor por tener 0 runs. Lo más cercano son dos cosas que **no** son esta
  regla y se anotan para que nadie las confunda con ella:
  `validate-project-console-state.mjs:461` rechaza un objetivo del modelo **legacy
  `roadmap_v2`** con 0 **fases** (otro modelo, otro nivel), y `:949-955` exige umbrales
  globales de corpus (≥10 objetivos, ≥20 fases, ≥60 runs) para la profundidad de
  reconciliación, no una regla por contenedor.

El contrato, por tanto, no describía una regla rota: describía **papel adelantado al
disco**. La corrección va en el papel.

## 3. La medición que lo vuelve urgente

Recorrido propio de los tres roadmaps canónicos, **2026-08-04**, read-only:

| Roadmap canónico | Fases | Fases vacías | Objetivos | Objetivos vacíos |
|---|---:|---:|---:|---:|
| `projects/aiw-console/roadmap/roadmap.json` | 23 | **3** | 2 | 0 |
| `projects/cantu-studio/.aiw/roadmap/roadmap.json` | 28 | 0 | 7 | 0 |
| `aiw/roadmap/roadmap.json` | 33 | **1** | 6 | 0 |
| **Total** | **84** | **4** | **15** | **0** |

Las tres fases vacías de este canónico son `O4.P5` (*Stage 5 — Global console renders
Cantu (parity, operator QA)*), `O4.P7` (*Stage 7 — Cutover: retirement of Cantu's
console + deletion of `.aiw`*) y `O4.P8` (*Stage 8 — UI/UX*). La cuarta es `O6.P1`
(*Per-project push activation*) del roadmap de AIW.

Consecuencia: la afirmación de §13 —«Las 30 fases de hoy tienen ≥1 run»— era cierta el
2026-07-23 y **hoy es falsa**. Si el chequeo hubiera existido, habría puesto rojo un
canónico que es correcto.

## 4. Los cuatro sitios — VERBATIM, antes y después

### Sitio 1 — §12.a, las tres líneas de la cláusula de la rama 3 (`:1374-1376`)

**ANTES:**

> - La cláusula "y hay al menos uno" de la rama 3 es redundante con el dominio
>   (§12.b) y se escribe adrede: es la guarda que neutraliza la vacuidad si alguien
>   implementa la regla sin leer §12.b.

**DESPUÉS:**

> - La cláusula "y hay al menos uno" de la rama 3 **es PORTANTE**, no un adorno y ya
>   no una redundancia con el dominio. Desde la enmienda D-062 un contenedor con 0
>   runs es dato VÁLIDO (§12.b), así que esta lista se aplicará a colecciones vacías
>   en el mundo real y no sólo en hipótesis. La cláusula es **lo único dentro de esta
>   lista** que impide que una colección vacía derive `completed` por vacuidad —
>   `[].every() === true`, y con ella la rama 3 no dispara. Quitarla no simplifica la
>   regla: la vuelve capaz de declarar terminado lo que nunca existió. Residuo
>   declarado: la rama 5 también es vacuamente verdadera sobre lista vacía, de modo
>   que quien aplique las cinco reglas sin leer el dominio de §12.b obtendrá
>   `planned` en lugar de "ningún token" — respuesta equivocada, pero no la
>   destructiva. El dominio de §12.b sigue siendo la parte que hay que leer.

### Sitio 2 — §12.b entero, rótulo incluido

**ANTES:**

> ### 12.b Objetivo con 0 runs: MALFORMADO
>
> **La derivación queda INDEFINIDA. No recibe token — ninguno.** El validador de la
> capa 3 lo rechaza como dato malformado.
>
> Por qué no se inventa un token para el caso: un objetivo sin runs no es un estado
> del trabajo, es un error de datos, e inventarle un token lo haría viajar,
> renderizarse y agregarse como si fuera trabajo. Inventar un token para un estado
> inválido es peor que declararlo inválido. Y por qué no se deja a la semántica
> ingenua: la rama 3 evaluada sobre lista vacía es verdadera por vacuidad —
> `[].every() === true` en JS — de modo que un objetivo recién creado y vacío
> derivaría `completed`: **declararía terminado lo que nunca existió**. La medición
> detectó exactamente este agujero, lo neutralizó con una guarda de longitud y lo
> reportó como decisión pendiente, no como medición (MEDICION:197-204). Ésta es la
> decisión: inválido, no derivable. Tampoco `planned`: `planned` afirma "hay plan y
> nadie lo ha empezado"; un objetivo vacío no afirma nada todavía.
>
> Los 8 objetivos de hoy tienen ≥1 run (MEDICION:197-198), así que el caso no existe
> en disco: la regla protege el futuro, no corrige el presente.

**DESPUÉS:**

> ### 12.b Objetivo con 0 runs: VÁLIDO, y no deriva nada
>
> **La derivación queda INDEFINIDA. No recibe token — ninguno.** Y **el validador NO
> lo rechaza**: un objetivo sin runs es dato VÁLIDO. Las dos mitades son
> independientes, y las dos son deliberadas. No derivar no es lo mismo que ser
> inválido; este contrato afirmaba lo segundo sin que nada lo sostuviera, y la
> enmienda D-062 (2026-08-04) retira esa afirmación. El chequeo de rechazo **nunca se
> implementó**: el motor de roadmap declara lo contrario con todas sus letras — una
> fase vacía es legal en el modelo v3, sin mínimo de runs por ningún lado, y nada se
> auto-siembra porque un run de relleno inventaría una identidad que el operador no
> pidió (`tools/roadmap/roadmap-core.mjs:1881-1885`).
>
> Por qué NO recibe token: un contenedor vacío no afirma nada todavía sobre el
> trabajo, e inventarle un token lo haría viajar, renderizarse y agregarse como si
> fuera trabajo. Y por qué no se deja a la semántica ingenua: la rama 3 evaluada
> sobre lista vacía es verdadera por vacuidad — `[].every() === true` en JS — de modo
> que un objetivo recién creado y vacío derivaría `completed`: **declararía terminado
> lo que nunca existió**. La medición detectó exactamente este agujero, lo neutralizó
> con una guarda de longitud y lo reportó como decisión pendiente, no como medición
> (MEDICION:197-204). Ésta es la decisión: sin derivación. Tampoco `planned`:
> `planned` afirma "hay plan y nadie lo ha empezado"; un objetivo vacío no afirma
> nada todavía. La guarda que sostiene esto dentro de la lista de §12.a es PORTANTE
> por esta razón, no decorativa.
>
> Por qué SÍ es válido: un objetivo o una fase planificados cuyos runs aún no se han
> escrito son un estado NORMAL de un roadmap vivo — el contenedor se abre primero y
> se llena después. Exigir contenido obligaría a inventar un run de relleno al abrir
> cada contenedor: una identidad que nadie pidió, acuñada sólo para satisfacer la
> regla. Ese run de relleno es exactamente la clase de artefacto que §2 existe para
> matar — algo escrito porque el formato lo pide, no porque describa trabajo.
>
> Lo que se pierde, declarado: un contenedor vacío OLVIDADO deja de ser distinguible
> de uno EN ESPERA. Los dos son el mismo dato y el contrato ya no los separa. Esa
> distinción queda **SIN MECANISMO** —abierta, no resuelta—, y el día que se resuelva
> se resolverá **avisando, no rechazando**: un aviso deja pasar el dato válido y
> señala al que lleva demasiado tiempo vacío, mientras que un rechazo mataría también
> al que está en espera legítima. Nada de esto se implementa hoy: D-062 no añade
> chequeo, aviso ni advertencia.
>
> En disco no hay hoy ningún objetivo vacío: **0 de 15 objetivos** en los tres
> roadmaps canónicos (recorrido propio 2026-08-04; MEDICION:197-198 midió 8 de 8 con
> ≥1 run el 2026-07-23). Donde el caso SÍ existe es a nivel de fase — ver §13.

### Sitio 3 — §13, primer párrafo

**ANTES:**

> Una fase no almacena `status` ni contadores (§10.b). Si un consumidor necesita el
> status de una fase, aplica **la misma función de §12** sobre los runs de esa fase:
> mismo vocabulario de salida (§11.b), misma precedencia, mismo dominio — una fase
> con 0 runs es MALFORMADA exactamente como un objetivo con 0 runs (§12.b). Las 30
> fases de hoy tienen ≥1 run (recorrido propio 2026-07-23; mínimo observado: 1 run
> por fase).

**DESPUÉS:**

> Una fase no almacena `status` ni contadores (§10.b). Si un consumidor necesita el
> status de una fase, aplica **la misma función de §12** sobre los runs de esa fase:
> mismo vocabulario de salida (§11.b), misma precedencia, mismo dominio — una fase
> con 0 runs es **VÁLIDA y no deriva nada**, exactamente como un objetivo con 0 runs
> (§12.b). El validador tampoco la rechaza, y eso es deliberado: una fase planificada
> cuyos runs aún no se han escrito es un estado normal de un roadmap vivo, y exigirle
> contenido obligaría a inventar un run de relleno al abrirla. Lo que se pierde es lo
> mismo que declara §12.b: una fase vacía OLVIDADA no se distingue de una EN ESPERA, y
> esa distinción queda sin mecanismo.
>
> A diferencia del caso de objetivo, éste **sí existe en disco**: **3 de las 23 fases
> de este canónico están vacías** —`O4.P5`, `O4.P7` y `O4.P8` de
> `roadmap/roadmap.json`— y **4 de 84 fases** contando los tres roadmaps canónicos
> (recorrido propio 2026-08-04). La afirmación anterior —"las 30 fases de hoy tienen
> ≥1 run", recorrido propio 2026-07-23— era cierta el día que se midió y hoy no lo
> es; se sustituye por la cifra medida, no se conserva. Ese hecho es la razón práctica
> de la enmienda D-062: rechazar habría puesto rojo un canónico que es correcto.

### Sitio 4 — fila `h` de la tabla de decisiones de la capa 2

**ANTES:**

> `| h | Objetivo o fase con 0 runs: MALFORMADO, sin token | §12.b, §13 | `[].every() === true` declararía terminado lo que nunca existió. |`

**DESPUÉS:**

> `| h | Objetivo o fase con 0 runs: **VÁLIDO**, y NO DERIVA NADA — sin token, y el validador no lo rechaza (enmienda **D-062**, 2026-08-04; sustituye la adjudicación original "MALFORMADO, sin token") | §12.b, §13 | Un contenedor abierto y aún sin runs es estado normal de un roadmap vivo —3 de 23 fases del canónico de hoy—, y rechazarlo obligaría a inventar un run de relleno; el token se sigue negando porque `[].every() === true` declararía terminado lo que nunca existió, y de eso responde la guarda portante de la rama 3 (§12.a). |`

La forma de tabla se conserva: cuatro columnas, misma letra, mismo lugar en la tabla.

## 5. El quinto sitio que se consideró y NO hizo falta

`CONTRATO.md:569`, en la *Nota de verificación (capa 2)*, dice: «la ausencia de fases y
objetivos con 0 runs». **No se toca, y no queda en falso.** Esa línea enumera lo que se
cotejó de primera mano **el 2026-07-23** sobre los tres archivos de datos de esa fecha
— es el registro de un acto de verificación fechado, no una afirmación normativa ni
presente. El canónico de Cantu, que era el medido entonces, sigue con 0 fases vacías
hoy (28/28 con runs). No hacía falta un quinto sitio, así que no se abrió ninguno.

`CONTRATO.md:1365` —«un run con un token fuera de él es entrada malformada (la rechaza
el validador de la capa 3)»— es otra afirmación del contrato sobre el validador, de la
misma familia que la que aquí se retira y **no verificada en este encargo**. Queda
declarada como hueco por el propio encargo: auditar el resto de esas afirmaciones está
fuera de alcance.

## 6. Lo que se pierde, y por qué se acepta

Una fase vacía **OLVIDADA** deja de ser distinguible de una **EN ESPERA**. Son el mismo
dato: `runs: []`. El contrato ya no las separa y **no queda mecanismo** que lo haga.

Se acepta porque la alternativa es peor en la dirección concreta que importa: rechazar
mata a las dos, y hoy hay cuatro fases en espera legítima en disco y ninguna olvidada
conocida. La salida, cuando se tome, es **avisar** —señalar al contenedor que lleva
demasiado tiempo vacío— y no rechazar. **Nada de eso se implementa hoy: cero líneas de
código.**

## 7. Verificación

| Comprobación | Resultado |
|---|---|
| `CONTRATO.md` líneas | 2154 → 2196 (+42) |
| `CONTRATO.md` bytes | 128 800 → 132 536 (+3 736) |
| `DECISIONES.md` líneas | 2477 → 2545 (+68) |
| `DECISIONES.md` bytes | 172 995 → 178 200 (+5 205) |
| Entradas nuevas en `DECISIONES.md` | 1 (`## D-062`), append-only |
| Siguiente número de decisión | re-verificado: la última era `D-061`, luego **62** |
| Encabezado casa el patrón de la casa | sí — `## D-062 — 2026-08-04 — <título>`, cuerpo pegado, `Criterio de borrado:` en plano al final |
| Encabezados `###` en `DECISIONES.md` | **0** |
| Fin de línea | CRLF preservado en los dos ficheros (0 líneas con LF suelto) |
| Sitios tocados en `CONTRATO.md` | 4, y sólo 4 |
| Código, tests, canónicos, `.project/` | **sin tocar** — `git status` sólo lista los dos ficheros de contexto y los records |
| Suite | 497 tests · 495 pass · **2 fail**, los dos preexistentes, sin tercero |

Los dos fallos preexistentes, por nombre — ambos son pines de registro deliberados que
fallan porque el disco se movió, no por esta enmienda:

1. `tests/classification-care-budget.test.mjs:153` — *C.3: absent is VALID and is
   today's state — this repo's canonical passes and round-trips byte-identical*.
2. `tests/roadmap-engine.test.mjs:93` — *round-trip: the two real canonicals do NOT
   share a line-ending convention (why detectEol exists)*, cuyo propio mensaje de
   fallo dice qué hacer: «both real roadmaps now share one EOL; the parameter is no
   longer load-bearing (update the record, keep the test)».

Ninguno toca la derivación ni los contenedores vacíos.

## 8. Consecuencia operativa

**Un roadmap conforme puede nacer sin runs.** Un proyecto nuevo que se registre con sus
objetivos y fases planificados y ninguna run escrita es válido tal cual: no necesita
inventar contenido para pasar la puerta. El alcance es **transversal** a los tres
proyectos —la regla es del contrato de la carpeta, no de un repo—, y esta enmienda lo
registra sin ejecutar nada en ningún otro hilo: no se migra, no se borra y no se rellena
ninguna fase vacía.
