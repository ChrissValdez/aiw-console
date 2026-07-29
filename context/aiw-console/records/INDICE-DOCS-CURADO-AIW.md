# ÍNDICE DE DOCUMENTACIÓN DE AIW, CURADO A MANO

Ejecución de `RUN-AIW-CURATED-DOCS-INDEX-001` (`queue_order` **19**, `lane`
`DOCUMENTATION`, `O2.P5`). Cura `aiw/docs/docs_index.json` **ejecutando la tabla de
clasificación** que el `#18` dejó escrita en la convención, no volviendo a juzgar
archivo por archivo.

**Entregable:** `aiw/docs/docs_index.json` — **un archivo nuevo, el único dentro de
`aiw`.**

**No es mecanismo bajo `CONST §4`:** un índice es papel (`D-055`).

## Abreviaturas de cita

| Abrev. | Archivo |
|---|---|
| `PROJ:n` | `aiw-console/tools/projector/project.mjs`, línea `n` |
| `PCJS:n` | `aiw-console/project-console/assets/project-console.js`, línea `n` |
| `CONV §n` | `aiw/docs/docs_management/CONVENCION-DE-DOCUMENTACION.md`, sección `n` |
| `R18 §n` | `aiw-console/context/aiw-console/records/CONVENCION-DOCUMENTACION-AIW.md`, sección `n` |
| `RM` | `aiw/roadmap/roadmap.json` |

Todo lo del proyector, del renderer, del ejemplar y del corpus de `aiw` se leyó y se
**midió de primera mano en este encargo**. Ninguna cifra se hereda: las dos que el
canónico traía vencidas se re-midieron, y **una tercera, heredada del propio `#18`,
también resultó mal contada** (§6). Lo marcado `[INFERENCIA]` es razonamiento sobre
lo medido; lo marcado `[NO VERIFICADO]` no se comprobó.

---

# 1. Guardas de apertura — las dos pasaron

## 1.a Guarda de título e id (`AC1`)

Leído de `RM`, run de `queue_order` **19** (`O2` → `O2.P5`):

| Campo | Exigido | Encontrado | ¿Coincide? |
|---|---|---|---|
| `queue_order` | 19 | `19` | ✔ |
| `title` | `Curate AIW's docs index by hand` | idéntico, carácter a carácter | ✔ |
| `run_id` | `RUN-AIW-CURATED-DOCS-INDEX-001` | idéntico | ✔ |

Medido además del mismo objeto: `status: "active"`, `lane: "DOCUMENTATION"`,
`depends_on: []`.

## 1.b Guarda de apertura (`AC2`)

**Status del run:** `"active"`. No es `planned` → **no se para.**

**HEAD de `aiw`:** `cd925eb18d1781f3ac77fcacec762ab0bb1afd28` —
`docs: convencion de documentacion de AIW - tres pruebas, nueve clases, docs/ como raiz documental (O2.P5, barrier de carril)`,
`2026-07-28 22:11:40 -0600`. **Es el commit del `#18`**: su entregable ya está
trackeado, dato que importa para el conteo de §6.

**`git status --porcelain` de `aiw` a la apertura — 7 entradas, todas admitidas:**

```
 M .project/guardrails.json
 M .project/no_claims.json
 M .project/roadmap.json
 M .project/snapshot.json
 M roadmap/roadmap.json
?? .project/docs_index.json
?? .project/git_history.json
```

Cinco modificados y dos sin trackear; **todos son `roadmap/roadmap.json` o de
`.project/`**. Ninguna otra cosa. La guarda admite exactamente ese conjunto, así que
el encargo siguió.

---

# 2. El esquema del emisor, derivado con cita por línea (`AC3`)

## 2.a La ruta la fija el layout, y se verificó leyendo el emisor

`ROOT_LAYOUTS` (`PROJ:623-640`) declara dos layouts; la clave `docs_index` es parte
del bundle y se resuelve **como unidad** con el roadmap y la gobernanza
(`PROJ:616-618`):

| Layout | `docs_index` | Cita |
|---|---|---|
| `repo_root` | `docs/docs_index.json` | `PROJ:630` |
| `project_local_aiw` | `.aiw/docs/docs_index.json` | `PROJ:638` |

**Medido, ejecutando `detectRootLayout(aiw)`:** devuelve `layout: "repo_root"`,
`docs_index: "docs\\docs_index.json"`. Coincide con lo que el encargo anticipaba, así
que **no hay conflicto que declarar**: el emisor y el encargo dicen lo mismo, y la
ruta es `aiw/docs/docs_index.json`.

`detectRootLayout` (`PROJ:776-782`) recorre los layouts **en orden** y se queda con el
primero cuyo roadmap parsea y cumple la puerta de forma (`hasRoadmapTreeShape`,
`PROJ:745-761`). `aiw` cumple en el primero.

## 2.b Cómo decide TRANSPORTAR frente a ESCANEAR

