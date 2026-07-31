# HANDOFF — hilo `aiw-console` (la consola)

> **Efímero y se SOBRESCRIBE.** Es el relevo del hilo: se reescribe al cerrar cada
> sesión y se consume al abrir la siguiente. No es un record, no acumula historia.
> Lleva **solo** lo necesario para arrancar. **APUNTA, no RECUENTA.**
>
> **Este handoff NO lleva doctrina.** La doctrina vive en
> `context/CLASIFICACION-DE-RUNS.md` y en `context/DECISIONES.md`. Si alguna vez se
> copia aquí una regla, deja de ser regla y se vuelve estado que se pudre.
>
> **TODO `#N` Y TODO `phase_id` DE ESTE DOCUMENTO ES UNA COORDENADA FECHADA**
> (2026-07-31). El `queue_order` se renumera cuando se inserta un run: el `#42` de
> ayer no es el `#42` de hoy. **La próxima sesión no debe leer estos números como
> los suyos: los re-mide sobre `roadmap/roadmap.json`.** Los `run_id` sí son
> estables (`D-047`, identidad opaca) — cuando haya duda, manda el `run_id`.

---

## 1. Cómo arrancar — cinco lecturas, en este orden

1. `roadmap/roadmap.json` — el plan y el estado. **El estado real se mide aquí, no
   se recuerda ni se hereda de este archivo.**
2. `context/CLASIFICACION-DE-RUNS.md` — la especificación canónica de clasificación
   de runs, normativa y transversal a los tres proyectos. De ella dependen los dos
   runs vivos de clasificación. Su `§7` declara un hueco abierto (ver §8, cabo 6).
3. `context/DECISIONES.md` — el suelo doctrinal. `D-058` es la última entrada.
4. `context/aiw-console/CONTRATO.md` — `§7` (rutas: contención documental, no
   enforced), `§11`–`§12` (status de fase y objetivo **derivado al leer**, no
   almacenado).
5. `context/handoffs/aiw.md` y `context/handoffs/cantu-studio.md` — los dos hilos
   paralelos. **Léelos antes de tocar cualquier run que escriba en `cantu-studio`.**

---

## 2. ⚠ AVISO DE TOPOLOGÍA — leer antes de planificar una sola lectura

**El sync del Project se RECORTÓ. `aiw-console` YA NO se sincroniza completo,
aunque la configuración del Project siga diciendo que sí.**

**NO están en el knowledge, y pedir sync NO los traerá — es topología, no retraso
de indexado:**

- `context/aiw-console/records/` — **todos** los records
- `project-console/` · `docs/project-console/` · `console/`
- `tests/` · `tools/` · `.project/`

**SÍ están:**

- `roadmap/roadmap.json`
- `context/README.md` · `context/DECISIONES.md` · `context/handoffs/`
- `context/aiw-console/CONTRATO.md`
- `context/CLASIFICACION-DE-RUNS.md`
- `context/aiw/` · `context/cantu-studio/`
- el `.project/roadmap.json` de `cantu-studio`

**CONSECUENCIA OPERATIVA: cuando este handoff apunte a un record, la cabina NO
puede leerlo.** Los punteros de abajo siguen siendo correctos como dirección, pero
no como acceso. Las dos vías son: **un encargo de taller** (el taller sí lee el
disco entero) **o que el operador lo pegue.** No se planifica sobre el contenido de
un record que nadie ha leído.

---

## 3. Estado medido hoy — 2026-07-31

**HEAD: `02d1ac1`.** `git status --porcelain` vacío al abrir y al cerrar.
**Ningún run está `active`.**

Medido sobre `roadmap/roadmap.json`:

- **52 runs** — **42 `completed`, 10 `planned`, 0 `active`.**
- **2 objetivos, 19 fases.** `O0` «Project Console»: 3 fases, 12 runs. `O4` «Global
  Console»: 16 fases, 40 runs.
- **26 aristas `depends_on`, 0 colgantes.**
- `queue_order` **1..52, denso, único y contiguo**.
- **36 runs con `closeout_result`** (los 16 sin él: los 10 `planned` y seis
  `completed`).
