# Medición para el piloto de clasificación — aiw-console

**Proyecto:** aiw-console
**Fecha de la medición:** 2026-08-01
**Naturaleza:** medición en disco, de solo lectura. No clasifica ningún run, no propone
valores y no juzga los que la cabina ya adjudicó. Cuenta y reporta.
**Único archivo escrito:** este record.

---

## ⛔ PARADA — el encargo se detiene en el bloque A

El criterio A.3 obliga a parar si el número de runs con `status: "planned"` no coincide
con el que el ticket declara. **No coincide.**

| Cifra | Ticket declara | Disco (árbol de trabajo) | Disco (HEAD, commit `c81a9b4`) |
|---|---|---|---|
| Runs totales en el archivo | 55 runs | **55 runs** ✅ | 55 runs |
| Runs con `status: "planned"` | 12 runs | **11 runs** ❌ | **12 runs** |
| Runs con `status: "active"` | (no lo declara en A) | **1 run** | 0 runs |
| Runs con `status: "completed"` | (no lo declara) | **43 runs** | 43 runs |

Conforme a A.3 y a la regla general E.18, se entrega **solo el bloque A**, completo, con
la diferencia señalada; los bloques B y C **no se han medido**. El bloque D recoge la
forma de la entrega, el informe de opciones con su coste, la recomendación explícita, y
qué no se pudo medir.

### La causa está medida, y no es la que A.3 supone

A.3 razona que un desajuste «significa que otro hilo escribió o que se insertó un run».
**Medido: no se insertó ningún run y no se renumeró nada.** El árbol de trabajo difiere
de HEAD en exactamente **1 línea insertada y 1 línea borrada, en 1 archivo**:

```bash
git diff --stat -- roadmap/roadmap.json
```

> `roadmap/roadmap.json | 2 +-`
> `1 file changed, 1 insertion(+), 1 deletion(-)`

La única línea que cambia es [`roadmap/roadmap.json:783`](projects/aiw-console/roadmap/roadmap.json:783):

```
-              "status": "planned",
+              "status": "active",
```

pertenece al run `RUN-CONSOLE-CLASSIFICATION-PILOT-001`, `queue_order` **44**
([`roadmap/roadmap.json:778`](projects/aiw-console/roadmap/roadmap.json:778)).

Es decir: **el `#44` pasó de `planned` a `active` sin commitear.** Ni un `run_id`, ni un
`queue_order`, ni un `title`, ni un `depends_on` cambiaron respecto a HEAD.

**El ticket describe las dos caras de este mismo hecho y se contradice a sí mismo:**

- El criterio A.2 dice «55 runs con 12 `planned`» → es el estado **en HEAD**, y ahí es
  exacto: 12 `planned`, 0 `active`.
- La sección *Out of scope* dice «El `#44` está `active` y se queda `active`» → es el
  estado **del árbol de trabajo**, y ahí es exacto: 11 `planned`, 1 `active`.

Ambas cifras son correctas sobre el mismo archivo en dos momentos distintos. Lo que hay
es una inconsistencia interna del ticket, no una escritura de otro hilo.

**Runs vivos (no `completed`) = 12 runs = 11 `planned` + 1 `active`.** Si «12» en A.2 se
lee como «12 runs vivos», la premisa de la cabina está intacta. Esa lectura **no la tomo
yo**: es la decisión que E.18 me prohíbe tomar y que se eleva al operador en el bloque D.

---

## Bloque A — Identidad de los runs vivos

Fuente única: [`roadmap/roadmap.json`](projects/aiw-console/roadmap/roadmap.json), el
canónico. 850 líneas. `schema_version: "roadmap_tree_v1"`
([`roadmap/roadmap.json:2`](projects/aiw-console/roadmap/roadmap.json:2)).

### A.2 — Totales, desglose por status y densidad de `queue_order`

Conteos crudos sobre el archivo, con su unidad:

```bash
grep -c '"run_id":' roadmap/roadmap.json          # -> 55
grep -c '"queue_order":' roadmap/roadmap.json     # -> 55
grep -o '"status": "[a-z]*"' roadmap/roadmap.json | sort | uniq -c
```

| Magnitud | Cifra medida |
|---|---|
| Ocurrencias de la clave `"run_id"` en el archivo | **55 ocurrencias en 1 archivo** |
| Ocurrencias de la clave `"queue_order"` en el archivo | **55 ocurrencias en 1 archivo** |
| Runs recorridos por el árbol `objectives → phases → runs` | **55 runs** |
| Runs con `status: "completed"` | **43 runs** |
| Runs con `status: "planned"` | **11 runs** |
| Runs con `status: "active"` | **1 run** |
| Valores distintos de `status` en el archivo | **3 valores** (`completed`, `planned`, `active`) |
| Objetivos | **2 objetivos** (`O0`, `O4`) |
| Fases | **23 fases** (3 en `O0`, 20 en `O4`) |
| Aristas `depends_on` en todo el archivo | **29 aristas** |
| Aristas colgantes (destino inexistente) | **0 aristas** |

**`queue_order` es denso y único de 1..55.** Medido: 55 valores presentes, 55 valores
distintos, mínimo 1, máximo 55, **0 huecos** en el rango 1..55 y **0 duplicados**.

Los 55 runs se reparten en 2 objetivos y 23 fases; 6 de las 23 fases tienen 0 runs
(`O4.P5`, `O4.P8`, `O4.P7` entre ellas).

### A.1 — Los 11 runs con `status: "planned"`

Ordenados por `queue_order`. Los `title` van **VERBATIM**, tal como están en disco, en
inglés como el archivo los guarda.

---

**#45 — `RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001`**
[`roadmap/roadmap.json:813`](projects/aiw-console/roadmap/roadmap.json:813)
- `title`: `A second dependency list for edges that wait on a person`
- `objective_id`: `O4` — *Global Console*
- `phase_id`: `O4.P19` — *Roadmap schema for the kernel*
- `depends_on`: `[]` — **0 aristas**

**#46 — `RUN-CONSOLE-PROGRESS-NORMATIVE-001`**
[`roadmap/roadmap.json:822`](projects/aiw-console/roadmap/roadmap.json:822)
- `title`: `Freeze the shape of progress so human approval becomes machine-readable`
- `objective_id`: `O4` — *Global Console*
- `phase_id`: `O4.P19` — *Roadmap schema for the kernel*
- `depends_on`: `["RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001"]` — **1 arista** → `#45` (`planned`)

