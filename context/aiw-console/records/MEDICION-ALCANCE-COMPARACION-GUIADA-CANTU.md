# Medición de alcance de «Comparación guiada» (`split`) — Cantu Studio

| Campo | Valor |
|---|---|
| Run | `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` |
| `queue_order` | **40** — derivado del canónico `.aiw/roadmap/roadmap.json`, no del ticket |
| Título canónico | `Decide scope and enable the Split component` |
| Status al abrir | `active` |
| Fecha | 2026-08-09 |
| Tipo de run | **Tres rondas.** 1: medición y propuesta. 2: habilitación en «Dos columnas». **3: FAIL del operador con tres peticiones — mitad A (fórmula por paso) y mitad B (ancho completo), con parada obligatoria entre ellas, levantada por adenda** |
| Entregable | `docs/_historical_run_record/RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001-OPERATOR-QA-PACKET.md` — informe de opciones **ampliado a 38 checks** |
| Código modificado | Ronda 1: **ninguno**. Ronda 2: **dos archivos** del editor (§8). **Ronda 3: doce** — cinco en la mitad A (§10), siete más en la B (§11) |
| Suite | Ronda 1: **437/437**. Ronda 2: **437/437**. Mitad A: **437/437**, un censo re-anclado (§10.5). **Mitad B: 438/438**, las dos pruebas del alcance reescritas (§11.5). Lint `exit 0`, build `exit 0` en todas |
| Veredicto | Ronda 1: `BLOCKED_ON_OPEN_DECISION`. Ronda 2: `READY_FOR_OPERATOR_QA`. **Ronda 3: `READY_FOR_OPERATOR_QA`** |

> **Este record tiene tres rondas y las tres siguen vigentes.** Las secciones 1 a 7 son la
> medición de la ronda 1 y **se conservan enteras**: son la medida del estado *antes* de
> habilitar y la razón por la que se eligió esta salida. La **sección 8** registra la decisión
> del operador y lo que la ronda 2 ejecutó. La **sección 10** registra el cambio de alcance y la
> **mitad A**; la **sección 11**, la **mitad B**.

## Guarda de coordenadas

El ticket avisaba de dos movimientos de cola en el día y exigía derivar del canónico. Hecho:
`objectives[2].phases[2].runs[10]` da `queue_order` **40**, `run_id`
`RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001`, `title` `Decide scope and enable the Split
component`, `status` `active`. **Coincide en los tres campos.** No se tecleó el `run_id`: se
obtuvo recorriendo el árbol y filtrando por `queue_order`.

Las coordenadas del propio `full_description` del run **están vencidas y se remidieron**: dice
`compiler.js:640-641` (hoy `:681-682`), `compiler.js:1225` (hoy `:1322-1323`),
`draftSchema.js:868` / `:840` (hoy `:897` / `:869`) y «suite de 350» (hoy **437**). Siguen
válidas: `compiler.js:66` y `blockCatalog.js:872-873`. Las del ticket de este encargo
—`~:1321-1322`, `~:866`, `~:937`, «250 líneas»— **son exactas** y corresponden al gemelo
`editor-ui`.

---

## 1. Inventario medido

Todo contado en disco hoy; nada heredado del ticket ni de records anteriores.

| Pieza | Ruta | Medida |
|---|---|---|
| Renderer Web | `src/builders/web/partials/renderSplitCard.js` | **250 líneas** |
| Renderer Slides | `src/builders/slides/components/renderSplitCard.js` | **194 líneas — huérfano**: `SlideItemSchema` (`draftSchema.js:1063-1069`) admite cinco tipos y ninguno es `split` |
| Esquema (editor-ui) | `.../editor-ui/src/schemas/draftSchema.js` | `SplitRowSchema` `:821`, `SplitStepSchema` `:838`, `SplitGridStepSchema` `:851`, `WebSplitColumnsChildSchema` **`:866-925`**, unión de hijos de columna **`:937`**, `WebBlockSchema` `:1011-1028` **sin `split`** |
| Esquema (compiler-api) | `.../compiler-api/schemas/draftSchema.js` | gemelo literal: `:894-953`, unión `:965`, `WebBlockSchema` `:1039` **sin `split`** |
| Compilador — validación | `.../compiler-api/services/compiler.js` | `assertSafeSplitText` `:632-668`, `assertBoundedSplitShape` `:670-746`, `buildSplitOutput` `:748-795` |
| Compilador — compuerta de colocación | ídem | **`:1321-1324`**; permiso inyectado por `columns` en **`:1293`** |
| Compilador — compuerta de variante | ídem | `SPLIT_VARIANT_VALUES` `:66`, uso `:681`, error `:682` |
| Compilador — compuerta de modo | ídem | `SPLIT_MODE_VALUES` `:67`, uso `:677`, error `:678` |
| Compilador — límites | ídem | `:56-65` — 4 filas, 6 pasos, título 120, entradilla 260, etiqueta 80, valor 140, marca 32, pie 100, título de celda 80, fórmula 360 |
| Editor | `.../components/web/WebBlockEditor.jsx` | **~524 líneas**: `:360-370`, `:1350-1851`, rama `:2057-2067` |
| Catálogo | `.../constants/blockCatalog.js` | `WEB_COMPONENT_UI.split` `:108-113` (`rail: false`, `category: 'math'`); item `web-split` `:866-889` con `disabled: true` `:872` y razón `:873` |
| Fábrica | `.../utils/blockFactory.js` | `createDefaultWebBlock` **sí** tiene `case 'split'` `:252-265`; `createDefaultWebColumnChild` (`:271`) **no** |
| Pruebas propias | `.../tests/webTheoryComplexSplitSchemaCompiler.test.mjs` | **10 pruebas**, 379 líneas |
| Fixture | `src/content/sandbox/test_theory_complex.js` | **6 bloques**, tres parejas, `:22, :32, :55, :67, :85, :95` |
| Packet canónico | `docs/components/web/SPLIT.md` | 74 líneas, «Last verified: 2026-07-12» |

