# CONTRATO DE COMPATIBILIDAD DE COLOR Y PALETA — RUN `#7` EN CANTU

> Ejecución de `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001` (`queue_order` 7, `O5.P5`).
> **Tres archivos escritos**: el contrato en `docs/reference/`, su entrada en el índice de docs,
> y este record. **Ninguno más** — barrido de `mtime` sobre 21 323 ficheros de `cantu-studio`,
> `node_modules` incluido, devuelve **exactamente dos**.
>
> **Las seis decisiones abiertas del spec no se decidieron.** Están transcritas verbatim en la
> §10 del contrato, cada una con su recomendación técnica y la marca explícita de que la decisión
> es del operador. Dos cláusulas quedaron **abiertas a propósito** porque cerrarlas exigía decidir
> una de las seis; se dice en el propio contrato.
>
> Fecha: 2026-07-28. **Git no se usó en ninguna forma** — ni un comando, ni lectura. No se levantó
> ningún servidor. No se corrió ninguna suite. **No se re-emitió `.project/`.** **No se cambió
> `status`, `progress` ni `closeout_result` de ningún run.** No se implementó nada.
>
> **Dos cifras del ticket no sobrevivieron a la medición, y las dos hacia arriba.** Los documentos
> fuente no son «cinco o más»: son **19 por nombre de archivo** y **27 más por contenido**. Y el
> run **ya no está `planned`**: el operador lo puso en `active` a las 17:40:14, durante esta ventana.

## Archivos escritos por este encargo, y ninguno más

| Repo | Archivo | Qué |
|---|---|---|
| `cantu-studio` | `docs/reference/REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` | **el entregable** — 242 líneas, ASCII puro |
| `cantu-studio` | `.aiw/docs/docs_index.json` | **una** entrada nueva, edición quirúrgica |
| `aiw-console` | `context/aiw-console/records/CONTRATO-COLOR-Y-PALETA-CANTU.md` | este record |

**Barrido de `mtime`** sobre el árbol entero de `cantu-studio`, **`node_modules` incluido** y
`.git/` excluido, contra un marcador posterior a la última escritura ajena (la re-emisión de
`.project/` del operador, 17:40:14):

```
./.aiw/docs/docs_index.json
./docs/reference/REFERENCE-COLOR-PALETTE-COMPATIBILITY.md
```

**Exactamente dos.** El barrido recorrió **21 323 ficheros**, de los cuales **20 255 viven en los
nueve árboles `node_modules`**: ninguno posterior al marcador.

---

## BLOQUE A — EL RUN, LEÍDO VERBATIM DEL CANÓNICO

### A.1 Los tres campos de texto, tal cual

Leídos de `.aiw/roadmap/roadmap.json` **antes de escribir nada**, y releídos al final: byte-idénticos
las dos veces.

**`title`:**

> Define the color and palette compatibility contract

**`summary`:**

> Define the cross-cutting color and palette compatibility contract that Web component revalidation
> runs consume; apply it inside component runs, not here.

**`full_description`:**

> Define the cross-cutting color and palette compatibility contract consumed by Web component
> revalidation runs: how the Editor stores variant, how the compiler resolves it against the active
> Web palette, how current-palette sync and the custom picker must behave, and how the known
> palette-regression pattern found after component approval is detected. The application of this
> contract to specific components — for example the Header and List palette-regression route, or the
> Callout and Details color controls — happens inside those components' own revalidation runs, not
> here. This is a foundation contract, not workspace UX and not a component repair.

`run_id` `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001`, `queue_order` 7, objetivo `O5`, fase
`O5.P5` («Color and Palette Compatibility Contract»), `depends_on` **vacío**. Carril: el roadmap
declara dos (`DEVELOPMENT` por defecto, `DOCUMENTATION`); este run **no lleva clave `lane`**, así que
cae en el default `DEVELOPMENT`, como dice el ticket.

### A.2 El run cambió de `status` durante esta ventana, y no fui yo

Al abrir, el run estaba **`planned`**. Al releer minutos después estaba **`active`**, y el canónico
llevaba `mtime` **2026-07-28 17:40:14** con md5 `1b007cb42257d455ff5249659f9eb575` (96 846 bytes) —
distinto del `2f0e7ffc…`/96 847 con que cerró el encargo anterior. Es el operador abriendo el run
desde la consola global, junto con la re-emisión de `.project/` a la misma hora (los seis artefactos
llevan `mtime` 17:40:14).

**Los tres campos de texto son byte-idénticos antes y después**; lo único que se movió es `status`.
El md5 del canónico al cerrar es el mismo `1b007cb4…`: **este encargo no lo tocó**.

### A.3 Lo que el run pide y el ticket no nombra

El ticket cubre el `full_description` casi entero, con dos matices que el run añade y que se
entregaron igual:

