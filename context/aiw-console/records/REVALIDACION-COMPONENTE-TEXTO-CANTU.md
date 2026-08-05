# Revalidación de componente — «Texto» (`narrative`) — `cantu-studio`, `queue_order` 24

> Encargo de taller. Ejecuta `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md` sobre el
> componente `narrative`, cuya etiqueta de plataforma es **«Texto»**.
> **Nada se reparó.** **Nada se cerró.** **Ningún status se cambió.** `.project/` no se re-emitió.
> Contenido de documentos del repo citado **verbatim en inglés**, sin traducir.

**Aviso de lectura, y es lo primero porque cambia las cifras:** el canónico
`.aiw/roadmap/roadmap.json` **cambió durante esta sesión**. Al abrirla tenía **66** runs; al cerrarla
tiene **68**, con `mtime` `2026-08-04 18:27:02`. Las cifras de §14 son las del archivo **de ahora**,
remedidas después del cambio. El `queue_order` 24 **no se movió** y su título sigue casando verbatim
con el objetivo: la compuerta S1 se re-derivó contra el archivo nuevo y vuelve a pasar. Ver §1.3.

---

## 1. Identidad del run, derivada del canónico — NO tecleada

Derivación por `queue_order` 24 sobre `objectives[].phases[].runs[]` de
`projects/cantu-studio/.aiw/roadmap/roadmap.json`. Una sola coincidencia.

| Campo | Valor derivado |
|---|---|
| `run_id` | **`RUN-JAME-WEB-NARRATIVE-REPAIR-001`** |
| `title` | `Audit and implement the Narrative component` |
| `queue_order` | 24 |
| `status` | `active` |
| Objetivo / fase | `O1` / `O1.P1C` |
| Carril | `DEVELOPMENT` (derivado de `lanes[].default: true`; el run **no lleva clave `lane`**) |

**Comprobación de título, verbatim, exigida por el objetivo:** el título derivado es exactamente
`Audit and implement the Narrative component`. **Coincide.** No se para.

### 1.1 El `full_description` íntegro, leído antes de empezar

> "Audit the Narrative component against the color and palette compatibility contract, using the current component inventory as the starting point. Where the inventory shows the component carries hardcoded or local colors instead of the shared palette, or lacks a required integration point, implement the missing integration. Repair only what the audit and human visual QA show to be a real defect; do not rewrite accepted behavior. Verify the result by human visual QA rather than an automated test suite, since the repository has no test runner."

Campos de clasificación: `correctness_model: JUDGED_DEFINES`, `work_type: FUNCTIONAL`,
`blast_radius: ADJACENT`, `failure_surfaces: VISIBLE`.
`depends_on`: `RUN-JAME-WEB-COMPONENT-CONTRACT-STANDARDIZATION-001` (`queue_order` 9, `completed`) y
`RUN-JAME-WEB-COMPONENT-BASELINE-RECONCILIATION-001` (`queue_order` 12, `completed`). **Ambas satisfechas.**

### 1.2 Dónde el run y el ticket de cabina discrepan, y quién gana

Regla aplicada: **gana el run, y la discrepancia se declara.**

**(a) El run dice que no hay test runner. Es falso, y la Definition of Done ya lo corrigió.** El
`full_description` cierra con *«since the repository has no test runner»*. La DoD §12 declara esa
cláusula obsoleta **en general, para los diecisiete runs**, y fija la lectura correcta:

> "The component run texts are stale on the test-runner clause, and the procedure governs. […] The second half is false as written and is corrected in Section 6 under the automated-test boundary […] Where a run text and this document disagree on that point, **this procedure is what the run executes**."

De modo que **no hay conflicto real que resolver**: el run manda sobre el ticket, y sobre este punto
concreto el propio procedimiento que el run ejecuta ya dice qué hacer. Los tests se corren **como
medición**, nunca como sustituto del packet de S7 ni como autorización de reparación (DoD §6). Es la
misma resolución que aplicaron los cuatro runs anteriores. **Ningún texto de run se enmienda aquí.**

**(b) El run ordena implementar integración de color donde falte; el disco dice que no falta ninguna.**
El `full_description` dice *«Where the inventory shows the component carries hardcoded or local colors
instead of the shared palette, or lacks a required integration point, implement the missing integration»*.
El inventario que el propio run nombra como punto de partida clasifica `narrative` como
**`NO_COLOR_SURFACE`** y declara explícitamente que **no hay integración que falte** (§4 de este record
lo mide, §4.3 lo resuelve). La condición del run **no se cumple**, así que la orden **no se activa**.
Se declara para que no se lea como omisión.

**(c) El ticket de cabina dice «17 packets, 16 ids, 350 tests, y el total de runs y el `queue_order`
pueden haber cambiado».** Verificado uno a uno en §14. **Tres de cuatro cifras son exactas; la
advertencia sobre el total de runs se cumplió a mitad de sesión.**

### 1.3 El canónico cambió durante la sesión — medido, declarado, sin actuar

| Momento | `mtime` de `roadmap.json` | Runs | `queue_order` 24 |
|---|---|---|---|
| Primera lectura de esta sesión | `2026-08-04 16:31` | **66** | `RUN-JAME-WEB-NARRATIVE-REPAIR-001`, título verbatim OK |
| Lectura al correr el validador | `2026-08-04 18:27:02` | **68** | **Idéntico**, título verbatim OK |

Los dos runs añadidos, ambos `planned` y ambos sin `classified_at`:

| `queue_order` | `run_id` | Título | Fase |
|---|---|---|---|
| **25** | `RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001` | `Lock the existing inline formula behaviour with tests before any component consumes it` | `O5.P7` |
| **26** | `RUN-CANTU-LESSON-LOAD-FAILURE-SURFACING-001` | `Repair the lesson that fails to load and stop the build from swallowing the failure` | `O7.P1` |

La inserción empujó cuatro runs de componente: `callout` 25→27, `details` 26→28, `arithmetic` 27→29,
`rule` 28→30. **`narrative` no se movió.** Integridad verificada: `queue_order` 1..68 sin huecos y sin
duplicados; 25 `completed`, 42 `planned`, 1 `active`.

**No se disparó PARA Y REPORTA por esto**, porque la condición del criterio 13 es *«el canónico no casa
con el objetivo»*, y casa: el 24 lleva el título exigido. **Se declara porque el criterio 10 lo pedía
expresamente y porque cualquier cifra heredada de este record hay que fecharla.**

**El run 25 es el que el encargo anunciaba**, y su texto es la fuente en disco de la instrucción de
medir-sin-garantizar. Verbatim, la frase que nombra a este componente:

> "The prose field of the narrative component is NOT in this first set: its own run is open while this is written, and it enters on a second pass."

Y su alcance, verbatim:

> "SCOPE IS TESTS AND NOTHING ELSE. This run writes no production code, changes no schema, no compiler, no renderer and no editor surface."

**Fuera de eso, en disco no hay ningún documento que registre la decisión del operador sobre el conjunto
elegido de campos.** Lo que sí hay es una **propuesta**:
`records/BARRIDO-DIAGNOSTICO-FORMULA-EN-LINEA-CANTU.md` §4.2, donde `narrative.text` es el **candidato
número 1** de quince, con la nota *«El párrafo narrativo. Es el campo de prosa por antonomasia del
repo.»*, y su §4.4 cierra con *«Esto es una propuesta. La decisión es del operador.»* La decisión en sí
no está escrita en ningún record; **se declara y no se inventa**.

---

## 2. Resoluciones adoptadas de los cuatro runs anteriores — sin quinta lectura

El encargo ordena adoptar sus resoluciones de los huecos y no inventar una quinta. Adoptadas sin cambio:

| Resolución | Origen | Cómo se aplica aquí |
|---|---|---|
| I-1 — el bloque de auditoría S3/S4 vive **en este record** | piloto §11.2 | §4 y §5 |
| I-2 — el packet de S7 va a `docs/_historical_run_record/`, nombre `<RUN_ID>-OPERATOR-QA-PACKET.md` | piloto §11.2 | §9 |
| I-3 — «suite completa» = la del **repo**; los 32 archivos del compilador sí se corren para verificar el 350 | piloto §11.2 | §12 |
| I-4 — responder las diez preguntas de S3 y de S4 marcando VACÍA con su razón, sin omitir | piloto §11.2 | §4 y §5 |
| La partición de las diez preguntas del contrato de color es **la del piloto** (*«editor, Preview Real y Generate Web»* = **una** pregunta con tres respuestas) | piloto §11.1, confirmada por `iconList` §4, `card` §6 y `video` §2 | §4 |
| Un defecto que el taller mide y ningún veredicto de QA nombra se trata como **pendiente de veredicto, anotado, no resuelto por criterio propio** | piloto §11.3(a), aplicada por `iconList` §8.2, `card` §11.2 y `video` §8 | §7 |
| S2 nombra «la rama del editor» y el control real puede vivir en otro sitio; hay que auditar el archivo delegado | `iconList` §13.1(a), precisado por `card` §15.1(a), reconfirmado por `video` §16 | §3 |
| El patrón de respuesta de un S3 que sale vacío es el de I-4, y **hay que demostrar la ausencia en cinco capas**, no solo decir que no hay campo | `video` §16.1(b), que anticipó por nombre a este componente | §4 |
| S5 con una colocación negativa se resuelve PASS con las dos colocaciones registradas | `video` §16.1(a) | **No aplica aquí**: `narrative` **sí** es hijo válido de columnas. Se dice y no se omite |

**Una resolución que NO se adopta, y por qué.** El piloto §11.3(b) fijó `READY_FOR_OPERATOR_QA` **con
reserva** para el caso *«un componente entra con QA fallida cuya causa ya fue reparada por una pieza
compartida»*, y nombró a `narrative` entre los cinco que vendrían. **Aquí el supuesto no se cumple:** el
defecto que la QA humana registró **reproduce contra código vivo hoy** (§7.2). No hace falta la reserva,
porque la Definition of Done sí tiene salida para este caso, y es literal:
*«Reproduced and out of scope: declare `REPAIR_REQUIRED_OWN_SCOPE`, touch nothing.»* **Se usa esa.**
Es la primera vez en la serie que un componente cae en esa casilla, y se declara para que el sexto no
herede la reserva del piloto por inercia.

**No se propone enmendar la Definition of Done.** §13 mide y reporta.

---

## 3. La tabla de evidencia de la Definition of Done §7 — estructura verbatim

