# RE-ENCUADRE DE LOS DIECISIETE DOC-RUNS DE COMPONENTE WEB DE CANTU

> Encargo de taller de **edición de texto de roadmap** sobre `cantu-studio`. Reescribe los tres
> campos de texto (`title`, `summary`, `full_description`) de los **17 doc-runs de componente Web**
> del carril `DOCUMENTATION`, para que describan el trabajo que queda en lugar del que ya está
> entregado.
>
> Fecha: 2026-07-28. **Git no se usó en ninguna forma** — ni lectura ni escritura de comandos git.
> No se levantó ningún servidor. No se corrió ninguna suite, ni de `cantu-studio` ni de
> `aiw-console`. No se re-emitió `.project/`. **No se tocó ningún `status`, `depends_on`, `lane`,
> `queue_order` ni `barrier`.** No se tocó ningún packet de `docs/components/web/`, ni
> `docs_index.json`, ni ningún otro run del roadmap.
>
> El diagnóstico no se re-midió: viene de
> [`MEDICION-DERIVA-ROADMAP-CANTU-71-RUNS.md`](MEDICION-DERIVA-ROADMAP-CANTU-71-RUNS.md),
> Bloque E puntos 1-17 y Bloque C **[F2]**. Este encargo lo ejecuta.

## Archivos escritos por este encargo, y ninguno más

| Repo | Archivo | Qué |
|---|---|---|
| `cantu-studio` | `.aiw/roadmap/roadmap.json` | los tres campos de texto de 17 de los 71 runs — **la única escritura en Cantu** |
| `aiw-console` | `context/aiw-console/records/REENCUADRE-DOC-RUNS-COMPONENTES-WEB-CANTU.md` | este record |

Barrido de `cantu-studio` por `mtime` posterior al inicio del encargo, excluido `.git/` y
`node_modules/`: **exactamente un archivo**, `.aiw/roadmap/roadmap.json`. Ningún temporal quedó
en `.aiw/roadmap/` — el motor escribe `.roadmap.json.tmp-<pid>` y lo renombra atómicamente, y el
respaldo que él mismo toma vive en `os.tmpdir()`, fuera del repo.

---

## BLOQUE A — LÍNEAS BASE

### A.1 Respaldo antes de tocar nada, fuera del repo

| Qué | Valor |
|---|---|
| Ruta del respaldo | `<scratchpad>/work/backup/roadmap.BEFORE.json` (fuera de los tres repos) |
| Bytes | **81 321** |
| md5 | `9159f9de31ddc4d2ec93ab614923ff10` |
| `mtime` del canónico al leerlo | 2026-07-28 03:34:12 |

### A.2 Líneas base nuevas del canónico

| Qué | Antes | Después |
|---|---|---|
| Bytes | 81 321 | **88 952** |
| md5 | `9159f9de31ddc4d2ec93ab614923ff10` | **`5e4fd54244c619908abef27e8007a37d`** |
| `mtime` | 2026-07-28 03:34:12 | 2026-07-28 13:11:42 |
| baseline del motor (sha256 de los bytes leídos) | `sha256:a81e74fc57138d66…` | — |

El crecimiento de **7 631 bytes** es todo texto: los `full_description` nuevos son largos donde
los viejos eran una frase. Ninguna clave, ningún run, ninguna arista se añadió.

---

## BLOQUE B — MÉTODO

### B.1 Los diecisiete se derivaron, no se tecleron

Criterio 1. Ningún `run_id` se escribió a mano en el driver. La derivación fue por **el texto
migrado**, con una expresión exacta anclada a principio y fin:

```
/^Once the component-doc single-source contract is defined, document the (.+) component in its canonical packet that feeds the Component Guide\.$/
```

- **Aciertos: 17.** Ni uno más, ni uno menos. Los 17 llevan `lane: "DOCUMENTATION"` explícito
  (comprobado como guarda: un acierto fuera de ese carril habría abortado).
- **Cruce contra el run que audita la documentación de conjunto:** el `depends_on` de
  `RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001` (q47) tiene **17 entradas**, y los dos conjuntos son
  **idénticos** — `onlyDerived=[]`, `onlyDeps=[]`. Si no hubieran coincidido, el driver aborta
  antes de planear nada.

