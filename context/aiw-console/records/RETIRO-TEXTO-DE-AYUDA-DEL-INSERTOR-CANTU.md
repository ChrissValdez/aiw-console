# RETIRO DEL TEXTO DE AYUDA DEL INSERTOR DE FÓRMULA (cantu-studio)

**Fecha:** 2026-08-05
**Repo escrito:** `projects/cantu-studio` — **un solo archivo de código** (§3).
**Repo escrito:** `projects/aiw-console` — **este record.**
**Veredicto:** **RETIRADO. Ninguna compuerta de parada se disparó.**

**ESTE ENCARGO NO TUVO RUN.** No cierra ninguno, no cambia ningún `status`, no toca el roadmap
canónico ni `.project/`, y no ejecuta Git. Es un **encargo de taller**: el operador midió un
texto en pantalla, decidió que sobra y pidió retirarlo. **No hay `queue_order` que derivar, no
hay título que comparar contra disco y no hay packet formal.** Por eso el campo `Max rounds` del
kernel venía como `N/A`.

---

## 1. LA CADENA, LOCALIZADA Y CONTADA ANTES DE TOCARLA

El encargo transcribió el texto de pantalla y avisó de que podía diferir en puntuación o en el
tipo de raya. **Se derivó de disco.** La forma literal **no era la del ticket**: lleva **rayas
largas (—, U+2014) pegadas sin espacio**, no guiones.

**La cadena en disco, VERBATIM:**

```
Coloca el cursor —o selecciona texto— y abre el editor de fórmula.
```

**Dónde vive, con archivo y línea (numeración ANTES del cambio):**

| | Archivo | Línea | Qué era |
|---|---|---|---|
| Declaración | `tools/author-lite/editor-ui/src/features/math-authoring/inlineFormula/InlineFormulaField.jsx` | **46** | `const CURSOR_EVENTS_HINT = '…';` |
| Consumo | el mismo archivo | **118** | `helperText = CURSOR_EVENTS_HINT,` — valor por defecto de una prop |
| Pintado | el mismo archivo | **262** | `<span className="text-[10px] leading-snug text-zinc-400">{helperText}</span>` |

**CONTEO DE SITIOS: UNO.** La cadena literal aparece **una sola vez en todo el repo**, en la
línea 46. Los otros dos puntos no son copias: son la misma constante referenciada.

```bash
grep -rn "Coloca el cursor" --exclude-dir=node_modules --exclude-dir=dist .
grep -rn "CURSOR_EVENTS_HINT" --exclude-dir=node_modules --exclude-dir=dist .
```

La primera devuelve **1 línea**; la segunda, **1 línea**. Ambas la 46.

**ESTÁ ESCRITA EN LÍNEA, NO EN NINGÚN CATÁLOGO DE TEXTOS.** Es una constante de módulo dentro
del propio componente. Este repo **no tiene** fichero de cadenas de interfaz para el editor: los
textos author-facing viven en línea junto al componente que los pinta, y el único catálogo que
existe —`features/editor/constants/blockCatalog.js`— es de **bloques**, no de textos de control.

---

## 2. COMPUERTA DEL CRITERIO 2: ¿ES SOLO PARA EL INSERTOR? — **SÍ. NO PARA.**

Tres comprobaciones, todas negativas para «lo usa algo ajeno»:

1. **La constante no se exporta.** `CURSOR_EVENTS_HINT` es de módulo, sin `export`. No puede
   consumirla nada de fuera. `inlineFormula/index.js` reexporta el componente y el empalme;
   **la constante no**.

2. **Ningún consumidor pasa `helperText`.** Los **siete** sitios de código que montan el control
   viven todos en `features/editor/components/web/WebBlockEditor.jsx` y todos tienen la misma
   forma: `<InlineFormulaField colorPalette={colorPalette}>`. **Ninguno pasa `helperText`.** La
   prop existía **solo** para acarrear esta cadena y **nadie la ejercía**.

