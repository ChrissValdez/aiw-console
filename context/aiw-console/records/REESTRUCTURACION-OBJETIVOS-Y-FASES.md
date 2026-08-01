# REESTRUCTURACIÓN DEL ROADMAP — cuatro fases nuevas por naturaleza del trabajo

> Ejecución de la auditoría humana del operador sobre este roadmap. Documenta **los cuatro
> actos**, **sus dieciocho escrituras**, **el dry-run y la tabla de remap de cada una**, **la
> discrepancia `B.1` resuelta con medición**, **la única cosa que el motor no permitió hacer
> como el encargo la escribió y qué se hizo en su lugar** y **la verificación final contra los
> valores esperados**.
>
> Fecha: 2026-08-01. **Todo pasó por el motor** (`planEdit` → `applyPlan` de
> `tools/roadmap/roadmap-plan.mjs`), con el validador de re-lectura inyectado como autoridad y
> rollback desde backup. **Nada se hand-editeó.** No se ejecutó git en ninguna forma, ni de
> lectura ni de escritura. No cambió el status de ningún run. No se borró ni archivó ningún run,
> fase u objetivo. No se tocó el `depends_on` de ningún run preexistente. No se clasificó nada.
> No se re-emitió `.project/` —queda deliberadamente desfasado— y la consola no se abrió. No se
> escribió en `aiw` ni en `cantu-studio` (`aiw` se LEYÓ, solo para componer el conjunto de ids
> externos de §10.d que el motor pide). No se tocaron `context/DECISIONES.md` ni
> `context/handoffs/`. Los dos tests rojos preexistentes no se repararon.
>
> **Archivos escritos por este encargo, y ninguno más:** `roadmap/roadmap.json` (por el motor,
> 18 veces) · este record.
>
> **Canónico: `db9c973b2010f302fb9ebbdaaaf9d4db` (121 792 bytes) →
> `214342647f3b03c62573508c1d431fb4` (131 567 bytes)**, CRLF en las dos puntas.

---

## BLOQUE A — Guardas antes de tocar nada

### A.1 Árbol limpio, comprobado SIN git

Git no se usó en ninguna forma, así que la comprobación fue por otros medios: barrido de
artefactos de escritura interrumpida (`*.tmp-*`, `.*.tmp*`, `*.bak`, `*.orig`, `*.rej`, `*~`) y
listado de lo modificado en las tres horas anteriores al arranque (03:12 del 2026-08-01).

- **Un solo artefacto**: `projects.config.json.bak`, del 2026-07-11. Es viejo, no es de esta
  noche y no es trabajo a medias de otro hilo. **No se tocó.**
- `roadmap/` contenía exactamente un archivo: `roadmap.json`. **Cero `.tmp` colgando**, así que
  ninguna escritura anterior quedó a medio camino.
- Lo modificado en las últimas tres horas era trabajo **cerrado** de un hilo de `cantu-studio`
  (`MEDICION-PIEZAS-COMPARTIDAS-COMPONENTES-CANTU.md`,
  `RELEVO-CANTU-AL-CIERRE-2026-08-01.md`, `context/handoffs/cantu-studio.md`, `textos-vivos.md`).
  Ninguno de esos archivos está en el scope de este encargo y **ninguno se tocó**.

### A.2 Estado esperado, medido

| Magnitud | Esperado | Medido | |
|---|---|---|---|
| runs | 52 | 52 | OK |
| `completed` | 43 | 43 | OK |
| `planned` | 9 | 9 | OK |
| `queue_order` denso `1..52` | sí | sí (min 1, max 52, 0 duplicados) | OK |
| objetivos | 2 | 2 | OK |
| fases | 19 | 19 | OK |
| aristas (`depends_on`) | 26 | 26 | OK |
| colgantes | 0 | 0 | OK |

**Las ocho coinciden.** No hubo motivo para parar.

### A.3 El canónico al empezar

```
roadmap/roadmap.json   121 792 bytes   md5 db9c973b2010f302fb9ebbdaaaf9d4db   CRLF
```

### A.4 / A.5 El régimen de cada escritura

Las dieciocho escrituras siguieron **exactamente** la secuencia de la ruta de escritura del
server (`handleRoadmapEdit`), con una sola diferencia declarada: **el server re-emite
`.project/` al terminar y aquí eso está fuera de scope, así que no se hace.**

