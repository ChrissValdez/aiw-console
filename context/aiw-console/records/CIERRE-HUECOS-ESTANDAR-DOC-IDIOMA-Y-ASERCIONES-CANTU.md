# Cierre de los dos huecos del estándar de documentación — regla de idioma y aserciones del validador

> **Encargo de taller.** No tiene run en el roadmap. No escribe una sola línea en
> `cantu-studio`. Su producto es este record: dos mediciones contra disco y dos
> redacciones propuestas, listas para insertar.

**Proyecto medido:** `cantu-studio` (solo lectura).
**Fecha de medición:** 2026-07-31.
**No-claims:** este record no certifica nada, no cierra ningún run, no cambia ningún
`status`, no re-emite `.project/`, no repara nada y no decide nada. Mide, transcribe y
propone redacción. Toda reparación nombrada aquí queda **nombrada y sin tocar**.

---

## 0. Resumen ejecutivo

**Hueco 1 — la regla de idioma.** La exención de `GUIDE` **sí cabe** bajo la regla
actual, y no hace falta enmendar el Blueprint para sostenerla. Pero cabe por una razón
distinta de la que la cabina supone: no porque `GUIDE` sea una clase exenta, sino porque
la regla de idioma **está acotada a la capa documental interna**, y una superficie de
producto no es esa capa. La consecuencia es que la exención debe redactarse **por
superficie, no por clase**: los 17 packets de `docs/components/web/` son guía de autor y
están en inglés, los 17 sin excepción. Un `GUIDE` que viva bajo `docs/` es capa
documental interna y la regla lo alcanza.

**Hueco 2 — qué puede aserir el validador.** De las cinco familias candidatas: **dos
son implementables hoy sin limpieza previa** (familias 2 y 4, esta última acotada),
**una es implementable tras limpieza** (familia 1), **una es implementable como proxy
estructural pero falla hoy** (familia 3), y **una no es implementable en absoluto**
(familia 5): asiere un campo que no existe en disco.

**Las tres cifras del ticket.** El validador **no tiene ~3 000 líneas: tiene 2 064**.
Las otras dos cifras —462 y 403— **son exactas**, pero el ticket **las parafrasea mal**
en ambos casos; §6 lo detalla.

---

## 1. Superficies y huellas — verificación de no-escritura

### 1.1 `cantu-studio` — huella del árbol, antes y después

Huella = listado recursivo `ruta|bytes` de todos los archivos, ordenado, md5 del
listado. **`node_modules` incluido** (los tres del repo: `tools/author-lite/`,
`tools/author-lite/compiler-api/`, `tools/author-lite/editor-ui/`). `.git` excluido.

| | Archivos | Bytes | md5 del listado |
|---|---|---|---|
| **Antes** | 21 344 | 217 149 863 | `f757da8f3ac483158d30cadd4d44b71a` |
| **Después** | 21 344 | 217 149 863 | `f757da8f3ac483158d30cadd4d44b71a` |
| **Coinciden** | **Sí — md5 idéntico** | **Sí** | **Sí** |

`diff` entre el listado antes y el listado después: **sin salida**. Cero archivos
añadidos, cero eliminados, cero cambios de tamaño. **Cero bytes escritos en
`cantu-studio`.**

### 1.2 `aiw-console` — superficie disjunta

Hay un hilo paralelo activo sobre `aiw-console`. Este encargo **no tocó nada de
`aiw-console` salvo su propio record**.

| | Archivos | md5 del listado |
|---|---|---|
| **Antes** | 259 | `d8be5d24a16b893b2c262a140803c7da` |
| **Después** | 262 | `430bd26083f49abb49bdcb4b4c13289b` |
| **Delta esperado de este encargo** | +1 archivo: este record | |
| **Delta observado total** | **+3** | |

El `diff` entre listados devuelve **exactamente tres líneas añadidas, ninguna eliminada
y ningún tamaño alterado**:

```
> ./context/aiw-console/records/CIERRE-HUECOS-ESTANDAR-DOC-IDIOMA-Y-ASERCIONES-CANTU.md|43800
> ./context/aiw-console/records/CLASIFICACION-MOTOR.md|30910
> ./tests/roadmap-classification.test.mjs|17204
```

**La primera es de este encargo. Las otras dos NO.** `CLASIFICACION-MOTOR.md` y
`tests/roadmap-classification.test.mjs` las escribió el hilo paralelo mientras esta
medición corría. Este encargo **no las tocó, no las leyó y no las conocía**; se declaran
aquí porque aparecen en la huella y ocultarlas la haría falsa.

**Superficies disjuntas: verificado.** Ningún archivo preexistente de `aiw-console`
cambió de tamaño ni desapareció.

> El `|43800` de la primera línea es el tamaño de este record **en el instante de la
> huella**. Los edits de cierre —rellenar las tres tablas de verificación con sus
> valores reales— lo dejaron en **45 105 bytes**. Se declara en vez de reescribir la
> cifra medida: una huella se reporta como se tomó.

> **Nota de concurrencia.** Al abrir el encargo había **82** records; al ir a escribir,
> **83**; al cerrar, **84**. El hilo paralelo escribió durante toda la ventana. Es
> esperado y no invalida la huella: el delta propio se declara sobre el conteo tomado
> inmediatamente antes de escribir, y el ajeno se identifica por nombre.

### 1.3 Scratchpad

Todos los archivos de trabajo (seis scripts `.mjs` de medición y dos listados de
huella) viven **fuera de los repos**, en
`C:\Users\chris\AppData\Local\Temp\claude\C--Users-chris-Documents-AIW-Workspace\7ed36013-9e2d-464a-941f-52f01cce8ad6\scratchpad`.

### 1.4 Validador, por la vía que no escribe

`node tools/project-console/validate-project-console-state.mjs` — solo lectura, sale con
código distinto de cero al fallar.

| | Exit | Objetivos | Fases | Runs | Docs indexados |
|---|---|---|---|---|---|
| **Antes** | **0** | 7 | 28 | 74 | 149 |
| **Después** | **0** | 7 | 28 | 74 | 149 |
| **Movimiento** | **Ninguno** | — | — | — | — |