**#47 — `RUN-CONSOLE-BATCHES-001`**
[`roadmap/roadmap.json:833`](projects/aiw-console/roadmap/roadmap.json:833)
- `title`: `Batches in the roadmap schema, with the branch they determine`
- `objective_id`: `O4` — *Global Console*
- `phase_id`: `O4.P19` — *Roadmap schema for the kernel*
- `depends_on`: `["RUN-CONSOLE-DEPENDS-ON-HUMAN-APPROVED-001", "RUN-CONSOLE-PROGRESS-NORMATIVE-001"]` — **2 aristas** → `#45` (`planned`), `#46` (`planned`)

**#48 — `RUN-CONSOLE-DIGEST-CABINA-001`**
[`roadmap/roadmap.json:789`](projects/aiw-console/roadmap/roadmap.json:789)
- `title`: `Digest for the cockpit`
- `objective_id`: `O4` — *Global Console*
- `phase_id`: `O4.P18` — *Cockpit: classification, digest, and the truth of the texts*
- `depends_on`: `[]` — **0 aristas**

**#49 — `RUN-CONSOLE-PARIDAD-RENDER-CANTU-001`**
[`roadmap/roadmap.json:704`](projects/aiw-console/roadmap/roadmap.json:704)
- `title`: `Global console renders Cantu (parity, operator QA)`
- `objective_id`: `O4` — *Global Console*
- `phase_id`: `O4.P16` — *The cutover to a single console*
- `depends_on`: `["RUN-CANTU-PROJECT-CONSOLE-LATENT-DEFECTS-001"]` — **1 arista** → `#41` (`completed`)

**#50 — `RUN-CONSOLE-UI-UX-001`**
[`roadmap/roadmap.json:715`](projects/aiw-console/roadmap/roadmap.json:715)
- `title`: `UI/UX of the global console`
- `objective_id`: `O4` — *Global Console*
- `phase_id`: `O4.P16` — *The cutover to a single console*
- `depends_on`: `["RUN-CONSOLE-PARIDAD-RENDER-CANTU-001"]` — **1 arista** → `#49` (`planned`)

**#51 — `RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001`**
[`roadmap/roadmap.json:726`](projects/aiw-console/roadmap/roadmap.json:726)
- `title`: `Move cantu-studio's canonical roadmap out of .aiw before the cutover can delete it`
- `objective_id`: `O4` — *Global Console*
- `phase_id`: `O4.P16` — *The cutover to a single console*
- `depends_on`: `[]` — **0 aristas**

**#52 — `RUN-CONSOLE-CORTE-RETIRO-LOCAL-001`**
[`roadmap/roadmap.json:735`](projects/aiw-console/roadmap/roadmap.json:735)
- `title`: `Cutover: retirement of Cantu's local console and deletion of .aiw`
- `objective_id`: `O4` — *Global Console*
- `phase_id`: `O4.P16` — *The cutover to a single console*
- `depends_on`: `["RUN-CONSOLE-PARIDAD-RENDER-CANTU-001", "RUN-CONSOLE-UI-UX-001", "RUN-CONSOLE-CANTU-CANONICAL-OUT-OF-AIW-001"]` — **3 aristas** → `#49`, `#50`, `#51` (los tres `planned`)

**#53 — `RUN-CONSOLE-STALE-TEXTS-REPAIR-001`**
[`roadmap/roadmap.json:798`](projects/aiw-console/roadmap/roadmap.json:798)
- `title`: `Repair the five texts that describe this repo falsely`
- `objective_id`: `O4` — *Global Console*
- `phase_id`: `O4.P18` — *Cockpit: classification, digest, and the truth of the texts*
- `depends_on`: `[]` — **0 aristas**

**#54 — `RUN-CANTU-ROADMAP-PHASE-OBJECTIVE-OPS-001`**
[`roadmap/roadmap.json:754`](projects/aiw-console/roadmap/roadmap.json:754)
- `title`: `Expose the four container operations in the console frontend`
- `objective_id`: `O4` — *Global Console*
- `phase_id`: `O4.P17` — *The console as a product*
- `depends_on`: `[]` — **0 aristas**

**#55 — `RUN-CANTU-PROJECT-CONSOLE-DEEP-AUDIT-001`**
[`roadmap/roadmap.json:763`](projects/aiw-console/roadmap/roadmap.json:763)
- `title`: `Deep visual audit of the console, led by the operator`
- `objective_id`: `O4` — *Global Console*
- `phase_id`: `O4.P17` — *The console as a product*
- `depends_on`: `[]` — **0 aristas**

---

### El run `active`, listado aparte porque no es `planned`

**#44 — `RUN-CONSOLE-CLASSIFICATION-PILOT-001`** — `status: "active"`
[`roadmap/roadmap.json:778`](projects/aiw-console/roadmap/roadmap.json:778), status en
[`:783`](projects/aiw-console/roadmap/roadmap.json:783)
- `title`: `Classify aiw-console's live runs as the pilot, and rule on the procedure itself`
- `objective_id`: `O4` — *Global Console*
- `phase_id`: `O4.P18` — *Cockpit: classification, digest, and the truth of the texts*
- `depends_on`: `["RUN-CONSOLE-RUN-CLASSIFICATION-FIELDS-001"]` — **1 arista** → `#43` (`completed`)

Se lista porque es el run que produce la diferencia de A.3 y porque es el propio piloto.
No se toca: sigue `active`.

### Forma del conjunto vivo

- **12 runs vivos** en total, en `queue_order` **44..55**, contiguos: los vivos ocupan la
  cola por el final, sin intercalarse con `completed`.
- Los 12 vivos se reparten en **4 fases**: `O4.P16` (4 runs), `O4.P17` (2 runs),
  `O4.P18` (3 runs), `O4.P19` (3 runs). **Los 12 pertenecen al objetivo `O4`. `O0` no
  tiene ningún run vivo** — es historia, con sus `completed` intactos.
- **9 aristas** salen de runs vivos, **0 colgantes**. De esas 9, **2 aristas** apuntan a
  runs `completed` (`#43`, `#41`) y **7 aristas** apuntan a runs vivos.
- **6 de los 12 runs vivos no declaran ninguna arista**: `#45`, `#48`, `#51`, `#53`,
  `#54`, `#55`.
- **Claves presentes en los runs vivos**, unión medida: `run_id`, `queue_order`, `title`,
  `summary`, `full_description`, `status`, `depends_on` — **7 claves**. Los 12 vivos
  tienen las mismas 7. (En todo el archivo, la unión sobre los 55 runs son **9 claves**:
  las 7 anteriores más `closeout_result` y `progress`, que solo aparecen en `completed`.)