**Doce campos de autor**, idénticos en los tres sitios (los dos gemelos y `assertOnlyKeys` en
`compiler.js:671-675`): `kind`, `mode`, `variant`, `title`, `description`, `textScale`, `rows`,
`steps`, `gridSteps`, `footer`, `result`.

### 1.1 Cómo se inserta hoy — el hallazgo del inventario

**No se inserta. No hay ninguna vía de interfaz, ni siquiera dentro de «Dos columnas».**

- Nivel superior: el item del catálogo va `disabled: true` (`blockCatalog.js:872`) y el picker
  desactiva el botón (`ComponentPicker.jsx:190, 197-201`).
- Dentro de «Dos columnas»: `COLUMN_CHILD_OPTIONS` (`WebBlockEditor.jsx:264-274`) tiene nueve
  entradas y **`split` no está**; y `createDefaultWebColumnChild` **tampoco tiene caso `split`**,
  de modo que `appendChild('split')` devolvería `null` y saldría sin hacer nada
  (`WebBlockEditor.jsx:2202-2204`).
- **Única entrada real:** «Insertar JSON» (`CenterWorkspace.jsx:84-90` → `JsonImportModal` →
  `jsonImporter.js:209`), pegando un `columns` que ya lleve el hijo. Valida contra
  `WebBlockSchema`, que admite `columns`, y `columns` arrastra a sus hijos por
  `WebColumnsChildSchema`. Fijado por prueba en `:118-137` del test propio.

**Esto es deliberado y está registrado**, no es un olvido: el packet archivado
`PASS-FUTURE-WEB-COMPONENT-SPLIT-HUMAN-QA-PACKET.md` (2026-06-22) lo pide como comprobación
(`:204`) y lo declara explícitamente (`:221`, *«UI absence from the add menu is preserved and
not treated as a bug»*).

**Consecuencia para la fila del registro:** el ticket decía «hoy solo existe dentro de Dos
columnas». Es cierto para el esquema, el compilador y el renderer; **es falso para el editor**,
donde no existe en ninguna parte como acción. **Manda el código.**

---

## 2. La razón de la compuerta — SÍ está escrita, en tres sitios

El criterio 3 pedía buscarla y declararlo si no aparecía. Aparece, y coincide con la medición.

**Razón registrada 1 — el motor no la sabe despachar fuera de una columna.**
`docs/components/web/SPLIT.md:37`: *«the dispatcher looks for `renderSplit`, which does not
exist. This traceability note preserves why split is columns-only.»* Y con más detalle en
`docs/archive/author-lite/sandbox/WEB_COLUMNS_SPLIT_CHILD_COMPATIBILITY_CONTRACT_AUDIT.md:39,
72, 80-84, 334, 428, 444, 658`.

**Razón registrada 2 — el diseño es de pareja.** El script del renderer iguala la altura de las
cabeceras de todas las tarjetas de un mismo `.j-columns-wrapper`
(`renderSplitCard.js:164-178`), y `renderColumns.js:138` fuerza `height: 100%` a los hijos
directos de columna. Fuera de una columna las dos piezas se apagan.

**Razón registrada 3 — contención deliberada.** Aviso ámbar en el editor
(`WebBlockEditor.jsx:1439-1443`) y razón declarada en el catálogo (`blockCatalog.js:873`).

**Verificado ejecutando el motor, no leyendo:** un `split` a nivel superior en el motor real
(`buildSingleWebLesson`) da, medido por composición del HTML de salida:

```
modo rows      -> se pinta como TABLA (sale j-rtable-root), sin aviso
modo steps     -> NADA. cuerpo identico al de una leccion vacia
modo gridSteps -> NADA. cuerpo identico al de una leccion vacia
control: el mismo par dentro de columns -> j-split-top + j-split-math-container presentes
```

**Corrección al packet canónico**, declarada y enrutada, no reparada: `SPLIT.md:37` dice
«produces no output»; eso es cierto para `steps` y `gridSteps`, **falso para `rows`**, que cae
en el atajo `if (data?.rows) return engine.renderTable` (`buildSingleWebLesson.js:97`). La
diferencia es de pérdida silenciosa a **componente equivocado**, y no está escrita en ninguna
parte.

### 2.1 Hallazgo de pérdida de contenido — declarado, no reparado

`buildSingleWebLesson.js:137-143`: si no hay renderer, el bloque **se descarta en silencio**
(un `if` sin `else`); si el renderer lanza, el error **se traga** con un `catch` vacío. En
cambio `previewRenderer.js:287-289` **sí** pinta un recuadro rojo en el mismo caso. **Vista
previa real y Compilar Web no coinciden ante un bloque sin renderer**, aunque el procedimiento
de revalidación (§3.4) afirma que coinciden por construcción.

Hoy la compuerta `allowSplit` impide que `split` llegue ahí, y ningún otro `kind` admitido por
`WebBlockSchema` carece de renderer —`split` es el único tipo emitible cuyo nombre no resuelve—.
Por eso **no es un defecto vivo**, pero es el precio real de la opción B y un riesgo latente
general. Este run **no lo repara**: cambiar una línea está fuera de alcance.

---

## 3. Contratos, con su clase

**Color — `COLOR_PALETTE_VARIANT_OR_TOKEN_ONLY`.** Un solo campo, `variant`, enum cerrado de
tres (`draftSchema.js:869` / `:897`). La paleta de autor tiene **nueve** tokens
(`colorSystem.js:44-132`): admite 3, **rechaza 6**. El compilador emite el identificador crudo
(`compiler.js:753`), sin `resolveVariantColorToken` ni
`resolvePaletteColorTokenIfDefined`, y **sin emitir `color`**. El renderer resuelve contra los
mapas fijos de `commons.js` (`renderSplitCard.js:8-10`) y **escribe a mano** el verde del
resultado (`:98`, `:138`), que el autor no puede tocar. El control del editor es un `<select>`
liso de tres opciones (`WebBlockEditor.jsx:366-370, 1785-1791`), **no** el
`ColumnColorSelectField` compartido. Doble compuerta con listas literales duplicadas en tres
archivos.