Salida idéntica antes y después, línea por línea: `Project Console state validation
passed.`, 16 statuses de componente, 9 episodios de procedencia, snapshot de git con 918
commits / 2 ramas. Grupos de cola, sin cambio en ninguna de las dos pasadas:
`needs_human_decision=0 now=0 ready_next=21 later=36 history=17`.
Un warning no bloqueante, sobre una dependencia externa no resoluble con un solo roadmap
cargado (`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` → `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`).

---

## 2. Hueco 1 — la regla de idioma, medida

### 2.1 No hay una cláusula de idioma: hay tres

El ticket apunta a dos localizaciones. En disco hay **tres** provisiones de idioma en el
Blueprint, y la tercera —que el ticket no menciona— es **la que realmente fija el
alcance**.

#### Provisión A — `docs/docs_management/DOCUMENTATION-BLUEPRINT.md:75-76`, dentro de `## 2. Naming` (encabezado en la línea 58)

Verbatim:

```
- Internal artifacts (docs, run notes, machine state, identifiers in new files) are
  ALL-ENGLISH with no accented characters, in filenames or content.
```

#### Provisión B — `docs/docs_management/DOCUMENTATION-BLUEPRINT.md:234-240`, dentro de `### 4f. Language` (encabezado en la línea 232)

Verbatim:

```
English only inside the repo, filenames included, no accented characters in new
artifacts. (Today the corpus is split between a Spanish-accented early era, an
accent-stripped middle era with mojibake damage, and an English governance era; one
accented filename, docs/jame-core/api/Guia_Estilo_Timelines.md - actual filename
contains an accented "i" - is a standing cross-platform hazard.) Spanish remains valid
inside LESSON CONTENT; it is only the internal documentation layer that is
English-only.
```

#### Provisión C — `docs/docs_management/DOCUMENTATION-BLUEPRINT.md:639-642`, dentro de `## 9. DECIDED - operator answers (2026-07-11)` (encabezado en la línea 622)

Verbatim:

```
4. **OQ-D - Language: DECIDED.** Documentation is written in English; Spanish is
   allowed only inside clearly delimited examples, fixtures, and lesson citations.
   (This refines Section 4f: delimited Spanish quotations are permitted; pedagogical
   Spanish content remains valid inside lesson content.)
```

> **Corrección al ticket.** El ticket sitúa la cláusula en «Sección 4f, líneas 234-235».
> El encabezado `### 4f. Language` está en la **línea 232**; la cláusula ocupa
> **234-240**. Las líneas 234-235 son solo su primer tercio — cortan justo antes del
> paréntesis y, sobre todo, antes de la frase que fija el alcance. La decisión asociada
> **sí está exacta en 639-642**.

### 2.2 El alcance real de la regla

**A qué se aplica exactamente.** Las tres provisiones no dicen lo mismo, y la diferencia
importa:

| Provisión | Alcance textual | Amplitud |
|---|---|---|
| A (§2:75-76) | «Internal artifacts (docs, run notes, machine state, identifiers in new files)» | **Enumerada y estrecha** |
| B, primera frase (§4f:234-235) | «inside the repo, filenames included» | **Máximamente amplia** |
| B, última frase (§4f:238-240) | «it is only the internal documentation layer that is English-only» | **Estrecha** |
| C (OQ-D:639-640) | «Documentation is written in English» | Estrecha |

**La primera frase de 4f es la única lectura amplia, y la última frase de la misma
cláusula la desmiente.** La cláusula se acota a sí misma. La lectura operativa —la que
coincide con A y con C, es decir tres de cuatro— es **capa documental interna**, no
«todo el repo».

**¿Distingue entre artefactos del repo y superficies de producto?** No explícitamente.
Ninguna de las tres provisiones nombra el editor, la Guía de componente, el catálogo de
bloques, ni ninguna superficie que vea un usuario final. La distinción existe solo por
implicación: A enumera cuatro tipos de artefacto y **ninguno es una superficie de
producto**; B excluye todo lo que no sea «internal documentation layer».

**La medición confirma que la lectura amplia es insostenible.** Si «English only inside
the repo» se aplicara literalmente, el repo estaría en violación masiva hoy:

| Zona | Archivos fuente | Con acentos | Con mojibake | Con aspecto español |
|---|---|---|---|---|
| `src/` (JAME Core) | 80 | **70** | 0 | 76 |
| `tools/author-lite/editor-ui/src` | 108 | **49** | 1 | 61 |
| `tools/author-lite/compiler-api` | 35 | **14** | 3 | 29 |
| `tools/project-console` | 4 | 0 | 0 | 0 |
| Scripts de raíz | 2 | **2** | 0 | 2 |
| **Total** | **229** | **135** | **4** | **168** |

135 de 229 archivos fuente llevan caracteres acentuados. Ejemplo dentro del **compilador**,
que no es ni documentación ni contenido de lección —
`tools/author-lite/compiler-api/schemas/draftSchema.js:16-17`, verbatim:

```
// Guardrail: LÃ­mite estricto de TV (40 palabras max)
const tvWordLimitValidator = (val) => countWords(val) <= 40;
```

Ese `LÃ­mite` es mojibake real en disco: es la «accent-stripped middle era with mojibake
damage» que 4f describe, sobreviviendo dentro del schema. `tools/project-console` es la
única zona limpia (0 de 4).

### 2.3 Un dato falso dentro de la propia cláusula

4f, línea 237, cita como peligro vigente un archivo concreto:

```
accented filename, docs/jame-core/api/Guia_Estilo_Timelines.md - actual filename
```

**Ese archivo no existe.** `docs/jame-core/api/` **está vacío** (`total 4`, solo `.` y
`..`). Un barrido `find -iname "*Guia_Estilo*"` sobre todo el repo, excluido `.git`,
**no devuelve nada**, y `docs_index.json` no lo registra. La decisión OQ-F del propio
Blueprint (líneas 645-646, «Deferred to the rewrite of the timelines packet») difiere
una decisión sobre un archivo que ya no está.

Sí existe **otro** nombre de archivo acentuado, uno solo en todo el repo:

```
src/content/staging/Aritmetica/Sections_by_lesson/L01_Web_Clasificacion_Numerica/L01_S1_Web_Clasificación_Numérica_web.js
```