```
Component: narrative    Run: RUN-JAME-WEB-NARRATIVE-REPAIR-001 (queue_order 24)    Date: 2026-08-04

| Step | Measured against | Result | Evidence |
|---|---|---|---|
| S1 identity | .aiw/roadmap/roadmap.json | PASS | RUN-JAME-WEB-NARRATIVE-REPAIR-001 + "Audit and implement the Narrative component"; re-derivado tras el cambio de archivo (§1.3) |
| S2 state audit | catalog / schemas / compiler / renderer / fixture | PASS | §6, quince capas citadas, cero UNKNOWN; fixture Web: AUSENTE y declarada |
| S3 color audit | color contract Section 9 | PASS + COLOR_PALETTE_NOT_APPLICABLE | bloque en §4 de este record |
| S4 math audit | math contract Section 10 | PASS + MATH_FORMULA_NOT_APPLICABLE | bloque en §5 de este record |
| S5 columns placement | top-level + both slots | PASS | §8; ambas colocaciones aceptadas y compiladas; blockCatalog.js:1017, renderColumns.js:65-66 |
| S6 persistence | save/load + import | PASS | §8.2; once casos, ida y vuelta idempotente salvo el descarte declarado de claves extra |
| S7 human qa | Section 6 boundary | PREPARED (completo, no delta) | docs/_historical_run_record/RUN-JAME-WEB-NARRATIVE-REPAIR-001-OPERATOR-QA-PACKET.md |
| S8 repair gate | reproduced QA defects | DECLARED (reproducido, fuera de alcance; nada tocado) | §7; defecto registrado "limpieza de modo/naming", reproduce en D1 y D2 |
| S9 packet | single-source contract | PASS | ningun packet ni Guide escrito; seis discrepancias enrutadas en §10 |
| S10 registry + no-claims | docs_index + conflicts | PASS | §10; docs_index.json sin escribir; conflicto `list` intacto |

Verdict: REPAIR_REQUIRED_OWN_SCOPE
Open decisions touched: none
```

**Ejecución paso a paso, en el orden y con los nombres de la DoD. Ninguno omitido, ninguno BLOCKED.**

| Paso | Nombre en la DoD | Resultado | Dónde |
|---|---|---|---|
| S1 | Identity gate | PASS | §1 |
| S2 | Current-state audit | PASS | §6 |
| S3 | Color palette compatibility audit | PASS + `COLOR_PALETTE_NOT_APPLICABLE` | §4 — el paso es PASS; la clase es la que sale. Las diez preguntas se ejecutan enteras |
| S4 | Math and formula compatibility audit | PASS + `MATH_FORMULA_NOT_APPLICABLE` | §5 — ídem; ocho de diez vacías con su razón |
| S5 | Columns placement check | PASS | §8 — **no aplica** la excepción auto-referencial (es solo de `columns`) **ni** el caso de `video` (rechazo por contrato): aquí las dos colocaciones son válidas |
| S6 | Persistence roundtrip | PASS | §8.2 |
| S7 | Human QA | PREPARED | §9 — el taller **nunca** ejecuta QA humana |
| S8 | Repair gate | **DECLARED** | §7 |
| S9 | Packet and Guide, both out of scope | PASS | §10 |
| S10 | No-claims | PASS | §10 |

---

## 4. S3 — Color palette compatibility audit

Bloque obligatorio de diez preguntas del contrato de color §9, con la partición del piloto. Se ejecuta
entero, como la DoD exige *«for every component regardless»*. Las respuestas son medición viva:
compilación real contra dos paletas cuyos accents difieren, y render real del motor.

**1. ¿Expone campos, variantes, estilos o tokens dependientes del color?** **No. Ninguno.** Las claves del
bloque son exactamente `kind`, `mode`, `title`, `text`
(`tools/author-lite/compiler-api/schemas/draftSchema.js:729-734`, espejo en
`tools/author-lite/editor-ui/src/schemas/draftSchema.js:716-721`). No hay `variant`, ni `color`, ni
`colorToken`, ni `background`. El editor no monta ningún control de color: la rama top-level
(`WebBlockEditor.jsx:1918-1941`) tiene tres campos —modo, título, textarea— y la rama de slot
(`:3953-3964`) los mismos tres. **Medición adicional**, los cuatro nombres de campo de color que otros
componentes usan:

```
{"variant":"ctx"}        -> ACEPTA top-level (campo extra, no leido) | RECHAZA en slot
{"color":"#FF007F"}      -> ACEPTA top-level (campo extra, no leido) | RECHAZA en slot
{"colorToken":"ctx"}     -> ACEPTA top-level (campo extra, no leido) | RECHAZA en slot
{"background":"#FF007F"} -> ACEPTA top-level (campo extra, no leido) | RECHAZA en slot
```

**2. ¿Qué emite el compilador?** Con paleta A (`ctx = #123ABC`) y paleta B (`ctx = #ABC123`):

```
paleta A -> {"type":"narrative","mode":"side","title":"Titulo","text":"Parrafo de prueba."}
paleta B -> {"type":"narrative","mode":"side","title":"Titulo","text":"Parrafo de prueba."}
salida identica entre paletas : true
sin paleta activa identica a A: true
claves emitidas               : type, mode, title, text
emite variant : false | color : false | surface/border/textColor : false
```

**Identidad byte a byte, y cuatro claves.** `case 'narrative'` (`compiler.js:1155-1161`) **no recibe
`context`** y **no llama** a `resolveVariantColorToken` ni a `buildColorRolesOutput`, a diferencia de
`case 'list'` (`:1163-1175`) o `case 'card'`. Es la fila del inventario, `NO_COLOR_SURFACE`, verificada
con compilación viva.

**3. ¿La paleta afecta correctamente al editor, a Preview Real y a Generate Web?** **A ninguno de los
tres, y es correcto.**

- **Editor: no**, porque no hay control de color que pudiera consumirla. El editor de `narrative` no
  recibe `colorPalette` en ninguna de sus dos ramas. Corroboración estática: la lista
  `SHARED_SELECTOR_COMPONENTS` del test del selector unificado
  (`webSharedColorSelectorUnification.test.mjs:61`) enumera los componentes que comparten el control de
  color y **`narrative` no está entre ellos**.
- **Preview Real: no.** Render real con las dos paletas: los cuatro bordes pintados salen
  `#4C566A` en ambas.
- **Generate Web: no.** Misma medición sobre `buildSingleWebLesson`: mismos `#4C566A`, y ningún accent de
  paleta aparece en el documento.

**4. ¿Save/load y la importación de Draft JSON preservan la selección?** **VACÍA — no hay selección de
color que preservar.** Se responde y no se omite (I-4). Lo que sí se midió, y va a S6, es la
preservación de `mode`, `title` y `text` (§8.2).

**5. ¿Se mantienen el contraste y la legibilidad?** **VACÍA en el sentido del contrato — no hay elección
de color del autor cuyo contraste evaluar.** Lo que hay es fijo: cuerpo `#4C566A` sobre fondo blanco o
`#F8FAFC` (`renderNarrative.js:93`, `:56`, `:63`, `:69`). No se emite juicio de accesibilidad: no es lo
que el paso pide y no hay medición de ratio en este repo. `card` (§6) ya declaró que esta pregunta
presupone un contraste elegible que no siempre existe.

**6. ¿Funciona en el nivel superior?** **Sí.** §8.

**7. ¿Funciona dentro de los slots de `columns` sin romper la legibilidad?** **Sí, y el conjunto de
opciones de color es el mismo en las dos colocaciones: vacío.** §8. Es la invariancia que el contrato de
color §7 pide, satisfecha vacuamente.

**8. ¿Qué límites o variantes debe documentar el packet?** **VACÍA en la mitad de color.** No hay
variantes de color que documentar. **La mitad de límites NO está vacía y es un hallazgo:** el packet
canónico documenta cuatro modos, uno de los cuales el editor ya no ofrece. Va a §10, DIV-4.

**9. ¿Qué clase se asigna?** **`COLOR_PALETTE_NOT_APPLICABLE`** — *«No color, variant, or token surface
at all.»* Justificación: cinco capas medidas (catálogo, editor en sus dos ramas, los dos esquemas,
compilador, renderer por la vía que el autor alcanza) y ninguna expone superficie de color; la salida
compilada es idéntica entre dos paletas y sin paleta.

**10. ¿Qué queda abierto?** **Ninguna decisión abierta del contrato de color se toca.** La alias `success`
(decisión 4) no llega aquí: el bloque no tiene enum de variantes.

### 4.1 LA CONTRADICCIÓN DEL COLOR, RESUELTA CONTRA DISCO

El encargo pedía resolver esto antes que los pasos de color, con archivo y línea. **Las dos mediciones
son ciertas, y no del mismo modo: describen capas distintas.** Ninguna es falsa; lo que faltaba era
decir de qué capa habla cada una.

| | Lo que afirma | Dónde vive en disco | Medición |
|---|---|---|---|
| **Medición A** | `narrative` no tiene superficie de color | DoD §5 fila `narrative` (*«Color surface today: none»*); inventario `:87` (`NO_COLOR_SURFACE`) | **CIERTA del pipeline de autor.** Verificada arriba: sin campo, sin control, sin emisión, salida idéntica entre paletas |
| **Medición B** | Su renderer pinta contra un mapa fijo propio de varias claves | inventario `:147-149` (*«`narrative` and `timeline` carry local literal maps»*) e `:136` | **CIERTA del motor.** El mapa existe, tiene **nueve** claves y pinta de verdad |

**El mapa, medido en el archivo:** `src/builders/web/partials/renderNarrative.js:18-28`, objeto
`themeColors`, nueve claves. `:6` lee `data.variant || 'meta'`. `:29` resuelve
`themeColors[variant] || themeColors.meta`. Pinta cuatro sitios: el color del título (`:33`), el borde
izquierdo de `mode-side` (`:55`), el borde superior de `mode-top` (`:62`) y el borde izquierdo de
`mode-surface.has-accent` (`:74`).

Render real, las nueve claves, una a una:

```
variant=meta     borde #4C566A | titulo #4C566A
variant=ctx      borde #5E81AC | titulo #5E81AC
variant=def      borde #B48EAD | titulo #B48EAD
variant=ex       borde #88C0D0 | titulo #88C0D0
variant=focus    borde #C2B280 | titulo #C2B280
variant=str      borde #D6CFC2 | titulo #D6CFC2
variant=res      borde #A3BE8C | titulo #A3BE8C
variant=wrn      borde #D08770 | titulo #D08770
variant=err      borde #BF616A | titulo #BF616A
sin variant     borde #4C566A (fallback meta)
variant=#FF007F borde #4C566A (hex NO respetado -> cae a meta)
```

**Y ahora la bisagra, que es lo que resuelve la contradicción:**

```
=== LO QUE EL COMPILADOR EMITE, PASADO POR EL RENDERER ===
color del borde con la salida real del compilador: #4C566A
color del titulo                                 : #4C566A
```

**`variant` es inalcanzable desde el pipeline de autor.** No está en `WebNarrativeSchema`
(`compiler-api/schemas/draftSchema.js:729-734`); el compilador no lo emite (`compiler.js:1155-1161`); la
unión de hijos de columnas lo **rechaza** por `.strict()` (`:932`); y aunque el schema top-level **no**
es `.strict()` y lo acepta como campo extra, el compilador construye su salida campo a campo y nunca lo
lee. **Todo lo que Author Lite compila cae en el fallback `meta`, `#4C566A`, con cualquier paleta y sin
paleta.**

**Cuál describe el disco, dicho sin ambigüedad:** las dos, y la que gobierna el paso S3 es la **A**,
porque el contrato de color se audita sobre el pipeline de autor —su propio §9 pregunta por *«fields,
variants, styles, or tokens»* que el componente **expone**— y ahí no hay nada. La **B** describe una
capacidad del motor que **ningún actor del repositorio ejerce hoy** (§6.1).

