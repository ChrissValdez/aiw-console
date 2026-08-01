# Rediseño del carril DOCUMENTATION de Cantu Studio

> Fecha: 2026-07-31 · Proyecto editado: `cantu-studio` · Record escrito en `aiw-console`.
> Encargo de taller. **Edita el roadmap; no ejecuta ninguno de los runs que toca.**
> Una sola escritura sobre `.aiw/roadmap/roadmap.json`, más la enmienda mínima de la
> Definition of Done. `.project/` no re-emitido. Git no ejecutado en ninguna forma.
> Ninguna suite corrida.

**Entradas leídas enteras antes de tocar nada:**
`MEDICION-CARRIL-DOCUMENTATION-Y-CASCADA-CANTU.md` (1 008 líneas) y
`MEDICION-SUPERFICIE-DOC-COMPONENTES-WEB-Y-FORMA-DEL-PACKET-CANTU.md` (783 líneas),
más la Definition of Done, el JSX de la Guía y el catálogo de bloques.

---

## 0. Resultado en una tabla

| Magnitud | ANTES | DESPUÉS | Δ |
|---|---:|---:|---|
| Runs | 74 | **63** | −11 |
| Aristas `depends_on` | 154 | **126** | −28 |
| Objetivos | 7 | 7 | 0 |
| Fases | 28 | 28 | 0 |
| `completed` | 17 | 17 | **mismos ids** |
| `planned` | 57 | 46 | −11 |
| Carril `DEVELOPMENT` | 51 | 52 | +1 |
| Carril `DOCUMENTATION` | 23 | 11 | −12 |
| `ready_next` | 21 | 20 | −1 |
| `later` | 36 | 26 | −10 |
| `history` | 17 | 17 | 0 |
| Bytes no-ASCII del canónico | 24 | **24** | **0** |
| Bytes del archivo | 101 151 | 91 813 | −9 338 |
| Validador | EXIT 0 | **EXIT 0** | — |
| Component statuses | 16 | **16** | 0 |
| Avisos del validador | 1 (arista externa) | 1, **idéntico** | 0 |

md5 del canónico: `c917585932d097d725b124ef09473243` → **`f171abc13962f4d94d5179ff1da0f202`**.

**El total esperado se declaró antes de escribir** — 74 − 16 − 1 + 4 + 1 + 1 = **63** — y se
verificó después. Lo mismo con las aristas: **126** previsto, 126 medido (§7).

---

## 1. Método, y la guarda que no saltó

| Paso | Resultado |
|---|---|
| Motor de `aiw-console`, leído no modificado | `roadmap-core.mjs` md5 `f01ad678b980eb01d588b695c06a928d`, `roadmap-plan.mjs` md5 `3d81e4d2dba58bb1378dd4ef555ddd88`, idénticos antes y después |
| Respaldo con md5 fuera del repo | `scratchpad/backup/roadmap.BASELINE.json`, md5 `c917585932d097d725b124ef09473243` |
| **Roundtrip byte-exacto ANTES de tocar** | `loadRaw → parseRoadmap → serialize(CRLF)` devuelve **los mismos 101 151 bytes y el mismo md5**. CRLF detectado |
| Preflight `checkInvariants` | **0 errores** con la arista externa declarada |
| **Ensayo completo sobre copia** | 33 ops del motor, cada una por `planEdit` + `applyPlan`, **escribiendo la copia en cada op** |
| **`cmp`** | ensayo op-a-op vs. driver de una pasada: **IDÉNTICOS**, md5 `f171abc13962f4d94d5179ff1da0f202` |
| Escritura del canónico | **UNA**, `applyWrite` atómico con el validador de Cantu inyectado y rollback armado. `written: true, rolledBack: false` |

**Derivación por título, y ningún `run_id` tecleado.** Los 26 runs existentes que este
encargo tocó o usó como ancla se resolvieron **por `title`** contra el árbol; la guarda
exige **exactamente una** coincidencia y aborta con 0 o con 2+. **No saltó ni una vez.**
Los únicos `run_id` escritos a mano son los **seis nuevos**, que no tienen título previo
del que derivarse.

---

## 2. (A) — Retirada del run de auditoría de documentación de conjunto

Derivado por título: **«Audit the Web component documentation as a whole»** →
`RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001`, `queue_order` 49, carril `DOCUMENTATION`,
`planned`.

### 2.1 Texto verbatim del run retirado

**`title`**
> Audit the Web component documentation as a whole

**`summary`**
> General audit that the canonical documentation of the seventeen Web components is consistent, complete, and ready, after all component documentation runs close, recording one conformance verdict per component.

**`full_description`**
> After the seventeen Web component documentation runs close, audit the Web component documentation as a whole rather than any single component. Verify that each component's canonical packet under docs/components/web/ follows the component-doc single-source contract at docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md, whose Section 3 fixes the required sections and the field discipline; and that the repairs those seventeen runs owe have landed in every packet, with no stale pointer left behind and each status banner and registry entry refreshed together. Record one verdict per component: conforming, or exactly what it still lacks. This Run verifies and records the whole; it does not re-document individual components, does not repair any packet, and it makes no production-readiness claim.

**`depends_on` (17, verbatim):** `RUN-CANTU-WEB-COLUMNS-DOC-001`, `RUN-CANTU-WEB-HEADER-DOC-001`,
`RUN-CANTU-WEB-LIST-DOC-001`, `RUN-CANTU-WEB-ICONLIST-DOC-001`, `RUN-CANTU-WEB-CARD-DOC-001`,
`RUN-CANTU-WEB-VIDEO-DOC-001`, `RUN-CANTU-WEB-NARRATIVE-DOC-001`, `RUN-CANTU-WEB-CALLOUT-DOC-001`,
`RUN-CANTU-WEB-DETAILS-DOC-001`, `RUN-CANTU-WEB-ARITHMETIC-DOC-001`, `RUN-CANTU-WEB-RULE-DOC-001`,
`RUN-CANTU-WEB-SPLIT-DOC-001`, `RUN-CANTU-WEB-TABLE-DOC-001`, `RUN-CANTU-WEB-CONCEPTGRID-DOC-001`,
`RUN-CANTU-WEB-HIERARCHY-DOC-001`, `RUN-CANTU-WEB-TIMELINE-DOC-001`, `RUN-CANTU-WEB-VISUAL-DOC-001`.

**Verificado: 17 de 17 aristas apuntan a doc-runs por componente. Es el 100 % de su
`depends_on`** — el run no tiene ninguna otra dependencia.

### 2.2 El solape duro, citado de los dos lados

`RUN-JAME-WEB-READINESS-EVIDENCE-001` (`qo` 48, carril `DEVELOPMENT`, `planned`),
**«Audit the Web components as a whole»**, dice en su `full_description`, verbatim:

> «…that **each component's canonical packet exists and follows the component-doc
> single-source contract**; and that no component was left with inherited status labels,
> unresolved documented conflicts, or a missing integration point.»

Y el run retirado decía, verbatim:

> «Verify that **each component's canonical packet under docs/components/web/ follows the
> component-doc single-source contract** at docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md,
> whose Section 3 fixes the required sections and the field discipline»

**Es la misma cláusula.** El run de `DEVELOPMENT` ya audita que el packet canónico de cada
componente cumple el contrato, y ese run **no se toca**: conserva sus 17 aristas hacia los
runs de implementación y su texto entero. El sujeto que quedaba del run retirado —una vez
que sus diecisiete dependencias desaparecen— era exactamente esa cláusula, ya cubierta.

### 2.3 Un dependiente que la medición no listó, y cómo se resolvió

**La medición previa contó los dependientes de los diecisiete doc-runs (uno: el run
retirado) pero no los del propio run retirado.** Medido aquí: **tiene uno.**

`RUN-JAME-AUTHORING-WORKSPACE-UX-AUDIT-001` (`qo` 59), «Audit Cantu Studio UX and route
concrete follow-up runs», lo citaba en su `depends_on`:

| | `depends_on` |
|---|---|
| **ANTES (3)** | `RUN-JAME-WEB-READINESS-EVIDENCE-001` · `RUN-JAME-SLIDE-READINESS-EVIDENCE-001` · **`RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001`** |
| **DESPUÉS (2)** | `RUN-JAME-WEB-READINESS-EVIDENCE-001` · `RUN-JAME-SLIDE-READINESS-EVIDENCE-001` |