1. `planEdit` en seco. Se transcriben `stage`, `errors`, `warnings`, `bytes` y la tabla de remap.
2. Si el dry-run trae **un solo** error o warning: no se aplica.
3. Se aplica con el `baseline` del dry-run como **compare-and-swap** — si el archivo hubiera
   cambiado debajo entre el seco y el apply, la escritura se rechaza sola.
4. `applyPlan` con el validador de re-lectura inyectado (parse + `checkInvariants` con los ids
   externos + `hasRoadmapTreeShape`), que **revierte desde backup** si sale rojo.
5. Re-lectura independiente del archivo en disco + `checkInvariants` otra vez, y md5/bytes.

**Las dieciocho: `warnings 0`, `errors 0`, `written=true`, `rolledBack=false`, invariantes
VERDES.** Ninguna necesitó rollback y ninguna paró la cadena.

---

## BLOQUE B — Los nueve vivos, verificados por título antes de moverlos

Derivados del canónico, no recordados. Los nueve `planned` son exactamente los nueve del
encargo, **en las nueve posiciones que el encargo declara**:

| `queue_order` | `run_id` | fase de origen |
|---|---|---|
| 44 | `RUN-CONSOLE-CLASSIFICATION-PILOT-001` | `O4.P9` |
| 45 | `RUN-CONSOLE-DIGEST-CABINA-001` | `O4.P9` |
| 46 | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | `O4.P5` |
| 47 | `RUN-CONSOLE-UI-UX-001` | `O4.P8` |
| 48 | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` | `O4.P9` |
| 49 | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | `O4.P7` |
| 50 | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` | `O4.P9` |
| 51 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | `O0.P3` |
| 52 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | `O0.P3` |

Ninguno faltaba y ninguno estaba en otra posición.

### B.1 — La discrepancia: no la hay, y el `#51` es la respuesta

El encargo pide dónde vive hoy el `#51`, porque una medición del operador contó **2 runs vivos
en `O0.P3`** y solo nombró al `#52`.

**El `#51` (`RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001`) vivía en `O0.P3`, título
«Roadmap Maintenance, Console Tooling and Follow-up Insertion», bajo el objetivo `O0`
(«Project Console»).** Es decir: **en la misma fase que el `#52`**.

Lo que la medición del operador contó estaba bien —`O0.P3` tenía 9 runs, 7 `completed` y **2
vivos**— y el segundo vivo, el que no llegó a nombrarse, es precisamente el `#51`. **No cambia a
dónde hay que moverlo:** el encargo ya lo mandaba a «The console as a product», y ahí fue. La
discrepancia era de nombre omitido, no de ubicación.

---

## BLOQUE C — Acto 1: las cuatro fases nuevas

Cuatro `create-phase` **individuales** (`create-phase` es `identityOp`: el motor lo rechaza
dentro de un `batch`), las cuatro bajo `O4` («Global Console»).

### Los cuatro `phase_id` asignados, y por qué

`O4` ya usaba `O4.P0` … `O4.P15` sin hueco. La unicidad que impone `findPhaseEntry` es
**global** —un id ya usado bajo cualquier objetivo se rechaza—, y `O0` usa `O0.P1`…`O0.P3`, que
son cadenas distintas y no colisionan. Los cuatro siguientes libres, siguiendo el patrón
`O4.PNN` sin relleno de ceros que el archivo ya usaba:

| `phase_id` | título (verbatim, en inglés) |
|---|---|
| `O4.P16` | `The cutover to a single console` |
| `O4.P17` | `The console as a product` |
| `O4.P18` | `Cockpit: classification, digest, and the truth of the texts` |
| `O4.P19` | `Roadmap schema for the kernel` |

### Los cuatro dry-runs y las cuatro escrituras

| # | op | `baseline` del dry-run | remap | bytes | md5 tras escribir |
|---|---|---|---|---|---|
| 1.1 | `create-phase O4.P16` | `sha256:65132af5…` | **vacía** | 121 925 | `8def9e082a4fa7ce0452c9377db83a4b` |
| 1.2 | `create-phase O4.P17` | `sha256:1e2af826…` | **vacía** | 122 051 | `f3b9ac196edb78280ae7739a9dec3fcb` |
| 1.3 | `create-phase O4.P18` | `sha256:0ddc2009…` | **vacía** | 122 212 | `6642874f1952e567bb837704b076b411` |
| 1.4 | `create-phase O4.P19` | `sha256:ffcdf506…` | **vacía** | 122 343 | `e2848dbfc6dda7a613fe5d6a64621b39` |