El nombre del componente sale del **grupo de captura** de la propia expresión, no de una lista
tecleada; lo único tecleado es el mapa componente → nombre de archivo del packet, que se verifica
contra disco antes de usarse.

### B.2 Cada uno contra su propio packet, verificado en disco

Criterio 2. Antes de construir una sola operación, cada uno de los 17 se comprobó contra el packet
que le corresponde: **existe**, **su tamaño**, y **sus ocho secciones en orden**
(`What it is · When to use · Author fields · Layout compatibility · Example · Guardrails ·
Similar components · Status and evidence`). Un run cuyo packet no existiera o cuyas secciones no
cuadraran se habría apartado y reportado, sin reescribirse.

**Resultado: 17/17 reescribibles, 0 apartados.**

| q | run_id | Packet | Bytes | 8 secciones | Banner `Last verified: 2026-07-12` |
|---:|---|---|---:|---|---|
| 13 | `RUN-CANTU-WEB-COLUMNS-DOC-001` | `docs/components/web/COLUMNS.md` | 2 657 | OK | OK |
| 15 | `RUN-CANTU-WEB-HEADER-DOC-001` | `HEADER.md` | 2 857 | OK | OK |
| 17 | `RUN-CANTU-WEB-LIST-DOC-001` | `LIST.md` | 2 399 | OK | OK |
| 19 | `RUN-CANTU-WEB-ICONLIST-DOC-001` | `ICON-LIST.md` | 2 652 | OK | OK |
| 21 | `RUN-CANTU-WEB-CARD-DOC-001` | `CARD.md` | 3 079 | OK | OK |
| 23 | `RUN-CANTU-WEB-VIDEO-DOC-001` | `VIDEO.md` | 2 276 | OK | OK |
| 25 | `RUN-CANTU-WEB-NARRATIVE-DOC-001` | `NARRATIVE.md` | 2 431 | OK | OK |
| 27 | `RUN-CANTU-WEB-CALLOUT-DOC-001` | `CALLOUT.md` | 2 377 | OK | OK |
| 29 | `RUN-CANTU-WEB-DETAILS-DOC-001` | `DETAILS.md` | 2 460 | OK | OK |
| 31 | `RUN-CANTU-WEB-ARITHMETIC-DOC-001` | `ARITHMETIC.md` | 2 901 | OK | OK |
| 33 | `RUN-CANTU-WEB-RULE-DOC-001` | `RULE.md` | 2 618 | OK | OK |
| 35 | `RUN-CANTU-WEB-SPLIT-DOC-001` | `SPLIT.md` | 3 161 | OK | OK |
| 37 | `RUN-CANTU-WEB-TABLE-DOC-001` | `TABLE.md` | 2 488 | OK | OK |
| 39 | `RUN-CANTU-WEB-CONCEPTGRID-DOC-001` | `CONCEPT-GRID.md` | 2 660 | OK | OK |
| 41 | `RUN-CANTU-WEB-HIERARCHY-DOC-001` | `HIERARCHY.md` | 2 623 | OK | OK |
| 43 | `RUN-CANTU-WEB-TIMELINE-DOC-001` | `TIMELINE.md` | 2 640 | OK | OK |
| 45 | `RUN-CANTU-WEB-VISUAL-DOC-001` | `VISUAL.md` | 2 532 | OK | OK |

Los dos punteros staleados se verificaron presentes en los 17: **2 ocurrencias por packet** de
`docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` y **2 por packet** de
`docs/REFERENCE-DRAFT-JSON.md`. Ninguna de esas dos rutas existe hoy; las reales son
`docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` y
`docs/reference/REFERENCE-DRAFT-JSON.md` (ambas verificadas en disco). **No se reparó ninguno:**
reparar el packet es el trabajo de los 17 runs, no de este encargo.

### B.3 Qué motor, y por qué ese

Criterio 5. **Motor usado: el de `aiw-console`** —
`projects/aiw-console/tools/roadmap/roadmap-plan.mjs` sobre
`projects/aiw-console/tools/roadmap/roadmap-core.mjs`— que es **el módulo exacto que ejecuta el
endpoint de escritura de la consola global** (`project-console/serve.mjs:92`).

