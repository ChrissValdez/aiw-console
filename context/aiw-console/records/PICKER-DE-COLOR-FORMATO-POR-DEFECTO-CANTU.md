# Formato por defecto del selector de color personalizado en el editor de Cantu

**Proyecto medido:** `cantu-studio` (lectura). **Proyecto escrito:** `aiw-console` (este record).
**Fecha:** 2026-08-03. **Tipo:** encargo de taller, **sin run**. **No se escribió un solo byte
dentro de `projects/cantu-studio`.**

**Resultado en una línea:** el selector de color personalizado del editor es
**`<input type="color">`**, el campo de color nativo del navegador —una sola pieza compartida,
`ColorTokenPicker`, en `VariantSelect.jsx:35–44`, con el `<input>` en la línea 37—, y el diálogo
que se abre al pulsarlo, con su conmutador RGB / HSL / HEX, lo dibuja el navegador, no la
página. **La compuerta del criterio 2 se dispara: PARA Y REPORTA.** No se escribió ninguna línea
de código, no se añadió ninguna dependencia, no se sustituyó el control. La medición se entregó
igualmente completa —los diecisiete puntos de instanciación, las catorce superficies que hoy
ofrecen color personalizado, y las cuatro opciones con su coste— y **la decisión se devuelve al
operador sin tomar.**

---

## 1. Criterio 1 — Qué es ese picker, con archivo y línea

### 1.1 El control de color compartido y sus piezas exportadas

El módulo es
`tools/author-lite/editor-ui/src/features/editor/components/common/VariantSelect.jsx`.
Exporta cuatro piezas y una por defecto:

| Pieza | Línea | Qué es | ¿Abre el selector personalizado? |
|---|---|---|---|
| `ColorTokenSwatch` | 17 | Un `<span>` con `aria-hidden="true"`. Muestra de solo lectura. | **No.** No es un control. |
| `ColorTokenPicker` | 35–44 | **`<input type="color">`** (línea 37). | **Sí. Es esta.** |
| `RegisteredColorSwatch` | 55 | `ColorTokenSwatch` sobre un campo registrado. Solo lee. | **No.** |
| `ColorTokenOrCustomField` | 77 | Desplegable de la paleta + opción `Personalizado` + `ColorTokenPicker` al lado (línea 118). | Sí, **a través de** `ColorTokenPicker`. |
| `VariantSelect` (default) | 131 | Con `allowCustom` y `control` renderiza `ColorTokenOrCustomField` (línea 140); sin ellos, un `<select>` a secas. | Solo cuando `allowCustom` está encendido. |

El cuerpo del picker, verbatim, líneas 35–44:

```jsx
export const ColorTokenPicker = ({ accent, onChange, onBlur, className = PICKER_BASE_CLASS }) => (
  <input
    type="color"
    value={accent || '#FFFFFF'}
    onChange={onChange}
    onBlur={onBlur}
    className={className}
    aria-label="Color personalizado"
  />
);
```

### 1.2 Qué hay detrás: las tres pruebas

La pregunta del criterio 1 es si detrás hay un campo de color nativo del navegador, un
componente escrito en el repo, o una librería de terceros. Las tres se contestan por medición.

**Prueba 1 — Es un campo nativo, y solo hay tres sitios en todo el editor que produzcan uno.**
Barrido de `type="color"` en `tools/author-lite/editor-ui/src`:

| Archivo:línea | Qué es |
|---|---|
| `VariantSelect.jsx:37` | El picker compartido `ColorTokenPicker`. **Es el que el operador describe.** |
| `VisualFields.jsx:33` | Input crudo, campo `background` del componente visual. No pasa por la pieza compartida. |
| `ComponentGuide.jsx:1476` | Input crudo, `CompactAccentPicker` de los perfiles de paleta. No es un componente de bloque. |

No hay ningún otro. Los demás sitios que aparecen en un barrido amplio están fuera del editor:
`mathlive-keyboard-calibration.html:148` y `src/experiments/mathlive-keyboard-calibration/calibration.js`
son un banco de calibración, no la superficie de autoría.