```js
export function buildDocsIndex(root, opts = {}) {                 // PROJ:1089
  const curated = readCuratedDocsIndex(root);                     // PROJ:1090
  return curated ? transportDocsIndex(root, curated, opts)
                 : scanDocsIndex(root, opts);                     // PROJ:1091
}
```

La decisión es **por PRESENCIA en la ruta del layout**, nunca por nombre de proyecto
(`PROJ:1086-1088`). `readCuratedDocsIndex` (`PROJ:1098-1105`) exige exactamente tres
cosas, y **ninguna más**:

1. que el layout resuelva una ruta `docs_index` (`PROJ:1100-1101`),
2. que el archivo parsee como JSON (`safeReadJson`, `PROJ:702-709`),
3. que traiga **`Array.isArray(index.docs)`** (`PROJ:1103`).

**Un índice presente pero malformado no transporta nada: cae al escaneo**
(`PROJ:1096-1097`). Ése es todo el listón de conformidad.

## 2.c Las claves de una entrada y el vocabulario de cada una

El escaneo construye la forma de referencia (`PROJ:1240-1249`):

| Campo | Vocabulario / regla | Cita |
|---|---|---|
| `title` | Texto libre. Primer H1 del Markdown; si no hay, el nombre de archivo | `PROJ:1242`, `PROJ:148-151` |
| `path` | Ruta POSIX relativa al repo | `PROJ:1243`, `PROJ:711-714` |
| `nav_tier` | **Cerrado, 6 tokens**: `primary` · `secondary` · `advanced` · `evidence` · `history` · `proposal` | `PROJ:686` |
| `default_visible` | Booleano | `PROJ:1245` |
| `ia_bucket` | Texto libre | `PROJ:1246` |
| `freshness` | Opcional. `mtime` ISO; se omite si el archivo no resuelve | `PROJ:1248-1249`, `PROJ:716-726` |

**En transporte, el emisor solo rellena lo que FALTA** (`PROJ:1107-1114`), y lo declara
en el propio artefacto bajo `docs_source.field_rules` (`PROJ:1195-1201`):

- `title` → curado; si no, primer H1; si no, nombre de archivo (`PROJ:1145-1147`).
- `nav_tier` → curado **si está en el vocabulario cerrado**; si no, derivado de la ruta
  (`PROJ:1149-1151`).
- `default_visible` → curado **si es booleano**; si no, `nav_tier === "primary"`
  (`PROJ:1152-1154`).
- `ia_bucket` → **la agrupación curada gana**; el directorio se escribe solo si la
  entrada no ofrece *ninguna* señal de agrupación. La cadena es
  `ia_bucket → category → related_area → source_role` (`hasGroupingSignal`,
  `PROJ:1219-1223`; relleno en `PROJ:1159-1162`).
- `freshness` → **el valor curado viaja verbatim, sea del tipo que sea**; solo si falta
  se rellena con el `mtime` (`PROJ:1163-1172`). Véase §5.
- Todo campo que el emisor no puede derivar honestamente **viaja intacto**
  (`PROJ:1109-1113`).
- **`nav_tier_model` de la curación viaja si existe** (`PROJ:1212`), porque describe la
  regla con la que se construyó *ese* índice y no la del emisor.
- Una entrada cuya ruta no resuelve se **OMITE** de `docs[]` y se **DECLARA** en
  `unresolved` (`PROJ:1128-1140`, `PROJ:1202-1206`).
- **La selección y el orden son de la curación**: la función no filtra ni ordena
  (`PROJ:1109-1110`).

## 2.d Confirmación contra el ejemplar de `cantu-studio`

Medido en lectura sobre `cantu-studio/.aiw/docs/docs_index.json`:

| Medida | Valor |
|---|---|
| Entradas | **146** |
| Campos distintos por entrada | **22** (17 en las 146; 5 parciales) |
| `nav_tier` | `evidence` 65 · `primary` 58 · `secondary` 8 · `history` 7 · `advanced` 5 · `proposal` 3 |
| Extensiones | `.md` 138 · `.json` 7 · `.html` 1 |
| `freshness` | **146 de 146**, declarada a mano (p. ej. `"view_source_2026-06-27"`) |
| ¿Se indexa a sí mismo? | **No** — 0 entradas apuntan a un `docs_index` |
| ¿Indexa sus insumos de ejecución? | **No** — 0 entradas apuntan a `roadmap.json`, `guardrails` o `no_claims` |

**El ejemplar y el emisor no discrepan en ningún punto de los usados aquí.** El
ejemplar ejerce libertades que el emisor concede (`freshness` declarada, campos que el
emisor no deriva) y no vulnera ninguna regla suya. **No hay nada que adjudicar a favor
del emisor**, y por tanto nada que declarar bajo esa cláusula.

---

# 3. Qué tipos de archivo admite el índice, y qué hace AIW con eso (`AC4`)

## 3.a La medición, primero — y no se da por hecho

