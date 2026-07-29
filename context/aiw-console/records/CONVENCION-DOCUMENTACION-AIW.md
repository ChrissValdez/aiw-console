# CONVENCIÓN DE DOCUMENTACIÓN DE AIW — barrier del carril `DOCUMENTATION`

Ejecución de `RUN-AIW-DOCS-CONVENTION-001` (`queue_order` **18**, `lane`
`DOCUMENTATION`, `barrier` `lane`). Decide **qué cuenta como documentación de AIW,
dónde vive y cómo se clasifica**. No escribe documentación: decide la forma que los
cinco runs siguientes del carril van a llenar.

**Entregable:** `aiw/docs/docs_management/CONVENCION-DE-DOCUMENTACION.md` —
**un archivo nuevo, el único dentro de `aiw`.**

**No es mecanismo bajo `CONST §4`:** una convención es papel (`D-055`). Carriles y
barriers como DATO ya los gobierna `CONTRATO §10.e` (`D-051`); declarar este run
barrier no añade mecanismo a `aiw`.

## Abreviaturas de cita

| Abrev. | Archivo |
|---|---|
| `PROJ:n` | `aiw-console/tools/projector/project.mjs`, línea `n` |
| `PCJS:n` | `aiw-console/project-console/assets/project-console.js`, línea `n` |
| `CONST` | `aiw/CONSTITUCION.md` |
| `CTX` | `aiw/CONTEXTO.md` |
| `CLAUDE` | `aiw/claude.md` |
| `RM` | `aiw/roadmap/roadmap.json` |
| `EMISION` | `aiw-console/context/aiw-console/records/EMISION-PROJECT-AIW.md` |
| `MEDICION` | `aiw-console/context/aiw-console/records/MEDICION-ESTADO-DE-AIW.md` (citado de segunda mano, vía `EMISION` y vía `RM` #19) |

Todo lo del proyector, del renderer y del corpus de `aiw` se leyó **de primera
mano** en este encargo. Lo marcado `[INFERENCIA]` es razonamiento sobre lo medido;
lo marcado `[NO VERIFICADO]` no se comprobó.

---

# 1. Guardas de apertura — las dos pasaron

## 1.a Guarda de título e id (`AC1`)

Leído de `RM`, run de `queue_order` **18**:

| Campo | Exigido | Encontrado | ¿Coincide? |
|---|---|---|---|
| `queue_order` | 18 | `18` | ✔ |
| `title` | `Decide what counts as AIW documentation, where it lives and how it is classified` | idéntico, carácter a carácter | ✔ |
| `run_id` | `RUN-AIW-DOCS-CONVENTION-001` | idéntico | ✔ |

Además, medido del mismo objeto: `status: "active"`, `lane: "DOCUMENTATION"`,
`barrier: "lane"`, `depends_on: []`. Está en `O2.P5` («Docs convention and curated
index»), junto al **#19**.

## 1.b Guarda de apertura (`AC2`)

**Status del run:** `"active"`. No es `planned` → **no se para.**

**HEAD de `aiw`:** `a63a82bc565c9e525becac3ca66a575261691b59` —
`project: guardrails y no_claims emitidos por primera vez, ahora que su fuente existe (O2.P4)`,
`2026-07-28 20:58:57 -0600`.

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
`.project/`**. Ninguna otra cosa. La guarda admite exactamente ese conjunto, así
que el encargo siguió.

---

# 2. Inventario real — medido, no heredado (`AC3`)

Medido el **2026-07-29** sobre el disco, **antes** de escribir el entregable.

## 2.a Lo que el escaneo ve: 70

`listMarkdownFiles` (`PROJ:1050-1069`) recorre el repo saltando solo
`DOCS_SKIP_DIRS` = `.git`, `.aiw`, `.project`, `node_modules`, `tests`
(`PROJ:700`). Ninguno de esos directorios contiene `.md` en `aiw` (medido), así que
**el escaneo ve los 70 `.md` del disco, sin descartar ninguno**.

Verificado por ejecución en lectura de `buildDocsIndex(aiw)`:

| Medida | Valor | Fuente |
|---|---:|---|
| `docs.length` | **70** | ejecución de `buildDocsIndex` |
| `nav_tier: primary` | **3** | íd. |
| `nav_tier: secondary` | **67** | íd. |
| `default_visible: true` | **3** | íd. |
| Modo | **escaneado** | `docs/docs_index.json` no existe (medido) |

Coincide exacto con `EMISION §6.1`, que midió lo mismo el 2026-07-28.

## 2.b Clasificados por naturaleza — los 70, sin residuo

| Naturaleza | Ruta | N |
|---|---|---:|
| **Documentos de verdad** (reglas de la raíz) | `CONSTITUCION.md`, `CONTEXTO.md`, `claude.md` | **3** |
| **Fragmentos de log de run** | `logs/<run>/{objective,round1_executor,round1_reviewer,summary}.md` | **33** |
| **Incidente / diagnóstico** (sueltos en `logs/`) | `logs/INCIDENT-2026-07-11.md`, `logs/DIAG-roadmap-invalid.md` | **2** |
| **Tickets de objetivo** | `objectives/processed` 13 · `parked` 3 · `qualification` 3 · `queue-e7` 3 | **22** |
| **Prompts** | `prompts/{executor,reviewer}.md` | **2** |
| **Records históricos** | `records/*.md` | **6** |
| **Plantillas** | `templates/objective.md` | **1** |
| **Fixtures** | `sandbox/000-sandbox.md` | **1** |
| **TOTAL** | | **70** |

`objectives/pending/` **existe y está vacío** (medido). Los 33 fragmentos son 9
carpetas de run: ocho con cuatro archivos y la huérfana
`002-canonical-path-and-autoproject-orphan-20260711` con uno solo.

**Cifra que confirma lo heredado:** 67 de 70 no son documentos → **el escaneo de
AIW sería ~95,7 % ruido**. Coincide con el «~96 %» de `MEDICION` vía `RM` #19.

## 2.c El dato vencido, medido de nuevo: **la reproducibilidad ya no es el problema**

`RM` #19 afirma: «34 de las 70 entradas están gitignoreadas y el escaneo no
consulta `.gitignore`», y de ahí deriva que el índice sería **distinto en cada
máquina**. `EMISION §6.2` corrigió esa cifra a **36** el 2026-07-28 a las 15:21.

**Medido hoy, tras `#12`:**

| Categoría | Entradas | % | Fuente |
|---|---:|---:|---|
| **Trackeadas** | **69** | 98,6 % | `git ls-files '*.md'` |
| **Gitignoreadas** | **1** | 1,4 % | `git check-ignore` sobre las 70 |
| No trackeadas y no ignoradas | **0** | 0 % | `git ls-files --others --exclude-standard` |
| **Total** | **70** | 100 % | |

La única gitignoreada es **`sandbox/000-sandbox.md`**, por `sandbox/` en
`aiw/.gitignore:1`. **`logs/` ya no está en `.gitignore`** (medido: las cinco
entradas del archivo son `sandbox/`, `locks/`, `node_modules/`, `jame_snapshot/`,
`.aiw/`).

**La causa, con su commit:** `e4fb17b` —
`portabilidad: logs/ se versiona - 58 archivos, 9 runs y los dos incidentes que CONST 4 exige citables (D-053)`,
`2026-07-28 17:59:25 -0600`, **59 archivos, 1 885 inserciones**. Es el commit de
`#12` (`RUN-AIW-EVIDENCE-PORTABILITY-001`, `completed`), y **aterrizó 2 h 38 min
después** de que `EMISION` midiera 36.

La aritmética cierra sin residuo: **34 trackeadas + 35 de `logs/` = 69.**

> **Consecuencia para el `#19`, y hay que decirla porque debilita su argumento
> principal.** El `full_description` del `#19` sostiene el índice curado sobre dos
> patas: (1) el escaneo es ~96 % ruido, y (2) **no es reproducible entre máquinas**.
> **La pata (1) sigue en pie, medida.** **La pata (2) está en gran parte caída**:
> un clon fresco de `aiw` hoy emitiría **69 de las 70** entradas, no 34. Solo el
> fixture del sandbox desaparecería.
>
> **El argumento para curar no se cae, pero cambia de naturaleza.** Ya no es «el
> archivo sale distinto en cada máquina»; es «el archivo es 95,7 % ruido y clasifica
> por una regla de ubicación escrita para otro repo» (§4.4 de la convención, y §5.d
> de este record). El `#19` no debería seguir apoyándose en la cifra de 34/36.
> **No se toca `roadmap.json`:** se nombra, y es del operador decidir si el texto
> del `#19` se corrige.

## 2.d Otras dos cifras heredadas, también vencidas

| Cifra en `RM` #19 | Medida hoy | Fuente |
|---|---:|---|
| `cantu-studio` «140 transported» | **146** curadas, **146** transportadas, **0** `unresolved` | ejecución de `buildDocsIndex(cantu-studio)` |
| `aiw-console` «45 scanned» | **52** entradas | `aiw-console/.project/docs_index.json` en disco |

Ambas son crecimiento del corpus, no error. Se registran para que el `#19` no cure
contra números viejos.

## 2.e El reparto de `MEDICION`, y por qué difiere en 2

`RM` #19 reparte las 70 como `3 + 33 + 2 + 22 + 1 + 11`, que **suma 72**. El
reparto medido es `3 + 35 + 22 + 1 + 9 = 70`. El cajón residual (prompts 2 +
records 6 + plantilla 1) es **9**, no 11.

`EMISION §6.5` ya adjudicó esta diferencia y su diagnóstico se sostiene contra lo
medido hoy: es **un desliz de clasificación en la prosa de `MEDICION`**, no una
diferencia de disco. Descartada la hipótesis alternativa: los dos records que
salieron de `aiw` (`AUDIT-CONSOLE-O4-PHASE0.md`, `HANDOFF-O4-TRAMO1.md`) se movieron
en `48c427b`, **2026-07-23 13:00:21**, cinco días *antes* de `MEDICION` — así que
`records/` ya tenía 6 cuando se escribió «once».

El reparto de `objectives/` sí cambió de verdad, y con commit: `EMISION §6.4` contó
`11 processed + 2 pending`; hoy son `13 processed + 0 pending`, por `d312c83`
(`cola: archivados 005 y 006…`, `2026-07-28 19:45:07`). El total, 22, no se movió.

---

# 3. El esquema derivado del emisor (`AC4`)

Es el criterio que impide que salga una convención bonita e inservible: **la
convención tiene que poder llenar exactamente estos campos, con exactamente este
vocabulario.**

## 3.a Cuándo TRANSPORTA y cuándo ESCANEA

```
export function buildDocsIndex(root, opts = {}) {          // PROJ:1089
  const curated = readCuratedDocsIndex(root);              // PROJ:1090
  return curated ? transportDocsIndex(...) : scanDocsIndex(...);  // PROJ:1091
}
```

La decisión es por **PRESENCIA en la ruta del layout** (`PROJ:1086-1088`), nunca por
nombre de proyecto. `readCuratedDocsIndex` (`PROJ:1098-1105`) exige tres cosas: que
el layout resuelva una ruta `docs_index`, que el archivo parsee, y que traiga
`Array.isArray(index.docs)`. **Un índice presente pero malformado transporta nada y
cae al escaneo** (`PROJ:1096-1097`).

**Los dos layouts** (`PROJ:623-640`):

| Layout | `docs_index` | Cita |
|---|---|---|
| `repo_root` | `docs/docs_index.json` | `PROJ:630` |
| `project_local_aiw` | `.aiw/docs/docs_index.json` | `PROJ:638` |

**AIW resuelve `repo_root`** — medido, ejecutando `detectRootLayout(aiw)`, porque
`roadmap/roadmap.json` cumple la puerta de forma (`PROJ:745-776`). Su índice curado,
por tanto, va en **`aiw/docs/docs_index.json`**, que **no existe** (medido) → hoy
escanea.

## 3.b Los campos de cada entrada — verificados, no supuestos

El escaneo construye exactamente esto (`PROJ:1240-1249`):

```js
const entry = {
  title: titleFromMarkdown(safeReadText(absolute), basename(path)),  // PROJ:1242
  path,                                                              // PROJ:1243
  nav_tier: tier,                                                    // PROJ:1244
  default_visible: tier === "primary",                               // PROJ:1245
  ia_bucket: directory === "." ? "root" : directory                  // PROJ:1246
};
if (source) entry.freshness = source.mtime;                          // PROJ:1248-1249
```

| Campo | ¿Existe? | Vocabulario / regla | Cita |
|---|---|---|---|
| `title` | **Sí** | Texto libre. Primer H1 del Markdown; si no hay, el nombre de archivo | `PROJ:1242`, `PROJ:147-151` |
| `path` | **Sí** | Ruta POSIX relativa al repo | `PROJ:1243`, `PROJ:711-714` |
| `nav_tier` | **Sí** | **Cerrado, 6 tokens**: `primary` · `secondary` · `advanced` · `evidence` · `history` · `proposal` | `PROJ:686` |
| `default_visible` | **Sí** | Booleano. Derivado: `nav_tier === "primary"` | `PROJ:1245` |
| `ia_bucket` | **Sí** | Texto libre. Escaneo: el directorio, o `"root"` en la raíz | `PROJ:1246` |
| `freshness` | **Sí, opcional** | Escaneo: `mtime` ISO. Se omite si el archivo no resuelve | `PROJ:1248-1249`, `PROJ:716-726` |

**Los seis existen.** Ninguno es inventado por el encargo. Verificado además por
ejecución: las claves de una entrada real de AIW son exactamente
`title, path, nav_tier, default_visible, ia_bucket, freshness`.

**En transporte, el emisor solo rellena lo que FALTA** (`PROJ:1107-1114`), y lo
declara en el propio archivo bajo `docs_source.field_rules` (`PROJ:1194-1201`):

- `title` → curado; si no, primer H1; si no, nombre de archivo (`PROJ:1145-1147`).
- `nav_tier` → curado si está en el vocabulario; si no, derivado de la ruta
  (`PROJ:1149-1151`).
- `default_visible` → curado si es booleano; si no, `nav_tier === "primary"`
  (`PROJ:1152-1154`).
- `ia_bucket` → **la agrupación curada gana**, y solo si la entrada no ofrece
  *ninguna* señal de agrupación se escribe el directorio (`PROJ:1155-1161`). La
  cadena de señales es `ia_bucket → category → related_area → source_role`
  (`hasGroupingSignal`, `PROJ:1218-1223`).
- `freshness` → **el valor curado viaja verbatim, sea del tipo que sea**; solo si no
  hay, se rellena con el `mtime` (`PROJ:1163-1172`).
- Todo campo que el emisor no puede derivar honestamente (`audience`,
  `canonicality`, `related_*`, `notes`, …) **viaja intacto** (`PROJ:1109-1113`).
- Una entrada curada cuya ruta no resuelve se **OMITE** de `docs[]` y se **DECLARA**
  en `unresolved` (`PROJ:1128-1140`, `PROJ:1202-1206`).

## 3.c La regla del escaneo para `primary` / `secondary` — es sobre ubicación

`DOCS_NAV_TIER_RULES` (`PROJ:689-697`), primera coincidencia gana, sobre la ruta
POSIX relativa al repo (`docNavTier`, `PROJ:1042-1047`):

| # | Patrón | Tier | ¿Coincide con algo en `aiw`? |
|---|---|---|---|
| 1 | `^context/[^/]+/records/` | `evidence` | **No** — `aiw` no tiene `context/` |
| 2 | `^context/handoffs/` | `secondary` | **No** |
| 3 | `^console/` | `secondary` | **No** |
| 4 | `^docs/` | `secondary` | **No** hoy; **sí** tras este encargo |
| 5 | `^[^/]+$` | **`primary`** | **Sí** — las 3 de la raíz |
| 6 | `^context/` | `primary` | **No** |
| 7 | `.` | `secondary` | **Sí** — las otras 67 |

**Ésta es la constatación central del criterio 4, y confirma el diagnóstico del
encargo:** en `aiw` solo se disparan la regla 5 (*«estar en la raíz del repo»*) y la
regla 7 (*el comodín*). Las cuatro primeras están escritas para la disposición de
`aiw-console` (`context/`, `console/`) y **en `aiw` no coinciden con nada**. El
resultado no es una clasificación de AIW: es la clasificación de otro repo aplicada
a AIW, y lo único que sobrevive es «raíz = importante, todo lo demás = igual».

El emisor declara su propia doctrina en el comentario de esa tabla (`PROJ:687-688`):
la derivación es por **DÓNDE vive** un documento, «así que uno nuevo se clasifica
solo y ninguna lista curada a mano puede pudrirse». **La convención adopta esa
doctrina y le cambia el sujeto:** la carpeta sigue clasificando, pero la tabla
carpeta→tier la escribe AIW para AIW (§4.a de la convención).

## 3.d El escaneo no consulta `.gitignore`

`listMarkdownFiles` (`PROJ:1050-1069`) salta únicamente `DOCS_SKIP_DIRS`
(`PROJ:700`). No hay lectura de `.gitignore` en ninguna rama. **El hecho sigue
siendo cierto; lo que cambió es que en `aiw` ya casi no tiene consecuencia** (§2.c).

## 3.e Lo que el CONSUMIDOR hace realmente con estos campos

Verificado de primera mano en `project-console.js`, porque el criterio 5 pide una
tabla de `nav_tier` e `ia_bucket` y sería inservible si el renderer los ignorara:

| Campo | Uso real | Cita |
|---|---|---|
| `path` | **Agrupa.** El árbol es la cadena de carpetas menos el prefijo común | `PCJS:2178-2180`, `PCJS:2137` |
| `path` | Regla `archive/`: un documento bajo una carpeta `archive` **no se renderiza en ningún modo** | `PCJS:2106-2124` |
| `nav_tier` | Tier de navegación; el explícito gana si está en el vocabulario | `PCJS:2191-2198`, `PCJS:2066` |
| `default_visible` | Filtro del modo **Primary KB** | `PCJS:2209-2216` |
| `ia_bucket` | **NO agrupa** — la navegación lo ignora explícitamente | `PCJS:2087-2092` |
| `ia_bucket` | **SÍ es respaldo de `nav_tier`**, y solo por igualdad exacta: `"history"` → `history`, `"run_evidence"` → `evidence` | `PCJS:2204-2205` |
| `operator_review_status` | Su **presencia** decide el modo de apertura de Docs (`newera` vs `all`) | `PCJS:2040-2044`, `PCJS:2315` |

**Y el alcance declarado del índice, que decide el criterio 8:** *«docs_index stays
the broad documentation/evidence registry»* (`PCJS:2035`). **No es un registro solo
de documentación.** `evidence` e `history` son tiers de primera clase.

## 3.f Contraste con el ejemplar curado de `cantu-studio`

Medido sobre `cantu-studio/.aiw/docs/docs_index.json`, en lectura:

| Medida | Valor |
|---|---|
| Entradas | **146** (transportadas 146, `unresolved` 0) |
| Campos distintos por entrada | **22**; 17 en las 146, y 5 parciales (`archive_status` 136, `retention_class` 53, `operator_review_status` 44, `conflict_refs` 9, `stale_reason` 3) |
| `nav_tier` | `evidence` 65 · `primary` 58 · `secondary` 8 · `history` 7 · `advanced` 5 · `proposal` 3 |
| `ia_bucket` | 10 valores **temáticos**: `run_evidence` 60, `docs` 32, `component_docs` 21, `author_lite` 12, `governance` 9, `jame_core` 3, `ops` 3, `roadmap` 3, `project_console` 2, `prompts` 1 |
| Extensiones | `.md` 138 · `.json` 7 · `.html` 1 |
| ¿Se indexa a sí mismo? | **No** — 0 entradas apuntan a un `docs_index` |
| `docs/docs_management/` | **3 entradas, las tres `primary`** |

**Cuatro lecciones que la convención toma del ejemplar, cada una verificada:**

1. **El registro es amplio.** 72 de 146 entradas (49 %) son `evidence` o `history`.
   Curar no significa «solo documentación».
2. **`ia_bucket` es un tema, no una carpeta.** Los 10 valores son nombres temáticos
   en `snake_case`, no rutas. Por eso la convención escribe `docs_management`, no
   `docs/docs_management`.
3. **El índice no se indexa a sí mismo.** Regla adoptada para el `#19`.
4. **Un índice curado puede nombrar archivos que no son `.md`.** El escaneo solo ve
   `.md`; la curación no tiene ese límite. Por eso la convención declara que su
   prueba **no depende del formato** y clasifica `roadmap/`, `governance/` y
   `config.json` explícitamente (clase E, insumo).

**Y una precisión, en descargo del escaneo:** `aiw-console` está escaneado, con 52
entradas repartidas `evidence` 36 · `primary` 11 · `secondary` 5 — y ahí las reglas
1, 2 y 3 de `DOCS_NAV_TIER_RULES` **sí** coinciden, porque están escritas para su
disposición. El escaneo no está roto en general: **está calibrado para un repo que
no es AIW.**

---

# 4. La convención (`AC5`)

El texto completo y vinculante es
`aiw/docs/docs_management/CONVENCION-DE-DOCUMENTACION.md`. Lo que sigue es su
contenido decisorio, íntegro.

## 4.a QUÉ es documentación — la prueba, por clase

Un archivo es documentación de AIW cuando pasa **las tres** pruebas:

1. **SUJETO** — su tema es AIW mismo: su ciclo, su evidencia, su vocabulario, sus
   reglas, su operación.
2. **DESTINATARIO** — está escrito para quien necesita **operar, auditar o
   extender** AIW; no para la máquina.
3. **MANTENIMIENTO** — cuando AIW cambia, el archivo **queda falso** y alguien tiene
   la obligación de corregirlo.

**La tercera es la que decide**, y es lo que separa documentación de historia: un
registro histórico **no** queda falso cuando el sistema cambia. Sigue siendo
verdadero sobre su momento. Por eso corregirlo sería reescribir el pasado.

La prueba **no depende del formato**: se aplica igual a un `.json`.

### Las nueve clases

| # | Clase | ¿Doc.? | Prueba que falla | Razón |
|---|---|---|---|---|
| **A** | **DOCUMENTO** | **Sí** | — | Describe cómo funciona AIW hoy. Tiene mantenedor. |
| **B** | **NORMA** | **Sí** | — | Prescribe en vez de describir, pero cumple las tres. |
| C | INSTRUCCIÓN AL AGENTE | Sí, subordinada | — | Destinatario primario el agente; puerta de entrada para el humano. |
| D | PUNTERO | Sí, mínima | — | Su contenido es una redirección; queda falsa si el destino se mueve. |
| E | INSUMO DE EJECUCIÓN | **No** | **1.b** | Prompts, plantillas, tickets, `roadmap/`, `governance/`: su lector es la máquina. |
| F | EVIDENCIA DE RUN | **No** | **1.c** | Cuenta de un run; congelada por definición. |
| G | INCIDENTE / DIAGNÓSTICO | **No** | **1.c** | Congelada, pero **citable por norma** (`CONST §4`). |
| H | REGISTRO HISTÓRICO | **No** | **1.c** | Describe un estado pasado. |
| I | FIXTURE | **No** | **1.a** | Su tema no es AIW: es un caso que AIW ejecuta. |

**No documentación no es «de segunda»:** F, G y H sostienen la auditabilidad de AIW.
La distinción es de **régimen** — documentación se corrige; evidencia e historia no
se tocan.

## 4.b DÓNDE vive cada clase

**`aiw/docs/` es la raíz documental de AIW.** Cuatro razones, cada una verificable:

1. **El emisor ya puso ahí el índice** — `repo_root` → `docs/docs_index.json`
   (`PROJ:630`). Documentar en otro sitio dejaría al índice solo en su carpeta,
   apuntando fuera.
2. **La consola agrupa por carpeta** y **la ruta gana sobre los campos del índice**
   (`PCJS:2087-2092`). La raíz documental *es* la arquitectura de información.
3. **Precedente del proyecto hermano** — `cantu-studio` declara `docs/` raíz
   documental canónica (`AGENTS.md:88`, vía `MODELO-CANONICO-DOCUMENTACION-CANTU
   §B`), y su `docs/docs_management/` existe con 3 entradas `primary` (medido).
4. **Es la única carpeta nueva.** Nada existente se mueve.

**Sub-estructura — un área por audiencia:**

```
docs/docs_management/   quien escribe o cura documentación
docs/kernel/            quien extiende el kernel
docs/evidence/          quien audita un run muerto
docs/operation/         quien opera y revisa la ventana
```

Regla: **se crea un área cuando va a alojar más de un documento, o cuando su
audiencia difiere de la de toda área existente.** Todo documento vive en un área;
**no hay archivos sueltos en la raíz de `docs/`**.

### Los tres documentos de la raíz — decididos uno por uno

Son las **únicas tres** rutas que el escaneo clasifica `primary` (regla 5,
`PROJ:694`), y ninguna es obviamente documentación. **Ninguna se mueve**, y la
convención no lo propone: `CTX` lo fija — «`CLAUDE.md` y `CONSTITUCION.md` son las
reglas que el agente lee **del repo donde trabaja** […] Se quedan aquí, siempre».

| Archivo | Clase | Decisión y razón |
|---|---|---|
| `CONSTITUCION.md` | **B — NORMA** | **Es documentación.** Prescribe, pero pasa las tres pruebas: sujeto AIW, el lector decide con ella, y se enmienda por decisión humana explícita cuando AIW cambia (`CONST:5`). Máxima autoridad del repo. |
| `claude.md` | **C — INSTRUCCIÓN** | **Es documentación.** Destinatario primario el agente, pero es el único archivo que contesta «¿qué es este repo y dónde está cada cosa?» (`CLAUDE`, §*Dónde vive cada cosa*). Queda falso en cuanto una ruta se mueve → cumple 1.c estrictamente. |
| `CONTEXTO.md` | **D — PUNTERO** | **Es documentación, mínima.** Su contenido es una tabla de redirección a `aiw-console`. Se conserva `primary` por razón **operativa**: el modo de fallo más frecuente de quien llega a `aiw` es buscar el contexto de gobernanza dentro de `aiw`, y un puntero invisible por defecto no hace su trabajo. |

### `records/` — historia, dicho con todas las letras

**No es documentación.** Falla 1.c: los seis describen estados pasados —dos
auditorías (2026-07-10 y 07-11), la arqueología de v1, la crónica, la historia de v1
y la calificación nocturna— y ninguno queda falso cuando AIW cambia. Clase **H**.

El repo ya lo decía; la convención lo hace explícito: «`records/COSECHA.md`,
`records/HISTORIA.md` y demás registros históricos — describen el pasado del kernel;
no son contexto vivo de cabina» (`CTX`). **No se mueven y no se les asigna
mantenedor.** Que estén *indexados* es una decisión distinta → §6.

### Las demás — todas se quedan

`prompts/` (E) · `templates/` (E) · `objectives/` (E, su superficie es Run Queue, no
Docs) · `logs/<run>/` (F) · `logs/INCIDENT-*`, `logs/DIAG-*` (G) · `records/` (H) ·
`sandbox/` (I) · `roadmap/`, `governance/`, `config.json` (E).

**Regla general: la convención no mueve nada.** Si algo resulta mal colocado, se
**nombra** y se propone como run futuro (§8).

## 4.c CÓMO se clasifica — la tabla (`AC5`, tercera pregunta)

**Principio: la carpeta clasifica.** Cada carpeta tiene exactamente un par
`(nav_tier, ia_bucket)`; la clasificación se **deriva de dónde vive**, nunca se
decide por archivo. Es la doctrina que el propio emisor declara para sí
(`PROJ:687-688`), aplicada a un índice curado: **curar deja de ser una lista de
juicios sueltos y pasa a ser la ejecución de esta tabla.**

| Clase | Ruta | `nav_tier` | `ia_bucket` | `default_visible` | ¿Indexado? |
|---|---|---|---|---|---|
| B — NORMA | `CONSTITUCION.md` | `primary` | `governance` | `true` | **Sí** |
| C — INSTRUCCIÓN | `claude.md` | `primary` | `governance` | `true` | **Sí** |
| D — PUNTERO | `CONTEXTO.md` | `primary` | `governance` | `true` | **Sí** |
| A — DOCUMENTO | `docs/docs_management/*.md` | `primary` | `docs_management` | `true` | **Sí** |
| A — DOCUMENTO | `docs/kernel/*.md` | `primary` | `kernel` | `true` | **Sí** |
| A — DOCUMENTO | `docs/evidence/*.md` | `primary` | `evidence` | `true` | **Sí** |
| A — DOCUMENTO | `docs/operation/*.md` | `primary` | `operation` | `true` | **Sí** |
| G — INCIDENTE | `logs/INCIDENT-*.md`, `logs/DIAG-*.md` | `evidence` | `run_evidence` | `false` | **Sí** |
| H — HISTORIA | `records/*.md` | `history` | `history` | `false` | **Sí** — §6 |
| F — EVIDENCIA DE RUN | `logs/<run>/*.md` | — | — | — | **No** |
| E — INSUMO | `prompts/`, `templates/`, `objectives/`, `roadmap/`, `governance/` | — | — | — | **No** |
| I — FIXTURE | `sandbox/*.md` | — | — | — | **No** |

**Sin esta tabla el `#19` no puede curar nada. Con ella, curar es aplicarla.**

**Tres advertencias sobre los valores, todas verificadas contra el consumidor:**

1. **`ia_bucket` no agrupa** (`PCJS:2087-2092`). Es metadato que viaja, no
   navegación. La agrupación sale de `path`.
2. **`ia_bucket` sí es respaldo de `nav_tier`, por igualdad exacta y solo en dos
   valores** (`PCJS:2204-2205`): `"history"` → `history`, `"run_evidence"` →
   `evidence`. Por eso la tabla usa **exactamente** esas cadenas en H y G: si algún
   día se perdiera el `nav_tier`, el respaldo **coincide** con lo declarado en lugar
   de contradecirlo.
3. **`evidence` (área) ≠ `run_evidence` (bucket).** `docs/evidence/` aloja el
   documento *sobre* el esquema de evidencia — clase A, `primary`. La comparación de
   `PCJS:2205` es por igualdad exacta contra `run_evidence`, así que el bucket
   `evidence` **no** la dispara. **No escribir `run_evidence` en un documento de
   `docs/evidence/`**: lo degradaría a tier `evidence` el día que perdiera su
   `nav_tier`.

## 4.d Reglas de forma

1. **Nombre:** `MAYUSCULA-KEBAB.md` para clase A. Los distingue de los tickets
   (`minuscula-kebab.md`) y de los fragmentos de log (`minuscula_snake.md`).
2. **H1 obligatorio y descriptivo** — el emisor lo toma como `title` (`PROJ:1242`,
   `PROJ:147-151`); sin él, el título publicado es el nombre de archivo.
3. **Idioma: español**, como `CONSTITUCION.md` y `claude.md`; `CLAUDE:46` fija
   «Coordinación en español». Verbatim en su idioma original: identificadores,
   nombres de archivo y rama, tokens de veredicto (`APPROVED`, `CHANGES_REQUIRED`,
   `BLOCKED`, `HUMAN_REVIEW`), claves de artefacto y texto citado. *Ratificable; el
   resto de la convención no depende de esta regla.*
4. **Un documento no legisla.** Describe lo que una decisión estableció y **la
   cita**. Si necesita cambiar una regla, el cambio va a `DECISIONES.md` y el
   documento cita la entrada. **Es lo que mantiene la documentación como papel bajo
   `CONST §4`** (`D-055`): un documento que deroga por su cuenta ya no es papel.
5. **Un hecho, un dueño.** Dos copias divergen.

---

# 5. La convención puesta a prueba contra los cinco runs que la heredan (`AC6`)

Leídos los `full_description` de los cinco desde `RM`. **Los cinco encajan**, con la
salvedad de forma del `#42`, que la convención ya cubre y que se explica abajo.

| # | `run_id` | Entregable bajo esta convención | Clase | `nav_tier` / `ia_bucket` |
|---|---|---|---|---|
| **19** | `RUN-AIW-CURATED-DOCS-INDEX-001` | `aiw/docs/docs_index.json` | **ÍNDICE** (no entra en `docs[]`) | — |
| **27** | `RUN-AIW-CYCLE-DOCUMENTATION-001` | `aiw/docs/kernel/CICLO-DEL-RUN.md` | **A** | `primary` / `kernel` |
| **32** | `RUN-AIW-EVIDENCE-SCHEMA-DOCUMENTATION-001` | `aiw/docs/evidence/ESQUEMA-DE-EVIDENCIA.md` | **A** | `primary` / `evidence` |
| **36** | `RUN-AIW-CATEGORIES-BATCHES-DOCUMENTATION-001` | `aiw/docs/operation/CATEGORIAS-Y-BATCHES.md` | **A** | `primary` / `operation` |
| **42** | `RUN-AIW-UNATTENDED-OPERATION-DOCUMENTATION-001` | `aiw/docs/operation/OPERACION-DESATENDIDA.md` | **A** | `primary` / `operation` |

*(Los nombres de archivo son la aplicación de la regla de forma `MAYUSCULA-KEBAB` +
español al título de cada run; el run que escriba puede afinar el nombre, no el
área ni la clase.)*

**Comprobaciones una por una:**

- **#19** — Su entregable no es un documento sino el índice. La convención lo aloja
  en la ruta que el layout ya fija (`PROJ:630`), **dentro** de la raíz documental,
  de modo que el índice vive con el corpus que indexa. **No se indexa a sí mismo**,
  siguiendo el ejemplar (medido: 0 auto-referencias en `cantu-studio`). Y recibe lo
  que le faltaba para poder curar: la tabla de §4.c. **Encaja.**
- **#27** — «El ciclo hoy solo se conoce leyendo `kernel.mjs`». Audiencia: quien
  extiende el kernel → área `kernel`. **Encaja.**
- **#32** — «Una reconstrucción forense de un run muerto». Audiencia: quien audita
  → área `evidence`. Nota de la convención, no de placement: su bucket debe ser
  `evidence`, **nunca** `run_evidence` (§4.c, advertencia 3). **Encaja.**
- **#36** — Su contenido restata invariantes constitucionales («la aprobación del
  reviewer no es aprobación humana»). ¿Es entonces clase B? **No: describe el modelo
  y cita la constitución, no legisla** — regla de forma 4. Audiencia: el operador
  que agrupa y cierra trabajo → área `operation`. **Encaja.**
