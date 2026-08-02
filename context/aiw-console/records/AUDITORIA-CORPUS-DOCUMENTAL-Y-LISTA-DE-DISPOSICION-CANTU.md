# AUDITORÍA DEL CORPUS DOCUMENTAL DE CANTU Y LISTA DE DISPOSICIÓN

> Encargo de taller sobre `cantu-studio`, carril **DOCUMENTATION**, ejecutando el run canónico
> `queue_order` **18**. **Este run PROPONE; no ejecuta.** Cero borrados, cero movimientos, cero
> renombrados, cero reescrituras.
>
> Fecha de todas las mediciones: **2026-08-01**. Git no se usó en ninguna forma. No se levantó
> ningún servidor. No se corrió ninguna suite. El validador se corrió **por la vía que no
> escribe**. No se re-emitió `.project/`. No se tocó ningún `status`.
>
> **Archivos escritos por este encargo, y ninguno más:**
>
> | Repo | Archivo | Qué |
> |---|---|---|
> | `cantu-studio` | `docs/docs_management/DOCUMENTATION-CORPUS-DISPOSITION-LIST.md` | la lista de disposición — **la única escritura en `cantu-studio`** |
> | `aiw-console` | `context/aiw-console/records/AUDITORIA-CORPUS-DOCUMENTAL-Y-LISTA-DE-DISPOSICION-CANTU.md` | este record |
>
> Todo lo demás (scripts de medición, dataset consolidado, análisis de sensibilidad) vive en el
> scratchpad, fuera de los tres repos.

---

## BLOQUE A — EL RUN, DERIVADO Y COMPROBADO

### A.1 La derivación

Recorrido de `cantu-studio/.aiw/roadmap/roadmap.json` (`objectives[] → phases[] → runs[]`), filtrado
por `queue_order === 18`. **Un solo run casa.** No se tecleó el `run_id`.

| Campo | Valor |
|---|---|
| `run_id` | **`RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001`** |
| `title` | `Audit the documentation corpus and produce the disposition list` |
| `queue_order` | 18 |
| `lane` | `DOCUMENTATION` |
| `status` | `active` |
| Ubicación | objective `O2`, phase `O2.P1` |
| `depends_on` | `[]` — sin aristas |
| `correctness_model` | `JUDGED_ACCEPTS` |
| `blast_radius` | `SYSTEMIC` · `failure_surfaces`: `SILENT` |

**El título casa verbatim** con el criterio del `# Objective`. No hubo corrección por parecido.
No procede parar por el criterio 14 primer supuesto.

### A.2 Lo que el `full_description` manda, leído entero antes de empezar

Tres cosas que gobiernan este encargo:

1. **El universo**: «343 markdown files under docs/, 288 of them under docs/archive/, with 149
   sources registered in .aiw/docs/docs_index.json». Las tres cifras se reprodujeron exactas
   (Bloque B).
2. **El vocabulario**: lo declara dos veces, verbatim, «delete or move or keep». **No hubo que
   inventarlo y no procede parar por el criterio 5.**
3. **El alcance**: «This Run is read-only… it deletes nothing, moves nothing, rewrites no document,
   and edits no registry entry. Producing the list is the whole deliverable.»

**El `full_description` NO indica dónde vive la lista.** La elección y su razón, en el Bloque F.

### A.3 Discrepancias entre este ticket y el run

**Ninguna sustantiva.** El ticket es más restrictivo que el run en dos puntos (no tocar la
Definition of Done; no tocar `tools/` ni `src/`) y el run no lo contradice. Se aplicó lo más
restrictivo. Donde el ticket da cifras, el run y el disco ganaron: ver Bloque G.

---

## BLOQUE B — EL CENSO, CON SU UNIDAD

Método: recorrido completo del árbol desde `projects/cantu-studio`, excluidos `.git/` y
`node_modules/`. **Las cifras son archivos, no rutas.**

### B.1 Por árbol