**Por qué no el local de Cantu** (`cantu-studio/tools/roadmap/roadmap-core.mjs`, 53 558 B):

1. **No adopta carriles.** `lane` cuenta **7** ocurrencias en el core local frente a **147** en el
   de la consola. Su `RUN_ALLOWED_FIELDS` no contempla el carril, así que los 23 runs que llevan
   `lane: "DOCUMENTATION"` — los 17 de este encargo entre ellos — no pasarían sus invariantes.
2. **No resuelve la arista externa.** `externalRunIds` cuenta **0** ocurrencias en el core local y
   **0** en su `roadmap-plan.mjs`. El canónico de Cantu porta una dependencia legal a otro
   proyecto (`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` → `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`,
   CONTRATO §10.d Regla 2). Sin ese parámetro, el **pre-flight** del motor local la trataría como
   colgante y **rechazaría el archivo antes de planear nada**.

**Cómo se le dio la arista externa, sin que ninguna identidad de proyecto entre en el motor:** el
conjunto `externalRunIds` se compuso igual que lo compone la consola (`serve.mjs:335`,
`externalRunIdsFor`) — recorriendo el árbol del **otro** proyecto registrado y quedándose con sus
`run_id`. Lectura pura de `aiw-console/roadmap/roadmap.json`, **sin escritura** (su md5 y su
`mtime` se comprueban idénticos antes y después, Bloque F). Resultado: **45 ids**, con
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` presente. El motor recibe un `Set`; es dato, no proyecto.

**Qué hizo el motor y qué hizo el driver.** El driver del scratchpad solo aporta argumentos y
comprobaciones; **la mutación y la serialización son del motor**:

```
loadRaw -> parseRoadmap -> checkInvariants (pre-flight)
  -> queueOrderMap + collectIds -> batch[17 x set-text]
  -> checkInvariants (post) + checkIdentityPreserved -> buildRemap -> serialize
  -> applyWrite (respaldo fuera del repo -> temp -> fsync -> rename atómico, con rollback)