- **#42** — **El único que rozó el borde, y merece decirse.** Su
  `full_description` exige que el documento «lleve una CORRECCIÓN explícita: LA VIEJA
  REGLA DE OPERACIÓN […] QUEDA DEROGADA». **Derogar es legislar**, y un documento que
  legisla dejaría de ser papel bajo `CONST §4`, que es justamente lo que el propio
  run declara no ser.
  **La convención lo resuelve sin hueco, con la regla de forma 4:** la derogación se
  **registra** en `DECISIONES.md` (`aiw-console`) y el documento la **cita y la
  explica**. El `#42` conserva íntegro lo que su descripción exige —que la regla
  vencida no sobreviva en el único sitio que la gente lee— y no adquiere autoridad
  normativa. **Encaja, y la regla 4 existe en la convención por esta prueba.**

> **Nota de tamaño para el `#19`, medida.** Aplicada hoy, la convención produce
> **11 entradas** (3 raíz + 2 incidentes + 6 records); con los cuatro documentos
> escritos, **15**. Sin `records/`: **5** hoy y **9** al final. El `#19` estima
> «roughly three to ten». **15 excede esa horquilla.** No es un choque: la horquilla
> se escribió *antes* de que la convención existiera, y era una orden de magnitud
> frente a 70, no un tope. **Se nombra para que el `#19` no la trate como límite
> duro.** `roadmap.json` no se toca.