Es contenido de lección. Bajo la provisión A (que acota a «internal artifacts») no está
alcanzado; bajo la primera frase de B sí lo estaría. Es el mismo peligro cross-platform
que 4f describe, en un archivo distinto del que nombra.

> **Nombrado, no tocado.** El estándar nuevo va a citar 4f. Si la cita incluye el
> paréntesis, cita un hecho falso. Reparar 4f es enmienda al Blueprint, y eso es
> decisión del operador.

### 2.4 Qué hace hoy la Guía de componente

`tools/author-lite/editor-ui/src/features/editor/components/preview/ComponentGuide.jsx`
— **2 608 líneas**, **107 líneas con caracteres acentuados**. Contenido **en español**.

Tres guías inline, declaradas en:

| Guía | Línea | Líneas de contenido |
|---|---|---|
| `listGuide` | `ComponentGuide.jsx:42` | 127 |
| `headerGuide` | `ComponentGuide.jsx:169` | 122 |
| `columnsGuide` | `ComponentGuide.jsx:291` | 335 |
| **Bloque completo** | `ComponentGuide.jsx:42-625` | **584** |

Ejemplos verbatim:

`ComponentGuide.jsx:44`
```
  summary: 'Bloque diseñado para presentar listas breves de texto plano. Aplica formato automático, viñetas limpias y sangrías armónicas.',
```

`ComponentGuide.jsx:66`
```
        description: 'Nombre breve para encabezar la lista. Genera una línea separadora visual.'
```

`ComponentGuide.jsx:142`
```
        desc: 'Define el color de las viñetas y del acento visual. Valores author-facing: "ctx", "def", "ex", "focus", "str", "res", "wrn", "err", "meta".'
```

El catálogo de bloques,
`tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js` — **1 176
líneas, 84 con acentos** — está igualmente en español. `blockCatalog.js:1`, verbatim:

```
const CONTAINED_COMPONENT_REASON = 'Bajo contención: implementado/no certificado; no seguro para Lesson Generator; no usar como nuevo bloque author-facing ordinario.';
```

### 2.5 El contraste que decide la redacción

| Superficie | Ruta | Idioma medido |
|---|---|---|
| Guía de componente (producto) | `ComponentGuide.jsx` | **Español** (107 líneas acentuadas / 2 608) |
| Catálogo de bloques (producto) | `blockCatalog.js` | **Español** (84 / 1 176) |
| Los 17 packets de componente (docs) | `docs/components/web/*.md` | **Inglés — los 17, con 0 líneas acentuadas cada uno** |

Los packets son **guía de autor**: el Component-Doc Single-Source Contract los define
como «Author guidance, per component»
(`docs/docs_management/DOCUMENTATION-CANONICAL-MODEL.md:33`). Y están en inglés, sin una
sola excepción entre los 17. Su contenido de ejemplo sí lleva español, delimitado dentro
del bloque JSON, exactamente como OQ-D permite — `docs/components/web/LIST.md:38-41`:

```json
{
  "kind": "list",
  "title": "Propiedades",
```

**Esto es lo que impide redactar la exención por clase.** Si `GUIDE` fuera exenta por ser
`GUIDE`, los 17 packets —guía de autor para un autor hispanohablante— podrían escribirse
en español, y hoy los 17 están en inglés. La exención tiene que colgar de **dónde vive el
artefacto y qué superficie lo renderiza**, no de su clase.

### 2.6 `AGENTS.md` frente al Blueprint — ¿se contradicen?

`AGENTS.md` declara **una sola** regla de idioma, y es de comunicación en sesión.
`AGENTS.md:600-602`, verbatim, bajo el encabezado `## Comunicación`:

```
## Comunicación

Responde en español.
```

`CLAUDE.md:570` lleva la misma línea, verbatim, bajo el mismo encabezado.

Las «Reglas de documentación» de `AGENTS.md` (`AGENTS.md:532-546`, trece reglas
numeradas) **no dicen nada sobre idioma**. Un barrido de `AGENTS.md` completo por
`english|spanish|español|idioma|language|castellano` devuelve **una sola línea: la 602**.

**Veredicto: no se contradicen, y hay que decir por qué con precisión.**

- **Superficies distintas.** «Responde» gobierna la **respuesta de sesión** del executor;
  4f gobierna el **artefacto que queda en disco**. Un executor puede explicar en español
  lo que acaba de escribir en inglés sin violar ninguna de las dos.
- **Pero se rozan en un punto real.** `AGENTS.md` y `CLAUDE.md` son ellos mismos
  artefactos del repo, están registrados en `docs_index.json`
  (`AGENTS.md` → `source_role: executor_operating_governance`, `nav_tier: primary`;
  `CLAUDE.md` → `legacy_claude_operating_guide`, `nav_tier: history`), y **están
  escritos íntegramente en español**. Bajo la provisión A —«internal artifacts (docs,
  run notes, …)»— un documento de gobernanza registrado y de tier primario **es** capa
  documental interna. Ahí la regla de artefactos y el contenido real de `AGENTS.md`
  divergen.

Eso no es una contradicción entre dos reglas: es **una regla y un artefacto que no la
cumple**. La distinción importa, porque se repara distinto. **Nombrado, no tocado.**

---

## 3. ⬛ REDACCIÓN PROPUESTA — cláusula de idioma del estándar

> **Para insertar tal cual.** Tres frases. Cierta contra lo medido en §2.

---

**Idioma.** Los artefactos internos del repositorio —documentos bajo `docs/`, notas de
run, estado máquina e identificadores de archivos nuevos— se escriben **en inglés, sin
caracteres acentuados, nombre de archivo incluido**, conforme al Documentation Blueprint
§2 (líneas 75-76) y §4f (líneas 234-240); el español sigue siendo válido dentro de
ejemplos delimitados, fixtures y contenido de lección, conforme a la decisión OQ-D del
Blueprint (líneas 639-642). La regla **está acotada a la capa documental interna y no
alcanza a las superficies de producto** —el editor, la Guía de componente y el catálogo
de bloques—, que se dirigen a un autor hispanohablante y hoy están en español. Por eso
un documento de clase `GUIDE` queda exento **solo mientras viva en una superficie de
producto**: redactado como artefacto del repositorio bajo `docs/`, es capa documental
interna y la regla de inglés lo alcanza —como ocurre hoy con los diecisiete packets de
`docs/components/web/`, que son guía de autor y están los diecisiete en inglés.