**Confirmado de primera mano:** el ejemplar curado indexa **`.json` (7) y `.html` (1)**
además de `.md` (138). El límite a `.md` es **del escaneo**, no del índice:
`listMarkdownFiles` filtra por extensión (`PROJ:1064`), y `transportDocsIndex` no
filtra por extensión en ninguna rama (`PROJ:1115-1175`). **Un índice curado puede
nombrar cualquier archivo.**

**Segunda medición, y es la que decide:** *qué clase* de no-`.md` indexa el ejemplar.
Las ocho entradas, íntegras:

| `nav_tier` | `ia_bucket` | Ruta |
|---|---|---|
| `primary` | `project_console` | `docs/project-console/index.html` |
| `proposal` | `roadmap` | `docs/project-console/roadmap-current-state-mapping-proposal.json` |
| `proposal` | `roadmap` | `docs/project-console/roadmap-delta-proposal-docs-corpus-curation.json` |
| `evidence` | `docs` | `.aiw/docs/documentation_inventory.json` |
| `evidence` | `docs` | `.aiw/docs/docs_corpus_curation_audit.json` |
| `history` | `governance` | `.aiw/docs/canonical_documentation_model.json` |
| `history` | `component_docs` | `.aiw/docs/component_doc_single_source_contract.json` |
| `advanced` | `governance` | `.aiw/docs/docs_retention_archive_policy.json` |

**Las ocho son artefactos *sobre el corpus*** —inventarios, auditorías, políticas,
propuestas y una vista— **y ninguna es un insumo que el kernel consuma.** Y el dato
recíproco, medido: **`cantu-studio` NO indexa sus propios insumos de ejecución**
(`.aiw/roadmap/roadmap.json`, `.aiw/guardrails/*`): cero coincidencias.

## 3.b La decisión, razonada contra la convención

La convención **sí se pronuncia**, y lo hace de forma explícita y anticipada
(`CONV §1`, párrafo final):

> «La prueba no depende del formato. Se aplica a cualquier archivo, no solo a los
> `.md`. […] La contesta la prueba 1.b: `roadmap/roadmap.json`, `governance/*.json` y
> `config.json` son **clase E**, insumo que el emisor y el kernel consumen, y sus
> superficies en la consola son Roadmap y Guardrails, no Docs.»

Lo repite en la tabla de ubicación (`CONV §3.4`, última fila) y lo ejecuta en la tabla
de clasificación (`CONV §4.2`, fila E: **¿Indexado? No**).

**Decisión: `governance/guardrails.json`, `governance/no_claims.json`,
`roadmap/roadmap.json` y `config.json` NO entran en el índice.** Los cuatro existen
(medido: `git ls-files '*.json'`). No entran **por su clase, no por su extensión**:
fallan la prueba 1.b de destinatario. Si mañana AIW escribiera un `.json` que fuera un
documento —un inventario, una política del corpus—, la convención lo admitiría sin
enmienda, y el emisor también.

**La medición del ejemplar no contradice la decisión: la respalda.** `cantu-studio`
indexa `.json` que son artefactos documentales y excluye los `.json` que son insumo,
que es exactamente el corte que la prueba 1.b hace. **Dos proyectos, la misma regla,
medida en los dos.**

**No hay hueco de la convención en este punto.** Los huecos que sí encontró este
encargo están en §8, y son otros.

---

# 4. El índice, entrada por entrada (`AC5`, `AC6`)

## 4.a La tabla que se ejecuta

`CONV §4.2`, íntegra en su parte indexable. **Cada campo de cada entrada sale de una
fila de esta tabla; ninguno se eligió.**

| # | Clase | Ruta | `nav_tier` | `ia_bucket` | `default_visible` |
|---|---|---|---|---|---|
| **T1** | B — NORMA | `CONSTITUCION.md` | `primary` | `governance` | `true` |
| **T2** | C — INSTRUCCIÓN | `claude.md` | `primary` | `governance` | `true` |
| **T3** | D — PUNTERO | `CONTEXTO.md` | `primary` | `governance` | `true` |
| **T4** | A — DOCUMENTO | `docs/docs_management/*.md` | `primary` | `docs_management` | `true` |
| **T5** | G — INCIDENTE | `logs/INCIDENT-*.md`, `logs/DIAG-*.md` | `evidence` | `run_evidence` | `false` |
| **T6** | H — HISTORIA | `records/*.md` | `history` | `history` | `false` |

Las filas de `docs/kernel/`, `docs/evidence/` y `docs/operation/` existen en la
convención y **no producen ninguna entrada hoy**: esas carpetas no existen todavía
(son de los runs `#27`, `#32`, `#36`, `#42`).

## 4.b Cobertura total del corpus — ningún archivo sin clase

Ejecutada la tabla de rutas de `CONV §3.4` + `§4.2` sobre **los 71 `.md` del disco**,
cada archivo contra todas las filas. **Resultado: 71 clasificados, 0 sin clase,
0 ambiguos** (ninguno coincidió con dos filas). No hay nada que parar y reportar bajo
`AC5`.

