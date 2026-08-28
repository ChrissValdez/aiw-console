# CENSO — superficie viva frente a historia, para «Cálculo aritmético» → «Factorización aritmética»

> Medido el **2026-08-28** por `RUN-CANTU-ARITHMETIC-COMPONENT-RENAME-001` (`queue_order` 151).
> **Publicado ANTES de cambiar una sola línea**, que es lo que pide el criterio 1 del encargo.
> Toda cifra de aquí sale del comando que la acompaña. **Ninguna se hereda del ticket.**

---

## 0 · LA GUARDA DE ABORTO, VERIFICADA

`queue_order` **151** en `.aiw/roadmap/roadmap.json` → `objectives[4].phases[2].runs[65]`:

| campo | valor en disco |
|---|---|
| `run_id` | `RUN-CANTU-ARITHMETIC-COMPONENT-RENAME-001` |
| `title` | `Rename the arithmetic component to Factorizacion aritmetica on both rails` |
| `status` | `active` |

El `title` coincide **exactamente** con el del encargo. Se sigue.

**Servidor de desarrollo reiniciado antes de mirar previa o editor.** Había un `vite` vivo en el
puerto 5173 (PID 32228, arrancado a las **11:34:48**, `editor-ui/node_modules/.bin/../vite/bin/vite.js`).
Se detuvo, se comprobó el puerto libre y se arrancó uno nuevo: **`VITE v8.0.10` listo a las
`11:47:28` del 2026-08-28**. El borrador del operador no se ha tocado.

---

## 1 · EL CRITERIO CON EL QUE SE SEPARA — y de dónde sale

**No es criterio propio: es el que este repo ya usa**, escrito dentro de
`slideTypeNames.test.mjs:196-205` y `:232-243` para el precedente de `timeline`
(«Secuencia de pasos» → «Procedimiento matemático»). Dice, literalmente, que una línea es prosa si
su texto recortado empieza por `//` o por `*`, y que **sólo las demás son «vivas»**:

```js
const vivas = fuente.split('\n').filter((linea) => {
  const limpia = linea.trim();
  if (limpia.startsWith('//') || limpia.startsWith('*')) return false;
  return /'Secuencia de pasos'|label: 'Secuencia de pasos'/.test(linea);
});
assert.deepEqual(vivas, [], `${nombre}: sigue diciendo «Secuencia de pasos»`);
```

**Se le añade `{/*`**, que aquel precedente no necesitó y este sí: `SlideItemEditor.jsx:911` es un
comentario JSX y el filtro mecánico lo daba por vivo. Corregido en este censo.

Sobre las líneas vivas se aplica el segundo tamiz, el del encargo: **¿AFIRMA el nombre de hoy en
una superficie que lee el AUTOR, o sólo lo NOMBRA?** Las dos preguntas son distintas y dan tres
clases, no dos.

**Y el precedente también fija qué se dejó quieto:** tras renombrar `timeline`, los comentarios de
las pruebas siguen diciendo «Secuencia de pasos» en nueve ficheros (`webInlineFormulaInserterMount`,
`webSmartFormulaActionPlacement`, `webTimelineStepDefaultsRound4`, …). **La historia se quedó.**

---

## 2 · EL TERRENO, MEDIDO — y las dos cifras del ticket que no cuadran

```bash
python - <<'EOF'
import os, re
PAT = re.compile(r'c[aá]lculo\s+aritm[eé]tico', re.I)
hits = {}
for root, dirs, files in os.walk('.'):
    dirs[:] = [d for d in dirs if d not in ('node_modules', '.git')]
    for f in files:
        p = os.path.join(root, f).replace(os.sep, '/')
        try: t = open(p, encoding='utf-8').read()
        except Exception: continue
        n = len(PAT.findall(t))
        if n: hits[p] = n
print('FICHEROS:', len(hits), ' OCURRENCIAS:', sum(hits.values()))
EOF
```

```
FICHEROS: 79  OCURRENCIAS: 229
```

**El ticket y el record del veredicto dicen «73 ficheros». En disco son 79.** La diferencia no es
cosmética y conviene dejarla escrita, porque explica por qué:

- `grep -rIl "Cálculo aritmético"` devuelve **63**. Es el número que se obtiene con la herramienta
  obvia, y **se queda corto por dos motivos**: `grep -I` salta ficheros que juzga binarios, y el
  patrón literal no ve las variantes **sin tilde** («calculo aritmetico»), que son las que usa el
  operador cuando escribe y las que citan sus verbatims.
