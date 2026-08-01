# Medición del carril DOCUMENTATION de Cantu Studio y de su cascada

> Fecha: 2026-07-31 · Proyecto medido: `cantu-studio` (solo lectura) · Record escrito en `aiw-console`.
> Encargo de taller. **Mide; no rediseña.** No se escribió un byte en `cantu-studio`, no se
> tocó ningún `status`, no se re-emitió `.project/`, no se usó el motor de roadmap de
> `aiw-console`, no se ejecutó git en ninguna forma.

**Fuente única de esta medición:** `cantu-studio/.aiw/roadmap/roadmap.json`
(`schema_version: jame.roadmap_v3.v0.2-progress`, `roadmap_id: roadmap`, título
`Cantu Studio Roadmap`), leído como JSON plano. Todo se derivó **por título y por carril**,
nunca por número; los `queue_order` se reportan como estado actual medido, no como identidad.

---

## 0. Hallazgo principal — va primero por mandato del criterio 3

**Los doc-runs por componente hacen algo que las cuatro cosas del ticket no cubren, y hacen
dos de esas cuatro en modo escritura, no en modo comparación.**

El `full_description` de los diecisiete es una plantilla. Su primera cláusula no describe la
tarea: **la delega**.

> «Verify the packet against the component-doc single-source contract at
> `docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md`, **whose Section 6 fixes this
> duty**»

Y la Sección 6 del contrato, verbatim, dice que el deber es:

> «**verify every derived anchor against the real schema, compiler, renderer, and sandbox
> fixture**; keep the section contract of this doc; refresh the banner Last verified and the
> registry freshness together; keep status reference-only.»

### 0.1 — Lo que un validador por commit no puede hacer

«Verificar cada ancla derivada contra el schema real, el compiler, el renderer y el fixture de
sandbox» **no es una comparación del packet contra el contrato**. Es una comparación del packet
contra **cuatro archivos de runtime distintos**, campo por campo, y es semántica.

Ejemplo medido, `docs/components/web/HEADER.md`:

| Ancla derivada en el packet | Contra qué se verifica | ¿Mecánico? |
|---|---|---|
| `Engine renderer: src/builders/web/partials/renderHeader.js` | existencia de ruta | **Sí** — comprobado: 17/17 rutas de renderer existen hoy |
| `level: 1, 2, o 3 - the heading rank` | `tools/author-lite/compiler-api/schemas/draftSchema.js` | **No** — hay que leer el enum de Zod y decidir si sigue diciendo eso |
| `title`: «required» | compiler | **No** |
| «`title` is required; an empty title is rejected by the compiler» (Guardrails) | compiler | **No** — es una afirmación de comportamiento |
| «As a Columns child with no `level`, it renders at level 3» | renderer + fixture | **No** — es una afirmación de render condicional |

Un validador puede comprobar la ruta. **No puede comprobar que el enum, el default, el límite y
la afirmación de guardrail sigan siendo ciertos.** Eso es la parte de juicio, y **está en el
carril DOCUMENTATION, no en el de desarrollo.**

### 0.2 — Dos de las cuatro cosas son escrituras, no comprobaciones

- «**repair** its two stale pointers» — reparar, no comprobar. Un validador **detecta** el
  puntero caduco; no lo arregla.
- «**refresh** its status banner and its registry entry **together**» — escribir. Un validador
  detecta que banner y registro divergen; no decide la fecha nueva de `Last verified` ni la
  escribe en `.aiw/docs/docs_index.json`.

Medido: **16 packets pendientes × 4 ocurrencias caducas = 64 ocurrencias** sin dueño si los
doc-runs desaparecen y solo queda un validador (ver §13.2 para la corrección de unidad).

### 0.3 — La cuarta cosa del ticket no está en el texto

«Juzgar qué promete el componente» **no aparece en ninguno de los diecisiete textos.** No hay
nada que trasladar al run de desarrollo por esa vía: sería una cláusula **nueva**, no una
reubicada.

### 0.4 — Pero el deber ya está a medias en el carril DEVELOPMENT

`RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001` (`qo 9`, DEVELOPMENT, **completed**),
«Define shared component contracts and the revalidation checklist», ya fija la Definition of
Done que **los diecisiete runs de implementación citan en su `depends_on` — 17 de 17, verificado**.
Esa DoD dice, verbatim:

> «…repair only if Human QA finds a real defect; **update the component's canonical
> single-source component-doc packet and Component Guide source; refresh docs_index freshness
> and evidence**; and preserve all no-claims and documented source conflicts.»

**El packet y la Guía ya están en el alcance de los runs de implementación**, por la DoD que
todos consumen. Lo que falta no es la decisión: es que **el texto de los diecisiete no la cita**
(ver §11 y §12).

### 0.5 — Y el contrato licencia el crecimiento del packet dentro del doc-run

Contrato §3, último párrafo: «a packet **may grow toward the full profile inside its own doc
run** without changing identity, location, or discipline». Medido: `COLUMNS.md` —el único cuyo
doc-run cerró— tiene **146 líneas** y **10 secciones**, frente a **66–74 líneas y 8 secciones**
en los otros dieciséis; lleva dos secciones fuera del contrato de ocho: «Color palette
compatibility audit» y «Math and formula compatibility audit».

**[NO VERIFICADO]** — Qué run escribió esas dos secciones. La atribución exige git, y este
encargo no lo usa. Lo medible es la asimetría y la cláusula que la licencia.

---

## 1. El carril `DOCUMENTATION` completo — TABLA (criterio 1)

**Cuenta real: 23 runs.** El 23 del ticket es correcto. Total del roadmap: **74 runs**,
7 objetivos, 28 fases (confirmado por el validador, §17). Carril `DEVELOPMENT`: 51 runs — el
campo `lane` está ausente en ellos y `DEVELOPMENT` es el `default: true` de `lanes[]`.

Estado del carril: **3 `completed`, 20 `planned`.**

| # (`queue_order`) | `run_id` | Título | `status` | `depends_on` | Objetivo (por título) | Fase (por título) |
|---|---|---|---|---|---|---|
| 2 | `RUN-JAME-DOCUMENTATION-CANONICAL-MODEL-001` | Define the canonical documentation model, IA, and cadence | completed | — | Cantu Studio Knowledge Base and Documentation Source of Truth | Canonical Documentation Model and Cadence |
| 3 | `RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001` | Define the component-doc single-source contract | completed | Define the canonical documentation model, IA, and cadence | Cantu Studio Knowledge Base and Documentation Source of Truth | Canonical Documentation Model and Cadence |
| 14 | `RUN-CANTU-WEB-COLUMNS-DOC-001` | Verify the Columns component packet | **completed** | Audit and implement the Columns component · Define the component-doc single-source contract | Cantu Studio Web Components | Web Components - Structure |
| 17 | `RUN-CANTU-WEB-HEADER-DOC-001` | Verify the Header component packet | planned | Audit and implement the Header component · (contrato) | Cantu Studio Web Components | Web Components - Basics |
| 19 | `RUN-CANTU-WEB-LIST-DOC-001` | Verify the List component packet | planned | Audit and implement the List component · (contrato) | Cantu Studio Web Components | Web Components - Basics |
| 21 | `RUN-CANTU-WEB-ICONLIST-DOC-001` | Verify the IconList component packet | planned | Audit and implement the IconList component · (contrato) | Cantu Studio Web Components | Web Components - Basics |
| 23 | `RUN-CANTU-WEB-CARD-DOC-001` | Verify the Card component packet | planned | Audit and implement the Card component · (contrato) | Cantu Studio Web Components | Web Components - Basics |
| 25 | `RUN-CANTU-WEB-VIDEO-DOC-001` | Verify the Video component packet | planned | Audit and implement the Video component · (contrato) | Cantu Studio Web Components | Web Components - Basics |
| 27 | `RUN-CANTU-WEB-NARRATIVE-DOC-001` | Verify the Narrative component packet | planned | Audit and implement the Narrative component · (contrato) | Cantu Studio Web Components | Web Components - Basics |
| 29 | `RUN-CANTU-WEB-CALLOUT-DOC-001` | Verify the Callout component packet | planned | Audit and implement the Callout component · (contrato) | Cantu Studio Web Components | Web Components - Basics |
| 31 | `RUN-CANTU-WEB-DETAILS-DOC-001` | Verify the Details component packet | planned | Audit and implement the Details component · (contrato) | Cantu Studio Web Components | Web Components - Basics |
| 33 | `RUN-CANTU-WEB-ARITHMETIC-DOC-001` | Verify the Arithmetic component packet | planned | Audit and implement the Arithmetic component · (contrato) | Cantu Studio Web Components | Web Components - Math |
| 35 | `RUN-CANTU-WEB-RULE-DOC-001` | Verify the Rule component packet | planned | Audit and implement the Rule component · (contrato) | Cantu Studio Web Components | Web Components - Math |
| 37 | `RUN-CANTU-WEB-SPLIT-DOC-001` | Verify the Split component packet | planned | Decide scope and enable the Split component · (contrato) | Cantu Studio Web Components | Web Components - Basics |
| 39 | `RUN-CANTU-WEB-TABLE-DOC-001` | Verify the Table component packet | planned | Audit and implement the Table component · (contrato) | Cantu Studio Web Components | Web Components - Basics |
| 41 | `RUN-CANTU-WEB-CONCEPTGRID-DOC-001` | Verify the ConceptGrid component packet | planned | Audit and implement the ConceptGrid component · (contrato) | Cantu Studio Web Components | Web Components - Math |
| 43 | `RUN-CANTU-WEB-HIERARCHY-DOC-001` | Verify the Hierarchy component packet | planned | Audit and implement the Hierarchy component · (contrato) | Cantu Studio Web Components | Web Components - Math |
| 45 | `RUN-CANTU-WEB-TIMELINE-DOC-001` | Verify the Timeline component packet | planned | Audit and implement the Timeline component · (contrato) | Cantu Studio Web Components | Web Components - Math |
| 47 | `RUN-CANTU-WEB-VISUAL-DOC-001` | Verify the Visual component packet | planned | Audit and implement the Visual component · (contrato) | Cantu Studio Web Components | Web Components - Basics |
| 49 | `RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001` | **Audit the Web component documentation as a whole** | planned | **los 17 doc-runs por componente** | Cantu Studio Web Components | Web Component Documentation and Readiness Evidence |
| 55 | `RUN-CANTU-SLIDE-COMPONENT-GUIDE-001` | Establish the Slide Component Guide from the Web template | planned | Reproduce the sandbox files in the editor | Cantu Studio Slide Components | Sandbox Reproduction and Component Guide |
| 69 | `RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001` | **Deep documentation audit** | planned | — | Cantu Studio Knowledge Base and Documentation Source of Truth | Deep Documentation Audit |
| 71 | `RUN-CANTU-DOCS-DIRECTORY-RENAME-001` | Sweep the legacy documentation paths and decide the empty directories | planned | Freeze the naming disposition map and exclusion list · Rename internal code directories and their references | Cantu Studio Knowledge Base and Documentation Source of Truth | Naming Rename Execution |