**La compuerta de variante del compilador (`:682`) sigue sin ninguna prueba que la ejercite**,
tal como midió `RETIRO-RUN-COMPUERTAS-VARIANTE-CANTU` por cobertura real. Remedido por lectura
exhaustiva de los dos únicos sitios que compilan `split`: las diez pruebas propias usan
`ctx`/`focus`/`wrn`, y la única que afirma que el conjunto sigue cerrado
(`webAuthorPaletteDerivedRolesAndCustomHex.test.mjs:308-321`) lo hace **contra el esquema** y
con el bloque **a nivel superior**, donde ya sería rechazado por otro motivo.

**Math — `MATH_FORMULA_CONDITIONAL_OR_BOUNDED`.** Tres campos —`steps[].math`,
`gridSteps[].math`, `result`—, **ninguno en modo `rows`**. Superficie B, texto opaco acotado
(máx. 360). **Sin editor visual de fórmulas** (siguen siendo `<input>` crudos,
`WebBlockEditor.jsx:1821`) y **sin insertor en línea en ningún campo de prosa**: la entradilla
es un `<textarea>` liso (`:1797-1802`) y `InlineFormulaField` no se monta en ninguna parte del
editor de `split`. Los delimitadores los pone el renderer, `\[ … \]` en `:91`, `:105`, `:130` y
`:145`.

**Y aquí `split` se porta mejor que sus hermanas**: el compilador **quita** los delimitadores en
línea (`stripInlineMathDelimiters`, `:774, 778, 786, 790`) **y rechaza** los de display
(`:660-662`). **No hay doble envoltura**, a diferencia de `arithmetic` y `timeline`. Rechaza
además configuración de MathJax/KaTeX (`:664-666`) y escapa las once salidas.

*(Falso positivo que conviene dejar anotado: el `'split'` de
`math-authoring/constants.js:290` es el entorno LaTeX `\begin{split}`, no el componente.)*

---

## 4. Corpus, recorrido programáticamente

| Dónde | Bloques | Fuera de columna |
|---|---:|---:|
| Borradores guardados (`src/content/author_lite/drafts/`, 10 archivos, 10 parseados) | **0** | 0 |
| Fixture `test_theory_complex.js` | **6** | **0** |
| Evidencia `QA/temp/` (12 artefactos: draft, roundtrip, jame-data, snapshot, generated) | **6 en cada uno** | **0 en todos** |

**Cero fuera de una columna en todo el repositorio.** No hay hallazgo de imposible: la compuerta
se sostiene. Reparto de modos en el fixture: `rows` ×2, `steps` ×3, `gridSteps` ×1. Colores:
`ctx` ×3, `focus` ×2, `wrn` ×1 — **los tres que admite**. Coincide con lo que ya había medido
`UNIFICACION-SELECTOR-COLOR-WEB-Y-COMPUERTA-DEL-COMPILADOR-CANTU:484`.

---

## 5. Las cuatro salidas, con coste medido

| | Coste de código | Pruebas a tocar | JAME Core | ¿Ejecutable bajo el criterio 11? |
|---|---|---|---|---|
| **A. Dejarlo** | 0 | 0 | no | sí |
| **B. Nivel superior** | 9 capas, incl. rediseño de 2 de 3 modos | **2** | **sí, obligatorio** | **NO** |
| **C. Retirarlo** | ~1.000 líneas en 6 archivos + fixture + 12 artefactos | 10 (borrar) | no | sí, pero irreversible |
| **D. Hijo de «Dos columnas»** | **~15 líneas en 2 archivos** | **0** | no | **sí** |

**Opción B, la medición que demuestra que es imposible bajo este encargo.** Dos pruebas afirman
exactamente la compuerta que B retira y se pondrían rojas:
`webTheoryComplexSplitSchemaCompiler.test.mjs:114-115` (el esquema rechaza a nivel superior) y
`:325-329` (el compilador lanza *«solo se permite como child directo de Columns»*). El criterio
11 prohíbe tocar pruebas. Además exige tocar JAME Core, prohibido por CLAUDE.md sin instrucción
explícita.

**¿El renderer sirve a ancho completo?** Medido sobre el renderer: **1 de 3 modos**.
`gridSteps` ya es rejilla de dos columnas (`:135`) y aguanta. `steps` centra cada fórmula en el
renglón entero (`:89`) y el autoajuste **solo encoge, nunca agranda** (`:194`). `rows` usa
`space-between` (`:45`) y separa etiqueta y valor a los extremos. Y en los tres, el igualado de
alturas (`:166`) y el `height: 100%` (`:225`) quedan inertes fuera de la columna: **la premisa
de pareja desaparece**.

**Opción C, la pregunta del ticket contestada.** ¿Aporta sobre «Dos columnas» con dos
«Tarjeta»? **`rows`: casi nada** —«Tabla» ya es hijo de columna, ya da pares etiqueta-valor con
marca, y además resuelve su color contra la paleta activa; solo pierde la píldora de pie—.
**`steps` y `gridSteps`: sí, y sin sustituto** — «Tarjeta» **no tiene ningún campo de fórmula**
y «Regla matemática» da **una** fórmula, no una escalera numerada con resultado destacado.
Forma de vocabulario para retirar: `completed` con la razón en `closeout_result`, precedente
`D-048` y `RUN-CANTU-COMPILER-VARIANT-GATES-001`.

**Opción D, la cuarta que se propone.** Habilitarla donde ya funciona:
`COLUMN_CHILD_OPTIONS` (1 línea) y `createDefaultWebColumnChild` (~14 líneas, copiables del caso
que ya existe en `blockFactory.js:252-265`). Cero cambios en esquemas, compuerta, renderer y
motor: `columns` ya inyecta `allowSplit` (`compiler.js:1293`), `renderColumns.js:50` ya lo
enruta, y `webTheoryComplexSplitSchemaCompiler.test.mjs:170-190` ya prueba que se pinta bien
ahí. **Cero pruebas afirman su ausencia del menú** — verificado sobre las 38.