**La arista se retiró, no se reasignó**, y su prosa sigue siendo cierta sin ella. El texto
del UX audit dice: «It depends on the **assembled Web component documentation and readiness
evidence**». El run que quedó, `qo` 48, tiene por `summary` verbatim: «General audit that
the seventeen Web components **and their canonical documentation** are consistent,
complete, and ready». **La dependencia que la prosa nombra la sigue satisfaciendo `qo` 48.**
Es la única arista de todo el roadmap que este encargo retira sin que su origen desaparezca,
y se declara por eso.

**Ningún otro run del roadmap pierde ninguna arista.**

---

## 3. (B) — Colapso de los dieciséis doc-runs en cuatro lotes

### 3.1 La verificación de las «tres firmas» — y la cifra real

La medición dice que los diecisiete textos colapsan en **tres firmas que solo difieren en
el nombre del archivo**. **Medido, es correcto, y la cifra fuerte es todavía menor:**

| Normalización aplicada | Firmas distintas |
|---|---:|
| Ninguna | 17 |
| Solo el nombre del componente | 17 (el residuo es el **nombre del archivo** en mayúsculas) |
| **Nombre del componente + nombre del archivo** | **1** |

Las «tres firmas» de la medición son ese residuo, agrupado: **15** cuyo archivo es
`MAYÚSCULA(nombre).md` directo, más **2** excepciones kebab —`IconList → ICON-LIST.md` y
`ConceptGrid → CONCEPT-GRID.md`—. **La afirmación es correcta; el hecho subyacente es más
fuerte que como está enunciado: es UN solo cuerpo de texto, no tres.** Longitudes medidas:
`summary` 172–179 caracteres, `full_description` 551–566. **Cero contenido propio por
componente en los diecisiete.**

Con eso, colapsar dieciséis textos idénticos en runs de lote no pierde ni una palabra de
alcance: no hay alcance por componente que perder.

### 3.2 Texto verbatim de los dieciséis retirados

Los dieciséis comparten cuerpo. Se cita **completo** el de Header, y se declara la
única variación de los otros quince.

**`title`** (patrón, con el nombre del componente)
> Verify the Header component packet

**`summary`**
> Verify the Header component packet against the component-doc single-source contract, repair its two stale pointers, and refresh its status banner and registry entry together.

**`full_description`**
> The Header packet already exists at docs/components/web/HEADER.md and is registered, so what remains is not writing it. Verify the packet against the component-doc single-source contract at docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md, whose Section 6 fixes this duty; repair the two stale pointers it carries, to the certification matrix and to REFERENCE-DRAFT-JSON; and refresh its status banner and its registry entry together. This Run still depends on its implementation run, which remains pending, and it keeps status reference-only.

**Única variación en los otros quince:** el nombre del componente y el del archivo. Lista
verbatim de los dieciséis retirados, con su `queue_order` de origen:

| `qo` | `run_id` | Archivo citado |
|---:|---|---|
| 17 | `RUN-CANTU-WEB-HEADER-DOC-001` | `HEADER.md` |
| 19 | `RUN-CANTU-WEB-LIST-DOC-001` | `LIST.md` |
| 21 | `RUN-CANTU-WEB-ICONLIST-DOC-001` | `ICON-LIST.md` |
| 23 | `RUN-CANTU-WEB-CARD-DOC-001` | `CARD.md` |
| 25 | `RUN-CANTU-WEB-VIDEO-DOC-001` | `VIDEO.md` |
| 27 | `RUN-CANTU-WEB-NARRATIVE-DOC-001` | `NARRATIVE.md` |
| 29 | `RUN-CANTU-WEB-CALLOUT-DOC-001` | `CALLOUT.md` |
| 31 | `RUN-CANTU-WEB-DETAILS-DOC-001` | `DETAILS.md` |
| 33 | `RUN-CANTU-WEB-ARITHMETIC-DOC-001` | `ARITHMETIC.md` |
| 35 | `RUN-CANTU-WEB-RULE-DOC-001` | `RULE.md` |
| 37 | `RUN-CANTU-WEB-SPLIT-DOC-001` | `SPLIT.md` |
| 39 | `RUN-CANTU-WEB-TABLE-DOC-001` | `TABLE.md` |
| 41 | `RUN-CANTU-WEB-CONCEPTGRID-DOC-001` | `CONCEPT-GRID.md` |
| 43 | `RUN-CANTU-WEB-HIERARCHY-DOC-001` | `HIERARCHY.md` |
| 45 | `RUN-CANTU-WEB-TIMELINE-DOC-001` | `TIMELINE.md` |
| 47 | `RUN-CANTU-WEB-VISUAL-DOC-001` | `VISUAL.md` |

**`RUN-CANTU-WEB-COLUMNS-DOC-001` (`qo` 14, `completed`) NO SE TOCÓ.** Verificado byte a
byte: su objeto es idéntico salvo el `queue_order`, que no se movió (sigue en 14).

### 3.3 Cuántos lotes, y por qué cuatro

La cabina estimó tres o cuatro. **Cuatro, y la medida que lo decide está escrita en el
propio contrato que estos runs consumen.** La Definition of Done, §1, dice verbatim:

> «Workshop assignments execute them in **batches of three or four components per session**.»

Y §2 fija las reglas de lote, verbatim: «**One evidence table per component**, filled
independently. A batch shares a session, never a verdict; no step result is inherited from
a sibling component.»

**16 pendientes ÷ 4 = 4 lotes exactos**, en el extremo alto de un rango que el proyecto ya
declaró para sí mismo. Se toma el extremo alto —y no tres por lote, que daría 6 lotes— por
una razón medida: **el rango 3–4 fue dimensionado para el trabajo de revalidación, que es
más pesado.** La DoD asigna a un run de componente **diez pasos** (S1–S10) incluyendo
auditoría de color, auditoría de math, roundtrip de persistencia y preparación del paquete
de QA humana. El deber de verificación de packet es un **subconjunto** de esa carga. Cuatro
packets por sesión de verificación es, contra esa vara, conservador y no optimista.

**El número no se eligió para que salieran pocos runs: se eligió contra la regla de lote
que el proyecto ya tenía escrita.**

### 3.4 Los cuatro lotes, y la conservación íntegra del deber

Los cuatro siguen el orden en que los doc-runs estaban en la cola (17,19,21,23 · 25,27,29,31 ·
33,35,37,39 · 41,43,45,47), sin reagrupar por conveniencia:

| Run nuevo | `qo` | Componentes | Carril |
|---|---:|---|---|
| `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-001` | **35** | Header, List, IconList, Card | DOCUMENTATION |
| `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-002` | **36** | Video, Narrative, Callout, Details | DOCUMENTATION |
| `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-003` | **37** | Arithmetic, Rule, Split, Table | DOCUMENTATION |
| `RUN-CANTU-WEB-PACKET-VERIFICATION-BATCH-004` | **38** | ConceptGrid, Hierarchy, Timeline, Visual | DOCUMENTATION |

Los cuatro viven en la fase **O1.P4 «Web Component Documentation and Readiness Evidence»**,
la que el run retirado dejó con un solo ocupante. **No se creó ni se borró ninguna fase.**

**Texto verbatim del lote 1** (los otros tres solo cambian los cuatro nombres y los cuatro
archivos):

**`title`**
> Verify the Header, List, IconList, and Card component packets

**`summary`**
> Verify the Header, List, IconList, and Card component packets against the component-doc single-source contract, checking every derived anchor against the schema, compiler, renderer, and sandbox fixture, repairing their stale pointers, and refreshing each status banner and registry entry together.

**`full_description`**
> The four packets already exist under docs/components/web/ and are registered, so what remains is not writing them: HEADER.md, LIST.md, ICON-LIST.md, and CARD.md. Verify each packet against the component-doc single-source contract at docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md, whose Section 6 fixes this duty. Verification is field by field and is not a comparison of the packet against the contract alone: every derived anchor is checked against the real schema, the compiler, the renderer, and the sandbox fixture, so that each stated enum, default, limit, and guardrail claim is still true of the code today. Then repair the stale pointers each packet carries, to the certification matrix and to REFERENCE-DRAFT-JSON, measured at four occurrences per packet; and refresh each packet's status banner and its entry in .aiw/docs/docs_index.json together, which a validator can detect but never write. Record one verdict per component, never one combined verdict for the batch. This Run keeps status reference-only, edits no Component Guide source, and makes no production-readiness claim.

