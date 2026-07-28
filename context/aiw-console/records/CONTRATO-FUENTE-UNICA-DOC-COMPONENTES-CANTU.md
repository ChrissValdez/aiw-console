# CONTRATO DE FUENTE ÚNICA DE DOC POR COMPONENTE DE CANTU — EJECUCIÓN DEL q3 DEL CARRIL DOCUMENTATION

> Encargo de taller ejecutando `RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001`
> (`queue_order` 3, fase `O2.P2`, objetivo `O2`, carril `DOCUMENTATION`, `status: planned` en
> el canónico de `cantu-studio`). Es el segundo eslabón del carril: depende del q2 (modelo
> canónico, entregado) y de él cuelgan 18 runs — los 17 doc-runs de componentes Web y el q9
> de estandarización de contratos.
>
> Fecha: 2026-07-28. **Git no se usó en ninguna forma** — ni lectura ni escritura; toda
> verificación fue por disco (mtimes, md5, conteos). No se levantó ningún servidor. No se
> re-emitió `.project/`. No se cambió el status de ningún run. No se corrió ninguna suite de
> `aiw-console`. El único comando ejecutado contra el repo fue el validador de solo lectura
> (dos veces: antes y después).
>
> **Archivos escritos por este encargo, y ninguno más:**
>
> | Repo | Archivo | Qué |
> |---|---|---|
> | `cantu-studio` | `docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md` | **nuevo** — el entregable del run (123 líneas, 0 bytes no-ASCII) |
> | `cantu-studio` | `.aiw/docs/docs_index.json` | 1 entrada añadida + 1 entrada marcada superseded; nada más cambió dentro del archivo |
> | `aiw-console` | `context/aiw-console/records/CONTRATO-FUENTE-UNICA-DOC-COMPONENTES-CANTU.md` | este record (última escritura de la sesión) |
>
> Todo lo demás que la sesión produjo (respaldo del índice, script de edición, snapshot de
> mtimes) vive en el scratchpad, fuera de los repos.

---

## BLOQUE A — EL RUN, VERBATIM DEL CANÓNICO

Leído de `cantu-studio/.aiw/roadmap/roadmap.json` (líneas 51-62; `objectives[0].phases[1].runs[1]`)
ANTES de escribir nada. Los tres campos de texto, tal cual, sin traducir:

**title:**

> Define the component-doc single-source contract

**summary:**

> Define one canonical structured component-doc packet consumed by both the Editor Component
> Guide and the Project Console Docs view.

**full_description:**

> Define a component-doc single-source strategy so each component's documentation lives in
> one canonical structured packet that is rendered by the Editor Component Guide and by the
> Project Console Docs view, instead of being duplicated across guides and dashboards. Encode
> the preferred model as future work: Markdown for narrative docs, structured JSON/YAML
> component-doc packets for component docs, governance and no-claims JSON for governance, a
> sources/provenance manifest for Sources, and docs_index as a navigation and freshness
> registry rather than a content body. This Run defines the contract and its consumers only;
> it does not implement packet schema files, the Component Guide runtime, or the Docs
> renderer.

Campos restantes leídos: `status: planned` · `depends_on: [RUN-JAME-DOCUMENTATION-CANONICAL-MODEL-001]` ·
`lane: DOCUMENTATION` · `queue_order: 3`.

**Ticket vs run:** ninguna contradicción material. Todo lo que el run pide lo anticipó el
ticket; el run no pidió nada extra que hubiera que entregar sin nombre.

**Discrepancia de estado anticipada, confirmada:** el q2 predecesor figura `status: planned`
en el canónico (línea 47) aunque su entregable existe en disco
(`docs/docs_management/DOCUMENTATION-CANONICAL-MODEL.md`, 2026-07-28 02:06) con su record. El
cierre es del operador y no se ha ejecutado. **Procedí sobre el entregable, sin tocar su
status**, como ordenaba el ticket.

**Contexto que condicionó la ejecución:** este `run_id` ya se ejecutó una vez, el 2026-07-09,
bajo el roadmap anterior (era JAME, pre-Blueprint, entonces `queue_order` 8). Aquella
ejecución produjo el contrato máquina `.aiw/docs/component_doc_single_source_contract.json`
(557 líneas de JSON con 17 secciones controladas) y su run note (hoy en
`docs/archive/_historical_run_record/project-console/`). El roadmap vigente re-planeó el run
contra una realidad nueva — y la realidad cambió de verdad entre las dos ejecuciones (Bloque
B). La re-ejecución define el contrato para hoy y resuelve el artefacto viejo por
supersession, el mismo patrón que q2 aplicó a su modelo JAME-era.

