# DOD COMPARTIDA DE REVALIDACIÓN DE COMPONENTES Y CONTRATOS AUTHOR-FACING — RUN `#9` EN CANTU

> Ejecución de `RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001` (`queue_order` 9, `O5.P6`,
> carril `DEVELOPMENT` por ausencia de campo `lane` = carril por defecto del roadmap).
> **Tres archivos escritos**: la DoD en `docs/reference/`, su entrada en el índice de docs, y este
> record. **Ninguno más** — barrido de `mtime` sobre **21 364 ficheros** de `cantu-studio` (`.git`
> excluido) posterior a la emisión 20:19:10 devuelve **exactamente dos**.
>
> **Las catorce decisiones abiertas no se decidieron** — seis del contrato de color (`#7` §10) y
> ocho del de math (`#8` §11). La DoD las honra por número (§10 del entregable) y define el
> veredicto `BLOCKED_ON_OPEN_DECISION` para el run que tope con una.
>
> Fecha: 2026-07-28. **Git no se usó en ninguna forma.** No se levantó ningún servidor. No se corrió
> ninguna suite. **No se re-emitió `.project/`.** **No se cambió `status`, `progress` ni
> `closeout_result` de ningún run.** No se auditó ni reparó ningún componente — la DoD se escribe
> aquí; ejecutarla es de los 17 pares.
>
> **Todas las cifras del ticket sobrevivieron a la medición.** Color: 3 kinds resuelven, 2 cargan el
> patrón de regresión, `columns` propaga, `iconList` no resuelve. Math: **seis** componentes con
> punto de integración y **dos superficies**. Proyección de estado: **16 de 17, falta `columns`**.
> Guide: **3 de 17 hardcodeados** con script guardián vivo. Archivado de contratos: **4 de 17**.
> Índice: **144 entradas** antes, 145 después. Ninguna discrepancia con el disco.
>
> **El hilo paralelo escribió durante mi ventana** un record nuevo en `aiw-console`
> (`REPARACION-PARSEO-TICKETS-AIW.md`, mtime 20:27:19). Observado y declarado abajo; no es
> superficie mía y no se tocó. Los 49 records preexistentes están byte-intactos.

---

## Archivos escritos por este encargo, y ninguno más

| # | Ruta | Acción | Antes | Después |
|---|---|---|---|---|
| 1 | `cantu-studio/docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` | **creado** | no existía | 360 líneas, 23 631 B, ASCII puro, LF, md5 `98039602ffd5587840c032ed2513fba3` |
| 2 | `cantu-studio/.aiw/docs/docs_index.json` | **editado, +1 entrada** | 144 entradas, 309 399 B, md5 `38b9dc6ec633744f3a49fc14c34ca230` | 145 entradas, 311 552 B, md5 `873235e7db7af907998760142adefee8` |
| 3 | `aiw-console/context/aiw-console/records/DOD-REVALIDACION-COMPONENTES-Y-CONTRATOS-COMPARTIDOS-CANTU.md` | **creado** | no existía | este record |

Records en `context/aiw-console/records/` al escribir este: **50** (49 al abrir mi ventana, +1 del
hilo paralelo). Este record es el **51.º**. Sin colisión de nombre.

## La guarda de identidad

Derivado del canónico `cantu-studio/.aiw/roadmap/roadmap.json` por `queue_order` 9, único match:
`RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001`, objetivo `O5`, fase `O5.P6`, `status`
`active`, sin campo `lane` (el roadmap declara `DEVELOPMENT` como `default: true`; 49 runs comparten
esa ausencia). Título del canónico, exacto: «Define shared component contracts and the revalidation
checklist». Coincide con el ticket. **La guarda no saltó.** Sus tres `depends_on` (`#3`, `#7`, `#8`)
están `completed`.

## El requerimiento, leído verbatim del canónico

**`title`:**

> Define shared component contracts and the revalidation checklist

**`summary`:**

> Define shared author-facing contract expectations, evidence boundaries, and the component
> revalidation Definition of Done consumed by every component run.

**`full_description`:**

