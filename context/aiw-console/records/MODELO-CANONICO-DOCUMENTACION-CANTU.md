# MODELO CANÓNICO DE DOCUMENTACIÓN DE CANTU — EJECUCIÓN DEL q2 DEL CARRIL DOCUMENTATION

> Encargo de taller ejecutando `RUN-JAME-DOCUMENTATION-CANONICAL-MODEL-001` (`queue_order` 2,
> fase `O2.P2`, objetivo `O2`, carril `DOCUMENTATION`, `status: planned` en el canónico de
> `cantu-studio`). Es la fundación del carril: de él cuelga el q3 (contrato de packet), y de
> q3 los 17 runs de documentación por componente.
>
> Fecha: 2026-07-28. **Git no se usó en ninguna forma** — ni lectura ni escritura; toda
> verificación fue por disco (mtimes, md5, conteos). No se levantó ningún servidor. No se
> re-emitió `.project/`. No se cambió el status de ningún run. No se corrió ninguna suite de
> `aiw-console`. El único comando ejecutado contra el repo fue el validador de solo lectura.
>
> **Archivos escritos por este encargo, y ninguno más:**
>
> | Repo | Archivo | Qué |
> |---|---|---|
> | `cantu-studio` | `docs/docs_management/DOCUMENTATION-CANONICAL-MODEL.md` | **nuevo** — el entregable del run |
> | `cantu-studio` | `.aiw/docs/docs_index.json` | 1 entrada añadida + 1 entrada marcada superseded; nada más cambió dentro del archivo |
> | `aiw-console` | `context/aiw-console/records/MODELO-CANONICO-DOCUMENTACION-CANTU.md` | este record (última escritura de la sesión) |
>
> Todo lo demás que la sesión produjo (respaldo del índice, scripts de verificación) vive en
> el scratchpad, fuera de los repos.

---

## BLOQUE A — EL RUN, VERBATIM DEL CANÓNICO

Leído de `cantu-studio/.aiw/roadmap/roadmap.json`, ruta `objectives[0].phases[1].runs[0]`,
ANTES de escribir nada. Los tres campos de texto, tal cual, sin traducir:

**title:**

> Define the canonical documentation model, IA, and cadence

**summary:**

> Define source roles, authority, freshness rules, the Docs / Governance / Sources
> information architecture, and the documentation update cadence.

**full_description:**

> Define which document classes own operational state, architecture decisions, author
> guidance, API contracts, evidence, governance, provenance, and historical context.
> Establish freshness rules, update responsibilities, indexing metadata, reconciliation
> rules for conflicts, a documentation update cadence, and the Docs / Governance / Sources
> information architecture that the later Project Console projection consumes. This is a
> model and IA definition; it implements no Docs, Governance, or Sources user interface.

Campos restantes leídos: `status: planned` · `depends_on: []` · `lane: DOCUMENTATION` ·
`queue_order: 2`.

**El run pide dos cosas que el ticket no nombraba** — «indexing metadata» y «reconciliation
rules for conflicts» — y se entregaron igual (secciones 6 y 3 del entregable), porque el run
es la autoridad. No se encontró ninguna contradicción material entre ticket y run.

**Contexto que condicionó la ejecución:** este `run_id` ya se ejecutó una vez, el 2026-07-09,
bajo el roadmap anterior (era «JAME», pre-Blueprint). Aquella ejecución produjo el modelo
máquina `.aiw/docs/canonical_documentation_model.json` y su run note (hoy archivada en
`docs/archive/_historical_run_record/project-console/`). El roadmap vigente re-planeó el run
(q2, sin dependencias) contra una realidad documental nueva: el árbol `docs/` reorganizado por
el Documentation Blueprint (aprobado 2026-07-11), con el corpus viejo bajo `docs/archive/`. La
re-ejecución define el modelo para esa realidad y resuelve el destino del artefacto viejo por
supersession (Bloque E).

---

## BLOQUE B — LA RUTA DEL ENTREGABLE, DERIVADA DEL REPO

**Entregable:** `cantu-studio/docs/docs_management/DOCUMENTATION-CANONICAL-MODEL.md`.

Cómo se derivó, paso a paso y de fuentes del propio repo:

1. `AGENTS.md` (línea 88): «`docs/` es la raíz documental canónica». Y (línea 89): el
   estándar de documentación es el Blueprint.
2. `docs/docs_management/DOCUMENTATION-BLUEPRINT.md` es el estándar rector aprobado por el
   operador (2026-07-11). Su Sección 3 define la taxonomía de categorías, y la categoría
   **DOCS MANAGEMENT** se chartea así: «answers "how is documentation itself governed?"». El
   modelo canónico es exactamente eso — documentación sobre cómo se gobierna la documentación
   (clases, dueños, frescura, cadencia, IA) — así que vive en `docs/docs_management/`.
3. El nombre sigue la decisión **OQ-A** del Blueprint (Sección 9: UPPERCASE-KEBAB para docs
   canónicos) y espeja al vecino: `DOCUMENTATION-BLUEPRINT.md` → `DOCUMENTATION-CANONICAL-MODEL.md`.

**Alternativa considerada y descartada:** `docs/governance/`. El orden de autoridad ya tiene
dueño único en `GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md`; el modelo lo referencia sin poseerlo
(regla de fuente única 4d del Blueprint). Meter el modelo ahí habría mezclado «quién manda»
(GOVERNANCE) con «cómo se gobierna el corpus» (DOCS MANAGEMENT).

**Reparto de roles sin duplicación** (cada hecho, un dueño):

| Documento | Posee |
|---|---|
| `DOCUMENTATION-BLUEPRINT.md` | cómo se ESCRIBE un doc (convenciones, plantillas, naming) |
| `DOCUMENTATION-CANONICAL-MODEL.md` (nuevo) | qué clase POSEE cada verdad, frescura, cadencia, metadata de índice, IA de consola |
| `GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md` | el orden de autoridad y el no-claims |
| `OPERATIONS-RUN-PROTOCOL.md` | el ciclo de vida de los runs y los human gates |

---

## BLOQUE C — LA REGLA DE IDIOMA: CUÁL SE APLICÓ Y DE DÓNDE SALE

**Aplicada: inglés, ASCII puro.** El entregable tiene 0 bytes no-ASCII, verificado.

La regla es del propio repo, con cita exacta:

- `docs/docs_management/DOCUMENTATION-BLUEPRINT.md`, **Sección 4f «Language», líneas
  234-235**: «English only inside the repo, filenames included, no accented characters in
  new artifacts.»
- Misma norma, **Sección 9 «DECIDED», OQ-D, líneas 639-642**: «Documentation is written in
  English; Spanish is allowed only inside clearly delimited examples, fixtures, and lesson
  citations.»

Descartes documentados:

- `AGENTS.md`, línea 578: «Responde en español» — es regla de **comunicación del executor en
  sesión**, no de artefactos del repo. (Este encargo respondió en español en sesión y
  escribió el artefacto en inglés: las dos reglas conviven.)
- `CLAUDE.md`: réplica legacy de la misma regla de comunicación; secundario a `AGENTS.md`.
- `CANTU_STUDIO_CONTEXT.md` (aiw-console): no declara regla de idioma de documentación.

**Este record va en español** por la convención uniforme del taller: los 31 records
existentes en `context/aiw-console/records/` están en español. El record es artefacto del
taller de aiw-console, no documentación del repo cantu-studio; la regla 4f no lo alcanza.

---

## BLOQUE D — QUÉ ENTREGA EL DOCUMENTO, MAPEADO 1:1 AL TEXTO DEL RUN

139 líneas, 8 882 bytes, 0 bytes no-ASCII. Cumple el Blueprint: tope de 250 líneas (4b/4h.D),
banner de status 4a (`Status: Draft`), sin números de versión manuales ni emoji, rutas
repo-relativas completas (4c), listas con término en negrita + dos puntos (4j), tablas para
4+ pares, sin Mermaid (4k), sin lenguaje nuevo de certificación (concepto retirado según
`CANTU_STUDIO_CONTEXT.md`; la única aparición es la negación estándar del no-claims y la cita
del filename legacy de la matriz).

