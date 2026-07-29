# CONTRATO DE COMPATIBILIDAD DE MATH, FÓRMULA Y FORMULA INSERTER — RUN `#8` EN CANTU

> Ejecución de `RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001` (`queue_order` 8, `O5.P7`).
> **Tres archivos escritos**: el contrato en `docs/reference/`, su entrada en el índice de docs, y
> este record. **Ninguno más** — barrido de `mtime` sobre 22 122 ficheros de `cantu-studio`,
> `node_modules` incluido, devuelve **exactamente dos**.
>
> **Las ocho decisiones abiertas no se decidieron.** Están transcritas verbatim en la §11 del
> contrato, cada una con recomendación técnica y marca explícita de que decide el operador. Una de
> las ocho **sí quedó resuelta en código** y se reporta como tal, no como decisión tomada aquí.
>
> Fecha: 2026-07-28. **Git no se usó en ninguna forma.** No se levantó ningún servidor. **No se corrió
> ninguna suite** — los tests se leyeron como fuente. **No se re-emitió `.project/`.** **No se cambió
> `status`, `progress` ni `closeout_result` de ningún run.** No se implementó nada.
>
> **Dos cifras del ticket no sobrevivieron a la medición, las dos hacia arriba.** Los componentes con
> punto de integración math no son los cuatro candidatos nombrados: son **seis**. Y el hueco
> documental es real pero está **mal descrito**: los dos documentos de diseño no existen como
> ficheros, pero su contenido **fue absorbido a propósito** y sigue siendo citable.

---

## Archivos escritos por este encargo, y ninguno más

| # | Ruta | Acción | Antes | Después |
|---|---|---|---|---|
| 1 | `cantu-studio/docs/reference/REFERENCE-MATH-FORMULA-COMPATIBILITY.md` | **creado** | no existía | 328 líneas, 19 030 B, ASCII puro |
| 2 | `cantu-studio/.aiw/docs/docs_index.json` | **editado, +1 entrada** | 143 entradas, 307 285 B | 144 entradas, 309 217 B |
| 3 | `aiw-console/context/aiw-console/records/CONTRATO-MATH-FORMULA-Y-FORMULA-INSERTER-CANTU.md` | **creado** | no existía | este record |

**Verificación independiente del alcance de escritura.** Barrido de `mtime` posterior al inicio de la
ventana sobre todo `cantu-studio`:

```
find . -type f | wc -l                              -> 22122
find . -type f -newermt "2026-07-28 19:00:00"       -> 2
  ./.aiw/docs/docs_index.json
  ./docs/reference/REFERENCE-MATH-FORMULA-COMPATIBILITY.md
```

El mismo barrido sobre `aiw-console` devuelve **cero** ficheros antes de escribir este record.

---

## BLOQUE A — EL RUN, LEÍDO VERBATIM DEL CANÓNICO

### A.1 La guarda del `run_id`, ejecutada antes de nada

El ticket avisa de que el id **no** contiene «FORMULA-INSERTER» aunque el título sí lo diga. Confirmado:
el id se derivó por `queue_order`, nunca se tecleó desde el título.

| Comprobación | Resultado |
|---|---|
| `queue_order === 8`, único en los 72 runs | `RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001` |
| Título del canónico == título del ticket | idéntico, carácter a carácter |
| ¿El id contiene `FORMULA-INSERTER`? | **no** — contiene `MATH-FORMULA-COMPATIBILITY` |
| Objetivo / fase | `O5` «Editor and Engine Shared Features» / `O5.P7` «Math and Formula Compatibility Contract» |
| `status` al abrir | `active` |
| `depends_on` | `["RUN-JAME-SMART-FORMULA-FIELD-RULE-ONLY-BASELINE-001"]` (`#1`, `completed`) |
| `progress`, `closeout_result` | ausentes (`undefined`) |

**Sobre el carril.** El run **no tiene campo `lane`** — sólo 23 de los 72 lo llevan explícito. El carril
`DEVELOPMENT` es el que `roadmap.json` marca `"default": true`, así que el run es `DEVELOPMENT` por
defecto, no por declaración. Coincide con el ticket; lo anoto porque la guarda no se puede leer del
propio run.

**No hubo salto de guarda.** Nada que reportar por esa vía.

### A.2 Los tres campos, tal cual

**`title`:**

> Define the math, formula, and Formula Inserter compatibility contract

**`summary`:**

> Define the cross-cutting math / formula / Formula Inserter compatibility contract that component
> revalidation runs consume; apply it inside component runs, not here.

**`full_description`:**

> Define the cross-cutting math, formula, and Formula Inserter compatibility contract consumed by Web
> component revalidation runs: the supported LaTeX/KaTeX input surface, normalization and compile
> expectations, security boundaries, and how a component declares math/formula compatibility. The
> application of this contract to specific components — for example Arithmetic factorization and the
> Rule component — happens inside those components' own revalidation runs, not here. This foundation
> builds on the accepted Smart Formula Field RULE_ONLY baseline; it does not make MathLive globally
> available, does not make the Formula Inserter global-ready, and keeps the Smart Formula Field
> RULE_ONLY.