---

# 6. Lo que es decisión del OPERADOR (`AC8`)

## El alcance del índice, y el único punto abierto

Medido primero, porque decide el marco: **el índice de documentos no es un registro
solo de documentación.** El consumidor lo declara — *«docs_index stays the broad
documentation/evidence registry»* (`PCJS:2035`) — y el ejemplar lo confirma en el
dato: de 146 entradas de `cantu-studio`, **65 son `evidence` y 7 `history`** (49 %).

Por eso G y H se indexan **aunque no sean documentación**:

- **G — los dos incidentes.** `CONST §4` exige que todo mecanismo nuevo cite su
  incidente documentado; `D-053` los metió en git para que esa cadena probatoria
  sobreviva. **Un incidente citable por norma que el índice no conoce es una cita
  que nadie puede seguir.** Decisión del encargo, no del operador: entra.

> ## PENDIENTE DE RATIFICACIÓN — `records/` en el índice
>
> **La clasificación no está en duda:** `records/` es historia, no documentación
> (§4.b). Lo que solo el operador puede decidir es si además se **registra**.
>
> **RECOMENDADO: sí — `nav_tier: history`, `default_visible: false`.** Tres razones:
>
> 1. `claude.md` ya remite al lector a `records/COSECHA.md` y `records/HISTORIA.md`
>    (`CLAUDE`, §*Dónde vive cada cosa*): son alcanzables **por diseño**, y un índice
>    que no los conoce contradice la puerta de entrada del repo.
> 2. `history` está fuera de la vista por defecto (`PCJS:2209-2216`): coste **cero**
>    para el lector normal, valor real para un auditor.
> 3. Los seis viajan en git (medido, §2.c): la entrada es reproducible.
>
> **COSTE DE CAMBIAR DE OPINIÓN: seis entradas menos en `docs/docs_index.json`.**
> Ningún archivo se mueve, ningún código cambia, ninguna otra entrada se toca.
> **Reversible dentro del propio `#19`.**
>
> **No bloquea:** la opción recomendada queda elegida y declarada en la convención,
> marcada como ratificable.