```

Las 17 reescrituras van en **una sola operación `batch`** — una sola vista previa y una sola
escritura, sin estado intermedio en disco. `set-text` es una de las sub-operaciones que el motor
declara batcheables precisamente porque no entrega ningún `*_id`.

**Autoridad de escritura inyectada.** A `applyPlan` se le pasó un validador que, sobre el archivo
ya renombrado, (a) lo re-lee y re-verifica los invariantes con la arista externa resuelta, (b)
comprueba que conserva la forma `objectives -> phases -> runs`, y (c) **lanza el validador del
propio proyecto** (`node tools/project-console/validate-project-console-state.mjs`) y exige
`EXIT 0`. Cualquiera de los tres en rojo restaura el respaldo. Salida registrada:
`re-read OK + project validator EXIT 0`.

### B.4 Roundtrip byte-exacto, comprobado antes de tocar el canónico

Criterio 5. Antes de planear nada, el driver comprueba
`serialize(parseRoadmap(raw), detectEol(raw)) === raw` sobre el archivo objetivo. Si no coincide,
aborta sin planear.

- **Resultado: byte-exacto.** EOL detectado **CRLF**, 81 321 bytes, baseline
  `sha256:a81e74fc57138d66…`.
- Se comprobó **dos veces**: en el ensayo sobre la copia y otra vez, contra el canónico, en la
  pasada real.

### B.5 Ensayo completo sobre copia, y `cmp` contra el original

Criterio 6. La secuencia entera —derivación, cruce, verificación de packets, plan, invariantes,
**y escritura**— se corrió primero contra una copia del canónico en el scratchpad
(`<scratchpad>/work/rehearsal.json`). Solo cuando todos los invariantes del criterio 7 salieron en
verde sobre esa copia se corrió contra el canónico.

```
cmp <canónico> <copia ensayada>   ->  sin diferencias
```

**El canónico es byte a byte idéntico a la copia ensayada.** El ensayo fue la vista previa, y lo
que el operador vio ensayado es exactamente lo que quedó escrito.

---

## BLOQUE C — INVARIANTES, CON SUS NÚMEROS

Criterio 7. Medidos sobre el árbol tal como se leyó y sobre el árbol serializado por el motor, en
la misma pasada, antes de escribir.

| Invariante | Antes | Después | ¿Cambió? |
|---|---|---|---|
| Objetivos | **7** | **7** | No |
| Fases | **28** | **28** | No |
| Runs | **71** | **71** | No |
| `queue_order` 1..71 denso, único, contiguo | sí | sí | No |
| Remap de `queue_order` producido por el plan | — | **ninguno** | — |
| Aristas `depends_on` | **150** | **150** | No |
| `status` | `completed: 4`, `planned: 67` | `completed: 4`, `planned: 67` | No |
| Los 4 `completed`, por id | q1, q2, q3, q48 | los mismos 4 | No |
| `run_id` (conjunto ordenado) | 71 ids | idéntico | No |
| `phase_id` (conjunto ordenado) | 28 ids | idéntico | No |
| `objective_id` (conjunto ordenado) | 7 ids | idéntico | No |
| `lane` | 48 ausente / 23 `DOCUMENTATION` | 48 / 23 | No |

Los 4 `completed` son `RUN-JAME-SMART-FORMULA-FIELD-RULE-ONLY-BASELINE-001` (q1),
`RUN-JAME-DOCUMENTATION-CANONICAL-MODEL-001` (q2),
`RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001` (q3) y
`RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001` (q48).

> Nota de deriva respecto al record de la medición: aquel declaró `completed: 3`. Hoy son **4** —
> q3 se cerró en el intervalo, entre las 03:06 y las 03:34. Este encargo **no cerró nada**; los 4
> de antes son los 4 de después.

**Los 54 runs que no son los 17:** comparados **campo a campo** contra el respaldo previo
(`JSON.stringify` del run completo). **54/54 byte-idénticos.** Ninguna diferencia.

**Los 17, fuera de los tres campos de texto:** `run_id`, `queue_order`, `status`, `depends_on` y
`lane` comparados uno a uno contra el respaldo. **Sin una sola diferencia.** Lo único que cambia
en los 17 es `title`, `summary` y `full_description`.

### C.1 Bytes no-ASCII

Criterio 4. Barrido del archivo entero, antes y después:

| Qué | Antes | Después |
|---|---|---|
| Caracteres no-ASCII en todo el canónico | **10** | **10** |
| Bytes de más por UTF-8 | 20 | 20 |
| Carácter distinto encontrado | `—` (raya, U+2014) | el mismo |
| **Caracteres no-ASCII en el texto NUEVO de los 17** | — | **0** |

Los 10 son **preexistentes y ajenos a este encargo**: viven en el `full_description` de cuatro
runs que **no** son de los 17 — q7 `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001`, q8
`RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001`, q57
`RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001` y q66 `RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001`. Su
conteo es idéntico antes y después: este encargo no añadió ni quitó ninguno, y **no los tocó**
porque re-encuadrar otros runs está fuera de alcance. Se dejan nombrados como hallazgo menor
(Bloque G, punto 3).

El texto nuevo de los 17 es **ASCII puro**: 0 caracteres no-ASCII, 0 bytes de más. El driver lo
comprueba como guarda antes de entregar nada al motor, y aborta si falla.

---

## BLOQUE D — EL VALIDADOR, ANTES Y DESPUÉS

Criterio 8. Por la vía que no escribe: `node tools/project-console/validate-project-console-state.mjs`
desde la raíz de `cantu-studio`. Se verificó primero que el validador **no escribe** — 0
ocurrencias de `writeFile`, `mkdir`, `rename`, `unlink` y `appendFile` en sus 98 725 bytes, y
ningún manejo de `process.argv`, así que no tiene modo de escritura que activar.

| | Antes | Después |
|---|---|---|
| Veredicto | `Project Console state validation passed.` | **igual** |
| Salida | `7 objectives / 28 phases / 71 runs` | **igual** |
| Grupos de cola | `needs_human_decision=0 now=0 ready_next=10 later=57 **history=4**` | **igual** |
| Docs indexados | 142 | 142 |
| Docs curados primary-visible | 54 de 142 | 54 de 142 |
| Component statuses | 16 | 16 |
| Episodios de procedencia Git | 9 | 9 |
| Snapshot de historia Git | 918 commits / 2 ramas | igual |
| **EXIT** | **0** | **0** |

**Avisos no bloqueantes: uno, el de siempre**, palabra por palabra igual antes y después — la
arista externa `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` →
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`, que un solo roadmap cargado no puede decidir.
**Ningún aviso nuevo.**