### Observación de disco, sin juicio

El mensaje del commit `c81a9b4` dice que los tres runs nuevos entran «encadenados detras
del piloto». En disco, **`#45` declara `depends_on: []`**: no hay arista de `#45` al
piloto `#44` ni a ningún otro run. `#46` y `#47` sí cuelgan de `#45`. Se reporta el hecho;
no se propone cambiarlo, y no es de este encargo.

---

## Bloque B — Coste de un campo opcional de punta a punta

**NO MEDIDO.** La parada del criterio A.3 se disparó antes de abordarlo, y A.3 ordena
entregar en su lugar solo el bloque A.

Quedan sin medir, íntegros, los criterios 4 a 8: el inventario de archivos y sitios de
los dos precedentes en disco (los carriles `lane` y los campos de clasificación), la
separación entre código y tests, la respuesta a si existe una pieza compartida o cada
campo se cablea a mano, y los consumidores de las dos superficies de contraste (el
renderer de la consola y el módulo de derivación).

No se ha ejecutado ninguna búsqueda de inventario para el bloque B. No hay cifras
parciales que reportar, ni aproximadas.

---

## Bloque C — Estado de clasificación y ruta de escritura

**NO MEDIDO.** Misma causa. Quedan sin medir los criterios 9 a 13: la confirmación contra
el código —motor, validador y emisor— de qué nombres de campo se aceptan y con qué
grafía, qué tokens admite cada uno, el contraste contra el vocabulario que publica
`context/CLASIFICACION-DE-RUNS.md`, y la identificación de la ruta de escritura desde la
consola (nombre de la operación, campos que pide, flujo dry-run → confirm, y si escribe
`classified_at` por su cuenta).

### Un solo sondeo, declarado como tal

Se ejecutó **un** conteo, y solo porque decide si la premisa del piloto sigue en pie y por
tanto condiciona la recomendación del bloque D. **No sustituye al criterio 9**, que exige
además el contraste contra el código (criterio 10) que aquí no se ha hecho.

```bash
for f in correctness_model work_type blast_radius failure_surfaces external_effects classified_at; do
  grep -c "\"$f\"" roadmap/roadmap.json
done
```

| Nombre de campo (grafía exacta del ticket) | Ocurrencias de la clave en `roadmap/roadmap.json` |
|---|---|
| `correctness_model` | **0 ocurrencias en 1 archivo** |
| `work_type` | **0 ocurrencias en 1 archivo** |
| `blast_radius` | **0 ocurrencias en 1 archivo** |
| `failure_surfaces` | **0 ocurrencias en 1 archivo** |
| `external_effects` | **0 ocurrencias en 1 archivo** |
| `classified_at` | **0 ocurrencias en 1 archivo** |

**Los seis dan cero.** La premisa del piloto —que ningún run vivo trae clasificación
escrita— se sostiene sobre el canónico. La condición de parada del criterio 12 **no** se
dispara.

Advertencia sobre el alcance de este sondeo: cuenta ocurrencias del literal de la clave en
el canónico, nada más. **No** dice qué nombres acepta el código, **no** valida la grafía
contra el motor ni el validador, y **no** descarta que el código use otros nombres para los
mismos conceptos. Eso es exactamente el criterio 10, y está sin hacer.

---

## Bloque D — Forma de la entrega, opciones y recomendación

### D.15 — Unidades

Toda cifra de este record viaja con su unidad y su alcance: «N ocurrencias de la clave X en
M archivos», «N runs», «N aristas», «N líneas insertadas / N borradas en M archivos».
Ninguna cifra de este record es aproximada: todas se reproducen con los comandos citados.

### D.16 — Trazabilidad

Comandos que produjeron las cifras, todos de solo lectura, todos desde
`projects/aiw-console/`:

```bash
grep -c '"run_id":' roadmap/roadmap.json
```

```bash
grep -o '"status": "[a-z]*"' roadmap/roadmap.json | sort | uniq -c
```

```bash
git show HEAD:roadmap/roadmap.json | grep -o '"status": "[a-z]*"' | sort | uniq -c
```

```bash
git diff --stat -- roadmap/roadmap.json
```

El recorrido del árbol `objectives → phases → runs` (totales, densidad de `queue_order`,
resolución de `depends_on`, unión de claves) se hizo con `node -e` leyendo y parseando
`roadmap/roadmap.json`; todas sus cifras son reproducibles con los `grep` de arriba o
releyendo el archivo. Los números de línea salen de localizar cada literal `"run_id"` en
el archivo tal como está en disco.

### D.17 — Qué NO se pudo medir, y por qué

1. **El bloque B entero (criterios 4–8).** Causa: parada de A.3. No es una limitación
   técnica; es la regla del ticket. Coste estimado para completarlo, si se autoriza:
   búsquedas por nombre de campo sobre todo el árbol excluidos `.git` y `node_modules`,
   más la lectura de los dos módulos de contraste.
2. **El bloque C entero salvo el sondeo declarado (criterios 9–13).** Misma causa.
3. **La grafía y los tokens que el código acepta realmente (criterio 10).** No se abrió
   ni motor, ni validador, ni emisor. El cero de los seis campos en el canónico **no**
   autoriza a concluir que esos seis nombres son los correctos.
4. **La ruta de escritura desde la consola (criterio 13).** Sin abrir.
5. **La exclusión del fork descartado de la consola (D-035).** El árbol contiene tanto
   `console/` como `project-console/`. No se ha determinado cuál es la consola viva y
   cuál el fork descartado, porque esa distinción solo hacía falta para B y C. Queda
   declarado como pendiente para cuando se reanude.
6. **Los canónicos de `aiw` y `cantu-studio`.** Fuera de alcance por ticket. No leídos.
7. **La suite de tests.** Fuera de alcance por ticket. No ejecutada. Los dos rojos
   preexistentes no se tocaron ni se comprobaron.

### Informe de opciones (E.18)

La decisión que el ticket no me autoriza a tomar: **si «12 `planned`» en A.2 debe leerse
como «12 runs vivos», y por tanto la medición puede reanudarse sobre las coordenadas
actuales.**

**Opción 1 — Reanudar tal cual, releyendo A.2 como «12 runs vivos».**
Coste medido: **0 escrituras** en el canónico. Se reanuda en B y C sobre las coordenadas
de este bloque A. Riesgo medido: el `#44` está `active` sin commitear; si otro hilo
commitea o revierte ese archivo mientras corre la medición, las coordenadas cambian. Hoy
la diferencia con HEAD es de **1 línea en 1 archivo**, y es la que el propio ticket
declara esperada.