**Segundo punto, menor y también ratificable:** la **regla de idioma** (§4.d.3).
Español, fundado en `CLAUDE:46`. Se declara como ratificable porque el roadmap y los
tickets de `aiw` están en inglés, así que el corpus queda mixto por diseño. El resto
de la convención no depende de esta regla.

---

# 7. La ubicación del propio documento, justificada (`AC7`)

**`aiw/docs/docs_management/CONVENCION-DE-DOCUMENTACION.md`** — primera aplicación
de la convención, derivada de sus propias reglas y no al revés:

1. **Pasa las tres pruebas de §4.a** → clase **A** → vive bajo `docs/` (§4.b).
   *Sujeto:* cómo se gobierna la documentación de AIW. *Destinatario:* quien escribe
   o cura documentación. *Mantenimiento:* si el vocabulario del emisor o la
   disposición del repo cambian, queda falsa y hay que corregirla.
2. **Área `docs_management/`** — su audiencia no coincide con la de `kernel`,
   `evidence` ni `operation`, así que la regla de creación de áreas la abre. Es
   además el precedente exacto del proyecto hermano: `cantu-studio` aloja en
   `docs/docs_management/` los tres documentos que gobiernan su corpus (medido: 3
   entradas, las tres `primary`), decidido allí con el mismo razonamiento
   (`MODELO-CANONICO-DOCUMENTACION-CANTU §B`: DOCS MANAGEMENT contesta «*how is
   documentation itself governed?*»).
