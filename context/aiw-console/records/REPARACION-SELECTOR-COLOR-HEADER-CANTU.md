# Reparación del selector de color de Header

**Proyecto:** cantu-studio
**Run:** `RUN-JAME-WEB-HEADER-REVALIDATION-001` — `queue_order` 15, carril DEVELOPMENT
**Fecha:** 2026-07-30
**Tipo:** Fase de REPARACIÓN (tiempo 3 de 4). Medición → QA del operador → **reparación** → re-QA.
**Estado declarado del run:** `active` — no lo cierra este encargo.

---

## 1. Guarda de identidad, antes de nada

Derivada del canónico por `queue_order`, no por nombre. Ruta recorrida en el JSON:
`objectives[2].phases[2].runs[0]` — O «Cantu Studio Web Components» / fase «Web Components - Basics».

| Campo | Valor leído verbatim del canónico |
|---|---|
| `run_id` | `RUN-JAME-WEB-HEADER-REVALIDATION-001` |
| `title` | `Audit and implement the Header component` |
| `status` | `active` |

Carril: el run no lleva clave `lane`; `lanes[]` declara `DEVELOPMENT` con `default: true`,
luego es DEVELOPMENT. `queue_order` 16 = `RUN-CANTU-WEB-HEADER-DOC-001`, DOCUMENTATION,
`planned` — el dueño del packet.

**La guarda pasa.** El título coincide exacto con el del encargo. Se sigue.

### Deriva del canónico desde el record anterior, declarada

El record de medición cerró con `.aiw/roadmap/roadmap.json` en md5 `ce17883fcf0132acc8f35e1ce2b68dbd`.
Al abrir este encargo vale `1dfcf17eccb7ec79b0864f040a5714b9`, con mtime **2026-07-30 18:22:20**.
**No fui yo:** mi primera escritura es posterior. La causa está en el propio contenido —
`queue_order` 14 (`RUN-CANTU-WEB-COLUMNS-DOC-001`) pasó de `active` a **`completed`**, y la
consola re-emitió `.project/` en el mismo instante atómico (§14). El run 15 sigue `active` y su
texto no cambió.

---

## 2. TABLA DE ALCANCE — los 17 componentes Web y su selector de color

**Ésta es la medición que decide la forma del arreglo**, y se hizo antes de tocar nada.
Rutas relativas a `tools/author-lite/editor-ui/src/features/editor/components/`.
Las líneas son las **actuales**, después del arreglo.