| Árbol | Archivos `.md` | Registrados en el índice | Sin registrar |
|---|---:|---:|---:|
| Corpus vivo: `docs/**` sin `docs/archive/` | **55 archivos** | 50 | 5 |
| Raíz del repo `*.md` | **4 archivos** | 3 | 1 |
| Archivo histórico: `docs/archive/**` | **288 archivos** | 87 | 201 |
| **Universo de disposición** | **347 archivos** | **140** | **207** |
| Fuera del universo (`prompts/`, `QA/`, `tools/`, `.aiw/roadmap/`) | **22 archivos** | 1 | 21 |
| **Total `.md` del repo** | **369 archivos** | — | — |

- **343 archivos bajo `docs/`**, de ellos **288 bajo `docs/archive/`** y **55 vivos**. Reproduce el
  `full_description` exacto.
- Los 22 de fuera del universo se censan pero **no se disponen**: no son fuentes documentales bajo
  `docs/`. Se declara en la §1 de la lista.

### B.2 Corpus vivo por familia

| Familia | Archivos |
|---|---:|
| `docs/components/web/` | 17 |
| `docs/reference/` | 9 |
| `docs/_historical_run_record/` | 6 |
| `docs/decisions/` | 6 |
| `docs/architecture/` | 5 |
| `docs/docs_management/` | 3 (4 tras escribir la lista) |
| `docs/project-console/` | 3 |
| `docs/how-to/` · `docs/operations/` | 2 + 2 |
| `docs/governance/` · `docs/start_here/` | 1 + 1 |

Ocho directorios bajo `docs/` tienen **cero** `.md`: `_legacy`, `author-lite`, `generated`, `human`,
`jame-core`, `ops`, `shared`, `archive/…` no. Los cuatro primeros y `jame-core`, `ops`, `shared`
son cáscaras vacías — y son el origen de buena parte de los punteros muertos (Bloque C).

---

## BLOQUE C — LAS CUATRO MEDICIONES DE PUNTEROS E ÍNDICE

### C.1 Entradas del índice que no resuelven

Comprobación una a una de las **149 entradas** de `.aiw/docs/docs_index.json` contra disco.

| Medición | Valor real |
|---|---:|
| Entradas totales | **149 entradas** |
| Rutas distintas | **149** (cero duplicadas) |
| **Entradas que NO resuelven** | **0** |
| Entradas con `nav_tier: primary` y `default_visible: true` | **60** |
| Entradas que apuntan dentro del universo de disposición | 140 |
| Entradas fuera del universo | 9 (7 `.json`, 1 `.html`, `prompts/_CONTEXT_GUIDE.md`) |

**El índice está sano en resolución.** Las 60 primarias casan con la línea del validador «Docs
curated primary-visible: 60 of 149 registered».

### C.2 Documentos que existen y no están en el índice

**207 archivos** de los 347: **201 en `docs/archive/`** y **6 en el corpus vivo + raíz**.

Los seis vivos, en su totalidad:

| Archivo | Clase |
|---|---|
| `docs/_historical_run_record/RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001-OPERATOR-QA-PACKET.md` | packet de QA de operador |
| `docs/_historical_run_record/RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001-OPERATOR-QA-PACKET-ROUND-2.md` | ídem |
| `docs/_historical_run_record/RUN-JAME-WEB-HEADER-REVALIDATION-001-OPERATOR-QA-PACKET.md` | ídem |
| `docs/_historical_run_record/RUN-JAME-WEB-HEADER-REVALIDATION-001-OPERATOR-RE-QA-PACKET.md` | ídem |
| `docs/_historical_run_record/RUN-JAME-WEB-HEADER-REVALIDATION-001-OPERATOR-RE-QA-PACKET-ROUND-3.md` | ídem |
| `README_PHASE1.md` | `orphaned_candidate`, nombrado literalmente por la política de retención |

**Verificado, no heredado: hay 6 packets de QA de operador en disco y 5 sin registrar.** El
registrado es `RUN-JAME-WEB-COLUMNS-REVALIDATION-001-OPERATOR-QA-PACKET.md`. Coincide con la cifra
del ticket.

### C.3 Punteros muertos — las tres cifras, con unidad y alcance

Definición usada, declarada para que sea reproducible: **puntero** = ruta relativa al repo citada
dentro de un `.md`; **muerto** = no existe ni archivo ni directorio en esa ruta. El método completo
está en el script de medición del scratchpad; la regex acepta rutas con raíz conocida
(`docs/`, `src/`, `tools/`, `.aiw/`, `QA/`, `prompts/`, `dist/`…) o con extensión conocida.