- **«how the Editor stores variant»** — el ticket habla de «cómo el Editor almacena la variante» vía
  `ColorRef v2`. El run pide el almacenamiento **real**, no el propuesto. La §3 del contrato
  documenta lo que hay en `Draft JSON` hoy (`variant`, `colorToken`, `color`, `items[].color`,
  `detailsVariant`), no el `colorRef` que no existe.
- **«Callout and Details color controls»** — el run los nombra como aplicación de otros runs. Se
  midieron igual, porque sin medirlos no se puede decir si el contrato les aplica. Resultado en §B.3:
  **ninguno de los dos resuelve contra la paleta activa**. Se nombra como medición, no como reparación.

**Ninguna contradicción entre ticket y run que reportar.** Donde el ticket es más específico que el
run (los punteros a documentos, la §20), el run no lo contradice.

---

## BLOQUE B — MEDICIÓN, ANTES DE ESCRIBIR

### B.1 Los tres documentos citados existen, y dicen lo que el ticket dice

Verificados en disco. Los tres comparten `mtime` **2026-07-22 19:01:55**, que es la fecha del
archivado masivo, no la de su escritura.

| Documento | `mtime` | Bytes | Líneas | ¿Coincide con el puntero? |
|---|---|---|---|---|
| `docs/archive/author-lite/sandbox/PASS-4D-PHASE2-AUTHOR-LITE-COLOR-SYSTEM-V2-WEB-SLIDE-SPEC.md` | 2026-07-22 19:01:55 | 20 904 | 733 | **sí** |
| `docs/archive/author-lite/sandbox/PASS-4D-PHASE2-WEB-COLOR-PALETTE-RECONCILIATION-LEGACY-CERTIFIED-COMPONENTS-001.md` | 2026-07-22 19:01:55 | 8 830 | 177 | **sí** |
| `docs/archive/author-lite/component-qa/WEB_COLOR_PALETTE_CROSS_CUTTING_QA_CONTRACT.md` | 2026-07-22 19:01:55 | 5 591 | 144 | **sí** |
| `tools/author-lite/compiler-api/tests/webLegacyCertifiedColorPaletteReconciliation.test.mjs` | 2026-06-21 20:20:10 | 7 001 | 237 | **sí**, test vivo |

Contenido, contrastado puntero por puntero:

- **El spec**: §5 es «Modelo de persistencia propuesto» (`metadata/color-palettes/index.json` + una
  paleta por target). §11 es `ColorRef v2`, §12 `ColorRecipeRef v2` — **campos propuestos como
  sibling**, no como reemplazo. §13 «Resolucion Web» da el orden de resolución en cinco pasos para
  campos simples y seis para recetas, y la regla dura «Web nunca debe resolver contra la paleta Slide
  activa». **§20 «Decisiones abiertas» tiene seis viñetas: son seis, ni una más.** El puntero del
  ticket es exacto en los tres tramos.
- **La reconciliación**: §§1-14 confirmadas. Su veredicto es `PASS_WITH_BOUNDED_RECONCILIATION`, y sus
  catorce respuestas técnicas son el patrón de regresión documentado. Cita el test vivo en su §13.
- **El contrato de QA**: §C es la sección obligatoria de **diez** preguntas, §D la taxonomía de
  **cinco** clases. Exacto.

### B.2 No son «cinco o más». Son 19 por nombre, y 27 más por contenido

La medición del 2026-07-27 dejó la lista abierta. Cerrada:

**19 documentos con `color` o `palette` en el nombre**, todos bajo `docs/archive/`, todos con `mtime`
2026-07-22 19:01:55. De ellos **18 son de la familia Color System** y 1 es adyacente
(`PASS-4D-I2B2-WEB-SANDBOX-HIERARCHY-COLOR-LABEL-PARITY-FOLLOWUP.md`, sobre paridad de etiquetas de
`hierarchy`, no sobre paleta). Los 18:

| Familia | Documentos |
|---|---|
| Los 3 citados por el ticket | el spec, la reconciliación, el contrato de QA |
| Fundación y decisión | `…COLOR-SYSTEM-DECISION-AUDIT.md` (585 líneas), `…COLOR-SYSTEM-FOUNDATION-001.md`, `…COLOR-SYSTEM-PALETTE-EDITOR-FIX-001.md` |
| Perfiles v2 y sus fixes de QA humano | `…V2-PALETTE-PROFILES-001.md`, `…PROFILES-HUMAN-QA-FIX-001.md`, `…PROFILES-HUMAN-QA-FIX-003.md` |
| Fixes de vista previa y pulido | `…PREVIEW-HUMAN-QA-FIX-004.md`, `…-FIX-005.md`, `…PREVIEW-STYLE-TUNING-FIX-006.md`, `…PREVIEW-FINAL-TUNING-FIX-007.md`, `…MICRO-QA-FIX-008.md`, `…WIDTH-POLISH-FIX-009.md` |
| Guardas de borrado | `…V2-PALETTE-DELETE-DEFAULT-GUARDS-001.md` |
| Rechecks de `iconList` | `…ICONLIST-COLOR-SYSTEM-RECHECK.md`, `…ICONLIST-COLOR-SYSTEM-V2-RECHECK.md` |

