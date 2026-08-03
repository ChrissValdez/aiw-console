# Inserción del run del registro de campos en `queue_order` 47

**Fecha:** 2026-08-03
**Encargo:** insertar un run nuevo en `queue_order` 47, renumerar los nueve que quedan
detrás y añadir una arista del run de batches hacia el nuevo.
**Naturaleza:** edición del canónico y solo del canónico. Este encargo **no construye
nada**: no toca código, ni tests, ni la consola, ni `.project/`.
**Alcance de escritura:** dos archivos —
`projects/aiw-console/roadmap/roadmap.json` (el canónico) y este record.
Más un respaldo fuera del repo.

---

## 0. Respaldo del canónico, fuera del repo

Tomado **antes** de cualquier lectura de verificación y antes de cualquier escritura.

| Concepto | Valor |
|---|---|
| Ruta | `C:\Users\chris\Documents\AIW_Workspace\_backups\aiw-console\roadmap.json.2026-08-03.pre-registry-insert.bak` |
| Tamaño | **134 980 bytes** |
| md5 | `7c81ed4ff93f45d4bbc8f3969d273dbd` |

El respaldo está **fuera del repo**: el repositorio es
`AIW_Workspace/projects/aiw-console/`, y `_backups/` cuelga de la raíz del workspace,
un nivel por encima de `projects/`.

Comando que produjo las cifras:

```bash
cp projects/aiw-console/roadmap/roadmap.json _backups/aiw-console/roadmap.json.2026-08-03.pre-registry-insert.bak && wc -c < _backups/aiw-console/roadmap.json.2026-08-03.pre-registry-insert.bak && md5sum _backups/aiw-console/roadmap.json.2026-08-03.pre-registry-insert.bak && md5sum projects/aiw-console/roadmap/roadmap.json
```

En el momento del respaldo, respaldo y canónico compartían md5
(`7c81ed4ff93f45d4bbc8f3969d273dbd`): la copia es fiel, no una versión aproximada.
Al cierre del encargo el respaldo sigue en **134 980 bytes** y md5
`7c81ed4ff93f45d4bbc8f3969d273dbd` — no se le escribió encima.

---

## 1. Estado de partida verificado (no dado por bueno desde el ticket)

Todas las cifras salen de recorrer el canónico con el propio motor
(`tools/roadmap/roadmap-core.mjs`, `flattenRuns` + `checkInvariants`), no del enunciado.

| Magnitud | Ticket decía | **Medido en disco** | ¿Coincide? |
|---|---|---|---|
| Total de runs | 55 runs | **55 runs** | sí |
| `queue_order` denso y único | 1..55 | **1..55**, 55 valores únicos, 0 duplicados, 0 huecos, 0 no-enteros | sí |
| `active` | 0 runs | **0 runs** | sí |
| `completed` | 45 runs | **45 runs** | sí |
| `planned` | 10 runs | **10 runs** | sí |

- `run_id` únicos: **55 de 55**.
- Aristas `depends_on` totales: **29 aristas**; **0 colgantes**.
- `checkInvariants` del motor sobre el canónico de partida: **0 errores**.
- El canónico round-trip **byte-idéntico** con `serialize(obj, detectEol(raw))`:
  `true`. EOL del archivo: **CRLF**, indentación 2 espacios, sin BOM.
  Esto importa porque significa que un `parse → mutar → serialize` no introduce
  ni una sola diferencia de formato: **cualquier diferencia posterior es una edición
  intencionada y nada más**.

El total es 55, así que **no procedía la parada** del criterio 2.

### Corrección de una cifra del ticket, en la dirección segura

El ticket declara en el criterio 14 que **12 runs traen clasificación**. Medido:

- Runs con **algún** campo del bloque de clasificación: **13 runs**.
- Runs con `classified_at` (la marca que define «estar clasificado»): **12 runs**.

