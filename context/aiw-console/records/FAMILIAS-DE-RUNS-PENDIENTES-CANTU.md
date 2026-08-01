# FAMILIAS DE RUNS PENDIENTES — `cantu-studio`, y sus datos objetivos

Agrupación **READ-ONLY** de los runs pendientes del roadmap canónico de `cantu-studio` en
familias, con la medición objetiva de cada una, para que **el operador clasifique por
familia** en vez de run por run.

> **Este encargo NO clasifica.** No asigna `correctness_model`, ni `work_type`, ni
> `blast_radius`, ni `failure_surfaces`. Los cuatro juicios son del operador. Donde un dato
> parece implicar un valor, va dicho **como observación, no como asignación**, y está
> marcado como tal.
>
> **CERO ESCRITURAS en `cantu-studio`.** Verificado con huella del árbol antes y después,
> `node_modules` cubierto (bloque H).
>
> **Único archivo escrito por este encargo:** este record.
>
> **Todas las cifras son una MEDICIÓN FECHADA DEL 2026-07-31**, no un estado permanente.
> Cada una viaja con el comando que la produjo. **Las cifras que traía el ticket —63 runs,
> 17 cerrados, 46 pendientes— se trataron como valores A VERIFICAR, no a creer.** Se
> verificaron (bloque A).
>
> **No se ejecutó Git en ninguna forma.** No se levantaron servidores. **No se corrió
> ninguna suite de tests** — los tests se contaron en disco, no se ejecutaron.

Ruta base de los caminos relativos: `projects/cantu-studio`, salvo donde se indique
`projects/aiw-console`.

---

## BLOQUE A — El universo, re-medido

### A.1 — Canónico, y dónde vive

El roadmap canónico de Cantu es **`.aiw/roadmap/roadmap.json`**, `schema_version`
`jame.roadmap_v3.v0.2-progress`. Los runs viven anidados `objectives → phases → runs`; no
hay array `runs` de primer nivel. `.project/roadmap.json` es proyección derivada y no se usó
como fuente.

```bash
node -e "const r=require('./.aiw/roadmap/roadmap.json');const runs=[];for(const o of r.objectives)for(const p of o.phases||[])for(const x of p.runs||[])runs.push(x);const st={};runs.forEach(x=>st[x.status]=(st[x.status]||0)+1);console.log({objectives:r.objectives.length,phases:r.objectives.reduce((a,o)=>a+(o.phases||[]).length,0),runs:runs.length,byStatus:st})"
```

| Medida | Valor del ticket (a verificar) | **Medido en disco** | ¿Coincide? |
|---|---|---|---|
| Objetivos | — | **7** (`O1`…`O7`) | — |
| Fases | — | **28** | — |
| Runs totales | 63 | **63** | ✔ |
| `status: completed` | 17 | **17** | ✔ |
| `status: planned` | 46 | **46** | ✔ |
| `status: active` / `blocked` | — | **0 / 0** (los tokens no aparecen) | — |
| Pendientes = no-`completed` | 46 | **46** | ✔ |

**Las tres cifras del ticket se sostienen.** Los 46 pendientes son todos `planned`: no hay
ningún run `active` ni `blocked` que hubiera que tratar aparte.

### A.2 — Los 17 `completed` quedan fuera, y son estos

`queue_order` 1–16 y 40. **No se agrupan ni se miden**; se listan solo para dejar constancia
de cuáles son y de que el conteo cierra.

```
 1 RUN-JAME-SMART-FORMULA-FIELD-RULE-ONLY-BASELINE-001
 2 RUN-JAME-DOCUMENTATION-CANONICAL-MODEL-001
 3 RUN-JAME-COMPONENT-DOC-SINGLE-SOURCE-CONTRACT-001
 4 RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001
 5 RUN-CANTU-NAMING-AUDIT-DISPOSITION-001
 6 RUN-CANTU-REPO-RENAME-001
 7 RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001
 8 RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001
 9 RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001
10 RUN-JAME-VIRTUAL-KEYBOARD-KATEX-COMPATIBILITY-001
11 RUN-CANTU-MATH-ALLOWLIST-EXPANSION-AND-FORMULA-EDITOR-001
12 RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001
13 RUN-JAME-WEB-COLUMNS-REVALIDATION-001
14 RUN-CANTU-WEB-COLUMNS-DOC-001
15 RUN-JAME-WEB-HEADER-REVALIDATION-001
16 RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001
40 RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001
```

Seis de ellos son **la fuente de «correcto» que citan los pendientes**: los runs 5, 7, 8, 9,
3 y 1 produjeron el mapa de disposición, los dos contratos de compatibilidad, la
estandarización de contratos, el contrato documental de packet y la baseline `RULE_ONLY`.
Esto importa para el eje `correctness_model` y se detalla en el bloque F.

### A.3 — Ningún run pendiente lleva clasificación hoy

```bash
node -e "const r=require('./.aiw/roadmap/roadmap.json');const runs=[];for(const o of r.objectives)for(const p of o.phases||[])for(const x of p.runs||[])runs.push(x);for(const f of ['correctness_model','work_type','blast_radius','failure_surfaces','external_effects','classified_at'])console.log(f, runs.filter(x=>f in x).length)"
```

Los seis campos almacenados: **0 runs de 63 llevan cualquiera de ellos**. La lista de
pendientes de clasificación es, hoy, los 46 completos.

---

## BLOQUE B — El vocabulario, derivado del motor (no del ticket)

Derivado de `projects/aiw-console/tools/classification/classification.mjs`, que se declara a
sí mismo «THE ONE implementation of the run classification model».

### B.1 — Los cuatro vocabularios cerrados: **el motor y el ticket coinciden**

| Campo | Tokens en el motor (`classification.mjs:39-42`) |
|---|---|
| `correctness_model` | `SPECIFIED` · `JUDGED_ACCEPTS` · `JUDGED_DEFINES` |
| `work_type` | `COSMETIC` · `FUNCTIONAL` · `FOUNDATIONAL` |
| `blast_radius` | `LOCAL` · `ADJACENT` · `SYSTEMIC` · `PROJECT_SHAPE` |
| `failure_surfaces` | `LOUD` · `VISIBLE` · `SILENT` |