### A.3 Dónde el run pide algo que el ticket no nombra, y se entregó igual

El `full_description` exige cuatro entregas nominales. El ticket nombra tres con detalle y deja una
casi de pasada:

1. «the supported LaTeX/KaTeX input surface» → §3 y §4 del contrato.
2. «normalization and compile expectations» → §3, §5 y §6.
3. «security boundaries» → §7.
4. **«how a component declares math/formula compatibility»** → §10. El ticket lo cubre implícitamente
   al pedir el bloque de auditoría obligatorio, pero el run lo pide **nominalmente**, así que el
   contrato lo entrega como cláusula propia con sus cinco clases.

Además el run cierra con tres negativas explícitas —no hacer MathLive global, no hacer el Formula
Inserter global-ready, mantener RULE_ONLY— que están transcritas como no-claim en la §14.

**No hay contradicción entre el ticket y el run.** Nada que declarar por esa vía.

### A.4 Quién consume esto, medido en el grafo

| Medición | Ticket | Disco |
|---|---|---|
| Dependientes directos | «`#9` depende de este run» | **3**: `#9`, `#30` (Arithmetic), `#32` (Rule) |
| Alcance transitivo total | «diecisiete runs … vía `#9`» | **50 runs** en la clausura, 47 puramente transitivos |
| Pares de componente | diecisiete | **17**, confirmado |

El ticket subcuenta el alcance transitivo: son 50, no 17. Los 17 son los **pares de componente**, que sí
cuadran exactamente — `#12`…`#44` en saltos de dos, más sus runs de documentación.

---

## BLOQUE B — MEDICIÓN, ANTES DE ESCRIBIR

### B.1 Qué componentes tienen hoy punto de integración math

El ticket nombra cuatro candidatos —Arithmetic, Rule, Table, Timeline— y pide medir en vez de suponer.
**Son seis, no cuatro.** Faltaban `split` y `hierarchy`.

De los **17** componentes Web author-facing (`WEB_COMPONENT_UI`, `blockCatalog.js`, `mtime`
2026-06-25 05:55:59):

| Componente | Campo math | Superficie | ¿Llega a output como math? |
|---|---|---|---|
| `rule` | `math` | **A, LaTeX saneado** | sí |
| `table` | `rows[].value.math.{expression,result}` | B, texto opaco | sí |
| `arithmetic` | `counts[].math`, `result` | B | sí |
| `split` | `steps[].math`, `gridSteps[].math`, `result` | B | sí |
| `timeline` | `steps[].math` | B | sí |
| `hierarchy` | `nodes[].math` | B | **NO** — el renderer no emite delimitadores |
| `conceptGrid` | ninguno en el Editor | — | no |
| `columns` | ninguno | — | propaga hijos |
| `header`, `narrative`, `list`, `iconList`, `callout`, `card`, `details`, `video`, `visual` | ninguno | — | — |

**Tres hallazgos que la suposición no habría dado:**

- **`hierarchy` tiene campo de fórmula y no renderiza fórmula.** `src/builders/web/partials/renderHierarchy.js`
  (`mtime` 2026-05-31 04:30:21) emite `node.math` dentro de un `<div>` estilizado y **no contiene ni un
  solo `\(` ni `\[` en todo el fichero** (`grep -c` = 0). Como el render final es auto-render de KaTeX,
  sin delimitador no hay matemática: se muestra texto plano. Es el análogo exacto del patrón de
  regresión de paleta del contrato de color. Va nombrado en la §9 del contrato, **sin reparar**.
- **`conceptGrid` está en la categoría `math` del Editor y no tiene campo math.** El renderer de Core lee
  `item.math`, pero `ConceptGridItemSchema` sólo admite `variant`, `title`, `badge`, `terms`, `content`.
  Ningún draft del Editor puede producirlo.
- **`split` no es bloque top-level.** Sólo existe como hijo de `columns` (`WebSplitColumnsChildSchema`);
  no está en la unión `WebBlockSchema`.

### B.2 La superficie de entrada LaTeX/KaTeX que el compilador acepta de hecho

**El hallazgo central: hay dos superficies, no una.** Leído del código y de los tests, no de la
documentación archivada.

**Superficie A — LaTeX saneado. Sólo `rule.math`.** Pasa por `validateRuleMathValue` →
`validateLatexPayload` (`latexSanitizer.js`, `mtime` 2026-06-24 18:57:57; `constants.js`,
2026-06-24 18:57:00):

- **39 comandos** en allowlist cerrada. Cualquier otro → `UNKNOWN_LATEX_COMMAND`.
- **9 entornos** en allowlist separada: `gathered`, `aligned`, `matrix`, `pmatrix`, `bmatrix`,
  `vmatrix`, `Vmatrix`, `Bmatrix`, `cases`. Nombre obligatoriamente entre llaves, balanceado y emparejado.
- **25 comandos bloqueados** por delante del chequeo de desconocidos: `def`, `newcommand`, `input`,
  `write`, `href`, `url`, `htmlStyle`, `csname`, `catcode`…