**Prueba 2 — No es un componente propio.** No existe en el repo ningún componente que dibuje un
área de color, un anillo de matiz, ni un conmutador de notación. Barrido insensible a mayúsculas
de `colorFormat`, `defaultFormat`, `formato`, `rgb`, `hsl` sobre todo `tools/author-lite`: los
únicos aciertos son mensajes de Zod del tipo `"Color invalido (usa formato #RRGGBB)"`, sombras
CSS `rgba(...)` en `previewRenderer.js`, y una cadena `\\textcolor{rgb(1,2,3)}{a}` en un test de
MathLive. **Cero ocurrencias de un ajuste de formato de color en toda la superficie del editor.**

**Prueba 3 — No es una librería de terceros.** `tools/author-lite/editor-ui/package.json` declara
nueve dependencias, verbatim:

```
@hookform/resolvers, @tailwindcss/vite, lucide-react, mathlive,
react, react-dom, react-hook-form, tailwindcss, zod
```

Ninguna es un selector de color. `mathlive` es el editor de fórmulas; `lucide-react` son iconos.

**Prueba 4, de refuerzo — el propio repo ya lo afirma en un test verde.**
`tools/author-lite/compiler-api/tests/webColorSelectorCustomPicker.test.mjs:150`:

```js
assert.match(picker, /type="color"/, 'the picker must be a colour input, not a span');
```

y en la línea 142, sobre `IconListFields.jsx`:

```js
assert.doesNotMatch(iconListSource, /type="color"/, 'iconList must not keep a raw colour input');
```

El repo no solo usa el input nativo: **tiene una aserción viva que exige que lo sea.**

### 1.3 La respuesta

El selector de color personalizado del editor es el **diálogo nativo del navegador**, abierto por
un `<input type="color">` compartido. El conmutador RGB / HSL / HEX que el operador ve, y que hoy
abre en RGB, es interfaz del navegador y del sistema operativo. **Esto es medición, no
inferencia:** el elemento está en `VariantSelect.jsx:37`, no hay componente propio, no hay
dependencia, y no hay ningún ajuste de formato en ninguna parte del código.

---

## 2. Criterio 2 — La compuerta se dispara. Por qué no es controlable

**Se PARA Y REPORTA. No se escribió una sola línea.**

La razón no es de este repo, es de la plataforma. Según el estándar HTML (WHATWG,
sección *Color state (type=color)* de `input.html`), los **únicos** atributos de contenido que
aplican a `type=color` son tres:

> The `alpha`, `colorspace`, and `list` content attributes apply to this element.

y sobre la interfaz del selector:

> Whether an `input` element supports a picker depends on the `type` attribute state and
> implementation-defined behavior.

Es decir: la presentación del selector —incluido qué notación muestra primero— es
**implementation-defined**. No existe atributo, propiedad IDL, pseudo-elemento CSS ni API
JavaScript que permita a la página elegir si el diálogo abre en HEX o en RGB. La página entrega
un valor y recibe un valor; el diálogo intermedio es del navegador.

**Los tres atributos que sí existen no sirven para esto, y uno es activamente peligroso:**

- `list` — asocia un `<datalist>` de colores sugeridos. No toca el formato.
- `alpha` — habilita canal alfa. No toca el formato, y cambiaría el valor.
- `colorspace` — elige el espacio de color del **valor** (`srgb` vs `display-p3`). Con
  `display-p3` el valor deja de ser `#rrggbb`. **Eso cambiaría el dato almacenado y dispararía
  el criterio 5.** Se descarta por medición, no por opinión.

**Nota de honestidad sobre lo que este encargo NO midió:** si el navegador recuerda entre
aperturas la pestaña de formato que el operador eligió a mano es una propiedad del navegador y
de su perfil, no del repo. No se puede leer desde `cantu-studio` ni desde el DOM. Queda como
punto de QA manual en el criterio 8, no como afirmación.