> Define the shared author-facing contract expectations used by every subsequent Web component
> revalidation Run, including supported inputs, editor controls, preview behavior, compile behavior,
> evidence requirements, and no-claim boundaries. Encode the shared component revalidation
> Definition of Done: audit the current component state; verify compatibility with the Color /
> Palette compatibility contract and the Math / Formula / Formula Inserter compatibility contract
> where applicable; run or prepare Human QA; repair only if Human QA finds a real defect; update the
> component's canonical single-source component-doc packet and Component Guide source; refresh
> docs_index freshness and evidence; and preserve all no-claims and documented source conflicts.
> Component-specific exceptions must remain explicit rather than hidden in the generic standard.
> This is a cross-cutting foundation consumed by components, not a per-component run, and it
> consumes the component-doc single-source contract so the documentation Definition of Done
> references one canonical packet model.

Los siete deberes del texto (audit; color/math; Human QA; repair acotado; packet y Guide source;
docs_index; no-claims) están mapeados uno a uno a los pasos S1–S10 de la DoD, con la anotación
`(duty: ...)` en cada paso. Los tres insumos (`#3` de 123 líneas, `#7` de 242, `#8` de 328) se
leyeron enteros antes de escribir.

## El entregable

`cantu-studio/docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` — 360 líneas,
12 secciones. Ruta por la regla «API contracts → REFERENCE → docs/reference/» de
`DOCUMENTATION-CANONICAL-MODEL.md` (§ tabla de clases) y por precedente directo de los dos gemelos
(`#7`, `#8`) que aterrizaron ahí. Sin divergencia. El Blueprint concede a REFERENCE el único tope
extendido (§3 charter: «the only category allowed the extended cap»; §4b: 800 líneas); 360 queda
dentro y es comparable al gemelo math (328).

**Escrita para lote** (criterio central del ticket): procedimiento numerado **S1–S10** con criterio
de salida por paso (qué se mide, contra qué, qué cuenta como PASS); resultado por paso cerrado a
`PASS / FAIL / BLOCKED / NOT_APPLICABLE(justificado)`; **cinco veredictos finales cerrados**
(`READY_FOR_OPERATOR_QA`, `REPAIR_DECLARED_REVERIFIED`, `REPAIR_REQUIRED_OWN_SCOPE`,
`BLOCKED_ON_OPEN_DECISION`, `BLOCKED_ON_MISSING_INPUT`); y **tabla de evidencia por componente**
(§7) de estructura literal, rellenable N veces. Reglas de lote en §2: una tabla y un veredicto por
componente, nunca veredicto combinado; superficies de escritura disjuntas por componente; un solo
escritor del índice por ventana; prohibido correr la suite completa en dos talleres simultáneos.
Ningún veredicto cambia status: la matriz sigue siendo la única fuente y cierra el operador.

## «Where applicable» resuelto en tabla, no en prosa

La §5 de la DoD fija la aplicabilidad componente × contrato para los 17, verificada contra los
contratos en disco. Mi lectura **coincidió con las cifras del ticket** — el disco no las corrigió:

- **Color** (`#7` §3–§4): resuelven contra la paleta activa `header`, `list`, `card`; `columns` no
  resuelve por sí y propaga el contexto; `iconList` conserva hex sin resolver; `callout` y
  `timeline.detailsVariant` cargan el patrón de regresión (§8 de `#7`), y `timeline` además ofrece
  el alias `success` que cae al fallback `ctx` (decisión abierta 4 — no se decidió).
- **Math** (`#8` §5): **seis** con punto de integración que llega a output — `rule` (superficie A,
  allowlist cerrada de 39 comandos), `table`, `arithmetic`, `split`, `timeline`, `hierarchy`
  (superficie B, texto opaco sin validación LaTeX). `hierarchy` emite sin delimitadores y no
  renderiza (patrón de regresión math, §9 de `#8`); `conceptGrid` está en categoría math sin campo
  math que ningún schema del Editor produzca.

Regla fijada en la DoD: los bloques de auditoría de `#7` §9 y `#8` §10 (diez preguntas y cinco
clases cada uno) **corren para los 17 sin excepción**; la fila «no» de la tabla es lo que justifica
la clase `NOT_APPLICABLE`, y ante divergencia entre tabla y código vivo **gana el disco** y se
declara en la evidencia. Los bloques se refieren; no se reescribieron.

## La frontera del Human QA

Definida en §6 de la DoD: **Human QA la ejecuta el operador, nunca el taller.** El taller completa
solo S1–S6, la preparación de S7, la medición de reproducción y reparación en alcance de S8, S9,
S10 y el record. Al operador le pertenecen: ejecutar QA sobre Preview Real y Compile Web, emitir
PASS/FAIL, aprobar reparaciones, cambiar la matriz y cerrar runs. El formato de entrega es un
**packet de QA ejecutable sin leer el run**: fixtures que ejercitan todo campo author-facing
(color y math incluidos según la fila §5), pasos de carga, ítems numerados con resultado esperado
único — sembrados de los Gates 3–4 de la matriz §8 —, columna de veredicto vacía y nota de que el
veredicto no cambia status.