- **0 runs con `lane`, 0 con `barrier`.** Un solo carril: la cola es serial y el
  `queue_order` es la historia completa de la ejecución. El vocabulario existe en el
  esquema (`D-051`) y este proyecto no lo usa.

**Línea base del canónico:** **119 081 bytes**, md5
**`fd04c09fddd615180e6b11d499cb3ab7`**.

`context/DECISIONES.md`: **58 entradas numeradas, `D-001`..`D-058` sin huecos; la
última es `D-058`.** (El archivo tiene 59 encabezados de decisión: uno es
`D-010-enmienda`, que no consume número.)

**Suite: `npm test` → 325 tests, 325 pasan, 0 fallan.** Correrla **ya no ensucia el
árbol**: `git status --porcelain` quedó idéntico —vacío— antes y después.

---

## 4. Qué pasó en esta sesión — cinco hitos

Los hashes los declara la cabina desde la salida de los push; no se reconstruyeron
con `git log`.

| Commit | `#` | Qué dejó |
|---|---|---|
| `54f7c38` | `#39` | La especificación de clasificación de runs pasa de texto pegado en conversaciones a **documento canónico en disco**: `context/CLASIFICACION-DE-RUNS.md`, más la decisión `D-057` (dos ejes). Desde aquí, un run puede depender de ella. → `records/PUBLICACION-CLASIFICACION-DE-RUNS.md` |
| `d10d060` | `#40` | La suite **aserta contra fixtures, no contra datos vivos de proyectos hermanos**, y deja de re-emitir `.project/` al correr. Antes ensuciaba el árbol; hoy no. → `records/SUITE-CONTRA-FIXTURES.md` |
| `446b15b` | `#41` | Cerrados los **cuatro defectos de la consola global** y el espejo del proyector contra el que asertan los tests. → `records/DEFECTOS-CONSOLA-Y-ESPEJO.md` |
| `33c1ce7` | — | **Inserción** de `RUN-CONSOLE-PROJECTOR-CASE-BANKS-001`. La cola pasa de 51 a **52** runs, con la renumeración de `queue_order` que eso arrastra. → `records/INSERCION-RUN-PROYECTOR-CASE-BANKS.md` |
| `02d1ac1` | `#42` | El emisor **declara las carpetas de `objectives/` que NO lee**, con la razón que nombra modo y layout. Dos claves nuevas en `snapshot.json` cuando la raíz tiene `objectives/`. → `records/PROYECTOR-BANCOS-DE-CASOS.md` |

---

## 5. Lo que queda vivo — los diez `planned`

Títulos **verbatim de disco, en inglés**: es lo que el operador ve en pantalla.
**Los diez se leyeron; ninguno quedó ilegible.** Orden = `queue_order`.

| `#` | Fase | `run_id` | Título |
|---:|---|---|---|
| 43 | `O4.P9` | `RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001` | The five classification fields enter the roadmap schema, with derivation at read time and a minimal view |
| 44 | `O4.P9` | `RUN-CONSOLE-CLASSIFICATION-PILOT-001` | Classify aiw-console's live runs as the pilot, and rule on the procedure itself |
| 45 | `O4.P9` | `RUN-CONSOLE-DIGEST-CABINA-001` | Digest for the cockpit |
| 46 | `O4.P5` | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | Global console renders Cantu (parity, operator QA) |
| 47 | `O4.P8` | `RUN-CONSOLE-UI-UX-001` | UI/UX of the global console |
| 48 | `O4.P9` | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` | Move cantu-studio's canonical roadmap out of .aiw before the cutover can delete it |
| 49 | `O4.P7` | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | Cutover: retirement of Cantu's local console and deletion of .aiw |
| 50 | `O4.P9` | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` | Repair the five texts that describe this repo falsely |
| 51 | `O0.P3` | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | Add phase and objective create and delete operations |
| 52 | `O0.P3` | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | Deep Project Console audit |

**La cabeza de la cola viva es el `#43`.**

Que `O0.P3` lleve 51 y 52, y que `O4.P5`/`O4.P7`/`O4.P8` caigan en 46/49/47
mientras `O4.P9` ocupa números bajos y altos a la vez, **es correcto**: el orden lo
da el `queue_order`, siempre y solo; el `phase_id` es identidad opaca (`D-047`) y no
implica posición.