| Clase | Ruta | N | ¿Indexado? |
|---|---|---:|---|
| B/C/D | los tres de la raíz | **3** | Sí |
| A — DOCUMENTO | `docs/docs_management/` | **1** | Sí |
| G — INCIDENTE | `logs/INCIDENT-*`, `logs/DIAG-*` | **2** | Sí |
| H — HISTORIA | `records/*.md` | **6** | Sí |
| F — EVIDENCIA DE RUN | `logs/<run>/*.md` | **33** | No |
| E — INSUMO | `objectives/**` 22 · `prompts/` 2 · `templates/` 1 | **25** | No |
| I — FIXTURE | `sandbox/000-sandbox.md` | **1** | No |
| **TOTAL** | | **71** | **12 indexadas** |

## 4.c Las doce entradas, con su clase y su fila de origen

Orden del archivo, que es el orden de la tabla de la convención y **el que el emisor
preserva verbatim** (`PROJ:1109-1110`):

| # | `path` | Clase | Fila | `nav_tier` | `ia_bucket` | `default_visible` |
|---|---|---|---|---|---|---|
| 1 | `CONSTITUCION.md` | **B** | T1 | `primary` | `governance` | `true` |
| 2 | `claude.md` | **C** | T2 | `primary` | `governance` | `true` |
| 3 | `CONTEXTO.md` | **D** | T3 | `primary` | `governance` | `true` |
| 4 | `docs/docs_management/CONVENCION-DE-DOCUMENTACION.md` | **A** | T4 | `primary` | `docs_management` | `true` |
| 5 | `logs/INCIDENT-2026-07-11.md` | **G** | T5 | `evidence` | `run_evidence` | `false` |
| 6 | `logs/DIAG-roadmap-invalid.md` | **G** | T5 | `evidence` | `run_evidence` | `false` |
| 7 | `records/AUDITORIA_CONTEXTO.md` | **H** | T6 | `history` | `history` | `false` |
| 8 | `records/AUDITORIA_ESTADO.md` | **H** | T6 | `history` | `history` | `false` |
| 9 | `records/COSECHA.md` | **H** | T6 | `history` | `history` | `false` |
| 10 | `records/CRONICA.md` | **H** | T6 | `history` | `history` | `false` |
| 11 | `records/HISTORIA.md` | **H** | T6 | `history` | `history` | `false` |
| 12 | `records/QUALIFICATION.md` | **H** | T6 | `history` | `history` | `false` |

**Los tres avisos de `CONV §4.2` se respetaron, y se comprobaron contra el
consumidor:**

1. **`ia_bucket` no agrupa** — la navegación de Docs agrupa por la cadena de carpetas
   de `path` (`PCJS:2178-2180`). Los buckets son temáticos (`governance`,
   `docs_management`, `run_evidence`, `history`), como en el ejemplar, no rutas.
2. **`ia_bucket` sí respalda a `nav_tier`, por igualdad exacta y solo en dos valores**
   (`PCJS:2204-2205`, leído de primera mano): `"history"` → `history`,
   `"run_evidence"` → `evidence`. Las entradas 5–12 usan **exactamente** esas cadenas,
   así que si algún día perdieran su `nav_tier` el respaldo **coincidiría** con lo
   declarado.
3. **`run_evidence` no se escribió en ningún documento de `docs/`.** Hoy es vacuo —
   `docs/evidence/` no existe— pero la regla queda ejercida para el `#32`.

## 4.d `records/` — ratificado, y contado (`AC6`)

**Son SEIS, medido** (`git ls-files 'records/*'`): `AUDITORIA_CONTEXTO.md`,
`AUDITORIA_ESTADO.md`, `COSECHA.md`, `CRONICA.md`, `HISTORIA.md`, `QUALIFICATION.md`.
Coincide con lo que `CONV §3.3` afirma («sus seis archivos») y con `R18 §2.b`.

Entran los seis con `nav_tier: history` y `default_visible: false`, que es la
recomendación de `CONV §4.3` **ratificada por el operador en el encargo de este run**.
La clasificación no estaba en duda —es historia, no documentación, por fallar la
prueba 1.c—; lo ratificado es que además se **registre**.

Los seis viajan en git (§6.b), así que la entrada es reproducible en un clon fresco.

---

# 5. `freshness`: medida, no inventada (`AC7`)

**De dónde sale, derivado del emisor** (`PROJ:1163-1172`, con su comentario):

> «the curation's own value travels verbatim, whatever KIND of value it is […] When an
> entry carries none, the file's mtime fills it, which is a measurement.»

Es decir: **el emisor NO recalcula una `freshness` curada** —la respeta, sea del tipo
que sea— y **solo la rellena cuando falta**, con el `mtime` del archivo (`sourceRecord`,
`PROJ:716-726`). En el ejemplar transportado, las 146 entradas traen `freshness`
declarada a mano y **el emisor no toca ninguna**.

**Decisión para AIW: no se escribe `freshness` a mano. Se omite, y el `mtime` la
llena.** El fundamento es de la convención, no de comodidad — `CONV §7`, último punto:

> «No decide la frescura ni la cadencia de revisión de un documento. Hoy la frescura de
> una entrada es el `mtime` del archivo cuando la curación no declara otra cosa. Un
> régimen de frescura declarada es trabajo futuro.»

AIW **no tiene** régimen de frescura declarada. Escribir a mano un valor sería
inventarlo, que es justo lo que `AC7` prohíbe. **Medido tras el transporte: las 12
entradas traen `freshness`, y las 12 son `mtime` ISO del archivo en disco.** El más
reciente es el de la convención, `2026-07-29T03:56:54.806Z`; el más antiguo,
`records/COSECHA.md`, `2026-07-10T07:44:12.755Z`.

**Por la misma razón se omite `title`.** `CONV §5.2` declara que «el emisor toma el
primer H1 como `title` del índice», y `PROJ:1145-1147` lo confirma en transporte.
Copiarlo a mano crearía una segunda copia del mismo hecho, contra `CONV §5.5` («Un
hecho, un dueño»). **Verificado antes de omitirlo: los 12 archivos tienen H1**, así que
ninguno cae al respaldo del nombre de archivo. Medido tras el transporte, los 12
títulos son los H1 correctos.

**Lo que sí se escribe a mano es exactamente lo que el emisor derivaría MAL**
—`nav_tier`, `ia_bucket`, `default_visible`— y nada más. Ésa es la frontera del índice
curado de AIW: *se cura lo que la convención decide; se mide lo que el emisor puede
medir honestamente.*

---

# 6. Cuántas entradas, contra la horquilla vencida (`AC12`)

## 6.a **Son 12 hoy, y 16 al final.** Ni 3–10 ni 11–15

`RM` `#19` estima «roughly three to ten entries». `R18 §5` la corrigió a **11 hoy y 15
al final**. **Ambas cifras están vencidas, y la segunda por un error de conteo del
propio `#18`.**

| Fuente | Hoy | Al final | Estado |
|---|---:|---:|---|
| `RM` `#19` («roughly three to ten») | 3–10 | — | **Vencida.** Se escribió antes de que la convención existiera |
| `R18 §5` (3 raíz + 2 incidentes + 6 records) | 11 | 15 | **Mal contada** |
| **Medido en este encargo** | **12** | **16** | **Vigente** |

**La diferencia es de una entrada, y es siempre la misma:
`docs/docs_management/CONVENCION-DE-DOCUMENTACION.md`.** El `#18` sumó `3 + 2 + 6` y
**omitió su propio entregable**, que es clase A bajo `docs/docs_management/` y que el
propio `#18` clasificó `primary` / `docs_management` / `true` en su `§7`. El archivo ya
existía cuando se escribió esa cifra —`R18 §7.a` midió 71 `.md` justo después de
crearlo—, así que no es crecimiento del corpus: **es un desliz aritmético.**

El «al final» sube igual: **12 + 4 documentos** de los runs `#27`, `#32`, `#36` y `#42`
= **16**.

**No se recortó nada para caber en ninguna horquilla.** Las 12 son las que la tabla
produce. Si el operador retirara `records/`, serían **6 hoy y 10 al final** (medido:
12 − 6).

## 6.b Las dos cifras vencidas del canónico, re-medidas

**(1) «34 de las 70 entradas están gitignoreadas» → hoy es 1 de 71.**

| Categoría | Entradas | % | Fuente |
|---|---:|---:|---|
| Trackeadas | **70** | 98,6 % | `git ls-files '*.md'` |
| Gitignoreadas | **1** | 1,4 % | `git check-ignore` sobre los 71 |
| No trackeadas y no ignoradas | **0** | 0 % | `git ls-files --others --exclude-standard '*.md'` |
| **Total en disco** | **71** | 100 % | `find . -name '*.md'` |

La única gitignoreada es **`sandbox/000-sandbox.md`**, por `sandbox/` en
`aiw/.gitignore:1` (medido: las cinco entradas del archivo son `sandbox/`, `locks/`,
`node_modules/`, `jame_snapshot/`, `.aiw/`). La causa del cambio es el commit `e4fb17b`
del `#12`, que versionó `logs/`.

**Un clon fresco emitiría 70 de 71.** El argumento de no-reproducibilidad **ya no
aplica**, y **no se repite en ningún artefacto de este encargo**: el `docs_index.json`
no lo menciona, y su `nav_tier_model.divergence_from_scan` se funda únicamente en la
regla de ubicación.

**(2) La horquilla «tres a diez» no es un tope.** Tratada como tal en §6.a: no se
recortó nada.

## 6.c Lo que SÍ sigue en pie, re-medido — y es lo que justifica curar

Ejecutado `buildDocsIndex` sobre un **espejo del corpus real** construido en el
scratchpad (los mismos 71 `.md` en las mismas rutas relativas, más
`roadmap/roadmap.json` para que el layout resuelva, y **sin** `docs/docs_index.json`,
de modo que caiga al escaneo). **`aiw` no se tocó para esta medición.**