> `(contrato)` = `RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001`, segunda dependencia común
> a los diecisiete doc-runs por componente.

---

## 2. Cuáles son doc-runs por componente (criterio 2)

**Diecisiete. La cifra del ticket es correcta, y su desglose también: uno cerrado, dieciséis
pendientes.**

Forma que los identifica, verificada en los tres ejes:

1. **Título**: patrón exacto `Verify the <Componente> component packet` — 17 coincidencias, cero
   falsos positivos en el carril.
2. **Emparejamiento**: cada uno lleva en `depends_on` **su run de implementación** más el
   contrato. Los 17 pares resuelven: 17/17 runs de implementación existen en `DEVELOPMENT`.
3. **Packet nombrado**: cada `full_description` cita exactamente **un** archivo bajo
   `docs/components/web/`. Los 17 archivos existen en disco (17 packets, ni uno más ni uno menos).

Los diecisiete, por componente: **Columns** (`completed`), Header, List, IconList, Card, Video,
Narrative, Callout, Details, Arithmetic, Rule, Split, Table, ConceptGrid, Hierarchy, Timeline,
Visual.

### 2.1 — Uniformidad del texto: son una plantilla

Normalizando el nombre del componente, los diecisiete textos colapsan en **3 firmas distintas**,
y las tres difieren **solo en el nombre del archivo del packet**:

| Firma | Cuántos | Qué la distingue |
|---|---|---|
| #1 | 15 | ruta `docs/components/web/<NOMBRE>.md` derivada directa del nombre |
| #2 | 1 | IconList → `ICON-LIST.md` (kebab) |
| #3 | 1 | ConceptGrid → `CONCEPT-GRID.md` (kebab) |

Longitudes: `summary` 172–179 caracteres, `full_description` 551–566. **No hay contenido propio
por componente en ninguno de los diecisiete.** Lo que el ticket llama «juicio» no está escrito
en el texto (§0.3).

---

## 3. Texto verbatim de cuatro doc-runs (criterio 3)