---

## BLOQUE B — MEDIR ANTES DE DEFINIR: LO QUE HAY EN DISCO

### B.1 `docs/components/` hoy

**Los packets ya existen.** `docs/components/web/` contiene 17 archivos Markdown, uno por
componente Web (2 276-3 161 bytes, 65-73 líneas cada uno), todos con mtime 2026-07-22 19:01.
Producidos por `RUN-CANTU-DOCS-PARALLEL-COMPONENTS-WEB-001` y registrados por
`RUN-CANTU-DOCS-PARALLEL-WAVE-INDEXING-001` (17 entradas en el índice:
`source_role: component_doc_web`, `canonicality: canonical_active`, `nav_tier: primary`,
banner `Status: Draft | Last verified: 2026-07-12`). Estructura **uniforme 17/17**, verificada
por conteo: banner 4a + tabla de metadata (Draft kind / Engine renderer / Classification /
puntero de certificación) + 8 secciones exactas: What it is · When to use · Author fields ·
Layout compatibility · Example · Guardrails · Similar components · Status and evidence. No
existe `docs/components/slides/` (diferido a O3 según Blueprint Sección 6).

**Esto invierte el supuesto de la era JAME:** el contrato de 2026-07-09 modelaba packets
*futuros* («creates NO component-doc packet files»); hoy el contrato se define DESPUÉS de sus
17 instancias. Por eso el entregable codifica la forma medida en disco como vinculante, en vez
de inventar una forma rival que dejaría 17 archivos fuera de contrato el día uno.

### B.2 Documentación existente de los 17 componentes, por capa

| Capa | Dónde | Estado |
|---|---|---|
| Packets canónicos | `docs/components/web/*.md` (17) | Vigentes, Draft, registrados, uniformes |
| Guía legacy | `docs/archive/author-lite/components/AUTHOR_COMPONENT_GUIDE.md` | Archivada (quarry para packets según Blueprint Sección 7) |
| Contratos técnicos legacy | `docs/archive/author-lite/components/WEB_AUTHOR_FACING_CONTRACTS.md` | Archivado; solo cubría list/video/details/rule |
| Status (fuente única) | `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` | «Legacy path with a live role» (modelo q2 §2) — sigue siendo el dueño del status |
| Evidencia PASS | `docs/archive/author-lite/components/PASS-*.md` y `docs/archive/author-lite/sandbox/` | Congelada, citable por filename |
| Proyección máquina | `.aiw/state/component_status.json` | 16 componentes — **columns falta** (hallazgo 6) |
| Contrato máquina JAME-era | `.aiw/docs/component_doc_single_source_contract.json` | Superseded por este encargo (vía registro; el JSON no se editó) |

### B.3 Los dos consumidores que el run nombra — medidos, no supuestos

**Consumidor 1 — Editor Component Guide: EXISTE.**
`tools/author-lite/editor-ui/src/features/editor/components/preview/ComponentGuide.jsx`
(2 608 líneas, montado desde `RightPanel.jsx`). **Hoy no consume ningún packet ni ningún
archivo de `docs/`:** el contenido de guía está hardcodeado inline en el JSX, en español,
para **3 de 17 componentes** (`listGuide` línea 42, `headerGuide` 169, `columnsGuide` 291),
cada uno con status inline hardcodeado — `statusLabel: 'Certificado'` en list;
`'COMPONENT_CERTIFIED / DOCS_APPROVED / NOT_WEB_CERTIFIED'` en header y columns. Existe
además `tools/author-lite/scripts/checkComponentGuideTextIntegrity.cjs`, que protege la
integridad de ese texto inline. Es exactamente la duplicación (y el claim manual de status)
que el run ataca.

**Consumidor 2 — Project Console Docs view: EXISTE.**
`docs/project-console/index.html` + `assets/project-console.js` (5 631 líneas). Hoy consume
`.aiw/docs/docs_index.json` directamente (constante `docsIndex`, línea 14) como registro de
navegación/frescura, obtiene los cuerpos por la ruta repo-relativa registrada y los renderiza
con un renderer Markdown-lite conservador, read-only y sin semántica de aprobación (comentario
de cabecera del bloque Docs, líneas 2004-2018). Los 17 packets ya están mapeados por ruta
exacta a la categoría COMPONENTS del árbol de navegación. **Es decir: la Docs view ya rinde
los packets como cuerpos; el Component Guide todavía no consume nada.** La asimetría entre
ambos consumidores es el corazón medido del contrato (Sección 5 del entregable).