**Las cuatro tablas de remap salieron vacías**, y eso es exactamente lo correcto: `create-phase`
añade la fase al final del array del objetivo y **no llama a `applyOrder`**, así que ningún run
cambia de `queue_order`. Las cuatro nacieron **VACÍAS**, que es lo que `create-phase` hace y es
legal: ni `checkInvariants` ni el validador del server imponen un mínimo de runs por fase.

---

## BLOQUE D — Acto 2: los nueve vivos a sus fases nuevas, sin moverse de sitio

Nueve `move` con `toPhase`, **uno a uno**. El motor exige exactamente uno de
`after` / `before` / `toOrder`; se usó **`toOrder` con la posición actual de cada run**, que es
lo que el encargo pide para que el `queue_order` no cambie.

**El motor SÍ permite mover de fase sin alterar la posición.** No hubo que parar. La razón es
mecánica y se puede leer en `moveRun`: quita el run del orden global, lo reinserta en el índice
`toOrder − 1` —que es de donde salió— y `applyOrder` reasigna `index+1` sobre un array que quedó
idéntico al de entrada. La reubicación entre arrays de fase ocurre aparte, y no toca el orden.

| # | run | fase destino | remap | bytes | md5 tras escribir |
|---|---|---|---|---|---|
| 2.1 | `#44` `…CLASSIFICATION-PILOT-001` | `O4.P18` | **vacía** | 122 354 | `0078f6d12e9c122af136e2ffb8d3c10e` |
| 2.2 | `#45` `…DIGEST-CABINA-001` | `O4.P18` | **vacía** | 122 354 | `d931280207a3bc4b5c32dfa7e92b2db6` |
| 2.3 | `#46` `…PARIDAD-RENDER-CANTU-001` | `O4.P16` | **vacía** | 122 354 | `cfa11ff847072dd32c625a3fb693857c` |
| 2.4 | `#47` `…UI-UX-001` | `O4.P16` | **vacía** | 122 343 | `c7ee657a5551ce7c861eb9b523333095` |
| 2.5 | `#48` `…CANTU-CANONICAL-OUT-OF-AIW-001` | `O4.P16` | **vacía** | 122 343 | `eeaf8ce448d21246bf8495ed792769e4` |
| 2.6 | `#49` `…CORTE-RETIRO-LOCAL-001` | `O4.P16` | **vacía** | 122 332 | `2d91f6261fa12d570809ae5cd64b8569` |
| 2.7 | `#50` `…STALE-TEXTS-REPAIR-001` | `O4.P18` | **vacía** | 122 332 | `0caaa06d0a190911821b9584229f8b3b` |
| 2.8 | `#51` `…ROADMAP-PHASE-OBJECTIVE-OPS-001` | `O4.P17` | **vacía** | 122 343 | `b4fd6ee4988fd997223621bb23a8fe36` |
| 2.9 | `#52` `…PROJECT-CONSOLE-DEEP-AUDIT-001` | `O4.P17` | **vacía** | 122 343 | `185c0a25387541569b6344fbfcbf8d63` |

**Las nueve tablas de remap salieron vacías. Ningún run cambió de `queue_order` en este acto**,
que era la exigencia del bloque. Los bytes suben y bajan unas decenas porque una fase que pasa de
`"runs": []` a tener contenido gana saltos de línea e indentación, y la que se queda vacía los
pierde; no es un cambio de datos.

El reparto quedó como lo pedía el encargo:

- **The cutover to a single console** — `#46` paridad · `#47` UI/UX (compuerta) · `#48` sacar el
  canónico · `#49` corte
- **The console as a product** — `#51` operaciones de contenedor · `#52` auditoría de UI/UX
- **Cockpit: classification, digest, and the truth of the texts** — `#44` piloto · `#45` digest ·
  `#50` textos falsos
- **Roadmap schema for the kernel** — vacía al cerrar el acto, como estaba previsto

**`O0` («Project Console») quedó como HISTORIA**: conserva sus runs `completed`, no se borró, no
se archivó, no se renombró. Ver `G.3`.

---

## BLOQUE E — Acto 3: los tres runs nuevos

### E.0 — Lo único que el motor no permitió hacer como el encargo lo escribió

El encargo pide **tres `insert`**, en la fase `Roadmap schema for the kernel`, **anclados
encadenados detrás del piloto** (`#44`). **Esas dos cosas no caben en un solo `insert`**, y no
es una opinión sino la mecánica de `insertRun`:

> `insert` **no acepta fase de destino**. Su destino es *el de su ancla*:
> `targetPhase = entry.phase`, donde `entry` es el run nombrado en `after` / `before`.

Como el `#44` acabó en `O4.P18` («Cockpit») en el acto 2, un `insert --after #44` deposita el run
nuevo **en `O4.P18`, no en `O4.P19`**. Y lo hace **en silencio**: el dry-run sale con cero
errores y cero warnings, porque para el motor no hay nada malo en ello. La otra vía,
`--end-of-phase O4.P19`, sí apunta a la fase correcta, pero como la fase está **vacía** el motor
manda el run **al final global** (posición 56) y lo dice con un warning — es decir, rompe el
«quedan en 45, 46 y 47».

**Lo que se hizo, y es una interpretación declarada:** se conserva el anclaje que el encargo pide
—`after` el piloto— y se corrige la fase con un `move` inmediato de un solo run, `toPhase O4.P19`
y `toOrder 45`, o sea **sin mover a nadie de posición** (remap vacía). Esto hizo falta **una sola
vez**: a partir de ahí el ancla del segundo `insert` ya vivía en `O4.P19`, así que el segundo y el
tercero cayeron en la fase correcta por sí solos. El estado final es exactamente el que el
encargo describe; lo que cambia es que costó cuatro escrituras y no tres.

*(No se forzó nada, no se inventó ninguna opción del motor y no se tocó `insertRun`.)*

### E.1 — `RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001`, `after #44`

`depends_on: []`. Remap de la inserción, **completa**:

| antes | después | `run_id` |
|---|---|---|
| (nuevo) | **45** | `RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001` |
| 45 | 46 | `RUN-CONSOLE-DIGEST-CABINA-001` |
| 46 | 47 | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` |
| 47 | 48 | `RUN-CONSOLE-UI-UX-001` |
| 48 | 49 | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` |
| 49 | 50 | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` |
| 50 | 51 | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` |
| 51 | 52 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` |
| 52 | 53 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` |

`baseline sha256:117cadb8…` → 124 957 bytes, md5 `f1dc33f6d467a422dac2b1866f86a0c1`.
**Cayó en `O4.P18`, comprobado leyendo el archivo escrito.**

**Corrección (`3.1b`)** — `move` a `O4.P19` con `toOrder 45`: `baseline sha256:a6c5c97d…`,
**remap vacía**, 124 968 bytes, md5 `ea926a9b59c2bcc4c6a9f99eba72e16d`. Comprobado tras escribir:
`queue_order=45`, `phase=O4.P19` «Roadmap schema for the kernel».

### E.2 — `RUN-CONSOLE-PROGRESS-NORMATIVE-001`, `after` el anterior

`depends_on: ["RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001"]`. Remap **completa**:

| antes | después | `run_id` |
|---|---|---|
| (nuevo) | **46** | `RUN-CONSOLE-PROGRESS-NORMATIVE-001` |
| 46 | 47 | `RUN-CONSOLE-DIGEST-CABINA-001` |
| 47 | 48 | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` |
| 48 | 49 | `RUN-CONSOLE-UI-UX-001` |
| 49 | 50 | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` |
| 50 | 51 | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` |
| 51 | 52 | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` |
| 52 | 53 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` |
| 53 | 54 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` |

`baseline sha256:9b3877ae…` → 127 453 bytes, md5 `8a744197d731d5096c3096501f661ba9`.
**Cayó en `O4.P19` por sí solo**, sin corrección: su ancla ya vivía ahí.

### E.3 — `RUN-CONSOLE-BATCHES-001`, `after` el anterior

`depends_on: ["RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001", "RUN-CONSOLE-PROGRESS-NORMATIVE-001"]`.
Remap **completa**:

| antes | después | `run_id` |
|---|---|---|
| (nuevo) | **47** | `RUN-CONSOLE-BATCHES-001` |
| 47 | 48 | `RUN-CONSOLE-DIGEST-CABINA-001` |
| 48 | 49 | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` |
| 49 | 50 | `RUN-CONSOLE-UI-UX-001` |
| 50 | 51 | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` |
| 51 | 52 | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` |
| 52 | 53 | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` |
| 53 | 54 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` |
| 54 | 55 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` |