---

### 3.1 Veredicto sobre la exención de `GUIDE`

**La exención cabe bajo la regla actual. No hace falta enmendar el Blueprint para
sostenerla.** Se apoya en dos anclas textuales que ya existen: la enumeración cerrada de
la provisión A y la frase «it is only the internal documentation layer that is
English-only» de 4f:238-240.

**Pero no cabe redactada por clase.** Si el estándar declara «`GUIDE` es la única clase
exenta de la regla de idioma interno», entra en conflicto con los 17 packets: son guía
de autor, viven bajo `docs/`, y están en inglés. La redacción propuesta arriba resuelve
el conflicto acotando la exención **por superficie**, que es como el Blueprint ya la
tiene acotada de hecho.

**Tres avisos para la cabina, ninguno bloqueante:**

1. **La cita a 4f debe ser parcial.** Si el estándar cita 4f entero, cita el paréntesis
   de la línea 237, que nombra un archivo que ya no existe (§2.3). Citar 234-235 y
   238-240, o citar la provisión A, evita el problema sin enmendar nada.
2. **La primera frase de 4f contradice a la última.** Un lector que cite solo
   «English only inside the repo, filenames included» estará citando la lectura que los
   135 archivos fuente acentuados desmienten. Es la razón por la que la redacción
   propuesta se apoya en A, no en la primera frase de B.
3. **`AGENTS.md` no cumple la regla que el estándar va a citar** (§2.6). Es una
   divergencia real, y es del operador decidir si se repara, se declara excepción o se
   deja preservada como conflicto.

---

## 4. Hueco 2 — el validador, medido

### 4.1 Cómo está construido

`tools/project-console/validate-project-console-state.mjs` — **2 064 líneas**.

> **Corrección al ticket.** El ticket dice «unas 3 000 líneas». Son **2 064**. Es la
> primera de las tres cifras a verificar, y es la única de las tres que resulta falsa.

**Forma: script imperativo de nivel superior, no registro de comprobaciones.** No hay
tabla de checks, ni `describe`/`it`, ni objetos de resultado. Es una sola pasada
secuencial que acumula strings en dos arrays.

**Cómo declara una comprobación.** No las declara. Escribe un `if` y llama a `fail()`.
`validate-project-console-state.mjs:13-22`, verbatim:

```js
const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}
```

**Cómo falla.** Empuja un string a `errors`. Al final, si `errors` no está vacío,
imprime y sale con 1. `validate-project-console-state.mjs:2030-2038`, verbatim:

```js
if (errors.length > 0) {
  console.error("Project Console state validation failed:");
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log("Project Console state validation passed.");
```

**Cómo agrupa resultados.** **No agrupa.** Dos cubos planos: `errors` (bloqueante,
`exit 1`) y `warnings` (no bloqueante, impreso al final,
`validate-project-console-state.mjs:2059-2063`). No hay categoría, ni familia, ni
severidad intermedia, ni id de comprobación. La única estructura es el resumen impreso
tras el `passed` (líneas 2039-2058): objetivos/fases/runs, docs indexados, statuses de
componente, episodios de procedencia, snapshot de git.

**Densidad de uso:**

| Idioma del validador | Sitios de llamada |
|---|---|
| `fail(` | **240** |
| `warn(` | **2** |
| `functionSource(` | **40** |
| `fs.existsSync(` | **8** |
| `readText(` | **6** |

**Helpers reutilizables ya presentes**, todos relevantes para las cinco familias:

| Helper | Línea | Qué hace |
|---|---|---|
| `readJson` | 24-36 | lee y parsea, `fail` si falta o es inválido |
| `readJsonl` | 38-58 | ídem, línea a línea |
| `listFiles` | 60-73 | listado recursivo, rutas normalizadas a `/` |
| `readText` | 75-82 | lee texto, `fail` si falta |
| `assertUnique` | 84-98 | unicidad por clave |
| `assertRequiredKeys` | 121-127 | claves obligatorias |
| **`functionSource`** | **144-151** | **extrae el cuerpo de una función por nombre desde un fuente leído como texto** |

`functionSource` es la pieza decisiva. Verbatim, `validate-project-console-state.mjs:144-151`:

```js
function functionSource(source, functionName) {
  const start = source.indexOf(`function ${functionName}`);
  if (start === -1) {
    return "";
  }
  const next = source.indexOf("\nfunction ", start + 1);
  return next === -1 ? source.slice(start) : source.slice(start, next);
}
```

Es string-matching sobre fuente, no AST. Pero **el validador ya asiere 40 veces sobre
código leído como texto**. La forma que las familias 2 y 3 necesitan ya existe y ya está
en uso.

### 4.2 Qué comprueba ya hoy sobre documentación

Tres bloques, y solo tres.

**(a) Integridad del registro — `validate-project-console-state.mjs:650-664`**, verbatim:

```js
if (docsIndex?.docs) {
  for (const doc of docsIndex.docs) {
    if (!doc.path || !fs.existsSync(path.join(root, doc.path))) {
      fail(`Docs index path missing: ${doc.path}`);
    }
    if (!doc.freshness_status) {
      fail(`Docs index entry missing freshness_status: ${doc.path}`);
    }
    if (!doc.source_role) {
      fail(`Docs index entry missing source_role: ${doc.path}`);
    }
  }
} else {
  fail(".aiw/docs/docs_index.json must include docs array");
}
```

**Esto es la familia 1, ya implementada — pero solo sobre las 149 rutas del propio
registro, no sobre las rutas citadas *dentro* de los documentos.** Medido: **149 de 149
resuelven**; de las 141 entradas `.md`, **0 faltan en disco**.

**(b) Contrato de navegación — líneas 666-701.** `nav_tier` en un vocabulario cerrado de
seis valores, `default_visible` booleano, y la vista curada debe ser un subconjunto
propio del registro. Medido: 60 primary-visible de 149.

**(c) Higiene de idioma — líneas 1941-2004.** Y es más estrecha de lo que parece.
`validate-project-console-state.mjs:1941-1944`, verbatim:

```js
const visibleLanguageSurfaces = [
  ["Project Console renderer", projectConsoleJs],
  ["Project Console snapshot", JSON.stringify(snapshot || {})]
];
```

Cubre **dos superficies**: el renderer de la consola y el snapshot. Contra **mojibake**
(siete patrones, líneas 1984-1997) y contra vocabulario legado o específico de proveedor
(líneas 1973-1982). **No comprueba «inglés only» en ningún sitio, y no toca ni un solo
archivo bajo `docs/`.** La regla de idioma del Blueprint **no está aserida por nada hoy**.

### 4.3 Las cinco familias, una por una

Metodología: para cada familia, se implementó la medición fuera del repo (scripts en
scratchpad) y se contó cuántos fallos daría **hoy**. Nada se escribió en `cantu-studio`.

---

#### Familia 1 — «Toda ruta citada en un documento existe»

**¿Implementable con la forma que el validador ya tiene?** Sí. `listFiles`, `readText`,
`fs.existsSync` y `fail` bastan. No hace falta ninguna dependencia nueva.

**Fallos hoy — y dependen brutalmente de cómo se defina «ruta citada»:**

| Definición | Sitios muertos | Rutas distintas muertas |
|---|---|---|
| Todo token con pinta de ruta, corpus entero (347 docs, archive incluido) | **2 724** | **496** |
| Ídem, solo corpus vivo (no `archive/`, no `_historical_run_record/`, no `_legacy/`) | **292** | **83** |
| Solo rutas entre backticks, con raíz conocida y extensión, en los 53 docs vivos **registrados** | **153** | **28** |
| Solo enlaces markdown `[x](ruta)`, resueltos **relativos al documento** | **0** | **0** |

El corpus de archivo aporta **2 454 de los 2 724** sitios. El modelo canónico lo congela
(`DOCUMENTATION-CANONICAL-MODEL.md:70-71`: «Frozen evidence and the append-only ledgers
are exempt: history does not go stale»), así que **la familia debe excluirlo o es
inaplicable de entrada**.

**Concentración en el corpus vivo — 292 sitios, pero dos rutas explican 110:**

| Sitios | Ruta muerta |
|---|---|
| 49 | `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` |
| 36 | `docs/REFERENCE-DRAFT-JSON.md` |
| 9 | `docs/jame-core/api/DOCS_SLIDES_API.md` |
| 8 | `docs/jame-core/DOCS_CORE.md` |
| 8 | `docs/jame-core/api/DOCS_WEB_API.md` |

**El peor infractor vivo es el propio Blueprint:**

| Citas muertas | Documento vivo |
|---|---|
| **96** | `docs/docs_management/DOCUMENTATION-BLUEPRINT.md` |
| 41 | `CLAUDE.md` |
| 35 | `AGENTS.md` |
| 10 | `README.md` |
| 7 | `docs/project-console/changelog.md` |

37 documentos vivos llevan al menos una ruta muerta.

**Y las 96 del Blueprint son, en su mayoría, legítimas.** Están en la tabla de destino de
su Sección 6 — rutas **planeadas**, no rotas. Muestra verbatim de lo que el checker
marcaría:

```
docs/docs_management/DOCUMENTATION-BLUEPRINT.md:519  docs/start-here.md
docs/docs_management/DOCUMENTATION-BLUEPRINT.md:520  docs/architecture-system-overview.md
docs/docs_management/DOCUMENTATION-BLUEPRINT.md:523  docs/architecture-editor.md
```

Un documento normativo **debe** poder nombrar el estado al que apunta. Sin excepción
declarada, la familia 1 hace fallar al estándar por describir su propio objetivo.

**Riesgo de falso positivo: ALTO sin acotaciones. Tres clases medidas:**

1. **Enlaces markdown relativos al documento.** 5 de 5 enlaces markdown del corpus vivo
   registrado se marcaban muertos resolviendo contra la raíz; **los 5 resuelven** contra
   el directorio del documento (`docs/decisions/README.md:15-19` →
   `docs/decisions/ADR-001-…md` … `ADR-005-…md`, los cinco en disco). **100 % de falsos
   positivos** en esa clase.
2. **Globs.** `prompts/generated/ctx_*.md` aparece 4 veces; es un patrón, no una ruta.
3. **Rutas-objetivo declaradas.** Las 96 del Blueprint.

**Coste estimado:** ~35-50 líneas para el checker; **más un contrato de exclusiones**
(archive, globs, rutas-objetivo) que es donde vive el trabajo de verdad.

**Veredicto: implementable, pero no de golpe.** Necesita limpieza previa. Con las dos
rutas dominantes reparadas, el corpus vivo registrado baja de 153 a **75 sitios**.

---

#### Familia 2 — «Todo puntero de código citado resuelve — archivo, función, símbolo»

**¿Implementable?** Sí, y es la más barata de las cinco. Los 17 packets llevan un
puntero de código en forma fija, en una fila de tabla. `docs/components/web/LIST.md:10`,
verbatim:

```
| Engine renderer | `src/builders/web/partials/renderList.js` |
```

`functionSource` (línea 144), ya usado 40 veces, cubre la parte de símbolo.

**Fallos hoy: cero.**

| Comprobación | Resultado |
|---|---|
| Packets con fila `Engine renderer` | **17 de 17** |
| Puntero de archivo resuelve | **17 de 17** |
| Símbolo (basename como función) resuelve | **17 de 17** |

**Riesgo de falso positivo: BAJO** sobre la fila de tabla — forma fija, un puntero por
packet. **Sube a MEDIO** si se extiende a símbolos citados en prosa libre, donde la
extracción deja de ser fiable.

**Coste estimado:** ~20-25 líneas para archivo + símbolo sobre la fila de tabla.

**Veredicto: implementable ya, sin limpieza previa, sin excepciones. Es la primera que
debe entrar.**

---

#### Familia 3 — «Todo contenido documental es alcanzable por el código que lo despacha»

**¿Implementable con la forma actual?** Como proxy estructural, sí. Como aserción
general, no.

El despacho vive en `ComponentGuide.jsx`. Tres ramas cortocircuitan antes del genérico:

| Línea | Rama |
|---|---|
| `ComponentGuide.jsx:2497` | `if (item.action === 'list') {` |
| `ComponentGuide.jsx:2520` | `if (item.action === 'header') {` |
| `ComponentGuide.jsx:2543` | `if (item.action === 'columns') {` |
| `ComponentGuide.jsx:2566` | `return <GenericComponentGuide item={item} mode={mode} onModeChange={setMode} />;` |

`GenericComponentGuide` (`ComponentGuide.jsx:2329`) es **el único consumidor** del campo
`docs` del catálogo; lo desestructura en la línea 2330 (`const { label, docs } = item;`) y
lo lee en 2333-2392. Un barrido por `.docs` sobre todo `editor-ui/src` no devuelve otro
consumidor.

**Fallos hoy: 3 entradas, 403 líneas.**

| Entrada del catálogo | Líneas de `docs:` | Rango | Alcanzable |
|---|---|---|---|
| `list` | **305** | `blockCatalog.js:240-544` | **No** |
| `columns` | **82** | `blockCatalog.js:952-1033` | **No** |
| `header` | **16** | `blockCatalog.js:146-161` | **No** |
| **Suma inalcanzable** | **403** | | |
| Otras 17 entradas | 463 | | Sí |

**El proxy implementable:** afirmar que el conjunto de `action` con rama de guía rica y
el conjunto de entradas del catálogo con bloque `docs:` no vacío son **disjuntos**. Es
string-matching sobre `ComponentGuide.jsx` y `blockCatalog.js` — exactamente lo que el
validador ya hace 40 veces.

**Riesgo de falso positivo: MEDIO.** El proxy asiere una regla de **diseño** (no
duplicar contenido), no un hecho. Un renombre de rama lo rompe silenciosamente, y una
duplicación deliberada y documentada lo dispara con razón aparente.

**Coste estimado:** ~30-40 líneas.

**Veredicto: implementable como proxy, pero falla hoy con 3 aciertos.** Entra después de
la limpieza, o con lista de excepciones declarada.

---

#### Familia 4 — «Ninguna afirmación de un documento contradice el schema que la gobierna»

**Hay que partirla en dos, porque una mitad es implementable y la otra no.**

**Mitad implementable — existencia de nombres de campo.** Los 17 packets llevan una
sección `## Author fields` con viñetas en negrita. `docs/components/web/LIST.md:29-33`,
verbatim:

```
- **kind**: `list`.
- **items**: the array of bullet lines (up to 30).
- **title**: an optional heading above the list.
- **variant**: the palette role for the accent.
- **textSize**: the text scale (defaults to medium).
```

Contrastable contra `tools/author-lite/compiler-api/schemas/draftSchema.js`.

**Fallos hoy: cero — pero solo si el checker resuelve un salto de spread.**

| Comprobación | Resultado |
|---|---|
| Packets con sección `## Author fields` | 17 de 17 |
| Kinds con bloque de schema localizable | 17 de 17 |
| Campos afirmados en total | **74** |
| Resuelven, matcher de un salto (sigue `...shape`) | **74** |
| Resuelven, matcher ingenuo (sin seguir spreads) | 63 |
| **Falsos positivos del matcher ingenuo** | **11 — el 14,9 %** |

Los 11 falsos positivos, verificados uno a uno contra disco:

| Packet | Campos marcados | Dónde estaban de verdad |
|---|---|---|
| `CARD.md:30,32,33,35` | `cardType`, `value`, `lang`, `color` | `draftSchema.js:621-644+` (`WebCardShape`, esparcido en `WebCardSchema`, línea 705-708) |
| `VISUAL.md:29-32` | `svg`, `title`, `caption`, `width` | `draftSchema.js:301-312` (`visualShape`) |
| `VIDEO.md:29-31` | `url`, `title`, `caption` | `draftSchema.js:314-318` (`videoShape`) |

**Mitad NO implementable — la aserción general.** «Ninguna afirmación contradice el
schema» abarca tipos, defaults y límites enunciados en prosa. `LIST.md:30` dice
«up to 30»; el schema lo codifica como `MAX_LIST_ITEMS` (`draftSchema.js:35`) usado en
`.max(MAX_LIST_ITEMS, …)` (línea 757). Casar esos dos requiere entender lenguaje
natural. **No es mecanizable con la forma actual del validador ni con ninguna razonable.**

El Component-Doc Single-Source Contract ya prevé la salida:
`COMPONENT-DOC-SINGLE-SOURCE-CONTRACT.md:76` lista como modelo preferido futuro
«Structured JSON/YAML packets rendered by both consumers». Con packets estructurados, la
mitad general pasa a ser implementable. Hoy no.

**Riesgo de falso positivo: ALTO sin resolutor de spreads (14,9 % medido), BAJO con él.**

**Coste estimado:** ~50-70 líneas — extraer la sección, casar llaves del bloque de
schema, y resolver `...shape` un salto. El resolutor de spreads **no es opcional**: sin
él la familia nace roja con 11 falsos.

**Veredicto: implementable acotada a existencia de nombres de campo, con resolutor de
spreads. La forma general queda fuera, con razón declarada.**

---

#### Familia 5 — «Todo documento declara su clase, y la clase es una de las cuatro»

**NO es implementable. Ni hoy ni con más líneas.** No porque sea difícil: porque
**asiere un campo que no existe en ninguna parte**.

**Medición sobre las 141 entradas `.md` de `docs_index.json`:**

| Comprobación | Resultado |
|---|---|
| Entradas `.md` registradas | **141** |
| Archivos que faltan en disco | **0** |
| Llevan banner `> Status:` | **64** |
| **No** llevan banner | **77** |
| **Declaran `DECISION`/`MAP`/`INSTRUMENT`/`GUIDE` en cabecera** | **0** |

Los 4 aciertos brutos del barrido son coincidencias de prosa (p. ej. la palabra
«DECISION» dentro de `docs/archive/author-lite/NEXT_STEPS.md`), no declaraciones de
clase. **Declaraciones reales: cero.**

El banner del Blueprint (§4a) no tiene ranura para clase.
`docs/components/web/LIST.md:3`, verbatim:

```
> Status: Draft | Last verified: 2026-07-12 | Scope: the List author-facing Web block - what it does and how an author uses it.
```

`Status` / `Last verified` / `Scope`. **No hay clase.**