---

## 3. Criterio 3 — Los puntos de instanciación, medidos igual

La compuerta corta el cambio, no la medición. El encargo esperaba que el control estuviera
centralizado, y **lo está**: todo el editor produce el picker desde una sola pieza, con dos
excepciones que no pasan por ella.

### 3.1 La cadena de montaje

**Una sola pieza produce el `<input type="color">`:** `ColorTokenPicker` (`VariantSelect.jsx:35`).
Se monta en **cuatro** sitios de código:

| Archivo:línea | Envoltorio |
|---|---|
| `VariantSelect.jsx:118` | dentro de `ColorTokenOrCustomField` |
| `WebBlockEditor.jsx:974` | `CardColorField` |
| `WebBlockEditor.jsx:3443` | `HierarchyNodeColorField` |
| `IconListFields.jsx:72` | `IconListColorField` |

**`ColorTokenOrCustomField` se monta en cuatro sitios de código:**

| Archivo:línea | Envoltorio |
|---|---|
| `VariantSelect.jsx:140` | rama `allowCustom` de `VariantSelect` |
| `WebBlockEditor.jsx:127` | `HeaderColorSelect` (nivel superior) |
| `WebBlockEditor.jsx:740` | `ColumnColorSelectField` (gemela de slot) |
| `WebBlockEditor.jsx:1775` | `header` como hijo de `columns` |

**Dos inputs crudos NO pasan por la pieza compartida:** `VisualFields.jsx:33` (campo
`background`) y `ComponentGuide.jsx:1476` (`CompactAccentPicker` de perfiles de paleta).

### 3.2 Las colocaciones author-facing, incluidas las de columnas

Diecisiete colocaciones en total. Las cuatro de slot dentro de `columns` van marcadas.

| # | Superficie | Archivo:línea | Vía |
|---|---|---|---|
| 1 | `header`, nivel superior | `WebBlockEditor.jsx:3915` → `:127` | `ColorTokenOrCustomField` |
| 2 | `header`, **slot de `columns`** | `WebBlockEditor.jsx:1775` | `ColorTokenOrCustomField` |
| 3 | `card` tipo `normal` | `WebBlockEditor.jsx:1176` → `:974` | `CardColorField` |
| 4 | `card` tipo `metric` | `WebBlockEditor.jsx:1198` → `:974` | `CardColorField` |
| 5 | `card` tipo `persona` | `WebBlockEditor.jsx:1225` → `:974` | `CardColorField` |
| 6 | `callout`, nivel superior | `WebBlockEditor.jsx:3945` | `VariantSelect allowCustom` |
| 7 | `callout`, **slot de `columns`** | `WebBlockEditor.jsx:1839` | `ColumnColorSelectField` |
| 8 | `list`, nivel superior | `WebBlockEditor.jsx:3970` | `VariantSelect allowCustom` |
| 9 | `list`, **slot de `columns`** | `WebBlockEditor.jsx:1805` | `ColumnColorSelectField` |
| 10 | `rule`, nivel superior | `WebBlockEditor.jsx:4031` | `VariantSelect allowCustom` |
| 11 | `rule`, **slot de `columns`** | `WebBlockEditor.jsx:1876` | `ColumnColorSelectField` |
| 12 | `table`, nivel superior | `WebBlockEditor.jsx:3071` | `VariantSelect allowCustom` |
| 13 | `table`, **slot de `columns`** | `WebBlockEditor.jsx:1966` | `ColumnColorSelectField` |
| 14 | `details`, por ítem | `WebBlockEditor.jsx:2436` | `VariantSelect allowCustom` |
| 15 | `conceptGrid`, por ítem | `WebBlockEditor.jsx:2582` | `VariantSelect allowCustom` |
| 16 | `hierarchy`, por nodo | `WebBlockEditor.jsx:3533` y `:3602` → `:3443` | `HierarchyNodeColorField` |
| 17 | `iconList`, por ítem | `WebBlockEditor.jsx:4014` y `:1868`, `SlideItemEditor.jsx:52` → `IconListFields.jsx:72` | `IconListColorField` |