**`depends_on` (5):** los cuatro runs de implementación de sus componentes, más el contrato.

**Dónde se conserva cada deber que la medición encontró y que ninguna aserción cubre:**

| Deber medido | Dónde vive ahora, verbatim del texto nuevo |
|---|---|
| Verificar cada anclaje derivado contra **schema, compiler, renderer y fixture de sandbox**, campo por campo | «Verification is **field by field** and is not a comparison of the packet against the contract alone: **every derived anchor is checked against the real schema, the compiler, the renderer, and the sandbox fixture**, so that each stated enum, default, limit, and guardrail claim is still true of the code today.» |
| **Reparar** los punteros staleados | «Then **repair the stale pointers** each packet carries, to the certification matrix and to REFERENCE-DRAFT-JSON, **measured at four occurrences per packet**» |
| **Refrescar** banner y registro, juntos | «and **refresh each packet's status banner and its entry in .aiw/docs/docs_index.json together**, which a validator can detect but never write» |
| Un veredicto por componente, nunca uno de lote | «Record **one verdict per component, never one combined verdict for the batch**.» |
| Status reference-only | «This Run **keeps status reference-only**» |

**El texto nuevo dice explícitamente que las dos últimas son escrituras** —«which a
validator can detect but never write»—, que es el hallazgo que la medición puso primero y
la razón por la que estos runs no se podían sustituir por un validador.

**Y hace explícita la unidad corregida:** el texto viejo decía «its **two** stale pointers»;
el nuevo dice «**four occurrences per packet**» (§8.2).

---

## 4. (C) — Enmienda de la Definition of Done

Archivo: `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md`.

**Por qué es imprescindible:** verificado, **17 de 17** runs de implementación de componente
citan en su `depends_on` el run que produjo esta DoD
(`RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001`, `qo` 9, `completed`). Sin la
enmienda, cada uno de los dieciséis pendientes ejecuta S9 y S10 y hace exactamente el
trabajo que este rediseño difiere a los lotes.

**Edición mínima: DOS pasos tocados, ninguna otra línea del documento.** El segundo se toca
porque **depende del primero**, que es lo que el encargo pedía declarar.

### 4.1 S9 — antes y después, verbatim

**ANTES**
> - **S9. Packet update** (duty: update the canonical packet). Update `docs/components/web/<NAME>.md` per the single-source contract: required sections in order, field discipline, banner and registry freshness refreshed together, status kept reference-only. The packet is the per-component documentation deliverable of this step. The Component Guide consumes no packet today - it carries inline content for three components (`listGuide`, `headerGuide`, `columnsGuide` in `tools/author-lite/editor-ui/src/features/editor/components/preview/ComponentGuide.jsx`), its inline text is protected by `tools/author-lite/scripts/checkComponentGuideTextIntegrity.cjs`, and its packet wiring is `RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001`. A component run therefore edits no Component Guide source and no guard-protected inline text. PASS: packet updated and compliant; Guide untouched.

**DESPUÉS**
> - **S9. Packet and Guide, both out of scope** (duty: none in this run). A component run edits no packet and no Component Guide source. `docs/components/web/<NAME>.md` is not updated here: packet verification, stale-pointer repair, and the banner refresh were moved out of the per-component runs into the batch packet-verification runs of the DOCUMENTATION lane, which carry that duty whole. The Component Guide is likewise not written here - it carries inline content for three components (`listGuide`, `headerGuide`, `columnsGuide` in `tools/author-lite/editor-ui/src/features/editor/components/preview/ComponentGuide.jsx`), its inline text is protected by `tools/author-lite/scripts/checkComponentGuideTextIntegrity.cjs`, and unifying that mechanism and writing its content are their own runs. A component run that finds the packet or the Guide wrong records the discrepancy in its evidence table and routes it; it edits neither. PASS: no packet and no Guide source was written, and every discrepancy found is recorded.

### 4.2 S10 — el paso de registro en el índice: SÍ dependía del anterior

**Dependía, y de forma directa.** S10 mandaba refrescar «**the component packet's** entry in
`.aiw/docs/docs_index.json`»: la entrada que refresca registra la frescura **del packet que
S9 escribía**. Sin S9, ese refresco no tiene objeto — y además rompería la regla del propio
contrato de que banner y registro se mueven juntos, porque el banner ya no se toca aquí.

**ANTES**
> - **S10. Registry and no-claims** (duties: refresh docs_index freshness and evidence; preserve no-claims and documented source conflicts). Refresh the component packet's entry in `.aiw/docs/docs_index.json` under the one-writer rule, cite evidence by exact filename, and verify every preserved conflict and no-claim the component carries is intact - including the `list` AGENTS-versus-matrix conflict preserved in `.aiw/state/component_status.json` and the packet's status pointer. PASS: entry-level index diff declared; conflicts named and untouched.

**DESPUÉS**
> - **S10. No-claims** (duty: preserve no-claims and documented source conflicts). The registry refresh left with S9: `.aiw/docs/docs_index.json` is not edited by a component run, because the entry it would refresh records the freshness of a packet this run no longer writes; it is refreshed by the batch run that verifies that packet, together with that packet's banner, as the single-source contract requires them to move together. What stays here is the verification that every preserved conflict and no-claim the component carries is intact - including the `list` AGENTS-versus-matrix conflict preserved in `.aiw/state/component_status.json` and the packet's status pointer. PASS: conflicts named and untouched; no registry entry written.

**Lo que S10 conserva** es su segundo deber, que no dependía de S9: verificar que los
conflictos preservados y los no-claims siguen intactos. Ese deber es de lectura y sigue
siendo del run de componente.

### 4.3 Lo que la enmienda deja obsoleto y NO se tocó

«Edición mínima. No reescribas la DoD» es explícito, así que estas cinco quedan **nombradas
y sin tocar**, para decisión del operador:

| Lugar | Qué dice hoy y por qué queda desfasado |
|---|---|
| §1, párrafo 1 | «seventeen run pairs - a DEVELOPMENT revalidation run and a DOCUMENTATION packet run each, **thirty-four runs in total**». Tras el colapso son 17 + 1 cerrado + 4 lotes, no 34 |
| §2, regla de lote | «A component's run writes **its own packet, its own registry entry refresh**, and its own record» — las dos primeras ya no |
| §4, párrafo introductorio | enumera «**packet update, registry refresh**» entre las siete duties que mapean a los pasos; los pasos ahora las declaran diferidas |
| §7, tabla de evidencia | filas `S9 packet` y `S10 registry + no-claims` con sus columnas «Measured against» y «Evidence» |
| §12, no-claims | «The Component Guide clause is declared, not baked… the Guide wiring stays with `RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001`» — ese run existe y conserva su id, pero ya no cablea la Guía al packet (§6) |

**Ninguna de las cinco impide ejecutar la DoD hoy**; todas son coherencia de prosa, y
arreglarlas es reescribir el documento, que el encargo prohíbe.

**Bytes no-ASCII de la DoD: 0 antes, 0 después.** 23 631 → 23 974 bytes.

---

## 5. (D) — Los runs de la Guía de componente

**Se insertó UNO, no dos.** El primero de los dos que el encargo describe **es** el run de
cableado de la Guía reencuadrado; crear otro habría sido duplicar. La justificación está en
§6, que es donde el encargo la pedía.

### 5.1 El run nuevo

`RUN-CANTU-COMPONENT-GUIDE-CONTENT-001`, `queue_order` **34**, fase **O2.P3 «Docs Console
Projection»** (la misma en que ya vivía el run del que depende).

**Carril `DEVELOPMENT`, expresado OMITIENDO la clave `lane`** — verificado en el archivo
escrito: el objeto no lleva `lane`, igual que los otros 51 runs de ese carril.

**`title`**
> Write the Component Guide for the seventeen Web components

**`summary`**
> Write the author-facing Component Guide entry for each of the seventeen Web components against the unified mechanism and the fixed template, so every component has one Guide entry produced the same way.

**`full_description`**
> Once the Component Guide mechanism is unified and its template is fixed, write the Guide entry for each of the seventeen Web components against that template, so no component is left on the old asymmetry and none is documented twice. The Guide is product surface for a human author and is written in the author's language; the canonical packet under docs/components/web/ stays the technical source in English, and the two are not copies of each other. Take the fixed template as the reference for which sections a Guide entry carries and in what order; where the Guide needs a fact that the schema, the compiler, or the renderer owns, cite that source rather than restating it. This Run writes Guide content only: it authors and edits no packet, restates no component status, changes no schema, compiler, or renderer, and makes no production-readiness claim.