**Y el registro tampoco la tiene.** Los 17 campos que llevan las 149 entradas:

```
title, path, nav_tier, default_visible, audience, freshness, freshness_status,
source_role, canonicality, related_area, related_objective_id, related_phase_id,
related_run_id, last_update_source, last_reconciled_by_run, notes, ia_bucket
```

Ningún `class`, ningún `doc_class`. Los dos parientes cercanos no sirven:

- **`source_role`** tiene **63 valores distintos** sobre 149 entradas — es un rol de
  fuente, no una taxonomía de cuatro.
- **`ia_bucket`** tiene **10 valores** (`run_evidence` 61, `docs` 34, `component_docs`
  21, `author_lite` 12, `governance` 9, `roadmap` 3, `ops` 3, `jame_core` 3,
  `project_console` 2, `prompts` 1) — es agrupación de navegación, y **10 no mapea sobre
  4**.

Y la taxonomía del Blueprint es una tercera, de **once** categorías (`## 3. Information
architecture`, línea 84): START HERE, ARCHITECTURE, DECISIONS, REFERENCE, COMPONENTS,
HOW-TO, OPERATIONS, GOVERNANCE, AI CONTEXT, HISTORY & EVIDENCE, DOCS MANAGEMENT.

**Fallos hoy: 141 de 141.** El 100 %.

**Coste estimado:** el checker en sí, ~15 líneas, riesgo de falso positivo BAJO. **Pero
el checker es la parte trivial.** Antes hace falta: (a) enmendar el banner del Blueprint
§4a para que lleve la clase, **o** añadir un campo al registro; (b) decidir cómo mapean
once categorías del Blueprint y diez `ia_bucket` sobre cuatro clases; (c) etiquetar 141
documentos. Los tres pasos son **enmienda al Blueprint y decisión del operador**, fuera
del alcance de cualquier encargo de validador.

**Veredicto: NO implementable. El estándar tiene que ajustarse** — o declara la familia
5 como horizonte condicionado a una enmienda previa del Blueprint, o la retira.

---

### 4.4 Las cinco familias, en una tabla

| # | Familia | ¿Implementable? | Fallos hoy | Coste (líneas) | Riesgo de falso positivo |
|---|---|---|---|---|---|
| 2 | Punteros de código resuelven | **Sí, ya** | **0 / 17** | ~20-25 | **Bajo** |
| 4 | Afirmación vs schema (**acotada** a nombres de campo) | **Sí, con resolutor de spreads** | **0 / 74** | ~50-70 | Bajo con resolutor; **alto sin él (14,9 %)** |
| 1 | Rutas citadas existen | Sí, **tras limpieza** | 153 sitios / 28 rutas (vivo+registrado) | ~35-50 + contrato de exclusiones | **Alto** sin acotaciones |
| 3 | Contenido alcanzable por su despacho | Sí, **como proxy**, tras limpieza | **3 entradas / 403 líneas** | ~30-40 | Medio |
| 5 | Todo documento declara su clase | **No** | **141 / 141** | ~15 + enmienda al Blueprint | Bajo (irrelevante: no hay campo) |
| 4b | Afirmación vs schema, **forma general** | **No** | n/a | n/a | n/a |

---

## 5. ⬛ REDACCIÓN PROPUESTA — Sección 5 del estándar

> **Para insertar tal cual.** Qué familias entran, en qué orden, y cuáles quedan fuera
> con su razón.

---

### 5. Qué asiere el validador

Toda afirmación sobre código o se genera desde la fuente, o la asiere
`tools/project-console/validate-project-console-state.mjs`, o no existe. El validador es
un script de una pasada que acumula errores y sale `1` si hay alguno; una familia
«entra» cuando existe como llamada a `fail()` en ese script. Las familias entran **en el
orden de abajo, y una no entra hasta que la anterior está verde**, porque una familia
que nace roja convierte el `exit 1` en ruido y deja de proteger a las que ya estaban.

**Entran, en este orden:**

1. **Punteros de código.** Todo puntero de código citado en un packet de componente
   resuelve: el archivo existe y el símbolo está definido en él. Entra primero porque
   hoy pasa limpia —los diecisiete packets resuelven, archivo y símbolo— y porque el
   validador ya extrae símbolos de fuente leída como texto (`functionSource`, en uso en
   cuarenta sitios).

2. **Afirmaciones contra el schema, acotadas a existencia de campo.** Todo campo que un
   packet declara bajo `## Author fields` existe en el schema que gobierna ese `kind`.
   Entra segunda porque hoy pasa limpia —setenta y cuatro campos, setenta y cuatro
   resuelven— con una condición **obligatoria**: el comprobador resuelve un salto de
   spread (`...shape`) y de `.extend()`. Sin ese salto la familia nace con un 14,9 % de
   falsos positivos y es inservible.

3. **Rutas citadas.** Toda ruta citada en un documento vivo existe. Entra tercera porque
   **exige limpieza previa** y **tres exclusiones declaradas**, sin las cuales es
   inaplicable: (a) el corpus congelado —`docs/archive/`,
   `docs/_historical_run_record/`, `docs/_legacy/`— queda fuera, porque la historia no
   se reescribe; (b) los enlaces markdown se resuelven **relativos al documento**, no a
   la raíz; (c) las rutas-objetivo declaradas —las que un documento normativo cita como
   estado al que apunta— quedan fuera mediante marca explícita. Sin (c), el propio
   Documentation Blueprint falla noventa y seis veces por describir su propio objetivo.

4. **Alcanzabilidad del contenido documental.** Ningún bloque de documentación del
   catálogo de bloques queda tras una rama de despacho que lo cortocircuita. Entra
   cuarta, tras limpieza, y **como proxy estructural**: afirma que el conjunto de
   acciones con guía rica y el conjunto de entradas con bloque `docs:` no vacío son
   disjuntos. Es una aserción de diseño, no de hecho; se declara como tal.

**Queda fuera:**