Los tres representativos se eligieron para cubrir las tres firmas de §2.1: **Header** (firma #1,
el caso general y el único `planned` cuyo run está listo hoy), **IconList** (firma #2) y
**ConceptGrid** (firma #3). Más **Columns**, el único `completed`.

### 3.1 `RUN-CANTU-WEB-COLUMNS-DOC-001` — `queue_order` 14 — **completed**

**`title`**
> Verify the Columns component packet

**`summary`**
> Verify the Columns component packet against the component-doc single-source contract, repair its two stale pointers, and refresh its status banner and registry entry together.

**`full_description`**
> The Columns packet already exists at docs/components/web/COLUMNS.md and is registered, so what remains is not writing it. Verify the packet against the component-doc single-source contract at docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md, whose Section 6 fixes this duty; repair the two stale pointers it carries, to the certification matrix and to REFERENCE-DRAFT-JSON; and refresh its status banner and its registry entry together. This Run still depends on its implementation run, which remains pending, and it keeps status reference-only.

### 3.2 `RUN-CANTU-WEB-HEADER-DOC-001` — `queue_order` 17 — planned

**`title`**
> Verify the Header component packet

**`summary`**
> Verify the Header component packet against the component-doc single-source contract, repair its two stale pointers, and refresh its status banner and registry entry together.

**`full_description`**
> The Header packet already exists at docs/components/web/HEADER.md and is registered, so what remains is not writing it. Verify the packet against the component-doc single-source contract at docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md, whose Section 6 fixes this duty; repair the two stale pointers it carries, to the certification matrix and to REFERENCE-DRAFT-JSON; and refresh its status banner and its registry entry together. This Run still depends on its implementation run, which remains pending, and it keeps status reference-only.

### 3.3 `RUN-CANTU-WEB-ICONLIST-DOC-001` — `queue_order` 21 — planned

**`title`**
> Verify the IconList component packet

**`summary`**
> Verify the IconList component packet against the component-doc single-source contract, repair its two stale pointers, and refresh its status banner and registry entry together.

**`full_description`**
> The IconList packet already exists at docs/components/web/ICON-LIST.md and is registered, so what remains is not writing it. Verify the packet against the component-doc single-source contract at docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md, whose Section 6 fixes this duty; repair the two stale pointers it carries, to the certification matrix and to REFERENCE-DRAFT-JSON; and refresh its status banner and its registry entry together. This Run still depends on its implementation run, which remains pending, and it keeps status reference-only.

### 3.4 `RUN-CANTU-WEB-CONCEPTGRID-DOC-001` — `queue_order` 41 — planned

**`title`**
> Verify the ConceptGrid component packet

**`summary`**
> Verify the ConceptGrid component packet against the component-doc single-source contract, repair its two stale pointers, and refresh its status banner and registry entry together.

**`full_description`**
> The ConceptGrid packet already exists at docs/components/web/CONCEPT-GRID.md and is registered, so what remains is not writing it. Verify the packet against the component-doc single-source contract at docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md, whose Section 6 fixes this duty; repair the two stale pointers it carries, to the certification matrix and to REFERENCE-DRAFT-JSON; and refresh its status banner and its registry entry together. This Run still depends on its implementation run, which remains pending, and it keeps status reference-only.

### 3.5 — Contraste con lo que efectivamente pasó en el único cerrado

`COLUMNS.md` es hoy el **único** packet con los punteros reparados
(`docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` y
`docs/reference/REFERENCE-DRAFT-JSON.md`), el único con banner refrescado
(`Last verified: 2026-07-30` frente a `2026-07-12` en los otros dieciséis) y el único cuya
entrada de registro lleva marca de reverificación
(`produced_2026-07-12_reverified_2026-07-30` frente a `produced_2026-07-12`). **Los tres deberes
mecánicos se ejecutaron exactamente una vez en dieciséis meses de packet-años pendientes**, y
además el packet creció de ~70 a 146 líneas (§0.5).

---

## 4. Los runs del carril que NO son doc-runs por componente (criterio 4)

**Seis.** 17 + 6 = 23. ✔

Criterio nuevo aplicado: *«¿lo que hace este run es una comparación mecánica que un validador
haría en cada commit sobre los diecisiete a la vez?»* Si sí, no sobrevive como run.

| Run (por título) | `qo` | `status` | Qué hace, resumido | ¿Sobrevive al criterio nuevo? |
|---|---|---|---|---|
| **Define the canonical documentation model, IA, and cadence** | 2 | completed | Define clases documentales, autoridad, reglas de frescura, la IA Docs/Governance/Sources y la cadencia. No implementa UI. | **Ya cerrado.** No aplica; es el cimiento del que cuelga todo lo demás. |
| **Define the component-doc single-source contract** | 3 | completed | Define el packet canónico único por componente, sus dos consumidores y el deber de actualización. Define contrato, no implementa schema ni runtime. | **Ya cerrado.** No aplica. Es la norma que el validador ejecutaría. |
| **Audit the Web component documentation as a whole** | 49 | planned | Auditoría de conjunto de los diecisiete packets tras cerrar los diecisiete doc-runs; un veredicto de conformidad por componente. No repara, no re-documenta, no reclama readiness. | **Cambia de sujeto.** Análisis completo en §6. |
| **Establish the Slide Component Guide from the Web template** | 55 | planned | Establece el **formato** de la Guía de componente Slide tomando la Web como plantilla, adaptándola a especificidades de Slide (compatibilidad de grid), para que cada run Slide tenga destino documental. No documenta componentes individuales. | **Sí, intacto.** Es diseño de formato, no comparación. Y bajo la premisa nueva del operador (dos fuentes, packet técnico y Guía de producto) su sujeto **se amplía**, no se reduce: hoy dice «Web Component Guide as the template» y esa plantilla está por redefinirse. |
| **Deep documentation audit** | 69 | planned | Auditoría humana completa del corpus documental, **diferida a propósito** por decisión del operador. Sin dependencias, sin compuerta técnica. | **Sí, y es candidato a reencuadre.** Análisis en §9. |
| **Sweep the legacy documentation paths and decide the empty directories** | 71 | planned | El rename que iba a hacer **ya no tiene objeto**: `docs/author-lite/` y `docs/jame-core/` están vacíos. Lo que queda es barrer las referencias entrantes en `AGENTS.md` (desde la línea 93), `CLAUDE.md` (veintinueve), `generate_prompt_context.js` (líneas 19 y 21) **y en los diecisiete packets**, y decidir qué pasa con los dos directorios vacíos. | **Sí, pero colisiona.** Su alcance incluye los punteros caducos de los diecisiete packets — **el mismo trabajo que los diecisiete doc-runs prometen**. Si los doc-runs se retiran, `qo 71` queda como **el único dueño escrito** de esas 64 ocurrencias (§13.2). Si no se retiran, hay doble dueño. |

**Nota de superficie compartida:** `qo 71` y los diecisiete doc-runs escriben los mismos
diecisiete archivos. Bajo la regla 7 de `CLAUDE.md` («NUNCA se lanzan dos runs simultáneos que
toquen el MISMO archivo») esto ya es un solapamiento existente, independiente del rediseño.

---

## 5. Quién depende de los doc-runs por componente — TABLA (criterio 5)

**Esto es lo que hay que saber antes de borrar nada. La respuesta es limpia: un solo run.**

| Doc-run por componente | `qo` | `status` | Runs que lo citan en su `depends_on` | Cuántos |
|---|---|---|---|---|
| `RUN-CANTU-WEB-COLUMNS-DOC-001` | 14 | completed | Audit the Web component documentation as a whole | 1 |
| `RUN-CANTU-WEB-HEADER-DOC-001` | 17 | planned | Audit the Web component documentation as a whole | 1 |
| `RUN-CANTU-WEB-LIST-DOC-001` | 19 | planned | Audit the Web component documentation as a whole | 1 |
| `RUN-CANTU-WEB-ICONLIST-DOC-001` | 21 | planned | Audit the Web component documentation as a whole | 1 |
| `RUN-CANTU-WEB-CARD-DOC-001` | 23 | planned | Audit the Web component documentation as a whole | 1 |
| `RUN-CANTU-WEB-VIDEO-DOC-001` | 25 | planned | Audit the Web component documentation as a whole | 1 |
| `RUN-CANTU-WEB-NARRATIVE-DOC-001` | 27 | planned | Audit the Web component documentation as a whole | 1 |
| `RUN-CANTU-WEB-CALLOUT-DOC-001` | 29 | planned | Audit the Web component documentation as a whole | 1 |
| `RUN-CANTU-WEB-DETAILS-DOC-001` | 31 | planned | Audit the Web component documentation as a whole | 1 |
| `RUN-CANTU-WEB-ARITHMETIC-DOC-001` | 33 | planned | Audit the Web component documentation as a whole | 1 |
| `RUN-CANTU-WEB-RULE-DOC-001` | 35 | planned | Audit the Web component documentation as a whole | 1 |
| `RUN-CANTU-WEB-SPLIT-DOC-001` | 37 | planned | Audit the Web component documentation as a whole | 1 |
| `RUN-CANTU-WEB-TABLE-DOC-001` | 39 | planned | Audit the Web component documentation as a whole | 1 |
| `RUN-CANTU-WEB-CONCEPTGRID-DOC-001` | 41 | planned | Audit the Web component documentation as a whole | 1 |
| `RUN-CANTU-WEB-HIERARCHY-DOC-001` | 43 | planned | Audit the Web component documentation as a whole | 1 |
| `RUN-CANTU-WEB-TIMELINE-DOC-001` | 45 | planned | Audit the Web component documentation as a whole | 1 |
| `RUN-CANTU-WEB-VISUAL-DOC-001` | 47 | planned | Audit the Web component documentation as a whole | 1 |

**Total de dependientes distintos: 1** — `RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001` (`qo 49`,
carril `DOCUMENTATION`, `planned`), y cita a los **diecisiete**, que son **el 100 % de su
`depends_on`**.

**Ningún run de `DEVELOPMENT` depende de un doc-run por componente.** Ningún doc-run depende de
otro doc-run. El subgrafo es un abanico de diecisiete hojas hacia un solo sumidero.

---

## 6. El run de auditoría de conjunto (criterio 6)

Derivado por título: **«Audit the Web component documentation as a whole»** →
`RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001`, `qo 49`, carril `DOCUMENTATION`, `planned`,
objetivo *Cantu Studio Web Components*, fase *Web Component Documentation and Readiness
Evidence*. **Diecisiete aristas hacia los doc-runs: confirmado, exactamente 17.**

### 6.1 Verbatim

**`title`**
> Audit the Web component documentation as a whole

**`summary`**
> General audit that the canonical documentation of the seventeen Web components is consistent, complete, and ready, after all component documentation runs close, recording one conformance verdict per component.

**`full_description`**
> After the seventeen Web component documentation runs close, audit the Web component documentation as a whole rather than any single component. Verify that each component's canonical packet under docs/components/web/ follows the component-doc single-source contract at docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md, whose Section 3 fixes the required sections and the field discipline; and that the repairs those seventeen runs owe have landed in every packet, with no stale pointer left behind and each status banner and registry entry refreshed together. Record one verdict per component: conforming, or exactly what it still lacks. This Run verifies and records the whole; it does not re-document individual components, does not repair any packet, and it makes no production-readiness claim.

### 6.2 Si sus diecisiete dependencias desaparecen, ¿qué queda de su sujeto?

El texto tiene **dos cláusulas de verificación**, y solo una sobrevive:

| Cláusula | ¿Sobrevive sin los diecisiete? |
|---|---|
| «each component's canonical packet under `docs/components/web/` follows the … contract … whose **Section 3** fixes the required sections and the field discipline» | **Sí.** El sujeto son los packets en disco, no los runs. Existen hoy: 17 archivos. |
| «**the repairs those seventeen runs owe** have landed in every packet, with no stale pointer left behind and each status banner and registry entry refreshed together» | **No.** «those seventeen runs» pierde referente. Sin ellos, nadie **debe** esas reparaciones y la cláusula queda sin sujeto. |

Y hay un segundo problema, más grave que la arista: el run declara explícitamente **«it does not
repair any packet»**. Si los diecisiete se retiran y este run se conserva tal cual, el resultado
medible es: **un veredicto que dirá «no conforme» dieciséis veces y ningún run con licencia para
arreglarlo.** El único candidato escrito hoy para esas reparaciones es `qo 71` (§4).

### 6.3 ¿Qué audita exactamente: los packets, el proceso, o el resultado?

**Los tres, mezclados, y por eso el criterio nuevo lo parte.**

- **Los packets** — «follows the contract … Section 3 … required sections and field discipline».
  Esto es **estado**. Medido hoy: **los 17 packets ya tienen las 8 secciones requeridas.** Esta
  parte de la auditoría **ya está verde** sin que ningún doc-run haya corrido, y es exactamente
  el tipo de comparación que un validador hace en cada commit sobre los diecisiete a la vez.
- **El proceso** — «after the seventeen … runs close», «the repairs those seventeen runs owe».
  Esto es **cierre de runs**, no documentación. Es lo que muere con el rediseño.
- **El resultado** — «Record one verdict per component: conforming, or exactly what it still
  lacks». Esto es **producto**: un registro de conformidad por componente. Sobrevive, pero no
  necesita esperar a diecisiete cierres.

### 6.4 Recomendación (no decisión)

**Cambia de sujeto; no desaparece.** Tres opciones, medidas:

1. **Reencuadrarlo como auditoría del corpus de packets** — quitar la premisa temporal («after
   the seventeen runs close») y la cláusula de reparaciones debidas, y dejar el veredicto por
   componente contra el contrato §3. Es el cambio mínimo y conserva el `run_id`, la fase y el
   producto.
2. **Absorberlo en el validador** — la parte §3 es mecánica y ya está verde; el veredicto por
   componente sería salida del validador, no de un run. Deja huérfano el registro de conformidad
   como documento.
3. **Retirarlo y dejar que lo cubra `qo 48`** — ver el solapamiento medido abajo.

**Dato que pesa en la decisión y que la cabina puede no tener presente:**
`RUN-JAME-WEB-READINESS-EVIDENCE-001` (`qo 48`, carril `DEVELOPMENT`, `planned`, «Audit the Web
components as a whole»), que depende de **los diecisiete runs de implementación**, ya dice en su
`full_description`: **«that each component's canonical packet exists and follows the
component-doc single-source contract»**. Es decir, **`qo 48` ya audita el packet contra el
contrato.** El solapamiento entre `qo 48` y `qo 49` es previo al rediseño; el rediseño solo lo
hace visible. Si `qo 48` conserva esa cláusula, la opción 3 es viable sin pérdida.

Mi recomendación, si hay que dar una: **opción 1**, porque conserva el veredicto documentado por
componente —que `qo 48` produce solo como parte de un paquete de readiness mayor— y porque es la
única que no obliga a reescribir un run del carril `DEVELOPMENT` en el mismo movimiento.

---

## 7. Efecto sobre el grafo completo — TABLA (criterio 7)

Grafo actual medido: **74 runs, 154 aristas `depends_on`.**

### 7.1 Aristas entrantes que quedarían colgantes

| Run que pierde aristas | Carril | `status` | Aristas que pierde | De cuántas tiene | Con qué se queda |
|---|---|---|---|---|---|
| **Audit the Web component documentation as a whole** (`RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001`, `qo 49`) | DOCUMENTATION | planned | **17** | 17 | **NINGUNA — queda sin dependencias** |

**Total de aristas entrantes colgantes: 17, concentradas en un solo run.**

**Runs que quedarían sin dependencias teniéndolas hoy: exactamente uno** —
`RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001`. Ningún otro run del roadmap pierde una sola arista.

### 7.2 Aristas salientes que se van con los diecisiete

Los diecisiete llevan **34 aristas salientes** (dos cada uno). Sus destinos:

| Destino (por título) | `run_id` | `qo` | Carril | `status` | Aristas perdidas |
|---|---|---|---|---|---|
| Define the component-doc single-source contract | `RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001` | 3 | DOCUMENTATION | completed | **17** |
| Audit and implement the Columns component | `RUN-JAME-WEB-COLUMNS-REVALIDATION-001` | 13 | DEVELOPMENT | completed | 1 |
| Audit and implement the Header component | `RUN-JAME-WEB-HEADER-REVALIDATION-001` | 15 | DEVELOPMENT | completed | 1 |
| Audit and implement the List component | `RUN-JAME-WEB-LIST-REVALIDATION-001` | 18 | DEVELOPMENT | planned | 1 |
| Audit and implement the IconList component | `RUN-JAME-WEB-ICONLIST-REVALIDATION-001` | 20 | DEVELOPMENT | planned | 1 |
| Audit and implement the Card component | `RUN-JAME-WEB-CARD-REVALIDATION-001` | 22 | DEVELOPMENT | planned | 1 |
| Audit and implement the Video component | `RUN-JAME-WEB-VIDEO-REVALIDATION-001` | 24 | DEVELOPMENT | planned | 1 |
| Audit and implement the Narrative component | `RUN-JAME-WEB-NARRATIVE-REPAIR-001` | 26 | DEVELOPMENT | planned | 1 |
| Audit and implement the Callout component | `RUN-JAME-WEB-CALLOUT-REPAIR-001` | 28 | DEVELOPMENT | planned | 1 |
| Audit and implement the Details component | `RUN-JAME-WEB-DETAILS-REPAIR-001` | 30 | DEVELOPMENT | planned | 1 |
| Audit and implement the Arithmetic component | `RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` | 32 | DEVELOPMENT | planned | 1 |
| Audit and implement the Rule component | `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` | 34 | DEVELOPMENT | planned | 1 |
| Decide scope and enable the Split component | `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` | 36 | DEVELOPMENT | planned | 1 |
| Audit and implement the Table component | `RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001` | 38 | DEVELOPMENT | planned | 1 |
| Audit and implement the ConceptGrid component | `RUN-JAME-WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001` | 40 | DEVELOPMENT | planned | 1 |
| Audit and implement the Hierarchy component | `RUN-JAME-WEB-HIERARCHY-AUDIT-AND-REPAIR-001` | 42 | DEVELOPMENT | planned | 1 |
| Audit and implement the Timeline component | `RUN-JAME-WEB-TIMELINE-AUDIT-AND-REPAIR-001` | 44 | DEVELOPMENT | planned | 1 |
| Audit and implement the Visual component | `RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001` | 46 | DEVELOPMENT | planned | 1 |

Ninguno de estos destinos queda huérfano: **son destinos, no orígenes.** Pierden un dependiente,
no una dependencia. Ninguno de los diecisiete runs de implementación cambia de estado de
bloqueo.

### 7.3 Balance del grafo

| Magnitud | Hoy | Tras retirar los diecisiete | Δ |
|---|---|---|---|
| Runs | 74 | 57 | −17 |
| Aristas `depends_on` | 154 | 103 | −51 (17 entrantes + 34 salientes) |
| Runs sin dependencias | — | +1 (`qo 49`) | — |
| Runs que pierden alguna dependencia | — | 1 | — |
| Aristas colgantes a resolver | — | **17, todas en `qo 49`** | — |

**La cascada es trivial en el grafo y no trivial en el sujeto.** Retirar los diecisiete cuesta
una sola edición de aristas; lo que cuesta de verdad es decidir qué queda de `qo 49` (§6) y quién
hereda las 64 reparaciones pendientes (§13.2).

### 7.4 Arista externa preexistente, ajena a este rediseño

El validador reporta un warning no bloqueante: `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001`
(`qo 4`, `DEVELOPMENT`, completed) depende de `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`, que no
resuelve en este roadmap. **Se nombra, no se toca** — está fuera de alcance por el criterio 17 y
es independiente de los doc-runs.

---

## 8. El carril `DOCUMENTATION` sin ellos (criterio 8)

**Se queda con 6 runs: 2 `completed` y 4 `planned`.** De 23 a 6.

### 8.1 Los cuatro que quedarían ejecutables

| Run (por título) | `qo` | Dependencias | ¿Listo hoy? | ¿Listo tras el rediseño? |
|---|---|---|---|---|
| Audit the Web component documentation as a whole | 49 | 17 doc-runs (16 `planned`) | **No** | **Sí** — pero su sujeto se ha ido (§6) |
| Establish the Slide Component Guide from the Web template | 55 | Reproduce the sandbox files in the editor (`qo 54`, DEVELOPMENT, planned) | **No** | **No** — bloqueado por `DEVELOPMENT` |
| Deep documentation audit | 69 | — | **Sí técnicamente** | **Sí técnicamente** — pero diferido por decisión del operador (§9) |
| Sweep the legacy documentation paths… | 71 | Freeze the naming disposition map (`qo 5`, completed) · Rename internal code directories (`qo 70`, DEVELOPMENT, planned) | **No** | **No** — bloqueado por `DEVELOPMENT` |

### 8.2 La premisa del desfase se cae, y se cae del todo

El operador diseñó los carriles esperando **un desfase de uno sostenido diecisiete veces**. La
cola lo confirma: entre `qo 13` y `qo 49` la alternancia es exacta —
`13 DEV / 14 DOC`, `15+16 DEV / 17 DOC`, `18 DEV / 19 DOC`, … `46 DEV / 47 DOC`, `48 DEV / 49 DOC`.
**Diecisiete pares más el par de auditorías de conjunto.**

Retirados los diecisiete, **entre `qo 4` y `qo 49` el carril `DOCUMENTATION` no tiene ni un solo
run.** Toda la campaña de componentes —dieciséis runs de implementación, el grueso del trabajo
pendiente— correría con el carril de documentación **vacío**.

### 8.3 ¿Se queda seco?

**Sí, en el sentido operativo.** Medido:

- Runs `planned` con todas sus dependencias `completed` hoy en todo el roadmap: **21**
  (coincide con `ready_next=21` del validador). De ésos, **uno solo** es del carril
  `DOCUMENTATION`: `Verify the Header component packet` (`qo 17`) — **un doc-run por componente**.
- **Retirados los diecisiete, el carril `DOCUMENTATION` tendría 2 runs sin dependencias:**
  - `qo 49`, cuyo sujeto acaba de desaparecer;
  - `qo 69`, que el operador **difirió explícitamente** («deferred deliberately… stays planned
    until Cantu Studio is further developed and the lessons material exists»).
- Los otros dos (`qo 55`, `qo 71`) **están gateados por runs de `DEVELOPMENT`** (`qo 54` y
  `qo 70`), ambos muy al final de la cola. **No son paralelos a `DEVELOPMENT`: son posteriores a
  él.**

**Conclusión medida: el carril no queda con trabajo ejecutable en paralelo a `DEVELOPMENT`.**
Queda con un run cuyo sujeto hay que redefinir y otro que el propio operador aparcó. Si el
rediseño se ejecuta sin darle sujeto nuevo al carril, la disciplina «un run por carril, carriles
en paralelo» de `CLAUDE.md` regla 7 pasa a describir **un solo carril activo**.

---

## 9. El run de auditoría profunda de documentación (criterio 9)

Derivado por título: **«Deep documentation audit»** → `RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001`,
`qo 69`, carril `DOCUMENTATION`, `planned`, objetivo *Cantu Studio Knowledge Base and
Documentation Source of Truth*, fase *Deep Documentation Audit*, **`depends_on: []`**.

### 9.1 Verbatim

**`title`**
> Deep documentation audit

**`summary`**
> Full human-led audit of the documentation corpus, deferred until Cantu Studio development is further along.

**`full_description`**
> A thorough audit and classification of every documentation source, deferred deliberately. The operator decided that auditing the full corpus now would stall product development, and that the current documentation is good enough at a coarse level. This run stays planned until Cantu Studio is further developed and the lessons material exists. It has no dependencies and is not gated by anything; it is a horizon item the operator pulls forward when the time is right.

### 9.2 Qué condiciones de compuerta declara, y si se cumplen hoy

El run declara **compuertas de juicio, no técnicas** — y lo dice expresamente: «It has no
dependencies and **is not gated by anything**». Las condiciones son tres, todas de criterio del
operador:

| Condición declarada | ¿Se cumple hoy? | Medición |
|---|---|---|
| «until **Cantu Studio is further developed**» | **No** | 17 de 74 runs `completed` (23 %). De los 17 runs de implementación de componente, **2 cerrados y 15 pendientes**. La campaña central apenas empezó. |
| «until **the lessons material exists**» | **No** | `src/content/lecciones/` contiene un único subdirectorio, `Aritmetica`, **sin archivos**. `src/content/staging/Aritmetica` igual. El objetivo *Lessons, Production, and Deployment* tiene sus 3 runs en `planned`. |
| «auditing the full corpus now **would stall product development**» | Sigue siendo la premisa | Corpus medido: **343 archivos `.md` bajo `docs/`**, de los cuales **288 bajo `docs/archive/`**; `.aiw/docs/docs_index.json` registra **149**, con **60 curados como primary-visible**. Auditar 343 fuentes a mano sigue siendo un encargo mayor. |

**Ninguna de las dos compuertas objetivas se cumple.** Técnicamente el run está listo (0
dependencias, `ready` según el validador); operativamente el operador lo tiene aparcado y las
razones que dio siguen vigentes, medidas.

### 9.3 ¿Puede reencuadrarse como la auditoría del corpus bajo el criterio nuevo?

**No sin desnaturalizarlo. Recomiendo un run distinto.** Tres razones medidas:

1. **El sujeto no coincide.** Este run audita **«every documentation source»** — 343 archivos,
   149 registrados, todas las clases documentales. La auditoría que el criterio nuevo necesita
   tiene por sujeto **diecisiete packets** bajo `docs/components/web/`. Meter diecisiete archivos
   dentro de un run cuyo alcance son trescientos cuarenta y tres es diluir el encargo, no
   reencuadrarlo.
2. **La compuerta es incompatible.** Este run está diferido **hasta que exista el material de
   lecciones**. La auditoría de packets tiene que poder correr **durante** la campaña de
   componentes, no después de producción. Reencuadrarlo obligaría a **quitarle la compuerta**, y
   la compuerta es lo único que este run realmente declara.
3. **Ya hay un candidato mejor situado.** `qo 49` (§6) tiene exactamente el sujeto correcto —los
   diecisiete packets contra el contrato §3—, ya está en el carril y ya produce «one verdict per
   component». Reencuadrar `qo 49` cuesta quitarle dos cláusulas; reencuadrar `qo 69` cuesta
   cambiarle sujeto, compuerta y alcance, es decir, escribirlo de nuevo.

**Recomendación:** dejar `qo 69` como está —item de horizonte, sin tocar—, y resolver la
auditoría del corpus de packets sobre `qo 49`. Si además hace falta una auditoría del corpus
**completo** bajo el criterio nuevo, es un run distinto. *La decisión es del operador.*

---

## 10. El run del cableado del Component Guide (criterio 10)

Derivado por título: **«Implement the Component Guide as a canonical packet consumer»** →
`RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001`, **`qo 74` — el último de los 74**, carril
`DEVELOPMENT` (campo `lane` ausente → default), `planned`, objetivo *Cantu Studio Knowledge Base
and Documentation Source of Truth*, fase *Docs Console Projection*, `depends_on:
["RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001"]`.

### 10.1 Verbatim

**`title`**
> Implement the Component Guide as a canonical packet consumer

**`summary`**
> Retire the Component Guide's inline per-component content, its inline status labels, and the script that guards them, and render the canonical packets read-only instead.

**`full_description`**
> The Editor Component Guide at tools/author-lite/editor-ui/src/features/editor/components/preview/ComponentGuide.jsx consumes no packet today: it carries inline hardcoded guide content for three of the seventeen Web components, asserts inline status labels of its own, and is held in place by a text-integrity script at tools/author-lite/scripts/checkComponentGuideTextIntegrity.cjs that guards that inline text as if it were the source. Make the Guide render the canonical packets under docs/components/web/ read-only, which is what the component-doc single-source contract asks of both of its consumers in Section 5; retire the inline per-component content, which that Section names as drift for a bounded run to remove; and dismantle the guard script, deciding in the same run what remains of its separate check over blockCatalog.js. Remove the inline certification label with it: no author-facing component is certified today, and component status has one source that every other surface points at and never restates. This Run changes the Guide runtime only; it authors and edits no packet, changes no component status, and makes no production-readiness claim.

### 10.2 ¿Qué queda del run bajo la premisa nueva (dos fuentes, audiencias distintas)?

El texto tiene **cinco cláusulas**. Bajo la premisa nueva, **una muere, tres sobreviven intactas
y una cambia de signo**:

| Cláusula del texto | Bajo la premisa nueva |
|---|---|
| «Make the Guide **render the canonical packets** … read-only, which is what … **Section 5** asks of both of its consumers» | **MUERE.** Es la premisa exacta que el operador invirtió. Y arrastra con ella la Sección 5 del contrato, que declara «Both consumers render the same packet» y fija como *target* de la Guía «Renders the canonical packet; keeps no inline per-component content and no own status». |
| «**retire the inline per-component content**, which that Section names as drift» | **CAMBIA DE SIGNO.** Si la Guía es fuente propia de producto, el contenido inline **deja de ser deriva**: es el contenido de autor. Lo que hay que retirar no es el contenido — es la **asimetría** entre tres componentes ricos en JSX y catorce alimentados del catálogo (§13.3). |
| «**dismantle the guard script**, deciding in the same run what remains of its separate check over `blockCatalog.js`» | **SOBREVIVE, y se vuelve más urgente.** Medido: el guard son 42 líneas que vigilan seis patrones prohibidos —cuatro marcadores de mojibake (`U+00C3`, `U+00C2`, `U+00E2`, `U+FFFD`) y dos etiquetas retiradas— sobre `ComponentGuide.jsx` y `blockCatalog.js`. Si esos dos archivos pasan a ser **fuente de producto editada por diecisiete runs**, un guard de integridad de texto sobre ellos es *más* necesario, no menos; pero el que hay vigila cadenas, no estructura. |
| «**Remove the inline certification label**: no author-facing component is certified today, y el status tiene una sola fuente» | **SOBREVIVE INTACTA.** No depende de qué fuente alimente la Guía. Medido: tres `statusLabel` inline en el JSX — `'Certificado'` (línea 45, **contradice** la matriz, donde `list` es `MANUAL_QA_APPROVED`) y `'COMPONENT_CERTIFIED / DOCS_APPROVED / NOT_WEB_CERTIFIED'` dos veces (líneas 172 y 294). |
| «This Run **changes the Guide runtime only**; it authors and edits no packet, changes no component status» | **SOBREVIVE**, y bajo la premisa nueva es aún más necesaria como frontera. |

**Lo que queda es un run de higiene del runtime de la Guía**: quitar las etiquetas de estado
inline y desmontar/reencuadrar el guard. **Su justificación principal —cablear la Guía al
packet— ya no existe.**

### 10.3 ¿Fijar el contrato de contenido de autor es el mismo run reencuadrado, o es otro?

**Es otro. Con margen.** Razones medidas:

| Eje | El run tal como está | El run que el operador describe |
|---|---|---|
| **Superficie de escritura** | `ComponentGuide.jsx`, `checkComponentGuideTextIntegrity.cjs`, `blockCatalog.js` — **código** | un documento de contrato bajo `docs/docs_management/` — **documentación** |
| **Carril** | `DEVELOPMENT` (correcto para runtime) | `DOCUMENTATION` (define secciones, idioma y dueño) |
| **Producto** | un runtime que consume packets | una norma que otros runs cumplen |
| **Precedencia** | consume el contrato (`qo 3`) | **es un contrato**, hermano de `qo 3` |
| **No-claims** | «changes the Guide runtime only» | tendría que decir lo contrario: no toca runtime |

Un run que **fija qué secciones lleva la Guía, en qué idioma, y quién la mantiene** es la
contraparte de `RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001` para la segunda fuente. Su
forma natural es la de ese run: definir, no implementar. Meterlo dentro de un run de higiene de
runtime mezcla contrato con código en la misma unidad, que es justo lo que el modelo canónico
separa.

**Nota de idioma, que el contrato de contenido tendría que resolver:** medido, la Guía está **en
español** (`title: 'Lista'`, `'Nombre breve para encabezar la lista'`) y los diecisiete packets
están **en inglés**. Son dos idiomas para dos audiencias — coherente con «dos fuentes con
audiencias distintas», pero hoy no está declarado en ninguna parte.

**Recomendación:** dos runs. Uno de contrato (carril `DOCUMENTATION`, temprano) y uno de higiene
de runtime (`DEVELOPMENT`, después). *La decisión es del operador.*

### 10.4 ¿Qué runs se ejecutarían antes que él y escribirían contenido de Guía?

**Hoy: ninguno.** Medido sobre los 74 textos:

- `ComponentGuide.jsx` se menciona en **1 run**: `qo 74`.
- `blockCatalog.js` se menciona en **1 run**: `qo 74`.
- `checkComponentGuideTextIntegrity.cjs` se menciona en **1 run**: `qo 74`.
- «Component Guide» en prosa aparece en **5 runs**: `qo 3` (contrato, la nombra como
  consumidor), `qo 9` (la DoD, la nombra como superficie a actualizar), `qo 55` (Guía de Slide,
  formato documental), `qo 56` (plan de runs Slide), `qo 74`.

Ninguno de los cuatro anteriores **escribe** los archivos de la Guía. **Su posición al final de
la cola es coherente con el diseño actual.**

**Bajo la premisa nueva deja de serlo, y por un margen grande.** Si la Guía pasa a los runs de
implementación, **los diecisiete runs de implementación escriben contenido de Guía**, y
**dieciséis de ellos están en `qo 13`–`qo 46`, es decir, entre 28 y 61 posiciones por delante de
`qo 74`.** Peor aún: la DoD que esos diecisiete ya citan (§0.4) **ya dice** «update the …
component-doc packet **and Component Guide source**». El desfase no es teórico: **está ya
escrito en el grafo.**

Consecuencia medible: si `qo 74` mantiene su posición, dieciséis runs escribirían contenido de
Guía **contra un mecanismo asimétrico y sin contrato de contenido**, y el run que iba a
normalizar ese mecanismo llegaría cuando ya no queda nada que normalizar. **Sí, su posición
actual es un problema**, y lo es tanto para la higiene del runtime como —sobre todo— para el
contrato de contenido de §10.3, que debería ir **antes** de `qo 13`, no después de `qo 73`.

---

## 11. ¿Los 17 runs de implementación mencionan la Guía? — TABLA (criterio 11)

Términos buscados en `title` + `summary` + `full_description` de cada uno: *Component Guide*,
*guide/guides*, *block catalog / blockCatalog*, *author content / authored content*, *packet*,
*docs/*, *documentation*.

| # | Componente | Run de implementación (por título) | `qo` | `status` | ¿Menciona Guía / catálogo / contenido de autor? | Cita |
|---|---|---|---|---|---|---|
| 1 | Columns | Audit and implement the Columns component | 13 | completed | **NO** | — |
| 2 | Header | Audit and implement the Header component | 15 | completed | **NO** | — |
| 3 | List | Audit and implement the List component | 18 | planned | **NO** | — |
| 4 | IconList | Audit and implement the IconList component | 20 | planned | **NO** | — |
| 5 | Card | Audit and implement the Card component | 22 | planned | **NO** | — |
| 6 | Video | Audit and implement the Video component | 24 | planned | **NO** | — |
| 7 | Narrative | Audit and implement the Narrative component | 26 | planned | **NO** | — |
| 8 | Callout | Audit and implement the Callout component | 28 | planned | **NO** | — |
| 9 | Details | Audit and implement the Details component | 30 | planned | **NO** | — |
| 10 | Arithmetic | Audit and implement the Arithmetic component | 32 | planned | **NO** | — |
| 11 | Rule | Audit and implement the Rule component | 34 | planned | **NO** | — |
| 12 | **Split** | Decide scope and enable the Split component | 36 | planned | **SÍ — parcial** | «Decide the scope of the Split component, which **the editor block catalog** currently marks disabled and which exists only as a Columns child rather than a top-level block.» |
| 13 | Table | Audit and implement the Table component | 38 | planned | **NO** | — |
| 14 | ConceptGrid | Audit and implement the ConceptGrid component | 40 | planned | **NO** | — |
| 15 | Hierarchy | Audit and implement the Hierarchy component | 42 | planned | **NO** | — |
| 16 | Timeline | Audit and implement the Timeline component | 44 | planned | **NO** | — |
| 17 | Visual | Audit and implement the Visual component | 46 | planned | **NO** | — |

**Recuento: 1 de 17 menciona el catálogo de bloques; 0 de 17 mencionan la Guía de componente;
0 de 17 mencionan contenido de autor, packet, `docs/` o documentación.**

### 11.1 Matiz importante sobre el único «sí»

La mención de Split es a **`blockCatalog.js`, el mismo archivo que alimenta la Guía para catorce
componentes** (§13). Pero la cita lo usa como **fuente de estado de habilitación**
(«currently marks disabled»), no como fuente de contenido de Guía. **Es el mismo archivo con dos
roles**, y el run solo toca uno. Cuenta como «sí» en el conteo literal; **no cuenta como
contenido de Guía en el alcance.**

### 11.2 El dato que cambia la pregunta

**Los 17 runs de implementación citan en su `depends_on` la Definition of Done
(`RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001`, `qo 9`, completed) — 17 de 17,
verificado.** Y esa DoD **ya incluye**: «update the component's canonical single-source
component-doc packet **and Component Guide source**; refresh docs_index freshness and evidence».

**El deber ya existe por herencia; lo que no existe es su enunciado en el texto de cada run.**
Eso cambia la naturaleza del criterio 12: no es «añadir un alcance nuevo», es «hacer explícito
un alcance heredado que hoy ningún run enuncia».

---

## 12. Qué haría falta añadir a su texto (criterio 12)

**No se escribe aquí — se describe qué tendría que decir.** Cuatro cosas, en este orden:

1. **La cita de la DoD que ya heredan.** Hoy la dependencia a `qo 9` existe en el grafo pero no
   en la prosa. El texto tendría que nombrar que consume la Definition of Done y que ésta le
   obliga al packet y a la Guía. Sin esto, el executor lee el texto y no ve el deber.
2. **Qué superficie de Guía escribe, nombrada por archivo.** El texto de estos runs es concreto
   con las rutas (los doc-runs citan su packet; `qo 74` cita `ComponentGuide.jsx`). El alcance de
   Guía tendría que citar la ruta que le toca — y **ahí es donde el texto deja de ser uno solo**.
3. **Qué parte del contenido de Guía es contenido de autor y cuál es derivado.** Bajo la premisa
   nueva la Guía es producto: campos, cuándo usarlo, cuándo no, en español y en lenguaje de
   autor. El texto tendría que distinguirlo del packet técnico para que el executor no duplique.
4. **El no-claim correspondiente.** Estos diecisiete runs ya declaran «Verify the result by human
   visual QA rather than an automated test suite». Tendrían que declarar además que escribir
   Guía **no** cambia el estado de certificación — el mismo no-claim que `qo 74` lleva y que la
   Guía hoy **viola** con sus tres `statusLabel` inline (§10.2).

### 12.1 ¿Es el mismo texto para los diecisiete, o difiere por componente?

**Difiere, y por dos ejes independientes que no coinciden entre sí.**

**Eje A — el mecanismo (§13). Parte 3 / 14.**

| Grupo | Componentes | Archivo que tendría que tocar |
|---|---|---|
| Guía rica en JSX | **Columns, Header, List** (3) | `ComponentGuide.jsx` — objetos `columnsGuide` / `headerGuide` / `listGuide` |
| Guía desde catálogo | los **14** restantes | `blockCatalog.js` — campo `docs` de su entrada |

Un texto que diga «actualiza la fuente de la Guía» sin decir **cuál** es ambiguo para los
diecisiete, porque no hay un solo lugar. **Éste es el eje que hace imposible un texto único.**

**Eje B — la variante de alcance que ya existe. Parte 11 / 4 / 1 / 1.** Los diecisiete textos
actuales ya no son uno solo: colapsan en **4 firmas distintas** —

| Firma | Cuántos | Componentes | Qué la distingue |
|---|---|---|---|
| #1 | 11 | Columns, Header, List, IconList, Card, Video, Narrative, Callout, Details, Table, Visual | solo contrato de color |
| #2 | 4 | Arithmetic, ConceptGrid, Hierarchy, Timeline | color **+** contrato de math / Formula Inserter |
| #3 | 1 | **Rule** | color + math + «the accepted RULE_ONLY Smart Formula Field baseline» |
| #4 | 1 | **Split** | no es «audit and implement» sino «decide scope and enable»; el único con decisión de alcance abierta |

**Los dos ejes no se alinean.** Columns/Header/List (eje A, grupo rico) están los tres en la
firma #1 del eje B; Rule y Split, que ya tienen texto propio, están en el grupo de catálogo.
El resultado es que el texto de Guía necesita **al menos 2 variantes por eje A**, y para Split
probablemente una tercera: su entrada de catálogo está marcada como deshabilitada y su alcance
está por decidir, así que su cláusula de Guía tendría que ser **condicional a esa decisión**.

**Y hay un prerrequisito duro:** los tres componentes del grupo rico tienen contenido de Guía en
**JSX ejecutable**, no en datos. Un run de componente que «escriba contenido de Guía» sobre
`ComponentGuide.jsx` está editando un componente React con lógica de layout, breakpoints y
`useMemo`, no rellenando un campo. Ver §13.4.

---

## 13. La asimetría de la Guía (criterio 13)

**La medición previa del ticket es correcta en las tres cifras, y las tres se confirman con
alcance exacto.**

### 13.1 Tres ricos, catorce del catálogo — CONFIRMADO

`tools/author-lite/editor-ui/src/features/editor/components/preview/ComponentGuide.jsx`
(**2 609 líneas**) define tres objetos de guía inline y los despacha por `item.action`:

| Objeto | Líneas en el JSX | Componentes |
|---|---|---|
| `listGuide` | L42–L124 = **83** | List |
| `headerGuide` | L169–L242 = **74** | Header |
| `columnsGuide` | L291–L475 = **185** | Columns |
| **Total contenido de Guía inline** | | **342 líneas** |

El despacho es explícito y cerrado — hay tres `if (item.action === …)` y un fallback:

> `return <GenericComponentGuide item={item} mode={mode} onModeChange={setMode} />;`

y el propio archivo declara la partición en una constante:

> `const isRichGuide = view === 'component' && ['columns', 'header', 'list'].includes(item?.action);`

`GenericComponentGuide` lee **`item.docs.user` y `item.docs.developer`**, que vienen de
`blockCatalog.js`. **Los otros catorce componentes Web se alimentan del catálogo. Confirmado:
3 + 14 = 17.**

### 13.2 Las 403 líneas inalcanzables — CONFIRMADO EXACTO, con precisión de alcance

`blockCatalog.js` tiene **1 177 líneas** y **20 entradas con `docs:`** (17 Web + 3 Slide:
`titleSlide`, `columnsSlide`, `visualBlock`). Midiendo cada bloque `docs:` por emparejamiento de
llaves:

| Componente | Líneas del bloque `docs:` | ¿Se renderiza? |
|---|---|---|
| **header** | **16** | **NO** — interceptado por `headerGuide` |
| **list** | **305** | **NO** — interceptado por `listGuide` |
| **columns** | **82** | **NO** — interceptado por `columnsGuide` |
| **SUBTOTAL INALCANZABLE** | **403** | |
| card | 16 | sí |
| callout | 15 | sí |
| narrative | 15 | sí |
| rule | 42 | sí |
| details | 42 | sí |
| arithmetic | 46 | sí |
| timeline | 50 | sí |
| hierarchy | 47 | sí |
| conceptGrid | 45 | sí |
| split | 14 | sí |
| table | 47 | sí |
| iconList | 15 | sí |
| visual | 15 | sí |
| video | 15 | sí |
| **SUBTOTAL ALCANZABLE (14)** | **424** | |

**403 exactas. La cifra del ticket es correcta.**

**Corrección de alcance, por el criterio 18:** 403 es el conteo de líneas de los **bloques
`docs:`** de las tres entradas, no de las entradas completas. Las **entradas** completas de esos
tres componentes suman **427 líneas** (header L139–162 = 24, list L233–545 = 313, columns
L945–1034 = 90); las 24 de diferencia son metadatos —`action`, `label`, `category`— que **sí** se
usan (el rail de la paleta los consume vía `WEB_COMPONENT_UI`). **Lo inalcanzable es la
documentación, no la entrada.** Si la cabina retira 427 líneas en vez de 403, rompe el rail.

**Corrección de unidad, la segunda de esta medición:** el ticket y los diecisiete textos hablan
de **«two stale pointers»**. Son **dos destinos distintos** —la matriz de certificación y
`REFERENCE-DRAFT-JSON`— pero **cuatro ocurrencias por packet** (dos de cada uno: la fila
«Certification status» de la tabla de metadatos y la sección «Status and evidence»; la nota de
«Author fields» y el pie de «Example»). Medido en los dieciséis pendientes: **2 + 2 en cada uno,
64 ocurrencias en total.** `COLUMNS.md` tiene 0 caducas y 4 reparadas. Un validador reportará 64
hallazgos, no 32.

### 13.3 Estado real de los diecisiete packets, medido

| Comprobación | Resultado |
|---|---|
| Packets en disco bajo `docs/components/web/` | **17** |
| Packets registrados en `.aiw/docs/docs_index.json` | **17** — todos |
| Packets con las 8 secciones requeridas del contrato §3 | **17 de 17 — ya conforme** |
| Packets con rutas de renderer que resuelven en disco | **17 de 17** (`SPLIT.md` lleva la ruta con una coletilla `(legacy base name renderSplitCard)`; el archivo `src/builders/web/partials/renderSplitCard.js` existe) |
| Packets con los dos punteros reparados | **1 de 17** (`COLUMNS.md`) |
| Packets con banner refrescado | **1 de 17** (`COLUMNS.md`, `2026-07-30`; los otros dieciséis, `2026-07-12`) |
| Packets con marca de reverificación en el registro | **1 de 17** (`COLUMNS.md`) |
| Rango de tamaño | 66–74 líneas los dieciséis; **146** `COLUMNS.md` |

### 13.4 ¿Puede un run de componente escribir contenido de Guía sin unificar antes el mecanismo?

**No. Y no por preferencia de diseño, sino por tres obstáculos medidos.**

1. **No hay un destino único.** Para Card el destino es un campo `docs:` de datos en
   `blockCatalog.js`; para Header es un objeto JS dentro de un componente React de 2 609 líneas.
   Un texto de run que diga «actualiza la fuente de la Guía» **no designa un archivo** para los
   diecisiete. El primer run que lo intente tiene que decidir el mecanismo por su cuenta — que es
   exactamente lo que la disciplina de runs evita.

2. **Escribir en el grupo rico es editar runtime, no datos.** Los tres objetos ricos alimentan
   componentes React distintos (`ListAuthorGuide` / `ListProgrammerGuide`,
   `HeaderAuthorGuide` / `HeaderProgrammerGuide`, `ColumnsAuthorGuide` / `ColumnsProgrammerGuide`)
   con su propia forma de datos, sus breakpoints (`GUIDE_TWO_COLUMN_BREAKPOINT`,
   `CODE_BLOCK_TWO_COLUMN_BREAKPOINT`, …) y su `useMemo`. **Un run de componente escribiendo ahí
   toca código de presentación**, no contenido. Y `CLAUDE.md` regla 7 prohíbe dos runs
   simultáneos sobre el mismo archivo: **los tres componentes ricos comparten `ComponentGuide.jsx`,
   así que sus runs quedan serializados entre sí** aunque el operador quisiera paralelizarlos.

3. **El guard vigila justamente ese archivo.** `checkComponentGuideTextIntegrity.cjs` (42 líneas)
   falla con `exit 1` si `ComponentGuide.jsx` o `blockCatalog.js` contienen cualquiera de seis
   patrones, entre ellos cuatro marcadores de mojibake y la etiqueta retirada `'Lista destacada'`.
   Contenido de autor en español, escrito por diecisiete runs distintos, es **exactamente** el
   escenario que dispara falsos positivos de mojibake si una codificación se desvía. **El guard
   está diseñado para congelar el texto, no para dejar que diecisiete runs lo escriban.**

**Además, la asimetría es contradictoria en su contenido, no solo en su mecanismo.** El objeto
`listGuide` declara `statusLabel: 'Certificado'` (línea 45) mientras
`COMPONENT_CERTIFICATION_MATRIX.md` —fuente única de estado por contrato §2— tiene `list` en
`MANUAL_QA_APPROVED`. **La Guía ya afirma un estado que la fuente única contradice.** Poner
diecisiete runs a escribir sobre esa superficie sin unificar el mecanismo multiplica el problema
por diecisiete.

**Respuesta: el mecanismo tiene que unificarse antes.** El contrato de contenido de autor de
§10.3 y la unificación del mecanismo son el prerrequisito de la cláusula de Guía en los
diecisiete runs, no su consecuencia. *La decisión sobre cómo unificarlo es del operador.*

---

## 14. Verificación de las cifras del ticket (criterio 18)

| Cifra del ticket | Veredicto | Valor medido |
|---|---|---|
| «los 23 runs del carril `DOCUMENTATION`» | **CORRECTA** | 23 exactos (3 completed, 20 planned) sobre 74 runs totales |
| «diecisiete emparejados» | **CORRECTA** | 17, cada uno con su run de implementación resuelto |
| «uno ya cerrado y dieciséis pendientes» | **CORRECTA** | Columns `completed`; 16 `planned` |
| «diecisiete aristas hacia los doc-runs» (run de auditoría) | **CORRECTA** | 17, y son el 100 % de su `depends_on` |
| «Audit the Web component documentation as a whole» | **CORRECTA** | título exacto, `RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001` |
| «Deep documentation audit» | **CORRECTA** | título exacto, `RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001` |
| «Implement the Component Guide as a canonical packet consumer» | **CORRECTA** | título exacto. **Corrección de carril:** el ticket lo trata dentro del bloque de `DOCUMENTATION`; está en **`DEVELOPMENT`** (campo `lane` ausente → default). No es uno de los 23. |
| «tres componentes tienen guía rica en el JSX» | **CORRECTA** | Columns, Header, List — declarado en el propio código (`isRichGuide`) |
| «catorce se alimentan del catálogo de bloques» | **CORRECTA** | 14, vía `GenericComponentGuide` → `item.docs` |
| «403 líneas inalcanzables» | **CORRECTA — con precisión de alcance** | 403 exactas, pero son las líneas de los **bloques `docs:`**, no de las entradas completas (que suman 427; las 24 de diferencia **sí** se usan — §13.2) |
| «su posición actual al final de la cola» (Guide wiring) | **CORRECTA** | `qo 74` de 74 — el último |
| «dos stale pointers» (texto de los doc-runs) | **CORRECTA en destinos, INCORRECTA en ocurrencias** | 2 destinos, **4 ocurrencias por packet**, **64 en los dieciséis pendientes** — §13.2 |

**Dos correcciones de unidad/alcance, ambas señaladas arriba** (el 403 y los «dos punteros»), más
una corrección de carril (el run de la Guía).

---

## 15. Cero escrituras en `cantu-studio` (criterio 14)

**Verificado por huella completa del árbol, antes y después, con `node_modules` cubierto.**

Método: recorrido recursivo de **todo** el árbol (`.git` incluido, `node_modules` incluido)
registrando `ruta|tamaño|mtime` de cada archivo, ordenado, y md5 del conjunto. No se usó git en
ninguna forma.

| Magnitud | ANTES | DESPUÉS | Δ |
|---|---|---|---|
| Archivos totales | **21 513** | **21 513** | **0** |
| Archivos fuera de `.git` | 21 344 | 21 344 | 0 |
| Entradas `.git` | 169 | 169 | 0 |
| **Entradas bajo `node_modules`** | **20 255** | **20 255** | **0** |
| **md5 del árbol completo** | `47a5359a220607da2e929e361bcb565a` | `47a5359a220607da2e929e361bcb565a` | **IDÉNTICO** |
| md5 del árbol sin `.git` | `17caeb40b3a272aa71b07b7c674a1295` | `17caeb40b3a272aa71b07b7c674a1295` | **IDÉNTICO** |

`node_modules` está cubierto y no vive en la raíz: son **tres** árboles anidados —
`tools/author-lite/node_modules/`, `tools/author-lite/compiler-api/node_modules/` y
`tools/author-lite/editor-ui/node_modules/` — que suman las 20 255 entradas. La huella los
incluye a los tres.

**Ni un byte, ni un temporal.** Todos los archivos de trabajo (5 scripts de medición y 3 archivos
de huella) viven en el scratchpad de sesión, **fuera de todo repo**:
`C:\Users\chris\AppData\Local\Temp\claude\C--Users-chris-Documents-AIW-Workspace\5a0e89eb-8f00-4b7f-a3a8-e2354383512a\scratchpad\`.

---

## 16. Superficies disjuntas con el hilo paralelo (criterio 22)

Huella de `aiw-console` por el mismo método:

| Magnitud | ANTES | DESPUÉS |
|---|---|---|
| Archivos totales | 382 | 385 |
| Archivos fuera de `.git` | 263 | 266 |
| Entradas `.git` | 119 | 119 |
| md5 del árbol completo | `871f302f667ec38c7b449f682acf7420` | `d7734f1db7a80dcf8c5b1ca1fa98476d` |
| md5 del árbol sin `.git` | `ca2ab015bdaa38e355c60484d7b30a38` | `03da80a60a295f86352be543b374991c` |

Los md5 de `aiw-console` cambian **por construcción**, porque escribir el record es el producto
del encargo. El delta bruto es `+3` archivos y una modificación, **y solo uno de los cuatro
cambios es mío.** Diferencia completa, declarada archivo por archivo:

| Archivo | Cambio | ¿De este encargo? |
|---|---|---|
| `context/aiw-console/records/MEDICION-CARRIL-DOCUMENTATION-Y-CASCADA-CANTU.md` | creado | **SÍ — es el producto** |
| `tests/classification-derivation.test.mjs` | creado | **No — hilo paralelo** |
| `tests/classification-transport-and-console.test.mjs` | creado | **No — hilo paralelo** |
| `tests/roadmap-engine.test.mjs` | modificado (15 946 → 16 516 bytes) | **No — hilo paralelo** |

**Las superficies fueron disjuntas, que es lo que el criterio pedía.** El hilo paralelo escribió
en `tests/` durante la ventana de esta medición; este encargo escribió en
`context/aiw-console/records/`. **Cero solapamiento de archivos.** Se declaran los tres cambios
ajenos porque un md5 de árbol no distingue autoría y sería deshonesto atribuirlos aquí — o
callarlos.

**No se tocó nada del motor de roadmap de `aiw-console`** (`tools/roadmap/roadmap-core.mjs`,
`tools/roadmap/roadmap-plan.mjs`), que está modificado y sin commitear por el hilo paralelo. No
se leyó ni se ejecutó. **No se tocó `aiw-console/roadmap/roadmap.json`**, que es el roadmap de
otro proyecto.

---

## 17. Validador en `EXIT 0`, por la vía que no escribe (criterio 19)

Vía usada: `node tools/project-console/validate-project-console-state.mjs` **desde
`cantu-studio`**. Es el validador propio del proyecto medido, **no** el motor de `aiw-console`.
Verificado por inspección previa: **no contiene ninguna llamada de escritura** (`fs.write*`,
`mkdir`, `rename`); solo `fs.existsSync` y `fs.readFileSync`.

| Medida | ANTES | DESPUÉS |
|---|---|---|
| **Exit code** | **0** | **0** |
| Veredicto | `Project Console state validation passed.` | `Project Console state validation passed.` |
| **Objetivos** | **7** | **7** |
| **Fases** | **28** | **28** |
| **Runs** | **74** | **74** |
| Cola: `needs_human_decision` | 0 | 0 |
| Cola: `now` | 0 | 0 |
| Cola: `ready_next` | 21 | 21 |
| Cola: `later` | 36 | 36 |
| Cola: `history` | 17 | 17 |
| Docs indexados | 149 | 149 |
| Docs curados primary-visible | 60 de 149 | 60 de 149 |
| Component statuses | 16 | 16 |
| Episodios de procedencia git | 9 | 9 |
| Snapshot git history | 918 commits / 2 ramas | 918 commits / 2 ramas |
| Warnings de rebase (no bloqueantes) | 1 — la arista externa de §7.4 | 1 — idéntico |

**Nada se movió.** Los 7/28/74 coinciden con mi conteo independiente sobre el JSON, y los 21
`ready_next` coinciden con mi cálculo de runs `planned` con todas sus dependencias `completed`
(§8.3).

---

## 18. Disciplina del encargo

| Restricción | Cumplimiento |
|---|---|
| Cero escrituras en `cantu-studio` | ✔ md5 idéntico antes/después, `node_modules` cubierto (§15) |
| No usar el motor de roadmap de `aiw-console` | ✔ canónico leído como JSON plano; el motor no se leyó ni se ejecutó |
| No proponer el rediseño ni escribir texto de run | ✔ se mide, se cita verbatim y se recomienda; no hay ni una línea de texto de run propuesto |
| No reparar nada | ✔ punteros caducos, 403 líneas inalcanzables, `statusLabel` contradictorio y arista externa: **nombrados, no tocados** |
| Ningún `status` tocado, ningún run cerrado, `.project/` no re-emitido | ✔ validador reporta las mismas cifras de cola antes y después |
| Git en cualquier forma | ✔ no se ejecutó |
| Servidores, suites | ✔ no se levantaron ni se corrieron |
| Todo derivado por título y por carril | ✔ los `queue_order` se reportan como estado medido, no como identidad |

---

## 19. Archivos escritos por este encargo, y ninguno más

| Archivo | Repo | Acción |
|---|---|---|
| `context/aiw-console/records/MEDICION-CARRIL-DOCUMENTATION-Y-CASCADA-CANTU.md` | `aiw-console` | creado |

**Una sola fila. Es este record.**

Records en `context/aiw-console/records/` al **empezar** este encargo: **84**, todos `.md`.
Sin colisión de nombre — verificado contra los 84.

Al **terminar**: **86**. La diferencia es `+2`, no `+1`, y solo uno es mío:

| Record | ¿De este encargo? |
|---|---|
| `MEDICION-CARRIL-DOCUMENTATION-Y-CASCADA-CANTU.md` | **SÍ** |
| `CLASIFICACION-EMISOR-Y-CONSOLA.md` | **No — el hilo paralelo lo escribió durante esta ventana** |

Se declara por la misma razón que en §16: un conteo de directorio no distingue autoría. **Este
encargo escribió un archivo. El número 86 incluye uno ajeno.**