**Hueco declarado:** existen `PROFILES-HUMAN-QA-FIX-001` y `-003`; **no existe `-002`** en disco. No
se buscó por qué: no está en alcance.

**27 documentos más llevan materia de paleta sin llamarse así** (barrido de contenido por
`active web palette` / `paleta web activa` / `colorPalette` / `colorToken` / `COLOR_PALETTE_`). Los
más cargados: `docs/archive/rewrite-dossiers/EDITOR-CODE-AUDIT-DOSSIER.md` (39 apariciones),
`docs/archive/ops/JAME_OPS_STATE.md` (28), el packet de QA humano de `card` (27),
`AUTHOR_COMPONENT_GUIDE.md` (14), `COMPONENT_CERTIFICATION_MATRIX.md` (12). También tocan la materia
`docs/components/web/CARD.md` y `docs/reference/REFERENCE-DRAFT-JSON.md`, **ya en la era Blueprint**.

**46 documentos en total tocan el asunto.** Eso es exactamente el problema que el run nombra, y la
razón de que el entregable sea uno solo.

### B.3 El código vivo, que es quien manda

Medido en `src/builders/web/`, el compilador y el editor. **Cinco hallazgos, y los cinco entraron al
contrato porque un contrato que los contradiga nace muerto.**

**1. Solo tres kinds resuelven contra la paleta activa.** `compileWebBlock` emite `color` resuelto
para `header` y `list` (vía `resolveVariantAccentColor`) y para `card` (vía `resolveCardColor`).
**`callout` emite solo `variant`.** También `timeline.detailsVariant`. `iconList` conserva el hex
autorado sin tocarlo. `columns` no emite color propio pero propaga `context.colorPalette` a sus hijos.

**2. Solo el rol `accent` sale del Editor.** El token vivo tiene cuatro roles —`accent`, `surface`,
`border`, `text`— y los cuatro se normalizan, validan y persisten. Pero `resolveAuthorColorToken(...)
.accent` es lo único que el compilador emite, y **ningún renderer Web lee `surface`, `border` ni
`text` desde la paleta**. Tres de los cuatro roles no llegan a la salida.

**3. `colorRef` y `colorRecipeRef` no existen en código vivo.** Barrido sobre `.js`, `.mjs`, `.jsx` y
`.json` de todo el repo, excluyendo `docs/`, `node_modules/`, `dist/` y `.git/`: **cero apariciones**.
Las §§11-12 del spec siguen siendo propuesta.

**4. Los renderers reconciliados prefieren el hex compilado.** `renderHeader.js` y `renderList.js`
usan `normalizeHexColor(data.color)` y caen al mapa fijo si no es válido. **Todos los demás**
resuelven `variant` contra `Commons.VARIANTS`/`Commons.PALETTE`, que están **hardcoded** en
`src/builders/web/partials/commons.js`.

**5. La deriva de alias, medible.** `Commons.VARIANTS` define `success`, `warning` y `error` como
alias explícitos (comentados `// Alias`) de `res`, `wrn` y `err`; **no define `info`**. La paleta del
Editor define nueve tokens —`def`, `ctx`, `ex`, `focus`, `str`, `res`, `wrn`, `err`, `meta`— y
**ninguno de los cuatro alias**. Y `draftSchema.js:482` deja `detailsVariant` en
`z.enum(['def','ctx','wrn','success'])`. Es decir: **`success` es seleccionable por el autor y no es
un token de paleta**; si alguien lo resolviera contra la paleta caería en el fallback `ctx`. Esto es
la decisión abierta 4 con un síntoma medible, no una opinión.

### B.4 Qué asegura el test vivo

`webLegacyCertifiedColorPaletteReconciliation.test.mjs`, seis tests, leído entero:

| Test | Qué fija |
|---|---|
| `header` | compila `color` distinto bajo paletas A y B, y el HTML lleva `border-left: 4px solid <hex>` |
| `list` | igual, con `border-bottom: 2px solid <hex>` |
| fallback legacy | sin paleta, `header` da `#5E81AC` y `list` `#B48EAD` |
| `columns` | el padre **no** tiene `color` ni `variant`; los hijos sí resuelven |
| `iconList` / `card` | el hex de `iconList` es **idéntico** bajo A y B; el `colorToken` de `card` **sí** cambia |
| save/load | el draft recargado conserva `variant` y **no** gana clave `color`; Generate Web sí la emite |

Ese quinto test es la prueba de que **un hex custom no sigue a la paleta**, que es una cláusula del
contrato (§7) y no una suposición.

**El test no se corrió.** El ticket prohíbe correr suites; se leyó como fuente.

### B.5 «Current-palette sync» y «custom picker»