`severity` y `closure_mode` son **derivados y nunca almacenados** (`classification.mjs:53-62`,
`298-299`), tal como dice el ticket. ✔

### B.2 — Donde el ticket se queda corto: **el motor almacena SEIS campos, no cuatro**

`CLASSIFICATION_STORED_FIELDS` (`classification.mjs:55-62`) y `RUN_OPTIONAL_FIELDS`
(`tools/roadmap/roadmap-core.mjs:90-97`) declaran:

```
correctness_model, work_type, blast_radius, failure_surfaces, external_effects, classified_at
```

**Gana el motor, y lo declaro:** además de los cuatro juicios, el operador escribe
`external_effects` (forma `array_of_non_empty_strings`, vacío por defecto) y `classified_at`
(instante ISO-8601 UTC, que es la marca que decide si un run está clasificado —
`isClassified()`, `classification.mjs:230-232`).

**Consecuencia para este encargo:** el criterio de aceptación 8 —«si su alcance incluye
escritura irreversible o una aprobación en nombre del operador»— **no es solo evidencia para
el juicio: alimenta un campo almacenado real, `external_effects`**, que el motor valida
(`roadmap-core.mjs:479-483`) y que **sube `closure_mode` a `SEMI_ATTENDED` como mínimo, sin
poder bajarlo nunca** (`CLOSURE_MODE_DERIVATION.guard`, `direction: "raise_only"`). Por eso
la columna «efectos externos» de la tabla de familias va con rutas, no con adjetivos.

### B.3 — Las dos combinaciones ilegales que el motor rechaza

`illegal_combinations` (`classification.mjs:309-313`), por si el operador las cruza al
clasificar una familia entera:

- `correctness_model: SPECIFIED` **+** `work_type: FOUNDATIONAL` — rechazado por invariante.
- `work_type: FOUNDATIONAL` **+** `failure_surfaces: LOUD` — rechazado por invariante.
- `JUDGED_*` **+** `closure_mode: UNATTENDED` — imposible por construcción de la derivación.

### B.4 — Advertencia del criterio 16, honrada

El validador de `cantu-studio` y el motor de `aiw-console` **los está editando otro encargo
ahora mismo**. Medido:

```
tools/project-console/validate-project-console-state.mjs   2026-07-31 23:00   101460 B  md5 ceabc5633174fe25c60dc0d4cf545c40
tools/roadmap/roadmap-core.mjs                             2026-07-31 23:00    55818 B
```

Todo lo que este record dice sobre el validador y el motor es **una instantánea de esos
bytes**, no una fuente estable. Se declara, no se apoya nada más en ella.

---

## BLOQUE C — El criterio de agrupación, declarado y justificado

### C.1 — El método, y su medición

El ticket fija el método: **normalizar el texto sustituyendo nombres de componente y de
archivo, y reportar cuántos colapsan exactamente**. Aplicado a los 46 `full_description`:

1. rutas y nombres de archivo `*.{md,js,jsx,cjs,mjs,json}` → `<FILE>`
2. los 17 componentes Web, en sus tres grafías (`ConceptGrid`, `CONCEPT-GRID`, `Concept Grid`) → `<COMPONENT>`
3. listas de `<COMPONENT>` consecutivos → un solo token
4. cifras → `<N>`
5. espacios colapsados, minúsculas, `sha1` de los primeros 10 caracteres

### C.2 — Resultado del colapso exacto

| Medida | Valor |
|---|---|
| Runs pendientes normalizados | **46** |
| **Cuerpos normalizados distintos** | **32** |
| Grupos de colapso (más de un run) | **3** |
| **Runs dentro de un colapso exacto** | **17** |
| Runs con cuerpo único | **29** |

Los tres colapsos exactos:

| # | Runs | Cuerpo |
|---|---|---|
| `a2c809b5b1` | **9** | `LIST`, `ICONLIST`, `CARD`, `VIDEO`, `NARRATIVE`, `CALLOUT`, `DETAILS`, `TABLE`, `VISUAL` — «audit the `<COMPONENT>` component against the color and palette compatibility contract…» |
| `e0950ce31a` | **4** | `ARITHMETIC`, `CONCEPTGRID`, `HIERARCHY`, `TIMELINE` — el mismo cuerpo **más** «and the math and Formula Inserter compatibility contract» |
| `23089dde7c` | **4** | `PACKET-VERIFICATION-BATCH-001..004` — «The four packets already exist under `docs/components/web/`…» |

**El método del rediseño se reproduce:** aquel midió diecisiete doc-runs colapsando en un
solo cuerpo; aquí diecisiete runs colapsan en tres.

### C.3 — El criterio declarado, en dos niveles

**N1 — colapso exacto (mecánico, medido arriba).** Da 3 familias reales y 29 familias de uno:
**32 familias**.

**N2 — el criterio que declaro para el operador.** Dos runs van a la misma familia si su
cuerpo N1 difiere **solo en cláusulas que no mueven ninguna de las cuatro medidas objetivas
de este encargo** (misma superficie de escritura, mismo tipo de consumidor, misma red de
captura, misma forma de «correcto»). **En cada familia se declara la cláusula que difiere**,
medida por diff de oraciones sobre el texto normalizado.

Justificación de N2 con la medición, para el caso mayor:

```
WEB-LIST-REVALIDATION  vs  WEB-ARITHMETIC-AUDIT-AND-REPAIR
oraciones: 4 / 4; compartidas: 3
  - SOLO LIST:       "audit the <component> component against the color and palette compatibility contract, using the current component inventory as the starting point."
  + SOLO ARITHMETIC: "audit the <component> component against the color and palette compatibility contract AND THE MATH AND FORMULA INSERTER COMPATIBILITY CONTRACT, using the current component inventory as the starting point."
```

**Tres de cuatro oraciones son idénticas literalmente.** La única diferencia es una cláusula
que añade un segundo contrato citado. Ambos contratos existen en disco (bloque F.1), ambos
son producto de un run ya cerrado, y ninguno cambia superficie, consumidores ni red de
captura. Por eso los trece van juntos.

**Donde N2 NO se aplicó, y por qué.** No se forzó ninguna agrupación:

- `RULE` (26) y `SPLIT` (27) **no colapsan** con los trece: comparten 0 y 1 oración
  respectivamente. Van como **variantes declaradas dentro de F1, con fila propia**, para que
  el operador pueda emitir un juicio distinto si la cláusula que difiere le importa. La de
  `SPLIT` importa de forma medible: su primera oración empieza por **`Decide the scope`**, no
  por `Audit … against the contract` — y ese es exactamente el eje de `correctness_model`.
- Las cadenas O6 y O7 (F5, F6) **no colapsan por texto** y se declaran agrupadas **por dato
  objetivo medido, no por texto**: la medición está en su fila y es contundente (superficie
  inexistente en disco, consumidor único, red de captura nula).
- Las seis piezas de la fundación Slide **no se metieron en una sola familia**: escriben en
  cuatro superficies distintas (código de editor, documentación, fixtures, y el propio
  `roadmap.json`). Se separaron en F9, F10 y F11.

### C.4 — Cuántas familias salen

| Nivel | Familias | Runs cubiertos |
|---|---|---|
| N1 — colapso exacto puro | **32** (3 reales + 29 de uno) | 46 |
| **N2 — criterio declarado** | **13** | **46** |

**Trece familias.** No seis o siete: el ticket estimó ese orden como motivación, y la
medición no lo sostiene sin forzar agrupaciones que el criterio de aceptación 1 prohíbe.
Aun así, **dos familias concentran 19 de los 46 runs** (F1 con 15, F2 con 4), y las once
restantes tienen entre 1 y 5. El operador emite **trece juicios en vez de cuarenta y seis**,
y los dos primeros cubren el 41 % de la cola.

Reparto: 15 · 4 · 5 · 4 · 3 · 3 · 2 · 2 · 2 · 2 · 2 · 1 · 1 = **46** ✔

---

## BLOQUE D — LA TABLA DE FAMILIAS

**Esta es la sección que el operador lee para clasificar.** Una fila por familia. Ningún
valor de clasificación está asignado: las columnas son **medidas**, no juicios.

### D.1 — Índice de familias

| # | Familia | Runs | `queue_order` |
|---|---|---|---|
| **F1** | Revalidación de componente Web | **15** | 18–32 |
| **F2** | Verificación de packet de componente Web | **4** | 35–38 |
| **F3** | Component Guide del editor | **2** | 33, 34 |
| **F4** | Auditoría de conjunto y evidencia de preparación | **3** | 39, 41, 48 |
| **F5** | Cadena Asset Dedup (O6) | **5** | 50–54 |
| **F6** | Cadena Producción y despliegue (O7) | **3** | 55–57 |
| **F7** | Renombrados con mapa de disposición congelado | **4** | 60–63 |
| **F8** | Corpus documental: auditar y ejecutar | **2** | 17, 59 |
| **F9** | Fundación Slide — código y reproducción | **2** | 42, 44 |
| **F10** | Formato documental Slide | **2** | 43, 45 |
| **F11** | Runs que crean runs | **2** | 46, 47 |
| **F12** | Auditoría UX del workspace | **1** | 49 |
| **F13** | Vista Docs v3 de la consola | **1** | 58 |

### D.2 — La tabla, columna a columna

Las seis columnas de datos corresponden a los criterios 3 a 8 del encargo.