**Verificado ejecutando**: el bloque por defecto que ya produce
`createDefaultWebBlock('split')` valida contra `WebDraftSchema` como hijo de columna y compila a
`{"type":"split", …}` sin tocar nada, y es rechazado a nivel superior. El acabado que falta es
de rótulos —el editor dice «Mode», «Variant», «Rows», «Result nested» y muestra un aviso de
ingeniería— y toca un solo archivo.

**Recomendación entregada al operador: opción D.** Está en §12 del informe, con sus cinco
razones medidas. No decide nada: el alcance es suyo.

---

## 6. Divergencias declaradas y enrutadas, no reparadas

1. **`buildSingleWebLesson.js:137-143`** descarta en silencio y se traga errores; diverge de
   `previewRenderer.js:287-289`. §2.1.
2. **`docs/components/web/SPLIT.md:37`** dice «produces no output» para todo nivel superior;
   en modo `rows` produce **una tabla**. Superficie del carril DOCUMENTATION.
3. **`REFERENCE-WEB-COMPONENT-COLOR-AND-MATH-INVENTORY.md`** cita `compiler.js:1151-1152` (hoy
   `:1322-1323`) y `:651` (hoy `:753`); su renglón de math nombra `renderSplitCard.js:91,130` y
   omite `:105` y `:145`.
4. **`.aiw/state/component_status.json`**, entrada `split`: `docs_status:
   HUMAN_QA_PACKET_READY` apunta a un packet **archivado** de 2026-06-22. **No existía ningún
   packet de operador** en `docs/_historical_run_record/` antes de este run.
5. **`full_description` del run** en el canónico: coordenadas y cifra de suite vencidas
   (Guarda de coordenadas). El procedimiento gobierna; no se enmienda ningún texto de run.
6. **Renderer Slides huérfano**: 194 líneas en `src/builders/slides/components/renderSplitCard.js`
   sin ninguna vía desde Author Lite.

## 7. Sin reclamos de la ronda 1

- **Cero líneas modificadas** en código, esquema, compuerta, renderer y pruebas. Árbol de
  trabajo intacto. *(Lo que la ronda 2 sí cambió está en §8.)*
- **Suite 437/437**, lint `exit 0`, build `exit 0`, medidos **sin haber cambiado nada**: son la
  línea base, no el resultado de una reparación.
- **Este record no certifica nada y no cambia ningún status.** La matriz sigue siendo la fuente
  única.
- **No se tocó `.project/`, ni el `status` del run, ni git, ni el orden de la cola.** La cabina
  cierra.

---

# RONDA 2 — La habilitación

## 8. La decisión del operador y lo que se ejecutó

**El operador eligió la opción D de §5: «Comparación guiada» se habilita como hija de «Dos
columnas». No se abre al nivel superior.** La medición de que la opción B es imposible bajo el
criterio de suite intacta —dos pruebas afirman la compuerta— queda aceptada y registrada.

### 8.1 El reencuadre del operador, que corrige el §4 de la ronda 1

La ronda 1 midió que el nombre «Comparación guiada» solo se sostiene en pareja, porque una
tarjeta sola no compara nada. **El operador reencuadró la pieza, y el encuadre es mejor:**

> **El componente no impone una comparación. Es una tarjeta con una escalera de pasos. Que haya
> una a cada lado, o solo a la izquierda, o una y otro componente enfrente, lo decide «Dos
> columnas», no ella.**

Con ese encuadre, la medición del §4 no se cae: sigue siendo cierto que el nombre describe lo
que hacía el archivo —`renderSplitCard.js`, la mitad de un split— y no lo que hace la pieza. Lo
que cambia es la conclusión: **eso es un problema de nombre, no de colocación**, y por eso la
pieza encaja como hija de columna sin anidar nada ni exigir pareja. **El renombrado queda
enrutado; este run no lo toca**, porque el ticket lo pone fuera de alcance explícitamente.

### 8.2 El botón: dos altas, dos archivos

| Lista | Antes | Después | Sitio |
|---|---:|---:|---|
| `COLUMN_CHILD_OPTIONS` | **9** | **10** | `WebBlockEditor.jsx:264` |
| `createDefaultWebColumnChild` | **9** | **10** | `blockFactory.js:271` |

**Correspondencia medida antes y después:** cero botones sin fábrica, cero casos de fábrica sin
botón, en los dos momentos. **Respuesta a la pregunta del ticket sobre un tercer componente con
el hueco de `#38`: no lo hay.** Antes de este cambio las dos listas ya estaban emparejadas
—«Recurso visual» fue el último en cerrarse, en `#38`—, y este run abre la décima entrada
cerrando su caso en la misma tanda.

**Posición elegida: la última.** Razonada, porque la lista no sigue orden alfabético ni el del
catálogo (`WEB_COMPONENT_UI`). Su única regularidad medida es que el hijo admitido más
recientemente queda último. Apendizar **no desplaza a ninguna de las nueve** que el autor ya
tiene aprendidas; meterla junto a «Regla matemática» habría movido cinco.

**Modo de fábrica: `steps`, no `rows`.** Razón medida en §5 de la ronda 1: en `rows` este
componente es una «Tabla» peor; la escalera numerada con resultado destacado no la hace ningún
otro. El primer bloque que ve el autor debe ser aquello para lo que la pieza es única.

**Verificado ejecutando, con el caso nuevo puesto:** la fábrica devuelve un bloque que valida
como hijo de columna (`true`) y compila a `{"type":"split", …}` sin `kind` y sin `mode`; el mismo
bloque a nivel superior sigue rechazado por el esquema (`false`) y por el compilador
(`[Compiler] Split Web solo se permite como child directo de Columns.`). **La compuerta está
intacta.**