| # | Componente | ¿Selector de color? | Pieza que lo pinta | ¿Compartida? | ¿Recibe la paleta activa? | Ruta y línea |
|---|---|---|---|---|---|---|
| 1 | `header` | **Sí**, top-level y en slot | `HeaderColorSelect` + rama de slot | **No — exclusiva de `header`** | **Sí, tras este encargo** | `web/WebBlockEditor.jsx:116`, `:1731`, `:3780` |
| 2 | `card` | Sí | `CardColorField` | No — exclusiva de `card` | **Sí** (ya lo hacía) | `web/WebBlockEditor.jsx:862`, usos `:1137`, `:1159`, `:1186` |
| 3 | `iconList` | Sí, por ítem | `IconListColorField` | No — exclusiva de `iconList` | **Sí** (ya lo hacía) | `common/IconListFields.jsx:26`, usos `:1811`, `:3879` |
| 4 | `list` | Sí | **`VariantSelect`** top-level / lista inline en slot | **SÍ — compartida** | **No** | `common/VariantSelect.jsx:3`; usos `:3835` y `:1755` |
| 5 | `callout` | Sí | **`VariantSelect`** / lista inline en slot | **SÍ — compartida** | **No** | `common/VariantSelect.jsx:3`; usos `:3810` y `:1786` |
| 6 | `rule` | Sí | **`VariantSelect`** / lista inline en slot | **SÍ — compartida** | **No** | `common/VariantSelect.jsx:3`; usos `:3896` y `:1820` |
| 7 | `table` | Sí (bloque) | **`VariantSelect`** / lista inline en slot | **SÍ — compartida** | **No** | `common/VariantSelect.jsx:3`; usos `:3008` y `:1907` |
| 8 | `table` (badge de fila) | Sí | `TABLE_BADGE_VARIANT_OPTIONS`, constante local | No | **No** | `web/WebBlockEditor.jsx:325`, uso `:2939` |
| 9 | `details` | Sí, por ítem | **`VariantSelect`** | **SÍ — compartida** | **No** | `common/VariantSelect.jsx:3`; uso `:2373` |
| 10 | `conceptGrid` | Sí, por ítem | **`VariantSelect`** | **SÍ — compartida** | **No** | `common/VariantSelect.jsx:3`; uso `:2519` |
| 11 | `split` | Sí | `SPLIT_VARIANT_OPTIONS`, constante local de 3 valores | No | **No** | `web/WebBlockEditor.jsx:345`, uso `:1643` |
| 12 | `timeline` | Sí, por paso (detalle) | `TIMELINE_DETAIL_VARIANT_OPTIONS`, constante local | No | **No** | `web/WebBlockEditor.jsx:58`, uso `:3666` |
| 13 | `hierarchy` | Sí, por nodo | Input de texto «Color hex», sin lista | No | **No** — hex a mano, sin paleta | `web/WebBlockEditor.jsx:3395`, `:3466` |
| 14 | `visual` | Sí (fondo) | `<input type="color">` crudo | No | **No** — hex libre | `common/VisualFields.jsx:33` |
| 15 | `narrative` | **No** | — (solo «Modo») | — | n/a | `web/WebBlockEditor.jsx:3822` |
| 16 | `video` | **No** | — | — | n/a | `common/VideoFields.jsx` |
| 17 | `arithmetic` | **No** | — | — | n/a | `web/WebBlockEditor.jsx:3230` |
| 18 | `columns` | **No** — sin superficie propia | — | — | n/a | contrato de color §3, verificado |

Son 17 componentes y 18 filas: `table` aparece dos veces porque expone **dos** superficies de
color independientes.

### 2.1 La pregunta que decide, respondida: NO paré, y por qué

El criterio 2 manda parar **si el selector resulta compartido**, con su razón escrita:
«si hay una pieza común, arreglarla una vez los arregla a todos y el alcance de este run
cambia por completo».

**El selector de `header` NO es compartido.** `HeaderColorSelect` tiene **exactamente un sitio
de llamada** en todo el repo (`WebBlockEditor.jsx:3780`) y la rama de slot es un bloque de
`<option>` propio dentro de `if (block.kind === 'header')`. Arreglarlo no arregla a nadie más,
y el alcance de este run **no cambia**. La condición de parada no se cumple, y el encargo sigue.

**Pero sí existe una pieza compartida, y es un hallazgo de alcance del operador.**
`common/VariantSelect.jsx` es un selector de color compartido, pinta la constante estática
`VARIANT_OPTIONS`, y **no recibe la paleta**. Lo consumen **cinco** componentes Web —`list`,
`callout`, `rule`, `table`, `details`, `conceptGrid`: seis usos en `WebBlockEditor.jsx`— y
además `slide/SlideCardEditor.jsx:26`, fuera del alcance Web.

**No lo toqué.** Arreglar `VariantSelect` repararía de golpe seis componentes que este encargo
tiene prohibido reparar (criterio 7). Es exactamente la decisión de alcance que el criterio 2
reserva al operador: **existe la palanca, y no es mía**. Va a la tabla de enrutamiento §7.

### 2.2 Correcciones que la medición hace al enunciado del encargo

Dos, ambas a favor de un alcance más pequeño, no mayor:

1. El encargo dice que «los selectores de `card` e `iconList` sí la reciben». **Cierto**, y son
   los **únicos dos** de los diecisiete. La medición del encargo anterior no afirmaba lo
   contrario, pero conviene fijarlo: el desfase no es de Header contra el resto, es de
   `card`+`iconList` contra los otros quince.
2. `header` no era el único con lista estática: eran **catorce** los que tienen superficie de
   color y **doce** los que no reciben paleta. Doce siguen igual al cerrar este encargo.