`baseline sha256:7d606472…` → 129 975 bytes, md5 `0c52a76b88e9aac4b0a61e6b1e89ccbe`.
**Cayó en `O4.P19` por sí solo.**

### El resultado del acto

Los tres quedaron en **45, 46 y 47**, `planned`, en «Roadmap schema for the kernel», y el efecto
acumulado sobre los que estaban detrás es **+3** (el 45 de partida acabó en 48; el 52, en 55),
que es lo que el encargo anticipaba. Las tres aristas nuevas respetan la precedencia estricta que
el motor exige (`45 < 46 < 47`), y por eso ninguna inserción fue rechazada.

---

## BLOQUE F — Acto 4: el reencuadre del `#52`

Un `set-text` sobre `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001`, con los tres textos aplicados
**verbatim**. **Su `run_id` no se tocó** —`set-text` no puede tocarlo: solo escribe `title`,
`summary` y `full_description` sobre el nodo que localiza— y su `depends_on` siguió vacío, que es
lo que el texto nuevo declara y quiere conservar.

Nada del texto pareció falso, así que no hubo motivo para parar. Dos afirmaciones del texto se
pudieron **contrastar contra el propio canónico** y salieron ciertas: el objetivo `O0` y el
`O4.P19` confirman que **las fases de un objetivo se leen fuera de orden respecto de
`queue_order`** (en `O4`, `O4.P11` está físicamente antes que `O4.P3`), y la afirmación de que la
identidad de las fases es opaca y **no debe renumerarse** es exactamente lo que este encargo
respetó al elegir `O4.P16`…`O4.P19` en vez de reordenar.

`baseline sha256:3bf683b8…`, **remap vacía** (un `set-text` no toca el orden), 131 567 bytes,
md5 `214342647f3b03c62573508c1d431fb4`.

### Verbatim, comprobado por comparación de cadenas

Los cuatro textos escritos en este encargo se releyeron del archivo en disco y se compararon
carácter a carácter con lo que se le pasó al motor:

| run | `title` | `summary` | `full_description` |
|---|---|---|---|
| `…DEPENDS-ON-HUMAN-APPROVED-001` | idéntico (56) | idéntico (165) | idéntico (2085) |
| `…PROGRESS-NORMATIVE-001` | idéntico (71) | idéntico (151) | idéntico (1881) |
| `…BATCHES-001` | idéntico (61) | idéntico (196) | idéntico (1847) |
| `…PROJECT-CONSOLE-DEEP-AUDIT-001` | idéntico (53) | idéntico (168) | idéntico (2221) |

---

## BLOQUE G — Verificación final

### G.1 — Las cifras

| Magnitud | Esperado | Medido | |
|---|---|---|---|
| runs | 55 | 55 | OK |
| `completed` | 43 | 43 | OK |
| `planned` | 12 | 12 | OK |
| otros status | 0 | 0 | OK |
| `queue_order` denso `1..55` | sí | sí | OK |
| objetivos | 2 | 2 | OK |
| fases | 23 | 23 | OK |
| aristas | 29 (26 + 3) | 29 | OK |
| colgantes | 0 | 0 | OK |
| `checkInvariants` | verde | **VERDE (0 errores)** | OK |

**Las diez coinciden.**

### G.2 — La cola viva completa

| `queue_order` | `run_id` | objetivo | fase |
|---|---|---|---|
| 44 | `RUN-CONSOLE-CLASSIFICATION-PILOT-001` | Global Console | Cockpit: classification, digest, and the truth of the texts |
| 45 | `RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001` | Global Console | Roadmap schema for the kernel |
| 46 | `RUN-CONSOLE-PROGRESS-NORMATIVE-001` | Global Console | Roadmap schema for the kernel |
| 47 | `RUN-CONSOLE-BATCHES-001` | Global Console | Roadmap schema for the kernel |
| 48 | `RUN-CONSOLE-DIGEST-CABINA-001` | Global Console | Cockpit: classification, digest, and the truth of the texts |
| 49 | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | Global Console | The cutover to a single console |
| 50 | `RUN-CONSOLE-UI-UX-001` | Global Console | The cutover to a single console |
| 51 | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` | Global Console | The cutover to a single console |
| 52 | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | Global Console | The cutover to a single console |
| 53 | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` | Global Console | Cockpit: classification, digest, and the truth of the texts |
| 54 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | Global Console | The console as a product |
| 55 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | Global Console | The console as a product |