**Y esto no lo estoy resolviendo yo: el inventario ya lo había resuelto, verbatim**, y conviene que
conste porque la contradicción aparente se disuelve leyendo su §6:

> "**`narrative` has no color surface at all in the author pipeline.** The color contract's Section 3 and 4 tables do not list it, which is consistent, but the renderer's variant map makes it look palette-adjacent. It is not: the schema has no `variant`, so every compiled `narrative` renders at the `meta` default."

**Una coincidencia medida que conviene dejar anotada, y NO tocar.** Las nueve claves de `themeColors`
son **exactamente** el conjunto `VARIANT_VALUES` del compilador (`compiler.js:21`:
`def, ctx, ex, focus, str, res, wrn, err, meta`). Es decir: **el día que alguien añadiera un campo
`variant` a `narrative`, entraría directamente en el patrón de regresión de paleta** que el contrato de
color §8 describe, junto a `callout`, `details`, `conceptGrid`, `table` y `rule`. **Es medición, no
propuesta.** El criterio 5 prohíbe expandir el componente y aquí no se expande.

---

## 5. S4 — Math and formula compatibility audit

Bloque obligatorio de diez preguntas del contrato de math §10, respondidas las diez (I-4).

**1. ¿Expone algún campo de math o de fórmula?** **No.** Las cuatro claves son `kind`, `mode`, `title`,
`text`. No hay `math`, ni `expression`, ni `result`, ni `terms`. El contrato de math §5 lista los seis
que sí lo tienen y `narrative` no está. El inventario §4 lo repite.

**2. ¿Qué superficie de entrada usa cada campo?** **VACÍA — no hay campo de math, ni Superficie A ni B.**

**3. ¿Ofrece el editor visual de fórmulas o una entrada de texto plano?** **Ninguno de los dos como campo
de math.** El editor monta un `<textarea>` de prosa (`WebBlockEditor.jsx:1930-1937`). **Y hay una
aserción viva que lo fija:** `webRuleSmartFormulaFieldRulePilot.test.mjs:388` asegura que
`WebBlockEditor.jsx` **no** monta `SmartFormula` para `field.kind === 'narrative'` (entre otros diez).
El Smart Formula Field sigue siendo `RULE_ONLY`.

**4. ¿El compilador emite el valor con delimitadores, y de quién son?** **VACÍA — no hay valor de math que
delimitar.** El contrato de math §5 asigna la propiedad de los delimitadores por componente; `narrative`
no aparece en ninguno de los tres casos.

**5. ¿Un delimitador escrito por el autor se descarta o se duplica?** **NO VACÍA, y es la pregunta de este
componente.** Se responde entera en §6.2. Resumen: **no se descarta ni se duplica; sobrevive literal**.

**6. ¿El HTML renderizado produce salida KaTeX de verdad?** **NO VACÍA, y por la razón que `video` §16.1(c)
declaró:** el renderizado de fórmulas es **global**, no por campo. Medido aquí en las tres salidas: §6.2.

**7. ¿Save/load y la importación preservan la fórmula?** **Medido, y sí** (§8.2, casos «formula inline» y
«formula display»). **Se responde como observación**, no como garantía.

**8. ¿El campo funciona dentro de los slots de `columns`?** **Sí para el campo de prosa** (§8). Como campo
de math, **VACÍA**.

**9. ¿Qué límites de longitud y forma debe documentar el packet?** **VACÍA en la mitad de math.** `text`
no tiene tope de longitud: `safeRequiredPlainText` (`draftSchema.js:135-137`) solo exige `min(1)` y la
ausencia de texto inseguro en línea. **La ausencia de tope se declara** y no se repara.

**10. ¿Qué texto de fallo ve el autor cuando se rechaza una fórmula?** **VACÍA — ninguna fórmula se
rechaza por ser fórmula.** Lo que sí se rechaza es texto inseguro, y su mensaje llega con el mojibake
conocido de los dos esquemas: `"El texto no puede estar vacÃ­o"`
(`compiler-api/schemas/draftSchema.js:733`, espejo `editor-ui:720`). **Deriva conocida, fuera de alcance,
no reparada.**

**Clase asignada: `MATH_FORMULA_NOT_APPLICABLE`** — *«No math or formula surface at all.»* Justificación:
ningún campo de math en ninguna de las cinco capas, y una aserción viva que lo mantiene fuera del Smart
Formula Field. **La fórmula en línea de §6.2 NO cambia esta clase**: es texto de prosa que un pase global
posterior interpreta, no un campo de math del componente. **Decirlo al revés sería documentarla como
soportada, que es exactamente lo que el encargo prohíbe.**

---

## 6. S2 — Auditoría de estado, con archivo y línea

Quince capas. **Ninguna quedó en UNKNOWN.**

| Capa | Ruta y línea | Medición |
|---|---|---|
| Catálogo (metadatos) | `tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js:24-28` | `label: 'Texto'`, `category: 'basics'`, **`rail: true`**, `order: 30`. **Sin `disabled`** — es agregable |
| Catálogo (riel) | `.../blockCatalog.js:122-126` | Grupo **«Básicos frecuentes»**, segundo de ocho, entre `header` y `list` |
| Catálogo (entrada de docs) | `.../blockCatalog.js:210-233` | `id: 'web-narrative'`, `action: 'narrative'`, `label: 'Texto'`, `icon: 'FileText'`. Su `jsonSchema` de ejemplo (`:227`) documenta `kind/mode/title/text` — **coincide con el schema real**. Y su `jameCoreInfo` (`:229`) dice verbatim *«No habilita html, accent, textSize ni HTML arbitrario»* — **es exacto, y es la única fuente del repo que nombra esos tres campos del motor** |
| Catálogo (contrato de columnas) | `.../blockCatalog.js:1017` | *«El menu interno permite agregar header, list, iconList, rule, card, callout, narrative y table»*. **`narrative` es hijo válido** |
| Editor, top-level | `.../components/web/WebBlockEditor.jsx:1918-1941` | Rama propia, 24 líneas, **en el archivo**: desplegable de modo (`ColumnRegisteredSelectField` + `COLUMN_NARRATIVE_MODE_OPTIONS`), `ColumnTextInputField` de título, `<textarea rows={5}>` de texto. **Cero controles de color** |
| Editor, hijo de columnas | `.../WebBlockEditor.jsx:3953-3964` | Segunda rama, 12 líneas: `NarrativeModeSelect`, `TextInputField`, `TextAreaField rows={5}`. **Cero controles de color.** Los mismos tres campos |
| Editor, opciones de modo | `.../constants/editorOptions.js:29-34` (`NARRATIVE_MODE_OPTIONS`) y `.../WebBlockEditor.jsx:304-309` (`COLUMN_NARRATIVE_MODE_OPTIONS`) | **Dos listas duplicadas, idénticas**: `clean`/Limpio, `side`/Lateral, `surface`/Recuadro, `top`/Superior **con `legacy: true`** — que en las dos ramas se traduce a `disabled` **y** `hidden` |
| Editor, selector compartido | `.../components/common/NarrativeModeSelect.jsx:1-19` | 19 líneas; consume `NARRATIVE_MODE_OPTIONS`. **Compartido con la superficie Slide** |
| Editor, etiqueta de respaldo | `.../WebBlockEditor.jsx:400` | `if (block?.kind === 'narrative') return 'Texto sin título';` |
| Editor, lista de tipos | `.../WebBlockEditor.jsx:260` | `{ kind: 'narrative', label: 'Texto' }` |
| Schema editor-ui | `tools/author-lite/editor-ui/src/schemas/draftSchema.js:716-721` (`WebNarrativeSchema`), unión de hijos de columnas `:904` (**`.strict()`**), unión top-level `:966` (**sin `.strict()`**), ítem Slide `:997-1002` | `mode` enum de cuatro, `title` `safeOptionalPlainText`, `text` `safeRequiredPlainText` |
| Schema compiler-api | `.../compiler-api/schemas/draftSchema.js:729-734`, unión hijos `:932`, unión top-level `:994`, ítem Slide `:1025-1030` | **Idéntico byte a byte** al de editor-ui en las cuatro posiciones |
| Compilador | `.../compiler-api/services/compiler.js:1155-1161` (`case 'narrative'` Web), `:1260-1266` (ruta Slide), `normalizeMode` en `:86-88` con `CARD_LEGACY_MODE_VALUES` en `:22` | Escapa `title` con `escapeHtml` y `text` con `escapeHtmlWithLineBreaks` (`:99-110`). **No recibe `context`.** Emite cuatro claves |
| Renderer | `src/builders/web/partials/renderNarrative.js` — mapa `:18-28`, lectura de `variant` `:6`, `html` `:7`, `accent` `:8`, `textSize` `:11-12`, `textScale` `:15`, id aleatorio `:37`, inyección del contenido `:113` | 117 líneas, CSS scoped inyectado. **Cinco campos que el motor lee y el pipeline de autor no produce.** Ver D4 |
| Preview Real | `.../compiler-api/services/previewRenderer.js:155-180` | Carga todos los partials por nombre de archivo; `renderNarrative.js` entra por alias `narrative`. **Preview Real y Generate Web usan el mismo renderer del motor** |
| Defaults | `.../utils/blockFactory.js:29-30` (Web top-level), `:269-274` (hijo de columnas), `:316-321` (ítem Slide) | Web: `{ kind:'narrative', mode:'clean', title:'', text:'Texto narrativo amplio.' }`. **Ningún color, ninguna variante.** Slide: `title: 'Renderizado'` y `centerVertical: false` |
| Colocación en columnas (motor) | `src/builders/web/renderColumns.js:65-66` | `case 'narrative': return renderNarrative(item);` **Ruta explícita, sin fallback JSON** |
| **Fixture sandbox** | — | **AUSENTE en Web.** Ver §6.1 |

**Nota sobre `blockDefaults.js`:** el archivo existe y está **vacío, 0 líneas**, igual que midieron los
cuatro runs anteriores. Los defaults viven en `blockFactory.js`.

**Superficie Slide, medida y declarada, fuera del alcance de este run:** existe schema
(`SlideNarrativeItemSchema`), factoría (`blockFactory.js:316-321`), editor (el **mismo**
`NarrativeModeSelect` no se usa allí; el ítem Slide no tiene `mode`) y ruta de compilador
(`compiler.js:1260-1266`). A diferencia de `video`, `iconList` y `visual`, el desplegable de tipos de ítem
**sí lo ofrece habilitado**: `editorOptions.js:39`, `{ value: 'narrative', label: 'Narrativa' }`, **sin
`disabled`**. Se registra por completitud de S2 y **no se toca**: este run es Web.

### 6.1 El fixture que la matriz le asigna NO ejercita su renderer Web

La matriz de certificación (`:146`) y `CLAUDE.md` asignan a `narrative` el fixture
`src/content/sandbox/test_theory.js`. **Medido, recorriendo los cuatro fixtures que lo mencionan y
contando por flujo:**

```
showcase_library.js          narrative en sectionsWeb: 0 | en sectionsSlide: 7
test_arithmetic.js           narrative en sectionsWeb: 0 | en sectionsSlide: 2
test_multimedia.js           narrative en sectionsWeb: 0 | en sectionsSlide: 1
test_theory.js               narrative en sectionsWeb: 0 | en sectionsSlide: 4
```