3. **NO va suelto en la raíz de `docs/`**, aunque sea el primero y sea lo cómodo.
   §4.b dice que todo documento vive en un área. **Si el documento que fija la regla
   fuese su primera excepción, el siguiente que escriba tendría razón al preguntar
   por qué el suyo no puede serlo también.** Alternativa considerada y descartada
   por eso.
4. **`docs/governance/` — considerada y descartada.** La autoridad normativa ya
   tiene dueño único en `CONSTITUCION.md`, y el bucket `governance` está asignado a
   las tres de la raíz (§4.c). Meter aquí el modelo mezclaría «quién manda» con
   «cómo se gobierna el corpus». Mismo corte que hizo el proyecto hermano.
5. **Nombre y lengua** por §4.d: `MAYUSCULA-KEBAB`, cuerpo en español.

**Clasificación resultante:** `nav_tier: primary` · `ia_bucket: docs_management` ·
`default_visible: true`.

## 7.a La divergencia con el escaneo, medida sobre este mismo archivo

Re-ejecutado `buildDocsIndex(aiw)` **después** de escribir el entregable:

| Medida | Antes | Después |
|---|---:|---:|
| `docs.length` | 70 | **71** |
| `primary` | 3 | **3** |
| `secondary` | 67 | **68** |

Y así ve el escaneo al documento que acaba de fijar la convención:

```json
{
  "title": "CONVENCIÓN DE DOCUMENTACIÓN DE AIW",
  "path": "docs/docs_management/CONVENCION-DE-DOCUMENTACION.md",
  "nav_tier": "secondary",
  "default_visible": false,
  "ia_bucket": "docs/docs_management"
}
```

**Los tres campos de clasificación discrepan de la convención**, que lo declara
`primary` / `docs_management` / `true`. La causa está medida y es la regla 4 de
`DOCS_NAV_TIER_RULES` (`^docs/` → `secondary`, `PROJ:693`), que se dispara antes que
la de la raíz.

**Esto no es un defecto que este encargo repare.** El escaneo es el respaldo para un
repo que no curó nada (`PROJ:1082-1085`). **Es la demostración medida, sobre un caso
real y de un solo archivo, de por qué el `#19` existe** — y es un caso de prueba
listo para él: cuando `aiw/docs/docs_index.json` exista y sea conforme,
`buildDocsIndex` transportará (`PROJ:1091`) y estas tres discrepancias desaparecerán.

---

# 8. Nombrado, no ejecutado

Fuera del alcance de este encargo. **Nada de esto se tocó.**

1. **El escaneo está calibrado para `aiw-console`, no para AIW.** Cuatro de sus
   siete reglas (`^context/…`, `^console/`) no coinciden con nada en `aiw`
   (§3.c). **Es del otro hilo.**