Ninguno de los dos términos aparece literalmente en los fixes; la materia sí, repartida.

**Custom picker — consistente entre los cuatro documentos que lo tocan.**
`PALETTE-EDITOR-FIX-001` §4 fija el diseño: solo tokens de la paleta efectiva más `Personalizado`,
sin `Default del renderer`; si el valor es hex válido que no casa, muestra `Personalizado`; si está
vacío o legacy, resuelve internamente a `ctx` sin exponer opción técnica; el custom usa
`input type="color"` y guarda `#RRGGBB`. `PALETTE-PROFILES-001` §14, `PROFILES-HUMAN-QA-FIX-001` y
`-003` §10 lo repiten sin contradecirse, y `-003` añade que el control colapsado edita el color
principal y el hex preciso vive en el detalle desplegado. `MICRO-QA-FIX-008` retiró un swatch
redundante. **Cuatro documentos, cero contradicciones.** Entró íntegro a la §7 del contrato.

**Current-palette sync — consistente en el servidor, con deriva medida en el editor.**
Del lado servidor, `readActiveWebColorPaletteTokens()` alimenta Preview Real, Compile Web y Generate
Web por el mismo `compileDraftToJameData`; la reconciliación lo declara en su §11 y el código lo
confirma. **Los tres coinciden por construcción.**

Del lado editor hay una deriva real, medida en
`tools/author-lite/editor-ui/src/features/editor/hooks/useAuthorColorPalette.js`. El hook calcula
`activePalette` respetando `activeTarget`, pero la línea siguiente calcula el valor que consumen los
controles de bloque **fijado a la paleta Web**, sin mirar el target. `EditorPage` pasa ese valor como
`colorPalette` a los editores. Consecuencia: **el control de color de un componente muestra tokens Web
aunque el editor de paleta esté editando el target Slide.**

Eso **no se arregló** —implementar está fuera de alcance— y **no se dio por bueno**: la §6 del
contrato lo declara como deriva medida y deja la cláusula Slide **abierta**, porque cerrarla exige la
decisión abierta 2.

**Un tercer punto, medido y sin resolver:** `server.js` mantiene **a la vez** el lector/escritor del
archivo singular legacy (`version: 1`) y el store por target v2. Los dos caminos están vivos. Es la
decisión abierta 3, también con síntoma medible.

---

## BLOQUE C — EL ENTREGABLE, Y POR QUÉ VIVE DONDE VIVE

### C.1 La ruta se derivó del repo, no se eligió por gusto

```
docs/reference/REFERENCE-COLOR-PALETTE-COMPATIBILITY.md
```

La cadena de autoridad, en orden:

- **`DOCUMENTATION-CANONICAL-MODEL.md` §2** es explícito en su tabla de propiedad:
  «API contracts | REFERENCE | `docs/reference/`, verifiable against code». Este entregable es un
  contrato técnico verificable contra código; la fila le aplica directamente.
- **`DOCUMENTATION-BLUEPRINT.md` §3** carga a REFERENCE con la pregunta «what is the exact contract?»
  y exige que «statements here must be verifiable against code». Prohíbe ahí rationale, historia
  narrativa y pedagogía de uso — las tres se dejaron fuera.
- **Las alternativas se descartaron con la misma §3.** COMPONENTS es «one packet per component», y
  esto es transversal a diecisiete. ARCHITECTURE prohíbe «per-component prop contracts». DECISIONS es
  para ADRs, y este run **no decide**. OPERATIONS es estado operativo.
- **`docs/docs_management/` queda excluido por el ticket y por el Blueprint**, que le prohíbe
  «content about the product itself». Este contrato es producto.
- **El nombre** sigue la convención vigente en disco: `REFERENCE-WEB-ENGINE-API.md`,
  `REFERENCE-SLIDES-ENGINE-API.md`, `REFERENCE-DRAFT-JSON.md`. UPPERCASE-KEBAB, como fija la
  respuesta **OQ-A DECIDED** de la §9 del Blueprint. No se añadió sufijo `-CONTRACT`: el prefijo
  `REFERENCE-` ya lo significa y ninguno de los tres hermanos lo lleva.

**Desvío declarado:** la plantilla §5.2 del Blueprint es para contratos de motor
(Envelope / Catalog / Per-type). Se siguió su espíritu —alcance, modelo, contrato por superficie,
fallback, archivos fuente— y se adaptaron los encabezados, porque este contrato es transversal y no
tiene «envelope». Se añadieron dos secciones que la plantilla no prevé: **§10 Open decisions** (la
exige el criterio 4) y **§12 No-claims** (el género de este repo la exige en todo packet).

### C.2 El artefacto contra el Blueprint, medido