5. **«Todo documento declara su clase.»** **No es implementable y no entra.** No existe
   hoy ninguna declaración de clase: ninguno de los ciento cuarenta y un documentos
   registrados la lleva, el banner del Blueprint §4a no tiene ranura para ella, y el
   registro no tiene campo. Los dos parientes del registro no sirven de sustituto:
   `source_role` tiene sesenta y tres valores e `ia_bucket` diez, y la taxonomía del
   Blueprint tiene once categorías; ninguna de las tres mapea sobre cuatro clases.
   Implementarla exige antes una enmienda al Blueprint y el etiquetado de ciento
   cuarenta y un documentos, que son decisiones del operador, no trabajo de validador.
   La familia queda registrada como **horizonte condicionado**: entra si y cuando esa
   enmienda exista.

6. **«Ninguna afirmación contradice el schema», en su forma general.** **Queda fuera por
   ahora.** La forma acotada del punto 2 cubre existencia de campos; tipos, defaults y
   límites viven en prosa («up to 30» frente a `MAX_LIST_ITEMS`) y casarlos exige
   entender lenguaje natural. Pasa a ser implementable cuando los packets migren al
   modelo estructurado que el Component-Doc Single-Source Contract ya prevé como trabajo
   futuro; hasta entonces, la forma general no se asiere.

---

## 6. Las cifras del ticket, verificadas

| Cifra del ticket | Real | Veredicto |
|---|---|---|
| Cláusula de idioma en «4f, líneas 234-235» | Encabezado en **232**; cláusula en **234-240** | **Parcial.** 234-235 es el primer tercio; corta antes de la frase que fija el alcance |
| Decisión asociada en «líneas 639-642» | **639-642** | **Exacta** |
| Validador de «unas 3 000 líneas» | **2 064** | **Falsa.** Gana el disco |
| «462 punteros de ruta muertos» | **462 exacto** — pero de *otra cosa* | **Cifra exacta, paráfrasis falsa.** Ver abajo |
| «403 líneas de contenido documental inalcanzable» | **403 exacto** — pero de *otro archivo* | **Cifra exacta, paráfrasis imprecisa.** Ver abajo |

### 6.1 Las 462 — cifra correcta, lectura equivocada

Origen: `MEDICION-SUPERFICIE-DOC-COMPONENTES-WEB-Y-FORMA-DEL-PACKET-CANTU.md:484`,
verbatim:

```
- **En todo el repo, el puntero roto a la matriz aparece 462 veces, en más de 100
  archivos.**
```

**Reproducida exactamente.** Contando `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md`
sobre todo `cantu-studio`, excluidos `.git` y `node_modules`:

```
total occurrences: 462
files: 112
```

462 apariciones en 112 archivos — **de UN SOLO puntero muerto**. El ticket lo parafrasea
como «462 punteros de ruta muertos», que sugiere 462 rutas distintas. Las rutas
distintas muertas son **496** en el corpus documental entero y **83** en el corpus vivo;
ninguna de las dos es 462. La medición previa era correcta y precisa; el ticket la
comprimió mal.

### 6.2 Las 403 — cifra correcta, archivo equivocado

Origen: el mismo record, línea 215, verbatim:

```
> **403 líneas de documentación en el CATÁLOGO (list 305 + columns 82 + header 16) son
> demostrablemente inalcanzables**
```

**Reproducida exactamente**, y con los tres sumandos idénticos: `list` 305
(`blockCatalog.js:240-544`), `columns` 82 (`952-1033`), `header` 16 (`146-161`) = **403**.

Pero son 403 líneas de **`blockCatalog.js`**, no del corpus documental. El ticket dice
«403 líneas de contenido documental inalcanzable», lo que llevó a buscarlas primero en
los packets. No están ahí: los 17 packets suman 1 261 líneas y **ninguna** es alcanzable
por la Guía de componente, que no lee un solo packet —cero referencias a
`docs/components/` en todo `editor-ui/src`. Siete definiciones distintas de «contenido
documental inalcanzable» sobre los packets (1 261 / 872 / 664 / 975 / 667 / 499 / 584)
**no dan 403 bajo ninguna**. La cifra es del catálogo del editor.

---

## 7. Nombrado y no tocado

Nada de esta lista se reparó. Se nombra porque el estándar la va a rozar.

| # | Hallazgo | Ubicación |
|---|---|---|
| 1 | 4f cita como peligro vigente un archivo que ya no existe | `DOCUMENTATION-BLUEPRINT.md:237` |
| 2 | La primera frase de 4f contradice a la última de la misma cláusula | `DOCUMENTATION-BLUEPRINT.md:234-235` vs `238-240` |
| 3 | OQ-F difiere una decisión sobre ese archivo inexistente | `DOCUMENTATION-BLUEPRINT.md:645-646` |
| 4 | `AGENTS.md`, registrado y `nav_tier: primary`, está íntegro en español | `AGENTS.md` |
| 5 | El Blueprint es el documento vivo con más citas de ruta muertas: 96 | `DOCUMENTATION-BLUEPRINT.md` |
| 6 | El Blueprint y el modelo canónico discrepan sobre la ruta de la matriz de certificación: el Blueprint apunta a `docs/author-lite/…` (inexistente), el modelo a `docs/archive/author-lite/…` | `DOCUMENTATION-BLUEPRINT.md:131` vs `DOCUMENTATION-CANONICAL-MODEL.md:42` |
| 7 | Un puntero muerto con 462 apariciones en 112 archivos | repo entero |
| 8 | 403 líneas de documentación inalcanzable en el catálogo del editor | `blockCatalog.js:146-161, 240-544, 952-1033` |
| 9 | Mojibake dentro del schema del compilador | `draftSchema.js:16-17` y otros |
| 10 | 77 de 141 documentos registrados no llevan banner de estado | corpus |
| 11 | El directorio `docs/author-lite/components/` existe y está vacío — un enlace roto que apunta a un directorio real | `docs/author-lite/components/` |

---

## 8. Archivos escritos por este encargo, y ninguno más

| Archivo | Repo | Acción |
|---|---|---|
| `context/aiw-console/records/CIERRE-HUECOS-ESTANDAR-DOC-IDIOMA-Y-ASERCIONES-CANTU.md` | `aiw-console` | Creado |

**Una sola fila.** En `cantu-studio`: **cero bytes escritos**, cero temporales. Ningún
`status` tocado, ningún run cerrado, `.project/` no re-emitido, roadmap no tocado, git no
ejecutado en ninguna forma.

Records en `context/aiw-console/records/` antes de escribir: **83**. Después: **84**.