| Alcance | Rutas distintas muertas | Apariciones totales | Archivos que las contienen |
|---|---:|---:|---:|
| **Corpus entero** (347 archivos: `docs/**` + raíz) | **830 rutas** | **3 965 apariciones** | **290 archivos** |
| **Corpus vivo** (59 archivos: `docs/**` sin archive + raíz) | **161 rutas** | **493 apariciones** | **52 archivos** |

Las tres cifras van juntas en cada fila, como exige el criterio 4. Son cantidades distintas: una
ruta puede aparecer 233 veces en 127 archivos y sigue siendo **una** ruta.

**Dónde se concentra el volumen — corpus entero:**

| Apariciones | Archivos | Ruta muerta |
|---:|---:|---|
| 233 | 127 | `docs/ops/JAME_OPS_STATE.md` |
| 145 | 85 | `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` |
| 69 | 35 | `docs/DOCUMENTATION-BLUEPRINT.md` |
| 68 | 23 | `docs/jame-core/api/DOCS_WEB_API.md` |
| 65 | 43 | `docs/author-lite/NEXT_STEPS.md` |

**Corpus vivo:**

| Apariciones | Archivos | Ruta muerta |
|---:|---:|---|
| 49 | 23 | `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` |
| 36 | 17 | `docs/REFERENCE-DRAFT-JSON.md` |
| 18 | 14 | `tools/author-lite/` |
| 16 | 7 | `docs/components/web/` |
| 13 | 4 | `prompts/generated/` |

**El peor infractor vivo es el propio estándar de escritura:**
`docs/docs_management/DOCUMENTATION-BLUEPRINT.md` con **114 citas de ruta muertas**, más que
ningún otro documento vivo.

### C.4 El puntero de 462 apariciones — reproducido exacto

| Ruta | Existe | Apariciones | Archivos |
|---|:-:|---:|---:|
| `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` | **no** | **462** | **112** |
| `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` | sí | 23 | 15 |

Método: `grep -ro` y `grep -rl` de la ruta literal sobre todo `cantu-studio`, excluidos `.git` y
`node_modules` — el mismo que declaró el record previo. **Reproducción exacta en las dos cifras.**
La unidad es **apariciones de UN puntero**, no rutas distintas.

El corpus cita este documento por una ruta equivocada **20 veces más a menudo** que por la real, y
el modelo canónico asigna a esa ruta archivada un **rol vivo**. Es la decisión del Bloque H.2.

---

## BLOQUE D — EL VOCABULARIO, Y DE DÓNDE SALIÓ

### D.1 Fuente

**`delete` · `move` · `keep`**, tomado **verbatim del `full_description` del run**, que lo declara
dos veces. No se inventó nada y no procedió parar por el criterio 5.

### D.2 La restricción que lo acota — y es un hallazgo

`.aiw/docs/docs_retention_archive_policy.json` es
`policy_status: operator_approved_governing_policy_no_physical_migration_authorized`, **aprobada por
el operador el 2026-07-10** con decisión humana registrada. Su `deletion_policy`, verbatim:

```text
default: "No deletion. No documentation file is deleted by default under this policy, in any class."
never_deletable_by_policy: ["evidence (frozen audits, PASS packets, sandbox evidence, machine ledgers)",
                            "historical_run_record (run notes, handoffs)"]
note: "These two classes cannot be deleted even with the exception path..."
```

Y el Blueprint §3, sobre HISTORY & EVIDENCE: «Frozen: never rewritten, **never deleted (D2
policy)**».

**Esas dos clases cubren 294 de los 347 documentos del universo.** Para los 53 restantes el borrado
no está prohibido de plano, pero está **apagado por defecto** y exige decisión humana explícita por
archivo.

**Consecuencia, dicha sin rodeos: la lista propone `delete` para CERO documentos.** No es evitar
decidir; es la política aplicada. **El run pide un vocabulario de tres valores y la política vigente
hace inalcanzable uno de los tres sin una decisión humana por archivo.** Conciliar ambos es decisión
del operador, elevada en el Bloque H.1 con su coste.

