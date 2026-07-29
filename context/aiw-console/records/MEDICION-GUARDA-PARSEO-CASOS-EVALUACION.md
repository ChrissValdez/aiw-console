# CONVENCIÓN DE CASOS DE EVALUACIÓN DE AIW — **RUN DETENIDO POR LA GUARDA DE PARSEO**

**Fecha:** 2026-07-29 · **Run:** `RUN-AIW-EVAL-CASE-CONVENTION-001`
(`queue_order` 24, O3 «Reliable autonomous run» / O3.P3 «Failure cases as an asset») ·
**Naturaleza:** **encargo abortado en su criterio 2.** No se escribió la convención,
no se escribió la declaración de casos, no se tocó `aiw/docs/docs_index.json`, no se
movió ni renombró ningún archivo. **Este record contiene únicamente la medición de la
guarda**, que es lo que el propio encargo manda escribir cuando la guarda salta. ·
**Máquina:** PC (Windows 10, `C:\Users\chris\Documents\AIW_Workspace\`).

**Escritura total de este run: un solo archivo, éste.** Cero bytes escritos bajo
`aiw/`. No se ejecutó git, no se tocó la consola, no se cambió el status de ningún
run, no se corrió la suite de `aiw-console`.

---

## 0. El veredicto, primero

**La guarda del criterio 2 saltó. Dos de los tres casos que este run nombra como
«THREE EXIST TODAY» NO PARSEAN bajo el parser real del kernel.**

| Caso nombrado por el `full_description` | Ruta real en disco | `parseObjective` |
|---|---|---|
| `ERROR-000-sandbox` | `aiw/objectives/processed/ERROR-000-sandbox.md` | **OK** |
| `HUMAN_REVIEW-999-sandbox-imposible` | `aiw/objectives/processed/HUMAN_REVIEW-999-sandbox-imposible.md` | **ABORT `kernel.mjs:147`** |
| `HUMAN_REVIEW-c-imposible` | `aiw/objectives/processed/HUMAN_REVIEW-c-imposible.md` | **ABORT `kernel.mjs:147`** |

El encargo es explícito sobre qué hacer aquí: «**Si alguno NO parsea: PARA AQUÍ.**
Escribe el record solo con esta medición y reporta. La convención no se escribe sobre
un caso que no corre — es la condición que la arista de este run existe para
garantizar.» **Eso es lo que se hizo.**

La arista `RUN-AIW-EVAL-CASE-CONVENTION-001 → RUN-AIW-TICKET-PARSE-REPAIR-001` está
**satisfecha** —el run 15 figura `completed` en `roadmap/roadmap.json:182`— pero **la
condición que esa arista existe para garantizar NO se cumple**. La distinción entre
«la arista está satisfecha» y «la condición se cumple» es exactamente lo que el
criterio 2 mandaba comprobar, y es exactamente donde falla. §6 explica por qué, y no
es un descuido del run 15: es una consecuencia deliberada de su doctrina.

---

## 1. Guarda de identidad (criterio 1) — **PASA**

Derivada del canónico `aiw/roadmap/roadmap.json` recorriendo
`objectives[].phases[].runs[]` y filtrando por `queue_order === 24`. **Un solo nodo
coincide**, en `objectives[2].phases[2].runs[0]`.

| Campo | Valor en disco | Cita |
|---|---|---|
| `title` | `Establish the convention for evaluation cases` | `roadmap/roadmap.json:321` |
| `run_id` | `RUN-AIW-EVAL-CASE-CONVENTION-001` | `roadmap/roadmap.json:319` |
| `queue_order` | `24` | `roadmap/roadmap.json:320` |
| `phase_id` | `O3.P3` («Failure cases as an asset») | nodo padre, `roadmap/roadmap.json:316` |
| `objective_id` | `O3` («Reliable autonomous run») | nodo abuelo |
| `status` | `active` | `roadmap/roadmap.json:324` |
| `lane` | **EL CAMPO NO EXISTE EN ESTE RUN** | ver abajo |
| `depends_on` | `["RUN-AIW-TICKET-PARSE-REPAIR-001"]` | `roadmap/roadmap.json:325-327` |

El `title` **coincide carácter a carácter** con el exigido por la guarda. No hubo que
resolver por parecido.

**Sobre `lane`:** el encargo pedía reportarlo «verbatim (o declara que el campo no
existe en ese run)». **El campo no existe.** Las claves reales del nodo son
exactamente siete: `run_id`, `queue_order`, `title`, `summary`, `full_description`,
`status`, `depends_on`. `lane` **no** es una de ellas. Los carriles viven en la raíz
del documento, en `roadmap.lanes` —`DEVELOPMENT` (marcado `"default": true`) y
`DOCUMENTATION`—, no en el nodo del run. **[INFERENCIA]** al no declarar `lane`, este
run cae en el carril por defecto `DEVELOPMENT`; el mecanismo de esa asignación no se
midió en este run.

El canónico contiene **42 runs** en total (recuento sobre
`objectives[].phases[].runs[]`).

---

## 2. La medición de parseo (criterio 2) — método y resultado

### 2.1 Método

Se importó `parseObjective` **del módulo real del kernel**, no una reimplementación:

```js
import { parseObjective, OUTCOMES } from 'file:///C:/.../aiw/kernel.mjs';
```

Esto es seguro y es la misma vía que usó `MEDICION-INCIDENTE-SCOPE-PREFLIGHT.md`
(citado en `MEDICION-INCIDENTE-SCOPE-PREFLIGHT.md:287`) y que declaró
`REPARACION-PARSEO-TICKETS-AIW.md:173-176`: `kernel.mjs:470` condiciona el arranque
de `main()` a que `kernel.mjs` sea `process.argv[1]`, de modo que **importarlo desde
otro script no dispara el kernel**.

El script recorrió recursivamente `aiw/objectives/**` recogiendo **todo** `.md`, sin
lista blanca ni suposición de carpeta, y ejecutó `parseObjective` sobre el contenido
real de cada archivo. El script vive fuera de `aiw/` (en el scratchpad de la sesión);
**no se escribió nada dentro de `aiw/`**.

### 2.2 Inventario de disco

`find objectives -type f` devuelve **24 archivos**: **22 `.md`** y 2 `.gitkeep`
(`objectives/pending/.gitkeep`, `objectives/processed/.gitkeep`). Los 22 `.md` son el
universo medido. `objectives/pending/` está **vacío de tickets** (solo su `.gitkeep`).

### 2.3 Tabla completa — los 22 tickets

**PARSEAN: 17 · NO PARSEAN: 5.**

| # | Ruta | ¿Parsea? | Línea de aborto | Mensaje exacto del kernel |
|---|---|---|---|---|
| 1 | `objectives/parked/001-arithmetic-columns-guard.md` | **sí** | — | — |
| 2 | `objectives/parked/002-hierarchy-docs-drift.md` | **sí** | — | — |
| 3 | `objectives/parked/003-video-provider-docs-drift.md` | **sí** | — | — |
| 4 | `objectives/processed/APPROVED-000-sandbox-suma.md` | **NO** | `kernel.mjs:147` | `objective.md invalid: missing required sections: project, objective, criteria. See templates/objective.md` |
| 5 | `objectives/processed/APPROVED-001-console-projector.md` | **sí** | — | — |
| 6 | `objectives/processed/APPROVED-002-canonical-path-and-autoproject.md` | **sí** | — | — |
| 7 | `objectives/processed/APPROVED-003-roadmap-emitter.md` | **sí** | — | — |
| 8 | `objectives/processed/APPROVED-003b-startup-projection-all-views.md` | **sí** | — | — |
| 9 | `objectives/processed/APPROVED-004-snapshot-enrichment.md` | **sí** | — | — |
| 10 | `objectives/processed/APPROVED-005-roadmap-contract-fix.md` | **sí** | — | — |
| 11 | `objectives/processed/APPROVED-006-roadmap-delivery-path.md` | **sí** | — | — |
| 12 | `objectives/processed/APPROVED-a-resta.md` | **NO** | `kernel.mjs:147` | idem fila 4 |
| 13 | `objectives/processed/APPROVED-b-multiplica.md` | **NO** | `kernel.mjs:147` | idem fila 4 |
| 14 | `objectives/processed/ERROR-000-sandbox.md` | **sí** | — | — |
| 15 | `objectives/processed/HUMAN_REVIEW-999-sandbox-imposible.md` | **NO** | `kernel.mjs:147` | idem fila 4 |
| 16 | `objectives/processed/HUMAN_REVIEW-c-imposible.md` | **NO** | `kernel.mjs:147` | idem fila 4 |
| 17 | `objectives/qualification/e5-secreto.md` | **sí** | — | — |
| 18 | `objectives/qualification/e6-changes-requerido.md` | **sí** | — | — |
| 19 | `objectives/qualification/e8-multiarchivo.md` | **sí** | — | — |
| 20 | `objectives/queue-e7/a-resta.md` | **sí** | — | — |
| 21 | `objectives/queue-e7/b-multiplica.md` | **sí** | — | — |
| 22 | `objectives/queue-e7/c-imposible.md` | **sí** | — | — |

Los 17 que parsean devuelven `maxRounds` = **3** (el default de `kernel.mjs:123`;
ninguno declara `# Max rounds`). Su campo `project` es `jame_snapshot` en los 3 de
`parked/`, `console` en los 7 `APPROVED-00*` de consola, y `sandbox` en los 7
restantes (`ERROR-000-sandbox`, los 3 de `qualification/` y los 3 de `queue-e7/`).

**Los cinco fallos son idénticos**: misma excepción (`Abort`, `code` 1), misma línea,
mismo mensaje, palabra por palabra. La línea, transcrita de disco:

```
147:  if (missing.length) throw new Abort(`objective.md invalid: missing required sections: ${missing.join(', ')}. See templates/objective.md`);
```

### 2.4 Los tres casos que este run nombra — rutas resueltas, no supuestas

El encargo prohibía suponer la carpeta. Se barrió **todo el árbol de `aiw/`**
(excluyendo `.git/`) buscando los tres nombres:

| Nombre buscado | Apariciones en disco |
|---|---|
| `000-sandbox` | `objectives/processed/APPROVED-000-sandbox-suma.md`, `objectives/processed/ERROR-000-sandbox.md`, `sandbox/000-sandbox.md`, y 6 archivos bajo `logs/000-sandbox/` |
| `999-sandbox-imposible` | `objectives/processed/HUMAN_REVIEW-999-sandbox-imposible.md` — **y en ningún otro sitio** |
| `c-imposible` | `objectives/processed/HUMAN_REVIEW-c-imposible.md` **y** `objectives/queue-e7/c-imposible.md` |

Datos de disco de los seis archivos relevantes de `processed/`
(`md5sum` y `wc -c` sobre los archivos reales):

| Ruta | Bytes | md5 | Parsea |
|---|---|---|---|
| `processed/ERROR-000-sandbox.md` | 460 | `8b063ee0350a30b89f27fe6895e349fd` | **sí** |
| `processed/HUMAN_REVIEW-999-sandbox-imposible.md` | 428 | `03bce013a4c8d637bc96cede2153eade` | **NO** |
| `processed/HUMAN_REVIEW-c-imposible.md` | 542 | `62c571fd9779dddeab398999013059c2` | **NO** |
| `processed/APPROVED-000-sandbox-suma.md` | 256 | `cc7def32d972355e4dcf84927e7cd919` | **NO** |
| `processed/APPROVED-a-resta.md` | 421 | `f7fd01200b207a71e17c96d424481a52` | **NO** |
| `processed/APPROVED-b-multiplica.md` | 437 | `efdfeb2cbbc83308334bb8519e92e420` | **NO** |

**Hallazgo que decide el run:** de los tres casos nombrados, **`ERROR-000-sandbox` es
el único que parsea**. Los otros dos abortan. Y `999-sandbox-imposible` **no tiene
gemelo vivo en ninguna parte**: su única encarnación en disco es el archivo de
`processed/` que no parsea. `c-imposible` sí tiene gemelo vivo y sano en
`queue-e7/c-imposible.md`, que **parsea correctamente**.

---

## 3. La cifra: **cinco**, verificada, y son **los mismos archivos**

El encargo pedía no dar por buena la cifra de una medición anterior —«cinco tickets
sin parsear en `processed/`, todos abortando en `kernel.mjs:147`»— y comprobar
también si son los mismos archivos.

**Medido hoy, de disco: la cifra es CINCO y los archivos son LOS MISMOS.**

| Afirmación previa (`MEDICION-INCIDENTE-SCOPE-PREFLIGHT.md:311, :324-325, :345-348`) | Medido hoy | ¿Coincide? |
|---|---|---|
| 5 tickets no parsean | **5** | **sí** |
| Todos abortan en `kernel.mjs:147` | los 5, columna 29 | **sí** |
| Todos están en `processed/` | los 5 | **sí** |
| Son `APPROVED-000-sandbox-suma`, `APPROVED-a-resta`, `APPROVED-b-multiplica`, `HUMAN_REVIEW-999-sandbox-imposible`, `HUMAN_REVIEW-c-imposible` | idénticos, uno a uno | **sí** |

Es una medición independiente con el mismo resultado, no una cita. **Nada se ha
movido ni reparado entre ambas mediciones.**

**Una cifra del propio `full_description` que NO cuadra, registrada:** el run 24 dice
«Depends on **the six broken tickets** being repaired» (`roadmap/roadmap.json:323`).
**Hoy los rotos son cinco, y no son «los seis».** Los seis a los que alude son los que
reparó el run 15 —`e5-secreto`, `e6-changes-requerido`, `e8-multiarchivo`, `a-resta`,
`b-multiplica`, `c-imposible`, en `qualification/` y `queue-e7/`
(`REPARACION-PARSEO-TICKETS-AIW.md:180-185`)—, y **esos seis parsean hoy**
(filas 17-22 de §2.3, medido). Los cinco rotos de hoy son **otro conjunto**: las
copias archivadas en `processed/`. Ambos conjuntos comparten nombres de ticket, y ahí
está la trampa: `a-resta`, `b-multiplica` y `c-imposible` existen **dos veces**, y la
copia viva parsea mientras la archivada no.

---

## 4. La causa, medida

Los cinco fallos tienen la misma causa, verificada leyendo los encabezados H1 de cada
archivo:

| Archivo | Encabezados H1 en disco | Líneas |
|---|---|---|
| `processed/APPROVED-000-sandbox-suma.md` | `# Proyecto`, `# Objetivo`, `# Criterios de aceptación`, `# Alcance`, `# Fuera de alcance`, `# Verificación` | 1, 4, 7, 11, 14, 18 |
| `processed/APPROVED-a-resta.md` | idénticos | 1, 4, 7, 11, 14, 18 |
| `processed/APPROVED-b-multiplica.md` | idénticos | 1, 4, 7, 11, 14, 18 |
| `processed/HUMAN_REVIEW-999-sandbox-imposible.md` | idénticos | 1, 4, 7, 10, 13, 17 |
| `processed/HUMAN_REVIEW-c-imposible.md` | idénticos | 1, 4, 7, 10, 13, 17 |

**Están en español.** `parseObjective` busca las claves en inglés —`project`,
`objective`, `acceptance criteria` son las tres requeridas (`kernel.mjs:146`)— y
`stripAccents` (`kernel.mjs:120`) normaliza a NFD, borra diacríticos, minúsculiza y
recorta, pero **no traduce**: `# Proyecto` produce la clave `proyecto`, que el parser
nunca consulta. De ahí que las tres requeridas salgan vacías y aborte en `:147`.

Contraste medido, en el mismo árbol: los cuatro que sí parsean y que son gemelos o
vecinos directos —`processed/ERROR-000-sandbox.md`, `queue-e7/a-resta.md`,
`queue-e7/b-multiplica.md`, `queue-e7/c-imposible.md`— declaran `# Project`,
`# Objective`, `# Acceptance criteria`, `# Scope`, `# Out of scope`, `# Verification`.
**La diferencia es exactamente el idioma del encabezado.**

---

## 5. Lo que dice el kernel sobre los desenlaces — medido, sin interpretarlo

Se leyó `OUTCOMES` del módulo real, valor verbatim:

```json
{"APPROVED":{"state":"APPROVED","exit":0},
 "BLOCKED":{"state":"BLOCKED","exit":3},
 "ROUNDS_EXHAUSTED":{"state":"HUMAN_REVIEW","exit":2},
 "HUMAN_REVIEW":{"state":"HUMAN_REVIEW","exit":4}}
```

**Cuatro entradas.** Se registra sin más porque el criterio 4e —la cobertura de los
cinco desenlaces— **es trabajo detenido** y no se completó (§7). No se afirma nada
aquí sobre qué desenlace cubre qué fixture.

---

## 6. Por qué la arista está satisfecha y la condición no

No es un descuido. Es la consecuencia directa y **declarada** de la doctrina del run
15, y conviene que la cabina la lea antes de decidir qué hacer:

`REPARACION-PARSEO-TICKETS-AIW.md` reparó seis archivos, y **excluyó `processed/` a
propósito**. Su §7 lo dice con todas las letras
(`REPARACION-PARSEO-TICKETS-AIW.md:356-364`):

> «`processed/` es **registro histórico inmutable de lo que corrió**: sus archivos
> son la foto del ticket tal como el kernel lo consumió aquel día, y reescribirlos
> falsificaría el registro.»

Y remata: «**Los tres gemelos de `processed/` no se tocaron.**»
(`REPARACION-PARSEO-TICKETS-AIW.md:363`). Su frontera de salida lo corrobora: los seis
modificados están todos en `qualification/` y `queue-e7/`, y `processed/` no aparece
(`REPARACION-PARSEO-TICKETS-AIW.md:439-444, :457-460`).

De modo que:

- El run 15 hizo **exactamente lo que se propuso**, y su `completed` es legítimo.
- El run 24 nombra como sus tres casos de evaluación **tres archivos de `processed/`**.
- Bajo la doctrina del run 15, **esos archivos no deben repararse jamás** — son
  registro histórico, no artefactos vivos.

**Esto no es un bloqueo que se levante reparando cinco archivos. Es una contradicción
de premisa, y decidirla no es cosa de este run.**

---

## 7. El conflicto que esto destapa — se NOMBRA, no se resuelve

El encargo ordena parar y reportar en vez de resolver. Se nombra, pues, y se deja
íntegro para la cabina:

**El run 24 da por hecho que un caso de evaluación es un archivo de `processed/`. Si
eso es cierto, la convención se escribiría sobre archivos que por doctrina no pueden
repararse ni mantenerse, y dos de los tres no corren. Si es falso, entonces la premisa
«THREE EXIST TODAY» del `full_description` es errónea y hay que corregir el ticket
antes de escribir nada.**

Las dos salidas son actos propios, ninguno de este run:

- **Salida A — el caso vive en `processed/`.** Obliga a reparar los cinco, lo que
  **contradice frontalmente** `REPARACION-PARSEO-TICKETS-AIW.md:356-364`. Requiere
  revocar esa doctrina con incidente, no de pasada.
- **Salida B — el caso vive en el artefacto vivo** (`qualification/`, `queue-e7/` u
  otro sitio). Entonces `processed/` queda como evidencia histórica y no como caso, la
  premisa del run 24 se reescribe, y hay que decidir qué pasa con
  `999-sandbox-imposible`, que **no tiene copia viva en ninguna parte** (§2.4) y por
  tanto desaparecería como caso.

Este record **no elige**. Elegir es precisamente la adjudicación que el run 24 tenía
encomendada, y el run 24 no puede hacerla mientras su propia premisa esté sin
verificar.

---

## 8. Qué NO se hizo, y por qué

Detenido por la guarda del criterio 2, **explícitamente y por mandato del encargo**:

| Criterio | Trabajo | Estado |
|---|---|---|
| 3 | Resolver TRES contra NUEVE (`DISPOSICION-CARPETAS-COLA-AIW.md` §3 vs. `full_description`) | **NO EJECUTADO** |
| 4 | El documento de convención (dónde vive, qué declara, descubrimiento, vigencia, cobertura de los 5 desenlaces) | **NO ESCRITO** |
| 5 | La declaración de los casos vigentes | **NO ESCRITA** |
| 6 | Colocación en `aiw/docs/` e indexado en `aiw/docs/docs_index.json` | **NO EJECUTADO** — `docs_index.json` no se abrió para escritura ni se modificó |
| 7 | Lista de movimientos pendientes y citas que se romperían | **NO ELABORADA** |

**Cero archivos escritos bajo `aiw/`.** Cero archivos movidos, renombrados o borrados,
aquí y en cualquier parte. `aiw/CONSTITUCION.md` §4 (`CONSTITUCION.md:28-35`) se
respeta por construcción: **no se añadió ningún mecanismo, ningún paso al kernel,
ninguna línea a `kernel.mjs`**. Tampoco hizo falta pararse por la tentación de
añadirlo: al no escribirse la convención, nunca se llegó a ese punto.

---

## 9. Observación incidental verificada — `logs/`

Surgió al resolver las rutas reales del §2.4, que el criterio 2 exigía. Se registra
porque está medida y es barata; **no sustituye la verificación del criterio 4e, que
queda pendiente con el resto**.

`ls -1 logs/` devuelve **11 entradas**: 9 carpetas (`000-sandbox`,
`001-console-projector`, `002-canonical-path-and-autoproject`,
`002-canonical-path-and-autoproject-orphan-20260711`, `003-roadmap-emitter`,
`003b-startup-projection-all-views`, `004-snapshot-enrichment`,
`005-roadmap-contract-fix`, `006-roadmap-delivery-path`) y 2 archivos sueltos
(`DIAG-roadmap-invalid.md`, `INCIDENT-2026-07-11.md`).

**La afirmación del `full_description` sobre `logs/` se confirma en disco:** no existe
carpeta de log para `999-sandbox-imposible`, `c-imposible`, `a-resta` ni
`b-multiplica`. **Matiz medido:** `logs/000-sandbox/` **sí existe**, con 6 archivos
dentro (`objective.md`, `preflight.txt`, `round1_executor.md`, `round1_reviewer.md`,
`round1_tests.txt`, `summary.md`). Es decir, de los tres casos nombrados, **uno sí
tiene carpeta de log y dos no** — que es justo lo que el run declara y la razón de su
restricción dura contra depender de `logs/`.

---

## 10. Inferencias y no verificados

- **[INFERENCIA]** al no declarar `lane`, el run 24 cae en el carril por defecto
  `DEVELOPMENT` (`roadmap.lanes`, marcado `"default": true`). El mecanismo que hace
  esa asignación no se midió.
- **[NO VERIFICADO]** que los 17 tickets que parsean **ejecuten**, y menos aún que
  produzcan el desenlace para el que existen. **Este run midió parseo, no ejecución.**
  Ningún ticket se ejecutó. La misma limitación la declaró el run 15
  (`REPARACION-PARSEO-TICKETS-AIW.md:422-428`).
- **[NO VERIFICADO]** la cobertura de los cinco desenlaces del kernel a día de hoy, y
  en particular si sigue siendo cierto que dos de los cinco tienen su único ejemplar
  entre los seis de `qualification/` y `queue-e7/`. Es el criterio 4e y **quedó
  detenido**; no se midió y no se afirma nada.
- **[NO VERIFICADO]** por qué las copias de `processed/` quedaron en español mientras
  las vivas pasaron a inglés. El run 15 dejó esa misma causa sin diagnosticar
  (`REPARACION-PARSEO-TICKETS-AIW.md:481-483`) y este run tampoco la investiga.
- **[NO VERIFICADO]** el estado de git de `aiw` al abrir y al cerrar. **Por mandato
  del encargo no se ejecutó git en ninguna forma**, ni siquiera en lectura.

Todo lo demás en este record está medido de disco en esta sesión: el inventario y el
parseo por ejecución de `parseObjective` importado de `aiw/kernel.mjs` sobre los
archivos reales; md5 y bytes por `md5sum` y `wc -c`; encabezados por lectura directa;
las cifras del canónico por lectura de `aiw/roadmap/roadmap.json`; el contenido de
`logs/` por `ls`. **Lo citado de otro record va siempre con su `ruta:línea`** y
señalado como cita, no como medición propia.

---

## 11. Status y cierre

**El `#24` NO debe quedar en `completed`. Debe volver a `planned`.**

Razón, en una línea: **su guarda de entrada saltó — dos de los tres casos que el
propio run nombra como su materia prima no parsean, y la convención no se escribe
sobre casos que no corren.** El entregable del run (la convención y la declaración de
casos) **no existe**, y ningún criterio del 3 al 7 se ejecutó.

**Advertencia para quien reprograme este run:** volver a lanzarlo tal cual **volverá a
parar en el mismo sitio**. La arista hacia `RUN-AIW-TICKET-PARSE-REPAIR-001` ya está
`completed` y no va a mover nada más: el run 15 excluyó `processed/` por doctrina
escrita (§6). Antes de reintentar hay que resolver la contradicción de premisa del §7
—decidir si un caso de evaluación vive en `processed/` o en el artefacto vivo— y, si
la decisión obliga a tocar `processed/`, abrirlo como incidente contra la doctrina del
run 15 en vez de resolverlo de paso.

**Este record no cambia ningún status.** El operador cierra desde la consola.