| Regla | Exigido | Medido |
|---|---|---|
| Banner de status (§4a) | tras el H1, `Key: value` con pipes | **presente**, `Status: Draft \| Last verified: 2026-07-28 \| Scope: …` |
| Tope de líneas (§4b) | 250 duro; 800 solo REFERENCE | **242** — cabe incluso bajo el tope general |
| Inglés ASCII puro (§4f) | sin acentos, sin no-ASCII | **0 caracteres no-ASCII** en 15 580 bytes |
| Sin números de versión manuales (§4a) | prohibidos | **ninguno propio**; se citan `Draft JSON v0.2` y `ColorRef v2` como nombres de artefactos ajenos, igual que hace `REFERENCE-DRAFT-JSON.md` |
| Sin emoji (§4a) | prohibidos | **ninguno** |
| Rutas repo-relativas completas (§4c) | nunca nombre suelto | **todas completas**, incluida la §11 de archivos fuente |
| Naming UPPERCASE-KEBAB (OQ-A) | decidido | **cumple** |
| EOL | — | **CRLF**, como los tres hermanos de `docs/reference/` |

**Español dentro del contrato:** las seis decisiones abiertas van **verbatim en español**, delimitadas
como cita en bloque. Lo permite la respuesta **OQ-D DECIDED** del Blueprint («Spanish is allowed only
inside clearly delimited examples, fixtures, and lesson citations»), y el criterio 4 exige la
transcripción literal. Las seis ya venían sin acentos en el spec, así que el ASCII puro se conserva.
Cada cita lleva su traducción funcional en el encabezado en inglés que la precede.

---

## BLOQUE D — LAS SEIS DECISIONES ABIERTAS

Es el criterio que más importa, y el que gobernó la redacción.

### D.1 Son seis, y son estas

La §20 del spec tiene **seis viñetas**. **El número real es seis**: coincide con lo que el ticket
dice. Transcritas verbatim en la §10 del contrato. Aquí, con lo que la medición encontró de cada una:

| # | Decisión (resumen) | ¿Resuelta después? | Evidencia |
|---|---|---|---|
| 1 | `colorRef`/`colorRecipeRef` en schemas o solo en helpers | **No** | 0 apariciones en código vivo |
| 2 | Cómo el editor presenta paletas Web/Slide | **A medias** | el editor de paleta usa indicación derivada (`PROFILES-HUMAN-QA-FIX-001` §5); los controles de bloque siguen fijados a Web (hook) |
| 3 | El archivo singular legacy: fallback perpetuo o migración única | **No** | los dos caminos vivos a la vez en `server.js` |
| 4 | `success`/`warning`/`error`/`info`: alias o tokens author-facing | **No**, y con síntoma | alias en Core, ausentes en la paleta, `success` en el enum de `detailsVariant` |
| 5 | Si un token nuevo debe existir en ambos targets de una familia | **No** | nada en código lo exige |
| 6 | Roles manuales por token: desde el primer ticket o tras QA | **A medias** | el editor expone los cuatro roles con override y derivación (`PROFILES-HUMAN-QA-FIX-003` §6); ningún consumidor lee más que `accent` |

Las dos «a medias» se declaran como tales en el contrato, con **en qué capa** se resolvieron y en cuál
no. Ninguna se cerró.

### D.2 Cada una lleva recomendación, y la marca de que decide el operador

La §10 del contrato abre con la frase, en negrita: *«Each recommendation below is technical advice
derived from the measurement. The decision belongs to the operator. None is baked into the clauses
above.»* Y cada bloque cierra diciendo **qué sección del contrato quedó como quedó por no decidirla**.

Las seis recomendaciones, en una línea: **(1)** helpers antes que schemas, porque el compilador ya
resuelve sin los campos; **(2)** derivar del flow activo en todas partes, y que el binding de bloque
lo siga; **(3)** el singular como semilla de solo lectura, dejar de escribirlo; **(4)** promover los
alias a tokens reales **o** sacar `success` del enum, porque la mezcla actual manda un valor
seleccionable al fallback; **(5)** no exigir paridad entre targets, porque divergen por diseño;
**(6)** dar por entregada la capacidad de autoría y decidir aparte si los otros tres roles llegan
alguna vez a la salida.

### D.3 Las cláusulas que quedaron abiertas, y se dice en el contrato

**No se hornearon por defecto.** Dos cláusulas se dejaron incompletas a propósito:

- **§6, el caso Slide de current-palette sync.** El contrato fija la regla para Web («el control debe
  ofrecer los tokens de la paleta que de verdad resolverá su valor») y dice literalmente que el caso
  Slide queda `OPEN` porque enunciarlo exige la decisión 2.
- **§5 y §10.4, los alias de feedback.** El contrato **describe el efecto** —un alias cae al fallback
  `ctx`— y **no dicta** qué hacer. La regla que faltaría es exactamente la decisión 4.

Además, tres secciones declaran explícitamente que no resuelven su decisión: la §2 registra los dos
caminos de persistencia sin coronar ninguno (decisión 3), describe familias sin regla de paridad
(decisión 5), y enuncia el corte entre capa de autoría y capa de consumo para los roles sin cerrarlo
(decisión 6). La §3 contrata los campos que existen y ningún campo de referencia (decisión 1).