| # | Runs | **Qué toca (rutas medidas)** | **Consumidores: `depends_on` / código** | **Qué lo cazaría** | **Evidencia de «correcto»** | **¿Produce algo que otros CITAN?** | **Efectos externos / aprobación** |
|---|---|---|---|---|---|---|---|
| **F1** | 15 | `src/builders/web/partials/render*.js` (16 de 17 tienen renderer propio; 2 642–19 167 B) · `tools/author-lite/compiler-api/schemas/draftSchema.js` **y** `tools/author-lite/editor-ui/src/schemas/draftSchema.js` (**el esquema está duplicado en dos archivos**) · `compiler-api/services/compiler.js` (46 570 B) · `editor-ui/.../constants/blockCatalog.js` | `depends_on`: cada run tiene **2 dependientes**; **5 dependientes distintos** en total (los 4 batch de F2 + `WEB-READINESS-EVIDENCE`). **Código**: `draftSchema` → **18 archivos** lo importan; `compiler.js` → **23**; `blockCatalog` → **4**. Los renderers son hoja | **30 archivos de test** en `compiler-api/tests/` nombran estos componentes (1–10 por componente; `IconList` **1**, `Split` **1**, `Video` **2**, `Arithmetic` **2**). **PERO no hay runner declarado**: ningún `package.json` del repo declara script `test` (`compiler-api/package.json` no tiene bloque `scripts`). **El validador no comprueba nada de esto: 0 referencias a `src/builders`, `author-lite`, `draftSchema` o `compiler.js`**. El propio texto manda QA visual humana | **SPECIFIED por cita**: el texto cita 2 contratos + 1 inventario, **los tres existen**: `docs/reference/REFERENCE-COLOR-PALETTE-COMPATIBILITY.md`, `…/REFERENCE-MATH-FORMULA-COMPATIBILITY.md`, `…/REFERENCE-WEB-COMPONENT-COLOR-AND-MATH-INVENTORY.md`. Verbo dominante: **`Audit`**. Variantes: `RULE` añade «using the accepted RULE_ONLY Smart Formula Field baseline» y «Preserve the accepted keyboard and Smart Formula Field baseline»; **`SPLIT` empieza por `Decide the scope` y `Determine whether to enable it… or defer it`** | El resultado se cita después: los 4 batch de F2 verifican el packet **contra el código que esta familia deja**. El packet lo cita F2, no F1 | **Ninguno.** El texto no borra, no mueve, no aprueba. `SPLIT` decide habilitar/diferir un componente: es decisión de producto, no aprobación en nombre del operador |
| **F2** | 4 | `docs/components/web/*.md` (**17 packets, todos existen y están registrados**) · `.aiw/docs/docs_index.json` (149 entradas) · lee sin escribir: esquema, compilador, renderer, fixture de sandbox | `depends_on`: **0 dependientes**; son hoja de la cola. **Código**: los packets tienen **3,5 citadores de media** (59 en total, ejemplo `HEADER.md` → 6: los dos `docs_index`, el renderer de consola, y 3 records históricos). `COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md` → **6 citadores** | El validador **sí** comprueba una parte: `fs.existsSync(doc.path)` para **cada una de las 149 entradas** de `docs_index` (línea 651-655) — **hoy 0 rutas rotas**. **No comprueba** el contenido del packet contra el código. **Solo 2 tests** citan `components/web`, y son de math-authoring. La consola renderiza el cuerpo real del packet (`renderDocBodyContent`, línea 2775) → un humano lo vería | **SPECIFIED, con la sección citada**: «against the component-doc single-source contract at `docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md`, **whose Section 6 fixes this duty**». Verbo dominante: `Verify` | **SÍ, y es el caso de la advertencia.** El packet es lo que la vista Docs de la consola renderiza y lo que 3,5 archivos citan de media. **Cifra del texto verificada:** «four occurrences per packet» → medido **exactamente 4 en los 17** (2 al certification matrix + 2 a `REFERENCE-DRAFT-JSON`) | **Ninguno.** «keeps status reference-only, edits no Component Guide source, and **makes no production-readiness claim**» |
| **F3** | 2 | `editor-ui/.../preview/ComponentGuide.jsx` (**103 985 B, 2 608 líneas**) · `editor-ui/.../constants/blockCatalog.js` (60 244 B, 1 176 líneas, 20 campos `docs:`) · **borra** `tools/author-lite/scripts/checkComponentGuideTextIntegrity.cjs` (1 360 B) | `depends_on`: 33 → **1**; 34 → **0**. **Código**: `ComponentGuide` lo importan **2 archivos** (`RightPanel.jsx`, `DesignSystemSettingsModal.jsx`); `blockCatalog` **4**. Pero **alimenta a los 17 componentes**: es pieza compartida con dos importadores | **CERO tests afirman su cableado.** Medido: `grep -rl "blockCatalog\|ComponentGuide" compiler-api/tests/` → **0**. El único guardián es el script que el propio run desmantela, y **solo comprueba mojibake** (4 marcadores Unicode) más 2 cadenas prohibidas — nada del cableado. **Nadie lo invoca**: 0 importadores, ningún `package.json` lo llama; se corre a mano. **Éste es el eco exacto del precedente citado en el ticket** | 33: **sin contrato citado**; su texto **es** la especificación (cita rutas y cifras propias). 34: `SPECIFIED` contra lo que 33 deje — «Take the fixed template as the reference». 33 contiene además un **`deciding in the same run what check the Guide and the catalog still need`** | La Guide **es superficie de producto para un autor humano**; su contenido no lo cita otro run, pero lo ve el autor en cada sesión de edición | 33 **retira, elimina y desmantela**: «Retire the Programmer mode» (29 menciones de `programmer` en el archivo), «Remove the inline certification labels», «Dismantle the text-integrity script». Borrado de un archivo versionado. **Sin aprobación**: «makes no production-readiness claim» |
| **F4** | 3 | **No toca código.** Escribe un paquete de evidencia (documento). 39 audita las 17 superficies de F1; 48 las de Slide; 41 la integración del Formula Inserter | `depends_on`: 39 → **4** dependientes y **17 dependencias** (la mayor arista del roadmap); 48 → **4**; 41 → **0**. **Código**: ninguno directo — su producto es un documento | Nada automático. El validador no lee documentos de evidencia. Un humano lo vería solo si abre el paquete | **JUICIO, con la palabra en el texto:** 39 «**audit** the Web component set as a whole»; 41 «This Run **audits** the result across components»; 48 «**audit** the Slide component set as a whole». No citan contrato ni fixture que reproducir | **SÍ.** Es literalmente un «readiness evidence package» que F5, F6, F7 y F12 consumen por `depends_on` — **8 aristas entrantes** apuntan a 39 y 48 | **Ninguno**, y los tres lo dicen: «makes no production-readiness claim». 48 añade: «Keep readiness evidence **separate from any later approval decision**» |
| **F5** | 5 | **Nada de esto existe hoy en disco.** Medido: `ctx.assets` **0 archivos**, `assetRegistry` **0**, `dedup` **0** en `src/`, `compiler-api/{services,schemas}`, `editor-ui/src`. 53 sí tocaría los renderers existentes | `depends_on`: cadena lineal, **1 dependiente cada uno** salvo 54 → **0**. **Código: 0 consumidores** — no hay nada que importar todavía | 53 dice «Add targeted tests» — los crearía él. 54 **es** la red de captura: «reject the change if equivalence cannot be demonstrated». Antes de 53 no hay nada que cazar nada | Mezcla medida: 50 «measure» + «reproducible baseline» → medición; 51 «**Design** stable asset identifiers»; 52 «**Define** how builders and renderers declare»; 53 «Implement the **approved** registry and ctx.assets contract»; 54 «Compare… and **reject**» | 51 y 52 producen contrato que 53 implementa y 54 valida: **sí, dentro de la cadena**. Fuera de ella, nadie los cita | **Ninguno de escritura irreversible.** 51 y 53 dicen «**approved** contract» / «the **approved** registry» — **la aprobación es un requisito previo que el run espera, no una que el run emita** |
| **F6** | 3 | 55 corre lecciones reales: **`src/content/lecciones/` (2 archivos)** y **`src/content/staging/` (8)** — cifras del texto de otro run, verificadas aquí. 56/57: **superficie inexistente hoy**; 0 documentos de hosting o deploy fuera de `docs/archive` | `depends_on`: cadena, 1-1-0. **Código: 0 consumidores** para 56 y 57 | Nada automático. 55 «Record failures as bounded follow-up Runs **rather than editing production lessons opportunistically**» — la red es el propio operador leyendo el informe | 55: sin contrato citado, verifica contra «the accepted upstream systems». 56 «Implement or regularize». 57 «**Define** the deployment architecture… and unresolved operational decisions» | 57 produce «a plan and decision boundary» — documento que nadie cita todavía (0 citadores medidos) | 56 empaqueta y escribe salida de producción. **57 declara explícitamente que NO despliega**: «This Run produces a plan and decision boundary, **not an automatic deployment**» |
| **F7** | 4 | **La mayor superficie medida del encargo.** 60: `tools/author-lite/` → **237 archivos** lo referencian; `src/content/author_lite` → **88**. Ancla del lanzador en `tools/dev/start-editor.ps1:48`. 61: `AGENTS.md` (18 refs), `CLAUDE.md` (**29**), `generate_prompt_context.js` (8), **16 de 17 packets**. 62: **7 clases** `jame-smart-formula-*` + `data-jame-active-layout` (13 apariciones) + 3 tests. 63: **335 tokens `j-*`** en `src/` + `j-infinity-root` (8 apariciones) | `depends_on`: 60 → **2**; 62 → **1**; 61 y 63 → **0**. **Código: el acoplamiento es el trabajo.** 237 y 88 archivos son la medida real; `depends_on` no la refleja en absoluto | **Nada automático llega aquí.** 0 tests afirman los nombres de directorio; el validador no lee ninguna de estas rutas. Los propios textos lo dicen: 60 «some references are path comments and runtime lookups that **fail silently rather than at build time**»; 62 y 63 «these identifiers **break rendering rather than compilation**». 63 se describe como «the largest and **quietest** of the rename runs» | **SPECIFIED contra el mapa congelado**: los cuatro dependen de `RUN-CANTU-NAMING-AUDIT-DISPOSITION-001` (cerrado) y citan «following the frozen disposition map» → `docs/reference/REFERENCE-NAMING-DISPOSITION-AND-EXCLUSION.md`, **existe**. Excepción: 61 contiene «**decide** separately what happens to the two empty directory shells» | Los nombres renombrados son lo que 237 + 88 archivos citan. No es un documento citado: es un identificador copiado | **Sí, escritura irreversible: renombrado en masa.** 60 «rename… and update every inbound path reference», en edición atómica con el ancla del lanzador o «the launcher exits reporting a broken checkout». **Ninguna aprobación en nombre del operador** |
| **F8** | 2 | 17: **lee** `docs/` (**343 md, 288 bajo `docs/archive/`, 149 registrados** — las tres cifras de su texto, verificadas exactas) y escribe **solo la lista**. 59: **borra y mueve** en `docs/` y reconcilia `.aiw/docs/docs_index.json` | `depends_on`: 17 → **1** (59); 59 → **0**. **Código**: `docs_index.json` lo leen el validador y el renderer de consola | **Ésta es la única familia con red automática real de escritura.** El validador falla si una entrada de `docs_index` apunta a ruta inexistente (`Docs index path missing`), y también si le falta `freshness_status` o `source_role`. **Hoy: 0 rutas rotas de 149.** Un borrado sin reconciliar el registro **sale en rojo** | 17: **JUICIO puro**, y lo dice: «**Audit** the documentation corpus against the standard», «**Classify** every source and record one disposition». 59: **SPECIFIED contra la lista que 17 produce**: «**Follow the list rather than re-deciding it**» | **SÍ, y es el caso más fuerte.** La lista de 17 es lo que 59 ejecuta sin re-decidir. Una disposición equivocada en 17 se ejecuta a ciegas en 59 | **17: ninguno** — «it deletes nothing, moves nothing, rewrites no document, and edits no registry entry». **59: borrado permanente de documentos**, «Delete the sources the list marks for deletion». Sin aprobación en nombre del operador |
| **F9** | 2 | 42: sistema de rejilla en el editor — superficie a crear; hoy `src/builders/slides/` tiene **11 componentes + 5 layouts + `renderSlides.js`**. 44: reproduce **8 fixtures** de `src/content/sandbox/` en el editor | `depends_on`: 42 → **1**; 44 → **2**. **Código**: la rejilla sería pieza compartida por los 11 componentes Slide + 5 layouts; hoy **0 consumidores** porque no existe | Nada. **0 tests** en el repo tocan `src/builders/slides/`. El validador no lo lee. Ambos textos mandan reproducción manual | 42: **`Audit and define`**, y encadena `Determine the grid model`, `whether the grid is an insertable structural component… or a property of the slide itself`, `how an author configures it`. 44: `Reproduce`, contra los fixtures que existen — más especificado | 44 produce «The component inventory this produces **is the input to the per-component runs defined later**»: F11 lo consume | **Ninguno** de escritura irreversible ni aprobación |
| **F10** | 2 | 43: escribe documentación de baseline, plegándola sobre `docs/architecture/ARCHITECTURE-SLIDES-ENGINE.md` y `docs/reference/REFERENCE-SLIDES-ENGINE-API.md` (**ambos existen, 5 citadores cada uno**). 45: formato de Guide, calcado del Web | `depends_on`: 43 → **1**; 45 → **1**. **Código**: 0. El dossier fuente `docs/archive/rewrite-dossiers/SLIDES-ENGINE-CODE-AUDIT-DOSSIER.md` **existe** (3 citadores, todos de estado) | Nada automático salvo la existencia de ruta en `docs_index` cuando se registren | **SPECIFIED en buena parte, y el texto lo mide:** 43 dice «**Most of this baseline already exists**» y acota a **dos áreas que el dossier excluyó por diseño**. 45 «using the accepted Web Component Guide **as the template rather than designing a new one**» | **SÍ.** 43 «register the baseline as documentation» — pasa de «DRAFT EVIDENCE, internal working material, not documentation, not registered» a registrado. 45 fija «a defined documentation target to fill» para cada run posterior | **Ninguno.** 43 cambia el estado de registro de un documento, que es reversible |
| **F11** | 2 | **`.aiw/roadmap/roadmap.json` — el canónico.** 46 «create one bounded run per Slide component». 47 no escribe nada: «carries no implementation work itself» | `depends_on`: 46 → **1**; 47 → **1**. **Código**: 0 | El motor valida forma del roadmap; **no valida que los runs creados sean los correctos**. El validador de Cantu tolera pero no comprueba (bloque E.2) | 46: **`audit that inventory and create`** — juicio, y el texto lo justifica: «The per-component runs are created when this Run is reached, **not before, because the inventory is not known until reproduction is done**». 47 es marcador de posición | 46 produce los propios runs que ejecutarán la fase: es la familia cuyo producto **es** la cola | **Escribe en el canónico del roadmap.** Según `AGENTS.md`, un encargo «**nunca** cambia `status`… y **nunca** re-emite `.project/`»; crear runs es otra operación y la hace la consola. **Sin aprobación en nombre del operador** |
| **F12** | 1 | Superficie compartida del editor: «preview surface, settings button, editor chrome, toolbar, panel layout, and shared authoring controls». No nombra archivo | `depends_on`: **0 dependientes**, 2 dependencias (39 y 48). **Código**: no acotado por el texto | Nada. No hay test de UX; el validador no lee el editor | **JUICIO, con la palabra**: «Run one bounded **audit**». El texto **acota por negación**: «does not implement broad or vague **polish**», «does not revalidate components», «does not touch the Color / Palette or Math / Formula compatibility contracts» | Produce «concrete, specific follow-up runs to route through the roadmap maintenance helper» — que otro run ejecutará | **Ninguno**, pero **enruta runs nuevos al roadmap** vía el helper de mantenimiento |
| **F13** | 1 | `docs/project-console/assets/project-console.js` — **283 684 B, cifra del texto verificada exacta**. Tres huecos nombrados con línea, **los tres verificados**: `authority` aparece **exactamente 1 vez, en la línea 2320, como clave de mapa**; `renderDocBodyContent` **en la 2775**; `stripLeadingStatusHeader` **en la 2777** | `depends_on`: **0 dependientes**. **Código**: es el renderer de la consola; lo consume el humano que la abre | El validador **sí** ancla partes de este archivo (comprueba que existan `deriveDocNavTier`, `operatorRun(`, `renderStageStrip(`…), pero **no** comprueba el mapa de categorías. **El defecto que el run nombra está vivo hoy y el validador no lo ve**: la línea 2320 mapea `docs/GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md` mientras el índice registra `docs/governance/GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md`, y el documento cae al cubo sin categoría | **SPECIFIED, muy acotado**: tres huecos con número de línea, más «consuming the component packets through the component-doc single-source contract». No hay verbo de juicio | La vista Docs es la superficie por la que un humano lee la documentación registrada | **Ninguno.** «must remain a read-only projection: it must not create independent document status, must not add control-plane behavior, **must not treat documentation as runtime approval**» |

