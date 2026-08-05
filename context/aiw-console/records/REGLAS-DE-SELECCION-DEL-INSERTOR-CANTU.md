# REGLAS DE SELECCIÓN DEL INSERTOR DE FÓRMULA (cantu-studio)

**Fecha:** 2026-08-05
**Run:** `RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001` — **derivado, no tecleado** (§1).
**Repo escrito:** `projects/cantu-studio` — **nueve archivos**: el canónico enmendado, 5 de
producción modificados, 1 test nuevo, 1 test ajustado y el packet de re-QA (§5, §12).
**Repo escrito:** `projects/aiw-console` — **este record.**
**Veredicto:** **HECHO. Ninguna compuerta de parada se disparó.** La hipótesis del salto de
línea **resultó CIERTA y está medida** (§7). Una cosa **no se pudo medir** y se declara como
límite en vez de disfrazarse: **deshacer** (§8).

---

## 0. LA AMPLIACIÓN, DECLARADA EN LA FORMA QUE `D-061` EXIGE

`D-061` («La ampliación del alcance de un run abierto se autoriza por veredicto de QA humana, y
sólo con las cuatro condiciones») se leyó entera antes de tocar nada. Se declara punto por punto:

| Lo que `D-061` obliga a declarar | Este caso |
|---|---|
| **Alcance original** | Montar el insertor junto a los cinco campos de prosa: un control, un empalme que escribe en el cursor, y abrir el editor visual que ya existe. **La decisión del operador de entonces:** el texto seleccionado se PRECARGA en el editor visual y se sustituye al aceptar. |
| **Qué reveló la QA** | Dos fallos que ninguna medición previa vio, porque las dos exigen ver la pantalla. **(a)** Selección que ya contenía fórmulas: la precarga las metió **con sus delimitadores**; el editor leyó `\\` como salto de línea y dejó un `\)` suelto. **(b)** Selección de prosa normal: el editor la cargó **como matemática** —letras en cursiva, espacios perdidos—. |
| **Qué se añadió** | La precarga incondicional se **retira**. La sustituye una regla de cuatro casos decidida por el operador: el insertor **sólo reemplaza texto que puede leer entero como una fórmula**. Tres casos se implementan; el cuarto **no**, y su coste se devuelve (§6). |
| **Por qué NO era un run nuevo** | Condición (2) de `D-061`: cae **sobre la superficie que la QA ejercitó** —el mismo control, el mismo empalme, los mismos cinco campos— y sobre **la pieza cuya limitación el propio run acababa de levantar**: la precarga de la selección es literalmente lo que este run construyó. Condición (3): **no cambia la identidad del run** — `title`, `objective`, `phase` y `depends_on` quedan intactos y verificados campo a campo (§2.4). |
| **Condición (4): la enmienda del texto** | Hecha **en este mismo encargo y ANTES del trabajo**, sobre el `full_description` del `queue_order` 27 (§2). |
| **Corolario de la segunda ampliación** | **ES LA SEGUNDA ENMIENDA DE ESTE RUN.** La primera fue la que corrigió su propia premisa falsa sobre la carcasa y los evaluadores. `D-061` manda que la segunda **se pare y se devuelva al operador**; **se hizo, y el operador la autorizó**. Este encargo la ejecuta con esa autorización. |

**Aviso que este record deja escrito para la próxima vuelta:** `D-061` dice que una ampliación
que crece dos veces «es señal de que el encuadre estaba mal». Ya van dos. **Un tercer hallazgo
debería sopesarse como run propio antes que como tercera ampliación.** No es una decisión de
este taller y no se toma aquí.

---

## 1. EL RUN, DERIVADO DEL CANÓNICO

Recorrido de `projects/cantu-studio/.aiw/roadmap/roadmap.json`
(`schema_version = jame.roadmap_v3.v0.2-progress`), buscando `queue_order === 27`.
**Una sola coincidencia sobre 70 runs.**

| Campo | Valor derivado |
|---|---|
| `run_id` | **`RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001`** |
| ubicación | objetivo `O5`, fase `O5.P3` |
| `queue_order` | 27 |
| `status` | `active` — **y es el ÚNICO run `active` del canónico**, verificado |
| `depends_on` | `RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001` |

**Título en disco, VERBATIM:**

```
Mount the formula inserter so an author can place a formula at the cursor inside prose
```

**Comparado carácter a carácter contra el objetivo del ticket: `true`, y 86 bytes en los dos
lados.** No hay parada por este motivo. El `full_description` se leyó íntegro (2179 caracteres)
antes de tocar nada.

---

## 2. LA ENMIENDA DEL ROADMAP

### 2.1 El respaldo, antes de escribir

Copia byte a byte al scratchpad de sesión, **fuera de los dos repos**:

```
C:\Users\chris\AppData\Local\Temp\...\scratchpad\roadmap.BACKUP.json
131550 bytes | md5 377fe5a695f8c9bb1b8a528b7b308f1b
```

md5 de origen y de destino **idénticos**, y el archivo es **CRLF puro** (0 saltos LF sueltos),
que es exactamente la razón por la que `git checkout` no sirve aquí para deshacer.

### 2.2 Que enmendar un run `active` es posible — **VERIFICADO ANTES, no heredado**

Dos comprobaciones independientes:

1. **Lectura del motor.** `setText` (`aiw-console/tools/roadmap/roadmap-core.mjs:1057-1101`)
   resuelve el nodo por `run_id` y asigna los campos de texto provistos. Barrido de su cuerpo:
   **`status` → 0 ocurrencias; `progress` → 0 ocurrencias.** No consulta ninguno de los dos.
   `planEdit` (`roadmap-plan.mjs:245-328`) tampoco añade regla: pre-flight → mutación →
   post-check → serializar.