| Exigencia del run (verbatim) | Dónde queda |
|---|---|
| «which document classes own operational state, architecture decisions, author guidance, API contracts, evidence, governance, provenance, and historical context» | Sección 2, tabla de ownership: los 8 nombrados + orientación, vistas de arquitectura, proceso de runs, status de componentes, ordering, registro; y la lista de proyecciones derivadas que nunca son dueñas |
| «freshness rules» | Sección 4: dos niveles (banner `Last verified` + `freshness_status` del registro), staleness declarada nunca inferida, historia congelada exenta |
| «update responsibilities» | Sección 5: la responsabilidad sigue al ownership; el run que cambia la realidad debe la actualización; el operador aprueba y cierra |
| «indexing metadata» | Sección 6: mínimo del validador (path existente, freshness_status, source_role) + navegación (nav_tier, default_visible, subconjunto propio) + ciclo de vida + trazabilidad; vocabulario existente antes que términos nuevos |
| «reconciliation rules for conflicts» | Sección 3: real files win · el dueño gana · conflictos preservados, no aplanados · reconciliación solo por run acotado |
| «a documentation update cadence» | Sección 5: cadencia **event-driven y roadmap-first** (no de calendario): actualización en el mismo run, doc-run por componente tras su implementación según la cola, re-verificación al releer, deep audit como horizonte del operador |
| «the Docs / Governance / Sources information architecture that the later Project Console projection consumes» | Sección 7: las tres superficies read-only, qué renderiza cada una, de qué clases lee, y las cuatro reglas (read-only, proyección-no-verdad, sin semántica de aprobación, conflictos visibles) |
| «This is a model and IA definition; it implements no Docs, Governance, or Sources user interface.» | Secciones 1 y 9: contrato sin UI; el 9 es el no-claims completo |

**El límite con q3 se respetó:** la Sección 8 fija solo dónde viven los packets
(`docs/components/`) y que son single-source; las secciones, el schema y el cableado de
consumidores se declaran explícitamente trabajo del run siguiente del carril. **El modelo NO
necesitó el packet para cerrar** — la duda que el ticket anticipaba no se materializó.

La cadencia se derivó del modelo operativo real del repo (AGENTS.md regla 7 de pipeline,
disciplina de carriles, cola del roadmap, y el deep audit q67 diferido a propósito por el
operador), no se inventó una cadencia de calendario que ningún documento del repo respalda.

---

## BLOQUE E — EL ÍNDICE: POR QUÉ SE ACTUALIZÓ Y QUÉ SE TOCÓ EXACTAMENTE

**El repo sí exige el registro.** Tres fuentes: `AGENTS.md` línea 89 («`.aiw/docs/docs_index.json`
es el registro documental vigente»); la práctica uniforme (los 45 documentos canónicos vivos
no-asset están todos registrados — verificado archivo por archivo contra disco); y el
Definition of Done del modelo previo, que exige registro aditivo de cada artefacto canónico
producido.

**Tensión declarada y reconciliada:** `OPERATIONS-RUN-PROTOCOL.md` §8 dice «Unregistered by
default: a new doc is written first; a later indexing run registers it in docs_index». Ese
guardrail nació para la ola paralela de docs (varios runs escribiendo docs a la vez, un solo
indexing run al final — single-writer del índice). Aquí no hay ola: este es el único run del
carril, el ticket autoriza expresamente `docs_index.json` como superficie de escritura, y no
hay escritor concurrente (verificado por mtime: el índice llevaba desde ayer 13:55 sin
tocarse). Se registró en el mismo run, y el modelo (Sección 5) deja la regla reconciliada:
un escritor del índice a la vez; las olas paralelas difieren a su indexing run designado.

**Cambio 1 — entrada nueva** (insertada junto a la del Blueprint, para que el par de DOCS
MANAGEMENT quede contiguo): `path: docs/docs_management/DOCUMENTATION-CANONICAL-MODEL.md`,
`source_role: documentation_canonical_model`, `canonicality: canonical_active`,
`nav_tier: primary`, `default_visible: true`, `ia_bucket: docs`,
`freshness_status: DRAFT_PENDING_OPERATOR_CONTENT_QA_2026_07_28`,
`operator_review_status: pending`, `retention_class: canonical`, run de origen este mismo.
Todo el vocabulario es el ya en uso por el registro (patrón de las entradas de START-HERE y
GOVERNANCE); no se acuñó ningún término.