---

## 3. El patrón copiado, no inventado — criterio 3

Se leyeron primero `CardColorField` (`WebBlockEditor.jsx:862`) e `IconListColorField`
(`common/IconListFields.jsx:26`), y se aplicó su misma forma. Las cuatro preguntas del criterio:

| Pregunta del criterio | `card` / `iconList` | Header, tras el arreglo |
|---|---|---|
| Cómo llega el prop | `palette={colorPalette}` desde el editor padre | **Idéntico**: `palette={colorPalette}` en `:3784`; en slot, `getHeaderColorOptions(colorPalette)` con el `colorPalette` que `ColumnChildFields` ya recibía |
| Cómo se deriva la lista | `getAuthorColorOptions(palette)` de `constants/colorSystem.js` | **La misma llamada**, acotada a los ids del enum del schema (§4.1) |
| Cómo se muestra cada token | `<option value={option.value}>{option.label}</option>` | **Idéntico**, misma forma |
| Qué pasa si la paleta no está | `getAuthorColorOptions` tiene default de parámetro y `normalizeAuthorColorPalette` devuelve los tokens por defecto ante `null`/`[]` | **Igual**, y además guarda explícita: si el filtrado dejara la lista vacía, cae a `VARIANT_OPTIONS`. Probado con `null`, `undefined` y `[]` |

### 3.1 Dos diferencias con el patrón, declaradas con su razón

`card` e `iconList` ofrecen además una opción `Personalizado` con selector de color libre.
**Header no la lleva, a propósito:**

- `card` guarda en `colorToken` (string libre) o `color` (hex); `iconList` guarda hex.
- **`header` guarda `variant`, y no tiene ningún campo hex.** Añadir `Personalizado` exigiría un
  campo nuevo en `WebHeaderSchema` y en el compiler, es decir **cambiar lo que Header produce**,
  que el criterio 6 prohíbe expresamente.

Lo mismo con la muestra de color dentro del desplegable: ni `card` ni `iconList` la pintan
—un `<option>` nativo no la renderiza de forma fiable—, así que copiar el patrón es no ponerla.

**Ambas quedan nombradas para la cabina**, no reparadas. El bloque de re-QA §2 se lo dice al
operador con todas las letras, porque su check 2 anterior las nombró.

---

## 4. Criterio 4 — la cláusula del contrato de color §6, verificada en disco

Leída de `docs/reference/REFERENCE-COLOR-PALETTE-COMPATIBILITY.md:110-111`, **verbatim**:

> «A component's color control must offer the tokens of the palette that will
> actually resolve its value at compile time.»

**Quién resuelve el valor de Header al compilar:** `resolveVariantAccentColor`
(`compiler-api/services/compiler.js:174-179`) llama `resolveAuthorColorToken(variantId, { palette: options.colorPalette })`
y emite su `accent`. El `colorPalette` es la paleta Web activa, normalizada en `:1242`. Es la
misma paleta que ahora alimenta el selector.

**Verificado, no supuesto.** Con una paleta de prueba que renombra los nueve tokens y mueve los
nueve acentos, se compararon los nueve tokens ofrecidos contra los nueve colores que el compiler
emite: **nueve de nueve coinciden**. Es la aserción central del test nuevo.

### 4.1 Un límite del contrato que la medición encontró, y cómo se resolvió

`getAuthorColorOptions` puede devolver **más de nueve** tokens: `normalizeAuthorColorPalette`
(`colorSystem.js:494-498`) añade al final cualquier token de la paleta cuyo id no esté entre los
por defecto. Pero `header.variant` es `VariantEnum`, un **enum cerrado de nueve**
(`draftSchema.js:22`, idéntico en los dos schemas).

Ofrecer un token extra de la paleta habría creado un defecto nuevo: una opción elegible que el
schema rechaza al guardar. Por eso el arreglo **acota la lista a los ids que el schema acepta**.