2. **Ensayo en seco.** `planEdit` con `op: set-text` sobre el run `active` devolvió
   **`stage: ok`, `ok: true`**, sin errores. La operación no se opone al status.

**Y una tercera, que el ticket no pedía pero que prueba que la escritura no puede tocar nada
más:** reserializar el objeto **sin modificar** produce el archivo byte a byte
(`131550 == 131550`, cadenas idénticas). El serializador es exacto contra los finales de línea
del propio archivo, así que lo único que puede diferir es lo que se cambió a propósito.

### 2.3 El motor, y por qué el CLI local no sirve — **COMPROBADO**

El ticket dice que el CLI local de `cantu-studio` rehúsa el pre-flight. **Se comprobó en seco,
sin escribir:**

```
node tools/roadmap/roadmap-edit.mjs set-text --run RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001 --full-description "PROBE"
```

```
Refusing; nothing written.
  - target file already fails the invariants; fix it before editing (...roadmap.json):
  - run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on unknown run RUN-CANTU-ROADMAP-CONTENT-AUDIT-001 (orphaned dependency)
```

**La afirmación del ticket es correcta, y la causa está medida:** el CLI local carga **un solo**
roadmap, así que la arista externa legal del `CONTRATO §10.d` le parece colgante. Se condujo por
tanto **el motor de `aiw-console`**, alimentándole `externalRunIds` compuesto de los **otros dos
canónicos registrados** — `aiw/roadmap/roadmap.json` y `projects/aiw-console/roadmap/roadmap.json`,
**102 ids** —. Con eso el pre-flight pasa. El validador canónico se **inyectó como autoridad**
en `applyPlan`, de modo que un fallo habría revertido la escritura sola.

### 2.4 La verificación de la enmienda — campo a campo contra el respaldo

| Lo que el criterio 3 exige | Resultado |
|---|---|
| total de runs sin cambio | **70 → 70** |
| `queue_order` denso y contiguo | **1..70, sin hueco ni repetido** |
| exactamente un run `active`, el 27 | **1 activo, `queue_order` 27, `RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001`** |
| conjunto de `run_id` idéntico | **sí** |
| **ningún otro run alterado en ningún campo** | **campos que difieren en todo el árbol: UNO** — `RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001:full_description` |
| del 27, sólo su `full_description` | **`run_id`, `queue_order`, `title`, `status`, `summary`, `depends_on` y su fase: los siete sin cambio** |
| prueba independiente | árbol entero comparado **con `full_description` enmascarado**: **idéntico** |

**VERIFICACIÓN PASADA.** No hizo falta restaurar y no se paró.

### 2.5 Qué dice ahora el texto, y la única decisión de redacción que no era obvia

El bloque que el ticket dicta entró **VERBATIM y completo**. La parte que describía la precarga
—dos frases, `THE OPERATOR DECIDED WHAT HAPPENS WITH A SELECTION: …` y `That requires lifting
the single-token restriction…`— **se retiró**, que es lo que «sustituye» significa.

**LA DECISIÓN, DECLARADA:** el bloque dictado **termina con la misma frase de cierre que ya
cerraba el `full_description`** — *«Every count is a dated measurement and is to be verified
against disk.»*. Insertarlo en el hueco de la precarga habría dejado esa frase **dos veces**, y
una de ellas en mitad del texto. Se resolvió colocando el bloque **al final**, verbatim y entero,
y conservando **una sola** aparición de esa frase, **en el sitio donde siempre estuvo: el final**.
Ninguna otra frase se borró; se comprobó con aserciones antes de llamar al motor (frase de
apertura intacta, `This run requires operator visual QA.` intacta, cierre exactamente una vez,
sin espacios dobles). Longitud: **2179 → 3227** caracteres.

---

## 3. VALIDADOR — SALIDA COMPLETA, ANTES Y DESPUÉS

Ejecutado por la vía que **no escribe**, desde `projects/cantu-studio`:

```bash
node tools/project-console/validate-project-console-state.mjs
```

**ANTES de la enmienda, VERBATIM:**

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 70 runs; queue groups needs_human_decision=0 now=1 ready_next=15 later=26 history=28
Roadmap v3 active run derived stages: RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**DESPUÉS de la enmienda: SALIDA IDÉNTICA, línea por línea.** Se reproduce el bloque entero
arriba a propósito; no hay una sola diferencia que citar.

**Cifras reales — el ticket no las daba a propósito:**

| Cifra | ANTES | DESPUÉS |
|---|---|---|
| total de runs | **70** | **70** |
| `history=` | **28** | **28** |
| `ready_next=` | **15** | **15** |
| `needs_human_decision=` / `now=` / `later=` | 0 / 1 / 26 | 0 / 1 / 26 |
| objetivos / fases | 7 / 28 | 7 / 28 |

**Recuento propio sobre `roadmap.json`, independiente:** 70 runs — `completed=28`, `planned=41`,
`active=1`. **`completed=28` casa con `history=28`, y 28+1+15+26 = 70.**

**Que no se moviera nada es el resultado correcto:** una enmienda de texto no cambia la cola.

**El aviso no bloqueante de la dependencia externa apareció, es el conocido y legal, no es
hallazgo y NO se reparó** (§12). **`Docs indexed: 149` no se movió** porque el packet nuevo se
escribió junto a los otros catorce **sin tocar `.aiw/docs/docs_index.json`**, que es lo que el
ticket manda.

---

## 4. LA MEDICIÓN DEL CRITERIO 5 — ARCHIVO Y LÍNEA, VERIFICADA HOY