**`depends_on` (1):** `RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001` — el run reencuadrado,
en `queue_order` 33. **Depende del primero, como el encargo exige.**

### 5.2 Por qué el reencuadrado tuvo que moverse

La posición del run reencuadrado no es una preferencia: es una **obligación del motor**. El
run nuevo lo cita en `depends_on`, y el invariante «depend only on earlier runs» exige
`queue_order` menor. Con el reencuadrado en 74 y el nuevo en 34, el postcheck habría
abortado. **Su movimiento 74 → 33 es consecuencia forzada de la inserción, no una decisión
de orden independiente.**

---

## 6. (E) — El run de cableado de la Guía: es el mismo run, y se reencuadró

Derivado por título: **«Implement the Component Guide as a canonical packet consumer»** →
`RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001`, `qo` 74, carril `DEVELOPMENT`, `planned`.

### 6.1 Qué queda de sus cinco cláusulas, medido

| Cláusula | Veredicto | Destino en el texto nuevo |
|---|---|---|
| «Make the Guide **render the canonical packets** … read-only, which is what … Section 5 asks of both of its consumers» | **MUERE** | retirada; es la premisa que el operador invirtió |
| «**retire the inline per-component content**, which that Section names as drift» | **CAMBIA DE SIGNO** | pasa a ser retirar **la asimetría**, no el contenido: «Unify the mechanism onto one destination for all seventeen» |
| «**dismantle the guard script**, deciding in the same run what remains of its separate check over `blockCatalog.js`» | **SOBREVIVE** | conservada casi literal, con el sujeto actualizado a quién escribirá después |
| «**Remove the inline certification label**…» | **SOBREVIVE INTACTA** | conservada literal |
| «This Run **changes the Guide runtime only**…» | **SOBREVIVE** | conservada literal |

**Tres sobreviven, una cambia de signo, una muere. La medición acertó.**

### 6.2 La decisión, y su razón

**Es el mismo run. Se reencuadró y NO se creó (D)(1).** Cuatro razones medidas:

1. **Misma superficie de escritura, exacta.** Lo que queda del run de cableado escribe
   `ComponentGuide.jsx`, `blockCatalog.js` y `checkComponentGuideTextIntegrity.cjs`. Lo que
   (D)(1) pide —unificar el mecanismo, fijar la plantilla, retirar el modo Programador—
   escribe **esos mismos tres archivos y ningún otro**.
2. **Mismo carril.** Los dos son `DEVELOPMENT`: es runtime, no documento.
3. **Un solo acto.** «Retirar la asimetría» y «unificar el mecanismo» no son dos trabajos
   que se puedan repartir: son el mismo, descrito desde dos lados. La medición lo dice al
   constatar que la cláusula 2 **cambia de signo** en vez de morir.
4. **Duplicar habría sido inejecutable en paralelo de todos modos.** `CLAUDE.md` regla 7
   prohíbe dos runs simultáneos sobre el mismo archivo. Dos runs sobre `ComponentGuide.jsx`
   quedarían serializados, es decir: dos runs para hacer, en serie, lo que es un run.

**Nota sobre §10.3 de la medición.** Aquella recomendaba «dos runs: uno de contrato
(`DOCUMENTATION`, temprano) y uno de higiene de runtime (`DEVELOPMENT`, después)». **No la
contradice esta decisión**: el run de contrato que allí se describe es un **documento** bajo
`docs/docs_management/` que fija secciones, idioma y dueño de la Guía. **El encargo no pidió
ese documento**; pidió unificar el mecanismo y fijar la plantilla, que es runtime. Ese
contrato de contenido **sigue sin existir y sin run que lo produzca** — se nombra aquí como
hueco abierto, no se resuelve.

### 6.3 Antes y después, verbatim

**`title` ANTES**
> Implement the Component Guide as a canonical packet consumer

**`title` DESPUÉS**
> Unify the Component Guide mechanism and fix its template

**`summary` ANTES**
> Retire the Component Guide's inline per-component content, its inline status labels, and the script that guards them, and render the canonical packets read-only instead.

**`summary` DESPUÉS**
> Retire the Component Guide's split between inline per-component content and catalog-fed content, give the seventeen Web components one destination and one template, remove the Programmer mode, and retire the inline status labels and the script that guards them.

**`full_description` ANTES**
> The Editor Component Guide at tools/author-lite/editor-ui/src/features/editor/components/preview/ComponentGuide.jsx consumes no packet today: it carries inline hardcoded guide content for three of the seventeen Web components, asserts inline status labels of its own, and is held in place by a text-integrity script at tools/author-lite/scripts/checkComponentGuideTextIntegrity.cjs that guards that inline text as if it were the source. Make the Guide render the canonical packets under docs/components/web/ read-only, which is what the component-doc single-source contract asks of both of its consumers in Section 5; retire the inline per-component content, which that Section names as drift for a bounded run to remove; and dismantle the guard script, deciding in the same run what remains of its separate check over blockCatalog.js. Remove the inline certification label with it: no author-facing component is certified today, and component status has one source that every other surface points at and never restates. This Run changes the Guide runtime only; it authors and edits no packet, changes no component status, and makes no production-readiness claim.

**`full_description` DESPUÉS**
> The Editor Component Guide at tools/author-lite/editor-ui/src/features/editor/components/preview/ComponentGuide.jsx feeds three of the seventeen Web components from inline objects in the file itself and the other fourteen from the docs field of tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js, so there is no single destination a Guide entry can be written to; the split also leaves the docs blocks of header, list, and columns unreachable, measured at 403 lines the dispatch never reaches. Unify the mechanism onto one destination for all seventeen and fix the template a Guide entry follows, taking care that the catalog metadata the palette rail consumes is not removed with the documentation it sits beside. Retire the Programmer mode: the Guide is product surface for a human author, and the technical documentation lives in the repository, so the author-facing branch is the only one the Guide keeps. Remove the inline certification labels with it: no author-facing component is certified today, and component status has one source that every other surface points at and never restates. Dismantle the text-integrity script at tools/author-lite/scripts/checkComponentGuideTextIntegrity.cjs, deciding in the same run what check the Guide and the catalog still need once a later run writes Guide content into them. This Run changes the Guide runtime only; it authors and edits no packet, changes no component status, and makes no production-readiness claim.

`depends_on` **sin cambio**: `RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001`. Se
conserva porque el contrato sigue siendo el que separa las dos fuentes, aunque su §5 —«Both
consumers render the same packet»— haya quedado en contradicción con la decisión del
operador. **Enmendar ese contrato está fuera de alcance; la contradicción se nombra y se
deja abierta.**

### 6.4 Un residuo declarado: el `run_id`

El `run_id` sigue siendo `RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001` — un nombre que dice
«packet wiring», que es **exactamente la premisa retirada**. La identidad de un run es
inmutable en el motor y la guarda aborta si cambia. **Se declara: el id conserva un nombre
que su texto ya no describe.**

---

## 7. (F) — La auditoría profunda, reencuadrada y partida en dos

Derivado por título: **«Deep documentation audit»** →
`RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001`, `qo` 69, carril `DOCUMENTATION`, `depends_on: []`.

### 7.1 El sujeto SÍ encaja — por qué no se para y reporta

El encargo manda parar si el sujeto —343 archivos `.md`— no encaja con la auditoría del
corpus bajo el criterio nuevo. **Encaja, y el texto viejo ya lo decía.**

El `full_description` original abre con: «A thorough audit **and classification of every
documentation source**». El sujeto siempre fue **el corpus entero clasificado**. Lo que le
faltaba era **el criterio con el que clasificar**, y eso es justo lo que el estándar nuevo
aporta. **No hay cambio de sujeto: hay un criterio que llega.**

**La medición §9.3 no dice lo contrario.** Aquella rechazaba reencuadrar este run como la
auditoría **de los diecisiete packets**, y su primera razón era literalmente que el sujeto
no coincidía: «Meter diecisiete archivos dentro de un run cuyo alcance son trescientos
cuarenta y tres es diluir el encargo». **Este reencuadre es el contrario**: conserva los 343
y les aplica el criterio nuevo. Las tres objeciones de §9.3 apuntaban a otro destino.