**No es una desviación del contrato: es su cumplimiento literal.** Un décimo token de la paleta
*no puede* resolver el valor de Header al compilar, porque el draft se rechaza antes. Medido:
un token `brandx` en la paleta **no se ofrece**, y un draft con `variant: 'brandx'` **es
rechazado** por `WebDraftSchema`. Las dos mitades están en el test.

`card` no tiene este límite —`colorToken` es un string con regex, no un enum—, y ésa es la única
razón por la que su selector puede ofrecer la paleta entera. Se declara porque explica por qué
copiar el patrón *al pie de la letra* habría estado mal aquí.

---

## 5. Criterio 5 — los drafts guardados siguen siendo válidos, sin migrar nada

**Ningún draft se tocó.** El valor almacenado sigue siendo un token id.

Cargados los **tres** drafts reales del repo que contienen `header`, contra el `WebDraftSchema`
y el compiler de verdad:

| Draft | ¿Valida? | Valor almacenado | ¿Clave `color`? |
|---|---|---|---|
| `src/content/author_lite/drafts/matematicas/algebra/test5.json` | **OK** | `level: 2`, **sin `variant`** | **No** |
| `src/content/author_lite/drafts/qa/author_lite/qa_list_certification.json` | **OK** | sin `level` ni `variant` | **No** |
| `src/content/author_lite/drafts/web/test_web/test_web/test_web.web.draft.json` | **OK** | sin bloques `header` | — |

**Se declara:** cargar un draft existente con Header funciona, el valor guardado es un token id
(o su ausencia, que resuelve al default), no se escribe ningún hex en el draft, y **no hay
migración de ninguna clase**. La regla del contrato §3 —«save and load preserve the reference»—
se sostiene sin cambios.

---

## 6. Criterio 6 — lo que Header PRODUCE no cambió

El arreglo vive **solo** en la superficie de autoría. No se tocó schema, compiler ni renderer.

Medido antes y después del cambio sobre el mismo draft real, con dos paletas:

| Draft `test5.json`, nodo compilado | Antes del arreglo | Después del arreglo |
|---|---|---|
| Paleta por defecto | `{type:'header', level:2, variant:'ctx', color:'#5E81AC', title:'Nueva sección'}` | **Idéntico** |
| Paleta de prueba | `{... color:'#654321' ...}` | **Idéntico** |

**No hubo que parar.** El valor compilado de un draft existente no cambia, ni bajo la paleta por
defecto ni bajo otra. El test nuevo fija además los nueve colores por defecto y el caso
«sin `variant`» → `ctx` / `#5E81AC`, para que un cambio futuro que sí los mueva falle en rojo.

---

## 7. Criterio 7 — los otros componentes: nombrados y enrutados, NO reparados

**No se reparó ningún otro componente**, aunque doce comparten el defecto. Cláusula
«observación ≠ autorización» de la Definition of Done, aplicada doce veces.

| Componente | Ruta | Línea | Estado medido |
|---|---|---|---|
| `list` | `common/VariantSelect.jsx` + `web/WebBlockEditor.jsx` | `:3`, usos `:3835` / `:1755` | Lista estática vía **pieza compartida** |
| `callout` | ídem | `:3`, usos `:3810` / `:1786` | Lista estática vía **pieza compartida** |
| `rule` | ídem | `:3`, usos `:3896` / `:1820` | Lista estática vía **pieza compartida** |
| `table` (bloque) | ídem | `:3`, usos `:3008` / `:1907` | Lista estática vía **pieza compartida** |
| `details` | ídem | `:3`, uso `:2373` | Lista estática vía **pieza compartida** |
| `conceptGrid` | ídem | `:3`, uso `:2519` | Lista estática vía **pieza compartida** |
| `table` (badge) | `web/WebBlockEditor.jsx` | `:325`, uso `:2939` | Constante local propia, sin paleta |
| `split` | `web/WebBlockEditor.jsx` | `:345`, uso `:1643` | Constante local de 3 valores, sin paleta |
| `timeline` | `web/WebBlockEditor.jsx` | `:58`, uso `:3666` | Constante local propia, sin paleta |
| `hierarchy` | `web/WebBlockEditor.jsx` | `:3395`, `:3466` | Hex a mano, sin lista ni paleta |
| `visual` | `common/VisualFields.jsx` | `:33` | `<input type="color">` crudo, sin paleta |
| `slide` card items | `slide/SlideCardEditor.jsx` | `:26` | Misma pieza compartida, superficie Slides |