**Opción 2 — Corregir el ticket a «55 runs, 12 vivos = 11 `planned` + 1 `active`» y
reemitir el encargo.**
Coste medido: **0 escrituras** en el canónico; **1 edición** en el texto del ticket, fuera
de este repo. Elimina la contradicción interna entre A.2 y *Out of scope*, y deja el
criterio A.3 utilizable como guarda real en futuras reediciones. Es la más lenta por una
vuelta de operador.

**Opción 3 — Commitear el `#44` a `active` antes de medir, para que HEAD y árbol de
trabajo coincidan.**
Coste medido: **1 commit**. **Esta opción está fuera de alcance de este encargo** —«Git en
cualquier forma que escriba» está prohibido— y solo se lista para que el operador la vea.
No la ejecuto.

**Recomendación explícita:** **Opción 2**, y si el operador prefiere no pagar la vuelta,
**Opción 1**. Las coordenadas de la cabina **no** están caducadas: está medido que no se
insertó ningún run, no se renumeró la cola —sigue densa y única 1..55—, y ningún `run_id`,
`title` ni `depends_on` difiere de HEAD. La única diferencia es el `status` del `#44`, que
el propio ticket declara esperada. La causa del desajuste es una inconsistencia de
redacción del ticket, no una escritura ajena. La recomendación es reanudar; **la decisión
es del operador y no la tomo aquí.**

Para reanudar basta con autorizar los bloques B y C sobre este mismo bloque A: los 11
`planned` de la lista de arriba, más el `#44` `active`, son las coordenadas vivas.

---

## Cumplimiento del alcance

- **Escrito:** este único archivo,
  `context/aiw-console/records/MEDICION-PILOTO-CLASIFICACION-AIW-CONSOLE.md`.
- **No escrito:** `roadmap/roadmap.json` (ni un byte), `.project/`, código, tests,
  validador. No se cambió el status de ningún run. No se ejecutó ningún comando de git que
  escriba —solo `git log`, `git status`, `git diff` y `git show`, los cuatro de lectura—.
  No se corrió la suite. No se clasificó ningún run, no se propuso ningún valor y no se
  opinó sobre los que la cabina adjudicó. No se insertó, movió ni renumeró ningún run. No
  se leyó ni escribió en `aiw` ni en `cantu-studio`.

---
---

# SEGUNDA ENTREGA — bloques B y C

**Fecha:** 2026-08-01. **Premisa corregida y aceptada:** 55 runs = 43 `completed` + 11
`planned` + 1 `active`; los **12 runs vivos** son los 11 `planned` más el `#44`, que está
`active` a propósito y se queda `active`.

**Esta segunda entrega SUSTITUYE** a los dos apartados «Bloque B — NO MEDIDO» y «Bloque C
— NO MEDIDO» de la primera entrega, que quedaron escritos cuando la parada de A.3 estaba
activa. El **bloque A no se ha tocado ni reescrito**: sigue tal cual se entregó.

## Guarda de identidad previa (E.15) — **VERDE**

Antes de medir nada se comprobaron los doce runs vivos contra la lista del bloque A:
`run_id`, `title` y `depends_on`, uno a uno.

- **12 runs vivos** encontrados (12 esperados).
- **0 diferencias** en `run_id`, **0** en `title`, **0** en `depends_on`, **0** en `queue_order`.
- Status hoy: `{"completed":43,"planned":11,"active":1}`, total 55 runs — idéntico al bloque A.

La guarda no se dispara. Ningún otro hilo escribió entre las dos entregas.

## Exclusiones aplicadas, y lo que costaron

| Árbol | Qué es | Decisión | Efecto medido sobre las cifras |
|---|---|---|---|
| `docs/project-console/` | **El fork descartado por `D-035`** (`console/README.md:61`, `console/README.md:80`) | **EXCLUIDO** de todo el inventario | **0 ocurrencias** de los seis campos y **0 ocurrencias** de `lane` en todo el árbol. Excluirlo **no cambia ninguna cifra de este bloque** |
| `console/` | El **prototipo retirado** de `O4.P10` (fase «RETIRED by D-048 — history»), no un fork | Medido y reportado aparte | **0 ocurrencias** de los seis campos y **0** de `lane`. No participa en ninguno de los dos precedentes |
| `project-console/` | **La consola VIVA**: `start-console.ps1:33` arranca `project-console\serve.mjs`, puerto 8788 (`start-console.ps1:29`) | **INCLUIDO** | Es la superficie que se cuenta en B.5(a) |

---

## Bloque B — Coste real de que un campo opcional de run viaje de punta a punta

### Método y unidades, declarados antes de las cifras

- **ocurrencia** = cada coincidencia individual del patrón.
- **sitio** = línea distinta que contiene al menos una ocurrencia. Una línea con tres
  ocurrencias es **1 sitio y 3 ocurrencias**.
- Se separan **sitios en línea de comentario** (la línea empieza por `//`, `*` o `/*`) de
  **sitios no-comentario**. Estos archivos comentan muchísimo y mezclar ambas cosas
  inflaría el coste: en `tools/projector/project.mjs`, 11 de los 12 sitios de `lane` son
  comentario.
- El inventario **no parte de las rutas de `D-059`**: se construyó recorriendo todo el
  árbol desde la raíz del proyecto, excluidos `.git` y `node_modules`, con el script
  `inv.mjs` (recorrido recursivo + `String.match` por línea). Las rutas que `D-059` cita
  se usaron solo como punto de entrada de lectura.

### B.1 / B.3 — Precedente 1: los campos de clasificación

Patrón: los seis nombres de campo, más los seis símbolos compartidos que los transportan
(`CLASSIFICATION_STORED_FIELDS`, `CLASSIFICATION_VOCABULARIES`, `CORRECTNESS_MODELS`,
`WORK_TYPES`, `BLAST_RADII`, `FAILURE_SURFACES`), más `setClassification` /
`set-classification`.

**CÓDIGO — 6 archivos distintos | 166 sitios (139 no-comentario / 27 comentario) | 214 ocurrencias**