Nota de estado: ese rendering de cuerpos es trabajo JAME-era del q66
(`RUN-JAME-PROJECT-CONSOLE-DOCS-V3-001`), que en el canónico vigente figura `planned` — mismo
patrón de re-planeo que q2 y q3. Se declara como medición; no se tocó.

---

## BLOQUE C — CONSISTENCIA CON EL MODELO DE q2, CAMPO A CAMPO

El run enuncia un modelo preferido por clase. Contrastado contra las Secciones 2, 6 y 7 de
`docs/docs_management/DOCUMENTATION-CANONICAL-MODEL.md`, con cita de ambos lados:

**1. «Markdown for narrative docs»** — CONSISTENTE. El modelo §2 ubica las clases narrativas
en `docs/` y todas son `.md` en disco (formato implícito en el modelo, explícito en el run).

**2. «structured JSON/YAML component-doc packets for component docs»** — DIVERGENCIA
DECLARADA, pero no entre run y modelo: el modelo §2 dice solo «Author guidance, per component
| COMPONENTS | docs/components/web/, one packet per component» — **silente en formato** — y el
disco tiene 17 packets **Markdown**. La divergencia es preferido-futuro (JSON/YAML) vs
presente-en-disco (Markdown). El run mismo la resuelve al ordenar «Encode the preferred model
as future work»: el entregable fija Markdown como contrato vigente y JSON/YAML como futuro por
run acotado (Sección 4), sin contradecir al modelo.

**3. «governance and no-claims JSON for governance»** — DIVERGENCIA PARCIAL DECLARADA. Modelo
§2: «Governance and no-claims | GOVERNANCE | docs/governance/GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md
and .aiw/guardrails/» — dueño Markdown MÁS capa JSON (`.aiw/guardrails/no_claims.json` y
`project_guardrails.json` existen). El run prefiere JSON puro como futuro. El entregable
refleja hoy mixto / futuro JSON; el ownership del modelo no se mueve.

**4. «a sources/provenance manifest for Sources»** — DIVERGENCIA-COMO-ADICIÓN DECLARADA. El
modelo no nombra ningún manifest: §2 da la procedencia a los ledgers («machine ledgers |
.aiw/ledgers/git_provenance.jsonl and its sibling ledgers, append-only») y §7 hace leer a
Sources de «.aiw/ledgers/, docs/archive/, and run records». En disco no existe ningún manifest
(solo los 5 ledgers). El entregable lo codifica como agregador futuro **por referencia**, que
no desplaza el ownership de los ledgers («The manifest aggregates; it does not own»).

**5. «docs_index as a navigation and freshness registry rather than a content body»** —
CONSISTENTE casi palabra por palabra con el modelo §6: «It is not a content body, and an entry
is never a status claim about its subject».

**Extra (§7):** la fila Docs del modelo lee «component packets once the packet contract
exists» — este encargo hace existir ese contrato; la condición pendiente del modelo queda
satisfecha sin editarlo.

---

## BLOQUE D — EL ENTREGABLE: RUTA DERIVADA, IDIOMA, Y MAPEO 1:1 AL RUN

**Entregable:** `cantu-studio/docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md`.

Derivación de la ruta, de fuentes del propio repo:

1. `AGENTS.md` línea 88: «`docs/` es la raíz documental canónica»; línea 89: el estándar es el
   Blueprint.
2. Blueprint Sección 3, charter de **DOCS MANAGEMENT**: «answers "how is documentation itself
   governed?"». Un contrato sobre cómo se estructura, quién posee y quién consume la
   documentación de componentes es docs-sobre-docs. Y el charter de **COMPONENTS** prohíbe
   expresamente «cross-component theory» — el contrato NO puede vivir en `docs/components/`.
3. Precedente q2: el modelo vive en `docs/docs_management/` y su Sección 8 delega «the
   packet's sections, schema, and consumer wiring» al run siguiente — este documento es su
   continuación natural y vecino de estante.
4. Nombre: UPPERCASE-KEBAB por OQ-A (Blueprint Sección 9), espejando el `run_id`:
   `COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md`.