- Contando las dos formas y sin saltar nada: **79**.
- De esos 79, **4 están fuera de alcance por definición** (`.aiw/roadmap/roadmap.json`,
  `.project/roadmap.json`, `.project/snapshot.json`, `.project/git_history.json`) y **1 es
  compilado** (`editor-ui/dist/assets/index-CLcEJEUc.js`). Quedan **74 de repo**, de los cuales
  **39 son `QA/temp/`**.

**No se corrige el ticket, se mide y se reporta**: gana el disco.

---

## 3 · LA CLASE 1 — SUPERFICIE VIVA DE AUTOR · **4 líneas, y se tocan las 4**

Son las líneas que **el autor lee** y que **afirman el nombre de hoy**.

| # | fichero:línea | qué lee el autor | cómo se llegó |
|---|---|---|---|
| 1 | `tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js:134` | `WEB_COMPONENT_UI.arithmetic.label` — **LA FUENTE**: de aquí salen el riel y el buscador de Web | censo |
| 2 | `tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js:266` | `BLOCK_CATALOG` → entrada `web-arithmetic`: la tarjeta de la paleta de Web | censo |
| 3 | `tools/author-lite/editor-ui/src/features/editor/constants/editorOptions.js:302` | `SLIDE_ITEM_TYPE_OPTIONS` — **el selector de celda del carril DIAPOSITIVA** (`slideGridGeometry.js:395` lo lee para rotular la celda) | censo |
| 4 | `tools/author-lite/compiler-api/services/compiler.js:1958` | `WEB_KINDS_WITHOUT_COLUMN_RENDERER.arithmetic`: **el mensaje de rechazo dentro de «Dos columnas»**, que el autor lee | censo + precedente |

**La 4 no la descubre el censo, la descubre el precedente.** `RUN-CANTU-SLIDE-TYPE-NAMES-001` ya
enumeró **cuatro** superficies para renombrar `timeline`, y su paquete de QA dice por qué la del
compilador entra: *«ESTE MENSAJE LO LEE EL AUTOR, asi que sigue al catalogo»*
(`compiler.js:1952-1955`). La lista de aquel run es la misma de éste, casilla por casilla:

| precedente `timeline` | equivalente `arithmetic` |
|---|---|
| `blockCatalog.js` → `WEB_COMPONENT_UI` | ✅ `:134` |
| `blockCatalog.js` → `BLOCK_CATALOG` | ✅ `:266` |
| `WebBlockEditor.jsx` → marcador «… sin título» | **no aplica, y a propósito** (§6) |
| `compiler.js` → rechazo de columna | ✅ `:1958` |

Y donde `timeline` no tenía nada, `arithmetic` sí: la **entrada 3**, el carril de diapositiva.

---

## 4 · LA CLASE 2 — GUARDAS SOBRE LA CADENA · **2 líneas, se MUEVEN, no se aflojan**

| # | fichero:línea | qué fija |
|---|---|---|
| 1 | `tools/author-lite/compiler-api/tests/slideArithmeticItemAdmit.test.mjs:163` | `assert.equal(WEB_COMPONENT_UI.arithmetic.label, 'Cálculo aritmético', 'con esa tilde y esas dos palabras')` — **LA GUARDA que el encargo nombra**, con esas palabras exactas |
| 2 | `tools/author-lite/compiler-api/tests/webArithmeticMatrixAuthoringRound2.test.mjs:452` | `assert.match(blockCatalogSource, /label: 'Cálculo aritmético'/)` — fija el rótulo **contra el fuente del catálogo** |

El nombre nuevo **también lleva tilde y también son dos palabras**, así que la guarda 1 sigue
comprobando exactamente lo mismo: cambia la cadena esperada y **no cambia lo que exige**.

---

## 5 · LA CLASE 3 — HISTORIA · **NO SE TOCA NADA**

**48 líneas de prosa** dentro de alcance, más `QA/temp/` entero. Todas CITAN el nombre para contar
algo que **sigue siendo cierto** («aquel run retiró «Cálculo aritmético» de las columnas»).