---

## BLOQUE E — EL TEXTO, ANTES Y DESPUÉS

Criterio 11. Para que el operador lea qué cambió sin abrir el JSON.

### E.1 El criterio de redacción, y de dónde sale cada pieza

- **El verbo.** Deja de ser `document` y pasa a ser **`Verify`**, que ya está en el vocabulario de
  títulos del roadmap: q49, `Verify global Formula Inserter integration after component
  revalidation` — un run cuya forma es la misma situación, algo que ya existe y lo que queda es
  verificarlo. No se inventó verbo nuevo. (`Audit` se descartó a propósito: es el verbo de q46 y
  q47, los dos runs *de conjunto*, y usarlo aquí los solaparía.)
- **La cláusula «that feeds the Component Guide» desaparece** de los 17, en los tres campos.
  Comprobado como guarda antes de entregar el texto al motor, y verificado sobre el resultado:
  0 ocurrencias en los tres campos de los 17.
- **La forma de `title` y `summary`** es la que el roadmap ya usa para el par
  implementación/documentación:

  | | Implementación (q12) | Documentación (q13), antes | Documentación (q13), ahora |
  |---|---|---|---|
  | `title` | `Audit and implement the Columns component` | `Document the Columns component` | `Verify the Columns component packet` |
  | `summary` | tres cláusulas: *auditar contra X, implementar lo que falte, y verificar por QA* | una cláusula + condición | tres cláusulas: *verificar contra el contrato, reparar los punteros, y refrescar banner y registro juntos* |

  El `summary` nuevo copia el ritmo tri-cláusula del `summary` de implementación, que es la forma
  viva del par. `packet` no es palabra nueva: aparece **44 veces** en el canónico.
- **El `full_description`** nombra el trabajo real, idéntico para los 17 salvo el nombre del
  componente y su archivo, con los cuatro elementos que pide el encargo: verificar contra
  `docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md` **nombrando su Sección 6**, que es
  donde el contrato fija el deber («refresh the banner Last verified and the registry freshness
  together; keep status reference-only»); reparar **los dos** punteros staleados, nombrados; y
  refrescar banner y registro **juntos**. Cierra declarando que **sigue dependiendo de su run de
  implementación, que sigue pendiente**, y que mantiene el status como referencia, no como
  afirmación.

### E.2 La plantilla, con el texto exacto

**ANTES** (los 17, salvo el nombre del componente):

```
title            Document the X component
summary          Document the X component in its canonical packet that feeds the Component
                 Guide, once the component-doc single-source contract is defined.
full_description Once the component-doc single-source contract is defined, document the X
                 component in its canonical packet that feeds the Component Guide.
```

**DESPUÉS** (los 17, salvo el nombre del componente y el de su packet):

```
title            Verify the X component packet
summary          Verify the X component packet against the component-doc single-source
                 contract, repair its two stale pointers, and refresh its status banner and
                 registry entry together.
full_description The X packet already exists at docs/components/web/FILE.md and is registered,
                 so what remains is not writing it. Verify the packet against the
                 component-doc single-source contract at
                 docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md, whose Section 6
                 fixes this duty; repair the two stale pointers it carries, to the
                 certification matrix and to REFERENCE-DRAFT-JSON; and refresh its status
                 banner and its registry entry together. This Run still depends on its
                 implementation run, which remains pending, and it keeps status
                 reference-only.
```

### E.3 Los diecisiete, uno a uno

`X` y `FILE.md` resueltos. El `full_description` de cada uno es la plantilla de E.2 con esos dos
valores sustituidos; aquí se dan los dos valores y los campos cortos verbatim.