**Catorce ocurrencias, las catorce en `sectionsSlide`. Cero en `sectionsWeb`.** Y no es un descuido: el
propio fixture lo dice en un comentario, `test_theory.js:228-229`, sobre la línea `:231`:

> "// 🔥 2. NARRATIVA WEB (TRANSFORMACIÓN A CARDS)
> // Convertimos los átomos narrativos en 'cards' para que usen renderCard.js (Web) y sus modos visuales"

De modo que los cuatro átomos narrativos, con sus `variant: 'ctx' / 'def' / 'meta'`
(`test_theory.js:37`, `:44`, `:51`, `:58`), entran al flujo Web **convertidos en `type: 'card'`** y los
pinta `renderCard.js`. Sus `variant` alimentan la **superficie Slide**, cuyo renderer es otro archivo
(`src/builders/slides/components/renderNarrative.js`).

**Consecuencia, medida:** `src/builders/web/partials/renderNarrative.js` —el renderer que este run
audita— **no tiene ninguna cobertura de fixture sandbox**, ni siquiera en `showcase_library.js`, que
`CLAUDE.md` describe como *«regresión global de JAME Core»*. Es D3. La celda de S2 se rellena
**declarando la ausencia**, que es lo que la DoD pide (*«plus its sandbox fixture where one exists»*).

### 6.2 LA FÓRMULA EN LÍNEA — **MEDIDA Y DECLARADA COMO OBSERVACIÓN**

> **Encuadre, antes del dato.** Esto **no es una capacidad soportada** de este componente. El run
> `RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001` (`queue_order` 25) dice verbatim que
> *«The prose field of the narrative component is NOT in this first set»*. Aquí **se mide y se declara**:
> **no se garantiza, no se documenta como soportado, no se fija con tests y no se cierra.**

**Verificado ejecutando, las cinco capas, con el texto que un autor teclearía:**

```
1. lo que teclea el autor : "La identidad \(a^2 + b^2 = c^2\) cierra el argumento."
2. schema (los dos lados) : ACEPTA — safeRequiredPlainText no mira delimitadores
3. compilador emite       : "La identidad \(a^2 + b^2 = c^2\) cierra el argumento."
   backslash intacto      : true
4. renderer inyecta       : "La identidad \(a^2 + b^2 = c^2\) cierra el argumento."
5. delimitadores en el DOM: true
```

**Y las tres salidas reales, generadas de verdad:**

```
PREVIEW REAL    | formula literal en el DOM: true | KaTeX auto-render: true | renderMathInElement: true
GENERATE WEB    | formula literal en el DOM: true | KaTeX auto-render: true | renderMathInElement: true
GENERATE MOODLE | formula literal en el DOM: true | KaTeX auto-render: FALSE | renderMathInElement: FALSE
```

El pase que la compone es **global y no del componente**:
`src/builders/web/buildSingleWebLesson.js:4` y `tools/author-lite/compiler-api/services/previewRenderer.js:14`
cargan `auto-render.min.js` de KaTeX 0.16.9 con `onload="renderMathInElement(document.body);"`, **sin
opciones**, así que rigen los delimitadores por defecto: `$$…$$`, `\(…\)`, `\[…\]`.

**Respuesta directa a la pregunta del encargo: SÍ. El campo de texto de este componente acepta hoy una
fórmula delimitada y la pinta, sin que ningún run lo autorizara.** Confirmado por ejecución en las cinco
capas y en dos de las tres salidas.

**Once formas medidas, y tres de ellas dicen algo que conviene que conste:**

| caso | schema | compilado (text) | llega al DOM |
|---|---|---|---|
| inline `\( \)` | ACEPTA | `La identidad \(a^2 + b^2 = c^2\) cierra el argumento.` | sí |
| display `\[ \]` | ACEPTA | `Se sigue que \[\int_0^1 x\,dx = \tfrac12\] y por tanto converge.` | sí |
| display `$$` | ACEPTA | `Se sigue que $$\frac{a}{b}$$ y por tanto converge.` | sí |
| dólar simple `$` | ACEPTA | `El valor $x = 3$ resuelve la ecuacion.` | sí (**y KaTeX no lo compone: `$…$` no está en los delimitadores por defecto**) |
| backslash suelto | ACEPTA | `Un texto con \alpha suelto, sin delimitador.` | sí |
| **ampersand de LaTeX** | ACEPTA | `Matriz \(\begin{matrix} a &amp; b \end{matrix}\) en linea.` | sí, **corrompido** |
| **comilla dentro** | ACEPTA | `El caso \(x&#39;=2\) tambien.` | sí, **corrompido** |
| **menor que** | ACEPTA | `Si \(a &lt; b\) entonces sigue.` | sí, **corrompido** |
| LaTeX inválido | ACEPTA | `Roto: \(\frac{1\) fin.` | sí (lo compone KaTeX o lo marca en rojo; el repo no decide) |
| `\href{javascript:…}` | **RECHAZA** | — | — |
| **salto de línea dentro** | ACEPTA | `Primera \(x^2\)<br />Segunda \(y^2\)` | sí, **con `<br />` insertado** |

**Las tres corrupciones y el `<br />` tienen una sola causa, y está citada:** `escapeHtmlWithLineBreaks`
(`compiler.js:99-110`) escapa `& < > " '` y convierte `\n` en `<br />`. Los caracteres que escapa son
exactamente los que LaTeX usa para alinear matrices (`&`), para la derivada (`'`) y para desigualdades
(`<`, `>`). **Es una observación medida, no un defecto que este run repare ni documente:** pertenece al
run 25, cuyo texto dice *«that the characters a formula needs survive each field's guard»* — es
literalmente lo que ese run va a declarar, y para `narrative` la respuesta es que **no todos sobreviven**.

**Lo que este run NO hizo con esto, y es deliberado:**

- **No escribió ningún test** que fije el comportamiento. Los cuatro archivos de test relacionados
  (§12.2) **no se tocaron**.
- **No lo documentó como soportado.** El packet canónico `NARRATIVE.md` no se editó (S9), y el packet de
  QA lo presenta como **observación a declarar**, con aviso explícito en cabecera.
- **No lo garantizó** en ninguna forma, ni cambió la clase de S4 por ello (§5).
- **No lo reparó.** Ni el escapado, ni el `<br />`, ni la ausencia de `$…$` en los delimitadores.

**Lo que sí existe hoy y fija el límite contrario, medido:**
`webRuleMathAuthoringIntegration.test.mjs:203` y `:207` construyen bloques `narrative` con formas de
**Math Authoring estructurado** (`RichTextV1`, `MathBlockGroupV1`) y aseguran que el schema **las
rechaza**. Y `webRuleSmartFormulaFieldRulePilot.test.mjs:388` asegura que el editor **no** monta el
Smart Formula Field para `narrative`. **Las dos aserciones fijan la forma estructurada. Ninguna toca la
forma de texto delimitado.** Ese es exactamente el hueco que el run 25 existe para cerrar, y no aquí.

---

## 7. S8 — La compuerta de reparación, y LOS DEFECTOS MEDIDOS **ANTES** DE TOCAR NADA

### 7.1 El estado de QA registrado

`.aiw/state/component_status.json`, entrada `narrative` — proyección, **no** fuente de verdad
(`projection_only: true`, `source_of_truth: false`):

```
human_qa_status      : HUMAN_QA_FAILED_REPAIR_REQUIRED
repair_status        : REPAIR_REQUIRED
docs_status          : HUMAN_QA_PACKET_READY
certification_status : NOT_CERTIFIED
blocked_by           : phase2_human_qa_failure, repair_ticket_required
notes                : "No repair was done in Round 002."
```

La proyección **no nombra el defecto**. Lo nombra la fuente de estado, la matriz de certificación,
en dos sitios y con las mismas palabras:

- `:187` — *«Human QA batch posterior falla por **cleanup de modo/naming**.»*
- `:310` — *«Human QA batch registro `HUMAN_QA_FAILED_REPAIR_REQUIRED`; requiere **limpieza de
  modo/naming** antes de cualquier aprobacion.»*

La DoD §8 lo confirma como entrada de S8: *«`narrative`, `callout`, `details`, `rule` enter with failed
Human QA. The recorded defects are S8 input, not new discoveries.»*

### 7.2 Reproducción contra código vivo — **LAS DOS MITADES REPRODUCEN**

**Mitad «modo»: la limpieza está hecha a medias, y las cuatro capas que faltan reproducen.**

| Capa | Estado hoy | ¿Limpio? |
|---|---|---|
| Editor, dos desplegables | `top` marcado `legacy: true` → `disabled` **y** `hidden` (`editorOptions.js:33`, `WebBlockEditor.jsx:308`) | **SÍ** |
| Schema editor-ui | `z.enum(['clean','side','top','surface'])` (`:718`) | **NO** |
| Schema compiler-api | `z.enum(['clean','side','top','surface'])` (`:731`) | **NO** |
| Compilador | `normalizeMode(block.mode, 'clean')` con `CARD_LEGACY_MODE_VALUES = ['side','top','surface','clean']` (`:22`, `:86-88`) | **NO** |
| Renderer del motor | regla `#uid.mode-top` viva (`renderNarrative.js:60-66`) | **NO** |
| Packet canónico | `NARRATIVE.md:16` y `:31` documentan `top` como opción del autor | **NO** |

Medición de extremo a extremo:

```
clean     | schema editor: ACEPTA | schema compiler: ACEPTA | compilado mode: clean   | renderer clase: mode-clean
side      | schema editor: ACEPTA | schema compiler: ACEPTA | compilado mode: side    | renderer clase: mode-side
surface   | schema editor: ACEPTA | schema compiler: ACEPTA | compilado mode: surface | renderer clase: mode-surface
top       | schema editor: ACEPTA | schema compiler: ACEPTA | compilado mode: top     | renderer clase: mode-top
```

**`top` entra, compila y pinta.** Lo único que no puede es volver a elegirse en el editor. **REPRODUCE.**

**Mitad «naming»: cuatro nombres para el mismo bloque, y una constante con nombre ajeno.**

| Dónde | Nombre |
|---|---|
| Riel y editor Web | **«Texto»** (`blockCatalog.js:25`, `:212`, `WebBlockEditor.jsx:260`, `:400`) |
| Desplegable de ítems de diapositiva | **«Narrativa»** (`editorOptions.js:39`) |
| Draft JSON, compilador, motor | `narrative` |
| Packet canónico | «Narrative» (`NARRATIVE.md:1`) |
| Constante que normaliza sus modos | **`CARD_LEGACY_MODE_VALUES`** (`compiler.js:22`) — nombre de `card`, gobierna `narrative` |

**REPRODUCE.**

### 7.3 La salida que la Definition of Done ordena, y por qué no se reparó

S8 tiene cuatro salidas. La que aplica, verbatim:

> "Reproduced and out of scope: declare `REPAIR_REQUIRED_OWN_SCOPE`, touch nothing."

**Por qué está fuera de alcance, medido y no supuesto:**

