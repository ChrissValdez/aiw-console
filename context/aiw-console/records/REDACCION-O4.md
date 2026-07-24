# REDACCIÓN O4 — conversión de "Consola global" a `roadmap_tree_v1`

Estado: EJECUTADA, fechada **2026-07-24** (fecha del sistema, no asumida). Registra
la escritura del objetivo O4 en `projects/aiw-console/roadmap/roadmap.json`, junto
al O0 ya presente. No es contrato ni decisión. **No se ejecutó git en ninguna
forma.** No se editó `roadmap_AIW_temp.md`, el roadmap de Cantu, `CONTRATO.md`,
`DECISIONES.md` ni ningún record existente.

## Nota de verificación

Rutas relativas a la raíz `C:\Users\chris\Documents\AIW_Workspace`. Alias:
**RM-AIW** = `projects/aiw-console/context/aiw/roadmap_AIW_temp.md` (fuente de O4);
**RM-CONSOLE** = `projects/aiw-console/roadmap/roadmap.json` (destino escrito);
**MEDICION-O4** = `context/aiw-console/records/MEDICION-O4.md`;
**HANDOFF** = `context/handoffs/aiw-console.md`;
**CONTRATO** = `context/aiw-console/CONTRATO.md` (capa 2). Toda afirmación de forma
sale de recorrido propio de RM-CONSOLE tras la escritura (verificación §J). Lo no
comprobable desde disco se marca **[NO VERIFICADO]**.

---

## A. Tabla de equivalencia tramo ↔ bullet — con el desfase declarado explícito

La fuente numera cuatro bullets `1.`–`4.` (RM-AIW:122, :128, :133, :139). **Esa
numeración NO alinea con los nueve tramos** (HANDOFF:30-40): un bullet cubre cuatro
tramos, otro cubre dos, y un tramo no tiene bullet. Los `title` de run **NO
conservan** el prefijo `1.`–`4.`: sería una tercera numeración compitiendo con
`queue_order` y con los `phase_id`. Disposición de **los diez bullets** de O4
(MEDICION-O4 §3) — ninguno se descarta:

| Bullet fuente (RM-AIW) | Tramo(s) | Fase escrita | Run(s) escritos |
|---|---|---|---|
| `1. Audit / Phase 0` (:122) | **0** | O4.P0 | `RUN-CONSOLE-AUDIT-PHASE0-001` |
| `2. Contrato de normalización` (:128) | **1** | O4.P1 | `RUN-CONSOLE-CONTRATO-CARPETA-001` (+ 5 runs de tramo 1) |
| `3. Los tres roadmaps al contrato` (:133) | **2 / 4 / 6 + intercalado** | O4.P2, P4, P6, y P1 (migración O0) | `EMISOR-CARPETA-PROPIA`, `CANTU-EMITE-CARPETA`, `AIW-TERCER-PROYECTO`, `MIGRACION-O0` |
| `4. La consola los lee` (:139) | **3 / 5** | O4.P3, P5 | `SHELL-MULTIPROYECTO`, `PARIDAD-RENDER-CANTU` |
| `Consola global en aiw-console` (:149) | 5 | O4.P5 | `PARIDAD-RENDER-CANTU` (absorbido) |
| `Pantalla multi-proyecto` (:152) | 3 | O4.P3 | `SHELL-MULTIPROYECTO` (absorbido) |
| `Paridad y corte` (:155) | **7** | O4.P7 | `CORTE-RETIRO-LOCAL` |
| *(sin bullet — solo prosa :119-120, :157)* | **8** | O4.P8 | `UI-UX` |
| `Merge de 005 en aiw-console` (:100) | *(ninguno — anterior al plan)* | O4.P9 | `MERGE-005` |
| `Context pack de la consola` (:140) | *(ninguno — transversal)* | O4.P9 | `CONTEXT-PACK` |
| `Digest para la cabina` (:144) | *(ninguno — transversal)* | O4.P9 | `DIGEST-CABINA` |

**El desfase, dicho en claro:** el bullet "3." absorbe cuatro unidades de trabajo
(tramos 2, 4, 6 y el intercalado); el bullet "4." absorbe dos (tramos 3 y 5); el
**tramo 8 no tiene bullet** (vive en prosa); y **tres bullets caen fuera de la
secuencia de tramos** (Merge 005, Context pack, Digest). El bullet "1." es el tramo
**0**, no el 1 — el offset de uno persiste en los cuatro bullets numerados.

---

## B. La estructura de fases es INVENCIÓN — declarada con esa palabra