| q | run_id | `title` ANTES | `title` DESPUÉS | `X` / `FILE.md` en el `full_description` |
|---:|---|---|---|---|
| 13 | `RUN-CANTU-WEB-COLUMNS-DOC-001` | Document the Columns component | **Verify the Columns component packet** | Columns / `COLUMNS.md` |
| 15 | `RUN-CANTU-WEB-HEADER-DOC-001` | Document the Header component | **Verify the Header component packet** | Header / `HEADER.md` |
| 17 | `RUN-CANTU-WEB-LIST-DOC-001` | Document the List component | **Verify the List component packet** | List / `LIST.md` |
| 19 | `RUN-CANTU-WEB-ICONLIST-DOC-001` | Document the IconList component | **Verify the IconList component packet** | IconList / `ICON-LIST.md` |
| 21 | `RUN-CANTU-WEB-CARD-DOC-001` | Document the Card component | **Verify the Card component packet** | Card / `CARD.md` |
| 23 | `RUN-CANTU-WEB-VIDEO-DOC-001` | Document the Video component | **Verify the Video component packet** | Video / `VIDEO.md` |
| 25 | `RUN-CANTU-WEB-NARRATIVE-DOC-001` | Document the Narrative component | **Verify the Narrative component packet** | Narrative / `NARRATIVE.md` |
| 27 | `RUN-CANTU-WEB-CALLOUT-DOC-001` | Document the Callout component | **Verify the Callout component packet** | Callout / `CALLOUT.md` |
| 29 | `RUN-CANTU-WEB-DETAILS-DOC-001` | Document the Details component | **Verify the Details component packet** | Details / `DETAILS.md` |
| 31 | `RUN-CANTU-WEB-ARITHMETIC-DOC-001` | Document the Arithmetic component | **Verify the Arithmetic component packet** | Arithmetic / `ARITHMETIC.md` |
| 33 | `RUN-CANTU-WEB-RULE-DOC-001` | Document the Rule component | **Verify the Rule component packet** | Rule / `RULE.md` |
| 35 | `RUN-CANTU-WEB-SPLIT-DOC-001` | Document the Split component | **Verify the Split component packet** | Split / `SPLIT.md` |
| 37 | `RUN-CANTU-WEB-TABLE-DOC-001` | Document the Table component | **Verify the Table component packet** | Table / `TABLE.md` |
| 39 | `RUN-CANTU-WEB-CONCEPTGRID-DOC-001` | Document the ConceptGrid component | **Verify the ConceptGrid component packet** | ConceptGrid / `CONCEPT-GRID.md` |
| 41 | `RUN-CANTU-WEB-HIERARCHY-DOC-001` | Document the Hierarchy component | **Verify the Hierarchy component packet** | Hierarchy / `HIERARCHY.md` |
| 43 | `RUN-CANTU-WEB-TIMELINE-DOC-001` | Document the Timeline component | **Verify the Timeline component packet** | Timeline / `TIMELINE.md` |
| 45 | `RUN-CANTU-WEB-VISUAL-DOC-001` | Document the Visual component | **Verify the Visual component packet** | Visual / `VISUAL.md` |

El `summary` de cada uno es la plantilla de E.2 con el mismo `X` de la última columna. Ejemplo
completo, el primero, tal como quedó en el canónico:

> **q13 · `RUN-CANTU-WEB-COLUMNS-DOC-001`**
>
> `title`
> - ANTES: `Document the Columns component`
> - DESPUÉS: `Verify the Columns component packet`
>
> `summary`
> - ANTES: `Document the Columns component in its canonical packet that feeds the Component Guide, once the component-doc single-source contract is defined.`
> - DESPUÉS: `Verify the Columns component packet against the component-doc single-source contract, repair its two stale pointers, and refresh its status banner and registry entry together.`
>
> `full_description`
> - ANTES: `Once the component-doc single-source contract is defined, document the Columns component in its canonical packet that feeds the Component Guide.`
> - DESPUÉS: `The Columns packet already exists at docs/components/web/COLUMNS.md and is registered, so what remains is not writing it. Verify the packet against the component-doc single-source contract at docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md, whose Section 6 fixes this duty; repair the two stale pointers it carries, to the certification matrix and to REFERENCE-DRAFT-JSON; and refresh its status banner and its registry entry together. This Run still depends on its implementation run, which remains pending, and it keeps status reference-only.`