3. **El `helperText` de la otra superficie es otro, y no toca este.**
   `math-authoring/formulaInserter/FormulaInserterShell.jsx:56` declara **su propio**
   `helperText = ''` —cadena vacía, por defecto distinto— y lo pinta por `FormulaInserterHint`.
   **No importa `CURSOR_EVENTS_HINT` ni lo referencia.** Es la carcasa del insertor del
   componente de regla matemática, una superficie separada. **No se tocó.**

---

## 3. QUÉ SE RETIRÓ

Un solo archivo:
`tools/author-lite/editor-ui/src/features/math-authoring/inlineFormula/InlineFormulaField.jsx`

**Tres retiradas, todas de la misma cadena y su cañería muerta:**

1. **La declaración** (línea 46) y su línea en blanco.
2. **La prop `helperText`** de la firma del componente (línea 118). Quedaba **muerta**: sin
   valor por defecto y sin nadie que la pasara, era una prop que ni se recibe ni se pinta.
3. **El `<span>` que la pintaba** (línea 262).

**LO QUE NO SE MOVIÓ, dicho explícitamente:**

- **El botón se queda entero.** Su etiqueta (`'Insertar fórmula'`), su icono (`<Sigma size={13}>`),
  su `className` completo y su `onClick={handleOpen}` están **byte a byte como estaban**.
- **El `<div>` envoltorio de la fila SE CONSERVA.** Tras quitar el `<span>` le queda un solo
  hijo, pero **no es un contenedor vacío ni un separador suelto**: es quien lleva el `mt-1` que
  separa el botón del campo. **Borrarlo habría subido el botón 0,25 rem — un cambio de posición,
  que el criterio 3 prohíbe.** Se dejó tal cual, con su `flex flex-wrap items-center gap-2`.
  **No se rediseñó la fila.**
- **El aviso del cuarto caso** (`{notice}`, el `<p role="status">` ámbar) **no se tocó**: es otro
  texto, condicional, y está fuera del alcance.
- La captura del cursor, el empalme, la escritura por la vía nativa y el modal: **intactos**.

**El control sigue visible y funcional en los cinco campos y en sus ocho colocaciones.** Lo fija
el test de montaje, que se corrió y pasó (§5).

---

## 4. COMPUERTA DEL CRITERIO 5: ¿ALGÚN TEST AFIRMA ESE TEXTO? — **NINGUNO.**

**No hubo test que declarar ni que ajustar.** Se buscó antes de borrar, por dos vías:

1. **Por la cadena y por el símbolo**, en todo el repo: los `grep` de §1 devuelven **una sola
   línea cada uno**, la fuente. **Cero apariciones en `tests/`.**
2. **Por lo que rodea al texto**, en los cinco ficheros de test del insertor: se buscó
   `helper`, `Hint`, `HINT`, `hint`, `span`, `text-zinc-400`, `buttonLabel` e
   `Insertar fórmula`. **Un solo acierto, y es un comentario** —
   `webInlineFormulaInserterMount.test.mjs:454`, que dice «usa el helper compartido» hablando de
   `renderTextArea`, no del texto de ayuda.

Los tests que **sí** leen el archivo modificado afirman sobre otras cosas —qué importa, que no
monta `FormulaInserterShell`, que no pinta un `<textarea>` propio, que la captura va por
`onSelect`/`onKeyUp`— y **ninguna afirmación depende del `<span>` retirado**. Por eso siguen
verdes sin tocarlos.

**Nada se borró en silencio: no había nada que borrar.**

---

## 5. LO QUE NO PUEDE ROMPERSE, VERIFICADO

Se corrió **lo tocado y lo directamente relacionado**, no la suite completa, desde
`projects/cantu-studio/tools/author-lite/compiler-api`:

```bash
node --test tests/webInlineFormulaSelectionRules.test.mjs tests/webInlineFormulaInserterNativeUndo.test.mjs tests/webInlineFormulaProseBehaviourLock.test.mjs tests/webInlineFormulaInserterMount.test.mjs tests/mathAuthoringFormulaInserter.test.mjs
```