- **Estructura**: llaves, paréntesis y corchetes balanceados; `\left`/`\right` emparejados; `\frac` con
  dos grupos y `\sqrt` con uno tras `[...]` opcional; `\textcolor` sólo con hex `#RGB`/`#RRGGBB`;
  ángulos prohibidos; tope 1024 caracteres y 12 líneas por grupo; `\[`/`\]` **rechazados** en `rule.math`.
- **Qué normaliza**: nulos fuera, CRLF→LF, runs de espacio a uno, trim. **Nada más se reescribe.**
- **Qué pasa sin tocar**: todo lo que aprueba, salvo el espaciado.
- **Fallo**: la vía del compilador degrada a `\text{Formula matematica no disponible}`; la del schema
  rechaza. El payload adversario nunca se emite.
- **Multilínea**: un `\\` de nivel superior se re-deriva a `\begin{aligned} & … \\ & … \end{aligned}`,
  idempotente. *(Nota: el comentario de `ruleMathAdapter.js` dice `gathered`; la función real es
  `buildAlignedRenderLatex` y emite `aligned`. El contrato documenta el código, no el comentario.)*

**Superficie B — texto opaco. Todos los demás campos math.** Sólo rechaza: tags HTML-like, `on*=`,
`javascript:`, `data:text/html` y —lo específico de math— configuración de runtime que empareje
`MathJax =`, `renderMathInElement(` o `katex.`. Algunos además rechazan Markdown y rich text. Topes por
kind: 160 `hierarchy`, 240 `table` y `arithmetic`, 320 `timeline`, 360 `split`.

**Cero validación de LaTeX en la superficie B.** `\newcommand` en un `timeline` pasa; el mismo string en
un `rule` se rechaza. Los dos llegan al mismo KaTeX.

**Dos inconsistencias más, medidas y documentadas:**

- **Propiedad del delimitador.** `table` los recibe del **compilador** (`buildTableMathContent` emite
  `\( … \)`); todos los demás, del **renderer**; `rule` prohíbe que los ponga el autor.
- **Stripping.** Sólo `table` y `split` llaman `stripInlineMathDelimiters`. En `arithmetic`, `timeline`
  y `hierarchy` un `\( … \)` escrito por el autor **sobrevive** y el renderer vuelve a envolver.

**Y el escape.** `buildRuleOutput` hace `escapeHtml(math.value.latex)`; `&` → `&amp;`. El `math`
compilado **no es LaTeX válido directamente**: lo es tras la decodificación de entidades del navegador,
que ocurre antes de que KaTeX lea el text content. Quien lea el valor compilado como texto ve la forma
escapada.

**Runtime de render, medido:** `katex@0.16.9` desde jsdelivr más el contrib de auto-render, con
`renderMathInElement(document.body)` en el `onload`, idéntico en `previewRenderer.js` (2026-06-19
21:24:10) y `buildSingleWebLesson.js` (2026-06-05 05:42:20). **Auto-render, nunca render explícito por
nodos.** Es dependencia de CDN: sin red, se ve el LaTeX crudo delimitado.

**Lo que el ticket daba por satisfecho, verificado:** `compiler.js` (2026-06-25 05:38:18) rechaza
configuración runtime de MathJax/KaTeX en línea 235 (`containsUnsafeMathRuntimeText`) y línea 563
(`assertSafeSplitText` con `math: true`), y el mismo predicado está duplicado en ambos `draftSchema.js`.
**Confirmado.**

### B.3 Smart Formula Field, Formula Inserter y qué significa `RULE_ONLY` hoy

`#1` («Establish the Smart Formula Field RULE_ONLY baseline») está `completed` y su línea base se
sostiene en código:

- **El campo visual se monta sólo para `kind === 'rule'`**, top-level y dentro de `columns`
  (`WebBlockEditor.jsx` líneas 1778 y 3856, `mtime` 2026-06-27 04:10:20). Todos los demás campos math son
  input o textarea monoespaciado; `timeline` incluso pone `\frac{x}{2} + 1 = 5` de placeholder al autor.
- **El límite está enforced, no es convención.** El test
  `webRuleMathAuthoringIntegration.test.mjs` (2026-06-24 19:53:20) cierra con
  `'Math Authoring shapes remain rejected outside rule in text components and table'`.
- **MathLive carga lazy** (`mathLiveLoader.js`, 2026-06-23 06:45:32) con fallback seguro, y **nunca llega
  a output**: ningún path de compilador, schema o renderer lo importa.
- **Existe modo LaTeX avanzado** (`normalizeAdvancedLatexInput`), sólo para `rule`.
- **El Formula Inserter: motor cableado, UI no montada.** `evaluateFormulaSlashAction` y
  `evaluateFormulaButtonAction` **sí** los consume `smartFormulaFieldState.js`. Pero
  `FormulaInserterShell` está definido y exportado y **no lo importa ninguna superficie del editor**: la
  única otra referencia en todo el árbol es un test que **asegura su ausencia** del campo de Rule
  (`webRuleSmartFormulaFieldRulePilot.test.mjs:259`). **No hay Formula Inserter global hoy.**