**Dos de los diez escriben en `cantu-studio`** — el `#48` y el `#49`. La ventana se
coordina con aquel hilo y no corren con un taller vivo allí.

---

## 6. Las aristas vivas — ocho

De las **26** aristas del archivo, **ocho** tocan un run `planned`. **Las 18
restantes unen runs ya `completed`**: no gobiernan nada de lo que queda y **no se
transcriben.**

| Origen | → | Destino |
|---|---|---|
| Fix four defects in the global console renderer, and the projector mirror the tests assert against *(`completed`)* | → | Global console renders Cantu (parity, operator QA) |
| Global console renders Cantu (parity, operator QA) | → | UI/UX of the global console |
| Global console renders Cantu (parity, operator QA) | → | Cutover: retirement of Cantu's local console and deletion of .aiw |
| UI/UX of the global console | → | Cutover: retirement of Cantu's local console and deletion of .aiw |
| Move cantu-studio's canonical roadmap out of .aiw before the cutover can delete it | → | Cutover: retirement of Cantu's local console and deletion of .aiw |
| Publish the run classification specification and register it as a transversal decision *(`completed`)* | → | The five classification fields enter the roadmap schema, with derivation at read time and a minimal view |
| Make the test suite stable under change — assert against fixtures, not live sibling data *(`completed`)* | → | The five classification fields enter the roadmap schema, with derivation at read time and a minimal view |
| The five classification fields enter the roadmap schema, with derivation at read time and a minimal view | → | Classify aiw-console's live runs as the pilot, and rule on the procedure itself |

Las tres aristas que entran al corte son **aprobación explícita del operador**, no
comprobación automática. El corte es irreversible y no procede sin las tres.

---

## 7. Los derivados — AL DÍA, nada que re-emitir al abrir sesión

Comparado **tupla a tupla** (`run_id`, `phase_id`, `status`, `queue_order`) contra
el canónico: **`.project/roadmap.json` coincide en los 52 runs — 0 tuplas solo en el
canónico, 0 solo en el espejo, 0 diferencias.**

`.project/snapshot.json`: `generated_at` **`2026-07-31T10:45:14.552Z`**,
`generated_from` **`aiw-projector@0.10.0`**.

Medido: **este snapshot NO trae `unprojected_inputs` ni `unprojected_inputs_reason`**
— correcto, porque la raíz de este repo **no tiene carpeta `objectives/`**. El par
de claves solo viaja donde esa carpeta existe (ver §9, el reporte nuevo).

---

## 8. Cabos anotados, con dueño

1. **Defecto del modo 1 del proyector.** `taxonomy_model` declara un vocabulario
   cerrado de tres clasificaciones y `counts.total` da **16 contra 22 archivos en
   disco**. **MEDIDO en el `#42`: ningún consumidor vivo alcanza el modo 1** — su
   único llamador fuera de tests es el servidor del fork descartado. **Candidato a
   run, sin insertar.** Su sitio natural es el run que retire el fork, **que hoy NO
   existe en la cola.**
2. **Tres lecturas vivas de `cantu-studio` en `tests/roadmap-engine.test.mjs`**,
   incluido un test de EOL que hoy comprueba **el CHECKOUT y no el código**
   (`core.autocrlf` sin `.gitattributes`). **Dueño: el run que saca el canónico de
   Cantu de `.aiw/`.** Riesgo declarado: pueden ponerse rojas antes de llegar ahí si
   Cantu se mueve.
3. **El confirm del modal se dispara al querer cancelar.** Reportado por el hilo
   `aiw` operando la consola global. **Dueño: el run de UI/UX de la consola global.**
4. **Renderizar `unprojected_inputs` en pantalla.** Hoy el dato está en el artefacto
   y no en la consola. **Dueño: el mismo run de UI/UX.**
5. **El fixture de docs del layout fuente de Cantu está reducido**: ningún test
   ejercita ya ese layout a escala real. **Residual declarado, sin dueño.**