- Retirar `top` del enum exige editar **los dos `draftSchema.js`**, que son **archivos compartidos por los
  diecisiete componentes**. El criterio 13 del encargo nombra *«los dos esquemas»* como condición de
  PARA Y REPORTA.
- Retirar `mode-top` del renderer exige tocar **JAME Core**, que `CLAUDE.md` regla 7 protege sin
  instrucción explícita.
- Cambiar `CARD_LEGACY_MODE_VALUES` toca **`compiler.js`**, pieza compartida: esa misma constante la usa
  la ruta de `card` (`resolveCardType` y su `normalizeMode` con fallback `'side'`).
- Unificar «Texto»/«Narrativa» toca `editorOptions.js`, compartido por todas las superficies Slide.
- Corregir el packet lo prohíbe **S9**: *«A component run edits no packet and no Component Guide source.»*

**No queda ni una capa reparable dentro del componente sin cruzar una de esas líneas.** Se declara y no
se toca. El informe de opciones que el criterio 13 exige está en §16.

### 7.4 LOS DEFECTOS MEDIDOS **ANTES** DE TOCAR NADA — diez, ninguno reparado

| # | Defecto | Evidencia | Estado |
|---|---|---|---|
| **D1** | **La limpieza de modo está hecha solo en el editor.** `top` sigue vivo en los dos esquemas, en el compilador, en el renderer y en el packet; entra, compila y pinta, pero no se puede reelegir | `editorOptions.js:33`; `draftSchema.js:718` / `:731`; `compiler.js:22`, `:86-88`; `renderNarrative.js:60-66`; `NARRATIVE.md:16`, `:31` | **Reproducido. Autorizado por veredicto de QA. FUERA DE ALCANCE.** §16 |
| **D2** | **Cuatro nombres para un bloque**, más una constante llamada `CARD_LEGACY_MODE_VALUES` que gobierna los modos de `narrative` | §7.2 | **Reproducido. Autorizado por veredicto de QA. FUERA DE ALCANCE.** §16 |
| **D3** | **Cero cobertura de fixture sandbox en Web.** Las 14 ocurrencias están en `sectionsSlide`; `test_theory.js:231` convierte los átomos a `card` para Web. La matriz `:146` y `CLAUDE.md` le asignan un fixture que no ejercita su renderer | §6.1 | **Pendiente de veredicto.** Ningún veredicto de QA lo nombra |
| **D4** | **Cinco campos que el motor lee y nadie produce**, y el inventario nombra **uno**. `variant` (`:6`), `html` (`:7`), `accent` (`:8`), `textSize` (`:11-12`), `textScale` (`:15`). **`html` es el grave:** `data.html \|\| data.text` sustituye el cuerpo entero y se inyecta crudo en `:113` | `renderNarrative.js`; inventario `:136` solo lista `variant` | **Pendiente de veredicto.** Inalcanzable desde Author Lite (medido); es superficie de `jame_data` a mano |
| **D5** | **El id del `<section>` no es determinista.** `'narr-' + Math.random().toString(36).substr(2,8)`. Dos renders del mismo draft dan ids distintos: medido, `narr-2wg45pec` vs `narr-edtsdv61` | `renderNarrative.js:37` | **Pendiente de veredicto.** Toca JAME Core. Misma clase que la D7 de «Video» |
| **D6** | **`renderNarrative` usa `var(--j-text-md)` sin valor de respaldo**, único entre sus hermanos: `renderCallout.js:102`, `renderArithmetic.js:63`, `renderColumns.js:121`, `renderContainer.js:39` todos ponen fallback. **Verificado que hoy NO tiene efecto visible**: `renderLayout.js:8-17` define el token y llega a las tres salidas | `renderNarrative.js:81`, `:91` | **Pendiente de veredicto. Fragilidad, no fallo.** Se declara con su verificación negativa incluida |
| **D7** | **Asimetría `.strict()`.** Top-level acepta claves extra (incluidas `variant` y `html`); la unión de hijos de columnas las rechaza | `draftSchema.js:966` vs `:904` (editor-ui); `:994` vs `:932` (compiler-api) | **Pendiente de veredicto.** Ya declarada por `list` e `iconList`; **se reconfirma con dos claves nuevas** |
| **D8** | **El escapado del compilador corrompe las fórmulas que usan `& < > ' "`, y mete `<br />` dentro de una fórmula multilínea** | `compiler.js:99-110`; medición en §6.2 | **NO ES DE ESTE RUN.** Observación declarada; pertenece al `queue_order` 25 |
| **D9** | **La superficie Slide exige `title` y la Web no.** `SlideNarrativeItemSchema` usa `z.string().min(1)`; `WebNarrativeSchema` usa `safeOptionalPlainText` | `draftSchema.js:997-1002` vs `:716-721` | **Pendiente de veredicto.** Fuera de alcance: este run es Web |
| **D10** | **`narrativeType` es clave muerta en Web.** Los fixtures la llevan; solo la lee el renderer de **Slides** | `test_theory.js:37,44,51,58`; `test_arithmetic.js:80,103`; `src/builders/slides/components/renderNarrative.js:57` | **Pendiente de veredicto.** Fuera de alcance |

**Ninguno de los diez se tocó.** D1 y D2 tienen autorización de QA y no caben en el alcance; los demás no
tienen autorización, y la resolución adoptada del piloto §11.3(a) dice qué hacer con ellos: **anotarlos
como pendientes de veredicto, no resolverlos por criterio propio.**

---

## 8. S5 — Colocación en columnas, y S6 — Ida y vuelta de persistencia

### 8.1 S5 — las dos colocaciones, ambas válidas

**`narrative` es hijo válido de «Dos columnas».** No aplica ni la excepción auto-referencial de `columns`
ni el caso de rechazo por contrato que midió «Video». Contrato: `blockCatalog.js:1017`; matriz `:189`
(*«Required child compatibility de Phase 2: `header`, `list`, `iconList`, `card`, `narrative`, `rule`,
`callout`»*); ruta del motor: `renderColumns.js:65-66`, **explícita, sin caer al fallback JSON**.

```
-- top-level --
acepta schema : true
compilado     : {"type":"narrative","mode":"side","title":"Titulo","text":"Parrafo \(x^2\) fin."}

-- ambos slots --
acepta schema : true
slot izq == top-level (salvo mode): true
claves slot izq : type, mode, title, text
claves top-level: type, mode, title, text

-- invariancia de opciones de color por colocacion (contrato de color §7) --
top-level emite alguna clave de color : false
en slot emite alguna clave de color   : false
=> el conjunto de opciones de color es el mismo en las dos colocaciones: VACIO

-- render real dentro de columnas --
bordes pintados por renderColumns : ["#4C566A","#4C566A","#4C566A","#4C566A"]
delimitadores intactos en columnas : true

-- asimetria .strict(): campo extra --
top-level con textSize : ACEPTA (no .strict())
en slot   con textSize : RECHAZA (.strict())
```

**Las dos colocaciones registradas. PASS.** La única asimetría medida es D7, y no es de color.

### 8.2 S6 — ida y vuelta, once casos

Guardar y recargar se midió revalidando contra **los dos** esquemas; importar se midió por la **ruta real
del editor**, `parseAndValidateBlocks` (`jsonImporter.js:146`).

| caso | guardar+recargar | import Draft JSON | idempotente |
|---|---|---|---|
| mínimo (solo `text`) | OK (ambos schemas) | OK | sí |
| completo (`mode`+`title`+`text`) | OK | OK | sí |
| **fórmula inline `\( \)`** | OK | OK | **sí** |
| **fórmula display `$$`** | OK | OK | **sí** |
| acentos y `ñ` | OK | OK | sí |
| saltos de línea | OK | OK | sí |
| dentro de «Dos columnas» | OK | OK | sí |
| `mode` inválido | — | **RECHAZA**: `Bloque 1 (narrative): Invalid input` | — |
| sin `text` | — | **RECHAZA**: `Bloque 1 (narrative): Invalid input` | — |
| `text` vacío | — | **RECHAZA**: `Bloque 1 (narrative) — text: El texto no puede estar vacÃ­o` | — |
| con `variant` extra | OK | OK | **NO** — vuelve sin `variant` |

**Dos cosas que conviene fijar.** La primera: **la fórmula sobrevive la ida y vuelta intacta** —
observación, §6.2, no garantía. La segunda: **el importador descarta en silencio las claves extra** que el
schema top-level sí acepta; es la otra cara de D7 y **no se repara**. El mojibake del mensaje de error es
la deriva conocida de los dos esquemas, fuera de alcance.

**PASS.**

---

## 9. S7 — El packet de QA para el operador

**Ruta:**
`projects/cantu-studio/docs/_historical_run_record/RUN-JAME-WEB-NARRATIVE-REPAIR-001-OPERATOR-QA-PACKET.md`

Colocado junto a los packets de operador ya existentes en ese directorio —había **nueve**; con este,
**diez**—, siguiendo la resolución I-2 del piloto. **`.aiw/docs/docs_index.json` no se tocó.**

Es un **packet completo, no delta**. La DoD §6 reserva el delta para la fila
`EXPLICIT_HUMAN_PASS_PRESERVED`, y `narrative` está en la fila *«Failed - `HUMAN_QA_FAILED_REPAIR_REQUIRED`»*,
cuyo tratamiento es *«The recorded defect enters S8: reproduce, then repair in scope or declare»*. **No hay
PASS previo que delimitar**, así que el hueco (c) de «Lista con etiquetas» —el delta sin criterio— **no se
aplica aquí**, y se dice.

**Diecisiete checks**, cada uno con qué abrir, qué introducir, qué generar, qué se espera ver y qué
significaría que fallara, más columna de veredicto vacía. Semillas: las Gates 3-4 de la matriz §8 y las
respuestas de S3/S4 de este record.

**Dos checks tienen consecuencia de parada y van primero, marcados ⛔:**

- **Check 1** — que el bloque no muestre ningún control de color. Un fallo contradice la fila de la matriz
  de aplicabilidad, la clase `NO_COLOR_SURFACE` del inventario y toda la §4 de este record.
- **Check 2** — que cambiar la paleta activa no altere el bloque. Un fallo contradice la medición central:
  salida idéntica byte a byte entre dos paletas.

**Cuatro checks (3 a 6) son la comprobación del defecto que la QA humana registró**, «limpieza de
modo/naming», con los checks 4 y 6 declarados explícitamente como **observación que no puede fallar**,
porque su resultado es una decisión de producto del operador, no un bug.

**Cuatro checks (14 a 17) son la fórmula en línea, presentados como observación a declarar y NO como
garantía**, con aviso en cabecera que cita el run 25 y dice que un resultado «funciona» **no autoriza** a
documentarlo ni a depender de ello. El check 16 documenta la corrupción del `&` **como límite medido, con
la instrucción explícita de no tratarlo como bug de este run**.

**Etiquetas de plataforma usadas, todas derivadas del catálogo, ninguna inventada:**

| Superficie mencionada | Etiqueta | Origen |
|---|---|---|
| `narrative` | **«Texto»** | `blockCatalog.js:25` y `:212` |
| `columns` | **«Dos columnas»** | `blockCatalog.js:13` |
| `callout` | **«Nota destacada»** | `blockCatalog.js:43` |
| `card` | **«Tarjeta»** | `blockCatalog.js:49` |
| `list` | **«Lista»** | `blockCatalog.js:31` |
| `rule` | **«Regla matemática»** | `blockCatalog.js:85` |
| Grupo del riel | **«Básicos frecuentes»** | `blockCatalog.js:124` |