**Recomendación de enrutamiento para la cabina, no ejecutada:** los seis primeros se reparan de
una sola vez pasando la paleta a `VariantSelect`. Es un cambio de una pieza que cierra seis
componentes; **decidir si eso ocurre en un run propio o repartido en los seis runs de
revalidación es del operador**, no de este taller. Los seis restantes son cada uno suyo.

---

## 8. Criterio 8 — el mojibake: nombrado, intacto

**No se tocó.** Los mensajes de error de los dos schemas siguen con los bytes corruptos
(`draftSchema.js:547` en editor-ui y `:560` en compiler-api, entre otros), y
`checkComponentGuideTextIntegrity.cjs` sigue vigilando solo `ComponentGuide.jsx` y
`blockCatalog.js`. Es un defecto real y sin dueño; **no es lo que la QA del operador dictaminó**,
y repararlo tocaría los dos schemas enteros. Se nombra y se deja.

## 9. Criterio 9 — «Full width» y «Col span»: intactos

**No se tocaron.** El encargo anterior midió que Header no los tiene en ninguna de sus dos
colocaciones y que su único cliente es `rule`. Su retirada pertenece al run de revalidación de
Rule, `queue_order` 33. Verificado de nuevo al pasar: el editor de Header ofrece cuatro
controles y ninguno más.

## 10. Criterio 10 — S9 y S10 NO ejecutados

**`docs/components/web/HEADER.md` no se tocó**: md5 `90bb753cf028618ebf381cd9383f929b` antes y
después. **`.aiw/docs/docs_index.json` no se tocó**: md5 `bc708a5847f66291ea1cd719eb6a0ecb`
antes y después, mtime 18:13:52, anterior a esta sesión.

**Material dejado preparado para el run 16**, que este encargo no escribe:

- La línea del packet que describa el desplegable de color debe decir que **ofrece los tokens de
  la paleta Web activa**, con sus nombres, y que **no ofrece opción `Personalizado`** — a
  diferencia de `card` e `iconList`.
- Debe documentar el límite: `variant` acepta **exactamente nueve** ids; un token extra que el
  operador añada a la paleta **no aparece** en el selector de Header, por diseño y por el enum
  del schema.
- Debe decir que el valor guardado sigue siendo el token id y que cambiar la paleta mueve el
  color de los headers ya escritos, sin editar el draft.
- Sigue pendiente todo lo que el record anterior dejó en su §14: los dos bloques de auditoría,
  los tres punteros rotos y los hechos que el packet no tiene.

---

## 11. Criterio 11 — cobertura aditiva

**Archivo nuevo**, ningún test existente reescrito:
`tools/author-lite/compiler-api/tests/webHeaderColorPaletteAuthoringSurface.test.mjs` — **6 casos**.

| Caso | Qué asegura |
|---|---|
| Wiring en las dos colocaciones | `HeaderColorSelect` recibe `palette`, se le pasa `colorPalette`, y la rama de slot deriva de la paleta y ya **no** pinta `VARIANT_OPTIONS` |
| Ofrece los tokens de la paleta | Con paleta de prueba, las etiquetas son las de la paleta y **no** las de la constante estática; los ids y su orden se conservan |
| **Contrato §6 de punta a punta** | Los nueve tokens ofrecidos resuelven **exactamente** al `color` que el compiler emite bajo esa misma paleta |
| Token no almacenable | Un token extra de la paleta **no se ofrece**, y el schema lo **rechaza** si se cuela |
| Paleta ausente | `null`, `undefined` y `[]` caen a las opciones por defecto documentadas |
| Sin migración ni cambio de salida | El valor guardado sigue siendo token id sin clave `color`; los nueve colores por defecto y el caso sin `variant` quedan fijados |