Todo lo de este apartado se leyó de disco en esta sesión, **antes de escribir una sola línea**.

### 4.1 Dónde se decidía la precarga

| Qué | Archivo:línea (antes de este encargo) |
|---|---|
| **La decisión de qué se precarga** | `editor-ui/src/features/math-authoring/inlineFormula/inlineFormulaSplice.js:82-95` — `resolveInlineFormulaSeed`, cuyo cuerpo entero era `return hasSelection ? text.slice(start, end) : '';` |
| **Quién la invoca** | `inlineFormula/InlineFormulaField.jsx:118-122`, dentro de `handleOpen` |
| **La decisión de qué se sustituye** | `inlineFormulaSplice.js:63-76` (`resolveInlineFormulaRange`) → consumida por `spliceInlineFormula:119-169`, que llama `withReplacement(text, start, end, inserted)` en `:157` |

**Los dos fallos de la QA salen de una sola línea:** `text.slice(start, end)` devuelve la
selección **verbatim**, delimitadores incluidos si los hay, y prosa incluida si lo es.

### 4.2 Qué formas de delimitador reconoce el sistema — **DERIVADO, no inventado**

Dos fuentes, las dos que el ticket nombra:

1. **De los trece tests del run anterior** (`webInlineFormulaProseBehaviourLock.test.mjs:118`),
   literal de código VERBATIM:
   `const FORMULA_PROSE = 'la formula \\(ax^2+bx+c\\) tiene las siguientes caracteristicas';`
   → la forma **en línea** `\( … \)`, **sin relleno interno**. Es la única forma que este
   insertor emite.
2. **De la medición previa** — `ADVANCED_OUTER_WRAPPERS`,
   `smartFormulaField/smartFormulaFieldAdapter.js:130-134`, el único sitio del editor que
   declara el conjunto:

   ```
   { open: '$$',  close: '$$' }
   { open: '\\[', close: '\\]' }
   { open: '\\(', close: '\\)' }
   ```

**EL CONJUNTO RECONOCIDO, derivado de ahí y no tecleado: `$$`, `\[`, `\]`, `\(`, `\)` — cinco
tokens.** El módulo **importa** la constante en vez de copiarla, y **hay un test que lo fija
leyendo el archivo del adaptador**: si aquel módulo dejara de publicarla, o cambiara el
conjunto, el test se pone rojo en vez de seguir afirmando una forma obsoleta.

**UN `$` SUELTO NO ESTÁ, Y ES UNA DECISIÓN MEDIDA, no un olvido.** El normalizador del adaptador
sí lo trata como delimitador en su regex de rechazo (`:151`), pero adoptarlo aquí habría mandado
al cuarto caso cualquier prosa castellana con un precio —«el libro cuesta $5»—, y **el test 10
del run anterior fija que `$` viaja intacto por los cinco campos como carácter normal**. Hay un
test que fija el precio como prosa.

### 4.3 Qué devuelve exactamente el editor visual al aceptar

`smartFormulaField/SmartFormulaModal.jsx` — **reverificado, no heredado**:

- **`onConfirm(pendingOutput)`** en `:117`. **Un solo argumento.**
- `pendingOutput` = `createSmartFormulaBlockGroupOutput(lines, { mode })` (`:23`).
- **Es un OBJETO, no una cadena delimitada.** Sus campos: `ok`, `latex` (el LaTeX canónico; con
  varias líneas van unidas por `\\`), `mode`, `mathNode`/`mathBlockGroup`, `errors`.
- **El botón de confirmar sólo se habilita si `pendingOutput.ok`** (`:98`, `:116`), así que lo
  que llega al empalme ya pasó por la validación de `math-authoring`.
- La precarga entra por la prop `value` (`:21`) → `resolveSmartFormulaInitialLines`.

**Medido en vivo, no leído:** con `latex = '12 \\ 32'` el objeto sale con `ok: true` y ese mismo
`latex`.

---

## 5. LOS TRES CASOS QUE SE IMPLEMENTAN

La decisión vive ahora en **un solo sitio**, `classifyInlineFormulaSelection`
(`inlineFormulaSplice.js`), que devuelve a la vez **qué se precarga** (`seed`) y **dónde se
escribe al aceptar** (`writeStart`, `writeEnd`). Abrir el editor y aceptar ya no pueden
discrepar: el control clasifica **una vez, al abrir**, guarda el plan en un `ref` y lo usa al
aceptar.

| Caso | Regla | Medido en vivo |
|---|---|---|
| **1. Sin selección** | Inserta en el cursor. **No debía cambiar, y no cambió.** | `El resultado es final.` con cursor en 16 → `El resultado es \(y^2\)final.`; `seed: ''`, `replacedText: ''` |
| **2. Selección sin ningún delimitador** | Inserta en el cursor y **deja la selección intacta**. **No precarga nada.** | `la mitad` seleccionado → `seed: ''`, `writeStart == writeEnd == fin de la selección`, resultado `El resultado es la mitad\(y^2\) del total.` — **las dos palabras siguen ahí** |
| **3. Exactamente una fórmula delimitada** | Carga su contenido **sin los delimitadores**; al aceptar **sustituye esa fórmula**, envuelta en la forma que los trece tests fijan. | `\(12 \\ 32\)` seleccionado → `seed: '12 \\ 32'` (**sin `\(` ni `\)`**), `replacedText` = la fórmula entera, resultado `resultado \(y^2\) final` |

**Espacios alrededor, admitidos:** si el autor arrastra un espacio de más por cada lado, la
selección sigue siendo «exactamente una fórmula», pero **lo que se sustituye es sólo la fórmula**
— `writeStart` cae en el `\(`, no en el espacio. Medido: `resultado \(y^2\) final`, con los dos
espacios intactos. Hay un test que lo fija.