**Qué es cada uno y por qué entra:**

| Fichero | Tests | Por qué |
|---|---|---|
| `webInlineFormulaSelectionRules.test.mjs` | 10 | **Las cuatro reglas de selección.** Lee el archivo modificado. |
| `webInlineFormulaInserterNativeUndo.test.mjs` | 9 | **La escritura por la vía nativa.** Lee el archivo modificado. |
| `webInlineFormulaProseBehaviourLock.test.mjs` | **13** | **El bloqueo de la fórmula en línea**, los trece que pedía el encargo. |
| `webInlineFormulaInserterMount.test.mjs` | 16 | **Los cinco campos y las ocho colocaciones.** Lee el archivo modificado. |
| `mathAuthoringFormulaInserter.test.mjs` | 5 | La otra superficie (`FormulaInserterShell`), como guarda de §2. |

**Salida, cola literal:**

```
✔ the write point goes through the browser's own insert-text path, bounded to the splice range (5.7701ms)
✔ the range the write point derives reproduces the splice value byte for byte, in the four selection cases (2.4593ms)
✔ the range derived from the splice result is the range the classifier decided, in the four cases (0.2912ms)
✔ the derivation the control uses is the one measured here, not a second classification (1.5279ms)
✔ the form still finds out: the native path leaves an input event and the exact spliced value on the field (0.616ms)
✔ the safety net keeps the data when the deprecated path refuses: the value still lands and the form is still told (0.2828ms)
✔ the splice module and the selection rules were not touched: only how the result is written (1.294ms)
✔ no other programmatic writer was reached: the insert-text path exists in exactly one file (41.9271ms)
✔ no new dependency and no undo stack of our own: the control imports exactly what it imported (0.9048ms)
✔ the five prose fields store a delimited inline formula unchanged in every compiler-api gate (7.2ms)
✔ the five prose fields store a delimited inline formula unchanged in the editor-ui schema (9.1ms)
✔ the compiler emits the delimited inline formula unchanged for the five prose fields (3.8602ms)
✔ the formula already published in details.items[].content compiles unchanged (1.091ms)
✔ the delimited formula reaches the generated web HTML where the global math pass can see it (21.206ms)
✔ the preview path carries the delimited formula with the same single global math pass (21.6896ms)
✔ prose with no delimited formula is left untouched in the five fields (2.5227ms)
✔ the untouched claim is bounded: four of the five fields turn a newline into <br /> (1.1557ms)
✔ no guard of the five fields rejects any character a formula needs, in either schema (8.9395ms)
✔ backslash, dollar, braces, parentheses and underscore reach the HTML untouched (34.9256ms)
✔ ampersand, angle brackets and apostrophe are HTML-escaped, and that is the only change (2.8851ms)
✔ the Moodle output carries the formula literally and carries no math engine of its own (5.5865ms)
✔ the five prose fields never travel the Slides delimiter set (0.4867ms)
✔ with no selection the inserter still writes at the cursor and changes nothing around it (5.2ms)
✔ a selection with no delimiters is left untouched and nothing is preloaded (0.3925ms)
✔ a price is prose, not a delimiter: a single dollar sign does not send the selection to the fourth case (0.2013ms)
✔ a selection that is exactly one formula loads without its delimiters and replaces that formula (1.9987ms)
✔ the formula is recognised with whitespace dragged around it, and only the formula is replaced (1.0725ms)
✔ a mixed selection replaces nothing, preloads nothing and tells the author why (1.2424ms)
✔ the fourth case notice reaches the interface, in Spanish and on one line (1.5905ms)
✔ the operator failing case is caused by loading the delimiters, and stripping them fixes it (3.9113ms)
✔ the operator failing case round-trips byte for byte through the new rule (0.4894ms)
✔ the recognised delimiter set is derived from the one module that declares it (1.3492ms)
ℹ tests 53
ℹ suites 0
ℹ pass 53
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 392.0857
```

**53 de 53. Cero fallos. Nada verde se puso rojo.**