**Ninguna aserción existente se tocó**, luego no hay antes/después que declarar. Se usó el patrón
ya establecido en el repo (`webRuleSmartFormulaFieldRulePilot.test.mjs`, `authorLiteColorSystem.test.mjs`):
importar módulos `.js` de editor-ui y leer el `.jsx` como texto para las aserciones estructurales.

**Corrección honesta:** la primera redacción del test fijaba `focus: #EBCB8B` y `str: #D8DEE9`.
Eran de memoria y estaban mal; los valores reales son `#C2B280` y `#D6CFC2`, leídos de
`colorSystem.js`. Falló en rojo, se leyó el disco y se corrigió. **El código no cambió por ello.**

---

## 12. Criterio 12 — la suite y el lint

| Métrica | Antes | Después |
|---|---|---|
| Suite `compiler-api` | **296/296**, EXIT 0 | **302/302**, EXIT 0 |
| De los cuales, nuevos | — | **+6**, todos del archivo nuevo |
| Fallos | 0 | **0** |
| `eslint` (editor-ui) | **EXIT 0** | **EXIT 0** |

Comandos: `node --test "tools/author-lite/compiler-api/tests/*.test.mjs"` y
`npm --prefix tools/author-lite/editor-ui run lint`.
**Los 296 previos pasan los dos veces.** **No se corrió ninguna suite de `aiw-console`.**

---

## 13. Criterio 13 — re-QA PREPARADA y DETENIDA

`docs/_historical_run_record/RUN-JAME-WEB-HEADER-REVALIDATION-001-OPERATOR-RE-QA-PACKET.md`,
**archivo nuevo junto al packet anterior**, formato §6 de la DoD, **cuatro comprobaciones**.

**Por qué archivo aparte y no sección añadida** —el encargo pide elegir y justificar—: el packet
anterior es el artefacto que el operador **ya ejecutó**, y sus casillas llenas son la evidencia
que produjo el veredicto CHANGES REQUIRED. Añadirle secciones renumeraría un runbook ejecutado y
volvería falsa su propia cláusula de cierre —«Every Verdict cell is empty by design»—. Se deja
**byte-idéntico** (md5 `1adf2a37eae904326ec2bcb15cf5eabd`, sin cambio) y se le cita.

Las cuatro, todas autocontenidas y ninguna pidiendo comparar contra un «antes» no registrado:

| # | Verifica |
|---|---|
| 1 | **Que el defecto quedó arreglado.** Renombrar un token en el editor de paletas y ver ese nombre en el desplegable de Header, en la misma sesión |
| 2 | **Que el editor y la salida concuerdan.** El hex del acento compilado es el que el editor de paletas muestra ahora para el token elegido |
| 3 | **Que nada de alrededor se rompió (colocación).** Las tres colocaciones ofrecen la misma lista |
| 4 | **Que nada de alrededor se rompió (drafts).** Un draft guardado abre, muestra su opción, sus otros tres controles siguen igual, y compila al color documentado |

Inglés ASCII puro verificado con barrido de bytes: **cero** bytes fuera de rango.
**Ninguna casilla de veredicto se rellenó.** La QA humana no se ejecutó ni se simuló.

---

## 14. Criterio 14 — validador y cifras, medidas en esta sesión

Vía que no escribe: `node tools/project-console/validate-project-console-state.mjs`.

| Métrica | Antes | Después |
|---|---|---|
| Validador | **EXIT 0** | **EXIT 0** |
| Objetivos / fases / runs | **7 / 28 / 73** | **7 / 28 / 73** |
| **Component statuses** | **16** | **16** |
| `Docs indexed` | 149 | **149** — sin registrar nada |
| `Docs curated primary-visible` | 60 de 149 | 60 de 149 |
| Avisos | **1 no bloqueante**, arista externa `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001` | **el mismo, único** |
| Colas | `needs_human_decision=0 now=1 ready_next=20 later=37 history=15` | idéntico |
| Etapas del run activo | `RUN-JAME-WEB-HEADER-REVALIDATION-001=none` | idéntico |