**Un contrato con seis huecos declarados es utilizable. Los seis están declarados.**

---

## BLOQUE E — EL ÍNDICE DE DOCS, EDICIÓN QUIRÚRGICA

### E.1 Respaldo y roundtrip, antes de tocar

| Qué | Valor |
|---|---|
| Respaldo | `<scratchpad>/backup/docs_index.BEFORE.json` — **fuera del repo** |
| md5 de apertura | `674fe67b3f816218dcef0db9e228db82` |
| Bytes | 305 385 |
| `mtime` al leerlo | 2026-07-28 02:49:20 |
| Roundtrip byte-exacto | **sí**: `JSON.stringify(j,null,2)` con CRLF y CRLF final `=== raw` |
| EOL | CRLF puro (2 985 pares, 0 LF sueltos) |

El md5 se re-verificó **como guarda que aborta** justo antes de escribir, y coincidía.

**Ensayo completo sobre copia primero.** La secuencia entera —guardas, splice, serialización,
escritura y verificación posterior— corrió contra `<scratchpad>/rehearsal.json`. Solo con todo en
verde se corrió contra el canónico, y después:

```
cmp <canónico> <copia ensayada>   ->  SIN DIFERENCIAS
```

Durante el ensayo el canónico conservó su md5 de apertura, comprobado por la propia guarda.

### E.2 El diff a nivel de entradas: **+1, y ninguna otra**

| Invariante | Antes | Después |
|---|---|---|
| Entradas en `docs` | **142** | **143** |
| Entradas preexistentes byte-idénticas | — | **142 de 142**, lista de cambiadas `[]` |
| Escalares de raíz | 12 claves | **idénticos**, comparados uno a uno |
| Orden de claves de raíz | — | **preservado** |
| `default_visible: true` | 54 | **55** |
| Bytes | 305 385 | **307 285** (+1 900) |
| md5 | `674fe67b…` | **`07eb56ef10f56adf7aa9ca9835708d60`** |
| EOL | CRLF, 2 985 pares | CRLF, **3 007** pares, **0 LF sueltos** |

La entrada nueva se insertó en el **índice 98**, inmediatamente después de
`docs/reference/REFERENCE-DRAFT-JSON.md`, para que las cuatro entradas de `docs/reference/` queden
contiguas. Su **orden de claves se copió del hermano** `REFERENCE-WEB-ENGINE-API.md` y se verificó con
una guarda que aborta si difiere.

**Vocabulario: no se acuñó ningún término.** Todos los valores controlados ya estaban en uso:
`nav_tier: primary`, `default_visible: true`, `freshness: produced_2026-07-28` (ya usado),
`freshness_status: DRAFT_PENDING_OPERATOR_CONTENT_QA_2026_07_28` (ya usado dos veces),
`canonicality: canonical_active`, `archive_status: active_not_archived`, `ia_bucket: docs`,
`related_area: reference`, `retention_class: canonical`, `operator_review_status: pending`,
`audience: programmer,auditor`. El único valor nuevo es `source_role`, que es **identidad por
documento** (57 distintos sobre 142) y sigue el patrón de sus hermanos:
`reference_color_palette_compatibility`.

Se **arrastró la nota de deriva** que los hermanos ya llevan: `ia_bucket: docs` es lo más cercano
porque `docs_index v0.3` no tiene bucket `reference`, y no se inventó ninguno.

**Los escalares de raíz no se tocaron**, incluidos `last_reconciled_by_run` y `status`. Actualizarlos
habría sido reescribir estado que este run no posee; la edición es aditiva y de una sola entrada.

### E.3 Bytes no-ASCII: **3 → 3**

Barrido del archivo entero, antes y después: **3 bytes no-ASCII / 1 carácter**, sin cambio. Es una raya
`—` (U+2014, 3 bytes en UTF-8) dentro de la nota de una entrada preexistente sobre precondiciones D2.
**Ninguna se tocó.** La entrada nueva se validó **campo por campo** con una guarda que aborta si
cualquier cadena lleva un carácter fuera de ASCII: pasó limpia.

---

## BLOQUE F — EL VALIDADOR, ANTES Y DESPUÉS

Criterio 7. `node tools/project-console/validate-project-console-state.mjs` desde la raíz de
`cantu-studio`, **por la vía que no escribe**.

| | Antes | Después |
|---|---|---|
| Veredicto | `Project Console state validation passed.` | **igual** |
| Objetivos / fases / runs | **7 / 28 / 72** | **7 / 28 / 72** |
| Grupos de cola | `needs_human_decision=0 now=1 ready_next=9 later=58 history=4` | **igual** |
| Run activo derivado | `RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001=none` | **igual** |
| Docs indexados | 142 | **143** |
| Docs curados primary-visible | 54 de 142 | **55 de 143** |
| Component statuses | 16 | 16 |
| Episodios de procedencia Git | 9 | 9 |
| Snapshot de historia Git | 918 commits / 2 ramas | igual |
| **EXIT** | **0** | **0** |