**Divergencia declarada, no reparada:** las dos fábricas ahora difieren — la de nivel superior
(`blockFactory.js:252`) sigue produciendo `rows`. No se tocó a propósito: es código inalcanzable
mientras su item de catálogo siga deshabilitado, y estaba fuera del alcance.

### 8.3 Los 24 rótulos traducidos

El ticket nombraba seis y pedía barrer el componente entero. **El barrido encontró 24**, todos
dentro de «Comparación guiada». **Ningún otro componente cambia de rótulo.**

**Los seis nombrados:**

| Antes | Después | Criterio |
|---|---|---|
| `Mode` | «Qué muestra la tarjeta» | Nombra la elección, no el campo |
| `Variant` | «Color» | El nombre que usan los demás componentes |
| `Title` | «Título» | — |
| `Description` | «Descripción (opcional)» | El esquema la tiene opcional |
| `Footer` | «Conclusión (opcional)» | Medido en `renderSplitCard.js:55-62`: píldora del color de la tarjeta, al final |
| `Result nested` ×2 | «Resultado final (opcional)» | Medido en `:97-109` y `:137-149`: renglón con borde verde y ✓, fórmula mayor y en negrita. **Rótulo tomado de «Factorización»** (`WebBlockEditor.jsx:3547`), que ya llamaba así a lo mismo — no se inventa vocabulario |

**Los tres valores de modo**, que salían como identificadores crudos: `Rows` → «Pares de datos»,
`Steps` → «Pasos en lista», `Grid steps` → «Pasos en rejilla». Nombrados por lo que pinta el
renderer (`:36`, `:68`, `:115`), no por el identificador del esquema.

**Los tres valores de color, que es el cambio con más consecuencia:** `Contexto` → **«Azul»**,
`Foco` → **«Dorado»**, `Cuidado` → **«Naranja»**. **No es traducción, es corrección de
inconsistencia:** la paleta de autor llama a esos tokens Azul, Dorado y Naranja
(`colorSystem.js:55, :77, :108`) y es lo que el autor ve en el «Color» de cualquier otro
componente. Antes, el mismo dorado se llamaba «Foco» aquí y «Dorado» en «Tabla». Y los tres
tonos **coinciden exactamente** con los que pinta el motor para este componente
(`commons.js:53, :58, :63`), así que el nombre no promete un color distinto del que sale.

**Los once restantes:** `Rows` → «Filas»; `Label` → «Nombre»; `Value` → «Valor»; `Badge` (filas)
→ «Etiqueta», la palabra que el editor ya usa para lo mismo; `Steps` → «Pasos»; `Badge` (pasos)
×2 → «Número», medido en `:78-86` (círculo con el número, gris cuando es 0); `Math` ×2 →
«Fórmula»; `Grid steps` → «Pasos en rejilla»; `Grid step {n}` → «Paso {n}»; `Title` de celda →
«Rótulo (opcional)», medido en `:126`; `Text scale` → «Escala del texto», con ayuda nueva.

**Tres botones y cinco textos de ayuda** perdieron la jerga del esquema: «+ Agregar fila split»
→ «+ Agregar fila», «+ Agregar grid step» → «+ Agregar paso», y las ayudas ya no dicen
`gridSteps`, `Title`, `math`, `runtime config` ni «Result es subcampo de split».

**El aviso ámbar se retiró y el `const` se renombró** (`SplitBoundedNotice` →
`SplitPlainTextNotice`). Su texto —«Soporte sandbox-only bounded para theory_complex dentro de
Columnas Web»— describía exactamente el estado que este run acaba de retirar: mantenerlo sería
dejar en pantalla algo **falso**. En su lugar queda una nota gris con lo único cierto que el
autor necesita: la tarjeta ocupa una columna y sus campos solo admiten texto.

**Estilo declarado:** los rótulos nuevos llevan acentos correctos, mientras varios vecinos los
escriben sin acento por herencia. **No se normalizaron los ajenos** —el ticket lo prohíbe— y no
se ven juntos: al editar una «Comparación guiada» solo salen sus rótulos.

### 8.4 Lo que no se tocó, y el corpus

`git diff --name-only` filtrado por `schemas/`, `services/`, `src/builders/` y `tests/` devuelve
**NINGUNO**. Diff total: **2 archivos, 88 inserciones, 40 eliminaciones.**

**Corpus remedido después del cambio**, con el mismo recorrido programático de §4:

| Dónde | Bloques | Fuera de columna |
|---|---:|---:|
| Borradores guardados (10 archivos) | **0** | 0 |
| Fixture `test_theory_complex.js` | **6** | 0 |
| Evidencia `QA/temp/*.json` (12 artefactos) | **72** (6 por artefacto) | **0** |

**Ninguno cambia de aspecto, medido y no supuesto:** los tres bloques `columns` de la evidencia
que llevan los seis `split` **compilan hoy con salida idéntica byte a byte** a la guardada en
`sandbox_theory_complex.web.jame-data.json`.

**Hallazgo lateral, declarado y no reparado:** el borrador de evidencia **completo** ya no valida
hoy. Su `webBlocks[5]` es un `callout` con `colSpan: 2` dentro de un `columns` de una sola
columna —forma nativa de Core que el esquema de Author Lite nunca admitió—. **Es anterior a este
run y no tiene relación con `split`.**

## 9. Sin reclamos de la ronda 2

- **Dos archivos modificados, los dos del editor. Ninguna prueba.** Suite **437/437**, lint
  `exit 0`, build `exit 0`.
- **Ni el esquema, ni el compilador, ni el renderer, ni la compuerta `allowSplit`.** El nivel
  superior sigue rechazado por las dos capas, verificado por ejecución.
- **Ningún otro componente cambió de rótulo.**
- **Este record no certifica nada.** El veredicto `READY_FOR_OPERATOR_QA` significa que el packet
  está preparado, no que la pieza esté aprobada. **La QA humana la ejecuta el operador.**