Las fases `O4.P0`…`O4.P8` (fase = tramo, número de fase = número de tramo) más la
fase transversal `O4.P9` son una **INVENCIÓN** de esta redacción, no una conversión
de algo presente en la fuente. La fuente **no declara fases** (MEDICION-O4 §3,
§4.2) y los nueve tramos **viven solo en el HANDOFF efímero** (MEDICION-O4 §6). Se
adopta porque es la mejor descomposición disponible y llevarla a estado duradero es
parte del objetivo — pero **no se presenta como si la fuente la prefigurara**. Un
contrato que exige emisor y ejemplo (CONTRATO §2, §3.b) no maquilla su propia
invención: aquí queda escrita la palabra.

Lo que **sí** viene de la fuente y solo se **acuña** (dar id a algo que existe):
los `title`, `status` y `full_description` de cada run salen de la prosa del bullet
correspondiente; el `title` de objetivo "Consola global" existe (RM-AIW:98). Lo que
se **inventa** (contenido nuevo): la capa de fases entera, los `queue_order`, y los
`run_id` (acuñados sobre bullets existentes, pero el string es nuevo). Distinción
heredada de MEDICION-O4 §4.

---

## C. Decisiones ratificadas del encargo — aplicadas

- **`objective_id` = `O4`**, conservando el hueco con `O0` (no hay O1..O3 en
  RM-CONSOLE). No se renumeró: es identidad. El hueco dice la verdad — O0 y O4
  vienen de numeraciones distintas.
- **Prefijo `RUN-CONSOLE-`**, forma `RUN-CONSOLE-<SLUG>-001` (CONTRATO §10.d Regla
  1.a). No `RUN-AIW-` (ése es del kernel). Verificado: los 17 casan la forma, 0
  colisión con O0 y con los 16 del proyector (§J).
- **`title` de objetivo = "Consola global".** El paréntesis "(migrará a su propio
  roadmap cuando nazca)" **NO se transcribió**: es metadato que se vuelve falso al
  ejecutar esta redacción (el roadmap propio ya existe).

---

## D. Los tres ítems del §5 — hogar justificado por escrito

Ninguno mapea a un tramo, así que van en **una** fase adicional transversal
`O4.P9` "Trabajo previo y transversal (fuera de la secuencia de tramos)". **Colocados,
no descartados**, con justificación:

- **`Merge de 005`** (`completed`, RM-AIW:100) → `RUN-CONSOLE-MERGE-005-001`.
  Justificación: es la ignición de la consola de AIW y **precede al plan de
  tramos**; no pertenece a ninguno. Ponerlo en cualquier `O4.P0..P8` rompería la
  alineación fase↔tramo que el encargo exige, así que va en la transversal. Su
  `full_description` transcribe la sustancia de RM-AIW:100-113 (incluidos los
  pulidos menores pendientes).
- **`Context pack de la consola`** (`planned`, RM-AIW:140) →
  `RUN-CONSOLE-CONTEXT-PACK-001`. Justificación: es contexto/reglas transversal, no
  atado a un tramo. Redactado como run con la **tensión anotada**: D-037/D-038 ya
  movieron el contexto de cabina a `context/aiw-console/`, con lo que queda
  **parcialmente superado**; decidir qué le queda vivo **NO es de este encargo**
  (así consta en su `full_description`).
- **`Digest para la cabina`** (`planned`, RM-AIW:144) →
  `RUN-CONSOLE-DIGEST-CABINA-001`. Justificación: la **propia fuente** lo degrada de
  prerequisito a optimización (RM-AIW:148). Degradado no es muerto: se conserva como
  run `planned` transversal, con esa degradación citada.

`O4.P9` no está vacía (3 runs) y su existencia queda justificada aquí, **nunca por
descarte** (CONTRATO §12.b exige ≥1 run por fase; se cumple).

---

## E. Status — el roadmap nace al día, con las divergencias reportadas

Cada divergencia entre el `status` de la fuente y el escrito, con la evidencia que
sostiene el estado escrito:

| Run | Status fuente | Status escrito | Evidencia citada |
|---|---|---|---|
| `AUDIT-PHASE0` | `planned — SIGUIENTE` (RM-AIW:122) | **`completed`** | `AUDIT-CONSOLE-O4-PHASE0.md` (commit dc76b49) |
| `CONTRATO-CARPETA` | `planned` (RM-AIW:128) | **`completed`** | `CONTRATO.md`; D-039, D-040, D-041, D-043 |
| `REARCHIVO-BLOQUE-RENAME` | *(no estaba en la fuente)* | **`completed`** | `REARCHIVO-BLOQUE-RENAME.md`; D-042 |
| `MIGRACION-O0` | `planned` (dentro del bullet 3, RM-AIW:135-138) | **`completed`** | `MIGRACION-O0.md` |
| `VALIDADOR-ROJO-REPARADO` | *(no estaba en la fuente)* | **`completed`** | `MEDICION-VALIDADOR-ROJO.md`; D-045 |
| `MEDICION-O4` | *(no estaba en la fuente)* | **`completed`** | `MEDICION-O4.md` |
| `REDACCION-O4` | *(no estaba en la fuente)* | **`completed`** | este record (auto-referencial) |
| `MERGE-005` | `completed` (RM-AIW:100) | `completed` | RM-AIW:100 (29c9478) — **sin divergencia** |
| P2–P8, Context pack, Digest | `planned` | `planned` | — **sin divergencia** |