**Runs cambiados por este encargo: 17.** Verificado por diferencia `JSON.stringify` run a run
contra el respaldo previo: exactamente esos 17, ningún otro.

---

## BLOQUE F — SUPERFICIES DISJUNTAS DEL HILO PARALELO

Criterio 12. Medidas antes de empezar y otra vez al terminar.

| Superficie | `mtime` antes | `mtime` después | md5 antes | md5 después | ¿Igual? |
|---|---|---|---|---|---|
| `aiw-console/roadmap/roadmap.json` | 2026-07-28 03:33:31 | **igual** | `f299d968fdf781bf31863d696bd9610e` | **igual** | Sí |
| `context/aiw-console/CONTRATO.md` | 2026-07-27 15:48:27 | **igual** | `f77ccec64d99f2048d4bde41638cb228` | **igual** | Sí |
| `context/DECISIONES.md` | 2026-07-27 15:49:11 | **2026-07-28 13:12:24** | `135080acd696a76ec67008722038762e` | `a36e622c73ea6c7c614c6b020b4f317c` | **No — ver abajo** |

**Huella conjunta de `tests/` + `context/aiw-console/handoffs/` + `context/aiw-console/records/`**
(md5 de la lista ordenada de md5 por archivo, excluido este record nuevo):
`bf5a36449aa3444547e9106036e5ae18` antes y `bf5a36449aa3444547e9106036e5ae18` después —
**idéntica**. Ni un test, ni un handoff, ni un record existente cambió.

El roadmap de `aiw-console` **se leyó** para componer el conjunto de ids externos (Bloque B.3);
su md5 idéntico prueba que la lectura no dejó rastro.

**Conteo de records:** 36 al abrir y 37 al cerrar — el que entra es este. Estrena nombre: no hay
ningún `REENCUADRE-*` previo en el directorio.

### F.1 `DECISIONES.md` cambió, y no fue este encargo

`context/DECISIONES.md` pasó de `135080acd696a76ec67008722038762e` a
`a36e622c73ea6c7c614c6b020b4f317c`, con `mtime` **2026-07-28 13:12:24** y 135 193 B. **Este
encargo no lo escribió**, y lo declara sin matizar: sus dos únicas escrituras son las de la tabla
de cabecera —el canónico de Cantu y este record—, y ninguna toca ese archivo.

Lo que lo cambió es **el hilo paralelo sobre `aiw-console`**, y el contenido lo confirma: las
entradas nuevas razonan `CONST §4` en el roadmap de AIW y citan `records/DECISION-ROADMAP-AIW.md`
D4, `[[D-051]]`, `[[D-052]]` y `[[D-053]]` — materia del otro hilo, ajena a los doc-runs de
componente Web de Cantu. La escritura cayó en el intervalo entre la medición de apertura
(2026-07-27 15:49) y la de cierre.

Se deja constancia por la misma razón que la dejó el record de la medición cuando observó a ese
mismo escritor: **superficie disjunta, observada y no tocada**. La línea base de apertura queda
escrita arriba por si la cabina necesita el punto de corte.

---

## BLOQUE G — HALLAZGOS NOMBRADOS, NINGUNO TOCADO

### 1. El run que audita la documentación de conjunto porta la misma cláusula falsa

Criterio 10. **`RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001` (q47) SÍ la porta**, en su
`full_description`:

> «Verify that each component's canonical packet **feeding the Component Guide** exists and follows
> the component-doc single-source contract.»

Es la misma afirmación que la cabina retiró de los 17, en su forma participial. **No se tocó**, por
encargo explícito: este encargo alcanza a los 17, no a su audit. Queda como decisión de cabina si
q47 se re-encuadra en su propio turno — y hay un argumento para agruparlo con el run del Guide,
porque hoy q47 promete verificar un cableado que no existe.

### 2. El run del cableado del Component Guide sigue sin existir — hueco abierto