Corpus reverificado hoy: **343 `.md` bajo `docs/`**, **288** bajo `docs/archive/`, **149**
registrados en `.aiw/docs/docs_index.json`. Las tres cifras coinciden.

### 7.2 Las compuertas: una es residuo y la otra es falsa

| Compuerta declarada | Veredicto medido |
|---|---|
| «until **Cantu Studio is further developed**» | **No se cumple** — 17 de 63 runs cerrados (eran 17 de 74). Pero es **residuo de la forma sin partir**: la compuerta protegía contra que una auditoría *que también escribía* frenara el producto. Partido el run, la mitad que audita **no escribe nada** y no puede frenar nada. La preocupación se muda entera a la segunda mitad, que va en serie y al final |
| «until **the lessons material exists**» | **SE CUMPLE. La premisa del ticket es falsa.** |

**Corrección medida, y es una corrección al encargo y a la medición previa.** El ticket dice
«el directorio de lecciones está vacío», heredándolo de la medición previa, que afirmaba que
`src/content/lecciones/` contiene «un único subdirectorio, `Aritmetica`, **sin archivos**».

**Barrido recursivo, hoy:**

| Ruta | Archivos |
|---|---:|
| `src/content/lecciones/Aritmetica/` | **2** — `1_propiedades_numeros.js`, `2_operaciones_aritmeticas.js` |
| `src/content/staging/` | **8** — 3 en `Aritmetica/` y 5 bajo `Sections_by_lesson/` en tres lecciones |

**El material de lecciones existe.** La compuerta que lo exigía **está cumplida**, no
pendiente. Se retira por cumplida, no por conveniencia.

**Conclusión: ninguna de las dos compuertas es parte de la naturaleza del run.** La primera
es residuo de cuando el run auditaba y limpiaba a la vez; la segunda ya se cumplió. Las dos
se retiran en el texto nuevo, y el texto lo dice expresamente en su última frase.

### 7.3 (F)(1) — antes y después, verbatim

**`title` ANTES**
> Deep documentation audit

**`title` DESPUÉS**
> Audit the documentation corpus and produce the disposition list

**`summary` ANTES**
> Full human-led audit of the documentation corpus, deferred until Cantu Studio development is further along.

**`summary` DESPUÉS**
> Read-only audit of every documentation source under docs/ against the documentation standard, producing one disposition per document, delete or move or keep, grouped by class, and writing nothing.

**`full_description` ANTES**
> A thorough audit and classification of every documentation source, deferred deliberately. The operator decided that auditing the full corpus now would stall product development, and that the current documentation is good enough at a coarse level. This run stays planned until Cantu Studio is further developed and the lessons material exists. It has no dependencies and is not gated by anything; it is a horizon item the operator pulls forward when the time is right.

**`full_description` DESPUÉS**
> Audit the documentation corpus against the standard the operator fixed: what describes code is generated or asserted rather than written by hand, what records a decision is captured when the decision is made, and documentation is written at three moments, when a contract is written, when a phase closes, and when the validator goes red, one document per artifact. The corpus measured today is 343 markdown files under docs/, 288 of them under docs/archive/, with 149 sources registered in .aiw/docs/docs_index.json. Classify every source and record one disposition for each, delete or move or keep, with the class it belongs to and the reason. This Run is read-only and runs alongside the component cycle: it deletes nothing, moves nothing, rewrites no document, and edits no registry entry. Producing the list is the whole deliverable; executing it belongs to the cleanup run that consumes this one. The two gate conditions the earlier text carried, that Cantu Studio be further developed and that the lessons material exist, are retired here: the lessons material exists, measured at two lesson files under src/content/lecciones and eight under src/content/staging, and the concern that auditing the corpus would stall product development does not apply to a run that writes nothing.

`depends_on` **sin cambio**: `[]`.

**Movido de `qo` 69 a `qo` 17** — a la posición exacta que dejó el primer doc-run pendiente,
dentro del ciclo de componentes. **Es el run que impide que el carril se seque**, y §9.3 lo
confirma medido.

### 7.4 (F)(2) — el run nuevo de limpieza

`RUN-CANTU-DOCUMENTATION-CORPUS-CLEANUP-001`, `queue_order` **59**, carril `DOCUMENTATION`,
fase **O2.P1 «Deep Documentation Audit»** — la misma que la auditoría, sin crear fases.

**`title`**
> Execute the documentation corpus disposition list

**`summary`**
> Execute the disposition the corpus audit produced, deleting what it marked for deletion and moving what it marked for moving, and reconcile the documentation registry with the result.

**`full_description`**
> Execute the disposition list the corpus audit produced, in series after it and never alongside it, because this Run writes where that one only read. Delete the sources the list marks for deletion, move the ones it marks for moving to the location their class requires, and leave untouched every source it marks to keep. Reconcile .aiw/docs/docs_index.json with the result, so that no entry points at a path that no longer exists and no surviving source is left unregistered. Follow the list rather than re-deciding it: a source whose disposition the audit did not settle stays where it is and is reported, not resolved here. This Run changes no code, no schema, and no component status, and it makes no production-readiness claim.

**`depends_on` (1):** `RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001` — en serie y después, como el
encargo exige. Su posición (59) lo deja después de todo el ciclo de componentes y de los
cuatro lotes, y justo antes del bloque de renames, con el que comparte superficie.

---

## 8. Las cifras del encargo, verificadas una a una

**Regla aplicada: verificar, no creer.**

| Cifra | Veredicto | Medido |
|---|---|---|
| «los dieciséis» doc-runs pendientes | **CORRECTA** | 17 por título, 1 `completed` (Columns) + 16 `planned` |
| «las tres firmas» | **CORRECTA, y débil** | Normalizando nombre + archivo: **1 sola firma**. Las «tres» son 15 directos + 2 excepciones kebab (§3.1) |
| «las 64 ocurrencias» | **CORRECTA, exacta** | 16 packets × 4 = **64**; `COLUMNS.md` tiene **0** (reparadas). Ver §8.2 |
| «las 403 líneas» | **CORRECTA, exacta** | `header` 16 + `list` 305 + `columns` 82 = **403** líneas de bloques `docs:` inalcanzables |
| «el 154 → 103» | **CORRECTA para SU hipótesis, no para este rediseño** | Ver §8.1 |
| «17 de 74 runs cerrados» | **CORRECTA** | 17 `completed` de 74. Hoy son 17 de 63 |
| «343 archivos `.md`» | **CORRECTA** | 343 bajo `docs/`, 288 en `docs/archive/`, 149 registrados |
| «tres con guía rica, catorce del catálogo» | **CORRECTA** | `isRichGuide` lista `['columns','header','list']`; 3 + 14 = 17 |
| «el directorio de lecciones está vacío» | **FALSA** | **2 archivos** en `lecciones/`, **8** en `staging/` (§7.2) |
| «17 de 17 runs de implementación citan la DoD» | **CORRECTA** | 17 de 17 verificado |
| «sus diecisiete dependencias son el 100 % de su `depends_on`» | **CORRECTA** | 17 aristas, y no tiene ninguna otra |

### 8.1 El 154 → 103: correcta para su hipótesis, no aplicable a este rediseño

La medición estima 154 → 103 «al retirar los diecisiete». **Su aritmética es correcta bajo
su hipótesis** —retirar los diecisiete doc-runs (17 entrantes + 34 salientes = 51) y
conservar el run de auditoría sin dependencias— pero **ésa no es la operación ejecutada**.

| Concepto | Aristas |
|---|---:|
| Base | 154 |
| −32 | las 2 salientes de cada uno de los **16** retirados (el 17.º, Columns, **no se toca**) |
| −17 | las 17 salientes del run de auditoría retirado |
| −1 | la arista del UX audit hacia el run retirado (§2.3) |
| **= 104** | subtotal tras las retiradas |
| +20 | 4 lotes × (4 runs de implementación + el contrato) |
| +1 | el run nuevo de la Guía → el reencuadrado |
| +2 | el run nuevo de limpieza → la auditoría; y su propia arista |
| **= 126** | **declarado antes de escribir, medido después: 126** |

*(La fila «+2» son dos aristas de un solo run: la limpieza depende de la auditoría, y esa
es la única. El desglose exacto es +20 lotes, +1 Guía, +1 limpieza = +22 sobre 104 = 126.)*