Fuera de la cadena compartida, con input crudo:

| Superficie | Archivo:línea |
|---|---|
| `visual`, campo `background` (Web) | `WebBlockEditor.jsx:4018` → `VisualFields.jsx:33` |
| `visual`, campo `background` (Slide) | `SlideItemEditor.jsx:56` → `VisualFields.jsx:33` |
| Perfiles de paleta del editor | `ComponentGuide.jsx:1476` |

Sin picker, y así se quedan: `SlideCardEditor.jsx:26` usa `VariantSelect` **sin** `control` ni
`allowCustom`, luego es un `<select>` de tokens a secas.

### 3.3 La respuesta a la pregunta del criterio 3

**El formato no se configura en ningún sitio, ni en uno ni en varios.** No hay un valor por
defecto que cambiar: el repo nunca elige formato porque no puede. Esto **no** es el supuesto
«se configura por separado en varios sitios» del criterio 11 —que habría exigido reportar antes
de tocar—; es el supuesto del criterio 2, más arriba: no hay punto de configuración en absoluto.

Vale la pena dejar dicho, porque es la buena noticia de la medición: **si algún día el formato
fuera controlable, el arreglo sería un valor único.** Una sola pieza, `ColorTokenPicker`, cubre
diecisiete de las veinte colocaciones. Solo `VisualFields.jsx:33` y `ComponentGuide.jsx:1476`
quedarían aparte.

---

## 4. Criterios 4, 5 y 6 — Qué cambió: nada

- **Criterio 4 (cambiar solo el formato por defecto):** no se aplicó. La compuerta lo impide.
  Ningún formato se retiró porque ninguno se tocó; el operador conserva exactamente los que su
  navegador ofrezca.
- **Criterio 5 (ningún valor almacenado cambia):** se cumple de la forma más fuerte posible.
  **Cero bytes escritos en `cantu-studio`.** El dato guardado sigue siendo `#RRGGBB` para color
  personalizado y un id de token para color de paleta; la lectura sigue mostrando
  `Personalizado` según la regla de `VariantSelect.jsx:66–69`; la salida compilada es la misma
  porque el árbol es el mismo. Los 350 tests verdes de §5 son la medición de ese árbol.
- **Criterio 6 (ningún componente gana ni pierde el picker):** la lista de superficies es
  idéntica antes y después, por la misma razón. Es la de §3.2: diecisiete colocaciones vía la
  pieza compartida, más tres inputs crudos. Ninguna entró, ninguna salió.

**Diff conceptual: vacío.** No hay archivo modificado, ni resumen de diff, ni riesgo de
regresión, porque no hubo edición.

---

## 5. Criterio 7 — Tests

### 5.1 El cero, verificado

El encargo suponía que hoy nadie afirma el formato por defecto y pedía verificar ese cero. **Es
cero, y está medido.** Barrido sobre `tools/author-lite/compiler-api/tests/` de
`formato por defecto`, `default format`, `colorFormat`, `defaultFormat`, `hex por defecto`,
`opens in`, `se abre en`: **0 aciertos** en los 32 archivos de test.

Lo único que los tests afirman sobre el picker son dos líneas, ambas en
`webColorSelectorCustomPicker.test.mjs`, y ninguna habla de formato:

- línea 142 — `iconList` no conserva un input de color crudo;
- línea 150 — el picker **es** un `type="color"`, no un `<span>`.

**No se amplió la cobertura.** Un test del formato por defecto solo puede afirmar una de dos
cosas: o el valor de un ajuste que no existe, o el comportamiento del diálogo del navegador, que
no es observable desde `node --test` ni desde el repo. Escribirlo sería fabricar una aserción
sobre algo que este código no controla. Esto queda como lo que NO se hizo, en §8.