Divergencias mayores: la fuente declara `1. Audit / Phase 0 — planned — SIGUIENTE`
(RM-AIW:122). **Es falso hoy:** el audit está hecho y adjudicado, el contrato del
tramo 1 entregado (D-039…D-045) y la migración de O0 ejecutada. Cuatro runs
`completed` **no tenían entrada en la fuente** (re-archivo, validador rojo, medición
O4, esta redacción): son trabajo del tramo 1 que ocurrió después de escribirse
RM-AIW y que la granularidad-sigue-evidencia (§4 del encargo) obliga a registrar,
cada uno citando su record.

**Sin `status` de objetivo ni de fase** (CONTRATO §12.c, §10.b): verificado 0 en
disco (§J). El `COMPLETADO` que O1 lleva en el Markdown de AIW no tiene análogo
aquí — se descarta como derivable. **`category` nace ausente** (CONTRATO §16):
verificado 0 runs con `category`, aunque RM-AIW:14 declare que todos los runs de AIW
son `manual`.

---

## F. `depends_on` — solo la compuerta declarada

**Una sola arista en todo O4**, la única que la fuente declara como compuerta
explícita:

    RUN-CONSOLE-CORTE-RETIRO-LOCAL-001  ->  RUN-CONSOLE-PARIDAD-RENDER-CANTU-001

Cita: "La local no se toca hasta paridad" (RM-AIW:151) y "Cuando la global renderice
y edite igual que la local, la local se retira" (RM-AIW:155-156). El corte (tramo 7)
queda gated por la paridad (tramo 5).

**Aristas NO fabricadas, a propósito.** La secuencia entre tramos (0→1→2…) y la
cadena histórica del tramo 1 (contrato → migración → validador → medición →
redacción) **existen cronológicamente**, pero la fuente no las declara como
compuertas: **las carga `queue_order`, no aristas fabricadas** (§7 del encargo).
Por eso todos los demás runs llevan `depends_on: []`. Se anota que se vieron y se
omitieron deliberadamente, no por descuido.

---

## G. El criterio de "consola estable" — preservado literal

RM-AIW:118-120 define el criterio de terminación, que no está escrito en ningún otro
sitio (§9 del encargo). Como el objetivo bajo `roadmap_tree_v1` **no tiene campo de
prosa** (CONTRATO §10.a: objetivo = `objective_id`, `title`, `phases`), se preservó
**verbatim dentro del `full_description` del run `RUN-CONSOLE-AUDIT-PHASE0-001`**
(O4.P0), demarcado como "Marco del objetivo, preservado literal de RM-AIW:114-120".
Incluye la SECUENCIA ACORDADA de D-034 y su razón (la consola es la CONDICIÓN del
modelo de tres conversaciones en paralelo) y la definición literal:

> "consola estable = renderiza los tres proyectos, leyendo de sus propios repos,
> roadmap + docs + status, READ-ONLY. Nada más".

Nota de fidelidad: dentro del JSON, las comillas delimitadoras de `"consola estable"`
se escriben como `\"consola estable\"`; el **texto** del criterio es literal, sin
alteración.

---

## H. Hueco de capa 2 — registrado, sin campo inventado

Dos declaraciones de la fuente **no tienen destino** en `roadmap_tree_v1`, y **no se
inventó un campo** para ellas (sería el patrón §3.b que el contrato existe para
matar):

1. **Vocabulario de `status` a nivel de roadmap** (RM-AIW:13,
   `planned|active|completed|blocked`). El árbol no tiene clave de vocabulario a
   nivel de raíz ni de objetivo; el vocabulario vive en el contrato (§11.a), no en
   el dato.
2. **El matiz de que los runs contra `aiw-console` sí serían delegables al kernel**
   (RM-AIW:15-16) — una **excepción** a la regla de categoría `manual`. `category`
   nace ausente (§16) y, aun cuando se materialice, es un valor por run, no tiene
   dónde alojar la *excepción a nivel de roadmap*.

**Registro:** es un **hueco de la capa 2 descubierto por uso** — el contrato no
prevé contexto a nivel de roadmap ni de objetivo. La enmienda del contrato **va en
encargo aparte**, no aquí (out of scope explícito del encargo). Se registra para que
no se pierda al migrar.