`move` también está acotado: la misma política lleva `physical_migration_authorized: false` y **8
precondiciones sin cumplir**. Una de ellas es `per-file-classification-complete` — que es
exactamente lo que esta lista aporta.

---

## BLOQUE E — LA DISPOSICIÓN, POR CATEGORÍAS Y CON CONTEO

Siete reglas, cada una con su fundamento declarado en la §5 de la lista. Cada fila de la lista lleva
su id de regla.

| Regla | Aplica a | Disposición | Documentos |
|---|---|---|---:|
| D1 | Documentos vivos en clase propietaria del modelo canónico (ARCHITECTURE, DECISIONS, REFERENCE, COMPONENTS, HOW-TO, OPERATIONS, GOVERNANCE, DOCS MANAGEMENT, START HERE) | `keep` | **46** |
| D2 | Vivos bajo `docs/project-console/` | `keep` | **3** |
| D3 | Documentos de raíz registrados (`AGENTS.md`, `CLAUDE.md`, `README.md`) | `keep` | **3** |
| D4 | `README_PHASE1.md`, `orphaned_candidate` nombrado por la política | **`move`** | **1** |
| D5 | Packets de QA de operador en `docs/_historical_run_record/` | **`move`** | **6** |
| D6 | Todo bajo `docs/archive/` | `keep` | **287** |
| D7 | `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` | `keep` (statu quo) **pendiente de decisión del operador** | **1** |

**Resumen por disposición:**

| Disposición | Documentos | Cuota |
|---|---:|---:|
| `keep` | **340** | 98,0 % |
| `move` | **7** | 2,0 % |
| `delete` | **0** | 0 % |
| **Total** | **347** | |

**Por qué D5 propone mover.** Los seis packets son clase `historical_run_record`. El modelo canónico
ubica HISTORY & EVIDENCE bajo `docs/archive/`, y `docs/archive/_historical_run_record/` **ya
contiene 67 archivos de esa misma clase**. La política los hace archive-eligible «once the run/phase
is closed»: **los tres runs productores están `completed`** (`RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001`
qo 16, `RUN-JAME-WEB-HEADER-REVALIDATION-001` qo 15, `RUN-JAME-WEB-COLUMNS-REVALIDATION-001` qo 13).
Nunca borrables.

**Aviso de la ventana compartida.** La regla D5 se propone sobre **los 6 packets medidos hoy**.
Cualquier packet que el taller paralelo añada a esa familia durante la ventana hereda la regla pero
**no está medido aquí**. Ni su presencia ni su ausencia se trata como hallazgo, y no se tocó ninguno
de sus archivos.

---

## BLOQUE F — DÓNDE VIVE LA LISTA, Y POR QUÉ AHÍ

**Ruta:** `cantu-studio/docs/docs_management/DOCUMENTATION-CORPUS-DISPOSITION-LIST.md`
**652 líneas, 73 773 bytes.**

**El `full_description` del run no indica ubicación.** La elección se hace según el modelo
documental del repo y se declara aquí y en la propia lista:

1. El modelo canónico §2 asigna la verdad «Docs governance» a la clase **DOCS MANAGEMENT**, con
   ubicación canónica `docs/docs_management/`. Una lista de disposición del corpus es gobernanza
   documental: no habla del producto, habla de la documentación.
2. El Blueprint §3 lo confirma: DOCS MANAGEMENT «answers "how is documentation itself governed?"» y
   prohíbe expresamente «content about the product itself» — que esta lista no lleva.
3. Los tres vecinos de esa carpeta (Blueprint, modelo canónico, contrato de fuente única) fijan el
   patrón de nombre: `SUSTANTIVO-COMPUESTO.md`, ALL-ENGLISH, sin acentos (Blueprint §2 y §4f).

**No se registró en `.aiw/docs/docs_index.json`.** Registrarla es acto posterior, y tocar el índice
con otro taller vivo no procede: el índice tiene un solo escritor a la vez.

**Dos desviaciones declaradas en la propia lista (§1a), no cometidas en silencio:**

- **Tamaño.** El Blueprint §4b fija un tope duro de **250 líneas** por documento nuevo. La lista lo
  excede (652). Razón: el entregable es una disposición por documento sobre 347 documentos y el
  encargo fija **un solo archivo nuevo**. Partirla es una opción del operador, elevada en H.4.