**Los doce vivos cuelgan ahora de `O4` («Global Console»).** Ninguno vive ya en `O0`.

### G.3 — `O0` conserva su historia, y nadie cambió de fase dentro de ella

`O0` «Project Console», `archived=false`, **10 runs, los 10 `completed`, 0 vivos**:

- `O0.P1` «Project Console Foundation» — 1: `#1 RUN-JAME-PROJECT-CONSOLE-FOUNDATION-001`
- `O0.P2` «Roadmap v3 Prototype» — 2: `#2 RUN-JAME-ROADMAP-V3-DESIGN-001`,
  `#3 RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001`
- `O0.P3` «Roadmap Maintenance, Console Tooling and Follow-up Insertion» — 7: `#4`, `#5`, `#6`,
  `#7`, `#8`, `#9` y `#41 RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001`

Al empezar, `O0` tenía 12 runs (1 + 2 + 9), de los cuales 2 eran los vivos `#51` y `#52`.
`12 − 2 = 10`. **Los 10 `completed` siguen en la fase exacta en la que estaban.**

La comprobación se hizo fase por fase, contra los conteos medidos al arrancar la sesión:

| fase | antes | ahora | delta | esperado |
|---|---|---|---|---|
| `O0.P1` / `O0.P2` | 1 / 2 | 1 / 2 | 0 / 0 | 0 / 0 |
| `O0.P3` | 9 | 7 | −2 | −2 (`#51`, `#52`) |
| `O4.P5` | 1 | 0 | −1 | −1 (`#46`) |
| `O4.P8` | 1 | 0 | −1 | −1 (`#47`) |
| `O4.P7` | 1 | 0 | −1 | −1 (`#49`) |
| `O4.P9` | 13 | 9 | −4 | −4 (`#44`, `#45`, `#48`, `#50`) |
| `O4.P16` / `O4.P17` / `O4.P18` / `O4.P19` | (nuevas) | 4 / 2 / 3 / 3 | +4 / +2 / +3 / +3 | igual |
| las 11 fases restantes de `O4` | — | — | **0** | 0 |

**Fases con un delta inesperado: 0.** `O4.P5`, `O4.P7` y `O4.P8` quedan **vacías**: sus runs se
fueron a las fases nuevas. Es legal (el modelo v3 no impone un mínimo) y no se borraron, porque
borrar está fuera de scope.

### G.4 — Ningún `run_id` cambió; ningún `depends_on` preexistente se tocó

- **La autoridad es del motor, no mía**: `checkIdentityPreserved` corrió dentro de `planEdit` en
  **las dieciocho** escrituras, y rechaza cualquier cambio del conjunto de `*_id` salvo el
  único id que la propia mutación declara haber añadido. Las tres inserciones son las únicas
  altas sancionadas; **no hubo ni una baja**.
- Los 9 `run_id` vivos preexistentes: **los 9 siguen presentes**. Los 3 nuevos: **presentes**.
  Total de `run_id` distintos: **55** = 52 preexistentes + 3 nuevos.
- `depends_on` de los 9 vivos preexistentes, comparado contra la medición de arranque:
  **INALTERADO, 9 de 9**.
- Aritmética de aristas: **26 al empezar + 3 declaradas por los runs nuevos = 29 medidas.**
  Si alguna arista preexistente se hubiera perdido, esta suma no cerraría.
- Ninguna operación de las cuatro usadas (`create-phase`, `move`, `insert`, `set-text`) escribe
  el `depends_on` de un tercero. La única que lo hace es `remove`, y **no se ejecutó ni una vez**.

### Status: intacto

`completed` 43 al empezar → **43** al terminar. `planned` 9 → **12**, y los 3 de diferencia son
exactamente los runs nuevos, que **nacen** `planned`. **No se ejecutó ni un `set-status`.**

---

## BLOQUE H — Suite

### H.1 — `npm test`

```
ℹ tests 442
ℹ suites 0
ℹ pass 440
ℹ fail 2
```

**La línea base del encargo se verifica exacta: 442 tests, 440 pasan, 2 fallan.** Y los dos que
fallan son **los dos nombrados**, ninguno más:

1. `tests/classification-care-budget.test.mjs:153` — *«C.3: absent is VALID and is today's state
   — this repo's canonical passes and round-trips byte-identical»*. Afirma que el canónico de
   este repo **no declara `care_budget`**; lo declara. `true !== false`.