6. **Las TRES REGLAS MECÁNICAS PARA RUNS MIXTOS no existen en disco.** El `#39` las
   buscó con cuatro barridos y solo encontró la promesa de publicarlas. Están
   **declaradas como hueco en `context/CLASIFICACION-DE-RUNS.md §7`**. Se resuelven
   dentro del run del piloto de clasificación, cuando el hueco se vuelva un caso
   concreto. **No se reconstruyen por coherencia.**

---

## 9. Reportes pendientes a los otros hilos

Este hilo **no escribe en `aiw` ni en `cantu-studio`**. Un hallazgo sobre cualquiera
de los dos se **nombra y se pasa** — sin ticket y sin recomendación de arreglo. Son
del **operador**, no del taller.

**NUEVO — a `aiw` Y a `cantu-studio`:**

> El emisor pasó de **0.9.0 a 0.10.0**. La próxima vez que emitan, su
> `generated_from` cambiará y su `snapshot.json` **puede ganar dos claves nuevas**
> (`unprojected_inputs` y `unprojected_inputs_reason`) **si su raíz tiene carpeta
> `objectives/`**. **No escribimos en sus repos: el cambio les llega cuando emiten
> ellos.** Si algún test o validador suyo aserta la versión o el conjunto de claves,
> lo verá moverse.

**Heredados del relevo anterior. NO SE SABE SI SE ENTREGARON.**

1. **A `aiw` — `[ESTADO DESCONOCIDO — confirmar con el operador]`.** La condición de
   borrado del Markdown de AIW **la escribió él y hay que reformularla**: decía
   «espera a que se reparen las diez citas». **Medido hoy sobre el canónico: quedan
   5 ocurrencias del token `RM-AIW:`, una por run, en 5 runs — cuatro `completed` y
   una en un run vivo (`Digest for the cockpit`).**
2. **A `cantu-studio` — `[ESTADO DESCONOCIDO — confirmar con el operador]`.** Su
   canónico **vive dentro de la carpeta que el corte borra** —ya tiene run propio
   aquí— y **su `schema_version` difiere de los otros dos.**
3. **A `cantu-studio` — `[ESTADO DESCONOCIDO — confirmar con el operador]`.** 17 de
   sus runs afirman no tener corredor de tests habiendo 33 archivos de test en
   disco. **`[NO VERIFICADO]`** — cifras heredadas del relevo anterior; `cantu-studio`
   está fuera del alcance de lectura de este hilo y **no se re-midieron**.

Un cuarto reporte del relevo anterior —la decisión de dos ejes, cierre DERIVADO y
delegabilidad DECLARADA, al hilo de `aiw`— **la cabina lo da por entregado** y por eso
no aparece aquí.

---

## 10. Dos huecos de registro que quedaron abiertos

- **Commits intermedios que la cabina no vio.** Entre los push de esta sesión
  aparecen `37e2d77`, `b213f13`, `e1b5d1b` y `1156574`: cada bloque de Git partió de
  un HEAD distinto del último push conocido. **La hipótesis es que son la escritura
  de apertura de cada run commiteada aparte, PERO NO ESTÁ VERIFICADO.** No se corrió
  git para comprobarlo. **Queda para el operador.**
- **Una atribución falsa en un record.** `records/SUITE-CONTRA-FIXTURES.md` atribuye
  la línea base sucia del `#40` a una corrida previa de la suite. **Es falsa**: eran
  los 7 archivos de la escritura de apertura del run. **Se ignora si la corrección
  llegó a aplicarse.** Los records **no se reescriben hacia atrás**; si sigue mal, se
  corrige hacia adelante.

---

## 11. Qué se puede mirar HOY

La consola global, desde la raíz de `projects/aiw-console`:

```bash
node project-console/serve.mjs
```

o el lanzador `start-console.cmd` / `start-console.ps1` (ver
`start-console.README.md`).

**`[NO VERIFICADO]` que pinte los proyectos en pantalla: no se levantó en esta
sesión.**

---

## 12. Este encargo no cambió nada observable

Fue un encargo de taller **sin run**. **Su único byte escrito es este archivo.** Ni
el roadmap, ni `.project/`, ni el código, ni un record, ni `DECISIONES.md`, ni
`CLASIFICACION-DE-RUNS.md`, ni un solo byte de `aiw` o de `cantu-studio`.