La diferencia es el run en `queue_order` 3
(`RUN-JAME-PROJECT-CONSOLE-ROADMAP-V3-PROTOTYPE-001`), que trae **solo `progress`**.
`progress` no es un campo de clasificación: no aparece en las
`CLASSIFICATION_VOCABULARIES` del motor y es un campo aparte. **La cifra del ticket
(12) es la correcta**; se deja anotado el 13 para que nadie lo redescubra como
sorpresa. Ningún run cambió de estado por esto.

---

## 2. Guarda de títulos exactos (criterio 3 y 4)

Se derivaron los diez runs implicados **por `queue_order`** y se comparó el `title`
con comparación de **igualdad exacta de cadena** (`===`), sin normalizar, sin
recortar espacios y sin parecidos.

**Resultado: 10 de 10 coinciden exactamente. 0 discrepancias.** No procedía el aborto
del criterio 4.

| `queue_order` (antes) | `run_id` | Título |
|---:|---|---|
| 46 | `RUN-CONSOLE-PROGRESS-NORMATIVE-001` | Freeze the shape of progress so human approval becomes machine-readable |
| 47 | `RUN-CONSOLE-BATCHES-001` | Batches in the roadmap schema, with the branch they determine |
| 48 | `RUN-CONSOLE-DIGEST-CABINA-001` | Digest for the cockpit |
| 49 | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | Global console renders Cantu (parity, operator QA) |
| 50 | `RUN-CONSOLE-UI-UX-001` | UI/UX of the global console |
| 51 | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` | Move cantu-studio's canonical roadmap out of .aiw before the cutover can delete it |
| 52 | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | Cutover: retirement of Cantu's local console and deletion of .aiw |
| 53 | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` | Repair the five texts that describe this repo falsely |
| 54 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | Expose the four container operations in the console frontend |
| 55 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | Deep visual audit of the console, led by the operator |

---

## 3. Destino derivado de disco, no tecleado (criterio 5)

El script de edición **no contiene ningún `objective_id` ni `phase_id` literal**.
Localiza el run cuyo `queue_order` es 46 y toma el objetivo y la fase que lo contienen.

El run ancla es `RUN-CONSOLE-PROGRESS-NORMATIVE-001`
(`roadmap/roadmap.json`, `queue_order` 46). Su contenedor:

| | Id (derivado) | **Título verbatim de disco** |
|---|---|---|
| Objetivo | `O4` | **«Global Console»** |
| Fase | `O4.P19` | **«Roadmap schema for the kernel»** |

Referencias en disco: `roadmap/roadmap.json:247` (`"objective_id": "O4"`) y
`roadmap/roadmap.json:864` (`"phase_id": "O4.P19"`).

**El run nuevo quedó en el objetivo «Global Console», fase «Roadmap schema for the
kernel»** — la misma fase del run 46, como pedía el criterio 5.

Se insertó en el **índice 2 de los 4** de `O4.P19.runs`, inmediatamente después del
ancla, de modo que el array de la fase sigue en orden de `queue_order` y no queda
desordenado respecto de la cola global.

---

## 4. El run nuevo, como quedó almacenado

`roadmap/roadmap.json:902`

| Campo | Valor |
|---|---|
| `run_id` | `RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001` |
| `queue_order` | 47 |
| `status` | `planned` |
| `depends_on` | `[]` (0 aristas) |
| `title` | 62 caracteres |
| `summary` | 191 caracteres |
| `full_description` | 2 280 caracteres |

- Claves almacenadas, en este orden:
  `run_id, queue_order, title, summary, full_description, status, depends_on`.
  Son **exactamente los 7 campos de `RUN_REQUIRED_FIELDS`**
  (`tools/roadmap/roadmap-core.mjs:71`) y en el mismo orden que
  `CANONICAL_RUN_KEY_ORDER` (`tools/roadmap/roadmap-core.mjs:144`).
- **0 campos de clasificación.** El run entra **sin clasificar, a propósito**
  (criterio 9). Verificado: `correctness_model`, `work_type`, `blast_radius`,
  `failure_surfaces`, `external_effects` y `classified_at` están **ausentes**, no
  puestos a vacío ni a `null`.
- `run_id` conforme al patrón asesor `RUN_ID_PATTERN`
  (`tools/roadmap/roadmap-core.mjs:150`): `true`.