### D.3 — F1, desglosada por variante

Porque es la familia mayor y el operador puede querer partirla.

| Variante | Runs | Colapso | Cláusula que la distingue | Tests que la nombran |
|---|---|---|---|---|
| **F1a** — contrato de color | **9**: `LIST` 18, `ICONLIST` 19, `CARD` 20, `VIDEO` 21, `NARRATIVE` 22, `CALLOUT` 23, `DETAILS` 24, `TABLE` 28, `VISUAL` 32 | **exacto** (`a2c809b5b1`) | — (cuerpo base) | `List` 10 · `IconList` **1** · `Card` 10 · `Video` 2 · `Narrative` 3 · `Callout` 6 · `Details` 4 · `Table` 6 · `Visual` 3 |
| **F1b** — contrato de color **+** matemáticas | **4**: `ARITHMETIC` 25, `CONCEPTGRID` 29, `HIERARCHY` 30, `TIMELINE` 31 | **exacto** (`e0950ce31a`) | «and the math and Formula Inserter compatibility contract» — **3 de 4 oraciones idénticas a F1a** | `Arithmetic` **2** · `ConceptGrid` 3 · `Hierarchy` 3 · `Timeline` 3 |
| **F1c** — con baseline aceptada | **1**: `RULE` 26 | **no colapsa** (0 oraciones compartidas) | «using the accepted RULE_ONLY Smart Formula Field baseline» + «**Preserve** the accepted keyboard and Smart Formula Field baseline» | `Rule` **9** — la mejor cubierta de las 17 |
| **F1d** — decidir alcance | **1**: `SPLIT` 27 | **no colapsa** (1 oración compartida) | «**Decide the scope**… which the editor block catalog currently marks **disabled** and which exists only as a Columns child» + «**Determine whether to enable it**… or defer it» | `Split` **1** |