- **Enrutados, sin tocar:** el renombrado del componente, la familia de fallos silenciosos
  (§2.1), los punteros vencidos (§6), la divergencia entre las dos fábricas (§8.2) y el borrador
  de evidencia que ya no valida (§8.4).
- **No se tocó `.project/`, ni el `status` del run, ni git, ni el orden de la cola.** La cabina
  cierra.

---

## 10. Ronda 3 — el operador cambió su propia decisión de alcance

### 10.1 La decisión, y que es exactamente para lo que existe este run

El operador dio **FAIL con tres peticiones** sobre la ronda 2, y la tercera **revierte su propia
elección de la ronda 2**: quiere que «Comparación guiada» **también funcione a ancho completo**,
como cualquier otro componente. Es decir, la **opción B** de §5, la que la ronda 1 midió como la
cara.

**Esto no es una contradicción del run: es su función.** El título canónico es *«Decide scope
and enable the Split component»*. Un run que decide alcance existe precisamente para que el
alcance pueda cambiar de opinión mientras está abierto.

**Se le declaró el coste medido antes de ejecutarlo** —nueve capas, dos pruebas, entrada en JAME
Core y el rediseño de dos de los tres modos— **y respondió «ahora»**. La medición de §5 de que
la opción B era «imposible bajo el encargo de la ronda 1» **sigue siendo correcta para aquel
encargo**: lo que cambió no es la medida, es el encargo.

**El encargo de la ronda 3 tiene dos mitades con una parada obligatoria entre ellas.** Esta
sección registra la **mitad A**. La mitad B no ha empezado.

### 10.2 Mitad A — el campo inteligente frente al insertor en línea

El defecto: **el autor no podía insertar fórmulas en los pasos.** Los tres campos de math
—`steps[].math`, `gridSteps[].math` y `result`— eran cajas de texto donde había que teclear
LaTeX a mano.

**El aviso del operador llegó antes del defecto y era correcto.** Verificado en disco:

| | Insertor en línea | **Campo de fórmula inteligente** |
|---|---|---|
| Qué escribe | `\( … \)` **dentro de un texto** | **LaTeX pelado, sin delimitadores** |
| Para qué campos | Los cinco de prosa fijados por prueba | Campos que son *solo* fórmula |
| ¿Alguno es de `split`? | **Ninguno** | **Los tres lo son** |

`renderSplitCard.js` ya envuelve en `\[ … \]` en **`:91`, `:105`, `:130`, `:145`** —las cuatro
coordenadas del ticket, exactas— y el esquema ya rechazaba `\[` y `\]` en **`:248`** y **`:257`**
de los **dos** gemelos, pero **no** `\(` ni `\)`. Montar el insertor en línea habría producido
`\[ \(x\) \]`. **Es lo mismo que le pasó a «Factorización».**

El campo inteligente **lo hace imposible por construcción**, que es mejor que taparlo con otra
validación — aunque la validación también se puso, como cinturón (§10.4).

### 10.3 Por qué un adaptador hermano y no una generalización

El criterio 2 pedía medir si `normalizeRuleMathForRender` servía tal cual, si hacía falta un
hermano, o si convenía generalizarlo. **Medido: hermano.**

| | `rule` | `split` |
|---|---|---|
| Qué guarda en el Draft | **Objeto** — `mathBlockGroup` o `mathNode` (`ruleSmartFormulaPilot.js:17`) | **String** — `z.string()` en los dos esquemas (`:245`, `:251`) |
| Qué espera el motor | `renderRule` lee la forma normalizada | `renderSplitCard` **interpola el valor crudo** en el HTML |
| Formas que acepta al leer | string, `MathNodeV1`, `MathBlockGroupV1`, `RichTextV1` | string y nada más |

Un objeto en `steps[].math` **ni valida ni renderiza**. Y **generalizar
`normalizeRuleMathForRender` habría cambiado la conducta de «Regla matemática»** —aplica
`wrapRuleRenderLatex` y su fallback textual propio—, **cuya QA está cerrada**: el ticket ordenaba
parar en ese caso, y no se llegó a ese caso porque la salida correcta era otra.

Alta: **`smartFormulaField/splitSmartFormulaPilot.js`**. Mismo mecanismo que el de `rule` —previa
visual, botón «Insertar fórmula»/«Editar fórmula», modal, desplegable «LaTeX textual avanzado»—
pero devolviendo **siempre string de LaTeX pelado**. **No importa nada de
`ruleMathAdapter.js`**: solo primitivas puras compartidas (`getMathBlockGroupRenderLatex`,
`resolveSmartFormulaRenderLatex`). **Cero líneas de «Regla matemática» tocadas.**

**Un hallazgo que obligó a poner guarda propia:** `validateLatexPayload`, el sanitizador
compartido, **no rechaza delimitadores** — acepta `\[ x \]` y `\( x \)` como texto LaTeX válido,
medido por ejecución. Por eso `rule` lleva su comprobación propia en `ruleMathAdapter.js:45`. El
hermano lleva la suya, ampliada al par en línea.

**Multilínea, decidido y declarado:** si el autor añade líneas, se guarda la forma de render
(`\begin{aligned} … \end{aligned}`), no el join plano con `\\`. Misma política que `rule` y por
la misma razón: dentro de `\[ … \]` un `\\` de nivel superior sale «pelado». Coste conocido: el
round-trip devuelve esa fórmula como **una** línea con su entorno, no como N líneas separadas.
Es consecuencia del esquema `z.string()`, no del control.

### 10.4 Cero delimitadores duplicados, y el corpus

Ejecutado de punta a punta. **Guardada:** `\frac{5}{7}` — cero delimitadores. **Compilada:**
`\[ \frac{5}{7} \]` — **un solo par**. Contado sobre los cuatro campos de math de la lección de
prueba: 4 aperturas / 4 cierres → **1 par por campo**. No aparecieron dos pares.