- Los textos se insertaron **verbatim** desde el ticket. Verificado carácter a
  carácter: 6 rayas largas U+2014, 6 comillas rectas `"`, **0 comillas tipográficas**,
  y el único carácter no ASCII del `full_description` es la raya larga. El objeto
  almacenado es **idéntico** al payload del ticket (`JSON.stringify` comparado: `true`).

---

## 5. Tabla antes / después

Se muestra desde `queue_order` 45 (el primero **no** afectado, para que se vea el
límite del desplazamiento) hasta el final de la cola.

| Antes | Después | `run_id` | Título | `status` |
|---:|---:|---|---|---|
| 45 | 45 | `RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001` | A second dependency list for edges that wait on a person | completed |
| 46 | 46 | `RUN-CONSOLE-PROGRESS-NORMATIVE-001` | Freeze the shape of progress so human approval becomes machine-readable | planned |
| — | **47** | **`RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001`** | **One registry for the plumbing every optional run field repeats** | **planned** |
| 47 | 48 | `RUN-CONSOLE-BATCHES-001` | Batches in the roadmap schema, with the branch they determine | planned |
| 48 | 49 | `RUN-CONSOLE-DIGEST-CABINA-001` | Digest for the cockpit | planned |
| 49 | 50 | `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001` | Global console renders Cantu (parity, operator QA) | planned |
| 50 | 51 | `RUN-CONSOLE-UI-UX-001` | UI/UX of the global console | planned |
| 51 | 52 | `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001` | Move cantu-studio's canonical roadmap out of .aiw before the cutover can delete it | planned |
| 52 | 53 | `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001` | Cutover: retirement of Cantu's local console and deletion of .aiw | planned |
| 53 | 54 | `RUN-CONSOLE-STALE-TEXTS-REPAIR-001` | Repair the five texts that describe this repo falsely | planned |
| 54 | 55 | `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001` | Expose the four container operations in the console frontend | planned |
| 55 | 56 | `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001` | Deep visual audit of the console, led by the operator | planned |

Los runs 1..46 **no cambiaron de `queue_order`**: 0 modificaciones por debajo del 47.

### La arista añadida

`roadmap/roadmap.json:911` (`RUN-CONSOLE-BATCHES-001`), campo `depends_on`:

| | Contenido |
|---|---|
| Antes | `["RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001", "RUN-CONSOLE-PROGRESS-NORMATIVE-001"]` — 2 aristas |
| Después | `["RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001", "RUN-CONSOLE-PROGRESS-NORMATIVE-001", "RUN-CONSOLE-FIELD-PLUMBING-REGISTRY-001"]` — 3 aristas |

Las **dos aristas anteriores se conservan intactas y en su posición original**
(índices 0 y 1, verificado elemento a elemento); la nueva se **añade al final**.
La entrada nueva está en `roadmap/roadmap.json:920`.

La precedencia estricta que exige el motor se cumple: el nuevo run queda en
`queue_order` 47 y el de batches en 48, así que la arista apunta **hacia atrás**
(47 < 48), que es lo que `checkInvariants` reclama.

---

## 6. Conteos declarados y verificados (criterios 10 y 11)

Diferencia **campo a campo** del canónico resultante contra el respaldo, recorriendo
raíz, objetivos, fases y todos los campos de todos los runs.

| Concepto | Debía cambiar | **Medido** | ¿Coincide? |
|---|---:|---:|---|
| Runs creados | 1 run | **1 run** | sí |
| `queue_order` modificados | 9 runs | **9 runs** | sí |
| `depends_on` ampliados | 1 run | **1 run** | sí |
| Runs eliminados | 0 | **0** | sí |
| **Cualquier otra diferencia de campo** | 0 | **0** | sí |

- **Total de diferencias de campo sobre runs preexistentes: 10** — 9 de `queue_order`
  y 1 de `depends_on`. Ninguna más.
- Los 9 desplazamientos son **todos de exactamente +1**: verificado
  `destino == origen + 1` en los 9 casos.