**Las tres cifras que el criterio 7 fija —7 / 28 / 72— no se movieron.**

**Avisos no bloqueantes: uno, el de siempre**, palabra por palabra igual antes y después: la arista
externa de `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` hacia
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`. **Ningún aviso nuevo.**

Las dos filas que sí se mueven —docs indexados y curados— son **el efecto buscado** del criterio 6, no
una deriva: son la entrada que este run registró. El resto de la salida es idéntica.

**Nota sobre los grupos de cola**, por si alguien compara con el record anterior: aquel cerró con
`now=0 ready_next=10`; hoy abre con `now=1 ready_next=9`. El movimiento es del operador al poner este
run en `active` (§A.2), **anterior a la primera medición de este encargo**, y por eso sale igual antes
y después. El criterio 7 no fija esas cifras.

---

## BLOQUE G — SUPERFICIES DISJUNTAS

Criterio 12. md5 al abrir y al cerrar.

| Superficie | md5 antes | md5 después | ¿Igual? |
|---|---|---|---|
| `aiw-console/roadmap/roadmap.json` | `f299d968fdf781bf31863d696bd9610e` | `f299d968fdf781bf31863d696bd9610e` | **Sí** |
| `aiw-console/context/DECISIONES.md` | `3f6bdf8816a0b43818519eb3582f6511` | `3f6bdf8816a0b43818519eb3582f6511` | **Sí** |
| `aiw-console/context/aiw-console/CONTRATO.md` | `f77ccec64d99f2048d4bde41638cb228` | `f77ccec64d99f2048d4bde41638cb228` | **Sí** |
| `cantu-studio/.aiw/roadmap/roadmap.json` | `1b007cb42257d455ff5249659f9eb575` | `1b007cb42257d455ff5249659f9eb575` | **Sí** |

Los tres primeros son **los mismos con que cerró el encargo anterior**: el hilo paralelo no escribió
en ninguna de las tres.

**Huella conjunta de `tests/` + `handoffs/` + `records/`:** `3eb20ac8542fcad58266910b3b9dea6d` sobre
**125 archivos** al abrir; `ec1a89a7afd2d8e755c33620f1af5034` sobre **126** al cerrar. **La diferencia
no es mía y se demuestra:** el hilo paralelo añadió un record nuevo,
`PORTABILIDAD-EVIDENCIA-AIW.md` (`mtime` 17:48:33), **dentro** de mi ventana. Recalculando la huella
**excluyendo solo ese archivo**, sobre los mismos 125 de la apertura:

```
3eb20ac8542fcad58266910b3b9dea6d   <- idéntica a la de apertura
```

**Ni un test, ni un handoff, ni un record existente cambió.** Lo único que pasó es una adición ajena.

### G.1 `.project/` no se re-emitió

Criterio 10. **Dos pruebas.** Los seis artefactos llevan `mtime` **2026-07-28 17:40:14**, de la
re-emisión del operador al abrir el run — **anterior** a mis dos escrituras (17:48:04 y 17:50:00) —, y
el barrido de `mtime` contra un marcador posterior a ese instante devuelve **solo mis dos archivos**.

**Consecuencia práctica:** `.project/docs_index.json` refleja el índice de **142** entradas. La consola
seguirá mostrando 142 hasta que el operador re-emita. **Es lo esperado, no un fallo.**

---

## BLOQUE H — HALLAZGOS NOMBRADOS, NINGUNO TOCADO

1. **`callout` y `timeline.detailsVariant` cargan hoy el patrón de regresión de paleta.** Ninguno de
   los dos emite `color` resuelto; su salida ignora la paleta activa. El contrato los nombra en su §8
   como medición. **Repararlos es de sus propios runs de componente**, como dice el `full_description`.
2. **Tres de los cuatro roles del token no llegan a la salida.** `surface`, `border` y `text` se
   autoran, validan y persisten, y ningún consumidor los lee. Es la decisión abierta 6 vista desde el
   otro extremo del pipe.
3. **`success` es seleccionable en `detailsVariant` y no es un token de paleta.** Es el síntoma más
   concreto de la decisión abierta 4, y el único con un enum que lo expone al autor.
4. **El hook de paleta fija los controles de bloque a Web sin mirar el target activo.** Deriva medida,
   no tocada; la cláusula Slide del contrato quedó abierta por ella.
5. **Los dos caminos de persistencia de paleta están vivos a la vez.** Decisión abierta 3, con código
   en ambos lados.
6. **Falta `PROFILES-HUMAN-QA-FIX-002`** entre el `-001` y el `-003` del archivo. No se investigó.
7. **Este contrato no necesitó nada del de math (`#8`).** Se redactó entero sin una sola cláusula
   pendiente de él. El único punto de roce posible —`rule` y `arithmetic` usan color— cae del lado del
   contrato de color y quedó cubierto por la clasificación de la §9. **No se escribió nada de math.**