Este encargo **no lo creó**, por encargo explícito. Su ubicación y sus dependencias son decisión de
cabina, y se toma en el turno siguiente. Lo que queda medido y en pie:

- `ComponentGuide.jsx` (103 985 B) lleva guías **inline y hardcodeadas para 3 de 17** —
  `listGuide`, `headerGuide`, `columnsGuide`— más un `GenericComponentGuide`, y **ni un solo
  `fetch` o import de `docs/`**.
- El contrato de fuente única ya declara el objetivo en su **Sección 5**: «Renders the canonical
  packet; keeps no inline per-component content and no own status», y añade que «The Component
  Guide runtime change … [is a] future run».
- Al sacar la cláusula de los 17, **el roadmap ya no promete ese cableado en ninguna parte**. El
  hueco es real y este record lo nombra para que no se pierda.

### 3. Diez rayas `—` preexistentes en cuatro runs ajenos a los 17

Los `full_description` de q7, q8, q57 y q66 llevan la raya U+2014, 10 en total. No estorban al
validador ni al motor, pero son la única grieta en la regla de ASCII del canónico. Fuera de alcance
aquí — esos cuatro runs no son de los 17 y q66 tiene además su propio encargo pendiente.

### 4. Los dos punteros staleados siguen en los 17 packets

34 ocurrencias en total (2 por packet × 17). Se verificaron y se nombraron; **no se reparó
ninguno**. Repararlos es exactamente el trabajo que los 17 runs ahora describen, y tocar los
packets está fuera de alcance.

---

## BLOQUE H — NO-CLAIMS DE ESTE ENCARGO

Este encargo **reescribe texto de roadmap y nada más**. En concreto:

- **No cambia ningún `status`.** Los 4 `completed` de antes son los 4 de después. **No cierra
  ningún run**, ni siquiera los 17 que toca; cerrarlos es del operador desde la consola global,
  único punto de serialización.
- **No toca `depends_on`, `lane`, `queue_order` ni `barrier`.** 150 aristas antes, 150 después, las
  mismas. Ningún remap: esta edición no inserta ni mueve nada.
- **No toca ninguna identidad** — `run_id`, `phase_id`, `objective_id` intactos (`D-047`).
- **No toca los packets** de `docs/components/web/`, ni `docs_index.json`, ni el contrato de fuente
  única, ni ningún otro documento de `cantu-studio`.
- **No re-encuadra ningún otro run.** Los otros **siete** que el record de la medición nombró en su
  Bloque E — q4, q5, q6, q11, q51, q66, q69 — más **q48**, que aquel record nombró aparte, en su
  Bloque G punto 7, quedan **exactamente como estaban**, verificado campo a campo. Cada uno va en
  encargo propio.
- **No crea el run del Component Guide** ni ningún otro run.
- **No re-emite `.project/`.** El `.project/` de Cantu sigue reflejando el texto anterior hasta que
  el operador lo re-emita desde la consola; este encargo escribe el canónico y nada más.
- **No usó git en ninguna forma.** No levantó servidores. No corrió ninguna suite —ni de Cantu ni
  de `aiw-console`—; el único ejecutable que se corrió es el validador de estado de Cantu, que es
  de solo lectura y se verificó como tal.
- **No afirma nada sobre el contenido de los packets.** Que los 17 existan, midan lo que miden y
  lleven sus ocho secciones es una medición de disco; **no es aceptación, ni QA, ni conformidad con
  el contrato**. Verificar esa conformidad es precisamente el trabajo que los 17 runs ahora
  describen, y sigue pendiente.
- **No declara production readiness** ni certifica ningún componente. El concepto de certificación
  sigue retirado y la matriz sigue siendo la única fuente de status.
- **No resuelve la arista externa** a `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`: se le dio al motor
  como dato para poder editar, y sigue apareciendo como el mismo aviso no bloqueante de siempre.

**Límite declarado del re-encuadre:** el texto nuevo afirma que cada packet «already exists … and
is registered». Eso está verificado en disco para los 17 —existencia, tamaño, ocho secciones— y
contra `docs_index.json` según la medición previa. Lo que el texto **no** afirma, y este encargo
tampoco, es que el packet sea correcto: decirlo es el trabajo del run.