### 5.2 La suite, verificada y no dada por buena

El encargo daba 350 de 350 y pedía verificarlo. **Se verificó: 350 de 350.** No se corrió la
suite completa del repo; se corrió la del compilador, que es la que contiene los archivos
directamente relacionados con el control de color —`webColorSelectorCustomPicker.test.mjs`,
`webSharedColorSelectorUnification.test.mjs`, `authorLiteColorSystem.test.mjs`,
`webHeaderColorPaletteAuthoringSurface.test.mjs`, `webAuthorPaletteDerivedRolesAndCustomHex.test.mjs`,
entre los 32.

Comando, desde `projects/cantu-studio/tools/author-lite/compiler-api`:

```bash
node --test tests/*.test.mjs
```

Cola de la salida, verbatim:

```
✔ visual rejects dangerous SVG payloads in schema, JSON import and direct compiler calls (31.6073ms)
✔ dangerous visual SVG payloads do not survive generated Web JS or Preview Real HTML (88.9914ms)
✔ Core renderVisual neutralizes unsafe SVG if called outside Author Lite compiler (0.3077ms)
✔ visual remains rejected inside columns contract (5.2422ms)
✔ visual rejects unsafe non-SVG expansion and URL-bearing fields (4.4744ms)
✔ getFlowDrafts discovers nested web drafts preserving relativePath and duplicates (96.733ms)
✔ resolveDraftPathInFlow handles safe path and rejects traversal (115.7126ms)
ℹ tests 350
ℹ suites 0
ℹ pass 350
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1603.5221
```

**Nada verde se puso rojo, porque nada se tocó.** La cifra del encargo era exacta.

Aviso de método, para que no se lea de más: la suite se corrió **una vez**, sobre el árbol
intacto. No hay un «antes y después» con dos ejecuciones porque no hay dos estados: el árbol
que se midió es el mismo que queda al cerrar.

---

## 6. Criterio 8 — Qué tiene que mirar el operador

Lista corta y autocontenida para confirmar la compuerta con sus propios ojos. **Etiquetas de
plataforma derivadas de `blockCatalog.js`; donde el catálogo no tiene entrada, se dice y no se
inventa.**

1. **Abrir el editor de Author Lite** y crear un bloque **Encabezado** (`web-header`,
   plataforma **`web`**).
2. **En el campo Color, pulsar el cuadro de color que está a la derecha del desplegable.**
   Se espera ver: se abre el selector del sistema, con su conmutador de formato en **RGB**.
   Ese diálogo tiene el aspecto del navegador, no el del editor —tipografía, bordes y botones
   distintos a los del resto de la aplicación. **Esa diferencia de aspecto es la prueba visual
   de que el diálogo no es nuestro.**
3. **Cambiar el formato a HEX a mano, cerrar el diálogo, y volver a abrirlo.** Se espera ver:
   lo que decida el navegador. Si lo recuerda, el problema se resuelve solo por perfil de
   navegador; si vuelve a RGB, la limitación es la que describe §2. **Este paso es el único que
   este encargo no pudo medir desde el repo.**
4. **Repetir el paso 2 en otra superficie para confirmar que el diálogo es el mismo en todas.**
   Sugeridas, con su plataforma según el catálogo:
   - **Lista** — `web-list`, plataforma **`web`**
   - **Nota destacada** — `web-callout`, plataforma **`web`**
   - **Tabla** — `web-table`, plataforma **`web`**
   - **Tarjeta** — `web-card`, plataforma **`web`**
   - **Diagrama jerárquico** — `web-hierarchy`, plataforma **`web`**
   - **Lista con etiquetas** — `web-iconlist`, plataforma **`web`**
   - **Nota desplegable** — `web-details`, plataforma **`web`**
   - **Comparador de conceptos** — `web-concept-grid`, plataforma **`web`**
   - **Regla matemática** — `web-rule`, plataforma **`web`**
   - **Recurso visual**, campo *Fondo* — `web-visual`, plataforma **`web`**