**Idioma:** inglés ASCII puro — Blueprint Sección 4f (líneas 234-235: «English only inside the
repo, filenames included, no accented characters in new artifacts») y OQ-D. Verificado: 0
bytes no-ASCII. Este record va en español por la convención uniforme del taller (los 32
records existentes lo están); es artefacto de `aiw-console`, no del repo, y la 4f no lo
alcanza.

**Cumplimiento Blueprint como artefacto:** 123 líneas (tope 250, 4b/4h.D) · banner de status
4a con `Supersedes:` apuntando al contrato JAME-era · sin números de versión manuales · sin
emoji · rutas repo-relativas completas (4c) · listas término-en-negrita + dos puntos (4j) ·
tablas para 4+ pares · sin Mermaid (4k).

| Exigencia del run (verbatim) | Dónde queda en el entregable |
|---|---|
| «each component's documentation lives in one canonical structured packet» | Sección 2: un packet por componente, los 17 nombrados, dueño de la guía de autor |
| «rendered by the Editor Component Guide and by the Project Console Docs view» | Sección 5: los dos consumidores, medidos hoy y con target; reglas read-only / projection / no-approval / **no-parallel-store** |
| «instead of being duplicated across guides and dashboards» | Secciones 2 y 5: «Duplication is drift»; el contenido inline del Guide declarado drift a retirar por run acotado |
| «Encode the preferred model as future work: Markdown ... JSON/YAML ... governance JSON ... sources/provenance manifest ... docs_index as registry» | Sección 4: tabla clase por clase con «Today on disk» vs «Preferred model (future work)», más las dos reglas (el manifest agrega sin poseer; el packet futuro conserva este contrato) |
| «This Run defines the contract and its consumers only; it does not implement packet schema files, the Component Guide runtime, or the Docs renderer.» | Banner, Sección 1 y Sección 7 (no-claims); la Sección 5 remite runtime y renderer a runs futuros |

Más allá del texto del run, el contrato entrega lo que la Sección 8 del modelo le delegó:
secciones del packet (tabla de 8 secciones vinculante + perfil completo 5.5 como techo),
disciplina de campos (manual / derivado-de-archivos-reales / reference-only / prohibido,
comprimida del contrato JAME-era), y el deber de actualización por run (Sección 6) que los 17
doc-runs y el q9 consumen.

---

## BLOQUE E — EL ÍNDICE: QUÉ SE TOCÓ EXACTAMENTE

Registro en el mismo run: la regla quedó reconciliada por el modelo §5 (un escritor del índice
a la vez; este es el único run del carril en ventana — el índice llevaba desde q2, 02:08:10,
sin tocarse, verificado por mtime) y el ticket autoriza expresamente la superficie.

**Cambio 1 — entrada nueva**, insertada inmediatamente después de la del modelo de q2 para que
el trío DOCS MANAGEMENT (Blueprint · modelo · contrato) quede contiguo:
`path: docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md`,
`source_role: component_doc_single_source_contract` (vocabulario YA en uso por el registro —
es el rol de la entrada JAME-era; mismo patrón q2, que reutilizó `documentation_canonical_model`),
`canonicality: canonical_active`, `nav_tier: primary`, `default_visible: true`,
`ia_bucket: docs`, `freshness_status: DRAFT_PENDING_OPERATOR_CONTENT_QA_2026_07_28`,
`operator_review_status: pending`, `retention_class: canonical`. Ningún término acuñado.

**Cambio 2 — supersession de la entrada JAME-era**
(`.aiw/docs/component_doc_single_source_contract.json`): `canonical_active` /
`active_not_archived` / `nav_tier: primary` / `default_visible: true` pasa a **`superseded` /
`superseded_preserved` / `nav_tier: history` / `default_visible: false`**, con
`freshness_status: SUPERSEDED_BY_BLUEPRINT_ERA_CONTRACT_2026_07_28` y la nota ampliada
apuntando al sucesor. Sus `conflict_refs` (5) se conservan intactos — los conflictos siguen
preservados y sin resolver. Mecánica calcada de la supersession que q2 aplicó a su modelo
JAME-era (Blueprint 4g). **El archivo JSON viejo NO se editó**: la supersession la porta el
registro.

**Mecánica de la edición, verificada en disco:**