| dónde | líneas | por qué se queda |
|---|---|---|
| `QA/temp/` (39 ficheros, 87 ocurrencias) | — | es el registro de lo que pasó; reescribirlo lo falsearía |
| `docs/_historical_run_record/` (12 ficheros) | 12 | veredictos fechados del operador: inmutables |
| `docs/project-console/`, `docs/reference/` | 7 | narran decisiones de su fecha, no el nombre de hoy |
| `src/builders/slides/components/renderArithmetic.js:242` | 1 | **verbatim del operador** del 2026-08-27 |
| `src/builders/web/renderColumns.js:27,107` | 2 | cuentan la retirada de las columnas |
| `compiler-api/schemas/draftSchema.js` `:1777 :3436 :3440 :3476` | 4 | notas de admisión, fechadas |
| `compiler-api/services/compiler.js:2717,3737` | 2 | cabeceras de las dos puertas |
| `editor-ui/src/schemas/draftSchema.js:1700,2761` | 2 | el gemelo del esquema |
| `editor-ui/.../editorOptions.js:264,268,306,376` | 4 | el registro de la admisión y la tabla de derivación |
| `editor-ui/.../blockFactory.js:592,957` | 2 | ídem |
| `editor-ui/.../WebBlockEditor.jsx:393,2656,5653` | 3 | ídem |
| `editor-ui/.../SlideArithmeticFields.jsx:25`, `SlideSplitFields.jsx:219`, `SlideItemEditor.jsx:911` | 3 | ídem (`:911` es comentario **JSX**) |
| pruebas: `editorJsonImportUnknownKeyGate:212`, `slideArithmeticItemAdmit:43`, `slideArithmeticResultBoxPlacement:35`, `slideArithmeticSeedContradictsItsResult:31`, `slideConceptGridAdmitAndImplement:451`, `slideGridMapEditor:653`, `slideTableAdmitAndImplement:411` | 7 | cabeceras y registros de cambios de guarda |

**El comentario de `blockCatalog.js:129-133` es la excepción, y no porque sea historia:** afirma que
la decisión sigue *abierta*, y eso **deja de ser cierto hoy**. Por el criterio 6 del encargo **no se
borra: se actualiza**, diciendo quién decidió, cuándo, y por qué la objeción se descarta.

---

## 6 · LA CLASE 4 — **DUDOSOS. SE NOMBRAN Y SE PREGUNTAN, NO SE RESUELVEN**

El encargo lo pide así: *«si separar viva de historia te dejara un caso dudoso — ése se nombra y se
pregunta»*. **Son tres grupos y ninguno se ha tocado.**

### 6.1 · Nombres de prueba y mensajes de aserción · 9 líneas

Son **líneas vivas de código** —se ejecutan, y su texto sale impreso en la suite— pero **no las lee
el autor**. Y por el otro tamiz del encargo sí caen dentro: **afirman el nombre de hoy**, no cuentan
una historia.

| fichero:línea | qué es |
|---|---|
| `slideArithmeticItemAdmit.test.mjs:158` | nombre de prueba (`A1`) |
| `slideArithmeticItemAdmit.test.mjs:527` | nombre de prueba (`A8`) |
| `slideArithmeticItemAdmit.test.mjs:625` | nombre de prueba (`A11`) |
| `slideArithmeticItemAdmit.test.mjs:551` | mensaje de aserción |
| `slideArithmeticSeedContradictsItsResult.test.mjs:184` | nombre de prueba (`C1`) |
| `slideConceptGridAdmitAndImplement.test.mjs:454` | mensaje de aserción |
| `slideIconListJsonImportGate.test.mjs:434` | mensaje de aserción |
| `slideSplitAdmitAndImplement.test.mjs:927` | mensaje de aserción |
| `slideArithmeticItemAdmit.test.mjs:86` | `title: 'Cálculo aritmético en celda'` — **dato de material de QA**, no rótulo |

**Ninguna se pone roja por el cambio**: son texto, no comparaciones. Dejarlas cuesta que la suite
nombre el componente por un nombre que ya no existe. **La decisión es del operador.**

### 6.2 · `aria-label="Modo del cálculo"` · `SlideArithmeticFields.jsx:801`

**Superficie de autor viva**, pero de un control distinto: rotula el `<select>` de **modo**, no el
componente. Un lector de pantalla dirá «Modo del cálculo» sobre lo que ahora se llama
«Factorización aritmética». **No lleva la cadena censada** y el encargo dice «la etiqueta y nada
más», así que **no se toca**. Se nombra por si el operador lo quiere alineado.