**Diferencia con la estimación: la medición modelaba retirar 17 y no reponer nada. Este
rediseño retira 17 objetos (16 doc-runs + 1 auditoría), conserva el doc-run cerrado, y
repone 6 runs con 22 aristas.**

### 8.2 Las «64 ocurrencias»: correcta, y con la unidad ya corregida en el texto nuevo

Medido packet a packet: los 16 pendientes llevan **2 ocurrencias del puntero a la matriz de
certificación + 2 del puntero a `REFERENCE-DRAFT-JSON` = 4 cada uno**, y `COLUMNS.md` lleva
**0**. Total **64**.

El texto viejo de los diecisiete decía «its **two** stale pointers» — correcto en
**destinos**, incorrecto en **ocurrencias**. **El texto nuevo de los lotes escribe la unidad
correcta**: «measured at **four occurrences per packet**». La corrección de unidad que la
medición señaló queda incorporada al roadmap, no solo anotada en un record.

---

## 9. Invariantes, campo a campo

### 9.1 Grafo

| Comprobación | ANTES | DESPUÉS |
|---|---|---|
| Runs | 74 | 63 |
| Aristas | 154 | 126 |
| **Aristas colgantes (no externas)** | **0** | **0** |
| **Dependencias que no preceden a su dependiente** | **0** | **0** |
| `queue_order` denso, único, contiguo 1..N | **sí** | **sí** |
| Ciclos | 0 | 0 |
| Arista externa conocida | 1, fuera de alcance | 1, **sin tocar** |

**Es el criterio más importante de la lista y se comprobó dos veces**: por
`checkInvariants` del motor (pre y post, dentro del driver y dentro de cada una de las 33
ops del ensayo) y por un recorrido independiente del grafo completo escrito para este
encargo, que no comparte código con el motor.

### 9.2 Identidad y status

| Comprobación | Resultado |
|---|---|
| `completed` antes / después | 17 / 17, **conjunto de ids idéntico** |
| **Status cambiados en runs supervivientes** | **0** |
| Runs nuevos | 6, **todos `planned`** |
| Objetivos | 7 → 7, mismos ids |
| Fases | 28 → 28, mismos ids. **Ninguna creada, ninguna borrada** |
| Ids aparecidos no previstos | 0 |
| Ids desaparecidos no previstos | 0 |

### 9.3 Carriles

| Carril | ANTES | DESPUÉS |
|---|---:|---:|
| `DEVELOPMENT` | 51 | 52 |
| `DOCUMENTATION` | 23 | 11 |

`DOCUMENTATION`: 23 − 16 (doc-runs) − 1 (auditoría) + 4 (lotes) + 1 (limpieza) = **11**.
`DEVELOPMENT`: 51 + 1 (el run nuevo de la Guía) = **52**. El reencuadrado sigue en
`DEVELOPMENT` y sigue **sin clave `lane`**.

**El carril `DOCUMENTATION` ya no se seca.** Medido run a run:

| | `ready_next` del carril `DOCUMENTATION` |
|---|---|
| ANTES | `qo` 17 «Verify the Header component packet» · `qo` 69 «Deep documentation audit» |
| DESPUÉS | `qo` 17 **«Audit the documentation corpus and produce the disposition list»** |

El run que queda listo es precisamente el que corre **en paralelo** al ciclo de componentes,
que es lo que (F) pedía. Entre el `qo` 17 y el `qo` 35 el carril tiene trabajo ejecutable.

### 9.4 Movimiento de `ready_next` y `later`, calculado run a run

| Grupo | ANTES | DESPUÉS | Explicación run a run |
|---|---:|---:|---|
| `ready_next` | 21 | **20** | −1: sale «Verify the Header component packet», el único doc-run que estaba listo. La auditoría reencuadrada **sigue lista** (0 dependencias). Ninguno de los 6 nuevos nace listo |
| `later` | 36 | **26** | −16 (15 doc-runs con dependencias pendientes + el run de auditoría retirado) +6 (los seis nuevos, todos con dependencias pendientes) |
| `history` | 17 | **17** | sin cambio |
| `now` / `needs_human_decision` | 0 / 0 | 0 / 0 | sin cambio |

Las tres cifras del validador coinciden con este cálculo independiente.

### 9.5 Todo run no tocado, byte-idéntico salvo su `queue_order`

**Verificado por comparación de objetos, no por inspección.** Para cada uno de los **54**
runs que este encargo no tocó se serializó su objeto antes y después **eliminando
`queue_order`** y se compararon las cadenas; además se comparó su fase de pertenencia.

**Resultado: 0 derivas.** Ni un campo, ni un byte, ni un cambio de fase.

Los **9** runs tocados son: los 6 nuevos, los 2 reencuadrados, y el UX audit (solo su
`depends_on`, §2.3).

### 9.6 Campos de clasificación

**0 runs llevan ninguno de los seis campos**, ni antes ni después. Los campos opcionales
presentes en el archivo son exactamente `lane` y `closeout_result`, los mismos que antes.
**Los seis runs nuevos nacen sin ellos.**

---

## 10. TABLA DE DESPLAZAMIENTO

**63 filas con `queue_order` cambiado, añadido o retirado. 17 filas sin cambio.**

### 10.1 Filas sin cambio (17)

`queue_order` 1 a 16, más «Audit and implement the List component», que estaba en 18 y sigue
en 18.

### 10.2 Filas movidas, nuevas y retiradas

| antes | después | carril | título |
|---|---|---|---|
| 69 | **17** | DOCUMENTATION | Audit the documentation corpus and produce the disposition list |
| 20 | 19 | DEVELOPMENT | Audit and implement the IconList component |
| 22 | 20 | DEVELOPMENT | Audit and implement the Card component |
| 24 | 21 | DEVELOPMENT | Audit and implement the Video component |
| 26 | 22 | DEVELOPMENT | Audit and implement the Narrative component |
| 28 | 23 | DEVELOPMENT | Audit and implement the Callout component |
| 30 | 24 | DEVELOPMENT | Audit and implement the Details component |
| 32 | 25 | DEVELOPMENT | Audit and implement the Arithmetic component |
| 34 | 26 | DEVELOPMENT | Audit and implement the Rule component |
| 36 | 27 | DEVELOPMENT | Decide scope and enable the Split component |
| 38 | 28 | DEVELOPMENT | Audit and implement the Table component |
| 40 | 29 | DEVELOPMENT | Audit and implement the ConceptGrid component |
| 42 | 30 | DEVELOPMENT | Audit and implement the Hierarchy component |
| 44 | 31 | DEVELOPMENT | Audit and implement the Timeline component |
| 46 | 32 | DEVELOPMENT | Audit and implement the Visual component |
| 74 | **33** | DEVELOPMENT | Unify the Component Guide mechanism and fix its template |
| **NEW** | **34** | DEVELOPMENT | Write the Component Guide for the seventeen Web components |
| **NEW** | **35** | DOCUMENTATION | Verify the Header, List, IconList, and Card component packets |
| **NEW** | **36** | DOCUMENTATION | Verify the Video, Narrative, Callout, and Details component packets |
| **NEW** | **37** | DOCUMENTATION | Verify the Arithmetic, Rule, Split, and Table component packets |
| **NEW** | **38** | DOCUMENTATION | Verify the ConceptGrid, Hierarchy, Timeline, and Visual component packets |
| 48 | 39 | DEVELOPMENT | Audit the Web components as a whole |
| 50 | 40 | DEVELOPMENT | Establish MathLive integration readiness |
| 51 | 41 | DEVELOPMENT | Verify global Formula Inserter integration after component revalidation |
| 52 | 42 | DEVELOPMENT | Audit and define the Slide grid system |
| 53 | 43 | DEVELOPMENT | Establish the Slide architecture baseline |
| 54 | 44 | DEVELOPMENT | Reproduce the sandbox files in the editor |
| 55 | 45 | DOCUMENTATION | Establish the Slide Component Guide from the Web template |
| 56 | 46 | DEVELOPMENT | Audit the reproduced components and define the per-component runs |
| 57 | 47 | DEVELOPMENT | Per-component Slide runs, to be created by the definer run |
| 58 | 48 | DEVELOPMENT | Assemble the Slide whole-set audit and readiness evidence |
| 59 | 49 | DEVELOPMENT | Audit Cantu Studio UX and route concrete follow-up runs |
| 60 | 50 | DEVELOPMENT | Measure the generated HTML payload |
| 61 | 51 | DEVELOPMENT | Design the Asset Registry |
| 62 | 52 | DEVELOPMENT | Define the ctx.assets contract |
| 63 | 53 | DEVELOPMENT | Integrate the Asset Registry into renderers |
| 64 | 54 | DEVELOPMENT | Validate Asset Dedup output equivalence |
| 65 | 55 | DEVELOPMENT | Validate the production lesson workflow |
| 66 | 56 | DEVELOPMENT | Implement and validate the production export flow |
| 67 | 57 | DEVELOPMENT | Define the hosting and deployment plan |
| 68 | 58 | DEVELOPMENT | Update the canonical Docs view to render authority and consume packets by contract |
| **NEW** | **59** | DOCUMENTATION | Execute the documentation corpus disposition list |
| 70 | 60 | DEVELOPMENT | Rename internal code directories and their references |
| 71 | 61 | DOCUMENTATION | Sweep the legacy documentation paths and decide the empty directories |
| 72 | 62 | DEVELOPMENT | Rename the jame-prefixed editor UI classes |
| 73 | 63 | DEVELOPMENT | Rename the Core j-prefix render namespace |
| 17 | RETIRADO | DOCUMENTATION | Verify the Header component packet |
| 19 | RETIRADO | DOCUMENTATION | Verify the List component packet |
| 21 | RETIRADO | DOCUMENTATION | Verify the IconList component packet |
| 23 | RETIRADO | DOCUMENTATION | Verify the Card component packet |
| 25 | RETIRADO | DOCUMENTATION | Verify the Video component packet |
| 27 | RETIRADO | DOCUMENTATION | Verify the Narrative component packet |
| 29 | RETIRADO | DOCUMENTATION | Verify the Callout component packet |
| 31 | RETIRADO | DOCUMENTATION | Verify the Details component packet |
| 33 | RETIRADO | DOCUMENTATION | Verify the Arithmetic component packet |
| 35 | RETIRADO | DOCUMENTATION | Verify the Rule component packet |
| 37 | RETIRADO | DOCUMENTATION | Verify the Split component packet |
| 39 | RETIRADO | DOCUMENTATION | Verify the Table component packet |
| 41 | RETIRADO | DOCUMENTATION | Verify the ConceptGrid component packet |
| 43 | RETIRADO | DOCUMENTATION | Verify the Hierarchy component packet |
| 45 | RETIRADO | DOCUMENTATION | Verify the Timeline component packet |
| 47 | RETIRADO | DOCUMENTATION | Verify the Visual component packet |
| 49 | RETIRADO | DOCUMENTATION | Audit the Web component documentation as a whole |