**El punto de inserción de los casos 2 y 4, declarado:** colapsa al **final** de la selección.
Es donde queda el cursor tras arrastrar hacia delante y la única posición que deja la selección
entera intacta.

**La forma de envoltura NO se teclea:** sale de `wrapInlineFormula`, y el test la compara contra
el par derivado del archivo de tests del run anterior.

---

## 6. EL CUARTO CASO — NO IMPLEMENTADO, CON SU COSTE Y UNA RECOMENDACIÓN

**Qué hace hoy:** con una selección que tiene delimitadores pero **no** es exactamente una
fórmula —prosa mezclada, dos fórmulas, o una fórmula de bloque `\[…\]` / `$$…$$`— el insertor
**no precarga y no reemplaza**: inserta en el cursor y **avisa al autor en la interfaz, en
español y en una línea**:

```
La selección no es exactamente una fórmula: se insertó en el cursor y la selección quedó intacta.
```

El aviso lo produce el clasificador y lo pinta el control; **hay un test que comprueba que el
control lo toma del clasificador en vez de escribir uno propio**, que es de una sola línea y que
está en español.

**Por qué una fórmula de BLOQUE cae aquí, declarado:** `\[a\]` es «exactamente una fórmula
delimitada», pero este insertor sólo emite la forma **en línea**. Sustituirla habría convertido
una fórmula de bloque en una en línea **sin que el autor lo pidiera**. Eso es una decisión de
producto, no del taller, así que va al cuarto caso y se declara.

### 6.1 EL COSTE MEDIDO de soportarlo

Sustituir **sólo los tramos de fórmula dejando la prosa** exige tres cosas, y sólo la primera es
trabajo de taller:

1. **Un localizador de tramos** sobre la selección: recorrer buscando pares equilibrados de las
   tres formas y devolver N rangos. **Coste: comparable al clasificador que este encargo ya
   escribió —del orden de 50-70 líneas— más sus tests.** Es la parte barata y no es el problema.

2. **LA AMBIGÜEDAD AL ACEPTAR, que es el coste real y NO es un número de líneas.** El editor
   visual devuelve **UNA** fórmula (§4.3: `onConfirm` con un solo objeto, un solo `latex`). Una
   selección mixta tiene **N** tramos de fórmula más prosa. **No hay función de 1 a N.** Con
   `prosa \(a\) prosa \(b\)` y una sola fórmula devuelta, «aceptar» puede querer decir al menos
   tres cosas defendibles —sustituir sólo el primer tramo, sustituir todos por la misma fórmula,
   o sustituir la selección entera— y **las tres son reglas de producto**. Elegir una aquí sería
   exactamente lo que la enmienda prohíbe.

3. **Para N ≥ 2 haría falta una superficie que el editor NO TIENE.** Medido sobre
   `SmartFormulaModal`: recibe **una** `value` y devuelve **una** salida. No hay modo de varias
   fórmulas. Soportarlo sería **abrir el editor N veces** —con qué orden y qué cancelación es
   otra regla de producto— **o escribir una superficie de edición nueva**, que está fuera del
   alcance de este run y sería un run propio.

**Resumen del coste: el código es barato; la decisión no existe.** El bloqueo no es técnico.

### 6.2 RECOMENDACIÓN, sin decidir

**Se recomienda NO implementar el cuarto caso como sustitución parcial, y en su lugar —si el
operador quiere cubrirlo— abrir un run propio cuyo alcance sea «editar una fórmula ya colocada»,
que es el deseo real que hay debajo.** Razón medida: en los tres casos que se implementan, el
autor que quiere cambiar **una** fórmula ya tiene la vía correcta —seleccionarla entera—, y el
cuarto caso sólo aparece cuando la selección es **imprecisa**. Un aviso que enseña a seleccionar
la fórmula entera resuelve el caso frecuente sin comprar ninguna regla de producto.

**Esto es una recomendación y NADA MÁS. La decisión es del operador.** Nótese además que
«editar una fórmula que el autor no haya seleccionado entera» está **explícitamente fuera del
alcance** de este run, así que llevarlo ahí requeriría un run nuevo en cualquier caso.

---

## 7. EL SALTO DE LÍNEA DENTRO DE UNA FÓRMULA — **MEDIDO, Y LA HIPÓTESIS ES CIERTA**

Probado con **el caso exacto del operador**, `\(12 \\ 32\)`, construyendo la barra invertida con
`String.fromCharCode(92)` para que ninguna capa de shell se comiera un nivel de escape.

**A — LO QUE FALLABA (delimitadores cargados como contenido):**

```
resolveSmartFormulaInitialLines("\(12 \\ 32\)")  ->  ["\(12", "32\)"]     (2 líneas)
createSmartFormulaBlockGroupOutput(...)          ->  ok: false
  MALFORMED_LATEX: "unbalanced parentheses", lineIndex 0
  MALFORMED_LATEX: "unbalanced parentheses", lineIndex 1
```

**Es exactamente lo que el operador vio, y ahora está medido:** el editor parte por `\\`, la
primera línea se queda el `\(` pegado y la segunda **el `\)` suelto**. Y además `ok: false`, así
que el botón de confirmar quedaba deshabilitado.

**B — LA HIPÓTESIS (delimitadores quitados antes de cargar):**

```
resolveSmartFormulaInitialLines("12 \\ 32")  ->  ["12", "32"]      (2 líneas legítimas)
createSmartFormulaBlockGroupOutput(...)      ->  ok: true, latex: "12 \\ 32"
```