**Medición del catálogo:** los **diecisiete** componentes Web tienen etiqueta en `WEB_COMPONENT_UI`
(`blockCatalog.js:11-113`); **ninguna falta y ninguna se inventó**. **Lo que sí carece de etiqueta de
plataforma son las piezas de código que este record nombra** —`blockFactory.js`, `NarrativeModeSelect.jsx`,
`renderNarrative.js`, `CARD_LEGACY_MODE_VALUES`, `escapeHtmlWithLineBreaks`—: son código, no componentes
author-facing, **no tienen etiqueta y no se les inventa ninguna.** Es la misma medición que hicieron
«Tarjeta» y «Video».

---

## 10. S9 y S10 — Lo que este run deliberadamente NO escribió

**S9 — PASS.** No se escribió `docs/components/web/NARRATIVE.md` ni ninguna fuente del Component Guide.
El criterio de salida es *«no packet and no Guide source was written, and every discrepancy found is
recorded»*, y las dos mitades se cumplen. Se aplica el hueco I-6 del piloto: **este PASS mide la conducta
del run, no la salud del packet**, y el packet tiene tres problemas (§11, DIV-4, DIV-5).

**Los dos punteros muertos del packet canónico**, los mismos que encontraron los cuatro runs anteriores en
sus packets:

| Puntero en `NARRATIVE.md` | Estado | Ruta real |
|---|---|---|
| `docs/REFERENCE-DRAFT-JSON.md` (`:26`, `:48`) | **MUERTO** | `docs/reference/REFERENCE-DRAFT-JSON.md` |
| `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` (`:12`, `:66`) | **MUERTO** | `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` |

**Se enrutan al carril `DOCUMENTATION` y no se reparan.**

**S10 — PASS.** `.aiw/docs/docs_index.json` **no se editó**: la DoD lo saca de los runs de componente y lo
deja en los runs de verificación de packets. Los no-claims y conflictos preservados, verificados intactos:

- El conflicto `component-list-status-agents-vs-matrix-phase2` sigue en `.aiw/state/component_status.json`
  con `resolution: PRESERVE_AS_DOCUMENTATION_CONFLICT_NOT_CERTIFICATION`. **Intacto.**
- Los siete `global_no_claims` del archivo de estado. **Intactos.**
- El puntero de estado del packet (`NARRATIVE.md:12`, `:63-66`), que apunta a la matriz y **no afirma
  nada**. **Intacto**, incluso siendo un puntero muerto.
- La entrada `narrative` de la proyección, con su `HUMAN_QA_FAILED_REPAIR_REQUIRED`. **Intacta.**

---

## 11. Divergencias declaradas — gana el disco, no se edita nada

Regla aplicada, verbatim de la DoD §5: *«a divergence between this table and the live code is decided by
the code, declared in the evidence»*. **Nada se editó.**

| # | Documento y fila | Lo que dice | Lo que mide el disco |
|---|---|---|---|
| DIV-1 | **DoD §5, fila `narrative`** | «Color surface today: none» / «Palette-resolves: -» / «Math surface today: none» / «Math renders: -» | **COINCIDE en las cuatro columnas**, leída del pipeline de autor. Verificada con compilación viva contra dos paletas y render real de las tres salidas |
| DIV-2 | **DoD §5, texto** | «only `video`, `narrative` and `arithmetic` carry none [color surface]» | **COINCIDE para `narrative`.** `arithmetic` está fuera de alcance y no se midió |
| DIV-3 | **DoD §8** | «every other renderer resolves variants against the hardcoded maps» | **COINCIDE**, y es la medición B de §4.1: `renderNarrative.js:18-28` tiene mapa propio de nueve claves. **No contradice DIV-1**: son capas distintas |
| DIV-4 | **Packet canónico `NARRATIVE.md:16` y `:31`** | «`mode` selects the framing: `clean` […] while `side`, `top`, and `surface`» y «**mode**: `clean`, `side`, `top`, or `surface`» | **VENCIDO en `top`.** El editor lo oculta desde la limpieza parcial de D1. El packet lo sigue ofreciendo al autor como opción viva. **NUEVA** |
| DIV-5 | **Packet canónico `NARRATIVE.md:26`, `:48`, `:12`, `:66`** | Dos punteros de documentación | **LOS DOS MUERTOS.** §10. Es la misma pareja que declararon los cuatro runs anteriores; **se reconfirma sin cambio** |
| DIV-6 | **Inventario, fila `narrative`, citas de línea** (`:41`, `:87`, `:136`, `:147`) | `renderNarrative.js:3` / `compiler.js:1086` / `draftSchema.js:720-725` / `compiler.js:1086-1092` / `renderNarrative.js:19-28` / `renderNarrative.js:6` | **LAS CLASES SON CORRECTAS, DOS CITAS SE MOVIERON Y APUNTAN A OTRO COMPONENTE.** Siguen bien: `renderNarrative.js:3` (`module.exports = function renderNarrative`) ✔, `:6` (lectura de `variant`) ✔, `:19-28` (dentro del mapa) ✔. **Mal:** `compiler.js:1086` y `:1086-1092` apuntan hoy a `assertSafeTimelineString`, es decir a **`timeline`**, no a `narrative`, cuyo `case` está en `:1155-1161`; y `draftSchema.js:720-725` cae hoy en el final de `WebNarrativeSchema` más el arranque de `WebListSchema` en editor-ui —el bloque real es `editor-ui:716-721` y `compiler-api:729-734`—. **NUEVA** |
| DIV-7 | **Inventario §5, tabla** | Lista **un** campo de `narrative` que el motor lee y el autor no produce: `variant` | **SON CINCO.** `variant`, `html`, `accent`, `textSize`, `textScale`. Es D4. **NUEVA** |
| DIV-8 | **Matriz de certificación `:146` y `:187`; `CLAUDE.md`** | Asignan `test_theory.js` como fixture sandbox de `narrative` | **NO EJERCITA SU RENDERER WEB.** Cero ocurrencias en `sectionsWeb`; `:231` las convierte a `card`. Es D3. **NUEVA** |
| DIV-9 | **`.aiw/state/component_status.json`, entrada `list`** | `repair_status: POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED` y su `follow_up_required` | **VENCIDO.** El run 20 cerró con QA del operador en PASS sobre ese defecto. **Se declara; NO se repara; NO se toma como precedente.** Es la DIV-3 de `iconList`, la DIV-7 de `card` y la DIV-7 de «Video»: **cuarta reconfirmación sin cambio** |
| DIV-10 | **DoD §6, límite automatizado** | «thirty `*.test.mjs` files… holding 323 top-level `test(` declarations» | Hoy hay **32 archivos** y la suite corre **350 tests**. Declarada por los cuatro runs anteriores; **se reconfirma sin cambio** |
| DIV-11 | **DoD §2 y §5** | «Seventeen author-facing Web components are revalidated by twenty-two runs» | **La cifra de componentes COINCIDE** (17 etiquetas, 17 packets). **La de runs no se verificó**: el canónico cambió a mitad de sesión (§1.3) y recontar los 22 exigiría clasificar runs, que el encargo prohíbe. **Se declara como no medida**, no como divergencia |
| DIV-12 | **Contrato de color §3 y §4** | `narrative` **no aparece** en ninguna de las dos tablas | **NO es divergencia, es ausencia correcta**, y el inventario ya la declaró: *«`details`, `rule`, `table`, `split`, `conceptGrid`, `narrative`, `arithmetic`, `hierarchy`, `visual`, and `video` are absent from both»* (`REFERENCE-WEB-COMPONENT-COLOR-AND-MATH-INVENTORY.md:163-166`). Se registra para que nadie lo lea como omisión |

**DIV-9 es la que el encargo anticipaba**, y aparece por cuarta vez sin cambio. **DIV-4, DIV-6, DIV-7 y
DIV-8 son nuevas y las cuatro son de este componente.** Ninguna se editó: matriz de aplicabilidad,
contrato de color, inventario, packet canónico y archivo de estado están todos fuera de alcance.

---

## 12. Tests

**No se tocó ningún archivo de código, schema, renderer ni test.** Se corrieron como **medición**, que es
el estatus que la DoD §6 les da: *«A workshop that chooses to run a relevant test file records the result
as a measurement in its evidence table […] it is never a substitute for the S7 packet and never a repair
authorization.»*

### 12.1 Verificación de la cifra de la suite del compilador

La cifra del encargo era 350. **Verificada corriéndola, no dada por buena** — los 32 archivos:

```
node --test tools/author-lite/compiler-api/tests/*.test.mjs

ℹ tests 350
ℹ suites 0
ℹ pass 350
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 1541.7969
```

**350 de 350. Exacta.** Nada verde se puso rojo.

### 12.2 Los archivos directamente relacionados con `narrative`

**Cuatro**, corridos aparte como entregable del criterio 6. Criterio de selección, el mismo que usaron los
cuatro runs anteriores —los que construyen un bloque `kind: 'narrative'`, más la colocación en slots—,
aplicado con su resultado real: son los **únicos cuatro** de los 32 que mencionan `narrative`.

```
node --test
  tools/author-lite/compiler-api/tests/webTheoryTextBlocksSafety.test.mjs
  tools/author-lite/compiler-api/tests/webColumnsChildExpansionSafety.test.mjs
  tools/author-lite/compiler-api/tests/webRuleMathAuthoringIntegration.test.mjs
  tools/author-lite/compiler-api/tests/webRuleSmartFormulaFieldRulePilot.test.mjs

ℹ tests 56
ℹ suites 0
ℹ pass 56
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 398.3142
```

**56 de 56.** Nada verde se puso rojo.

**Cifras declaradas como medición ejecutada, no como conteo estático:** las dos, 350 y 56, salen de correr
`node --test`. **No se afirma ningún total sin correrlo.**

**No se corrió la suite completa del repo** (`tools/roadmap/tests/` quedó fuera). La lectura de «suite
completa» es la del piloto, I-3.

### 12.3 Aserciones ajenas en los archivos corridos

| Archivo | Con quién convive `narrative` | Estado de esos componentes |
|---|---|---|
| `webTheoryTextBlocksSafety.test.mjs` | `card`, `callout` en las mismas aserciones | `card` 22 `completed`; `callout` 27 `planned` |
| `webColumnsChildExpansionSafety.test.mjs` | `rule`, `card`, `callout`, `table`, y en `:614-623` siete kinds más | `card` y `columns` `completed`; el resto `planned` |
| `webRuleMathAuthoringIntegration.test.mjs` | `rule`, `callout`, `card`, `details`, `table` en la misma aserción (`:202-217`) | Todos `planned` salvo `card` |
| `webRuleSmartFormulaFieldRulePilot.test.mjs` | `rule` (dueño del archivo) y otros diez en la aserción negativa de `:388` | `rule` 30 `planned` |