| Ruta | Sitios | No-com. | Coment. | Ocurrencias |
|---|---|---|---|---|
| `tools/classification/classification.mjs` | 56 | 45 | 11 | 72 |
| `tools/roadmap/roadmap-core.mjs` | 54 | 47 | 7 | 60 |
| `project-console/assets/project-console.js` | 47 | 40 | 7 | 73 |
| `tools/roadmap/roadmap-plan.mjs` | 6 | 4 | 2 | 6 |
| `project-console/assets/project-shell.js` | 2 | 2 | 0 | 2 |
| `tools/projector/project.mjs` | 1 | 1 | 0 | 1 |

**TESTS — 5 archivos de test | 270 sitios | 394 ocurrencias**

| Ruta | Sitios | Ocurrencias |
|---|---|---|
| `tests/classification-derivation.test.mjs` | 115 | 197 |
| `tests/classification-transport-and-console.test.mjs` | 80 | 106 |
| `tests/roadmap-classification.test.mjs` | 61 | 76 |
| `tests/classification-care-budget.test.mjs` | 11 | 12 |
| `tests/roadmap-engine.test.mjs` | 3 | 3 |

**FIXTURES bajo `tests/` — 3 archivos | 9 sitios | 39 ocurrencias**:
`tests/fixtures/neighbours/aiw-console/{.project/roadmap.json, .project/snapshot.json, canonical/roadmap.json}`,
3 sitios y 13 ocurrencias cada uno.

**DATOS emitidos y canónico — 4 archivos | 36 sitios | 69 ocurrencias**:
`.project/snapshot.json` (28 sitios / 40 occ), `.project/roadmap.json` (3 / 13),
`roadmap/roadmap.json` (3 / 13), `.project/git_history.json` (2 / 3).
**Las 13 ocurrencias del canónico son PROSA dentro de `full_description`** (líneas 647, 674
y 782): **0 son clave JSON**. Ver bloque C.

### B.1 / B.3 — Precedente 2: los carriles (`lane`)

Los carriles y las barreras llegaron juntos en `D-051`, así que se miden **por separado y
también sumados**, y se dice cuál es cuál.

**Solo `lane` — CÓDIGO: 8 archivos | 333 sitios (182 no-comentario) | 547 ocurrencias**

| Ruta | Sitios | No-com. | Ocurrencias |
|---|---|---|---|
| `tools/roadmap/roadmap-core.mjs` | 153 | 88 | 261 |
| `project-console/assets/project-console.js` | 131 | 66 | 217 |
| `project-console/assets/project-console.css` | 16 | 14 | 20 |
| `tools/roadmap/roadmap-plan.mjs` | 16 | 6 | 25 |
| `tools/projector/project.mjs` | 8 | 1 | 12 |
| `project-console/index.html` | 6 | 6 | 9 |
| `project-console/serve.mjs` | 2 | 0 | 2 |
| `project-console/README.md` | 1 | 1 | 1 |

**Solo `lane` — TESTS: 25 archivos | 573 sitios | 816 ocurrencias**, de los cuales
**9 archivos de test/helper** suman **344 sitios** (`tests/roadmap-barrier-control.test.mjs`
117, `tests/roadmap-lanes.test.mjs` 117, `tests/roadmap-lane-numbering.test.mjs` 74, y seis
más con 11 o menos) y **16 archivos de fixture** suman **229 sitios**.

**Solo `barrier` — CÓDIGO: 5 archivos | 152 sitios (85 no-comentario) | 208 ocurrencias**
(`project-console.js` 81, `roadmap-core.mjs` 43, `project-console.css` 12,
`roadmap-plan.mjs` 9, `project.mjs` 7). **TESTS: 21 archivos | 213 sitios | 271 ocurrencias.**

**`lane` + `barrier` juntos, que es el precedente `D-051` entero — CÓDIGO: 8 archivos |
430 sitios (241 no-comentario / 189 comentario) | 739 ocurrencias. TESTS: 31 archivos |
699 sitios | 1053 ocurrencias.**

**Hallazgo sobre el canónico de este proyecto:** `roadmap/roadmap.json` tiene **0 claves
JSON** `"lane"`, `"lanes"` o `"barrier"` — medido con
`grep -c '"lane"[[:space:]]*:\|"lanes"[[:space:]]*:\|"barrier"[[:space:]]*:'` → `0`. Sus
20 sitios / 64 ocurrencias de `lane` son **prosa** dentro de `full_description`. El propio
texto del run que migró Cantu lo dice en `roadmap/roadmap.json:512`: «THIS ROADMAP WAS NOT
MIGRATED … aiw-console declares no lanes and assigns none». **El precedente de los carriles
se pagó entero en código y tests, y este proyecto no guarda ni un solo dato de carril.**

### B.4 — ¿Pieza compartida, o cableado a mano en cada capa?

**12 sitios en 4 archivos de código es lo que cuesta dar de alta un séptimo campo
almacenado: SÍ existe una pieza compartida —`tools/classification/classification.mjs`, 446
líneas, importada por 3 archivos de Node y servida por HTTP al navegador— pero por ella
pasan el VOCABULARIO y la DERIVACIÓN, no el campo, así que cada campo nuevo se sigue
enumerando a mano en cada capa.**

Los 12 sitios que enumeran literalmente el conjunto de campos, medidos uno a uno:

| # | `archivo:línea` | Qué enumera |
|---|---|---|
| 1 | `tools/classification/classification.mjs:39-42` | Las cuatro constantes de vocabulario |
| 2 | `tools/classification/classification.mjs:46-51` | `CLASSIFICATION_VOCABULARIES` |
| 3 | `tools/classification/classification.mjs:55-62` | `CLASSIFICATION_STORED_FIELDS`, los seis |
| 4 | `tools/classification/classification.mjs:288-300` | Las `vocabularies` del sobre transportado |
| 5 | `tools/roadmap/roadmap-core.mjs:90-101` | `RUN_OPTIONAL_FIELDS` |
| 6 | `tools/roadmap/roadmap-core.mjs:1234-1239` | `fieldByOption`, el mapa opción → campo |
| 7 | `tools/roadmap/roadmap-plan.mjs:113-120` | El relevo de los cinco argumentos |
| 8 | `project-console/assets/project-console.js:103-106` | Lista de reserva de los seis |
| 9 | `project-console/assets/project-console.js:4534-4541` | Mapa campo → etiqueta visible |
| 10 | `project-console/assets/project-console.js:5839-5844` | Descriptores de los cuatro `<select>` |
| 11 | `project-console/assets/project-console.js:6351-6352` | Lista + mapa camelCase del comparador |
| 12 | `project-console/assets/project-console.js:6659` | Mapa camelCase del diff de la previa |