**HIPÓTESIS CONFIRMADA. Una fórmula con `\\` se abre como dos líneas legítimas en cuanto los
delimitadores no van dentro.** No hizo falta improvisar ningún tratamiento y **no se paró**.

**Y el viaje de ida y vuelta, medido de punta a punta:**

```
campo:  "resultado \(12 \\ 32\) final"
  -> se selecciona la fórmula -> seed "12 \\ 32"  (sin delimitadores)
  -> el editor abre ["12","32"], se acepta sin tocar nada -> latex "12 \\ 32"
  -> el empalme envuelve y sustituye
campo:  "resultado \(12 \\ 32\) final"      IDÉNTICO byte a byte
```

**El defecto está localizado con precisión, y merece quedar escrito:** la vía de precarga
(`resolveSmartFormulaInitialLines` → `resolveSmartFormulaInitialLatex` → partir por `\\`)
**NO quita el envoltorio**. La que sí lo quita es `normalizeAdvancedLatexInput`, que es **otra
vía** —la del área de texto de LaTeX avanzado— y por eso nadie lo había visto. Medido: con la
misma entrada, `normalizeAdvancedLatexInput` devuelve `{ok:true, lines:['12','32'],
wrapperStripped:true}`. **Dos caminos, un solo dato, y sólo uno pelaba el envoltorio.**

---

## 8. DESHACER — **NO SE PUDO MEDIR, Y SE DECLARA COMO LÍMITE**

**Qué es la escritura de vuelta, medido:** `InlineFormulaField.jsx`, `writeUncontrolledValue`.
Toma el **setter nativo del prototipo** de `value` y emite un `input` que burbujea. Es la vía que
el run anterior eligió y **esta enmienda no la tocó**: ni una línea de esa función cambió.

**Lo que se intentó, y por qué no bastó:**

1. **Navegador integrado.** Se escribió una página de sonda en el scratchpad —un `<textarea>`,
   la misma función de escritura, y un disparador— y se cargó por `file://`. El navegador la
   sirve **como instantánea estática y no ejecuta scripts**; la herramienta de JavaScript
   responde `No site is open in this tab`. **Se reproduce el límite que el record del run
   anterior ya había declarado**, esta vez comprobándolo en vez de heredarlo.
2. **Chrome real.** `list_connected_browsers` devuelve **`[]`**: no hay ninguna instancia
   conectada.
3. **Levantar un servidor** habría servido, y **está fuera del alcance** de este encargo.

**POR TANTO NO AFIRMO NADA sobre si la escritura es deshacible con el atajo del sistema, en
ninguno de los tres casos.** No es una omisión: es que no lo medí, y el encargo dice
explícitamente que las cifras y los hechos se miden, no se suponen.

**Lo que sí puedo decir sin salirme de lo medido:** la ruta es idéntica en los tres casos
implementados —la misma función, el mismo setter, el mismo evento—, así que **si es deshacible
lo será en los tres, y si no lo es tampoco en ninguno**. La única variable es el rango escrito.

**NO SE REPARÓ NADA**, como el criterio manda. **Se convirtió en una comprobación del packet**
(paso 7), redactada **sin resultado esperado a propósito**, para que el operador mida en un solo
gesto lo que este taller no pudo medir.

---

## 9. EL DIFF — SIETE ARCHIVOS DE `cantu-studio`, MÁS EL CANÓNICO Y EL PACKET

### 9.1 Producción (5 modificados, 0 nuevos)

| Archivo | Cambio | Alcance |
|---|---|---|
| `math-authoring/inlineFormula/inlineFormulaSplice.js` | el clasificador de cuatro casos, el conjunto derivado de delimitadores, el aviso; `resolveInlineFormulaSeed` pasa a delegar; `spliceInlineFormula` escribe donde el clasificador dice | 169 → **309** líneas |
| `math-authoring/inlineFormula/InlineFormulaField.jsx` | clasifica **una vez al abrir** y guarda el plan; pinta el aviso del cuarto caso | 206 → **230** líneas |
| `math-authoring/smartFormulaField/smartFormulaFieldAdapter.js` | **+6 líneas: `export` sobre `ADVANCED_OUTER_WRAPPERS` y su comentario** | **Ni una línea de cuerpo tocada. Cero cambios de conducta.** |
| `math-authoring/inlineFormula/index.js` | barril: publica los símbolos nuevos | aditivo |
| `math-authoring/index.js` | ídem | aditivo |

**El patrón de exportar en vez de duplicar es el que este mismo run ya había usado** con
`withReplacement` y `hasMalformedLaTeX`: el vocabulario de delimitadores queda en **una sola
dirección**, y un test lo fija leyendo el archivo del adaptador.

### 9.2 Tests (1 nuevo, 1 ajustado)

| Archivo | Qué |
|---|---|
| `compiler-api/tests/webInlineFormulaSelectionRules.test.mjs` | **NUEVO, 342 líneas, 10 tests** |
| `compiler-api/tests/webInlineFormulaInserterMount.test.mjs` | **3 de sus 16 tests ajustados** (§10.2), 525 → 548 líneas |

### 9.3 Lo que NO se tocó, y es lo que el alcance protege

**`WebBlockEditor.jsx` NO se tocó: sigue en 4118 líneas**, con sus **7 usos** de
`InlineFormulaField` en las mismas líneas. La regla nueva vive entera en el módulo de empalme y
en el control; **ningún sitio de montaje tuvo que cambiar**, que es la señal de que el
envoltorio estaba bien puesto.

---

## 10. LOS TESTS

### 10.1 El archivo nuevo — 10 declaraciones, un test por caso

```bash
node --test tools/author-lite/compiler-api/tests/webInlineFormulaSelectionRules.test.mjs
```