---

## BLOQUE I — STATUS EN QUE DEBE QUEDAR EL RUN

Criterio 9. **No se tocó `status`, `progress` ni `closeout_result` de ningún run.**

`RUN-JAME-COLOR-PALETTE-COMPATIBILITY-CONTRACT-001` está hoy en **`active`**, puesto ahí por el
operador a las 17:40:14. **Declaro que debe quedar en `active`** hasta que el operador lo revise y lo
cierre desde la consola global, que es el único punto de serialización. El trabajo que su
`full_description` describe está entregado; lo que falta es la revisión humana del contenido, que el
propio índice registra como `operator_review_status: pending` y el banner del documento como
`Status: Draft`.

**Nada más debe moverse:** `#9` sigue `planned` y sigue dependiendo de este run y del de math, así que
no se vuelve elegible por esto solo.

---

## BLOQUE J — NO-CLAIMS DE ESTE ENCARGO

- **No decidió ninguna de las seis decisiones abiertas.** Las transcribió, midió su estado real,
  recomendó, y marcó explícitamente que la decisión es del operador. Dos cláusulas del contrato quedan
  abiertas por ello, y lo dicen.
- **No implementó nada.** No se tocaron renderers, compilador, editor, schemas, tests ni paletas. El
  código se leyó; ni un byte se escribió en `src/` ni en `tools/`.
- **No corrió ninguna suite.** El test vivo se leyó como fuente. El único ejecutable que corrió es el
  validador de estado de Cantu, de solo lectura, dos veces.
- **No certifica nada.** Ni componente, ni motor, ni paleta, ni el propio contrato. **La certificación
  no es un concepto retirado**: `docs/governance/GOVERNANCE-AUTHORITY-AND-NO-CLAIMS.md` §2 la define
  como claim que hay que ganar («certification as a claim that must be earned, never inferred») y su
  §3 se titula «Certification gates» y enumera seis puertas en orden. El contrato cita esa §2 en su
  propia sección de no-claims. Y donde el documento fuente habla de **«legacy certified components»**,
  se citó **como lo que dice**, sin reinterpretarlo: es el nombre del packet de reconciliación y así
  aparece en la §8 del contrato.
- **No cerró el run, ni cambió ningún `status`.** Los cuatro `completed` de apertura son los cuatro de
  cierre. `history=4` sin moverse.
- **No re-emitió `.project/`.** Queda desfasado por una entrada de índice hasta que el operador
  re-emita.
- **No editó el canónico**, ni el Blueprint, ni el modelo canónico de `#2`, ni el contrato de packet de
  `#3`, ni `AGENTS.md`, ni `CLAUDE.md`, ni ningún documento de `docs/archive/`. **No movió ni
  desarchivó nada**: los 19 documentos fuente se leyeron donde están.
- **No escribió el contrato de math (`#8`) ni la Definition of Done de revalidación (`#9`).**
- **No usó git en ninguna forma** — ni un comando, ni lectura. No levantó servidores.
- **No escribió en `DECISIONES.md`**, ni en `CONTRATO.md`, ni en el roadmap de `aiw-console`, ni en
  ningún test, handoff o record existente. md5 idénticos, declarados en §G.

## Conteo de records

**44 al abrir, 45 al cerrar.** Contados en disco, no de memoria: `ls -1 *.md | wc -l` sobre
`context/aiw-console/records/`. *(Trazabilidad: el encargo anterior cerró con 43; el hilo paralelo
añadió `PORTABILIDAD-EVIDENCIA-AIW.md` → 44; este añade el suyo → 45.)*

**Sin colisión de nombre.** No hay ningún record cuyo nombre contenga `COLOR`, `PALETA` ni `PALETTE`.
El más próximo por palabra suelta es `CONTRATO-FUENTE-UNICA-DOC-COMPONENTES-CANTU.md`, que comparte
solo el prefijo `CONTRATO-` y no colisiona.

## Lo que este record NO hace

- **No afirma que el contrato esté aprobado.** Está `Draft`, con `operator_review_status: pending`.
  Registrarlo en el índice no es aprobarlo, y el propio contrato lo dice en su §12.
- **No afirma que las seis decisiones deban decidirse ya.** El spec cierra su §20 diciendo que ninguna
  bloquea la implementación incremental; este record no lo contradice ni lo confirma.
- **No mide el contrato de math ni la Definition of Done.** No existen: `#8` y `#9` siguen `planned`.
- **No propone reparar `callout` ni `timeline`.** Los nombra como medición; repararlos es de sus runs.
- **No re-mide los records anteriores.** Las cifras de apertura que coinciden con el cierre del encargo
  anterior se re-comprobaron en disco; no se recalculó nada más de aquel encargo.