Un campo con **forma propia** en vez de vocabulario cerrado —como `external_effects`—
cuesta **2 sitios más**: su rama en `checkInvariants`
(`tools/roadmap/roadmap-core.mjs:479-484`) y su rama en la operación de escritura
(`tools/roadmap/roadmap-core.mjs:1259-1273`).

**Lo que la pieza compartida SÍ ahorra, medido:** un campo de vocabulario cerrado cuesta
**0 sitios adicionales** en la validación, porque `checkInvariants` recorre la tabla en
bucle (`tools/roadmap/roadmap-core.mjs:471`) en vez de repetirse cuatro veces; y cuesta
**0 sitios** de derivación duplicada, porque emisor y consola ejecutan el mismo archivo.
El propio módulo declara por qué existe y dónde vive
(`tools/classification/classification.mjs:8-27`), y el motor documenta que los
vocabularios **se declararon primero en él y se mudaron fuera** cuando apareció un segundo
runtime (`tools/roadmap/roadmap-core.mjs:103-111`): **la pieza compartida es posterior al
campo, no previa.**

**El precedente de los carriles no tiene pieza compartida ninguna.** No hay
`lane.mjs`: el carril se cablea a mano en motor, plan, renderer, CSS y HTML — los 8
archivos de código de la tabla de arriba.

### B.5(a) — El renderer de la consola

**La consola viva la componen 7 archivos, 15 628 líneas en total**, todos bajo
`project-console/`:

| Ruta | Líneas | Papel |
|---|---|---|
| `project-console/assets/project-console.js` | 7 029 | El renderer |
| `project-console/assets/project-console.css` | 6 676 | Los estilos |
| `project-console/serve.mjs` | 981 | El servidor y las rutas de escritura |
| `project-console/assets/project-shell.js` | 539 | El shell multiproyecto |
| `project-console/index.html` | 265 | El documento |
| `project-console/README.md` | 129 | Documentación |
| `project-console/projects.json` | 9 | El registro de proyectos |

**El renderer propiamente dicho son 4 archivos y 14 509 líneas** (js + css + shell + html).

**¿Una reparación ahí se propaga fuera de `project-console/`? SÍ, y se propaga a 21
archivos medidos**, por dos vías distintas:

1. **20 archivos bajo `tests/` leen el FUENTE de la consola viva por ruta** y afirman
   sobre su contenido — `tests/classification-care-budget.test.mjs:35` y
   `tests/classification-transport-and-console.test.mjs:34` son dos ejemplos con su línea.
   Comando: `grep -rln '"project-console", "assets"\|project-console/assets\|join(REPO_ROOT, "project-console"' tests/*.mjs tests/helpers/*.mjs` → **20 archivos**.
2. **1 espejo declarado en el emisor**: `tools/projector/project.mjs:456` reimplementa
   `v3QueueGroupKey` de la consola. El propio comentario dice que el espejo **ya se
   desincronizó una vez** («It had lost the `needs_human_decision` branch and the barrier
   branch») y que lo que lo sostiene es un test,
   `tests/console-queue-keyspace.test.mjs`, que hace pasar la misma tabla por las dos
   funciones exigiendo la misma respuesta.

**Lo que NO constriñe a la consola viva, y conviene no confundir:**
`tools/project-console/validate-project-console-state.mjs` (3 087 líneas) afirma sobre
anclas de `project-console.js`, pero lee **`docs/project-console/assets/project-console.js`**
—el fork `D-035`— en sus líneas `192` y `193`. **Valida el fork, no la consola viva**, y
tiene **0 ocurrencias** de los seis campos de clasificación. Lo mismo
`tools/project-console/serve-project-console.mjs:67`, que apunta al fork.

### B.5(b) — El módulo de derivación de clasificación

`tools/classification/classification.mjs`, 446 líneas. **Lo cargan 7 consumidores
distintos por 3 vías distintas:**

| Vía | Consumidor | `archivo:línea` |
|---|---|---|
| `import` (Node) | El motor | `tools/roadmap/roadmap-core.mjs:41` |
| `import` (Node) | El emisor | `tools/projector/project.mjs:61` |
| `import` (navegador) | El shell de la consola | `project-console/assets/project-shell.js:30` |
| `import` (Node) | Test de derivación | `tests/classification-derivation.test.mjs:28` |
| `import` (Node) | Test de transporte y consola | `tests/classification-transport-and-console.test.mjs:28` |
| `import` (Node) | Test de care budget | `tests/classification-care-budget.test.mjs:30` |
| **`fetch` HTTP** | El navegador, por `project-console/serve.mjs`, que sirve la raíz del repositorio | verificado por `tests/classification-transport-and-console.test.mjs:77-82`, que compara byte a byte lo servido contra el archivo en disco |

El renderer **no lo importa**: lo recibe inyectado desde el shell
(`project-console/assets/project-shell.js:532-533` llama a `setClassificationModel`, definido
en `project-console/assets/project-console.js:96`). Esa dirección está documentada en
`project-console/assets/project-console.js:82-87`.

---

## Bloque C — Estado de clasificación y ruta de escritura

### C.6 — Cuántos runs traen cada campo, sobre el canónico

Se midió de **tres formas** para no depender de una sola, porque el sondeo del bloque A
buscaba la clave entrecomillada y podía ocultar prosa.

```bash
for f in correctness_model work_type blast_radius failure_surfaces external_effects classified_at; do
  echo "$f clave: $(grep -c "\"$f\"[[:space:]]*:" roadmap/roadmap.json) | literal: $(grep -o "$f" roadmap/roadmap.json | wc -l)"
done
```

| Campo | Runs que lo traen | Ocurrencias como **clave JSON** | Ocurrencias del **literal** (clave + prosa) |
|---|---|---|---|
| `correctness_model` | **0 runs de 55** | 0 | 2 |
| `work_type` | **0 runs de 55** | 0 | 2 |
| `blast_radius` | **0 runs de 55** | 0 | 3 |
| `failure_surfaces` | **0 runs de 55** | 0 | 2 |
| `external_effects` | **0 runs de 55** | 0 | 2 |
| `classified_at` | **0 runs de 55** | 0 | 2 |

Las **13 ocurrencias del literal** están en `full_description` de tres runs:
`roadmap/roadmap.json:647` (el `#42`), `:674` (el `#43`) y `:782` (el `#44`, el piloto).
Son texto que describe el modelo, no datos clasificados.

**Tercera medición, por un camino de código completamente distinto:** el emisor ya publica
el informe en `.project/snapshot.json`, bajo `validation_summary.reports[0]`:

- `"report": "unclassified_live_runs"`, `"kind": "information"`
- **`"total": 12`**, y la lista trae **12 entradas**
- `queue_order` de esas entradas: **44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55**
- **runs con algún `stored_fields` no vacío: 0 de 12**

Las tres mediciones concuerdan: **cero campos de clasificación escritos, y los doce runs
vivos son exactamente los del bloque A.**

### C.7 — Qué nombres y qué tokens acepta el código

**Motor** (`tools/roadmap/roadmap-core.mjs`), **emisor** (`tools/projector/project.mjs`) y
**módulo compartido** (`tools/classification/classification.mjs`).

| Campo, grafía real | Declarado en | Aceptado por el motor en | Tokens que admite | Tokens en `context/CLASIFICACION-DE-RUNS.md` |
|---|---|---|---|---|
| `correctness_model` | `classification.mjs:56`, `roadmap-core.mjs:93` | `roadmap-core.mjs:471` (bucle sobre el vocabulario) | `SPECIFIED`, `JUDGED_ACCEPTS`, `JUDGED_DEFINES` — `classification.mjs:39` | `:33` — **idénticos y en el mismo orden** |
| `work_type` | `classification.mjs:57`, `roadmap-core.mjs:94` | `roadmap-core.mjs:471` | `COSMETIC`, `FUNCTIONAL`, `FOUNDATIONAL` — `classification.mjs:40` | `:34` — **idénticos** |
| `blast_radius` | `classification.mjs:58`, `roadmap-core.mjs:95` | `roadmap-core.mjs:471` | `LOCAL`, `ADJACENT`, `SYSTEMIC`, `PROJECT_SHAPE` — `classification.mjs:41` | `:35` — **idénticos** |
| `failure_surfaces` | `classification.mjs:59`, `roadmap-core.mjs:96` | `roadmap-core.mjs:471` | `LOUD`, `VISIBLE`, `SILENT` — `classification.mjs:42` | `:37` — **idénticos** |
| `external_effects` | `classification.mjs:60`, `roadmap-core.mjs:97` | `roadmap-core.mjs:479-484` | **Sin vocabulario cerrado**: array de cadenas no vacías; ausente y `[]` significan lo mismo | `:38` «lista de guarda, vacía por defecto» — **concuerda** |
| `classified_at` | `classification.mjs:61`, `roadmap-core.mjs:98` | `roadmap-core.mjs:489-490` | **Sin vocabulario**: cadena no vacía; forma declarada `iso_8601_utc_instant` en `classification.mjs:297` | `:40` «la marca de cuándo se clasificó» — **concuerda** |

**Derivados, que NO se almacenan** (`classification.mjs:53-54` lo dice por construcción):
`severity` ∈ `MINOR`, `MODERATE`, `MAJOR`, `CRITICAL` (`classification.mjs:70`; spec `:56-58`) y
`closure_mode` ∈ `UNATTENDED`, `SEMI_ATTENDED`, `ATTENDED` (`classification.mjs:73`; spec `:73-76`).
Las dos tablas de derivación del código (`classification.mjs:85-89` y `:111-116`)
transcriben celda a celda las tablas publicadas en `context/CLASIFICACION-DE-RUNS.md:54-58`
y `:73-76`; el ajuste `LOUD −1 / VISIBLE 0 / SILENT +1` saturante coincide con `:63-67`; la
guarda de `external_effects` coincide con `:78`; y las tres combinaciones ilegales de
`classification.mjs:309-313` coinciden con `:85-87`.

**Cuál es el validador de la ruta de escritura:** `checkInvariants`, del propio motor,
importado por `project-console/serve.mjs:93` y ejecutado en `:363` y `:702`. **No** es
`tools/project-console/validate-project-console-state.mjs`, que lee el fork `D-035` y
tiene 0 ocurrencias de los seis campos.

### C.8 — **NO SE DISPARA LA PARADA**

Los seis nombres son exactamente los que el código acepta, con la misma grafía, y ningún
vocabulario difiere del que publica `context/CLASIFICACION-DE-RUNS.md`. No hubo nada que
normalizar y no se normalizó nada.

### C.9 — **NO SE DISPARA LA PARADA**

Ningún run vivo trae ningún campo de clasificación escrito: **0 de 12 runs vivos**,
confirmado por tres caminos independientes (clave JSON en el canónico, literal en el
canónico, e informe del emisor con `stored_fields` vacío en las 12 entradas).

### C.10 — La ruta por la que se escribe una clasificación

Identificada leyendo el código, extremo a extremo. **No se infirió nada.**

- **Cómo se llama la operación:** `set-classification`. Registrada en el vocabulario de
  operaciones (`tools/roadmap/roadmap-plan.mjs:29`), despachada en
  `tools/roadmap/roadmap-plan.mjs:106-120`, e implementada como `setClassification` en
  `tools/roadmap/roadmap-core.mjs:1222`.
- **Qué campos pide:** **cinco**, con estos nombres de argumento —
  `correctnessModel`, `workType`, `blastRadius`, `failureSurfaces`, `externalEffects`
  (`tools/roadmap/roadmap-plan.mjs:114-119`). El motor los traduce a los cuatro nombres de
  campo en `tools/roadmap/roadmap-core.mjs:1234-1239`, más `external_effects` en `:1259`.
  Un campo que el llamante **omite se deja intacto**; `null` o `""` **borra la clave entera**
  (`:1244-1246`, `:1291`).
- **¿Escribe `classified_at` por su cuenta? SÍ.**
  `tools/roadmap/roadmap-core.mjs:1301` la escribe con `new Date().toISOString()` (o
  `opts.now` si el llamante lo pasa, que es lo que usan los tests). **No es un argumento**
  y el relevo se niega explícitamente a transportarla
  (`tools/roadmap/roadmap-plan.mjs:111-112`). Si al terminar no queda ningún otro campo
  almacenado, **la marca se borra** (`roadmap-core.mjs:1297-1304`).
- **¿Tiene flujo dry-run → confirm? SÍ**, y con compare-and-swap:
  - Endpoint: `POST /projects/<key>/__project-console/roadmap/edit`
    (`project-console/serve.mjs:17-18`, `:411`).
  - **Dry-run** (`apply:false`): previsualiza y **no escribe nada**; devuelve
    `{ dryRun: true, remap, warnings, bytes, baseline }` (`project-console/serve.mjs:495`).
  - **Confirm** (`apply:true`): **exige la `baseline` del dry-run** y el archivo debe ser
    byte a byte idéntico a aquel contra el que se planificó (`:503`, `:527`); escribe una
    sola vez bajo lock, corre el validador y re-emite `.project/`
    (`:539`, `:568` → `validatorRan: true`).
  - Es **batchable** junto a `set-text`, `set-deps`, `set-status`, `set-lane`,
    `set-barrier`, `move` y otras (`tools/roadmap/roadmap-plan.mjs:202`).