**Observación, no asignación:** F1d es la única variante cuyo texto no cita el inventario como
punto de partida y cuyo primer verbo es `Decide`. F1c es la única que añade una obligación de
preservación. Si el operador clasifica F1 de una vez, esas dos filas son las que quedarían
cubiertas por un juicio que su texto no comparte.

---

## BLOQUE E — Lo que el validador NO caza, medido

Alimenta `failure_surfaces`. **No se asigna ningún valor**: se reporta qué existe.

### E.1 — El validador de Cantu solo lee tres sitios

```bash
grep -oh 'readJson("[^"]*"\|readJsonl("[^"]*"\|readText("[^"]*"' tools/project-console/validate-project-console-state.mjs | sort -u
```

Lee **15 rutas**, todas bajo `.aiw/`, `docs/project-console/` o `tools/project-console/`.
**2 108 líneas y 240 llamadas a `fail()`**, y ninguna alcanza el producto:

| Superficie | Referencias en el validador |
|---|---|
| `docs/components/web` (los 17 packets) | **0** |
| `src/builders` (los renderers) | **0** |
| `tools/author-lite` (editor, esquema, compilador) | **0** |
| `blockCatalog` / `ComponentGuide` | **0** |
| `draftSchema` / `compiler.js` | **0** |
| cualquier archivo `.test.` | **0** |
| `.aiw/docs/docs_index.json` | 8 |
| `.aiw/state/component_status.json` | 8 |

**Consecuencia medida:** F1, F3, F7 y F9 escriben en superficies que el validador nunca abre.
F2 y F8 escriben en `docs_index.json`, que sí comprueba —existencia de ruta,
`freshness_status`, `source_role`—.

### E.2 — El validador tolera la clasificación pero no la valida

`validate-project-console-state.mjs:834-846`, verbatim:

> `[classification: TOLERATE, NOT ADOPT]` … *This validator asserts nothing about them: it
> does not check a token against its closed vocabulary, does not check `external_effects` is
> an array, does not read `classified_at` as a date, does not enforce the illegal
> combinations, and derives nothing.*

Quien valida los seis campos es **el motor de `aiw-console`** (`roadmap-core.mjs`, 12
referencias a `external_effects`, 9 a `classified_at`). Un valor mal escrito a mano en el
canónico de Cantu **no lo caza el validador de Cantu**.

### E.3 — Los tests existen, pero nadie los corre por contrato

| Medida | Valor |
|---|---|
| Archivos de test en `tools/author-lite/compiler-api/tests/` | **30** (20 `web*`, 8 `mathAuthoring*`, 2 otros) |
| Archivos de test en `tools/roadmap/tests/` | 7 |
| `package.json` en el repo (sin `node_modules`) | **4** |
| …que declaran script `test` | **0** |
| `compiler-api/package.json` | **no tiene bloque `scripts`** |