- **Género.** Se comprobó contra la prohibición de DOCS MANAGEMENT y no la infringe.

---

## BLOQUE G — LAS CIFRAS DEL CRITERIO 11, CON SU VALOR REAL

Ninguna se dio por buena. Cada una se midió hoy.

| Cifra del ticket | Valor real medido 2026-08-01 | Veredicto |
|---|---|---|
| 149 entradas en el índice | **149** | **Exacta** |
| 60 visibles como primarias | **60** (`nav_tier: primary` y `default_visible: true`) | **Exacta** |
| 17 packets de componente | **17** `.md` en `docs/components/web/` | **Exacta** |
| 6 packets de QA en disco, 5 sin registrar | **6 en disco, 5 sin registrar** | **Exacta** |
| 66 runs | **66** | **Exacta** |
| `history=18` | **18** (y `completed` = 18 en el canónico) | **Exacta** |
| **462 apariciones, en 112 archivos, de UN SOLO puntero** | **462 apariciones / 112 archivos** | **Reproducida exacta** — método del record previo (`grep -ro`/`grep -rl` sobre todo el repo, excluidos `.git` y `node_modules`) |
| **496 rutas distintas muertas en el corpus entero** | **830 rutas** con el método de esta sesión | **No reproducida.** Ver G.1 |
| **83 rutas distintas muertas en el corpus vivo** | **161 rutas** con el método de esta sesión | **No reproducida.** Ver G.1 |

### G.1 La discrepancia de 496/83, declarada contra el record previo

Fuente previa: `records/CIERRE-HUECOS-ESTANDAR-DOC-IDIOMA-Y-ASERCIONES-CANTU.md` §4.3, tabla
«Familia 1», que declara para «Todo token con pinta de ruta, corpus entero (347 docs, archive
incluido)» → **2 724 sitios / 496 rutas distintas**, y para el vivo → **292 sitios / 83 rutas**.

**Lo que sí se reprodujo exacto**, y confirma que el alcance previo del «corpus vivo» era
`docs/**` sin archive **más los `.md` de raíz** (59 archivos):

| Previo | Hoy | Ruta |
|---:|---:|---|
| 49 | **49** | `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` |
| 36 | **36** | `docs/REFERENCE-DRAFT-JSON.md` |
| 9 | **9** | `docs/jame-core/api/DOCS_SLIDES_API.md` |
| 8 | **8** | `docs/jame-core/DOCS_CORE.md` |
| 8 | **8** | `docs/jame-core/api/DOCS_WEB_API.md` |

**Las cinco cifras de concentración coinciden al dígito.** Lo que no coincide es el agregado.

Se corrió un análisis de sensibilidad con cinco definiciones de «ruta citada» (token amplio; solo
rutas con extensión; solo enlaces markdown; solo backticks; solo `docs/**.md`) × cuatro alcances.
**Ninguna combinación produce 496 ni 83.** La más próxima al vivo es «solo rutas con extensión,
sin punteros a directorio»: **94 rutas / 302 sitios** frente a 83/292 — a 11 rutas y 10 sitios.

**Lectura honesta:** el record previo no publicó la regex exacta que usó («todo token con pinta de
ruta» no es reproducible sin ella), y la diferencia cae dentro del margen que esa ambigüedad
permite. **Se reportan las cifras de hoy con su método publicado** (script en el scratchpad, regex
declarada en C.3), no las de aquel record. La divergencia no invalida ninguna de las dos: mide
una definición distinta de la misma cosa. Las cifras que el ticket pedía «reproducir o corregir»
quedan **corregidas al alza**, con el método a la vista.

### G.2 Otra discrepancia contra records previos

`docs_corpus_curation_audit.json` (2026-07-09) declara `documentation_markdown_files_docs_dir_approx: 239`
y `docs_index_entries_before_this_run: 25`. Hoy son **343 archivos** y **149 entradas**. No es un
error de aquel record: es deriva de trece meses de corpus. Se nombra para que nadie cite el 239.

---

## BLOQUE H — LO QUE NO SE DECIDIÓ, CON COSTE MEDIDO Y RECOMENDACIÓN