**`narrative` no tiene ningún archivo de test propio.** Es lo contrario de «Video», cuyo
`webVideoIframeSecurity.test.mjs` pertenece a un solo componente. **Ninguna aserción ajena se tocó, porque
no se tocó ningún test.**

**Y se declara expresamente lo que NO se escribió:** ningún test nuevo que fije el comportamiento de la
fórmula en línea. **Escribirlo es el `queue_order` 25, no éste.**

---

## 13. HUECOS NUEVOS DEL PROCEDIMIENTO — solo los que los cuatro runs anteriores no declararon

Ya declarado y **confirmado sin repetir**: S1 sin campo `lane`; S2 nombra los dos schemas y no ordena
compararlos; la partición de las diez preguntas; I-1 a I-6 del piloto; sus huecos (a) compuerta sin salida
para medición propia, (b) `DECLARED`/`NA` sin veredicto, (c) S6 sin decir si vale citar un test, (d) S9
PASS que no distingue «el packet está bien» de «no lo escribí y anoté que está mal»; las ocho preguntas
vacías de S4 —**sexto componente seguido sin math**—; de `iconList`: S2 nombra cinco capas y hay más, el
`NOT_APPLICABLE` de S8 engaña, el «delta packet» sin criterio; de `card`: S2 sin criterio para sub-tipos,
S3 preguntando por «el contraste» como si hubiera uno; de `video`: S5 sin salida para un excluido de
columnas, S3 sin patrón para un «no hay superficie», la pregunta 6 de S4 presuponiendo que solo los campos
de math producen KaTeX, y el hueco de contenido de terceros.

**Dos confirmaciones que sí conviene fechar, porque «Video» las anticipó por nombre:**

- Su §16.1(b) predijo que **«Texto»/`narrative` (24)** sería uno de los dos que entrarían por el hueco del
  S3 vacío. **Se confirma, y el patrón de I-4 volvió a servir**, con el trabajo extra que ese hueco
  describía: demostrar una ausencia en cinco capas cuesta más que responder que sí.
- Su §16.1(c) —la dirección inversa del patrón de regresión de math, un campo **sin** math que **sí**
  produce KaTeX— **se confirma aquí en su forma más fuerte**: no es un delimitador que sobrevive, es el
  campo de prosa principal del repositorio componiendo fórmulas en las dos salidas Web. **Se confirma y no
  se amplía.**

Lo que sigue es lo que este componente añade.

### 13.1 ¿Tiene la Definition of Done algún paso para un componente cuyo campo principal es prosa larga?

**NO. Ninguno. Es hueco, y se declara.**

Es la pregunta que el encargo hacía, y la respuesta está medida. Los diez pasos S1–S10 miden: identidad,
estado interno, color, math, colocación, persistencia, QA humana, reparación, packet y no-claims.
**Ninguno pregunta nada sobre un campo de texto libre y largo.** Concretamente, no hay paso que exija medir:

| Lo que este componente tiene y ningún paso pide | Dónde acabó medido en este record |
|---|---|
| Si el campo de prosa tiene tope de longitud, y qué pasa si no lo tiene | §5, pregunta 9 — dentro de S4, porque no había dónde más. **`text` no tiene tope**: solo `min(1)` |
| Qué le hace el escapado del compilador a los caracteres que un autor usa de verdad en prosa técnica (`&`, `<`, `>`, `'`) | §6.2 — dentro de S2, colgando de la medición de fórmula |
| Cómo se tratan los saltos de línea, que en un campo de una frase no existen y aquí son la estructura del párrafo | §8.2 — dentro de S6, como un caso más de ida y vuelta |
| Si el contenido puede llegar por una vía distinta del campo (`data.html`) | §7.4 D4 — dentro de S8, porque no había paso |
| Qué ve el autor cuando su prosa contiene algo que la guardia rechaza —Markdown, por ejemplo, que **se acepta**— | §5, pregunta 10 — a medias, porque la pregunta es sobre fórmulas rechazadas |

**Los cinco acabaron colgando de S2, S4, S6 y S8 porque no hay un paso al que pertenezcan.** Y eso los
hace fáciles de omitir: **un run que rellene la tabla de evidencia al pie de la letra puede cerrar los diez
pasos sin haber escrito nunca un párrafo de más de una frase en el campo**, y su tabla se verá idéntica a
ésta. La celda de S2 admite «catalog / schemas / compiler / renderer / fixture»; ninguna celda tiene sitio
para «medí qué le pasa a la prosa».

**La asimetría es visible en el propio documento:** S3 y S4 son **dos pasos enteros** dedicados a color y a
math, con diez preguntas cada uno y cinco clases cada uno. **El texto —que es lo que todo componente
author-facing lleva, y lo único que éste lleva— no tiene ni un paso ni una pregunta.**

**Tres componentes más entran por aquí**, y se nombran porque son los que la propuesta del barrido pone en
el mismo grupo de prosa: **«Nota destacada»/`callout` (27)**, **«Nota desplegable»/`details` (28)** y
**«Regla matemática»/`rule` (30)**, cuyo `description` es prosa junto al único campo con allowlist de LaTeX.

**Se mide y se reporta. NO se propone reescribir la Definition of Done:** enmendarla es del operador y su
ejecución es otro run.

### 13.2 ¿Qué paso no fue ejecutable tal como está escrito?

**(a) NUEVO — S8 no dice qué hacer cuando el veredicto de QA nombra el defecto con dos palabras.** El
registro dice «cleanup de modo/naming». S8 exige *«whose defect the workshop reproduces against live
code first»*. **Pero «modo/naming» no es un defecto: es una categoría.** Tuve que decidir yo qué cuenta
como esa categoría, y elegí seis capas para «modo» y cinco sitios para «naming» (§7.2). **Otro run con
otro criterio reproduciría otra cosa y podría concluir lo contrario** —por ejemplo, que la mitad de editor
basta y el defecto está cerrado—. El procedimiento no tiene criterio de suficiencia para reproducir un
defecto enunciado en categoría. **Es elección mía y lo digo.** **Tres componentes más entran con QA fallida**
(`callout`, `details`, `rule`) y sus registros están escritos con la misma concisión.

**(b) NUEVO — el criterio de salida de S8 obliga a elegir entre «reproducido» y «reparable» sin decir cuál
manda.** La salida que usé, `REPAIR_REQUIRED_OWN_SCOPE`, se define como *«A reproduced defect exceeds the
run's scope»*. Aquí el defecto **no excede el alcance por su tamaño**, sino porque **cada una de sus cuatro
capas vive en un archivo compartido**. Son cosas distintas: un defecto grande de un archivo propio, y un
defecto pequeño repartido por cinco archivos de todos. **El texto solo contempla la primera.** Lo resolví
como fuera de alcance porque el efecto práctico es el mismo, y **lo digo porque es elección mía**.

### 13.3 ¿Qué criterio de salida faltó?

**NUEVO — S2 pide el fixture sandbox «where one exists» y no dice cómo comprobar que el que existe es el
correcto.** El criterio literal es *«plus its sandbox fixture where one exists»*. La matriz asigna a
`narrative` el fixture `test_theory.js`, y **existe**. Un run que rellenara la celda citando esa ruta
habría cumplido el criterio al pie de la letra **y habría afirmado algo falso**: ese fixture no ejercita el
renderer Web de este componente (§6.1). **Hizo falta contar por flujo para verlo**, y contar por flujo no
lo pide ningún paso. **Es la misma clase de hueco que `iconList` declaró para «la rama del editor»** —el
paso nombra un artefacto y no ordena verificar que sea el que dice ser— **pero sobre una capa distinta, y
aquí sí mordió.**

### 13.4 ¿Qué sobra? — confirmación, sin hallazgo nuevo

Las ocho preguntas vacías de S4 volvieron a ocupar espacio real, en el **sexto** componente sin math
seguido. Y con ellas, por segunda vez, **cinco preguntas vacías o vacuas de S3** (§4: la 4, la 5, la mitad
de la 8 y la 10). Ya declarado por el piloto, `iconList`, `card` y `video`; **se confirma y no se amplía.**

---

## 14. Las cifras del encargo, verificadas una a una

**Ninguna se dio por buena.** El encargo advertía de que vienen de mediciones fechadas y pueden estar mal.

| Cifra del ticket | Medida | Veredicto |
|---|---|---|
| 17 componentes | **17** etiquetas en `WEB_COMPONENT_UI` (`blockCatalog.js:11-113`) | **EXACTA** |
| 17 packets | **17** archivos `.md` en `docs/components/web/` | **EXACTA** |
| 16 ids en el archivo de estado | **16** en `.aiw/state/component_status.json` (`columns` ausente, como la DoD §6 declara) | **EXACTA** |
| 350 tests en la suite del compilador | **350**, corridos | **EXACTA** |
| Total de runs, «puede haber cambiado» | **68** al cerrar; **66** al abrir | **CAMBIÓ DURANTE LA SESIÓN.** §1.3 |
| `queue_order` 24, «puede haber cambiado» | **24**, sin mover, título verbatim OK | **NO CAMBIÓ.** Re-derivado tras la inserción |

**Cifras que el ticket no daba y el criterio 9 mandaba medir:** `history=25`, `ready_next=17`, y `later=25`,
`now=1`, `needs_human_decision=0`.

**Sobre `ready_next`, para que el sexto run no herede una inferencia mala:** «Video» midió 16 y declaró que
la regla «baja de uno en uno cada cierre» no se sostiene. Aquí sube a **17**, y la causa está medida y no
es un cierre: **es la inserción de los dos runs de §1.3.** `history` subió 24→25 por el cierre del 23, y
`ready_next` 16→17 por la inserción. **Son dos movimientos independientes en la misma ventana.** Cualquier
regla derivada de una sola columna es inservible; hay que leer las cuatro.

---

## 15. Validador

Por la vía que no escribe, desde `projects/cantu-studio`:

```
node tools/project-console/validate-project-console-state.mjs
```

**Salida completa:**

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 68 runs; queue groups needs_human_decision=0 now=1 ready_next=17 later=25 history=25
Roadmap v3 active run derived stages: RUN-JAME-WEB-NARRATIVE-REPAIR-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**Total de runs: 68. `history=25`. `ready_next=17`.** El validador reconoce el run activo como
`RUN-JAME-WEB-NARRATIVE-REPAIR-001`. **El aviso no bloqueante de la dependencia externa es el conocido y
legal; no es hallazgo.** La validación **pasa**.

---

## 16. PARA Y REPORTA — informe de opciones, coste medido y recomendación, SIN DECIDIR

**Condición disparada, del criterio 13:** *«reparar exigiera tocar una pieza compartida, los dos esquemas o
la fábrica de bloques»*. D1 y D2 tienen autorización de QA (§7.1) y **las dos la disparan**. **No se
reparó nada.** Lo que sigue es el informe, y **la decisión es del operador**.

**Las otras tres condiciones NO se dispararon:** el canónico casa con el objetivo (§1, re-verificado tras
el cambio); la contradicción del color **sí** se dejó resolver desde disco (§4.1); y el trabajo **no**
creció hacia garantizar la fórmula en línea (§6.2, §12.2).

### Opción A — no tocar nada; el operador decide si «Superior» se queda