Los quince textos de F1 dicen «verify the result by human visual QA rather than an automated
test suite, **since the repository has no test runner**». **La afirmación es literalmente
cierta en cuanto a runner declarado y engañosa en cuanto a cobertura**: hay 30 archivos de
test que nombran exactamente esos componentes, ejecutables con `node --test` (que es lo que
`aiw-console` declara en su propio `package.json`). **Este encargo no ejecutó ninguno** —
correr suites está fuera de alcance—; solo los contó.

---

## BLOQUE F — La evidencia de «correcto», con la cita

Alimenta `correctness_model`. **No se decide nada**: se reporta si el run cita algo
reproducible o si su texto pide juicio, y se comprueba que lo citado exista.

### F.1 — Lo citado existe

| Artefacto citado | Ruta | ¿Existe? | Citadores |
|---|---|---|---|
| Contrato de color y paleta | `docs/reference/REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` | **sí** | 6 |
| Contrato de matemáticas y Formula Inserter | `docs/reference/REFERENCE-MATH-FORMULA-COMPATIBILITY.md` | **sí** | 6 |
| Inventario de componentes | `docs/reference/REFERENCE-WEB-COMPONENT-COLOR-AND-MATH-INVENTORY.md` | **sí** | 3 |
| Contrato documental de packet | `docs/docs_management/COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md` | **sí** | 6 |
| Mapa de disposición de nombres | `docs/reference/REFERENCE-NAMING-DISPOSITION-AND-EXCLUSION.md` | **sí** | — |
| Dossier del motor de Slides | `docs/archive/rewrite-dossiers/SLIDES-ENGINE-CODE-AUDIT-DOSSIER.md` | **sí** | 3 |

**Ningún run pendiente cita un artefacto que no exista.**

### F.2 — Los verbos, extraídos mecánicamente

| Verbo de juicio en `full_description` | Runs pendientes |
|---|---|
| `audit` / `audits` | **24** |
| `define` / `defines` | 3 (42, 52, 57) |
| `decide` / `decides` | 2 (**27 `SPLIT`**, 61) |
| `determine` / `determines` | 2 (27, 42) |
| `design` / `designs` | 2 (43, 51) |
| `classify` | 1 (17) |
| `polish` | 1 (49 — **y aparece negado**: «does not implement broad or vague polish») |

| Referencia externa citada | Runs pendientes |
|---|---|
| `contract` | 26 |
| `inventory` | 14 |
| `baseline` | 4 |
| `template` | 4 |
| `fixture` | 4 |
| `disposition map` | 3 |
| `standard` | 1 |

**Observación, no asignación:** 24 runs llevan `audit` y 26 citan un `contract`. Los dos
conjuntos se solapan casi por completo en F1: el texto dice `Audit … against the contract`,
que es auditar contra algo escrito, no auditar a ojo. El caso donde el verbo aparece **sin**
referencia citada es F4 (39, 41, 48), F12 (49) y parte de F9 (42).

### F.3 — Efectos externos y aprobación, por run

Alimenta `external_effects` (campo **almacenado**, ver B.2).

| Run | Qué hace de irreversible | ¿Aprueba en nombre del operador? |
|---|---|---|
| 33 `COMPONENT-GUIDE-PACKET-WIRING` | **Borra** `checkComponentGuideTextIntegrity.cjs`; retira el modo Programmer y las etiquetas de certificación en línea | No — «makes no production-readiness claim» |
| 59 `DOCUMENTATION-CORPUS-CLEANUP` | **Borra y mueve documentos** de un corpus de 343 md; reconcilia el registro | No — «makes no production-readiness claim» |
| 60 `INTERNAL-CODE-RENAME` | **Renombra `tools/author-lite` y `src/content/author_lite`** y 237 + 88 referencias entrantes | No |
| 61 `DOCS-DIRECTORY-RENAME` | Barre referencias y **dispone de dos directorios vacíos** | No |
| 62 `RUNTIME-JAME-CLASS-RENAME` | Renombra 7 clases + 1 atributo + 3 tests | No |
| 63 `RUNTIME-J-NAMESPACE-RENAME` | **Renombra 335 tokens `j-*`** en builders y hojas de estilo | No |
| 46 `SLIDE-BOUNDED-RUN-PLAN` | **Escribe runs nuevos en el canónico del roadmap** | No |
| 56 `PRODUCTION-EXPORT-FLOW` | Escribe salida de producción empaquetada | No |

**Ninguno de los 46 runs pendientes emite una aprobación en nombre del operador.** Los ocho
textos que contienen `approve`/`certif`/`production-readiness` lo hacen **negándola** («makes
no production-readiness claim», «Keep readiness evidence separate from any later approval
decision», «must not treat documentation as runtime approval») o **exigiéndola como
precondición** («the **approved** registry and ctx.assets contract»).

**El precedente que el ticket cita —un encargo que se negó a escribir en el ledger de
decisiones humanas— no tiene análogo en esta cola.** Ningún run pendiente escribe en
`.aiw/ledgers/human_decisions.jsonl`.

---

## BLOQUE G — Discrepancias medidas. Se nombran; no se tocan

Cifras y afirmaciones que el disco no confirma. **Reparar cualquiera de ellas está fuera de
alcance de este encargo, y no se hizo.**