2. `tests/roadmap-engine.test.mjs:93` — *«round-trip: the two real canonicals do NOT share a
   line-ending convention (why detectEol exists)»*. El pin de fines de línea: espera 2
   convenciones distintas entre los dos canónicos reales y hoy hay 1. `1 !== 2`.

**Los dos son preexistentes, sin dueño, y NO se repararon**, como el encargo manda. **No apareció
un tercero**, así que no hubo que parar.

**Nota medida, no supuesta:** correr la suite **no tocó `.project/`**. Sus seis artefactos siguen
con fecha 2026-07-31 21:54 y `.project/roadmap.json` sigue declarando **52 runs**. Es decir, la
proyección quedó **deliberadamente desfasada** respecto del canónico de 55 — re-emitirla está
fuera de scope y la pone al día el operador cuando quiera, con el botón *Re-emit `.project/`*.

### H.2 — Qué no fue ejecutable y qué se interpretó

1. **`insert` no acepta fase de destino** (BLOQUE E.0). Las dos exigencias del bloque E —«en la
   fase `Roadmap schema for the kernel`» y «anclados encadenados detrás del piloto»— no caben en
   una sola llamada. **Interpretación:** se conservó el anclaje pedido y se corrigió la fase del
   PRIMER run con un `move` de remap vacía; el segundo y el tercero no la necesitaron. **Acto 3 =
   4 escrituras, no 3.** El estado final es el que el encargo describe.
2. **`insert --after` no avisa de nada.** Que el run nuevo caiga en la fase del ancla no produce
   error ni warning. Se detectó porque se leyó el archivo escrito, no porque el motor lo dijera.
   Vale la pena que quede escrito: **un dry-run limpio no garantiza la fase de destino de un
   `insert`.**
3. **A.1, «árbol limpio comprobado SIN git»**, no admite una comprobación exhaustiva sin git.
   **Interpretación:** barrido de artefactos de escritura interrumpida + ventana de
   modificaciones recientes, descrito y acotado en A.1. Encontró un `.bak` de hace tres semanas,
   que se dejó donde estaba.
4. **A.4, «si un dry-run trae errores o warnings: PARA».** No hizo falta: **las dieciocho salieron
   con cero de ambos.** La regla se implementó igualmente en el driver, que se niega a aplicar un
   plan con warnings.
5. **`externalRunIds`**: el motor pide el conjunto de ids de los demás proyectos registrados
   (CONTRATO §10.d) y sin él una arista externa haría irrepetible el pre-flight. Se compuso
   **leyendo** `aiw/roadmap/roadmap.json` (42 ids), igual que hace el server. `cantu-studio` no
   está en `projects.config.json`, así que no entró. **Ninguno de los dos se escribió.**
6. **Los `phase_id`** los elegí yo, como el encargo autoriza: `O4.P16`…`O4.P19`, criterio en el
   BLOQUE C.
7. **«N/A — campo del kernel»** en *Max rounds*: no aplica y no se usó.

---

## Lo que este record NO hace

- **No re-emite `.project/`** ni dice que esté al día. Al contrario: mide que está desfasado
  (52 runs proyectados contra 55 canónicos) y deja el botón para el operador.
- **No repara los dos tests rojos** ni propone cómo. Los nombra, los cita y los deja.
- **No clasifica ningún run.** Los tres nuevos nacen sin ninguno de los seis campos de §1, que es
  la conducta por defecto del motor: la ausencia es el default y ninguna escritura la rellena.
- **No abre la consola** ni verifica cómo se ven las cuatro fases nuevas en pantalla. Que
  `O4.P5`, `O4.P7` y `O4.P8` queden vacías, y que las fases de `O4` se lean fuera de orden
  respecto de `queue_order`, son **hechos del archivo** medidos aquí; cómo los pinta la consola
  es trabajo del `#55`.
- **No decide qué hacer con las tres fases que quedaron vacías.** Borrarlas está fuera de scope y
  `delete-phase` no se ejecutó.
- **No toca `context/DECISIONES.md`.** Si esta reestructuración merece una entrada `D-0NN`, la
  escribe el operador.
- **No usa git** en ninguna forma, así que no dice nada sobre el estado del repo, ni commitea, ni
  deja nada preparado para commitear. El diff queda para que lo revise el operador.
- **No afirma nada sobre el kernel `aiw`.** Los tres runs nuevos declaran por escrito qué mitad
  NO construyen, y esa mitad es de `aiw`; este record solo los dio de alta.