Cuatro decisiones del operador. Cada una va en la §8 de la lista con el mismo texto.

### H.1 El run pide `delete` y la política lo hace inalcanzable

Opciones: **(a)** aceptar un resultado de dos valores para este corpus, que es lo que la lista
entrega; **(b)** revisar la política de retención, cosa que la propia política dice que exige
«an operator-approved revision»; **(c)** nombrar archivos concretos para la vía de excepción por
archivo.

**Recomendación explícita: (a).** No cuesta nada, no contradice ninguna política aprobada y deja
(b) y (c) abiertas. Elegir (b) o (c) reabre 294 archivos que tres artefactos aprobados congelaron.
**No se impone: la decisión es del operador.**

### H.2 Dónde debe vivir la matriz de estado de componentes

Es el caso del criterio 14 tercer supuesto — un documento con rol normativo vivo alojado dentro del
archivo congelado. **No se decidió.** Coste medido de cada opción:

| Opción | Repara | Rompe | Nota |
|---|---:|---:|---|
| Dejarla donde está (propuesta de la lista) | 0 | 0 | 462 apariciones en 112 archivos siguen muertas |
| Moverla a `docs/author-lite/components/` | **462 apariciones / 112 archivos** | **23 apariciones / 15 archivos** | Saca del archivo un documento con rol vivo; exige actualizar el índice y las precondiciones de Fase D3 |
| Reescribir las 462 citas a la ruta real | 462 | 0 | Toca 112 archivos, muchos evidencia congelada que la política prohíbe reescribir |

**Recomendación: dejarla y decidir por separado.** La tercera opción choca con el congelado de la
evidencia; la segunda es la única que repara el corpus en un solo acto, y es exactamente el tipo de
acto que necesita la firma del operador y no el criterio de un ejecutor.

### H.3 Orden entre registrar y mover los cinco packets sin registrar

Registrarlos toca `.aiw/docs/docs_index.json`, que tiene un solo escritor y que el taller paralelo
puede necesitar. **Recomendación: registrar primero, mover después, en dos runs separados.** Mover
un archivo sin registrar es invisible al validador; mover uno registrado sin actualizar el índice lo
pone en rojo.

### H.4 Si la lista se parte

Excede el tope de 250 líneas del Blueprint. **Recomendación: dejarla entera hasta que cierre el run
que la consume**, y partirla o archivarla después como unidad. Una lista que se parte mientras se
ejecuta es una lista que se ejecuta dos veces.

---

## BLOQUE I — LO QUE LA LISTA PERMITE DECIDIR SIN RELEER EL CORPUS

Por cada uno de los 347 documentos, la lista trae: regla, disposición, si está en el índice, número
de consumidores vivos, de código (`src/`, `tools/`), de registro (`.aiw/`), runs del roadmap que lo
nombran, qué se rompe si desaparece, y la razón en una línea.

### I.1 Una ruta registrada no puede desaparecer sin más

`tools/project-console/validate-project-console-state.mjs:652`, verbatim:

```js
if (!doc.path || !fs.existsSync(path.join(root, doc.path))) {
  fail(`Docs index path missing: ${doc.path}`);
}
```

**140 de los 347 documentos están registrados.** Quitar o mover cualquiera de ellos sin actualizar
`.aiw/docs/docs_index.json` en el mismo run **pone el validador en rojo**. Dicho en la lista donde
aplica, y es la razón de H.3. De los 7 documentos que la lista propone mover, **uno está
registrado**: `docs/_historical_run_record/RUN-JAME-WEB-COLUMNS-REVALIDATION-001-OPERATOR-QA-PACKET.md`.

### I.2 El único documento fijado por ruta literal dentro del validador

`docs/project-console/JAME_RUN_PROTOCOL_LITE.md`. Es el único del corpus con esa propiedad. Moverlo
sería un cambio de código, no de documentación — fuera de alcance de este run y del run de limpieza
tal como está encuadrado hoy.

### I.3 Acoplamiento con el roadmap

**25 documentos vivos** son nombrados en el texto de al menos un run del canónico. Los más acoplados:
`docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md` (6 runs), los 17 packets de componente
(1 run cada uno), `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` (1).
**Ninguno de ellos se propone mover ni borrar.** Los 7 propuestos para `move` no son nombrados por
ningún run.