- Diferencias estructurales/de raíz: **1**, y es la esperada — el recuento de runs de
  la fase `O4.P19` pasa de **3 a 4 runs**. `schema_version`, `roadmap_id`, `title` de
  raíz y `care_budget` **sin cambios**; el conjunto de claves de raíz, sin cambios;
  identidad y orden de los 2 objetivos y de las 23 fases, sin cambios; el recuento de
  runs de **las otras 22 fases**, sin cambios.
- Veredicto automático «todas las diferencias están justificadas por el run nuevo,
  los nueve desplazamientos y la arista añadida, y nada más»: **`true`**.

---

## 7. Estado resultante (criterio 12)

| Magnitud | Valor medido |
|---|---|
| Total de runs | **56 runs** |
| `queue_order` | **denso y único 1..56** (56 valores únicos, mín. 1, máx. 56, 0 huecos) |
| Aristas colgantes | **0** (comprobado sobre `depends_on` **y** `depends_on_human_approved`) |
| `checkInvariants` del motor | **0 errores** |
| EOL / round-trip | CRLF, y el archivo round-trip **byte-idéntico**: `true` |

Canónico resultante: **137 889 bytes**, md5 `0753d4e83d1b13667d65514c15e8149d`
(antes: 134 980 bytes, md5 `7c81ed4ff93f45d4bbc8f3969d273dbd`).

---

## 8. Lo que NO cambió (criterios 13 y 14)

Sobre los **55 runs preexistentes**, diferencias medidas campo por campo:

| Campo | Diferencias |
|---|---:|
| `run_id` | **0** |
| `title` | **0** |
| `summary` | **0** |
| `full_description` | **0** |
| `status` | **0** |
| `objective_id` (fase/objetivo contenedor) | **0** |
| `phase_id` (fase/objetivo contenedor) | **0** |

Ningún run cambió de fase ni de objetivo. Ningún `status` se tocó, así que el reparto
sigue siendo **0 `active`, 45 `completed`, 11 `planned`** (los 10 anteriores más el
nuevo, que entra `planned`).

**Clasificación (criterio 14):**

| Magnitud | Antes | Después |
|---|---:|---:|
| Runs con clasificación (`classified_at`) | 12 runs | **12 runs** |
| ¿Mismo conjunto de `run_id`? | — | **sí** |
| Diferencias en los 6 campos de clasificación | — | **0** |
| Diferencias en `classified_at` | — | **0** |
| Runs con `progress` | 1 run | **1 run** |

Los 12 runs que traían clasificación la siguen trayendo, **con los mismos valores y el
mismo `classified_at`**. No se escribió, borró ni modificó ni un solo campo de
clasificación, ni en runs viejos ni en el nuevo.

---

## 9. Suite de tests (criterio 15)

Ejecutada **antes** y **después** de la edición, con el mismo comando:

```bash
node --test
```

| | Antes | Después |
|---|---:|---:|
| Tests | 464 | **464** |
| Pasan | 462 | **462** |
| Fallan | 2 | **2** |

Los dos fallos son **exactamente los dos preexistentes nombrados en el encargo**, y ya
fallaban antes de tocar nada:

1. `tests/classification-care-budget.test.mjs:153` — «C.3: absent is VALID and is
   today's state…».
2. `tests/roadmap-engine.test.mjs:93` — «round-trip: the two real canonicals do NOT
   share a line-ending convention…».

**No apareció ningún tercer fallo.** No hubo, por tanto, que registrar ningún pin
deliberado, y no procedía la parada del criterio 15.

---

## 10. Una observación sobre el texto insertado, que NO se corrigió

El `full_description` se insertó **verbatim**, tal como lo fija el encargo. Se deja
constancia de una imprecisión interna de ese texto, **sin tocarla**, porque corregirla
no está autorizado por este ticket:

> «…the number comes from **the run immediately before the batches one**: adding
> `depends_on_human_approved` cost 17 SITES across 3 code files.»