### 6.3 · `renderArithmetic.js:367` (Web) — `data.title || 'Cálculo Matricial'`

Respaldo del **motor**, no del editor: es lo que se pinta **al alumno** si el bloque llega sin
título. Ni es la cadena censada («Cálculo **Matricial**») ni es superficie de autor. **Fuera de
alcance** por «el comportamiento y las semillas no se tocan». Se nombra porque es el único sitio
vivo del repo donde un motor teclea un nombre de esta familia.

### 6.4 · Y lo que NO es dudoso: el marcador «sin título» de Web

`WebBlockEditor.jsx:617-620` **no usa el nombre del componente y es deliberado**:

```js
if (block?.kind === 'arithmetic') {
  return block?.mode === 'matrix' ? 'Matriz aritmética sin título' : 'Factorización sin título';
}
```

Lo puso `RUN-CANTU-ARITHMETIC-MATRIX-MODE-001` —el mismo run de la objeción— para que el marcador
diga **cuál de los dos modos** es. **Sigue siendo correcto después del renombre** y no entra.

---

## 7 · LO QUE EL TICKET DA POR CIERTO Y EL DISCO DESMIENTE — **HALLAZGO**

> «La etiqueta vive en el **catálogo** y en `WEB_COMPONENT_UI`, y **diapositiva la DERIVA de ahí**
> en vez de teclearla, así que los dos carriles se mueven desde un sitio. **Compruébalo: si algún
> sitio la teclea aparte, ESO ES UN HALLAZGO y se nombra.**»

**Se comprobó. Diapositiva la TECLEA.**

`editorOptions.js` **no importa `blockCatalog.js` en ninguna línea** —el fichero no tiene ni un
`import`, empieza en una `const` (`:1`)— y su `SLIDE_ITEM_TYPE_OPTIONS` escribe el rótulo a mano:

```js
{ value: 'arithmetic', label: 'Cálculo aritmético' }   // editorOptions.js:302
```

**Lo que sí deriva es una PRUEBA, no el código.** `slideArithmeticItemAdmit.test.mjs:161` compara
las dos copias y se pone roja si divergen:

```js
assert.equal(entrada.label, WEB_COMPONENT_UI.arithmetic.label, 'el rotulo de diapositiva se separo del de Web');
```

**La diferencia importa y por eso se nombra:** «se deriva» prometería que cambiar el catálogo mueve
los dos carriles solo. **No lo hace.** Lo que hay es una copia con red: si se cambia una y no la
otra, la suite lo caza — que es una garantía real, pero **distinta**, y el encargo pedía que se
distinguieran. **Son 4 sitios a cambiar, no 1.**

Es además exactamente el mismo patrón que el precedente ya documentó para `timeline` («el rótulo de
Web `timeline` lo copian **CUATRO** sitios a mano»), así que **el hallazgo no es nuevo del
componente: es cómo está construido este editor.**

---

## 8 · RESUMEN

| clase | líneas | qué se hace |
|---|---|---|
| **1 · superficie viva de autor** | **4** | **se cambian** |
| **2 · guardas de la cadena** | **2** | **se mueven, sin aflojar** |
| **2b · el comentario del catálogo** | 1 bloque (`blockCatalog.js:129-133`) | **se actualiza, no se borra** |
| **3 · historia** | 48 + `QA/temp/` entero | **no se toca** |
| **4 · dudosos** | 9 + 2 | **se nombran y se preguntan** |

**Identificador interno `arithmetic`: 0 cambios. Comportamiento: 0. Semillas de contenido: 0.**

---

## 9 · APÉNDICE — el mismo censo, RE-MEDIDO DESPUÉS DEL CAMBIO

> **Añadido el 2026-08-28 tras ejecutar.** Las secciones 0–8 son la medición previa y **no se han
> reescrito**: se anexa lo medido después, que es como se corrige hacia adelante en esta casa.

Mismo comando de §1 (`vivas.py`, criterio `//` · `*` · `/*` · `{/*`):

| | antes | después |
|---|---|---|
| líneas vivas con la cadena | 16 | **10** |
| de ellas, **superficie de autor** | **4** | **0** |
| de ellas, **guardas de la cadena** | **2** | **0** (movidas al nombre nuevo) |
| de ellas, **clase 4 · dudosos** | 9 + 1 mal clasificada | **10** — intactas, a la espera del operador |
| líneas de prosa (historia) | 48 | 50 (+2: las notas nuevas del propio cambio) |