### 10.3 Los números nuevos que el encargo pide explícitamente

**Los diecisiete runs de implementación de componente:**

| Componente | antes | después |
|---|---:|---:|
| Columns | 13 | **13** (sin cambio) |
| Header | 15 | **15** (sin cambio) |
| List | 18 | **18** (sin cambio) |
| IconList | 20 | **19** |
| Card | 22 | **20** |
| Video | 24 | **21** |
| Narrative | 26 | **22** |
| Callout | 28 | **23** |
| Details | 30 | **24** |
| Arithmetic | 32 | **25** |
| Rule | 34 | **26** |
| Split | 36 | **27** |
| Table | 38 | **28** |
| ConceptGrid | 40 | **29** |
| Hierarchy | 42 | **30** |
| Timeline | 44 | **31** |
| Visual | 46 | **32** |

**Los cuatro lotes de (B): 35, 36, 37, 38.**
**Los dos de (D): 33** (el reencuadrado que hace de (D)(1)) **y 34** (el nuevo).
**El reencuadrado de (F): 17**, y su limpieza nueva en **59**.

### 10.4 Cero filas de remap sin causa declarada

Cada fila de arriba es una de cuatro cosas, y no hay una quinta:

1. **Compactación** por las 17 retiradas y las 6 inserciones. Verificado aritméticamente
   fila a fila. Ejemplos: Visual 46 → 32 = 46 − 15 retirados antes de él + 1 insertado
   antes de él. «Audit the Web components as a whole» 48 → 39 = 48 − 16 + 7. El último,
   73 → 63 = 73 − 18 + 8.
2. **Las dos reubicaciones que el encargo ordena**: 69 → 17 por (F) («corre en paralelo al
   ciclo de componentes») y 74 → 33 por (D) («después del último run de implementación»),
   esta última además **forzada por el invariante de precedencia** (§5.2).
3. **Las seis inserciones.**
4. **Las diecisiete retiradas.**

**Ninguna fila obedece a otra causa.**

---

## 11. Bytes no-ASCII: 24 antes, 24 después, y por qué no cambian

| Ubicación | Bytes | ¿Tocada por este encargo? |
|---|---:|---|
| `lanes[0].title` — «Development — code, structure, tooling» | 3 | No |
| `lanes[1].title` — «Documentation — writing, updating, reorganising docs» | 3 | No |
| `full_description` de «Define the color and palette compatibility contract» | 6 | No |
| `full_description` de «Define the math, formula, and Formula Inserter compatibility contract» | 6 | No |
| `full_description` de «Audit Cantu Studio UX and route concrete follow-up runs» | 6 | **Su `depends_on` sí; su texto NO** |
| **TOTAL** | **24** | |

Los cinco son guiones largos (`U+2014`, 3 bytes cada uno) preexistentes. **Ninguno está en
texto que este encargo haya escrito.** El único run tocado que contiene uno es el UX audit,
y de él solo se modificó `depends_on`, que no es texto.

**Los ocho textos nuevos y reencuadrados son ASCII puro**, verificado por aserción dentro
del driver antes de serializar: la construcción aborta si un solo byte se sale de
`\x00-\x7F`. Los ocho son: 4 lotes, 2 nuevos (Guía y limpieza) y 2 reencuadrados (Guía y
auditoría de corpus).

**Explicación del cambio: no hay cambio. 24 → 24, y las mismas cinco ubicaciones.**

---

## 12. Validador — antes y después, por la vía que no escribe

Vía: `node tools/project-console/validate-project-console-state.mjs` desde `cantu-studio`.
Es el validador propio del proyecto, no el motor de `aiw-console`.

| Medida | ANTES | DESPUÉS |
|---|---|---|
| **Exit code** | **0** | **0** |
| Veredicto | `Project Console state validation passed.` | idéntico |
| Objetivos / Fases / Runs | 7 / 28 / **74** | 7 / 28 / **63** |
| `needs_human_decision` | 0 | 0 |
| `now` | 0 | 0 |
| `ready_next` | 21 | **20** |
| `later` | 36 | **26** |
| `history` | 17 | **17** |
| Docs indexados | 149 | 149 |
| Docs curados primary-visible | 60 de 149 | 60 de 149 |
| **Component statuses** | **16** | **16** |
| Episodios de procedencia git | 9 | 9 |
| Snapshot git | 918 commits / 2 ramas | 918 commits / 2 ramas |
| **Avisos no bloqueantes** | **1** — la arista externa | **1 — idéntico, mismo texto** |