- **Qué rechaza:** un token fuera de su vocabulario cerrado, nombrando el vocabulario
  (`roadmap-core.mjs:1250`), y un `external_effects` malformado (`:1264`, `:1268`). **No**
  re-comprueba las combinaciones ilegales de §3: eso lo hace `checkInvariants` una etapa
  después (`roadmap-core.mjs:498`, `:501`), con el archivo aún intacto.
- **En la consola:** el bloque de edición está en
  `project-console/assets/project-console.js:5859` (`data-v3edit-op="set-classification"`),
  el recolector del payload en `:6505` y el diff de la previa en `:6655`. La consola
  **no ofrece control para `classified_at`** ni para los dos derivados, y lo dice en
  pantalla (`:5866`).

---

## Bloque D (segunda entrega) — Forma, y qué NO se pudo medir

### D.12 — Unidades

Toda cifra de esta segunda entrega viaja con su unidad: «N archivos distintos», «N sitios
(líneas distintas con al menos una ocurrencia)», «N ocurrencias», «N runs de 55», «N
líneas». Donde una cifra separa código de comentario se dice cuál es cuál. **Ninguna cifra
de este bloque es aproximada:** todas se reproducen con los comandos citados.

### D.13 — Comandos que produjeron las cifras

Todos de solo lectura, desde `projects/aiw-console/`.

```bash
grep -rn -E "correctness_model|work_type|blast_radius|failure_surfaces|external_effects|classified_at" . | grep -v "^./.git/" | grep -v node_modules | awk -F: '{print $1}' | sort | uniq -c | sort -rn
```

```bash
grep -c '"lane"[[:space:]]*:\|"lanes"[[:space:]]*:\|"barrier"[[:space:]]*:' roadmap/roadmap.json
```

```bash
grep -rln '"project-console", "assets"\|project-console/assets\|join(REPO_ROOT, "project-console"' tests/*.mjs tests/helpers/*.mjs | wc -l
```

```bash
wc -l project-console/* project-console/assets/*
```

Los conteos de sitios/ocurrencias por archivo y la separación comentario/no-comentario los
produjeron dos scripts de recorrido (`inv.mjs` y `lane-only.mjs`) escritos en el
**scratchpad de la sesión, fuera de este repositorio**: recorren el árbol desde la raíz
excluyendo `.git` y `node_modules`, saltan `docs/project-console/`, y aplican `match` por
línea con los patrones citados en cada tabla. La guarda de identidad y la lectura de
`validation_summary` se hicieron con `node -e` sobre los archivos en disco.

### D.14 — Qué NO se pudo medir, y por qué

1. **Cuántos sitios costó cada precedente *cuando se construyó*.** Lo medido es el
   **estado de hoy**, no el diff histórico. Reconstruir el coste real de alta exigiría leer
   los commits de `D-051` y del `#43` uno a uno; no se hizo, y las cifras de B **no deben
   leerse como «líneas escritas en aquel run»** sino como «sitios que hoy nombran el campo».
2. **La frontera entre comentario y código es una heurística.** Un sitio cuenta como
   comentario si la línea empieza por `//`, `*` o `/*`. Un comentario al final de una línea
   de código cuenta como código, y un bloque `/* … */` cuyas líneas interiores no empiezan
   por `*` cuenta como código. No se midió el sesgo que eso introduce.
3. **El coste de un campo nuevo en TESTS.** Se midieron los 12 sitios de código de B.4 uno
   a uno; **no** se hizo el equivalente para los 5 archivos de test de clasificación, que
   suman 270 sitios. Un campo nuevo cuesta además un número de sitios de test que este
   encargo no cuantificó.
4. **La palabra `classification` en la consola tiene dos significados distintos** y no se
   desambiguaron: además de la clasificación de runs, `project-console.js` usa
   `queue_classification` para un concepto heredado del modo 1
   (`project-console/assets/project-console.js:375`, `:684`, `:832`). Los inventarios de
   este bloque se construyeron con los **nombres de campo**, no con la palabra
   `classification`, precisamente para no mezclarlos; pero **no se midió** cuántos sitios
   de la consola pertenecen a cada significado.
5. **No se ejecutó la consola ni la ruta de escritura.** `set-classification` se leyó en el
   código de punta a punta; **no** se hizo ni un dry-run contra un fixture. Que el flujo
   funcione en vivo no es una afirmación de este record.
6. **No se corrió la suite** — fuera de alcance. Los dos rojos preexistentes siguen sin
   tocar y sin comprobar.
7. **El fork `D-035` (`docs/project-console/`) se excluyó sin auditarlo.** Se midió que
   tiene 0 ocurrencias de ambos patrones, y con eso basta para saber que excluirlo no altera
   ninguna cifra; no se leyó su contenido.
8. **`aiw` y `cantu-studio` no se leyeron** — fuera de alcance por ticket. Las fixtures
   `tests/fixtures/neighbours/cantu-studio/` **sí** se contaron, porque viven dentro del
   árbol de este proyecto; están marcadas como fixture en cada tabla.

### E.16 — Condiciones de parada

**Ninguna se disparó en esta segunda entrega.** La guarda de identidad de E.15 salió verde;
C.8 y C.9 no se dispararon; y C.10 se resolvió leyendo el código, sin inferir. No hubo
ninguna decisión que este ticket no autorizara, así que no hay informe de opciones que
entregar.

### Cumplimiento del alcance (segunda entrega)

- **Escrito:** solo este archivo, por adición. El bloque A no se tocó.
- **No escrito:** `roadmap/roadmap.json` (ni un byte), `.project/`, código, tests,
  validador. No se cambió el status de ningún run. No se ejecutó ningún comando de git, ni
  de lectura ni de escritura, en esta segunda entrega. No se corrió la suite. No se
  clasificó ningún run, no se propuso ningún valor y no se opinó sobre los adjudicados. No
  se insertó, movió ni renumeró ningún run. No se leyó ni escribió en `aiw` ni en
  `cantu-studio`. El fork `D-035` se excluyó y se dijo que se excluyó.