**Los dos carriles, leídos del servidor de desarrollo vivo** (`import()` de los módulos que sirve
vite, sin tocar la UI ni el borrador del operador):

```
CARRIL_WEB_fuente_WEB_COMPONENT_UI        : "Factorización aritmética"
CARRIL_WEB_tarjeta_paleta_web_arithmetic  : "Factorización aritmética"
CARRIL_DIAPOSITIVA_selector_de_celda      : "Factorización aritmética"
identificador_interno_intacto             : "arithmetic"
los_dos_carriles_dicen_lo_mismo           : true
```

**El mensaje de rechazo, ejecutado y no leído:**

```
[Compiler] Factorización aritmética Web no se permite dentro de Dos columnas.
```

**El corpus NO se movió:** `webCorpusFixtureNet.test.mjs` → *«los 63 árboles del corpus siguen
siendo los fijados»* y *«los dos motores reproducen byte a byte sobre todo el corpus»*, ambas
verdes, con el mismo 63 de antes del cambio.

**La guarda de la cadena exacta, probada por MUTACIÓN** (arnés que muta el disco, corre y restaura
byte a byte). Las cuatro dan **ROJO** con su propio mensaje, *«con esa tilde y esas dos palabras»*:

| mutación | actual | veredicto |
|---|---|---|
| sin la tilde | `Factorizacion aritmetica` | ROJO |
| UNA sola palabra | `Factorización` | ROJO |
| TRES palabras | `Factorización aritmética avanzada` | ROJO |
| vuelta al nombre viejo | `Cálculo aritmético` | ROJO |

Y dos más sobre la otra guarda: **desincronizar los carriles** → ROJO (`A1`, la comparación de
derivación), y **quitar la etiqueta sólo de la entrada `web-arithmetic`** → ROJO. **Esta última era
VERDE con la forma anterior de la aserción**, que comprobaba el fichero entero en vez de la entrada
que su propio nombre dice vigilar; se endureció. Medido sobre el mismo disco mutado.

### 9.1 · UN HUECO DEL PROPIO CENSO — la §5 metió toda la documentación en «historia», y **DOS DOCUMENTOS NO LO SON**

**Se corrige hacia adelante: no se toca ninguno de los dos, se nombran y se preguntan** (clase 4).
La §5 los dio por historia por vivir en `docs/`, y eso fue **criterio propio mal aplicado**: el
disco dice otra cosa, en los dos casos y con sus palabras.

**1 · `docs/reference/REFERENCE-SLIDE-WEB-COMPONENT-MAPPING.md`** (3 ocurrencias: `:30`, `:86`,
`:334`). Su cabecera declara una **regla permanente** que este renombre acaba de dejar incumplida:

> «**Labels re-derived from the catalog on 2026-08-15** after `RUN-CANTU-SLIDE-TYPE-NAMES-001`
> renamed two of them. **Where this document quotes a platform label it now quotes the current one,
> including inside accounts of past events**»

Es decir: **este documento pidió por escrito que sus rótulos sigan al catálogo, incluso cuando narra
el pasado** — justo la excepción a la regla «los comentarios que citan historia no se tocan». `:86`
es además un **encabezado de sección** (`### 3.1 «Cálculo aritmético» — arithmetic`).

**2 · `docs/project-console/SLIDE-PER-COMPONENT-RUN-PLAN-PROPOSAL.md` §7** (`:36`, `:168`). Dice
«**Six names are firm**, given by the operator on 2026-08-13: … `arithmetic` → «Cálculo
aritmético»» — una **guía viva de nombres**, no una crónica. Y ya tiene el mecanismo hecho: el
precedente la enmendó **en el sitio**, con un bloque «**Amended 2026-08-15 by
`RUN-CANTU-SLIDE-TYPE-NAMES-001`, in two places**». Hoy esa guía afirma como firme un nombre que el
operador acaba de cambiar.

`:137` del mismo fichero **sí es historia** (narra el orden del re-corte) y se queda.

**Por qué no se han tocado:** el encargo dice «la etiqueta que el autor ve, **y nada más**» y su
criterio 2 dice «en la superficie viva **y sólo ahí**». Estos dos no los lee el autor: los lee la
cabina. **La decisión de si entran es del operador**, y el precedente ya dice que sí entraron la
vez anterior.