2. **El `full_description` del `#19` apoya su tesis en cifras vencidas:** 34
   gitignoreadas (hoy **1**), «140 transported» de Cantu (hoy **146**), «45 scanned»
   de esta consola (hoy **52**), y un reparto que suma 72. **Su tesis sigue siendo
   correcta por la otra pata** (95,7 % ruido + clasificación por ubicación ajena).
   Corregir el texto es del operador; `roadmap.json` no se tocó.
3. **La horquilla «3–10 entradas» del `#19` queda corta**: la convención produce 11
   hoy y 15 al final (§5).
4. **Ningún archivo mal colocado detectado que exija movimiento.** Los 70 `.md`
   quedan donde están; los 67 que no son documentos tienen carpeta correcta para su
   clase. **No se propone ningún run de reubicación.**
5. **Régimen de frescura y cadencia de revisión: no decidido.** Hoy la `freshness`
   de una entrada es el `mtime` cuando la curación no declara otra cosa
   (`PROJ:1163-1172`). `cantu-studio` usa además `freshness_status` y
   `operator_review_status` (medido), y este último **decide el modo de apertura de
   Docs** (`PCJS:2040-2044`) — **dato relevante para el `#19`**: si su índice curado
   no pone `operator_review_status` en ninguna entrada, Docs abrirá en `all`.