**Cambio 2 — supersession del modelo JAME-era**: la entrada de
`.aiw/docs/canonical_documentation_model.json` pasa de `canonical_active` /
`active_not_archived` / `nav_tier: secondary` a **`superseded` / `superseded_preserved` /
`nav_tier: history`**, con la nota ampliada apuntando al sucesor. Es la mecánica que el
Blueprint 4g ordena cuando un doc nuevo absorbe el rol de uno viejo (dos `canonical_active`
con el mismo `source_role` habrían violado la fuente única 4d), y sigue el precedente de la
entrada de `CLAUDE.md`. **El archivo JSON viejo NO se editó** — no está en la superficie de
escritura del encargo y su formato no tiene banner; la supersession la porta el registro, y
su vocabulario controlado sigue siendo válido para leer las entradas existentes (declarado en
ambas notas y en el banner `Supersedes:` del doc nuevo).

**Mecánica de la edición, verificada en disco:**

| | valor |
|---|---|
| respaldo previo (scratchpad, fuera del repo) | md5 `c73d1d62379146141e32e46830936630`, 299 259 bytes, verificado contra el canónico |
| serialización | `JSON.stringify(·, null, 2)` + CRLF + newline final — roundtrip byte-exacto verificado ANTES de tocar |
| índice después | md5 `150c4551e79929064349c5100a3c88ae`, 302 284 bytes |
| diff a nivel de entradas | **1 añadida, 1 modificada, 0 eliminadas**; las otras 139 byte-idénticas; claves top-level intactas |
| bytes no-ASCII | 3 → **3** (delta 0, explicado: las adiciones son ASCII puro) |
| entradas | 140 → 141 · primary-visible 53 → 54 de 141 (sigue siendo subconjunto propio, como exige el validador) |

---

## BLOQUE F — EL VALIDADOR, VERDE, POR LA VÍA QUE NO ESCRIBE

`node tools/project-console/validate-project-console-state.mjs`, corrido antes y después:

| | resultado |
|---|---|
| antes (línea base) | `EXIT 0` — «7 objectives / 28 phases / 71 runs»; Docs indexed **140**; primary-visible 53 of 140 |
| después | `EXIT 0` — «7 objectives / 28 phases / 71 runs; queue groups needs_human_decision=0 now=0 ready_next=9 later=60 history=2»; Docs indexed **141**; primary-visible 54 of 141 |