### B.4 Los documentos fuente que existen. Contados, no supuestos

El ticket ordena no fiarse de ninguna cifra suya. No hay cifra que contrastar aquí, así que reporto la
medición cruda. Criterio: `.md` cuyo **contenido** menciona `mathlive|katex|latex|smart formula|formula
inserter|math authoring|math-authoring`, excluyendo `node_modules` y `dist`.

| Corte | Cuenta |
|---|---|
| Todo el repo | **128** |
| Bajo `docs/` | **115** |
| — de esos, bajo `docs/archive/` | **106** |
| — de esos, `docs/` vivo (no archivo) | **9** |
| Cuyo **nombre de fichero** marca la materia (`MATH`/`FORMULA`/`KATEX`) | **21** |
| Fuera de `docs/`: `prompts/generated/` (derivados) | 8 |
| Fuera de `docs/`: prompts manuales | 3 |
| Fuera de `docs/`: `AGENTS.md` + `CLAUDE.md` | 2 |

Los 21 por nombre son el corpus real de la materia; los otros 107 la mencionan de pasada. El contrato
mina cuatro: el gate de dependencia, el spike de smart input, las specs de benchmark y refinamiento UX,
y el rebase audit.

### B.5 El agujero documental: real, pero mal descrito por el ticket

**Verificado:** `MATH_AUTHORING_CONTRACT_DESIGN.md` y `SHARED_SMART_FORMULA_FIELD_UX_DESIGN.md` **no
existen como ficheros** en ninguna parte — ni en `cantu-studio`, ni en todo `AIW_Workspace`
(`find -iname` sobre ambos árboles: cero resultados).

**Pero el ticket dice que los cita `MATHLIVE_PRODUCTION_DEPENDENCY_GATE.md`, y son cuatro documentos los
que los citan**, no uno:

| Documento que los cita | Dónde |
|---|---|
| `docs/archive/author-lite/math-authoring/MATHLIVE_PRODUCTION_DEPENDENCY_GATE.md` | §2, líneas 19-20 |
| `docs/archive/author-lite/math-authoring/SMART_FORMULA_FIELD_MATHLIVE_NATIVE_UX_REBASE_AUDIT.md` | líneas 28-29 |
| `docs/archive/_historical_run_record/project-console/RUN-CANTU-DOCS-LEGACY-INVENTORY-AND-COMPACT-001.md` | líneas 58-59, con tamaños en bytes |
| `docs/archive/_legacy/LEGACY-COMPACT.md` | tabla, filas 10 y 11 |

**Y lo importante: no se perdieron, se absorbieron a propósito.** `LEGACY-COMPACT.md` los marca
**`ABSORBED (design-only)` → `Part A10`**, y su §A10 conserva el contrato de datos (`RichTextV1`,
`MathNodeV1`, la allowlist del sanitizer, el adapter conservador de slash-fracción) y la UX del campo
compartido (`FormulaBlockField` vs `RichTextAuthorField`). El inventario de compactación registra sus
tamaños originales: 13 464 B y 5 923 B.

**Conclusión que va al contrato §13:** no hay pérdida documental, hay una **disposición**. Los dos
nombres son punteros muertos a nivel de fichero y vivos a nivel de contenido, y el superviviente citable
es `docs/archive/_legacy/LEGACY-COMPACT.md` §A10. Un run de componente que siga la cita del gate se
estrella; siguiendo el contrato, no.

---

## BLOQUE C — EL SOLAPAMIENTO CON `#48`, MEDIDO Y DECLARADO, SIN TOCARLO

Criterio 3. `RUN-JAME-MATHLIVE-INTEGRATION-READINESS-001` (`queue_order` 48, `O5.P2`) está `completed`.

**Su `closeout_result`, verbatim:**

> MathLive is an installed dependency, imported and DOM-mounted as a shipped math-field in the Rule
> Smart Formula Field; integration readiness is satisfied in code. Closed in place; queue_order unchanged.

**Su `full_description` pedía cuatro cosas más que ese cierre:**

| Lo que `#48` pedía | Estado medido | Quién lo cubre |
|---|---|---|
| «the supported MathLive integration contract» | **no existía como artefacto** | **este contrato, §2–§8** |
| «normalization requirements» | **no existía como artefacto** | **este contrato, §3–§4** |
| «accepted UI behavior» | **sigue sin artefacto** | **huérfano** |
| «a clear go/no-go boundary for Formula Inserter integration» | **sigue sin artefacto** | **huérfano** |

**Qué falta de `#48`, en una frase:** su cierre acreditó la *dependencia* y el *montaje*, que es lo
verificable en `package.json` y en el DOM, y dejó fuera los dos entregables de *decisión* — el
comportamiento de UI aceptado y el go/no-go del Inserter.