---

## I. `queue_order` — reporte, sin resolver la prioridad

O4 ocupa **13..29**, denso y contiguo tras los **1..12** de O0, en orden de
presentación de fase (tramo). Total global **1..29** (§J).

**Reportado, NO resuelto** (§8, §12.b del encargo): O0 conserva **1 run `active`
(`RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001`, q10) y 2 `planned` (q11, q12)** con
`queue_order` bajo, así que **preceden a todo O4 en la cola global**. Si esa es la
prioridad real —terminar el trabajo abierto de la consola local de Cantu antes que
empezar los tramos de la global— **la decide el operador**. Esta redacción solo
constata el orden que el `queue_order` denso produce.

Anomalía cosmética declarada: `RUN-CONSOLE-MERGE-005-001` es `completed` pero lleva
`queue_order` 27 (alto). No es error: `queue_order` sigue el orden de fase, y la
fase transversal va al final del rango de O4; Merge 005 es anterior al plan pero no
pertenece a ningún tramo. El número no pretende ser cronología.

---

## J. Verificación posterior (§11) — con números medidos

Recorrido propio de RM-CONSOLE tras la escritura (`node`, read-only, 2026-07-24):

| Chequeo | Resultado |
|---|---|
| JSON parsea; 2 objetivos | **OK** — `O0, O4` |
| 12 runs de O0 intactos (deep-equal campo a campo vs backup pre-escritura) | **0 diferencias**; 12 runs idénticos |
| `queue_order` global denso, único, contiguo | **1..29**, únicos, contiguo `true` |
| `depends_on` colgantes | **0** |
| Fases con 0 runs | **0** — O4: P0(1) P1(6) P2(1) P3(1) P4(1) P5(1) P6(1) P7(1) P8(1) P9(3) |
| `run_id` nuevos casan `RUN-CONSOLE-<SLUG>-001` | **17/17**, 0 fuera de forma |
| Unicidad vs 12 de O0 y vs 16 del proyector (`.aiw/views/roadmap.json`) | colisión **0** y **0** |
| Derivación §12 — O0 | 12 runs `{completed:9, active:1, planned:2}` → **`active`** (rama 1) |
| Derivación §12 — O4 | 17 runs `{completed:8, planned:9}` → **`in_progress`** (rama 4) |
| `category` en runs / `status` en objetivo / `status` en fase | **0 / 0 / 0** |

El backup pre-escritura se tomó en el scratchpad de sesión antes de tocar el
archivo; la comparación campo a campo de O0 dio 0 diferencias.

---

## K. Conteo y derivaciones

- **O4 tiene 17 runs** en 10 fases (`O4.P0`…`O4.P9`): 8 `completed`, 9 `planned`,
  0 `active`, 0 `blocked`.
- **O4 deriva `in_progress`** (§12.a rama 4: hay `completed` pero no todos). Token
  del vocabulario de objetivo (§11.b); **no se almacena** (§12.c).
- **O0 sigue derivando `active`** (§12.a rama 1: su run q10 sigue `active`),
  intacto.
- Roadmap completo: **2 objetivos, 29 runs**, un solo run `active` en toda la cola
  (el de O0), coherente con la convención de un run en curso (CONTRATO §11.a).

---

## L. Pendientes reportados (fuera de scope de este encargo)

- **`roadmap_AIW_temp.md` NO fue editado** (§12 del encargo). En consecuencia, **O4
  vive hoy en DOS sitios a la vez**: en RM-AIW (Markdown, fuente original) y en
  RM-CONSOLE (`roadmap_tree_v1`, recién escrito). Es la ventana deliberada: sacar O4
  de RM-AIW hoy lo dejaría sin respaldo. **Su retiro es trabajo del tramo 6**
  (`RUN-CONSOLE-AIW-TERCER-PROYECTO-001`) o de un encargo aparte, no de éste.
- **Prioridad O0 vs O4 en la cola** (§I): sin resolver, del operador.
- **Qué queda vivo del `Context pack`** tras D-037/D-038: sin resolver, anotado como
  tensión en el run.
- **Enmienda del contrato por el hueco de capa 2** (§H): encargo aparte.
- El commit lo hace el operador. **[NO VERIFICADO]** todo lo relativo a git.

## No-claims de esta redacción

- No se ejecutó git en ninguna forma. No se levantó la consola, el validador ni el
  proyector. No se tocó el emisor ni `.project/`.
- No se editó `roadmap_AIW_temp.md`, el roadmap de Cantu, `CONTRATO.md`,
  `DECISIONES.md` ni ningún record existente.
- La única escritura de datos fue `projects/aiw-console/roadmap/roadmap.json`
  (añadir O4) y este record.