```
✔ with no selection the inserter still writes at the cursor and changes nothing around it (4.5811ms)
✔ a selection with no delimiters is left untouched and nothing is preloaded (0.3711ms)
✔ a price is prose, not a delimiter: a single dollar sign does not send the selection to the fourth case (0.1946ms)
✔ a selection that is exactly one formula loads without its delimiters and replaces that formula (1.7726ms)
✔ the formula is recognised with whitespace dragged around it, and only the formula is replaced (0.8977ms)
✔ a mixed selection replaces nothing, preloads nothing and tells the author why (0.7623ms)
✔ the fourth case notice reaches the interface, in Spanish and on one line (0.8673ms)
✔ the operator failing case is caused by loading the delimiters, and stripping them fixes it (3.691ms)
✔ the operator failing case round-trips byte for byte through the new rule (0.3952ms)
✔ the recognised delimiter set is derived from the one module that declares it (1.2117ms)
ℹ tests 10
ℹ suites 0
ℹ pass 10
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 106.0528
```

**Cobertura contra el criterio 11, uno por caso:**

| Caso que el criterio pide | Test |
|---|---|
| sin selección | `with no selection the inserter still writes at the cursor…` |
| selección de prosa que queda intacta | `a selection with no delimiters is left untouched…` |
| exactamente una fórmula, cargada sin delimitadores y sustituida | `a selection that is exactly one formula loads without its delimiters…` |
| selección mixta que no reemplaza nada | `a mixed selection replaces nothing, preloads nothing and tells the author why` |

Los seis restantes fijan lo que el ticket manda medir y no suponer: el caso exacto del operador
(dos tests), el conjunto derivado de delimitadores, el precio como prosa, los espacios
arrastrados y el aviso en la interfaz.

**FRONTERA DECLARADA: no se ejecuta React.** Que el aviso llegue a la pantalla se afirma sobre
el **código fuente** del control, que es el método que ya usan los otros tests de esa carpeta.
Lo que el autor ve lo verifica el packet.

### 10.2 Los dieciséis del encargo anterior — **13 intactos, 3 AJUSTADOS con su porqué**

Corridos **antes** de tocarlos, la decisión del operador puso **exactamente tres en rojo**. Se
ajustaron; **ninguno se borró.**

| Test | Qué afirmaba | Qué se hizo, y por qué |
|---|---|---|
| `a multi-word selection is preloaded verbatim and replaced by the formula` → renombrado a **`a multi-word prose selection is NOT preloaded and is left untouched`** | «la selección, sea la que sea, se precarga verbatim y se sustituye» — sobre `la mitad`, que es **el caso exacto que la QA reprobó** | **INVERTIDO sobre la MISMA entrada.** La regla que fijaba acaba de cambiarla el operador. Lo que antes debía sustituirse ahora debe quedar intacto. |
| `the single-token restriction that blocked two words is measured, and it is not on this path` | mitad medición del evaluador, mitad conclusión «dos palabras se precargan y se sustituyen igual que una» | **AJUSTADO.** La **medición del evaluador no cambia y sigue siendo cierta**; se conserva entera. Cambia la conclusión: esta vía sigue sin pasar por el evaluador, pero ahora eso significa que **inserta y deja la selección intacta**, que es una conducta distinta de la del evaluador —y sigue siendo el punto del test—. |
| `the splice reuses the exported generic replacement instead of a second implementation` | medía la reutilización sobre una selección de **prosa**, que bajo la regla anterior se sustituía | **AJUSTADO de caso, no de afirmación.** No hay un segundo empalme, y eso no cambió; lo que cambió es que la sustitución ya sólo ocurre sobre una fórmula, así que la reutilización se mide ahí. |

**Los otros trece siguieron verdes sin tocarlos.** Después del ajuste: **16 de 16 en verde.**

### 10.3 Los trece del run anterior — criterio 10

```bash
node --test tools/author-lite/compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs
```

```
ℹ tests 13
ℹ pass 13
ℹ fail 0
```

**13 de 13 EN VERDE después del cambio. Ninguno se puso rojo, así que no hay nada que reportar
por ese motivo.** Y hay una razón estructural: esta enmienda **no tocó el compilador, ni los
renderers, ni ninguno de los dos esquemas, ni el formato guardado**. Lo único que cambia es
**cuándo** el insertor sustituye; la cadena que produce es la misma que antes, envuelta por la
misma función. **Mismo valor guardado, mismo leído, misma salida compilada.**

### 10.4 Lo tocado y lo directamente relacionado — **NO la suite completa**

**16 archivos:** los dos del insertor en línea, los trece del run anterior, los del insertor y
el campo inteligente, y los de los componentes de los cinco campos.

```bash
node --test \
  tools/author-lite/compiler-api/tests/webInlineFormulaSelectionRules.test.mjs \
  tools/author-lite/compiler-api/tests/webInlineFormulaInserterMount.test.mjs \
  tools/author-lite/compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringFormulaInserter.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringSmartFormulaField.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringSmartFormulaFieldContractStability.test.mjs \
  tools/author-lite/compiler-api/tests/webRuleSmartFormulaFieldRulePilot.test.mjs \
  tools/author-lite/compiler-api/tests/webRuleMathAuthoringIntegration.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringAllowlistExpansion.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringFormulaEditorMessageAndUprightConstants.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringFormulaEditorSurfaceState.test.mjs \
  tools/author-lite/compiler-api/tests/mathAuthoringVirtualKeyboardKatexCompatibility.test.mjs \
  tools/author-lite/compiler-api/tests/webTheoryCardsRuleBoxesParitySafety.test.mjs \
  tools/author-lite/compiler-api/tests/webConceptGridSafety.test.mjs \
  tools/author-lite/compiler-api/tests/webTheoryTextBlocksSafety.test.mjs \
  tools/author-lite/compiler-api/tests/webColumnsChildExpansionSafety.test.mjs
```