**Qué hace este contrato:** cubre las dos primeras filas y **mide** las dos últimas sin decidirlas. La
§12 del contrato dice que el shell del Inserter está sin montar y que la decisión de montarlo no es
suya: es del operador y, en la cola, de `RUN-JAME-FORMULA-INSERTER-INTEGRATION-001` (`#49`, `planned`).

**No se tocó el `status` de `#48`.** Sigue `completed`, con su `closeout_result` intacto. Cerrar el hueco
es decisión de cabina.

---

## BLOQUE D — EL ENTREGABLE, Y POR QUÉ VIVE DONDE VIVE

### D.1 La ruta se derivó del repo

`docs/docs_management/DOCUMENTATION-CANONICAL-MODEL.md` (`#2`, `mtime` 2026-07-22 19:01:55), tabla de
categorías, línea 32, verbatim:

> `| API contracts | REFERENCE | docs/reference/, verifiable against code |`

Un contrato de compatibilidad consumido por otros runs es un contrato verificable contra código, no
arquitectura ni pedagogía. El Blueprint §3 refuerza: REFERENCE responde «what is the exact contract?» y
prohíbe rationale, historia narrativa y pedagogía de uso — las tres ausentes del documento.

**Además, el gemelo ya aterrizó ahí por esa misma regla.** `REFERENCE-COLOR-PALETTE-COMPATIBILITY.md`
vive en `docs/reference/`. Los dos los consume la misma DoD (`#9`), así que ponerlos en directorios
distintos rompería el criterio de éxito.

**Ruta elegida:** `docs/reference/REFERENCE-MATH-FORMULA-COMPATIBILITY.md`. **No hay divergencia que
justificar.**

### D.2 El artefacto contra el Blueprint, medido

| Regla | Exigencia | Medido |
|---|---|---|
| ASCII puro | sin no-ASCII | **0 líneas** con byte > 127 (`grep -P '[^\x00-\x7F]'`) |
| Banner de status | blockquote `Key: value` tras el H1 | `Status: Draft \| Last verified: 2026-07-28 \| Scope: …` |
| Sin versiones manuales | prohibidas | 0 coincidencias de `vN.N.N` |
| Sin emoji | prohibidos | 0 |
| Naming UPPERCASE-KEBAB | obligatorio | `REFERENCE-MATH-FORMULA-COMPATIBILITY.md` |
| Rutas repo-relativas completas | obligatorio | §13, agrupadas por directorio raíz |
| **Tope de líneas** | ver abajo | **328 líneas** |

**Sobre el tope, declarado sin adorno.** El Blueprint tiene dos textos sobre esto:

- §4b: «Hard cap: **250 lines** per new doc. REFERENCE engine contracts only may extend to **800 lines**».
- §3, categoría REFERENCE: «Target: 3 docs; **this is the only category allowed the extended cap
  (Section 4b)**».

El §3 concede el tope extendido **a la categoría**, no sólo a los contratos de motor. El documento está
en `docs/reference/`, así que **328 líneas queda dentro del tope de 800 que le aplica**, y por encima
del general de 250 que no le aplica.

**Lo digo explícitamente porque el gemelo de color quedó en 243, bajo los dos.** No alcancé esa densidad:
hice dos pasadas de concisión reales (−16 líneas) y lo que queda son mediciones que los criterios de
aceptación exigen — la allowlist de 39 comandos y la de 25 bloqueados, la tabla de 17 componentes, las
diez preguntas del bloque de auditoría, las cinco clases, y **ocho** decisiones abiertas verbatim frente
a las seis del gemelo. Recortar más habría sido borrar medición, no palabras. **Si cabina prefiere 250
duro, el corte natural es sacar la §12 (`#48`) a su propio artefacto**; no lo hice porque el criterio 3
pide que el solapamiento se declare y el consumidor del contrato es quien necesita saber qué quedó
huérfano.

### D.3 Cómo espeja al gemelo de color

Los dos los lee la misma DoD, así que un run de componente no debe cambiar de forma de leer:

| Contrato de color | Contrato de math |
|---|---|
| §1 Contract scope | §1 Contract scope |
| §2 Palette model | §2 The two math input surfaces |
| §3 How the Editor stores color | §3 Surface A / §4 Surface B |
| §4 Compiler resolution + **tabla de qué kinds resuelven** | §5 **tabla de qué componentes llevan math** |
| §5 Web Engine fallback | §6 Compile and render expectations |
| §6–§7 sync y picker | §8 Smart Formula Field y Formula Inserter |
| §8 **patrón de regresión de paleta** | §9 **patrón de regresión de math** |
| §9 clasificación + bloque de auditoría obligatorio | §10 clasificación + bloque de auditoría obligatorio |
| §10 decisiones abiertas (6) | §11 decisiones abiertas (8) |
| §11 source files | §13 source files |
| §12 no-claims | §14 no-claims |

Dos secciones sin gemelo: **§7 security boundaries**, que el `full_description` pide nominalmente, y
**§12 el solapamiento con `#48`**, que pide el criterio 3.

---

## BLOQUE E — LAS OCHO DECISIONES ABIERTAS, NO DECIDIDAS