| Medida del escaneo | Valor |
|---|---:|
| `docs.length` | **71** |
| `nav_tier: primary` | **3** |
| `nav_tier: secondary` | **68** |
| `default_visible: true` | **3** |
| `nav_tier_model.derived_by` | `repo_path_prefix` |

Dos formas de decir el ruido, y se distinguen porque miden cosas distintas:

- **Frente a la convención:** de las 71 entradas del escaneo, **59 nombran archivos que
  la convención declara NO indexables** (71 − 12) → **83,1 %**.
- **Frente a la noción de documento** (la del canónico y la de `R18 §2.b`): 71 − 4
  documentos = **67 no-documentos** → **94,4 %**. El canónico dice «~96 %» y `R18`
  midió 95,7 %; las dos eran 67/70, y hoy el denominador es 71.

**Y la clasificación sigue siendo por una regla escrita para otro repo.**
`DOCS_NAV_TIER_RULES` (`PROJ:689-697`) tiene siete reglas; en `aiw` solo se disparan
**dos**: la 5 (`^[^/]+$` → `primary`, `PROJ:694`, «estar en la raíz») y la 7 (`.` →
`secondary`, el comodín). Las reglas 1, 2 y 3 apuntan a `^context/…` y `^console/`, que
en `aiw` **no coinciden con nada**. Lo único que sobrevive del clasificador es «raíz =
importante, todo lo demás = igual».

**Las dos patas del canónico, hoy:** la de la reproducibilidad **cayó**; la del ruido y
la clasificación ajena **sigue en pie, medida**, y es la única sobre la que este
encargo se apoya.

---

# 7. Las dos pruebas de ejecución (`AC8`, `AC9`)

## 7.a LA PRUEBA DEL TRANSPORTE (`AC8`) — **transporta, y no escanea**

Importado `buildDocsIndex` del emisor y ejecutado **sobre el root real de `aiw`**, sin
correr el proyector completo y sin escribir en `.project/`:

| Medida | Valor | Veredicto |
|---|---|---|
| `detectRootLayout(aiw).layout` | `repo_root` | ✔ |
| `docs_source.mode` | **`"transported"`** | **✔ TRANSPORTA. No escanea.** |
| `docs_source.curated_index` | `docs/docs_index.json` | ✔ la ruta del layout |
| `docs_source.curated_entries` | **12** | ✔ |
| `docs_source.transported` | **12** | ✔ ninguna se perdió |
| `docs_source.unresolved` | **`[]`** | ✔ las 12 rutas resuelven en disco |
| `docs.length` | **12** | ✔ |
| Reparto de `nav_tier` | `primary` 4 · `evidence` 2 · `history` 6 | ✔ = tabla §4.c |
| `default_visible: true` | **4** | ✔ = las cuatro `primary` |
| `freshness` presente | **12 de 12** | ✔ rellenada con `mtime` (§5) |
| `title` presente | **12 de 12** | ✔ derivada del H1 (§5) |
| `nav_tier_model.derived_by` | `aiw_convention_folder_table` | ✔ viajó el modelo de la curación (`PROJ:1212`), no el del emisor |

**Coincidencia con lo escrito a mano:** comparadas las 12 entradas emitidas contra las
12 curadas, **por posición**, en `path`, `nav_tier`, `ia_bucket` y `default_visible` →
**idénticas, en el mismo orden**. La selección y el orden de la curación se preservaron
verbatim, como `PROJ:1109-1110` declara.

**Contraste con el estado anterior:** el mismo emisor sobre el mismo corpus **sin**
índice curado devuelve **71** entradas escaneadas (§6.c). Con él, **12** transportadas.
**Ésa es la diferencia que este run produce.**

## 7.b EL CASO DE PRUEBA DE UN SOLO ARCHIVO, CERRADO (`AC9`)

`R18 §7.a` midió cómo el escaneo ve a `CONVENCION-DE-DOCUMENTACION.md`. **Re-medido
aquí de primera mano** (espejo, §6.c), y **medido después del transporte** (root real):

| Campo | Escaneo (re-medido hoy) | Curado y transportado | Declarado por `CONV §6` | ¿Cerrado? |
|---|---|---|---|---|
| `nav_tier` | `secondary` | **`primary`** | `primary` | **✔** |
| `default_visible` | `false` | **`true`** | `true` | **✔** |
| `ia_bucket` | `docs/docs_management` | **`docs_management`** | `docs_management` | **✔** |

La entrada transportada, íntegra:

```json
{
  "path": "docs/docs_management/CONVENCION-DE-DOCUMENTACION.md",
  "nav_tier": "primary",
  "ia_bucket": "docs_management",
  "default_visible": true,
  "title": "CONVENCIÓN DE DOCUMENTACIÓN DE AIW",
  "freshness": "2026-07-29T03:56:54.806Z"
}
```