**Cero avisos nuevos.** El único aviso es el conocido y ajeno:
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` → `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`,
fuera de alcance, **sin tocar**.

El validador se ejecutó además **inyectado en la escritura atómica**, con rollback armado:
si hubiera devuelto distinto de 0, el archivo se habría restaurado desde el respaldo. Devolvió
0 y la escritura quedó firme (`written: true, rolledBack: false`).

**Se corrió una segunda vez tras la enmienda de la DoD: EXIT 0, cifras idénticas.**

---

## 13. `.project/` no re-emitido — y una re-emisión ajena que hay que declarar

**Este encargo no re-emitió `.project/`.** La prueba no es una afirmación, es el contenido:

| Comprobación | Resultado |
|---|---|
| Runs dentro de `.project/roadmap.json` | **74** |
| Runs dentro de `.aiw/roadmap/roadmap.json` (el canónico que escribí) | **63** |
| ¿`.project/roadmap.json` sigue nombrando `RUN-CANTU-WEB-HEADER-DOC-001`? | **Sí, 2 veces** |
| ¿El canónico lo nombra? | **No, 0 veces** |

**La proyección quedó deliberadamente atrasada respecto al canónico**, que es el estado
correcto: la re-emite el operador desde la consola, no un ticket.

**Pero los seis `.project/*.json` sí cambiaron de mtime durante la ventana, y no fui yo.**
Se declara con marcas de tiempo, porque un barrido de mtime no distingue autoría:

| Archivo | mtime | ¿De este encargo? |
|---|---|---|
| `.project/{docs_index,git_history,guardrails,no_claims,roadmap,snapshot}.json` | **21:54:04** | **No — hilo paralelo.** Anterior a mi escritura, y su contenido tiene 74 runs |
| `.aiw/roadmap/roadmap.json` | **22:02:54** | **SÍ** |
| `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` | **22:03:28** | **SÍ** |

**Los seis son anteriores a mi única escritura y su contenido corresponde al roadmap de 74
runs.** Ninguno lleva marca posterior a las 22:02:54.

### 13.1 Barrido de mtime, con `node_modules` cubierto

Recorrido recursivo de **todo** el árbol de `cantu-studio`, `.git` y `node_modules`
incluidos, registrando `ruta|tamaño|mtime`:

| Magnitud | ANTES | DESPUÉS |
|---|---:|---:|
| Archivos totales | 21 513 | 21 513 |
| Archivos fuera de `.git` | 21 344 | 21 344 |
| Entradas `.git` | 169 | 169 |
| **Entradas bajo `node_modules`** | **20 255** | **20 255** |

`node_modules` no vive en la raíz: son tres árboles anidados bajo `tools/author-lite/`, y
los tres están cubiertos por las 20 255 entradas.

**Archivos con `tamaño|mtime` movidos: 8.** Dos míos (§14) y seis del hilo paralelo.
**Cero archivos creados, cero borrados.**

---

## 14. Archivos escritos por este encargo, y ninguno más

| # | Archivo | Repo | Acción |
|---|---|---|---|
| 1 | `.aiw/roadmap/roadmap.json` | `cantu-studio` | modificado — **una sola escritura atómica** |
| 2 | `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` | `cantu-studio` | modificado — enmienda mínima (C), dos pasos |
| 3 | `context/aiw-console/records/REDISENO-CARRIL-DOCUMENTATION-CANTU.md` | `aiw-console` | creado — este record |

**Tres filas. Un solo archivo tocado en `cantu-studio` salvo la enmienda (C), como el
encargo exige.**

Todos los archivos de trabajo —los scripts de plan, driver, ensayo y verificación, el
respaldo, la copia de ensayo y las huellas— viven en el scratchpad de sesión, **fuera de
todo repo**:
`C:\Users\chris\AppData\Local\Temp\claude\C--Users-chris-Documents-AIW-Workspace\6cb92dfe-e500-49be-a688-63eaaa985377\scratchpad\`.

**Records en `context/aiw-console/records/` al empezar: 88.** Sin colisión de nombre —
verificado contra los 88, cero coincidencias con `REDISENO-*`. **Al terminar: 89.**

---

## 15. Superficies disjuntas con el hilo paralelo

Huella de `aiw-console` por el mismo método:

| Huella | ANTES | AHORA (antes de escribir el record) |
|---|---|---|
| Archivos totales | 472 | 478 |
| **Archivos fuera de `.git`** | **270** | **270** |
| Entradas `.git` | 202 | 208 |
| md5 del árbol completo | `fc6cf0400298ca6f064776a00b479352` | `6a3533b5450d450e10ea07e0b4a217f3` |
| md5 del árbol sin `.git` | `70e3c027217c56006f04f498b70f365d` | `2eaa3cf9feef773c989645059088fb1f` |

**El md5 cambia; la autoría no es mía.** Diferencia de contenido fuera de `.git`, archivo a
archivo: **exactamente los seis `.project/*.json` de `aiw-console`**, con mtime **21:54:01**,
que es una re-emisión del hilo paralelo sobre **su propio** proyecto. Las 6 entradas `.git`
nuevas son un commit del hilo paralelo.

**Cero archivos de contenido creados o borrados por mí** hasta este record.

md5 de las superficies que el encargo prohíbe tocar, **declarados y sin cambio**:

| Superficie | md5 |
|---|---|
| `tools/roadmap/roadmap-core.mjs` | `f01ad678b980eb01d588b695c06a928d` |
| `tools/roadmap/roadmap-plan.mjs` | `3d81e4d2dba58bb1378dd4ef555ddd88` |
| `roadmap/roadmap.json` (el roadmap de `aiw-console`) | `74958089e601bb7c9e571de485388e8b` |
| `context/aiw-console/CONTRATO.md` | `f77ccec64d99f2048d4bde41638cb228` |
| `context/DECISIONES.md` | `f879e89f640cbac0c933bce659d83327` |

`context/aiw/` **no se abrió**. El `.project/` de `aiw-console` **no se re-emitió por mí**.
Sus tests **no se leyeron ni se corrieron** — la suite de `aiw-console` tiene un fallo
conocido y ajeno, un pin de finales de línea con dueño en otro run: **no se reparó y no se
corrió**, como el encargo ordena. El motor **se leyó y se importó, nunca se escribió**.

---

## 16. Lo que este encargo NO hizo

- **No ejecutó ninguno de los runs que tocó.** No verificó ni un packet, no escribió ni una
  línea de Guía, no auditó el corpus.
- **No reparó los 64 punteros staleados** ni las 403 líneas inalcanzables ni el
  `statusLabel: 'Certificado'` que contradice la matriz. Siguen exactamente como estaban.
- **No tocó** `docs/components/web/*.md`, `.aiw/docs/docs_index.json`, `ComponentGuide.jsx`,
  `blockCatalog.js`, `checkComponentGuideTextIntegrity.cjs`, ni ningún código.
- **No clasificó ningún run** ni escribió ninguno de los seis campos de clasificación.
- **No cambió ningún `status`**, no cerró ningún run, no aplicó ningún `barrier`, no resolvió
  la arista externa.
- **No editó** el Blueprint, el modelo canónico, el contrato de fuente única, ni ningún
  contrato de referencia distinto de la Definition of Done.
- **No ejecutó git en ninguna forma.** No levantó servidores. No corrió suites.
- **No re-emitió `.project/`** en ninguno de los dos proyectos.

---

## 17. Huecos abiertos que el operador hereda

Se nombran, no se resuelven. Ninguno bloquea el estado escrito.

1. **La §5 del contrato de fuente única contradice la decisión del operador.** Dice «Both
   consumers render the same packet» y fija como *target* de la Guía «Renders the canonical
   packet; keeps no inline per-component content». El rediseño hace lo contrario a
   propósito. Enmendar ese contrato estaba fuera de alcance.
2. **No existe contrato de contenido de la Guía**, ni run que lo produzca. La medición §10.3
   lo recomendaba como run de `DOCUMENTATION` temprano. El encargo no lo pidió y no se creó
   (§6.2). El run que escribe la Guía se apoya en la plantilla que fija el run anterior, que
   es runtime, no norma documental.
3. **La frontera de idioma no está declarada en ninguna parte.** Los packets son inglés sin
   acentos por BLUEPRINT §2; la Guía es español acentuado. Los textos nuevos lo dicen en
   prosa —«written in the author's language», «stays the technical source in English»— pero
   **ninguna norma lo fija**.
4. **Cinco lugares de la DoD quedan desfasados** y sin tocar (§4.3).
5. **El `run_id` del run reencuadrado de la Guía sigue diciendo `PACKET-WIRING`** (§6.4).
6. **`qo` 61 «Sweep the legacy documentation paths» y los cuatro lotes comparten superficie**:
   los diecisiete packets. Van en serie por `queue_order` (35–38 antes que 61), así que la
   regla 7 de `CLAUDE.md` se cumple, pero **el solape de alcance sigue existiendo** y quien
   ejecute el `qo` 61 encontrará los punteros ya reparados por los lotes.

---

## 18. No-claims

- Esto es una **edición de roadmap**. No certifica, no aprueba y no cierra nada.
- **Ningún run quedó cerrado ni cambió de status.** Los seis nuevos nacen `planned` y los
  cierra el operador desde la consola.
- Ningún componente, motor ni superficie de consola cambia de estado por este documento.
- **Las cifras heredadas del encargo fueron verificadas**; la que no resistió —el directorio
  de lecciones vacío— está corregida en §7.2 y §8 con su medición, y la corrección **cambió
  el reencuadre de una compuerta**, no solo una nota.
- La arista externa queda **fuera de alcance, sin resolver**, tal como entró.
- **`.project/` está deliberadamente atrasado** respecto al canónico; re-emitirlo es del
  operador.