---

## 6. LINT, BUILD Y PAQUETE

```bash
npm --prefix tools/author-lite/editor-ui run lint
npm --prefix tools/author-lite/editor-ui run build
```

**Lint: limpio.** `eslint .` sin una sola línea de salida.
**Build: limpio.** El único aviso es el de siempre —trozos por encima de 500 kB—, **anterior a
este cambio y no causado por él**.

**El paquete, antes y después:**

| | Antes | Después | Diferencia |
|---|---|---|---|
| `index-*.js` | **762 423 B** (762,42 kB) | **762 241 B** (762,24 kB) | **−182 B (−0,024 %)** |
| `index-*.js` gzip | 210,04 kB | 209,98 kB | −0,06 kB |
| `index-*.css` | 75,46 kB | 75,46 kB | **0** |

**No se mueve de forma apreciable: 182 bytes sobre 762 kB.** Es exactamente el peso de la cadena
retirada más el `<span>` y su `className`.

**Detalle que vale la pena:** el CSS conserva **el mismo hash de contenido**, `index-DxyvQpXh.css`
antes y después. Ninguna utilidad de estilo cambió — confirmación independiente de que **la fila
del control no se rediseñó**.

---

## 7. VALIDADOR

Por la vía que no escribe, desde `projects/cantu-studio`:

```bash
node tools/project-console/validate-project-console-state.mjs
```

**Salida completa:**

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 73 runs; queue groups needs_human_decision=0 now=0 ready_next=14 later=26 history=33
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**Cifras medidas, no dadas por el encargo:**

- **Total de runs: 73.**
- **`history=33`.**
- Reparto de la cola: `needs_human_decision=0`, `now=0`, `ready_next=14`, `later=26`, `history=33`.
  **Suman 73 y cuadran.**
- `now=0` es coherente con que **este encargo no tenga run**: no se abrió ninguno.

El aviso de rebase es **no bloqueante y preexistente** — un puntero entre proyectos que un solo
roadmap cargado no puede resolver. **No lo tocó este encargo** y sigue en la lista de derivas
conocidas.

---

## 8. QUÉ TIENE QUE MIRAR EL OPERADOR

Lista corta y autocontenida. **Las etiquetas entre comillas angulares salen del catálogo de
bloques** (`features/editor/constants/blockCatalog.js`); todas son de flujo **Web**.

**Lo que hay que ver en los cinco campos: el botón «Insertar fórmula» con su sigma, y DEBAJO NO
HAY NADA. Ni la línea gris de ayuda, ni un hueco donde estaba.**

| # | Abrir | Campo | Qué se espera ver |
|---|---|---|---|
| 1 | **«Nota destacada»** (`callout`), primer nivel | Contenido | Botón presente. Sin texto gris a su derecha. |
| 2 | **«Nota destacada»** dentro de **«Dos columnas»** (`columns`) | Contenido | Igual que 1, en el slot de la columna. |
| 3 | **«Regla matemática»** (`rule`), primer nivel | Descripción | Botón presente, sin texto gris. |
| 4 | **«Regla matemática»** dentro de **«Dos columnas»** | Descripción | Igual que 3. |
| 5 | **«Tarjeta»** (`card`), **tipo normal**, primer nivel | Contenido | Botón presente, sin texto gris. En tarjeta de **código** y de **persona** el botón **no sale, y así era antes**. |
| 6 | **«Tarjeta»** tipo normal dentro de **«Dos columnas»** | Contenido | Igual que 5. |
| 7 | **«Nota desplegable»** (`details`) | Contenido de **cada ítem** | Un botón por ítem, sin texto gris en ninguno. |
| 8 | **«Comparador de conceptos»** (`conceptGrid`) | Contenido de **cada ítem** | Un botón por ítem, sin texto gris en ninguno. |

**Y que el insertor siga haciendo lo suyo, en cualquiera de los ocho:**

9. Pulsar el botón **sin haber tocado el campo** → el editor visual abre en blanco y al aceptar
   escribe **al final** del texto.