| | valor |
|---|---|
| respaldo previo (scratchpad, fuera del repo) | md5 `150c4551e79929064349c5100a3c88ae`, 302 284 bytes — idéntico al md5 de cierre que declaró q2 (cadena de custodia intacta) |
| serialización | `JSON.stringify(·, null, 2)` + CRLF + newline final — roundtrip byte-exacto verificado ANTES de tocar (pre-flight del script; aborta si no) |
| índice después | md5 `674fe67b3f816218dcef0db9e228db82`, 305 385 bytes |
| diff a nivel de entradas | **1 añadida, 1 modificada, 0 eliminadas**; las otras 140 byte-idénticas; claves top-level intactas (`last_component_doc_contract_run` ya nombraba este `run_id` desde la era JAME y no necesitó cambio) |
| bytes no-ASCII | 3 → **3** (delta 0; los 3 son un em-dash preexistente en una nota ajena; mis adiciones son ASCII puro) |
| entradas | 141 → 142 · primary-visible **54 → 54 de 142** (neto 0: +1 la nueva, −1 la JAME-era degradada a history; sigue siendo subconjunto propio) |

---

## BLOQUE F — EL VALIDADOR, VERDE, POR LA VÍA QUE NO ESCRIBE

`node tools/project-console/validate-project-console-state.mjs`, corrido antes y después:

| | resultado |
|---|---|
| antes (línea base) | `EXIT 0` — «7 objectives / 28 phases / 71 runs; queue groups needs_human_decision=0 now=0 ready_next=9 later=60 history=2»; Docs indexed **141**; primary-visible 54 of 141 |
| después | `EXIT 0` — mismas cifras de roadmap, palabra por palabra; Docs indexed **142**; primary-visible 54 of 142 |