```
ℹ tests 213
ℹ suites 0
ℹ pass 213
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 843.7829
```

**213 de 213 en verde. Nada verde se puso rojo.**
`eslint .` sobre `editor-ui`: **limpio, sin errores ni avisos.**
`vite build`: **correcto** (`✓ built in 893ms`), con el aviso preexistente de tamaño de chunk,
que no es de este encargo.

### 10.5 LA COMPROBACIÓN DE MORDIDA — **DOS mordidas, con su rojo y su restauración**

Se rompió a propósito, se vio el rojo y se restauró.

**MORDIDA 1 — la semilla vuelve a llevar sus delimitadores** (deshacer la corrección de la QA):

```
✖ a selection that is exactly one formula loads without its delimiters and replaces that formula
✖ the formula is recognised with whitespace dragged around it, and only the formula is replaced
✖ the operator failing case round-trips byte for byte through the new rule
ℹ tests 10 | pass 7 | fail 3
```

**Muerde, y muerde sobre el caso exacto del operador.**

**MORDIDA 2 — la prosa vuelve a precargarse y a sustituirse** (la regla que el operador acaba de
sustituir):

```
✖ a multi-word prose selection is NOT preloaded and is left untouched
✖ the single-token restriction that blocked two words is measured, and it is not on this path
✖ a selection with no delimiters is left untouched and nothing is preloaded
✖ a price is prose, not a delimiter: a single dollar sign does not send the selection to the fourth case
ℹ tests 26 | pass 22 | fail 4
```

**Muerde, y muerde también en los dos tests ajustados del encargo anterior**, que es la prueba de
que el ajuste no los dejó vacíos.

**Restauración verificada byte a byte con `diff` contra el respaldo previo a las mordidas:
IDÉNTICO (diff vacío), md5 `a07d6a192532f47bf777e76b27bab52b` antes y después.** Los 213 vuelven
a estar en verde. **El respaldo vivió en el scratchpad de sesión, fuera de los dos repos.**

---

## 11. CIFRAS DEL TICKET — VERIFICADAS UNA A UNA

| Cifra | Cómo se verificó | Resultado |
|---|---|---|
| **Trece tests del run anterior** | recuento de `^test(` **y** ejecución | **CONFIRMADA — 13, y 13 en verde hoy** |
| **Dieciséis del encargo anterior** | recuento de `^test(` **y** ejecución | **CONFIRMADA — 16, y 16 en verde tras ajustar tres** |
| **Siete sitios** | recuento de las etiquetas `<InlineFormulaField` en `WebBlockEditor.jsx`: `:1162, :1874, :1914, :2468, :2630, :3981, :4076` | **CONFIRMADA — 7** |
| **Ocho colocaciones** | `COLUMN_CHILD_OPTIONS` (`:253-262`, ocho hijos, sin `details` ni `conceptGrid`) + las **dos** invocaciones de `CardFields` (`:1933`, `:3962`) | **CONFIRMADA — 8**: details 1 · callout 2 · card 2 · conceptGrid 1 · rule 2 |
| **Recuento de la suite** | recuento estático de `^test(` sobre los archivos `.test.mjs` | **35 archivos, 389 declaraciones — RECUENTO ESTÁTICO, NO resultado de ejecución** |
| **Etiquetas de plataforma** | leídas de `blockCatalog.js` por `id` | **CONFIRMADAS, las cinco** (§12) |

### 11.1 La suite — lo que afirmo y lo que no

**Recuento estático, ejecutado:** **35** archivos `.test.mjs`, **389** declaraciones `test()` a
principio de línea. Sin `t.test(` (0) ni `describe(` (0): no hay subtests que inflen la cifra.
Casa con el `379 + 10` de este encargo, y el 379 casaba con el `363 + 16` del anterior.

**NO afirmo «389 en verde».** Eso exigiría correr la suite entera, que el ticket excluye y que
`CLAUDE.md` desaconseja con talleres en paralelo. **Lo ejecutado y verde son 213 tests en 16
archivos** (§10.4).

### 11.2 Una cifra previa que se corrige de paso

`CONSTRUCCION` §12 escribió «17 ids `web-*` en `blockCatalog.js`» y el validador dice
`Component statuses: 16`. **Remedido hoy: son 17, y la razón por la que un barrido ingenuo ve 16
es que uno de ellos es kebab-case —`web-concept-grid`— y no camelCase.** La cifra previa era
correcta; el método de contarla es lo que engaña. **La discrepancia contra
`Component statuses: 16` sigue sin reparar** (§12), pero al menos ya está dicho de dónde sale.

---

## 12. EL PACKET DE QA

```
projects/cantu-studio/docs/_historical_run_record/RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001-OPERATOR-RE-QA-PACKET-SELECTION-RULES.md
```

Colocado **junto a los otros catorce packets**. **`.aiw/docs/docs_index.json` NO se tocó**, que
es lo que el ticket manda; `Docs indexed: 149` no se movió y eso es lo correcto.

**Siete comprobaciones, una por cada uno de los cuatro casos más tres.** Los **pasos de parada
van primero**, y son **los dos casos fallidos del operador, verbatim**:

- **Paso 1 (parada)** — `resultado \(12 \\ 32\) final`, seleccionando exactamente `\(12 \\ 32\)`.
  Se espera ver el editor con **dos líneas limpias `12` y `32`, sin `\(` ni `\)` dentro**, y el
  campo idéntico tras aceptar. Fallar significa que los delimitadores siguen entrando como
  contenido.