Las tres cifras del roadmap **no se movieron**. El único aviso, antes y después, palabra por
palabra el no bloqueante de siempre: la arista externa de
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` a `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`,
que vive en el roadmap de aiw-console. Ningún aviso nuevo.

---

## BLOQUE G — STATUS DECLARADO DEL RUN, Y `.project/` SIN RE-EMITIR

**El run no se cerró ni se tocó.** `cantu-studio/.aiw/roadmap/roadmap.json` conserva su mtime
previo a la sesión (2026-07-27 23:36) y el run sigue `planned`, sin `progress` y sin
`closeout_result`, como exige el modelo (un ticket declara, la consola cierra).

**Status declarado:** el trabajo del run está ejecutado y verificado; el run debe quedar en
**`completed`**, cerrado por el operador desde la consola global tras su QA de contenido del
entregable. Si esa QA pide cambios, lo que corresponde es una ronda de corrección dentro del
run, no otro status. El doc mismo queda `Status: Draft` hasta esa QA — el mismo patrón con el
que cerraron los runs que produjeron `START-HERE.md` y el doc de GOVERNANCE (el cierre del run
y la aprobación de contenido del doc son eventos distintos, y así lo registra el índice:
`operator_review_status: pending`).

**`.project/` de cantu-studio no se re-emitió** — es del operador, por el botón de la consola
global. Los seis artefactos conservan su emisión de hoy 01:14; consecuencia visible y
esperada: la vista Docs de la consola mostrará 140 documentos (sin el modelo nuevo) hasta la
próxima re-emisión. No es un fallo.

**Un escritor externo, observado y no tocado:** `*/.project/git_history.json` (en cantu-studio
Y en aiw-console — repo este último donde el encargo no escribió nada) se regenera solo
mientras corre el servidor de consola del operador (`source=local_git_autosync`, dice el
propio validador). Es churn del autosync, ajeno a este encargo; se deja constancia igual que
el record de la partición dejó constancia de su sesión paralela.

---

## BLOQUE H — SUPERFICIES DISJUNTAS Y LA SUITE QUE NO SE CORRIÓ

**Antes de escribir** se midió la actividad del hilo paralelo (mtimes de las últimas 6 h en
los tres repos): tocaba `aiw-console/roadmap/roadmap.json`, sus tests, su consola, sus
handoffs, records recientes y `.project/` — **ninguna** de mis tres superficies. El índice de
cantu llevaba desde 2026-07-27 13:55 sin tocarse.

**Después de escribir**, el barrido de los últimos 45 minutos sobre los tres repos devuelve
exactamente: mis dos archivos de cantu-studio + el churn del autosync ya declarado. (Este
record se escribe después de ese barrido: es la última escritura de la sesión y está en la
tabla de cabecera.)

**No se tocó nada de la lista prohibida:** ni `roadmap/roadmap.json` de aiw-console (md5 no
requerido: mtime fuera de mi ventana de escritura y cero escrituras mías en ese repo salvo
este record), ni handoffs, ni tests, ni `CONTRATO.md`, ni `DECISIONES.md`, ni ningún record
existente. **No se corrió ninguna suite de aiw-console**, ni completa ni parcial; el único
proceso ejecutado contra repo alguno fue el validador de cantu-studio (solo lectura) y
scripts de verificación en el scratchpad.

---

## BLOQUE I — HALLAZGOS PARA EL OPERADOR (ninguno bloqueante, ninguno ejecutado)

1. **El packet no hizo falta** — la Sección 8 del modelo cierra sin definir ni una sección del
   packet. q3 tiene el campo íntegro.
2. **Referencias staleadas en docs vigentes** (pre-existentes, fuera de alcance): 
   `OPERATIONS-STATE.md` §5 apunta a `docs/DOCUMENTATION-BLUEPRINT.md` y
   `docs/DOCS_RETENTION_ARCHIVE_POLICY.md` (rutas pre-reorganización; hoy
   `docs/docs_management/…` y `docs/archive/…`), y `GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md` §1
   apunta a `docs/CANONICAL_SOURCES.md` (hoy `docs/archive/CANONICAL_SOURCES.md`). Materia
   para un run de refresh, no de este.
3. **Entradas del índice con paths ya archivados físicamente** (`DOCUMENT_CLASSES.md`,
   `CANONICAL_SOURCES.md`, `DOCS_RETENTION_ARCHIVE_POLICY.md` y familia) siguen con
   `archive_status: active_not_archived` — la reorganización física movió los archivos y
   actualizó los paths pero no re-juzgó su clasificación. Encaja en el deep audit (q67) o en
   un run acotado de re-clasificación.
4. **La tensión «Unregistered by default» vs registro en-run** quedó reconciliada en la
   Sección 5 del modelo (Bloque E). Si el operador prefiere la otra política como absoluta,
   es una frase a cambiar en el modelo cuando haga su QA.
5. **El `full_description` de los 17 doc-runs sigue siendo una frase** — correcto y a
   propósito; su reescritura depende de q3 (ya lo dejó dicho el record de la partición).

---

## BLOQUE J — NO-CLAIMS DE ESTE ENCARGO

Este encargo define un modelo y registra dos entradas de índice. **No** afirma Human QA ni
aceptación de contenido (`NOT_HUMAN_QA_ACCEPTED_YET`); **no** certifica nada de nadie (el
concepto está retirado); **no** completa la migración de docs por componente
(`NOT_COMPONENT_DOC_MIGRATION_COMPLETED`); **no** autoriza migración física alguna
(`NOT_PHYSICAL_MIGRATION_AUTHORIZED`); **no** cierra D1; **no** declara production readiness;
**no** avanza, cierra ni re-emite nada del roadmap ni de `.project/`; y **no** decide la
arista pendiente del q63 ni ningún barrier. El cierre del run es del operador, desde la
consola global, que es el único punto de serialización.