5. **Meter uno de esos bloques dentro de Dos columnas** (`web-columns`, plataforma **`web`**) y
   repetir el paso 2 en el slot. Se espera ver: exactamente el mismo diálogo. Las cuatro
   colocaciones de slot con picker son `list`, `callout`, `rule` y `table`, más `header`.
6. **Confirmar que nada cambió de valor.** Elegir un color personalizado, guardar, reabrir el
   borrador. Se espera ver: el desplegable en **`Personalizado`** y el color conservado; el
   Draft JSON guarda `#RRGGBB`.

**Etiquetas que el catálogo NO da, y que por tanto no se inventan:**

- El picker de **`iconList` dentro de una slide** (`SlideItemEditor.jsx:52`) y el de **`visual`
  dentro de una slide** (`SlideItemEditor.jsx:56`) existen en el editor, pero el catálogo de
  bloques **no tiene entrada propia para ellos**: son tipos de ítem dentro de `slide-columns`
  («Columns Slide», plataforma `slide`), no bloques de catálogo. `slide-visual` («Gráfico SVG»,
  plataforma `slide`) sí existe como entrada, pero está **`disabled: true`** en el catálogo, así
  que no es la misma superficie. **No se les asigna etiqueta.**
- El picker de los **perfiles de paleta** (`ComponentGuide.jsx:1476`) no es un componente de
  bloque y **no tiene entrada en el catálogo**. Sin etiqueta de plataforma.

---

## 7. Criterio 9 — Validador

Ejecutado por la vía que no escribe, desde `projects/cantu-studio`:

```bash
node tools/project-console/validate-project-console-state.mjs
```

Salida completa, verbatim:

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 66 runs; queue groups needs_human_decision=0 now=0 ready_next=17 later=26 history=23
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**Cifras reales:** **66 runs**, **`history=23`**. El resto de los grupos de cola:
`needs_human_decision=0`, `now=0`, `ready_next=17`, `later=26`.

**El aviso no bloqueante es el conocido de la dependencia externa** —
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` apuntando a
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`. Es legal y **no es hallazgo**. La validación pasa.

---

## 8. Criterio 11 — Opciones, coste medido y recomendación sin decidir

Se PARA Y REPORTA **por el primer supuesto del criterio 11**: la compuerta del criterio 2 se
disparó. Las cuatro opciones, costeadas.

### Opción A — No hacer nada. El operador cambia el formato en el diálogo del navegador

- **Coste medido: cero.** Cero archivos, cero dependencias, cero tests tocados.
- **Riesgo: cero.** Nada verde se puede poner rojo.
- **Lo que no resuelve:** si el navegador no recuerda la pestaña de formato entre aperturas, el
  operador la cambia cada vez. **Ese punto no está medido** (paso 3 de §6).

### Opción B — Escribir un selector de color propio en el repo

- **Coste medido en superficie:** hay que sustituir `ColorTokenPicker`
  (`VariantSelect.jsx:35–44`, hoy **10 líneas**). Un selector propio con área de color, campo
  hex, conmutador de notación, teclado y accesibilidad no es una pieza de diez líneas.
- **Coste medido en montaje:** **4 sitios** montan `ColorTokenPicker` y **2 más** llevan input
  crudo (`VisualFields.jsx:33`, `ComponentGuide.jsx:1476`). Si se quiere uniformidad real, son
  **6 sitios**, que cubren **20 colocaciones** author-facing (§3.2).
- **Coste medido en tests: 2 aserciones verdes se ponen rojas.**
  `webColorSelectorCustomPicker.test.mjs:150` exige que el picker sea `type="color"`;
  la línea 142 exige que `iconList` no tenga un input crudo. Las dos habría que reescribirlas,
  sobre una suite hoy en **350/350**.