Criterio 5. **Dónde estaban.** No en el gate de dependencia, que lo que tiene son *condiciones
obligatorias* (§11, once) y *bloqueos* (§12), no decisiones. La sección estructuralmente análoga a la §20
del spec de color —lista en español, con la misma gramática «Si X o Y»— es la **§14 «Riesgos y Decisiones
Pendientes» → «Decisiones pendientes»** de
`docs/archive/author-lite/sandbox/PASS-FUTURE-WEB-MATH-AUTHORING-SMART-INPUT-SPIKE-001.md`
(`mtime` 2026-07-22 19:01:55). **Ocho, transcritas verbatim en la §11 del contrato.**

*(Fuente secundaria localizada y no usada como principal: §6 «Softened decisions / prototype
verification required» de `PASS-FUTURE-WEB-MATH-AUTHORING-UX-SPEC-REFINEMENT-AFTER-BENCHMARK-001.md`,
seis ítems. Son condicionamientos de un prototipo R2, no decisiones de contrato.)*

**Cada una se verificó contra código vivo.** Ese es el trabajo que el criterio pide y el resultado no es
uniforme:

| # | Decisión | Estado verificado en código |
|---|---|---|
| 1 | `richText` por campo o tipo global | **medio resuelta** — global, pero un solo campo lo acepta y en forma degenerada |
| 2 | fórmulas inline o `formulas` map | **resuelta: inline** — no existe ningún `formulas` map |
| 3 | `id` de fórmula estable | **abierta y hoy inerte** — `MathNodeV1` no lleva `id` |
| 4 | MathJSON persistido o bajo demanda | **abierta** — ni MathJSON ni Compute Engine en ningún path productivo |
| 5 | auto-render o render explícito | **RESUELTA EN CÓDIGO: auto-render**, en Preview Real y Generate Web |
| 6 | modo advanced LaTeX | **resuelta: shipped**, sólo `rule` |
| 7 | copy/paste de LaTeX externo | **abierta** — no existe política de pegado |
| 8 | fórmulas block en texto largo | **abierta y no construida** — ningún campo mezcla prosa y math |

**La 5 es la única que la medición cierra del todo**, y por eso el contrato la reporta como hecho en §6 y
la marca en §11 como «resuelta en código, no decidida aquí». **No la decidí yo.** Es también la que hace
posible el patrón de regresión de la §9: con auto-render, un valor sin delimitador es texto.

**Cada una de las ocho lleva recomendación técnica con su razón y la marca explícita de que decide el
operador**, en el encabezado de la §11:

> **Each recommendation below is technical advice derived from the measurement. The decision belongs to
> the operator. None is baked into the clauses above.**

**Ninguna se horneó por defecto.** Donde una cláusula necesitaba una decisión abierta para cerrarse, se
dejó abierta y se dice en el sitio: la §4 describe qué chequea la superficie B **y no dicta qué debería
chequear**, porque eso depende de las decisiones 1, 7 y 8; y la recomendación de la 8 dice literalmente
que abrirla «multiplies the surface Section 4 leaves unvalidated».

---

## BLOQUE F — EL ÍNDICE DE DOCS, EDICIÓN QUIRÚRGICA

Criterio 8. Único escritor del índice en esta ventana.

### F.1 Respaldo y roundtrip, antes de tocar

Respaldo **fuera del repo**, en el scratchpad de sesión, con md5 idéntico verificado:

```
07eb56ef10f56adf7aa9ca9835708d60  .aiw/docs/docs_index.json
07eb56ef10f56adf7aa9ca9835708d60  <scratchpad>/docs_index.json.bak
```

**Roundtrip byte-exacto verificado ANTES de escribir**, y como guarda dura dentro del script de edición
(aborta si falla). El fichero **no usa LF**: usa **CRLF**, cola `}\r\n`, indentación 2.

```
JSON.stringify(j, null, 2).replace(/\n/g, '\r\n') + '\r\n'   -> igual byte a byte a los 307 285 B
```

Probadas y descartadas: indent 2/4/tab con LF, indent 4 con CRLF, y las variantes sin newline final.

### F.2 El diff a nivel de entradas: **+1, y ninguna otra**

```
top-level keys idénticas:                       true
claves top-level distintas de "docs" cambiadas: ninguna
AÑADIDAS   (1): docs/reference/REFERENCE-MATH-FORMULA-COMPATIBILITY.md
ELIMINADAS (0): []
MODIFICADAS(0): []
orden de las 143 entradas preexistentes:        preservado
```

**Entradas: 143 → 144.** Verificado en disco al abrir, no dado por bueno: el ticket avisaba de que eran
143 y **lo eran**.

**Vocabulario: nada acuñado.** La entrada se clonó de la del contrato de color —mismo orden de claves— y
sólo se cambiaron los siete campos que identifican al documento. Todos los valores ya estaban en uso:
`nav_tier: primary`, `audience: programmer,auditor`, `canonicality: canonical_active`,
`archive_status: active_not_archived`, `ia_bucket: docs`, `related_area: reference`,
`retention_class: canonical`, `operator_review_status: pending`. El único valor nuevo es
`source_role: reference_math_formula_compatibility`, y ese campo **es único por documento** en las 143
entradas previas (58 distintos, uno por documento donde existe), así que no acuñarlo habría sido el error.