QA previa negativa, medida en `.aiw/state/component_status.json` (**proyección**:
`projection_only: true`, `source_of_truth: false`; **16 de 17 entradas — `columns` ausente**,
verificado): `narrative`, `callout`, `details` y `rule` entran con `HUMAN_QA_FAILED_REPAIR_REQUIRED`
(su defecto registrado es insumo de S8: reproducir → reparar en alcance o declarar); seis están
`HUMAN_QA_DEFERRED_OWN_TICKET_REQUIRED` (packet completo); `split` sin resultado explícito;
`iconList`/`card`/`video` con PASS preservado (packet delta — ambos patrones de regresión son
posteriores a esos PASS); `header`/`list` con observaciones y conflictos preservados (el conflicto
AGENTS-vs-matriz de `list` se conserva verbatim). Para `columns`: **declarar la ausencia, no
inventar estado, no editar la proyección.**

## El conflicto del Component Guide — declarado, no horneado

El texto del run manda actualizar «the component's canonical single-source component-doc packet
**and Component Guide source**». Medido en disco: el Guide
(`tools/author-lite/editor-ui/src/features/editor/components/preview/ComponentGuide.jsx`, 2 608
líneas) lleva contenido inline hardcodeado para **3 de 17** (`listGuide` L42, `headerGuide` L169,
`columnsGuide` L291), con `statusLabel` inline ('Certificado', 'COMPONENT_CERTIFIED / …'), **no
consume ningún packet** (cero referencias a `docs/components/`), y el script
`tools/author-lite/scripts/checkComponentGuideTextIntegrity.cjs` protege ese texto inline (mojibake
y labels retirados) en el Guide y en `blockCatalog.js`. El cableado tiene run propio, derivado por
`queue_order` 72 y título verificado: `RUN-CANTU-COMPONENT-GUIDE-PACKET-WIRING-001` — «Implement
the Component Guide as a canonical packet consumer», `planned`.

Resolución en la DoD: **S9 es ejecutable hoy** — el entregable por componente es el packet canónico;
un run de componente no edita fuente del Guide ni texto protegido por el guardián; la clusula del
Guide queda **declarada** en §12 (no-claims) de la DoD con la medición y el puntero a `#72`. **Es
decisión de cabina si el texto de `#9` se corrige; no se tocó.** Precedente: la misma cláusula se
midió falsa y se retiró de los 17 doc-runs y de `#46` (`RUN-JAME-WEB-READINESS-EVIDENCE-001`) /
`#47` (`RUN-CANTU-WEB-DOCUMENTATION-EVIDENCE-001`), ambos verificados en el canónico.

## Excepciones explícitas por componente

En §8 de la DoD, nombradas una a una como el run exige: `split` deshabilitado en el catálogo
(`disabled: true` con razón declarada; su run DEV es «Decide scope and enable the Split component»);
`narrative`/`callout`/`details`/`rule` con QA negativa registrada; `hierarchy` con campo de fórmula
que no renderiza; `conceptGrid` en categoría math sin campo math; el alias `success` de
`timeline.detailsVariant`; `columns` ausente de la proyección y sin superficie propia de color/math;
`header`/`list` únicos renderers reconciliados; `table` único con delimitadores del compilador; y el
trío `header`/`list`/`columns` con texto inline del Guide congelado hasta `#72`. Se nombran; ninguna
se reparó.

## Lo que hay hoy: reutilizado y sustituido

- `docs/archive/author-lite/components/WEB_AUTHOR_FACING_CONTRACTS.md` — verificado en disco:
  alcance declarado «`list`, `video`, `details`, `rule`» — **4 de 17**. Queda archivado e
  históricamente válido para ese alcance; **no se extiende** a los otros trece. Las expectativas
  compartidas viven ahora en §3 de la DoD y, por componente, en los 17 packets de
  `docs/components/web/` (verificados: 17 ficheros). Nada se movió ni se desarchivó.
- `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` §8 — verificado: checklist
  de seis gates por componente. **Se reutiliza**: sigue siendo el checklist de certificación y sus
  Gates 3–4 siembran el packet de QA de S7. **No se sustituye.**