10. **Colocar el cursor** en mitad de la prosa y pulsar → escribe **ahí**, y el cursor queda
    **detrás** de la fórmula para seguir escribiendo.
11. **Seleccionar prosa** (sin delimitadores) y pulsar → la selección **sobrevive entera** y la
    fórmula entra en el cursor.
12. **Seleccionar exactamente una fórmula** y pulsar → el editor **precarga** su LaTeX sin los
    delimitadores y al aceptar **sustituye** esa fórmula.
13. **Seleccionar prosa y fórmula mezcladas** y pulsar → **no sustituye nada** y sale **el aviso
    ámbar de una línea**. Ese aviso **sigue existiendo**: no es el texto retirado.
14. **Ctrl+Z tras insertar** → un deshacer quita la fórmula, otro quita lo tecleado antes.

**Etiqueta que NO se pudo derivar: ninguna.** Las seis que se nombran —«Nota destacada»,
«Regla matemática», «Tarjeta», «Nota desplegable», «Comparador de conceptos» y «Dos columnas»—
están las seis en el catálogo. **Nada inventado.**

**Sin packet formal: este encargo no tiene run.**

---

## 9. QUÉ NO SE HIZO

- **No se abrió, cerró ni movió ningún run.** No se tocó `.aiw/roadmap/roadmap.json`, ni
  `.project/`, ni el `status` de nada. **No se ejecutó Git.**
- **No se tocó el comportamiento del insertor**: ni las reglas de selección, ni el empalme, ni la
  escritura por la vía nativa, ni la red de seguridad del setter.
- **No se tocó el editor visual de fórmulas** (`SmartFormulaModal` y su familia) **ni el control
  compartido de área de texto** (`TextAreaField`). El test que lo vigila sigue verde.
- **No se tocó `FormulaInserterShell`** ni su `helperText` propio.
- **No se rediseñó la fila del control**: el `<div>` envoltorio y el `mt-1` siguen ahí, a
  propósito, para no mover el botón.
- **No se cambió ningún otro texto de la interfaz.** El aviso ámbar del cuarto caso sigue tal cual.
- **No se tocaron** el compilador, los renderers, los esquemas ni el formato del dato guardado.
- **No se revalidó ningún componente** ni se tocó la Guía de componentes ni la matriz de
  certificación.
- **No se corrió la suite completa**, por diseño: solo los cinco ficheros de §5.
- **No se repararon derivas conocidas.** Sigue en pie el aviso de rebase del validador, y
  también esta, **detectada de paso y no tocada por estar fuera de alcance**:
  `docs/_historical_run_record/RUN-JAME-WEB-CALLOUT-REPAIR-001-OPERATOR-QA-PACKET.md:35` apunta a
  `InlineFormulaField.jsx:117` para la etiqueta del botón. Ese puntero **era exacto antes** de
  este cambio; ahora la etiqueta vive en la **115**, dos líneas más arriba. Es un **record
  histórico**, no un test ni documentación vigente, y arreglar punteros muertos está **fuera de
  alcance**. **Se deja anotado, sin tocar.**

---

## 10. COMPUERTAS DE PARADA: NINGUNA SE DISPARÓ

| Condición del criterio 11 | Resultado |
|---|---|
| La cadena no aparece con forma reconocible | **No.** Apareció en la 46, y se corrigió la forma del ticket: son **rayas largas**, no guiones. |
| La usa algo ajeno al insertor | **No.** Constante no exportada, ningún consumidor la pasa, y el `helperText` de la otra superficie es independiente (§2). |
| Retirarla exigiría reestructurar la superficie | **No.** Tres retiradas locales en un archivo. El envoltorio se conservó justo para no reestructurar. |
| Retirarla exigiría tocar el control compartido de área de texto | **No.** `TextAreaField` no se abrió siquiera. |
| Algún test del insertor o del bloqueo se puso rojo | **No.** 53 de 53 verdes. |

**No hay nada que decidir. No se pide opción, coste ni recomendación al operador.**