**Los tres campos que discrepaban ahora son los declarados.** La causa de la
discrepancia era la regla 4 de `DOCS_NAV_TIER_RULES` (`^docs/` → `secondary`,
`PROJ:693`), que se dispara antes que la de la raíz; curar la sustituye porque el
`nav_tier` curado gana si está en el vocabulario (`PROJ:1149-1151`), el
`default_visible` curado gana si es booleano (`PROJ:1152-1154`) y el `ia_bucket` curado
gana siempre que haya señal de agrupación (`PROJ:1159-1162`). **`PROJ:693` no se tocó:
sigue siendo asunto del otro hilo** (§8.4).

**Y no es un caso aislado.** Comparadas las 12 entradas curadas contra cómo las vería el
escaneo: **las 12 difieren en al menos un campo de clasificación.**

| Entradas | Escaneo | Curado |
|---|---|---|
| 3 de la raíz | `primary` / `true` / **`root`** | `primary` / `true` / **`governance`** |
| 1 de `docs/` | **`secondary`** / **`false`** / **`docs/docs_management`** | **`primary`** / **`true`** / **`docs_management`** |
| 2 incidentes | **`secondary`** / `false` / **`logs`** | **`evidence`** / `false` / **`run_evidence`** |
| 6 records | **`secondary`** / `false` / **`records`** | **`history`** / `false` / **`history`** |

**12 de 12 difieren. Curar cambió algo real en todas.**

---

# 8. Huecos de la convención, nombrados y no ejecutados

`CONV §7` prohíbe a este run escribir documentación o editar la convención. Lo que
sigue **se nombra**; no se toca nada.

1. **HUECO — la convención no dice si el índice se indexa a sí mismo.** `CONV §4.2` no
   tiene fila para `docs/docs_index.json`.
   **Resuelto aquí, con recomendación explícita: NO se indexa.** Dos fundamentos: (a) la
   prueba 1.b lo clasifica **clase E** —su lector es el emisor y la consola, no una
   persona que opera o audita— y la fila E de `§4.2` dice **no indexado**; (b) medido, el
   ejemplar de `cantu-studio` tiene **0 auto-referencias**. **Recomendación:** añadir la
   fila explícita cuando la convención se enmiende por otra razón. No urge: la prueba
   1.b ya lo resuelve sin ambigüedad.
2. **NO es un hueco, y conviene decirlo para que no se lea como violación.** `CONV §3.1`
   dice «no hay archivos sueltos en la raíz de `docs/`», y `docs/docs_index.json` está
   exactamente ahí. **No hay contradicción:** esa regla se aplica a **documentos**, y el
   índice es clase E. Además `CONV §3.1`, razón 1, **anticipa esa ruta** como fundamento
   de que `docs/` sea la raíz documental.
3. **HUECO — `operator_review_status` no está gobernado por la convención, y decide el
   modo de apertura de Docs.** Verificado de primera mano en `PCJS:2040-2044`: si el
   índice del proyecto activo lleva ese campo en **alguna** entrada, Docs abre en
   `newera`; si **ninguna** lo lleva, abre en `all`.
   **Decisión de este run: no se escribe en ninguna entrada.** Fundamento: la convención
   no lo menciona, y ponerlo exigiría un juicio **por archivo**, que es exactamente lo
   que `CONV §4.1` prohíbe («la clasificación se deriva de dónde vive, nunca se decide
   por archivo»). **Consecuencia medida y aceptada: Docs abrirá en `all` para `aiw`**, y
   mostrará las 12. `[INFERENCIA]` — la lógica de `PCJS:2040-2044` se leyó, pero **la
   consola no se levantó**: la apertura real no se observó.
   **Recomendación:** si se quiere `newera`, es un régimen de revisión declarada y merece
   su propio run, junto con el régimen de frescura que `CONV §7` ya dejó nombrado.
4. **`PROJ:693` (`^docs/` → `secondary`) es del otro hilo.** El escaneo no está roto en
   general: está **calibrado para `aiw-console`**, cuyas rutas `^context/…` y `^console/`
   sí existen. **El proyector no se tocó.**
5. **El `full_description` del `#19` apoya su tesis en cifras vencidas** (§6.b): «34
   gitignoreadas» (hoy **1**) y «roughly three to ten» (hoy **12**). Su tesis se sostiene
   por la otra pata. **Corregir el texto es del operador; `roadmap.json` no se tocó.**
6. **`R18 §5` cuenta 11 donde hay 12** (§6.a). Se nombra para que ninguna cifra de esa
   nota se reutilice sin re-medir. `R18` no se edita: **es historia, y la historia no se
   corrige** (`CONV §1`, tercera prueba).
7. **Ningún archivo mal colocado detectado.** Los 71 `.md` encajan en una fila y solo una
   (§4.b). **No se propone ningún run de reubicación.**

---

# 9. Fronteras de salida (`AC10`)

## 9.a `aiw` — exactamente un archivo nuevo, cero modificados

`git status --porcelain` al cierre:

```
 M .project/guardrails.json
 M .project/no_claims.json
 M .project/roadmap.json
 M .project/snapshot.json
 M roadmap/roadmap.json
?? .project/docs_index.json
?? .project/git_history.json
?? docs/docs_index.json
```