La medición de **17 sitios en 3 archivos** pertenece al run
`RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001`, que está en **`queue_order` 45**, no en el
46. Evidencia: `context/aiw-console/records/ALTA-DEPENDS-ON-HUMAN-APPROVED.md:214`
(«**CÓDIGO: 17 sitios en 3 archivos de código distintos.**») y el commit `dcd22e7`
(«coste medido en 17 sitios sobre 3 archivos de codigo»). El run inmediatamente
anterior al de batches **antes** de esta edición era el 46
(`RUN-CONSOLE-PROGRESS-NORMATIVE-001`); **después** de esta edición, el run
inmediatamente anterior al de batches es **el propio run nuevo**, con lo que la frase
queda además autorreferencial.

Además, `ALTA-DEPENDS-ON-HUMAN-APPROVED.md:309` ya anticipaba la tesis de este run
(«10 de los 17 sitios son enumeración mecánica que un registro podría [absorber]»), lo
que respalda el «10 de esos 17 sitios» del texto insertado.

**No es un bloqueo:** la guarda que aborta (criterio 4) es sobre títulos, y los diez
títulos coincidieron exactamente. Se reporta para que el operador decida si quiere
ajustar la frase en un encargo posterior.

---

## 11. Lo que no se pudo verificar, y por qué

1. **Las afirmaciones de coste dentro del `full_description`** — «17 sitios», «10 de
   esos 17», «cuatro de los diecisiete pintan la pantalla», «tres ramas de
   `removeRun`», «cuatro enumeraciones en la fontanería de ops de la consola». **No se
   remidieron contra el código**: este encargo no construye nada y su alcance excluye
   tocar o auditar código. Se contrastó únicamente la cifra de cabecera (17 sitios / 3
   archivos) contra el record del run que la midió, citado arriba. El resto se acepta
   como texto de planificación, no como hecho verificado por este hilo.
2. **`.project/`** — no se reemitió ni se comprobó su equivalencia con el canónico. La
   reemisión la hace el operador desde la consola y está fuera de alcance, así que
   **`.project/` está ahora desactualizado respecto del canónico**: seguirá mostrando
   55 runs hasta que el operador reemita.
3. **Los canónicos de `aiw` y de `cantu-studio`** — no se leyeron ni se escribieron
   (fuera de alcance). Por eso `checkInvariants` se ejecutó **sin `externalRunIds`**;
   es correcto aquí porque este canónico tiene **0 aristas colgantes**, es decir,
   ninguna arista necesita el escape de proyecto externo para validar.
4. **La consola en ejecución** — no se levantó ni se comprobó visualmente el render de
   la cola renumerada. Fuera de alcance («no construye nada»).
5. **Git** — no se ejecutó ninguna operación de escritura de git (fuera de alcance).
   El árbol queda con `roadmap/roadmap.json` modificado y este record sin añadir, a la
   espera del operador. Se comprobó, solo en lectura
   (`git status --porcelain`), que **no había ningún record sin commitear de otro
   hilo** antes de escribir: la única entrada era `M roadmap/roadmap.json`, ya de esta
   edición.

---

## 12. Cómo reproducir la verificación

Sobre `projects/aiw-console/`:

```bash
node -e "import('file:///C:/Users/chris/Documents/AIW_Workspace/projects/aiw-console/tools/roadmap/roadmap-core.mjs').then(c=>{const o=c.parseRoadmap(c.loadRaw('roadmap/roadmap.json'));const r=c.flattenRuns(o).map(e=>e.run);console.log('runs',r.length,'| errores',c.checkInvariants(o).length);})"
```

Y para restaurar el estado previo, si alguna vez hiciera falta:

```bash
cp _backups/aiw-console/roadmap.json.2026-08-03.pre-registry-insert.bak projects/aiw-console/roadmap/roadmap.json
```

---

## 13. Resumen de una línea

Un run nuevo sin clasificar en `queue_order` 47 dentro de «Global Console» / «Roadmap
schema for the kernel», nueve `queue_order` desplazados +1 hasta el 56, una arista
añadida al run de batches conservando sus dos anteriores; **10 diferencias de campo en
total sobre runs preexistentes y ninguna más**, 56 runs densos 1..56, `checkInvariants`
en 0 errores y la suite en los mismos 2 fallos preexistentes de siempre.