| # | Dónde | Qué dice | Qué mide el disco |
|---|---|---|---|
| **G.1** | `AGENTS.md`, sección «Fuente de orden de trabajo» | «Hoy contiene **7 objectives, 28 phases y 72 runs**» y «hoy **49 de 72** runs no declaran `lane` y **23** declaran `DOCUMENTATION`» | **63 runs**, no 72. **52** sin `lane`, **11** `DOCUMENTATION`. Objetivos y fases sí coinciden (7 / 28). El texto quedó del roadmap anterior al rediseño |
| **G.2** | `AGENTS.md:110` | «`docs/DOCUMENTATION-BLUEPRINT.md` define el estandar de documentacion» | **Esa ruta no existe.** El documento está en `docs/docs_management/DOCUMENTATION-BLUEPRINT.md`, que es donde `docs_index.json` lo registra correctamente. El validador no lo caza porque solo comprueba las rutas del índice, no la prosa |
| **G.3** | Texto de `RUN-CANTU-DOCS-DIRECTORY-RENAME-001` | «**all seventeen packets** under `docs/components/web/`, each of which points at the certification matrix under `docs/author-lite/components/`» | **16 de 17.** `COLUMNS.md` ya apunta a `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md`, la ruta buena — presumiblemente corregido por `RUN-CANTU-WEB-COLUMNS-DOC-001`, que está cerrado |
| **G.4** | `.aiw/state/component_status.json` frente a `docs/components/web/` | — | **16 componentes** en el registro de estado, **17 packets** en disco: falta `columns`. El validador lee ambos pero **no los cruza** |
| **G.5** | `.aiw/roadmap/roadmap.json` | `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` depende de `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` | **Esa dependencia no resuelve en este roadmap.** Es la única arista colgante de 63 runs. El validador la reporta como **warning no bloqueante** y dice por qué no puede decidirlo con un solo roadmap cargado. Se deja como está |

Cifras del ticket y de los textos de run que **sí** verifican exactamente, para constancia:
63 / 17 / 46 runs · 343 md bajo `docs/` · 288 bajo `docs/archive/` · 149 registrados · 2
lecciones + 8 en staging · 7 clases `jame-smart-formula-*` · 335 tokens `j-*` · 29
referencias legacy en `CLAUDE.md` · 4 punteros obsoletos por packet en los 17 · 283 684 B del
renderer de consola · `authority` una sola vez, en la línea 2320 · `renderDocBodyContent` en
la 2775 · `stripLeadingStatusHeader` en la 2777 · directorios `docs/author-lite/` y
`docs/jame-core/` con **0 archivos** y las cinco + una subcarpetas vacías que el texto nombra.

---

## BLOQUE H — Cero escrituras, y validador en verde

### H.1 — Huella del árbol, antes y después

```bash
cd projects/cantu-studio && find . -type f -not -path "./.git/*" -not -path "*/node_modules/*" -printf "%p|%s|%T@\n" | sort > cantu_before.txt
```

**`node_modules` cubierto** por el filtro `-not -path "*/node_modules/*"`, y `.git` excluido
porque no se ejecutó Git en ninguna forma.

| Momento | Archivos | md5 de la huella |
|---|---|---|
| Antes | **1 089** | `6c97ad222f2ec4f65bebde3da24d071e` |
| Después | **1 090** | `22f237a54256fdf00d237a25cec3bed2` |

**La huella cambió, y el diff dice exactamente por qué.** Tres entradas, las tres bajo
`tools/`, que es la superficie declarada del **encargo paralelo** del criterio 16:

```diff
< ./tools/project-console/validate-project-console-state.mjs|98725|1785195755.85
> ./tools/project-console/validate-project-console-state.mjs|101460|1785560407.01
< ./tools/roadmap/roadmap-core.mjs|53558|1785195251.06
> ./tools/roadmap/roadmap-core.mjs|55818|1785560425.23
+ ./tools/roadmap/tests/classificationTolerance.test.mjs|13072|1785560627.64
```

El validador creció 2 735 bytes, el motor 2 260, y apareció un test nuevo,
`classificationTolerance.test.mjs`. **Ninguno de los tres los tocó este encargo**, que no
abrió un solo archivo en modo escritura dentro de `cantu-studio`. Coincide con lo declarado
en B.4: cuando se midió el validador a mitad de sesión ya marcaba `2026-07-31 23:00` y
101 460 B, es decir, el encargo paralelo había escrito entre la huella inicial y esa lectura.

**Las 1 086 entradas restantes son idénticas byte a byte y marca de tiempo a marca de
tiempo**, incluidos el canónico `.aiw/roadmap/roadmap.json`, todo `.aiw/`, todo `docs/`, todo
`src/` y todo `tools/author-lite/`.

### H.2 — Validador, por la vía que no escribe

```bash
cd projects/cantu-studio && node tools/project-console/validate-project-console-state.mjs
```

Es la vía que `AGENTS.md` declara para «leer el estado del canónico sin escribir», y el
archivo no contiene ninguna llamada de escritura.

**Antes: `EXIT 0`.** `Project Console state validation passed.` · 7 objetivos / 28 fases / 63
runs · grupos de cola `needs_human_decision=0 now=0 ready_next=20 later=26 history=17` · 149
documentos indexados · 16 estados de componente. Un warning no bloqueante: el de G.5.

**Después: `EXIT 0`.** Y la salida es **idéntica carácter a carácter** a la de antes —`diff`
de ambas capturas: sin diferencias—: mismos 7 objetivos / 28 fases / 63 runs, mismos grupos
de cola `ready_next=20 later=26 history=17`, mismos 149 documentos, mismos 16 estados de
componente, y el mismo único warning no bloqueante de G.5.

Que la salida no se moviera **pese a que el validador y el motor cambiaron de bytes bajo los
pies** es en sí un dato: los cambios del encargo paralelo no alteraron ningún veredicto sobre
el estado de Cantu.

### H.3 — Resultado

| Comprobación | Resultado |
|---|---|
| Validador antes | **`EXIT 0`** |
| Validador después | **`EXIT 0`**, salida idéntica |
| Archivos de `cantu-studio` escritos por este encargo | **0** |
| Entradas de la huella con diferencia | 3, **todas atribuidas al encargo paralelo** en `tools/` |
| Canónico `.aiw/roadmap/roadmap.json` | **sin tocar** (mismo tamaño, misma marca de tiempo) |
| Valores de clasificación asignados | **0** |

---

## Archivos escritos por este encargo, y ninguno más

| # | Archivo | Bytes |
|---|---|---|
| 1 | `projects/aiw-console/context/aiw-console/records/FAMILIAS-DE-RUNS-PENDIENTES-CANTU.md` | este record |

**Una sola fila.** No se escribió, movió ni borró ningún archivo de `cantu-studio`. No se
tocó el canónico, ni `.project/`, ni ningún `status`. No se asignó ningún valor de
clasificación. No se propuso ningún cambio al roadmap. No se reparó nada de lo nombrado en el
bloque G.

Records existentes en `context/aiw-console/records/` antes de este: **90**. Con este: **91**.
Nombre verificado sin colisión.