Cinturón puesto en los **dos** `draftSchema.js`, mismo patrón que «Factorización» (`:448-449` en
`compiler-api`, `:445-446` en `editor-ui`): `\(` y `\)` rechazados junto a `\[` y `\]`, tanto en
el validador obligatorio como en el opcional. Verificado en los dos gemelos, incluido el caso
parcial `a \(b\)` que antes se colaba.

**Corpus, barrido programáticamente antes de blindar:** 173 JSON, **72 bloques `split`**, **204
campos de math**, **0** con `\( \)` y **0** con `\[ \]`. **Ningún borrador existente se rompe.**
No hizo falta parar.

### 10.5 La prueba re-anclada — AUTORIZADA por el operador, con la cita de git

`mathAuthoringFormulaEditorSurfaceState.test.mjs:254` se puso roja. **Clasificada como censo de
texto fuente, no como conducta.** El operador **verificó la clasificación de forma
independiente y la autorizó**, con una condición: que el record deje la cita de git, para que
el próximo que lea esa prueba no herede el error. Es esta:

```
git show HEAD:tools/author-lite/editor-ui/src/features/editor/components/web/WebBlockEditor.jsx
  | grep -n 'COLUMN_TEXTAREA_CLASS} font-mono'
1622:                    className={`${COLUMN_TEXTAREA_CLASS} font-mono`}
1724:                  className={`${COLUMN_TEXTAREA_CLASS} font-mono`}
```

Con `HEAD` en `43a2d85`, las **únicas dos** ocurrencias del patrón estaban en `:1622`
—`SplitStepsFields`— y `:1724` —`SplitGridStepsFields`—, **los dos textarea de fórmula de
`split`**, justo los que este encargo convierte al campo inteligente.

> **El comentario de la prueba, que atribuía esas dos ocurrencias a *arithmetic* y *timeline*,
> era FALSO ANTES de este run.** Esos dos componentes escriben su clase literal propia, con su
> `font-mono text-sm` en línea, y no se tocaron. Quien lea esa prueba en el futuro debe saber
> que la cifra nunca midió lo que su comentario decía.

Lo que la prueba protege de verdad —que la clase compartida no se lleve `font-mono` ni
`text-base` pegados— lo siguen fijando sus dos `assert.match` anteriores, que no cambian. Cifra
re-anclada a **0**, comentario corregido en el propio archivo, censo vivo: si alguien vuelve a
colgar un campo de ese patrón sobre la clase compartida, salta otra vez.

### 10.6 Estado al llegar a la parada

- **Cinco archivos**: alta del hermano, `WebBlockEditor.jsx`, los dos `draftSchema.js`, el censo.
- **Suite 437/437**, lint `exit 0`, build `exit 0`.
- **Nada del nivel superior tocado**: ni compilador, ni renderer, ni `allowSplit`, ni catálogo,
  ni fábricas, ni el despachador de Core, ni las dos pruebas del criterio 7.
- **Referencia del criterio 9 capturada**: los tres `columns` con `split` del borrador de
  evidencia —`webBlocks[4]`, `[7]`, `[9]`— compilan hoy idénticos byte a byte, 723 / 944 / 909
  bytes. Es contra esos hashes que se medirá la mitad B.
- **Una decisión de alcance pendiente para la mitad B, planteada y no ejecutada:** el despachador
  vive **duplicado**. `buildSingleWebLesson.js` es el que el ticket nombra, pero
  `compiler-api/services/previewRenderer.js:227-245` tiene **una copia literal** de
  `findWebComponent`, y es la que pinta «Vista previa». Si solo se da de alta `split` en el
  primero, «Compilar Web» funcionará a nivel superior y **«Vista previa» mostrará el recuadro
  rojo «Builder no encontrado»** — que es justamente donde el operador tiene que juzgar los tres
  modos con los ojos. `previewRenderer.js` **no está en el alcance declarado**. Se pide permiso
  para añadir ahí la misma entrada de una línea. **Concedido por adenda**, y solo para eso.
- **No se tocó `.project/`, ni el `status` del run, ni git, ni el orden de la cola.**

---

## 11. Mitad B — ancho completo

### 11.1 Lo que se midió antes de tocar nada

Renderizado con el motor y el CSS reales a 1000px, con KaTeX ya compuesto y el script de
auto-ajuste asentado:

| Modo | Medida a ancho completo | |
|---|---|:---:|
| **Pasos en lista** | contenedor 948px, fórmula 24–90px → **91–98% de banda vacía**; la fórmula a **453–486px de su propia insignia** | roto |
| **Filas** | hueco etiqueta↔valor **670–696px**, contra 158–184px en columna | roto |
| **Pasos en rejilla** | celdas de **443px**, casi el ancho aprobado de columna (488px) | **aguanta** |

El ticket decía que la rejilla aguanta. Confirmado, **y con la razón**: su `1fr 1fr` reparte el
ancho, así que cada celda cae en el ancho que ya está aprobado. Lo único suyo que fallaba era su
«Resultado final», que ocupa fila entera (945px, 97% vacío).

**Ningún modo hubo que partirlo en dos componentes. No hizo falta parar.**

### 11.2 Por qué consultas de contenedor y no de viewport

Una consulta de viewport habría disparado también en columna estrecha —el viewport es ancho en
los dos casos— y habría roto el criterio 9 en el primer intento. La de contenedor dispara solo
cuando **ese** elemento tiene sitio.

Y trae un regalo medido: **la rejilla se autoexcluye sin regla especial**, porque sus celdas
miden 443px a ancho completo y 187px en columna y **nunca** llegan al umbral de 560px. El modo
que aguantaba se queda intacto por construcción, no por una excepción escrita a mano.

Dos contenedores anidados: `.j-split-body` (950/438px) gobierna la maqueta de «Filas»;
`.j-split-fit` gobierna la alineación de la fórmula **tarjeta por tarjeta** (948/436px en paso y
resultado, 443/187px en celda de rejilla).

### 11.3 Qué se rediseñó de cada modo, y por qué