**Qué implica:** el packet canónico (`NARRATIVE.md:31`) se corrige para no ofrecer `top`, o el editor
vuelve a ofrecerlo. **Coste:** una línea de packet, carril `DOCUMENTATION`, run de verificación de packets.
Cero código. **Riesgo:** ninguno técnico. **Deja vivo:** el resto de D1 (schema, compilador, motor siguen
aceptando `top`), que es inofensivo mientras nadie lo teclee a mano.

### Opción B — retirar `top` de los dos esquemas

**Qué implica:** quitar `'top'` del `z.enum` en `editor-ui/src/schemas/draftSchema.js:718` y
`compiler-api/schemas/draftSchema.js:731`. **Coste medido:** dos líneas, pero en **archivos compartidos por
los diecisiete componentes**; obliga a correr los 32 archivos de test del compilador (350 tests, 1,5 s) y
**rompe cualquier draft ya guardado con `mode: 'top'`**, que el schema pasaría a rechazar en carga.
**Riesgo:** ALTO y silencioso — no hay inventario de drafts guardados en este record y medirlo está fuera
de alcance. **Dispara la condición del criterio 13** («los dos esquemas»).

### Opción C — retirar también `mode-top` del renderer

**Qué implica:** B, más borrar `renderNarrative.js:60-66`. **Coste:** siete líneas en **JAME Core**, que
`CLAUDE.md` regla 7 protege sin instrucción explícita. **Riesgo:** contenido `jame_data` escrito a mano con
`mode: 'top'` perdería su marco sin aviso. **No recomendada sin auditar el contenido existente.**

### Opción D — la mitad de «naming»

**Qué implica:** unificar «Texto»/«Narrativa» en `editorOptions.js:39`, y renombrar
`CARD_LEGACY_MODE_VALUES` (`compiler.js:22`). **Coste:** dos identificadores, los dos en **piezas
compartidas**; el renombrado toca la ruta de `card`, cuyo run ya cerró. **Riesgo:** bajo técnicamente, pero
**cruza el límite de un componente ya revalidado**, que el encargo pone fuera de alcance.

### Recomendación explícita, sin decidir

**Recomiendo la Opción A**, y **la decisión es suya**. Tres razones medidas:

1. **El desacuerdo real es de documentación, no de comportamiento.** Las cuatro capas «sucias» de D1 no
   producen ningún fallo hoy: nada en Author Lite puede emitir `top` desde que el editor lo ocultó. El
   único artefacto que sigue ofreciéndoselo a un autor es el packet, y corregir un packet es barato,
   reversible y de un carril que ya existe.
2. **B y C son irreversibles hacia atrás y no están medidas.** Ninguna de las dos se puede evaluar sin
   saber cuántos drafts guardados llevan `mode: 'top'`, y ese inventario no existe. Hacerlas a ciegas
   convierte una inconsistencia inerte en una pérdida de contenido.
3. **D cruza a un componente cerrado.** «Tarjeta» cerró en el `queue_order` 22; renombrar una constante que
   su ruta usa reabre superficie ya revalidada por un beneficio puramente nominal.

**Si el operador prefiere cerrar D1 del todo**, el orden con menos riesgo es: primero medir el corpus de
drafts guardados que llevan `mode: 'top'` —lo que es un run propio—, después B, después C, y D aparte y al
final. **Nada de eso cabe en este run.**

---

## 17. En qué status debe quedar el run, y qué falta para llegar ahí

**El run debe quedar `active`**, y este encargo **no lo cambia**. No se re-emitió `.project/`.
**No se clasificó ningún run. No se insertó, movió ni renumeró ninguno.**

El taller terminó su mitad: S1–S6 completos, S7 preparado, S8 reproducido y declarado, S9 y S10
verificados. **Verdicto: `REPAIR_REQUIRED_OWN_SCOPE`.** Falta, en este orden:

1. **La QA humana del operador** con el packet de §9, en particular:
   - **los checks 1 y 2**, marcados ⛔ **«PARE Y REPORTE»**: un fallo en cualquiera contradice la medición
     central de este run, la fila de la matriz de aplicabilidad y el inventario, y **no debe tratarse como
     un defecto pequeño**;
   - **los checks 4 y 6**, que son la parte de D1 y D2 que **exige decisión de producto**, no reporte de
     bug: si «Superior» se queda o se va, y si «Texto»/«Narrativa» conviven;
   - **el check 10**, cuyo fallo sería una brecha de seguridad y no una incidencia de usabilidad.
2. **La decisión del operador sobre §16**, que es la que desbloquea D1 y D2. **El taller no elige.**
3. **Si vuelve PASS y el operador elige la Opción A**: el cierre, más la decisión sobre los ocho defectos
   restantes de §7.4 y las doce divergencias de §11. El taller no toca ninguno.
4. **Si vuelve FAIL nombrando un defecto nuevo**: entra por S8 con autorización, se reproduce, y se repara
   **si está en alcance** — con el aviso medido de §16 sobre qué exige cada capa.

**Lo cierra el operador desde la consola global, que es el punto de serialización.**

---

## 18. Archivos escritos — dos, y ninguno más

1. `projects/cantu-studio/docs/_historical_run_record/RUN-JAME-WEB-NARRATIVE-REPAIR-001-OPERATOR-QA-PACKET.md` (nuevo)
2. `projects/aiw-console/context/aiw-console/records/REVALIDACION-COMPONENTE-TEXTO-CANTU.md` (este record)

---

## 19. Lo que este encargo NO hizo

- **No reparó ningún defecto.** Diez medidos (D1–D10). **D1 y D2 tenían autorización de QA y aun así no se
  tocaron**, porque su reparación exige piezas compartidas y los dos esquemas: es la salida
  `REPAIR_REQUIRED_OWN_SCOPE` que la DoD ordena, y el informe del criterio 13 está en §16.
- **No garantizó, no documentó ni fijó con tests la fórmula en línea.** La midió en cinco capas y tres
  salidas, encontró que **sí funciona hoy** y que **corrompe `& < > '`**, y **no escribió ni una línea de
  test, ni una línea de packet, ni una línea de contrato sobre ello.** Es del `queue_order` 25.
- **No cerró el run** ni cambió su `status`. **No re-emitió `.project/`.** **No clasificó ningún run.**
- **No editó** la Definition of Done, el contrato de color, el contrato de math, el inventario, la matriz
  de aplicabilidad, `docs_index.json`, `component_status.json`, la matriz de certificación,
  `docs/components/web/NARRATIVE.md` ni ninguna fuente del Component Guide, **pese a las doce divergencias
  de §11 y a los dos punteros muertos de §10**.
- **No reparó DIV-9**, el estado vencido de `list`, **ni lo tomó como precedente**: el estado de `narrative`
  se midió de cero.
- **No tocó el canónico**: ni `status`, ni `title`, ni `full_description`, ni `depends_on` de ningún run. No
  insertó, movió ni renumeró. **Detectó que otro actor sí lo hizo durante la sesión y solo lo declaró**
  (§1.3).
- **No amplió el componente.** Mejoras que **se nombran y no se hacen**: poner tope de longitud a `text`;
  exponer `textSize`, `textScale`, `accent` o `variant` al autor (D4) —que además lo metería en el patrón
  de regresión de paleta (§4.1)—; hacer determinista el id del `<section>` (D5); poner fallback al token
  tipográfico (D6); alinear la asimetría `.strict()` (D7); dar un fixture sandbox Web al componente (D3).
  **Ninguna está en el `full_description` ni en la Definition of Done.**
- **No tocó ningún fixture sandbox**, ni sus líneas de `narrative`. **Ninguna aserción ajena se movió**,
  porque no se tocó ningún test.
- **No tocó la superficie Slide** del componente, que existe entera y **está habilitada** en el desplegable
  de tipos de ítem —a diferencia de `video`, `iconList` y `visual`—. La midió y la declaró en §6.
- **No tocó la fábrica de bloques**, ni la compuerta de badge compartida por «Tarjeta» y «Tabla», ni ninguna
  pieza compartida.
- **No corrió la suite completa del repo** (`tools/roadmap/tests/` quedó fuera), no levantó la consola ni
  ningún servidor, **no ejecutó git en ninguna forma**.
- **No reparó derivas conocidas**: el mojibake de los mensajes de error de los dos esquemas —visible en el
  propio mensaje de este componente, `"El texto no puede estar vacÃ­o"`,
  `compiler-api/schemas/draftSchema.js:733` y su espejo `editor-ui:720`—, los punteros muertos de packets,
  el CLI local de roadmap, ni los defectos sin dueño de los componentes ya revalidados.
- **No propuso la reescritura de la Definition of Done.** §13 mide y reporta, incluido el hueco de la prosa
  larga que el encargo preguntaba; enmendarla es del operador y su ejecución es otro run.
- **Una condición de PARA Y REPORTA SÍ se disparó** —reparar exigiría tocar piezas compartidas y los dos
  esquemas— **y se reportó en §16 con opciones, coste medido y recomendación explícita, sin decidir.** Las
  otras tres no: el canónico casa con el objetivo, la contradicción del color se resolvió desde disco, y el
  trabajo no creció hacia garantizar la fórmula en línea.

---

## 20. Procedencia

- Canónico: `projects/cantu-studio/.aiw/roadmap/roadmap.json`, **68 runs al cerrar (66 al abrir)**, leído y
  **no escrito**.
- Procedimiento: `docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md`, **leída entera
  antes de medir nada**.
- Contratos consumidos: `REFERENCE-COLOR-PALETTE-COMPATIBILITY.md` §9 (y §2–§8, §10 para las divergencias),
  `REFERENCE-MATH-FORMULA-COMPATIBILITY.md` §10, §5 y §6.
- Inventario, que el `full_description` nombra como punto de partida:
  `docs/reference/REFERENCE-WEB-COMPONENT-COLOR-AND-MATH-INVENTORY.md:41`, `:87`, `:136`, `:147-154`,
  `:163-166`.
- Estado previo de QA: `.aiw/state/component_status.json`, entrada `narrative`;
  `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` `:146`, `:187`, `:189`, `:310`,
  `:325`, `:329`, `:355-357`, y §8 Gates 3-4 para sembrar el packet.
- Packet canónico consultado y **no escrito**: `docs/components/web/NARRATIVE.md`.
- El run insertado que fija el límite de la fórmula en línea:
  `RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001` (`queue_order` 25), leído íntegro.
- Propuesta de conjunto de campos, consultada y declarada como propuesta:
  `records/BARRIDO-DIAGNOSTICO-FORMULA-EN-LINEA-CANTU.md` §4.2, §4.4.
- Records anteriores, leídos y **obligatorios**, no contexto opcional:
  `PILOTO-REVALIDACION-COMPONENTE-LISTA-CANTU.md` §11,
  `REVALIDACION-COMPONENTE-LISTA-CON-ETIQUETAS-CANTU.md` §13,
  `REVALIDACION-COMPONENTE-TARJETA-CANTU.md` §15,
  `REVALIDACION-COMPONENTE-VIDEO-CANTU.md` §2 y §16.
- Packet de QA producido:
  `projects/cantu-studio/docs/_historical_run_record/RUN-JAME-WEB-NARRATIVE-REPAIR-001-OPERATOR-QA-PACKET.md`.