**Component statuses: 16, sin moverse.** El único aviso es el no bloqueante de la arista externa,
que no se resolvió.

**Diferencia con el record anterior, declarada:** las colas decían `now=2 history=14`. Hoy dicen
`now=1 history=15` porque el run 14 se cerró a las 18:22:20, **antes** de mi primera escritura.
No la produje yo.

---

## 15. Criterio 15 — cifras verificadas, no creídas

Ninguna cifra de este record viene del ticket ni del record anterior. Las tres que el encargo
daba y que se comprobaron en disco:

| Cifra del encargo | Verificada | Resultado |
|---|---|---|
| Suite **296/296** | sí, corriéndola | **cierta** antes del arreglo |
| **Component statuses: 16** | sí, dos veces | **cierta**, sin moverse |
| **17 componentes Web** | sí, contando `WEB_COMPONENT_UI` | **cierta** — 17 claves en `blockCatalog.js:11-114` |

---

## 16. Criterio 16 — estado en que debe quedar el run

**`RUN-JAME-WEB-HEADER-REVALIDATION-001` debe quedar en `active`.**

Vocabulario del contrato, exclusivamente: `planned`, `active`, `blocked`, `completed`.

Razón: es el tercero de cuatro tiempos. La reparación está hecha y su re-QA preparada, pero la
re-QA la ejecuta el operador. No es `blocked`: nada impide avanzar. No es `completed`: eso lo
decide la cabina tras la re-QA, y el run 16 sigue pendiente.

**No se tocó `status`, ni `progress`, ni `closeout_result` de ningún run.**

## 17. Criterio 17 — `.project/` no se re-emitió

**No lo re-emití.** Sus seis archivos tienen mtime **2026-07-30 18:22:20**, el mismo instante que
`.aiw/roadmap/roadmap.json` — escritura atómica de la consola al cerrar el run 14, **anterior a
mi primera escritura**. Sus md5 difieren de los del record anterior por esa misma causa, no por
mí. El barrido de mtime de §19 no devuelve ninguno.

---

## 18. Criterio 19 — superficies disjuntas, md5 antes y después

| Ruta | md5 antes | md5 después | ¿Cambió? |
|---|---|---|---|
| cantu `.aiw/roadmap/roadmap.json` | `1dfcf17eccb7ec79b0864f040a5714b9` | `1dfcf17eccb7ec79b0864f040a5714b9` | **No** |
| cantu `.aiw/state/component_status.json` | `f591165bbf19862b04433129d9edf2cb` | `f591165bbf19862b04433129d9edf2cb` | **No** |
| cantu `.aiw/docs/docs_index.json` | `bc708a5847f66291ea1cd719eb6a0ecb` | `bc708a5847f66291ea1cd719eb6a0ecb` | **No** |
| cantu `docs/components/web/HEADER.md` | `90bb753cf028618ebf381cd9383f929b` | `90bb753cf028618ebf381cd9383f929b` | **No** |
| cantu packet de QA anterior | `1adf2a37eae904326ec2bcb15cf5eabd` | `1adf2a37eae904326ec2bcb15cf5eabd` | **No** |
| aiw-console `.aiw/roadmap/roadmap.json` | `08b9d813d6e3ee31aee464eb02294b61` | `08b9d813d6e3ee31aee464eb02294b61` | **No** |
| aiw-console `context/aiw-console/CONTRATO.md` | `f77ccec64d99f2048d4bde41638cb228` | `f77ccec64d99f2048d4bde41638cb228` | **No** |
| aiw-console `context/DECISIONES.md` | `3f6bdf8816a0b43818519eb3582f6511` | `3f6bdf8816a0b43818519eb3582f6511` | **No** |

`roadmap/roadmap.json` de aiw-console, `context/aiw/`, `.project/` de aiw-console, handoffs,
tests y records existentes: **sin tocar**. Columns y su packet: sin tocar.

---

## 19. Archivos escritos por este encargo, y ninguno más

Verificado con un barrido de mtime de **todo el repo** de cantu-studio, no solo de los
directorios esperados, con corte en el minuto anterior a mi primera escritura. Devolvió
**exactamente tres rutas**, las tres mías.