- **Pasos en lista** — la fórmula deja de centrarse en la banda y **se ancla junto a su
  insignia**: margen izquierdo **453–486px → 64px**. La razón es que el defecto no era el hueco
  en sí, sino que el número y su fórmula dejaban de leerse como una sola cosa. El escudo de
  `padding-left` que evita el número ya existía, así que no hubo que inventar espacio.
- **Filas** — **dos por renglón**: hueco **670–696px → 190–216px**, el mismo orden que los
  158–184px ya aprobados en columna. Se eligió la rejilla en vez de un `max-width` centrado
  porque el patrón ya está validado *dentro del propio componente*: es lo que hace el modo que
  aguanta. El **pie se dejó fuera del envoltorio** a propósito, para conservar su
  `margin-top: auto`.
- **Pasos en rejilla** — **sin tocar**. Solo su «Resultado final», que tenía el mismo defecto
  que «Pasos en lista» por ocupar fila entera: **475px → 44px**.

Si un navegador no soporta consultas de contenedor, ignora el bloque entero y **todo se comporta
como hoy**. No hay estado intermedio roto.

### 11.4 El criterio 9, demostrado dos veces

**Por el compilador:** `webBlocks[4]`, `[7]` y `[9]` compilan idénticos byte a byte, con los
mismos hashes que la mitad A —`841af5395755f57b`, `ea0af205fe05dc86`, `063d70f944c04ea2`— y los
mismos 723 / 944 / 909 bytes.

**Y por geometría renderizada**, que es lo que el operador ve: posición y tamaño de **todos** los
nodos visibles de las dos secciones en columna. Huellas **idénticas**: `3a6fa040` (283 nodos) y
`487d2e59` (241 nodos). Alturas 658 → 658 y 540 → 540.

> **Nota de método, declarada porque afectó a la medición.** La primera línea base se tomó **en
> vuelo**: el script de sincronización de alturas del propio componente corre con temporizadores
> a 100ms, 500ms y 2000ms y da valores distintos hasta asentar. Daba `.j-split-top` de 173px
> donde lo asentado son 101px, y eso hacía parecer que el rediseño había encogido la tarjeta
> 74px. **Se descartó y se rehízo forzando el asentamiento en las dos páginas.** Es el tipo de
> error que habría producido un falso positivo de regresión.

### 11.5 Las dos pruebas del criterio 7: reescritas, no borradas

**Conteo: 437 → 438.** La primera se partió en dos porque fijaba dos cosas y ahora una es la
negativa.

1. *«…only as Columns children»* → *«…**in both placements**»*: los tres modos arriba, dentro, y
   mezclados con otros bloques.
2. **Negativa nueva**, *«opening the placement does not open the bounded split contract at top
   level»*: nueve formas rechazadas **arriba**, donde ya no hay un `columns` alrededor que
   proteja — exclusividad de modo, `result`/`footer` fuera de sitio, campo desconocido, HTML,
   **los dos pares de delimitadores** y el tope de cantidad.
3. *«compiler **rejects** top-level split»* → *«compiler **emits** top-level split **and still
   rejects** unsafe direct payloads without schema parse»*: comprueba que emite los tres modos
   sin campos de Draft y **conserva enteras** las negativas de seguridad, movidas a la
   colocación recién abierta y repetidas dentro de columna.

Es el mismo patrón que ya funcionó en `#38`: la conducta cambia, el lado inseguro no se abre.

### 11.6 Lo que se declaró y no se reparó

**El despachador se calla justo en el camino que llega al alumno.** Medido por ejecución con un
tipo inventado:

| Camino | Ante un tipo desconocido |
|---|---|
| «Vista previa» (`previewRenderer.js:287-294`) | **avisa**: recuadro rojo «Builder no encontrado para: X» |
| «Compilar Web» (`buildSingleWebLesson.js:143-152`) | **se calla**: sin `else`, el bloque desaparece; y su `catch` de errores del renderer está **vacío** |

**«Vista previa» es para el autor; «Compilar Web» produce la lección que se publica.** El que
avisa es el que menos falta hace; el que se calla es el que llega al alumno. Declarado, **no
reparado**: es la familia de fallos silenciosos, ya enrutada.

**Segundo hallazgo declarado:** el bloque `<style>` del componente se emite **una vez por
tarjeta**, no una por lección — ya era así (la regla de KaTeX se duplicaba igual), y las reglas
nuevas lo engordan de ~80 bytes a **3.153 bytes por tarjeta**. Son reglas idénticas, así que el
resultado visual es correcto. No se toca: cambiar cómo se emite pondría en riesgo la igualdad
byte a byte del criterio 9.

**Tercero, ahora visible:** la divergencia entre las dos fábricas quedó enrutada en §8.2 y sigue
sin tocarse, pero al abrirse el nivel superior **ya se nota**: suelta, la tarjeta arranca en
«Filas»; dentro de columna, en «Pasos en lista».

### 11.7 Sin reclamos de la mitad B

- **Siete archivos más**: el motor, los dos despachadores, los dos esquemas, el compilador, el
  catálogo y el editor. Más las dos pruebas del alcance, reescritas.
- **`ComponentPicker.jsx`, `blockFactory.js` y `renderColumns.js`: ni una línea.** El menú leía
  `item.disabled` del catálogo, así que retirar la bandera bastó; la fábrica de nivel superior ya
  tenía su `case 'split'` y valida contra el esquema nuevo, verificado por ejecución.
- **De `previewRenderer.js` solo la entrada de `split`**, como autorizaba la adenda.
- Suite **438/438**, lint `exit 0`, build `exit 0`.
- Evidencia visual reproducible en
  `QA/temp/RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001-R3/`, con las dos páginas y el generador.
- **Este record no certifica nada.** `READY_FOR_OPERATOR_QA` significa que el packet está
  preparado, no que la pieza esté aprobada.
- **No se tocó `.project/`, ni el `status` del run, ni git, ni el orden de la cola.** La cabina
  cierra.