**Colocación:** índice 99, inmediatamente después de su hermano de color (índice 98), dentro del bloque
`docs/reference/`. No al final.

### F.3 Bytes no-ASCII: **3 → 3**

```
NON-ASCII BYTES BEFORE: 3
NON-ASCII BYTES AFTER:  3
```

La entrada nueva es ASCII puro. Los 3 bytes no-ASCII preexistentes siguen donde estaban; la
serialización no los tocó, que es exactamente lo que el roundtrip byte-exacto garantizaba.

**Bytes totales:** 307 285 → 309 217 (+1 932, el tamaño de la entrada).

---

## BLOQUE G — EL VALIDADOR, ANTES Y DESPUÉS

Criterio 9. Por la vía que **no** escribe: `node tools/project-console/validate-project-console-state.mjs`.

| | Antes | Después |
|---|---|---|
| Exit code | **0** | **0** |
| Veredicto | `Project Console state validation passed.` | idéntico |
| Objectives / phases / runs | **7 / 28 / 72** | **7 / 28 / 72** |
| Queue groups | `needs_human_decision=0 now=1 ready_next=8 later=58 history=5` | idéntico |
| Docs indexed | 143 | **144** |
| Docs curated primary-visible | 55 de 143 | **56 de 144** |
| Component statuses | 16 | 16 |
| Git provenance episodes | 9 | 9 |
| Git history snapshot | 918 commits / 2 branches | idéntico |
| Avisos | **1**, no bloqueante | **1**, el mismo |

**El único aviso, antes y después, es el de la arista externa:**
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` depende de `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`,
que no resuelve en este roadmap. **No se decidió** — no es materia de este encargo.

**Ningún aviso nuevo.** Los dos únicos deltas son los dos esperados: docs indexed y primary-visible, +1
cada uno.

---

## BLOQUE H — SUPERFICIES DISJUNTAS

Criterio 14. El hilo paralelo está vivo sobre `aiw-console`. **md5 antes y después, idénticos:**

| Fichero | md5 antes | md5 después |
|---|---|---|
| `aiw-console/context/DECISIONES.md` | `3f6bdf88…` | `3f6bdf88…` |
| `aiw-console/context/aiw-console/CONTRATO.md` | `f77ccec6…` | `f77ccec6…` |
| `aiw-console/roadmap/roadmap.json` | `f299d968…` | `f299d968…` |
| `aiw-console/.aiw/roadmap/roadmap.json` | `08b9d813…` | `08b9d813…` |
| `cantu-studio/.aiw/roadmap/roadmap.json` | `1a7097cf…` | `1a7097cf…` |
| `cantu-studio/docs/reference/REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` | `9d2affcd…` | `9d2affcd…` |
| `cantu-studio/AGENTS.md` | `c5afc8f9…` | `c5afc8f9…` |
| `cantu-studio/CLAUDE.md` | `3fedd18b…` | `3fedd18b…` |

**No se tocó ningún test, handoff ni record existente.** Los 45 records previos siguen con su `mtime`
original; el barrido sobre `aiw-console` devolvió cero ficheros modificados antes de escribir éste.

### H.1 `.project/` no se re-emitió

Criterio 12. Los seis ficheros, md5 idénticos antes y después:

```
a4477ec4…  .project/docs_index.json      77a4230b…  .project/git_history.json
e6013d9f…  .project/guardrails.json      5b52b708…  .project/no_claims.json
6341cf80…  .project/roadmap.json         82483fdb…  .project/snapshot.json
```

**Consecuencia declarada:** `.project/docs_index.json` queda desfasado en una entrada respecto al
canónico `.aiw/docs/docs_index.json` hasta que el operador re-emita desde la consola global, que es el
punto de serialización.

---

## BLOQUE I — HALLAZGOS NOMBRADOS, NINGUNO TOCADO

Criterio 6 y fuera-de-alcance.

- **`detailsVariant` de Timeline: cruzado, nombrado, remitido, no reparado.** Mi medición **sí** lo toca:
  vive en el mismo objeto `step` que `math`, dentro del mismo `assertAllowedFields`, y su enum es
  `['def','ctx','wrn','success']`. El contrato lo nombra en su §14 y **remite al contrato de color** §5 y
  decisión abierta 4, que es de quien es. **No lo reparé y no lo re-decidí.**
- **`hierarchy` no renderiza sus fórmulas.** Nombrado en §9 como patrón medido. **No reparado**: es del
  run de revalidación de Hierarchy (`#40`).
- **El motor inyecta `\def`, que el sanitizer bloquea.** `renderTimeline.js:8` define
  `\def\hl#1{#1}` y lo mete en cada bloque math de timeline; `def` está en la lista de 25 bloqueados de
  la superficie A. El sanitizer gobierna la entrada del autor, no la salida del motor. Nombrado en §7 como
  medición. **No reparado.**