### I.4 Documentos sin ningún consumidor medido

**194 archivos del archivo histórico** tienen cero citas entrantes en todo el repositorio. Siguen
`keep`: la ausencia de citas no es motivo de borrado bajo una política cuyo defecto es no borrar y
cuyas clases no borrables los cubren. En palabras de la propia política, «an orphan flag is a
question, not a verdict».

---

## BLOQUE J — VALIDADOR, POR LA VÍA QUE NO ESCRIBE

Desde `projects/cantu-studio`: `node tools/project-console/validate-project-console-state.mjs`.
Corrido **después** de escribir la lista. Salida completa:

```text
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 66 runs; queue groups needs_human_decision=0 now=2 ready_next=13 later=33 history=18
Roadmap v3 active run derived stages: RUN-CANTU-DOCUMENTATION-DEEP-AUDIT-001=none RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 918 commits / 2 branches (2 visible, 0 backup hidden); current=main; run-associated=6; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

`EXIT=0`.

| Lo que pedía el criterio 10 | Valor |
|---|---|
| Total de runs | **66** |
| `history=` | **18** |
| Documentos indexados reales | **149** (60 primarias curadas) |

**El aviso no bloqueante es el conocido** sobre la arista huérfana
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`. Es legal y **no es hallazgo**. El validador ya daba `EXIT=0`
con el mismo aviso **antes** de escribir la lista: se corrió las dos veces y la salida es idéntica
salvo nada. Escribir la lista no movió una sola línea del validador.

---

## BLOQUE K — STATUS DEL RUN, Y QUÉ FALTA PARA LLEGAR AHÍ

**No se cambió ningún `status`.** El run sigue `active` en el canónico. Lo cierra el operador desde
la consola global.

**Status en que debe quedar: `completed`.** Su `correctness_model` es `JUDGED_ACCEPTS`, así que el
juicio es del operador, no del ejecutor.

**Qué falta para llegar ahí, en orden:**

1. **La firma del operador sobre la lista.** El run lo exige por su propia naturaleza —
   «Producing the list is the whole deliverable; executing it belongs to the cleanup run that
   consumes this one» — y la política de retención lo exige explícitamente para cualquier acto
   físico. La §9 de la lista trae el bloque de firma con las tres decisiones del Bloque H que hay
   que marcar.
2. **Que el operador resuelva H.1** (qué hacer con el `delete` inalcanzable). Sin eso, la lista
   entrega dos valores donde el run pedía tres, y eso debe quedar aceptado explícitamente.
3. **Que el operador resuelva H.2** (posición de la matriz). Es la única disposición marcada
   «pendiente de decisión» en la lista.
4. **Registro de la lista en `.aiw/docs/docs_index.json`** — acto posterior, de otro run, cuando el
   índice no tenga otro escritor.

Nada de lo anterior es ejecutable por este encargo.

---

## BLOQUE L — QUÉ NO SE HIZO

- **No se ejecutó ninguna disposición**: cero borrados, cero movimientos, cero renombrados, cero
  reescrituras de contenido. Ni un byte de ningún documento existente cambió.
- **No se tocó `.aiw/docs/docs_index.json`.** Sigue con 149 entradas.
- **No se tocó `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md`.**
- **No se tocó ningún archivo bajo `tools/` ni `src/`.** El validador se ejecutó, que es lectura.
- **No se registró la lista en el índice.**
- **No se reparó un solo puntero muerto.** Contarlos era el encargo; arreglarlos es la ejecución de
  la lista y es un run posterior.
- **No se editó el roadmap canónico, `.project/`, ni el `status` de ningún run.** No se insertó,
  movió ni renumeró ningún run. No se re-emitió `.project/`.
- **No se clasificó ningún run.**
- **Git no se usó en ninguna forma.** No se levantó la consola ni ningún servidor. No se corrió
  ninguna suite de test.
- **No se comentó, revirtió ni tocó el trabajo del taller paralelo.** Los conteos de
  `docs/_historical_run_record/` se declaran fechados a 2026-08-01 y estables entre la primera y la
  última medición de la sesión (6 packets en ambas).
- **No se decidió nada de lo elevado en el Bloque H.**