**Idéntico a la apertura salvo `?? docs/docs_index.json`.**

`git diff --stat HEAD` — **el mismo conjunto de 5 archivos de la suciedad de apertura,
con el mismo recuento**:

```
 .project/guardrails.json |  2 +-
 .project/no_claims.json  |  2 +-
 .project/roadmap.json    |  6 +++---
 .project/snapshot.json   | 10 +++++-----
 roadmap/roadmap.json     |  2 +-
 5 files changed, 11 insertions(+), 11 deletions(-)
```

**Este encargo no escribió en ningún archivo trackeado.** `git ls-files --others
--exclude-standard` devuelve tres rutas, dos de ellas de la apertura; **la única nueva
es `docs/docs_index.json`**.

**Intactos, probado con `git diff --stat`:** `CONVENCION-DE-DOCUMENTACION.md`,
`kernel.mjs`, `queue.mjs`, `config.json`, `governance/`, `objectives/`, `logs/`,
`records/`, `prompts/`, `roadmap/` (salvo la modificación de apertura), `.project/`
(salvo la de apertura) y los tres documentos de la raíz. **Ningún archivo se movió, se
renombró ni se borró.** `.project/docs_index.json` **no se tocó**: sigue sin trackear y
sin modificar, y **no se re-emitió `.project/`**.

**HEAD al cierre:** `cd925eb18d1781f3ac77fcacec762ab0bb1afd28` — **el mismo de la
apertura. Cero commits.**

## 9.b `aiw-console` — solo este record

Único archivo escrito: `context/aiw-console/records/INDICE-DOCS-CURADO-AIW.md`. **El
proyector no se tocó.** No se escribió en `DECISIONES.md`. No se levantó la consola. El
árbol estaba limpio antes de escribir este record (medido: `git status --porcelain` sin
salida).

## 9.c `cantu-studio` — cero bytes escritos

Leído en modo lectura: `.aiw/docs/docs_index.json`, y solo él. **No se escribió nada.**

Su árbol de trabajo **sí** trae modificaciones (`.aiw/roadmap/roadmap.json` y seis de
`.project/`), con `mtime` **`2026-07-28 22:13:49–50`**, es decir **antes** de la única
escritura de este encargo (`22:15:44`). El ejemplar leído, `.aiw/docs/docs_index.json`,
**no está entre los modificados**. `[INFERENCIA]` — son de otro hilo, coherente con la
emisión del proyector que también dejó la suciedad de `aiw`; `[NO VERIFICADO]` — no se
capturó el `git status` de `cantu-studio` a la apertura, así que la atribución no se
prueba por antes/después, solo por `mtime` y por que este encargo no ejecutó nada que
escriba ahí.

## 9.d Git y ejecución

**Git solo en lectura:** `status`, `rev-parse`, `log`, `diff --stat`, `ls-files`,
`check-ignore`. **Cero commits. Cero cambios de status de ningún run.** No se corrió la
suite. No se ejecutó ningún ticket.

El proyector se **importó en lectura** para medir `buildDocsIndex`; esa función
construye objetos y **no escribe** (`PROJ:1089-1092`, `PROJ:1115-1215`), verificado
además porque `git status` de `aiw` no cambió entre la ejecución y el cierre. El
espejo del corpus (§6.c) se construyó y se **borró** en el scratchpad de sesión, fuera
de los tres repos.

---

# 10. Status declarado

**Este run debe quedar en `completed`.** Los doce criterios de aceptación están
cumplidos: guardas de título, id y apertura pasadas (§1); esquema del emisor derivado
con cita por línea y confirmado contra el ejemplar, sin discrepancia que adjudicar
(§2); la cuestión de los tipos de archivo medida y decidida contra la convención, que
sí se pronuncia (§3); el índice ejecutando la tabla, con la clase y la fila de origen de
cada uno de sus doce campos, y ningún archivo del corpus sin clase (§4); `records/`
dentro, ratificado y contado en seis (§4.d); `freshness` medida y no escrita a mano, con
su fundamento en el emisor y en la convención (§5); las cifras vencidas re-medidas —y
una tercera, del propio `#18`, corregida— sin recortar nada para caber (§6); el
transporte probado sobre el root real, que **transporta y no escanea** (§7.a); el caso
de prueba de un solo archivo cerrado en sus tres campos, y extendido a las doce entradas
(§7.b); los huecos de la convención nombrados con recomendación explícita y no
ejecutados (§8); y las fronteras probadas con `git diff --stat` (§9).

**Este record NO cambia el status.** `roadmap/roadmap.json` no se tocó; sigue con la
única modificación de la apertura. **El cambio a `completed` es acto del operador.**

Con el `#19` cerrado, el carril `DOCUMENTATION` queda con los runs **27, 32, 36 y 42**
por delante. Cada uno añade **una** entrada `primary` al índice, en el área que
`CONV §4.2` ya le asignó: **de 12 a 16.**