- **La certificación no es un concepto retirado** — `docs/governance/GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md`
  §2 la define como claim que se gana («a claim that must be earned, never inferred») y §3 se titula
  «Certification gates» con los seis gates. La matriz sigue siendo la única fuente de status. La DoD
  lo fija en §9 y produce la evidencia que esos gates consumen, sin otorgar nada.

## El índice: edición quirúrgica declarada

Único escritor del índice en esta ventana. Respaldo previo **fuera del repo** (scratchpad de la
sesión), md5 verificado idéntico (`38b9dc6ec633744f3a49fc14c34ca230`). **Roundtrip byte-exacto
verificado antes de tocar**: parse → stringify(2) → CRLF → newline final reproduce los 309 399 B
originales bit a bit. Edición: **una entrada insertada** en la posición 100 (tras el gemelo math,
cerrando el clúster `docs/reference/` 95–100), espejo del patrón de registro del gemelo
(`nav_tier: primary`, `freshness_status: DRAFT_PENDING_OPERATOR_CONTENT_QA_2026_07_28`,
`operator_review_status: pending`, nota con categoría registrada-no-cableada y el mismo flag de
`ia_bucket`). Diff a nivel de entradas: **144 → 145; 0 modificadas, 0 eliminadas, orden de las 144
originales preservado; campos top-level intactos**. No-ASCII: **1 antes, 1 después** (un U+2014
preexistente en offset 61 684, entrada ajena; la entrada nueva es ASCII puro). CRLF y newline final
conservados.

## Validador antes y después — `EXIT 0` por la vía que no escribe

`node tools/project-console/validate-project-console-state.mjs` (verificado sin `writeFileSync`:
solo lee). **Antes**: EXIT 0, `7 objectives / 28 phases / 72 runs`, 144 docs indexados, 16 component
statuses, run activo = `#9`. **Después**: EXIT 0, mismos `7/28/72`, **145** docs indexados, 57
primary-visible (56+1), mismo run activo. En ambas corridas el único aviso es el no bloqueante de la
arista externa (`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` →
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`). **Ningún aviso nuevo.**

## Superficies disjuntas y el hilo paralelo — md5 antes y después

| Superficie | md5 al abrir | md5 al cerrar | Estado |
|---|---|---|---|
| `aiw-console/context/DECISIONES.md` | `3f6bdf8816a0b43818519eb3582f6511` | idéntico | no tocado |
| `aiw-console/context/aiw-console/CONTRATO.md` | `f77ccec64d99f2048d4bde41638cb228` | idéntico | no tocado |
| `aiw-console/roadmap/roadmap.json` | `f299d968fdf781bf31863d696bd9610e` | idéntico | no tocado |
| 49 records preexistentes (agregado de md5) | `558a3521cbbeb9d40020bff178160fef` | idéntico (excluyendo el nuevo del hilo) | no tocados |

**Observación del hilo paralelo**: durante mi ventana apareció
`context/aiw-console/records/REPARACION-PARSEO-TICKETS-AIW.md` (mtime 2026-07-28 20:27:19, md5
`810e003e82836a575d4b28dc3fe8d29c`). No es superficie de este encargo y no se tocó. Handoffs: no
existen bajo `context/aiw-console/`. Tests de aiw-console: no tocados (ninguna escritura fuera de la
tabla de archivos).

**`.project/` de cantu-studio**: no re-emitido por este encargo. Observación declarada: los seis
ficheros tienen mtime **2026-07-28 20:19:10** (re-emisión de otro actor **anterior** a mi primera
lectura; `.aiw/roadmap/roadmap.json` comparte ese mtime). md5 de los seis capturados al abrir y
re-verificados al cerrar: **idénticos** (`docs_index` `16c77b…`, `git_history` `141101…`,
`guardrails` `6a971d…`, `no_claims` `739bb2…`, `roadmap` `61f59b…`, `snapshot` `0508c3…`). Nadie lo
movió durante mi ventana; la emisión vigente quedó desfasada respecto del índice canónico (144 vs
145) y la reconciliará el endpoint de la consola al próximo cierre, como es su régimen.

## Status del run — declarado, no tocado

`status`, `progress` y `closeout_result` de `#9` y de todos los runs: intactos. **Declaración**: el
run debe quedar `active` hasta que el operador lo cierre desde la consola global; este encargo deja
el entregable completo y el run en condiciones de cierre (`completed`) cuando cabina lo decida. La
DoD misma queda `Status: Draft` con `operator_review_status: pending` — la revisión de contenido es
del operador, coherente con sus dos gemelos.