6. **`aiw` ya está en el registro de proyectos de la consola** (medido:
   `project-console/projects.json`, tercera entrada, `root: "../../../aiw"`), y el
   `#21` sigue `planned`. Qué le queda al `#21` **no se investigó** — `[NO
   VERIFICADO]`, y no es de este encargo.

---

# 9. Fronteras de salida (`AC9`)

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
?? docs/
```

**Idéntico a la apertura salvo `?? docs/`.**

`git diff --stat HEAD` — **el mismo conjunto de 5 archivos de la suciedad de
apertura, con el mismo recuento**: `.project/guardrails.json` 2 (+1/−1),
`.project/no_claims.json` 2, `.project/roadmap.json` 6, `.project/snapshot.json` 10,
`roadmap/roadmap.json` 2 → **11 inserciones, 11 borrados**. **Este encargo no
escribió en ningún archivo trackeado.**

`git ls-files --others --exclude-standard '*.md'` devuelve **una sola ruta**:

```
docs/docs_management/CONVENCION-DE-DOCUMENTACION.md
```

**Intactos, probado con `git diff --stat`:** `kernel.mjs`, `queue.mjs`,
`config.json`, `governance/`, `objectives/`, `logs/`, `roadmap/` (salvo la
modificación de apertura), `.project/` (salvo la de apertura), y los tres documentos
de la raíz `CONSTITUCION.md`, `CONTEXTO.md`, `claude.md`. **No existe
`aiw/docs/docs_index.json`** — es el `#19`.

**Ningún archivo se movió, se renombró ni se borró.**

## 9.b `aiw-console` — solo este record

Único archivo escrito:
`context/aiw-console/records/CONVENCION-DOCUMENTACION-AIW.md`. **El proyector no se
tocó.** No se re-emitió `.project/`. No se escribió en `DECISIONES.md`. No se
levantó la consola.

## 9.c `cantu-studio` — cero bytes

Leído en modo lectura (`.aiw/docs/docs_index.json`, un record de contexto). **No se
escribió nada.**

## 9.d Git y ejecución

**Git solo en lectura:** `status`, `rev-parse`, `log`, `show --stat`,
`diff --stat`, `ls-files`, `check-ignore`. **Cero commits.** **Cero cambios de
status de ningún run.** No se corrió la suite. No se ejecutó ningún ticket. El
proyector se **importó en lectura** para medir `buildDocsIndex`; esa función
construye objetos y **no escribe** (`PROJ:1089-1092`, `PROJ:1233-1271`), verificado
además porque `git status` no cambió.

---

# 10. Status declarado

**Este run debe quedar en `completed`.** Los once criterios de aceptación están
cumplidos: guardas pasadas (§1), inventario real medido con el dato vencido
corregido (§2), esquema derivado del emisor con cita por línea y contraste contra el
ejemplar curado (§3), la convención con sus tres respuestas y la tabla de
clasificación (§4), la prueba contra los cinco herederos (§5), lo pendiente de
ratificación nombrado y no horneado (§6), la ubicación del propio documento
justificada bajo su propia regla y su divergencia con el escaneo medida (§7), y las
fronteras probadas (§9).

**Este record NO cambia el status.** `roadmap/roadmap.json` no se tocó; sigue con la
única modificación de la apertura. **El cambio a `completed` es acto del operador.**

**Como barrier de carril, este run libera `DOCUMENTATION`** en cuanto quede
`completed`: los runs **19, 27, 32, 36 y 42** dejan de estar retenidos. El siguiente
del carril es el **#19**, que hereda de aquí la tabla de §4.c y las cifras corregidas
de §2.
