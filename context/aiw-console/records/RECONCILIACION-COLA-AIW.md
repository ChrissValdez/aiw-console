# RECONCILIACIÓN DE LA COLA DE AIW

**Fecha:** 2026-07-28 · **Run:** `RUN-AIW-QUEUE-RECONCILIATION-001` (`queue_order`
13, O2/O2.P2) · **Naturaleza:** mueve dos ficheros de carpeta dentro de `aiw`. No
commitea, no cambia el status de ningún run, no re-emite `.project/`, no toca
`kernel.mjs` ni `queue.mjs`, no toca `cantu-studio`. · **Máquina:** PC (Windows 10,
`C:\Users\chris\Documents\AIW_Workspace\`).

## Para qué existe este record

`objectives/pending/` declaraba como trabajo pendiente dos tickets cuyo run había
cerrado **APPROVED nueve días antes**. La cola mentía sobre sí misma, y la consola
—que lee esas carpetas— repetía la mentira.

Este run archiva esos dos tickets y **nada más**. La causa de por qué seguían ahí
es un hallazgo, no el encargo, y se deja escrita al final sin corregirla.

El `run_id` no se tecleó de memoria: se derivó leyendo `aiw/roadmap/roadmap.json`,
tomando el nodo de `queue_order` 13 y **comprobando que su `title` es exactamente**
`Reconcile objectives/ against logs/ and archive the two dead tickets`. La
comprobación dio `true`.

## Frontera de entrada

**HEAD de `aiw`:** `ce81eef396961d730a765ca9749d9db7df04bfaf` — invariante durante
todo el trabajo (no se commiteó).

`git status --porcelain` **antes** del movimiento:

```
 M .project/roadmap.json
 M .project/snapshot.json
 M roadmap/roadmap.json
?? .project/docs_index.json
?? .project/git_history.json
```

Cinco líneas, todas bajo `roadmap/` o `.project/`. **Ningún archivo modificado
fuera de ahí.** Esto es la *suciedad de apertura* descrita en la sección de
anomalía: no es una anomalía del árbol, es el estado normal bajo el ciclo de
trabajo vigente.

**Estado del canónico en el momento del movimiento:** el run 13 estaba en
**`"status": "active"`**. Se deja constancia explícita porque el mismo run pasó por
tres estados distintos durante la sesión (ver anomalía).

## Vivo o muerto, resuelto POR NOMBRE

Cada ticket abierto de `pending/` y `parked/`, contra la carpeta homónima en
`aiw/logs/`, con el veredicto que declara su propio `summary.md`:

| Ticket abierto | Carpeta en `logs/` (por nombre) | Veredicto `summary.md` | Cierre | |
|---|---|---|---|---|
| `pending/005-roadmap-contract-fix` | `logs/005-roadmap-contract-fix` | **APPROVED** (ronda 1) | `2026-07-19T02:11:11.488Z` | **muerto** |
| `pending/006-roadmap-delivery-path` | `logs/006-roadmap-delivery-path` | **APPROVED** (ronda 1) | `2026-07-19T01:46:04.888Z` | **muerto** |
| `parked/001-arithmetic-columns-guard` | — ninguna | — | — | **vivo** |
| `parked/002-hierarchy-docs-drift` | — ninguna | — | — | **vivo** |
| `parked/003-video-provider-docs-drift` | — ninguna | — | — | **vivo** |

### Por qué resolver por número habría fallado

`aiw/logs/` contiene nueve carpetas. Tres de ellas —`001-console-projector`,
`002-canonical-path-and-autoproject`, `003-roadmap-emitter`— **comparten prefijo
numérico con los tres tickets de `parked/` y nada más**. Las seis son parejas
distintas:

| Prefijo | Ticket en `parked/` (vivo) | Carpeta en `logs/` con el mismo prefijo (otro trabajo) |
|---|---|---|
| `001` | `001-arithmetic-columns-guard` | `001-console-projector` → APPROVED |
| `002` | `002-hierarchy-docs-drift` | `002-canonical-path-and-autoproject` → APPROVED |
| `003` | `003-video-provider-docs-drift` | `003-roadmap-emitter` → APPROVED |

Emparejar por número habría encontrado un log APPROVED detrás de cada uno de los
tres `parked` y **los habría declarado muertos a los tres**. Están vivos: ninguno
tiene carpeta de log con su nombre. La trampa es real y el emparejamiento por
nombre es lo único que la desarma.

Nota de corrección a la ficha del encargo: decía que `logs/` contiene tres
carpetas. Contiene **nueve** (`000-sandbox`, `001-console-projector`,
`002-canonical-path-and-autoproject`,
`002-canonical-path-and-autoproject-orphan-20260711`, `003-roadmap-emitter`,
`003b-startup-projection-all-views`, `004-snapshot-enrichment`,
`005-roadmap-contract-fix`, `006-roadmap-delivery-path`), más dos ficheros sueltos
(`DIAG-roadmap-invalid.md`, `INCIDENT-2026-07-11.md`). El razonamiento de la trampa
no cambia; la cifra sí.

## La regla de archivado, citada del código

El nombre de destino **no se inventó**: se derivó de la única regla de archivado
que existe en AIW, en `aiw/queue.mjs`.

```js
// queue.mjs:15
const PROCESSED = path.join(AIW, 'objectives', 'processed');

// queue.mjs:18
const STATES = { 0: 'APPROVED', 2: 'HUMAN_REVIEW', 3: 'BLOCKED', 4: 'HUMAN_REVIEW', 1: 'ERROR' };

// queue.mjs:58
try { console.log(`[queue] archive ${f} -> ${state}: ${archiveMove(AIW, path.join(PENDING, f), path.join(PROCESSED, `${state}-${f}`))}`); }
```

La composición es `processed/${state}-${f}`, donde `f` es el nombre del fichero
**con su extensión**. El `<STATE>` de ambos tickets es `APPROVED` —lo dice su
propio `summary.md`, no una suposición— y `STATES` confirma que `APPROVED` es la
etiqueta que la regla produce para el código de salida 0.

Aplicada a los dos tickets muertos:

| Origen | Destino derivado |
|---|---|
| `objectives/pending/005-roadmap-contract-fix.md` | `objectives/processed/APPROVED-005-roadmap-contract-fix.md` |
| `objectives/pending/006-roadmap-delivery-path.md` | `objectives/processed/APPROVED-006-roadmap-delivery-path.md` |

El resultado es consistente con lo que ya había en la carpeta (`APPROVED-004-
snapshot-enrichment.md` y siete más con el mismo patrón).

### Colisión

Comprobado **antes** de mover: ninguno de los dos destinos existía en
`processed/`. Sin colisión, no se sobrescribió nada.

## Integridad: md5 antes y después

El movimiento preservó los dos ficheros byte a byte.

| Fichero | md5 antes (en `pending/`) | md5 después (en `processed/`) | |
|---|---|---|---|
| `005-roadmap-contract-fix.md` | `f0edf56016e619950b442232cb9d0210` | `f0edf56016e619950b442232cb9d0210` | idéntico |
| `006-roadmap-delivery-path.md` | `39885f713a203725a6b21ab4c2845af4` | `39885f713a203725a6b21ab4c2845af4` | idéntico |

**Se movió, no se copió.** Tras el movimiento `objectives/pending/` contiene
únicamente `.gitkeep`; ninguno de los dos ficheros quedó en origen.

Método: `mv` de sistema de ficheros, **no `git mv`**. El encargo restringe git a
lectura (`status`, `rev-parse`, `diff --stat`, `ls-files`), de modo que el rename
no se estadió. Ambos ficheros estaban trackeados (`git ls-files`), por lo que git
reporta la operación como dos borrados más dos añadidos sin trackear en vez de como
rename. Es equivalente en contenido y **el operador decide cómo estadiarlo al
commitear**.

## Conteos, leyendo las carpetas

Contado listando los directorios, **sin ejecutar el proyector** y sin re-emitir
`.project/`:

| | `pending/` | `parked/` | `processed/` | total |
|---|---|---|---|---|
| Antes | 2 | 3 | 11 | **16** |
| Después | **0** | **3** | **13** | **16** |

El total es invariante: los dos objetivos no desaparecieron, cambiaron de carpeta.
Es lo que la consola verá la próxima vez que alguien re-emita.

## Frontera de salida

`git status --porcelain` **después**:

```
 M .project/roadmap.json                                    ← suciedad de apertura
 M .project/snapshot.json                                   ← suciedad de apertura
 D objectives/pending/005-roadmap-contract-fix.md           ← este run
 D objectives/pending/006-roadmap-delivery-path.md          ← este run
 M roadmap/roadmap.json                                     ← suciedad de apertura
?? .project/docs_index.json                                 ← suciedad de apertura
?? .project/git_history.json                                ← suciedad de apertura
?? objectives/processed/APPROVED-005-roadmap-contract-fix.md ← este run
?? objectives/processed/APPROVED-006-roadmap-delivery-path.md ← este run
```

`git diff --stat`:

```
 .project/roadmap.json                           |  6 +-
 .project/snapshot.json                          | 10 +--
 objectives/pending/005-roadmap-contract-fix.md  | 84 ------------------
 objectives/pending/006-roadmap-delivery-path.md | 35 ---------
 roadmap/roadmap.json                            |  2 +-
 5 files changed, 9 insertions(+), 128 deletions(-)
```

**Aporte de este run: dos borrados y dos añadidos, todos bajo `objectives/`. Cero
modificados fuera de `objectives/`.** Los tres modificados restantes son la
suciedad de apertura, que ya estaba antes de que el taller tocara nada.

`logs/`, `kernel.mjs` y `queue.mjs` **intactos**: no aparecen en `diff --stat` ni
en `porcelain`.

## Anomalía del ciclo: el orden en que ocurrieron las cosas

Se registra porque un record posterior que lea sólo los commits **leerá mal el
orden**. Es registro, no reproche.

**El status de `#13` se movió a `completed` antes de que el trabajo corriera.** La
primera medición del taller encontró en el árbol de trabajo, sin commitear, el
cambio `"status": "planned"` → `"completed"` sobre el run 13 en `roadmap/roadmap.json`,
más `.project/` re-emitido encima. El run estaba cerrado y el trabajo no había
empezado.

**El taller paró dos veces y no movió nada en ninguna de las dos.**

1. **Primera parada — guarda mal formulada de la cabina.** El criterio de entrada
   exigía árbol limpio, salvo dos artefactos de `.project/`. Esa exigencia es
   **imposible de cumplir bajo el ciclo de trabajo vigente**: el operador abre el
   run en la consola *antes* de lanzar el taller, y la consola escribe el canónico
   y re-emite sin commitear. La suciedad de apertura es el estado normal. El taller
   hizo bien en parar: la guarda que recibió decía otra cosa y no le tocaba
   interpretarla.
2. **Segunda parada — exigencia de `active`.** La guarda sustituta pedía que el run
   13 estuviera en `"active"`; se encontró en `"completed"` y el taller volvió a
   parar. La enmienda posterior relajó la guarda a `"active"` **o** `"completed"`,
   con este razonamiento: el propósito de la guarda era probar que el run se había
   abierto antes de trabajar, y ese propósito se cumple igual con cualquiera de los
   dos tokens; el estado del árbol ya estaba atribuido por completo —ocho líneas de
   diff, el cambio de status y la re-emisión—, de modo que la distinción no protegía
   de nada.

**Estado del canónico mientras se movían los ficheros:** el run 13 estaba en
**`"active"`**. Había vuelto a `active` entre la segunda parada y la ejecución —el
operador lo reabrió desde la consola—, de modo que el run 13 recorrió
`planned` → `completed` → `active` a lo largo de la sesión, y el movimiento se
ejecutó en el tercero de esos estados.

## Afirmaciones que quedan pendientes

Se nombran. **Ninguna se corrige aquí.**

1. **Los tres `parked` cuelgan sintéticamente de 005 y 006.** `[NO VERIFICADO]`
   tras el movimiento, y con causa medida: los tres nombres —
   `001-arithmetic-columns-guard`, `002-hierarchy-docs-drift`,
   `003-video-provider-docs-drift`— **no aparecen como nodo estructural en ningún
   sitio** de `roadmap/roadmap.json`, `.project/roadmap.json` ni
   `.project/snapshot.json`. Su única aparición en los tres ficheros es dentro del
   `full_description` en prosa del propio run 13. `[INFERENCIA]`: esa dependencia
   sintética vive en la proyección del modo `aiw_objectives`, que lee las carpetas
   de `objectives/`, y **no en el roadmap canónico**. Verificarlo exigiría re-emitir
   `.project/` en ese modo, que este run tiene explícitamente fuera de alcance.

2. **`roadmap_AIW_temp.md` declara completado el merge de 005.** `[NO VERIFICADO]`
   — el fichero **no se abrió** en ningún momento de la sesión. Se deja así por
   decisión del encargo: su retiro es el run `#20`
   (`RUN-AIW-MARKDOWN-RETIREMENT-001`).

3. **Corrección a la ficha del encargo — `operational_status`.** El encargo original
   afirmaba que el snapshot declara `operational_status: "active"` y un
   `current_status_summary` cuyo «siguiente objetivo» es un run terminado. Medido:
   esa cifra venía de una medición del modo `aiw_objectives` y **ya no aplica** al
   snapshot vigente. Los valores reales observados en `.project/snapshot.json`
   durante la sesión:

   | Momento | `operational_status` | `current_status_summary` |
   |---|---|---|
   | En `HEAD` (`ce81eef`) | `"idle"` | — |
   | Primera medición del taller (run 13 en `completed`) | `"idle"` | `No active run; 14 of 42 runs completed.` |
   | En el movimiento (run 13 en `active`, `generated_at` `2026-07-29T01:04:16.601Z`) | `"active"` | `Active run: RUN-AIW-QUEUE-RECONCILIATION-001 (O2/O2.P2, queue 13).` |

   El campo **sigue al estado del run 13**, y era correcto en los tres momentos. La
   afirmación del encargo no era una deriva del snapshot: era una cifra tomada de
   otro modo de proyección.

## Fuera de alcance, nombrado y no tocado

- **`kernel.mjs` no se modificó.** Que el kernel invocado directamente sobre un
  objetivo suelto **no archive nada** —no hay una sola referencia a `processed` en
  sus 478 líneas— es la causa medida de que estos dos tickets sobrevivieran nueve
  días en `pending/`. Que ambos runs fueran por la vía directa es `[INFERENCIA]`
  sobre el único mecanismo de archivado que existe, no un registro de cómo se
  invocaron. Corregirlo sería mecanismo bajo `CONST §4` y no tiene incidente
  escrito.
- **Los tres `parked` no se tocaron.** Están vivos.
- **`qualification/`, `queue-e7/`, `prepared/` y `staged/` no se tocaron** — es el
  run `#14` (`RUN-AIW-QUEUE-FOLDER-DISPOSITION-001`).
- **La colisión del id `000` en `processed/` no se resolvió.** Dos ficheros
  reclaman ese id: `APPROVED-000-sandbox-suma.md` y `ERROR-000-sandbox.md`. Se
  nombra y se deja.
- **Los archivados sin log detrás no se resolvieron.** Se nombran, y son **cinco**,
  no cuatro como decía la ficha del encargo. Medido emparejando cada fichero de
  `processed/` —quitado su prefijo de estado— contra una carpeta homónima en
  `logs/`: `APPROVED-000-sandbox-suma`, `APPROVED-a-resta`, `APPROVED-b-multiplica`,
  `HUMAN_REVIEW-999-sandbox-imposible` y `HUMAN_REVIEW-c-imposible`. Los otros ocho
  de `processed/` sí resuelven, **incluidos los dos que este run acaba de archivar**,
  lo que confirma que el archivado quedó coherente. Aparte, `ERROR-000-sandbox`
  resuelve a `logs/000-sandbox`, cuyo `summary.md` declara **APPROVED** y no `ERROR`:
  contradicción real, se nombra y se deja.
- **No se revirtió nada.** No se commiteó. No se cambió el status de ningún run. No
  se re-emitió `.project/`. No se levantó la consola ni el proyector. No se corrió
  la suite. No se escribió en `DECISIONES.md`. `cantu-studio` no se tocó en ningún
  byte.

## Cierre

El trabajo del run está hecho y medido. **Este run debe quedar en `completed`.**
El record no lo cambia: el status lo cierra el operador desde la consola, y el
commit es del ritual humano.