- **`conceptGrid` en la categoría `math` sin campo math.** Nombrado en §5. **No reparado.**
- **Comandos de teclado.** Mi medición de la allowlist acota lo que un teclado puede emitir hacia `rule`,
  pero validar el teclado contra ella es `RUN-JAME-VIRTUAL-KEYBOARD-KATEX-COMPATIBILITY-001` (`#10`,
  `planned`). **Nombrado y remitido** en §1 y §12 del contrato. No se decidió nada suyo.
- **`npm audit` con un high en Vite**, registrado por el gate de dependencia. Fuera de alcance por
  completo; ni se ejecutó ni se tocó.

---

## BLOQUE J — STATUS EN QUE DEBE QUEDAR EL RUN

Criterio 11. **No se tocó `status`, `progress` ni `closeout_result` de ningún run.** Los cinco `history`
de apertura son los cinco de cierre.

`RUN-JAME-MATH-FORMULA-COMPATIBILITY-CONTRACT-001` está en **`active`**. **Declaro que debe quedar en
`active`** hasta que el operador lo revise y lo cierre desde la consola global. El trabajo que su
`full_description` describe está entregado; lo que falta es la revisión humana del contenido, que el
índice registra como `operator_review_status: pending` y el banner del documento como `Status: Draft`.

**Nada más debe moverse.** `#9` sigue `planned` y depende de tres runs, de los que este es uno; no se
vuelve elegible sólo por esto. `#48` sigue `completed`, con el hueco medido y sin cerrar. `#49` y `#10`
siguen `planned`.

---

## BLOQUE K — NO-CLAIMS DE ESTE ENCARGO

- **No decidió ninguna de las ocho decisiones abiertas.** Las transcribió verbatim, midió su estado real
  contra código, recomendó, y marcó que decide el operador. La 5 se reporta **resuelta en código**, que es
  un hallazgo, no una decisión tomada aquí.
- **No implementó nada.** No se tocaron compilador, editor, renderers, schemas, tests, MathLive ni el
  Formula Inserter. El código se leyó; ni un byte se escribió en `src/` ni en `tools/`.
- **No corrió ninguna suite.** Los tests se leyeron como fuente, no se ejecutaron — el alcance pedía
  lectura, y `CLAUDE.md` §7 avisa de fallos fantasma con talleres simultáneos. El único ejecutable que
  corrió es el validador de estado de Cantu, de sólo lectura, dos veces.
- **No certifica nada.** Ni componente, ni motor, ni el Smart Formula Field, ni el propio contrato.
  **La certificación no es un concepto retirado**: `docs/governance/GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md`
  §2 la define como claim que hay que ganar («certification as a claim that must be earned, never
  inferred») y su §3 se titula «Certification gates» y enumera seis puertas en orden. Esa misma §2 nombra
  **MathLive y el Smart Formula Field** entre los subsistemas no certificados, y el contrato la cita por
  eso, sin reinterpretarla. Donde el gate archivado se declara
  `MATHLIVE_PRODUCTION_DEPENDENCY_APPROVED_WITH_CONDITIONS`, se citó **como lo que dice**: una aprobación
  de dependencia acotada, no una certificación.
- **No cerró el hueco de `#48`.** Se midió y se declaró; cerrarlo es decisión de cabina.
- **No reparó el alias `success` de `detailsVariant`.** Es materia del contrato de color y de la
  revalidación de Timeline.
- **No escribió la Definition of Done de revalidación (`#9`)** ni tocó `#10`.
- **No re-emitió `.project/`.** Queda desfasado por una entrada hasta que el operador re-emita.
- **No editó el canónico**, ni el Blueprint, ni el modelo canónico de `#2`, ni el contrato de packet de
  `#3`, ni el contrato de color de `#7`, ni `AGENTS.md`, ni `CLAUDE.md`, ni ningún documento de
  `docs/archive/`. **No movió ni desarchivó nada**: los documentos fuente se leyeron donde están.
- **No aplicó `barrier` ni decidió la arista externa.**
- **No usó git en ninguna forma** — ni un comando, ni lectura. No levantó servidores.
- **No escribió en `DECISIONES.md`**, ni en `CONTRATO.md`, ni en el roadmap de `aiw-console`, ni en
  ningún test, handoff o record existente. md5 idénticos, declarados en §H.

---

## Conteo de records

**45 al abrir, 46 al cerrar.** Contados en disco, no de memoria: `ls -1 | wc -l` sobre
`aiw-console/context/aiw-console/records/`. Sin colisión de nombre: no existía ningún
`CONTRATO-MATH-*`; el hermano de color es `CONTRATO-COLOR-Y-PALETA-CANTU.md`.

---

## Lo que este record NO hace

No cierra el run. No cambia ningún `status`. No re-emite `.project/`. No decide ninguna de las ocho
decisiones abiertas, ni el go/no-go del Formula Inserter, ni la arista externa, ni si `#48` se reabre.
No certifica nada. No autoriza ninguna reparación de las cinco nombradas en el §I. Todo eso es de cabina.