- **Naturaleza:** es **capacidad nueva**. Fuera del alcance de este encargo por su propio texto.
- **Contrapartida honesta:** es la única opción que **sí** consigue lo pedido —el formato por
  defecto pasaría a ser nuestro—, a cambio de sustituir un control que ya pasó la QA del
  operador y cuyo aspecto él mismo aprobó.

### Opción C — Instalar una librería de selector de color

- **Coste medido:** **1 dependencia nueva** en un `package.json` que hoy tiene **9** y ninguna
  de color. Más la misma migración de 6 sitios de la opción B.
- **Prohibida explícitamente** por el encargo y por el criterio 11.

### Opción D — Usar los atributos que el estándar sí define (`alpha`, `colorspace`)

- **Coste medido: descartada por medición.** Ninguno controla el formato mostrado.
  `colorspace="display-p3"` haría que `value` deje de ser `#RRGGBB`, **cambiando el dato
  almacenado y la salida compilada**. Dispara el criterio 5. `alpha` haría lo mismo.

### Recomendación explícita, sin decidir

**Se recomienda la opción A**, y la razón es el reparto de costes, no la comodidad: A cuesta
cero y no arriesga nada; B es la única que funciona pero es capacidad nueva, toca 6 sitios de
montaje, pone en rojo 2 aserciones verdes y sustituye un control ya aprobado en QA. Antes de
considerar B, el paso 3 de §6 —¿recuerda el navegador el formato?— cuesta treinta segundos de
QA manual y puede volver B innecesaria.

**La decisión es del operador. Este encargo no la toma.**

---

## 9. Qué NO se hizo

- **No se cambió el formato por defecto**, porque no existe punto donde cambiarlo (§2, §3.3).
- **No se sustituyó el picker** por un componente propio, ni se instaló ninguna librería.
- **No se añadió ningún test.** Un test del formato por defecto solo podría afirmar un ajuste
  inexistente o el comportamiento del navegador, que `node --test` no observa (§5.1).
- **No se corrió la suite completa** del repo: solo la del compilador, 32 archivos, la que
  contiene los tests directamente relacionados con el control de color.
- **No se tocó** el compilador, los renderers, los dos esquemas, ni el sistema de color.
- **No se cambió qué componentes ofrecen color personalizado.** La lista de §3.2 es idéntica.
- **No se tocó** el roadmap canónico, `.project/`, ni el `status` de ningún run. **No se ejecutó
  Git.** No se levantó ningún servidor. No se clasificó ningún run.
- **No se repararon derivas conocidas que se cruzaron**, por estar fuera de alcance: hay
  mojibake vivo en los dos `draftSchema.js` —`"Color invÃ¡lido (usa formato #RRGGBB)"` en
  `compiler-api/schemas/draftSchema.js:296` y `:304`, y en
  `editor-ui/src/schemas/draftSchema.js:293` y `:301`—, conviviendo con la forma correcta
  `"Color invalido"` en las demás líneas del mismo archivo. **Se reporta y no se toca.**
- **No se emitió packet formal.** Este encargo no tiene run.

---

## 10. Declaración de run

**Este encargo NO tuvo run, y no lo tuvo por diseño, no por omisión.**

El propio ticket lo declara en su cabecera: *«ESTE ENCARGO NO TIENE RUN. No cambia el status de
nada, no toca el roadmap canónico ni `.project/`, y no ejecuta Git.»* Es un encargo de taller —
campo del kernel—, no una unidad de trabajo del roadmap.

En consecuencia: **no se ejecutó guarda de identidad contra
`cantu-studio/.aiw/roadmap/roadmap.json`**, porque no hay `run_id` que verificar; **no se
declara ningún `status`**; **no se emite `.project/`**; y **no se pide al operador que cierre
nada desde la consola**. El validador de §7 se ejecutó por la vía que no escribe, como
comprobación de que el estado de la consola sigue sano, no como parte de ningún ciclo de run.

La escritura de este encargo se limita a **un solo archivo**, este record, en `aiw-console`.
Dentro de `projects/cantu-studio` la escritura fue **cero bytes**.