Las tres cifras del roadmap **no se movieron**. El único aviso, antes y después, idéntico: el
no bloqueante de siempre — la arista externa de
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` a `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`,
que vive en el roadmap de `aiw-console`. Ningún aviso nuevo.

---

## BLOQUE G — STATUS DECLARADO DEL RUN, Y `.project/` SIN RE-EMITIR

**El run no se cerró ni se tocó.** `cantu-studio/.aiw/roadmap/roadmap.json` conserva md5
(`6d6951370dc581cc5a21cf7cd3ce287f`) y mtime (2026-07-27 23:36:30) previos a la sesión; el run
sigue `planned`, sin `progress` y sin `closeout_result`.

**Status declarado:** el trabajo del run está ejecutado y verificado; el run debe quedar en
**`completed`**, cerrado por el operador desde la consola global tras su QA de contenido. El
doc queda `Status: Draft` hasta esa QA — mismo patrón que q2 y que los runs de START-HERE y
GOVERNANCE (cierre del run y aprobación de contenido son eventos distintos; el índice lo
registra con `operator_review_status: pending`). Nota de secuencia: el cierre de q3 presupone
el de q2, su dependencia — ambos cierres son del operador, en su orden.

**`.project/` de cantu-studio no se re-emitió** — los seis artefactos conservan su emisión de
hoy 01:14. Consecuencia visible y esperada: el snapshot emitido para la consola global sigue
sin el modelo de q2 ni este contrato hasta la próxima re-emisión del operador (la consola
local de `docs/project-console/` sí lee `.aiw/docs/docs_index.json` en vivo y verá 142). No es
un fallo.

---

## BLOQUE H — SUPERFICIES DISJUNTAS, VERIFICADAS ANTES Y DESPUÉS

**Antes de escribir** (barrido de 6 h en ambos repos): la actividad del hilo paralelo de
`aiw-console` terminó ~01:10 (su roadmap 00:53:48, tests ~00:55, handoffs 01:02-01:09,
records 00:15-01:10); q2 escribió sus tres archivos 02:06-02:11; después, silencio. El índice
de cantu llevaba desde 02:08:10 (q2) sin tocarse — sin escritor concurrente en mi ventana.

**Después de escribir**, el barrido de los últimos 30 minutos sobre ambos repos devuelve
exactamente mis dos archivos de `cantu-studio` (más este record, escrito tras el barrido y
declarado en la tabla de cabecera). Ni siquiera hubo churn de autosync en la ventana (ningún
`git_history.json` se movió: el servidor del operador no corría).

**Md5 antes/después de la lista prohibida — los 8 idénticos:** `aiw-console/roadmap/roadmap.json`
(`e620f070...`), `context/aiw-console/CONTRATO.md` (`f77ccec6...`), `context/DECISIONES.md`
(`135080ac...`), los dos handoffs (`7d75b27e...`, `27e624da...`), más — del lado cantu — el
canónico (`6d695137...`), el modelo de q2 (`bb048b89...`) y el Blueprint (`d87bf64e...`).
Ningún record existente tocado (el mío es nombre nuevo entre los 32). **Ninguna suite de `aiw-console` se corrió.**

---

## BLOQUE I — HALLAZGOS PARA EL OPERADOR (ninguno bloqueante, ninguno ejecutado)

1. **El contrato llegó después de sus instancias.** Los 17 packets existen desde 2026-07-12
   (wave paralela). El entregable codifica la forma medida como vinculante en vez de inventar
   una rival. La era JAME asumía packets futuros; ese supuesto quedó invertido.
2. **Punteros staleados DENTRO de los 17 packets** (pre-existentes, fuera de alcance): todos
   citan la matriz en `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` y el
   schema en `docs/REFERENCE-DRAFT-JSON.md`; las rutas reales hoy son
   `docs/archive/author-lite/components/...` y `docs/reference/REFERENCE-DRAFT-JSON.md`. La
   misma familia de drift post-reorganización que el hallazgo 2 de q2 — también la portan
   `AGENTS.md` (líneas 96-97) y el propio Blueprint (Secciones 3, 5.5 y 6). Materia natural de
   los 17 doc-runs (cada uno repara su packet) o de un run de refresh acotado.
3. **Plantilla vs instancias:** el Blueprint 5.5 define 13 secciones; los 17 packets traen 8.
   El contrato lo resuelve sin editar a nadie: perfil comprimido (vigente, el de disco) y
   perfil completo (techo, el 5.5), crecimiento permitido dentro del doc-run del componente.
4. **El Component Guide autoriza status inline** (`'Certificado'`, línea 45 del JSX) para 3 de
   17 componentes, con contenido duplicado en código y un script protegiendo ese texto. Es la
   duplicación exacta que el run ataca; su retiro es el run futuro de runtime, no este.
5. **La Docs view ya renderiza cuerpos** (trabajo JAME-era del q66, hoy `planned` en el
   canónico) — el mismo patrón código-adelantado-al-roadmap que este propio run tenía. No se
   tocó; el q66 lo formalizará.
6. **`columns` falta en `.aiw/state/component_status.json`** (16 de 17, verificado por id)
   mientras `COLUMNS.md` existe y el validador reporta «Component statuses: 16». Los universos
   «proyección de status» y «packets» no coinciden; re-juzgarlo no es de este encargo.
7. **q2 sigue `planned` con entregable en disco** — declarado en Bloque A; el cierre es del
   operador (este record deja dicho que el orden es q2 antes que q3).
8. **El charter DOCS MANAGEMENT dice «Target: 1 doc»** y la categoría porta ya 3 (Blueprint,
   modelo, contrato). Target es guía, no tope duro (mismo trato que el target de architecture);
   se deja constancia por honestidad de medición.
9. **Insumo para la reescritura futura de los 17 `full_description`** (hoy una frase a
   propósito; su edición es de roadmap y no de un encargo): necesitarían nombrar el deber de la
   Sección 6 del contrato — actualizar SOLO su packet, verificar anclas contra archivos reales,
   refrescar banner y registro juntos, status reference-only, registro bajo single-writer.
10. **La tensión «unregistered by default» (protocolo §8) vs registro en-run** no reapareció
    como problema: quedó reconciliada por el modelo §5 desde q2, y aquí se aplicó esa regla
    (único escritor verificado por mtimes).

---

## BLOQUE J — NO-CLAIMS DE ESTE ENCARGO

Este encargo define un contrato y registra dos entradas de índice. **No** afirma Human QA ni
aceptación de contenido; **no** certifica ningún componente, motor ni superficie (el concepto
está retirado y la matriz sigue siendo la única fuente de status); **no** autoriza ni ejecuta
migración alguna de formato (JSON/YAML queda como future work); **no** escribe schema de
packet, runtime del Component Guide ni renderer de Docs — la tentación de «cerrar» con un
schema real no se materializó: el contrato cierra a nivel de contrato; **no** documenta ningún
componente (eso es de los 17 doc-runs); **no** reescribe el `full_description` de ningún run;
**no** arregla los hallazgos 2 y 3 del record de q2 (se nombran en Bloque I porque estorban a
los packets, no se tocan); **no** aplica `barrier` ni decide la arista del q63; **no** avanza,
cierra ni re-emite nada del roadmap ni de `.project/`. El cierre del run es del operador,
desde la consola global, único punto de serialización.