- **Paso 2 (parada)** — `El resultado es la mitad del total.`, seleccionando `la mitad`. Se
  espera el editor **completamente vacío**. Fallar significa que la prosa sigue cargándose como
  matemática.
- Pasos 3-6, uno por caso: sin selección, prosa intacta, fórmula sustituida, mixta que no
  reemplaza y avisa.
- **Paso 7 — deshacer, sin resultado esperado a propósito** (§8).

**Etiquetas de plataforma, DERIVADAS de `blockCatalog.js` y no inventadas** — se localizaron las
cinco, así que no hay ninguna que declarar como no encontrada:

| `id` en el catálogo | `label` VERBATIM |
|---|---|
| `web-details` | **Nota desplegable** |
| `web-callout` | **Nota destacada** |
| `web-card` | **Tarjeta** |
| `web-concept-grid` | **Comparador de conceptos** |
| `web-rule` | **Regla matemática** |

*(y `web-narrative` = **Texto**, el campo que deliberadamente NO tiene control.)*

---

## 13. QUÉ **NO** SE HIZO

**Por prohibición explícita del encargo:**

- **No se implementó el cuarto caso.** Su coste está medido y devuelto al operador con una
  recomendación explícita, **sin decidir** (§6).
- **No se tocó** el compilador, los renderers, los dos esquemas ni el formato del dato guardado.
- **No se tocó el control compartido de área de texto.** `TextAreaField.jsx` sigue igual, y el
  test del encargo anterior que lo fija sigue verde.
- **No se escribió la previsualización bajo el campo.** Tiene su propio run en `queue_order 28`;
  no se tocó, no se movió y no se clasificó.
- **No se implementó editar una fórmula que el autor no haya seleccionado entera.**
- **No se abrió ningún campo más de los cinco.** `narrative.text` sigue sin control, y los modos
  `code` y `persona` de la tarjeta también.
- **No se añadió ninguna dependencia.**
- **No se cambió `run_id`, `title`, `objective`, `phase`, `status`, `summary` ni `depends_on`**
  de ningún run, verificado campo a campo contra el respaldo (§2.4). **No se insertó, movió ni
  renumeró ningún run. No se clasificó ninguno.**
- **No se re-emitió `.project/`.** **No se ejecutó Git. No se levantó ningún servidor. No se
  corrió la suite completa.**
- **No se tocó `.aiw/docs/docs_index.json`**, `component_status.json`, la Definition of Done,
  los contratos ni la Guía de componentes.

**Por límite de la medición, declarado:**

- **NO SE MIDIÓ SI DESHACER FUNCIONA** (§8). Se intentaron dos vías, las dos fallaron por causas
  medidas, y **no se reparó nada**: pasó a ser una comprobación del packet.
- **No se ejecutó la interfaz.** Todo §4 y §5 es lectura de código y ejecución en Node. **No se
  abrió el editor en un navegador**, así que no afirmo nada sobre lo que se ve en pantalla.
- **No se ejecutó React en ningún test.**
- **No se ejecutó KaTeX** ni ningún parser HTML. Las fronteras de los dos runs anteriores siguen
  en pie sin cambios.
- **La suite es un recuento estático** (§11.1), no un resultado de ejecución.

**No se reparó ninguna deriva conocida:** ni el mojibake de los dos esquemas, ni los punteros
muertos, ni el CLI local de roadmap —**cuyo rechazo se midió y se rodeó, no se arregló** (§2.3)—,
ni los HTML huérfanos, ni la lección de `src/content/lecciones/` que no carga, ni los defectos
sin dueño de los componentes ya revalidados, ni el aviso de dependencia externa del validador,
ni la discrepancia de `Component statuses: 16` contra los 17 ids del catálogo (§11.2), ni el
`replacementText: '\\\\frac{}{}'` doblemente escapado de `formulaInserter.actions.js:430` que el
record anterior dejó nombrado.

**La carcasa huérfana `FormulaInserterShell.jsx` sigue con 0 importadores y no se tocó.**

---

## 14. STATUS DEL RUN — DECLARADO, NO CAMBIADO

**El run queda en `active`. Este taller NO lo cambia.** Lo cierra el operador desde la consola
global, que es el punto de serialización y la que re-emite `.project/` de forma atómica.

**Status al que debe pasar: `completed`.**

**Qué falta para llegar ahí:**

1. **Ejecutar el packet de re-QA** de §12. Siete comprobaciones; **las dos de parada van primero
   y son sus dos casos fallidos, verbatim**.
2. **Contestar el paso 7**, que es la única medición que este taller no pudo hacer: si la
   escritura de vuelta es deshacible con Ctrl+Z.
3. **Decidir sobre el cuarto caso** con el coste y la recomendación de §6 delante. **No hace
   falta decidirlo para cerrar este run**: el cuarto caso está fuera de alcance por escrito y el
   `full_description` enmendado ya dice que no se implementa y por qué.
4. **Cerrar el run desde la consola global.**

**No hay trabajo técnico pendiente dentro del alcance ampliado.** Los tres casos están
implementados, el caso exacto del operador viaja de ida y vuelta byte a byte, los trece del run
anterior siguen verdes, los dieciséis del encargo anterior siguen verdes tras ajustar tres con
su porqué escrito, y los diez nuevos muerden.

**Lo que queda FUERA y no bloquea este cierre:** la previsualización bajo el campo
(`queue_order 28`); editar una fórmula no seleccionada entera; `narrative.text`; la carcasa
huérfana; y el cuarto caso, que es del operador y no del taller.