| # | Archivo | Acción | md5 final |
|---|---|---|---|
| 1 | `tools/author-lite/editor-ui/src/features/editor/components/web/WebBlockEditor.jsx` | **Modificado** — 4 puntos, §20 | `984d5fe7e3e514f876bad0e9e2caf90f` |
| 2 | `tools/author-lite/compiler-api/tests/webHeaderColorPaletteAuthoringSurface.test.mjs` | **Creado** (cobertura aditiva) | `9736a850c3c871e24efaee9e0f4023e7` |
| 3 | `docs/_historical_run_record/RUN-JAME-WEB-HEADER-REVALIDATION-001-OPERATOR-RE-QA-PACKET.md` | **Creado** (re-QA) | `806290576cc79c39994f5e7a630f7bc5` |
| 4 | `../aiw-console/context/aiw-console/records/REPARACION-SELECTOR-COLOR-HEADER-CANTU.md` | **Creado** | este record |

Ningún schema, compiler, renderer, packet de componente, índice, draft ni test existente fue
modificado. Los archivos temporales de medición viven en el scratchpad de sesión, fuera del repo.

**Records existentes:** había **68** antes de éste. Éste es el **69**. Sin colisión de nombre:
no existe ningún otro record cuyo nombre contenga `SELECTOR`, y los tres que contienen
`REPARACION` o `COLOR` son de otros asuntos.

---

## 20. El diff, en cuatro puntos

| Punto | Línea | Cambio |
|---|---|---|
| 1 | `:83-93` | **Añadido** `getHeaderColorOptions(palette)`: `getAuthorColorOptions(palette)` acotado a los ids que `VariantEnum` acepta, con caída a `VARIANT_OPTIONS` si quedara vacío. Comentario que explica por qué se acota |
| 2 | `:116-118` | `HeaderColorSelect` acepta `palette` y deriva `colorOptions`; el `.map` pasa de `VARIANT_OPTIONS` a `colorOptions` |
| 3 | `:3784` | El sitio de llamada top-level pasa `palette={colorPalette}` |
| 4 | `:1731` | La rama de slot mapea `getHeaderColorOptions(colorPalette)` en vez de `VARIANT_OPTIONS` |

**`ColumnRegisteredSelectField` no se tocó**, aunque el punto 4 lo usa: es un envoltorio de
`<select>` compartido por seis componentes y solo se cambiaron los `<option>` que la rama de
`header` le pasa. **`VariantSelect` no se tocó.** El cambio no sale de la superficie de Header.

---

## 21. No-claims de este record

- **No se reparó ningún otro componente**, aun habiendo medido que a doce les falta lo mismo y
  que seis se arreglarían de una sola vez.
- **No se tocó la pieza compartida `VariantSelect`.** Existe la palanca y es del operador.
- **No cambió lo que Header produce.** Schema, compiler y renderer intactos; salida compilada de
  un draft real byte-idéntica antes y después, bajo dos paletas.
- **No se migró ningún draft** ni se reescribió ninguno.
- **No se añadió opción `Personalizado`** ni muestra de color: exigirían campo nuevo en el schema.
- **No se editó el packet del componente** ni `.aiw/docs/docs_index.json`. S9 y S10 no ejecutados.
- **No se tocó el mojibake** ni el guardián que no lo cubre.
- **No se retiraron «Full width» ni «Col span».**
- **La re-QA no se ejecutó, no se simuló y no se dio por pasada.** Las cuatro casillas vacías.
- **No se certifica nada.** Ningún status de componente cambió; su fuente sigue siendo la matriz.
- **No se editó el canónico**, ni status, ni orden de runs, ni `barrier`, ni la arista externa.
- **No se decide ninguna decisión abierta** del contrato de color ni del de math.
- **No se ejecutó git en ninguna forma**, no se levantaron servidores, no se corrieron suites de
  `aiw-console`, y `.project/` no se re-emitió.
- **El run sigue abierto** hasta que el operador lo cierre desde la consola.
