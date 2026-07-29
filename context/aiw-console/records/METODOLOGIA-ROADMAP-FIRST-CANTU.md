# METODOLOGÍA OPERATIVA A ORDEN ROADMAP-FIRST — RUN `#4` EN CANTU

> Ejecución de `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` (`queue_order` **4**,
> `O2.P4`, carril `DEVELOPMENT` por ausencia de la clave `lane`).
> **Tres archivos escritos** en `cantu-studio` — `AGENTS.md`, `generate_prompt_context.js` y
> `.aiw/docs/docs_index.json` — más este record. **Ninguno más**: barrido de `mtime` sobre
> **21 324** ficheros de `cantu-studio` (`.git` excluido) devuelve **exactamente tres** al
> terminar de escribir. Al cierre aparecen siete más, del canónico y `.project/`: los movió la
> consola del operador en paralelo, no este encargo, y el md5 del canónico no cambió. Ver §10.
>
> **La decisión sobre `NEXT_STEPS.md` NO se tomó**, y no por diferirla: la regla del encargo la
> asigna al operador. El archivo lleva material que el roadmap no cubre — medido, no supuesto —
> así que su mención **queda** en las dos superficies, anotada como archivada y con la razón por
> la que sigue citada. Ver §3.
>
> **El run NO se cierra.** Debe quedar en `active`. `.project/` no se re-emitió.

---

## 1. El run, leído verbatim del canónico

Derivado por `queue_order`, no por nombre. `.aiw/roadmap/roadmap.json` contiene **un solo** run
con `queue_order === 4`, y su `title` coincide con el del encargo. La guarda pasa.

```text
run_id      : RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001
queue_order : 4
objective   : O2   phase: O2.P4
status      : active
lane        : (clave ausente) → DEVELOPMENT por defecto
depends_on  : ["RUN-CANTU-ROADMAP-CONTENT-AUDIT-001"]
```

**`title`:**

> Update the operating methodology to roadmap-first ordering

**`summary`:**

> Update AGENTS.md and generate_prompt_context.js so the canonical roadmap.json becomes the main
> work-ordering source, and decide what role NEXT_STEPS keeps now that it is archived.

**`full_description`:**

> Make the canonical roadmap.json the main source of work ordering in the files that carry the
> instruction, instead of older NEXT_STEPS and context-pack assumptions. Two of the three surfaces
> still need the whole edit. AGENTS.md contains no occurrence of the string roadmap at all,
> declares docs/author-lite/NEXT_STEPS.md a current operating document at line 93, and lists it as
> mandatory reading at line 155. generate_prompt_context.js contains no occurrence either, and
> still joins NEXT_STEPS.md under its DOCS_AUTHOR_LITE_DIR constant at line 167. The third surface
> moved underneath this run: NEXT_STEPS.md now lives at docs/archive/author-lite/NEXT_STEPS.md,
> docs/author-lite/ holds zero files, and archived documentation sits inside the exclusion list
> that the disposition-map run freezes. So this Run first decides whether NEXT_STEPS keeps a status
> role from its archived location or whether its mention simply leaves the other two surfaces, and
> then applies that decision to AGENTS.md and generate_prompt_context.js. The end state this run
> once cited as already recorded, docs/CANONICAL_SOURCES.md, is itself archived at
> docs/archive/CANONICAL_SOURCES.md and cannot be treated as a live authority without the same
> decision. The Context Pack is external and operator-held, so the operator updates it rather than
> this Run. Scope is the ordering instruction only: it does not rewrite the rest of the governance
> rules, does not touch run identity, and does not migrate any legacy name.

**Dónde el run manda sobre el encargo.** El `full_description` dice que *este run decide* el papel
de `NEXT_STEPS`. El encargo acota esa decisión con una regla de dos ramas (§3 del ticket). No hay
contradicción real: la regla es un procedimiento de decisión, y su rama segunda devuelve la
decisión al operador. Se aplicó la regla. El run queda satisfecho en lo que sí ordena —
las dos superficies pasan a orden roadmap-first — y la disposición del archivo queda nombrada,
no resuelta en silencio.

---

## 2. Medición previa a escribir

Todas las cifras son contadas en disco en esta sesión. Ninguna se heredó del ticket.

### 2.1 `mtime` y tamaño antes de tocar nada

| Archivo | `mtime` (UTC) | Bytes |
|---|---|---|
| `AGENTS.md` | `2026-07-28T04:36:44.506Z` | 24 041 |
| `CLAUDE.md` | `2026-07-28T04:36:38.477Z` | 22 720 |
| `generate_prompt_context.js` | `2026-07-23T01:01:55.618Z` | 34 356 |
| `.aiw/docs/docs_index.json` | `2026-07-29T01:15:04.318Z` | 309 217 |
| `.aiw/roadmap/roadmap.json` | `2026-07-29T01:45:45.868Z` | 96 850 |
| `docs/archive/author-lite/NEXT_STEPS.md` | `2026-06-23T02:59:28.303Z` | 54 574 |

### 2.2 Ocurrencias en las tres superficies, antes

Conteo insensible a mayúsculas, ocurrencias totales (no líneas).

| Cadena | `AGENTS.md` | `CLAUDE.md` | `generate_prompt_context.js` |
|---|---|---|---|
| `roadmap` | **0** | **0** | **0** |
| `NEXT_STEPS` | 2 | 2 | 1 |
| `author-lite` | 35 | **45** | 6 |
| `jame-core` | 6 | 6 | 1 |

Líneas exactas de `NEXT_STEPS` antes:

```text
AGENTS.md:93    - `docs/author-lite/DECISIONS.md` y `docs/author-lite/NEXT_STEPS.md` son documentos operativos vigentes de Author Lite.
AGENTS.md:155   2. `docs/author-lite/NEXT_STEPS.md`
CLAUDE.md:89    - `docs/author-lite/DECISIONS.md` y `docs/author-lite/NEXT_STEPS.md` son documentos operativos vigentes de Author Lite.
CLAUDE.md:150   2. `docs/author-lite/NEXT_STEPS.md`
generate_prompt_context.js:167     path.join(DOCS_AUTHOR_LITE_DIR, 'NEXT_STEPS.md'),
```

Las tres líneas que el `full_description` cita — `AGENTS.md:93`, `AGENTS.md:155`,
`generate_prompt_context.js:167` — **coinciden exactamente** con lo medido. Las cifras del run
sobre `roadmap` = 0 en las dos superficies también.

**`CLAUDE.md` queda fuera.** El `full_description` nombra dos superficies que necesitan la
edición: `AGENTS.md` y `generate_prompt_context.js`. `CLAUDE.md` no aparece. Se midió y se
reporta; no se tocó. Su barrido es `#69`. Nota para el operador: el ticket cita «29 ocurrencias
medidas» para `CLAUDE.md`; lo medido hoy es **45** de `author-lite`, 2 de `NEXT_STEPS` y 6 de
`jame-core`. No se actuó sobre la diferencia.

### 2.3 `docs/author-lite/` está vacío — confirmado

```text
find docs/author-lite -type f   →  0
directorios: docs/author-lite/{audits, components, coverage, handoffs, sandbox}  (5, todos vacíos)
docs/author-lite/NEXT_STEPS.md  →  No such file or directory
docs/author-lite/DECISIONS.md   →  No such file or directory
```

El contenido está en `docs/archive/author-lite/`: `NEXT_STEPS.md` (54 574 B), `DECISIONES` →
`DECISIONS.md` (20 933 B), `DOCS_AUTHOR_LITE.md`, más subcarpetas. Las tres superficies apuntaban
a una ruta sin archivos.

### 2.4 Qué contiene hoy `docs/archive/author-lite/NEXT_STEPS.md`

1 716 líneas, 29 secciones. **No es solo orden de trabajo.** Reparto real:

| Sección | Qué es | ¿Lo cubre el roadmap? |
|---|---|---|
| §1–§2 Estado actual, Arquitectura vigente | Estado de fase 8.5 | Histórico |
| **§3 Reglas operativas actuales** | Contratos de comportamiento: `DraftSaveSchema` con validación relajada, metadata mínima para guardar, dependencias de Preview Web/Slide, reglas de Compilar Web/Slides | **No** |
| §4–§13 | Orden de trabajo de la fase 8.6 | **Sí** (O1, O3, O5) |
| §14 Riesgos abiertos | 5 riesgos redactados | No |
| **§15 Comandos de validación** | `npm --prefix …` build/lint/dev | Parcial (`AGENTS.md` ya los lleva) |
| **§17 Invariantes** | 20 invariantes duros de la capa de deduplicación: mantener autonomía de componentes, HTML final autosuficiente, sin dependencia obligatoria de CSS externo, sin runtime pesado, no migrar a React runtime, no romper portabilidad LMS/Moodle, sin cambios visuales durante la dedup, sin afirmar optimización sin medición antes/después | **No** |
| **§18–§29 Notas operativas 2026-06-22** | QA por componente ya ejecutada: Table, Visual, Video, ConceptGrid, Split, Arithmetic, Hierarchy, Timeline, más dos re-auditorías técnicas | **No** |

**La comprobación decisiva**, hecha contra el canónico y no por lectura impresionista: el roadmap
cubre el **orden** de la deduplicación —`O6.P1` medición, `O6.P2` Asset Registry, `O6.P3`
contrato `ctx.assets`, `O6.P4` integración y validación— que es exactamente la secuencia de
§17 «Roadmap futuro». Pero el vocabulario de los invariantes **no aparece en el canónico**:

```text
grep -i sobre .aiw/roadmap/roadmap.json (96 850 B):
  DraftSaveSchema  0      Moodle          0      portabilidad   0
  Invariante       0      LMS             0      Preview Real   0
  invariant        0      autonomia       0      runtime pesado 0
  React runtime    0
```

Los `full_description` de `O6.P1`–`O6.P4` describen qué hacer; no transportan las restricciones
que §17 fija sobre cómo no hacerlo. Igual con §3 y con las notas de QA de §18–§29.

### 2.5 Qué decía `AGENTS.md` sobre orden de trabajo, y dónde encajaba el roadmap

`AGENTS.md` no tenía **ninguna** noción de orden de trabajo canónico. Lo más cercano:

- **`## Pipeline operativo vigente`** → regla 7 («Un run a la vez POR CARRIL») y la subsección
  **`### Disciplina de ejecución paralela`**, que ya hablaba de carriles, de que un ticket no
  cambia `status` ni re-emite `.project/`, y de la consola como punto de serialización. Es decir:
  ya describía *cómo* corren los runs, pero **no de dónde sale su orden ni dónde viven**.
- `## Fuentes de verdad por tipo de tarea` → «Para planear fases…» listaba contextos generados y
  el índice documental, nunca el roadmap.
- `## Orden de autoridad` → 8 ítems, ninguno sobre canónico vs proyección.

El hueco natural era, por tanto, **dentro de `## Pipeline operativo vigente`, como hermana de
`### Disciplina de ejecución paralela`**: misma sección, mismo nivel, tema contiguo.

---

## 3. La decisión sobre `NEXT_STEPS` — regla aplicada, no diferida

**Rama aplicada: la segunda.** El contenido **no** es orden de trabajo y nada más; lleva
material que el roadmap no cubre, medido en §2.4. Por tanto **no la decide este encargo.**

Lo que se hizo, exactamente lo que la regla ordena:

1. **Se nombra el material no cubierto** — §2.4 de este record, con sección y ejemplo.
2. **La mención se queda** en las dos superficies del run, con nota de que está archivado y por
   qué sigue citado.
3. **Se marca como decisión del operador**, por escrito, en las dos superficies y aquí.

Lo que **no** se hizo, por estar fuera de alcance: borrar, mover o desarchivar el archivo.

**Corrección de ruta, no decisión.** La mención pasa de `docs/author-lite/NEXT_STEPS.md` (cero
archivos) a `docs/archive/author-lite/NEXT_STEPS.md` (donde está). Apuntar a la ubicación real es
lo que la propia nota «está archivado» significa; dejar la ruta rota sería afirmar algo falso, no
abstenerse. La afirmación que sí se retira es la de **vigencia** (`documentos operativos
vigentes`), porque es falsa y es justamente lo que el run manda corregir.

**Lo que el operador tiene que decidir**, enunciado para que sea decidible:

> `docs/archive/author-lite/NEXT_STEPS.md` está archivado pero es hoy el único portador de
> (a) las reglas operativas de guardar/preview/compilar, (b) los 20 invariantes de la capa de
> deduplicación de assets, y (c) las notas de QA por componente de 2026-06-22. ¿Se promueven esos
> tres bloques a documentos vigentes propios —o al roadmap, en el caso de los invariantes de
> `O6`— y entonces la mención sale de `AGENTS.md`; o se acepta citar un archivado como referencia
> permanente?

Mientras no se decida, la cita anotada es la única lectura honesta.

---

## 4. `AGENTS.md` — antes y después de cada bloque

Cinco bloques. `AGENTS.md`: 24 041 B → 26 234 B. `roadmap` pasa de **0** a **13** ocurrencias.

### Bloque 1 — sección nueva `### Fuente de orden de trabajo`

**Antes:** no existía. Se inserta al final de `## Pipeline operativo vigente`, inmediatamente
después de `### Disciplina de ejecución paralela` y antes del `---`.

**Después:**

```markdown
### Fuente de orden de trabajo

El orden de trabajo lo da el **roadmap canónico**, no la lectura suelta de documentos ni un documento de próximos pasos:

```text
.aiw/roadmap/roadmap.json
```

Hoy contiene 7 objectives, 28 phases y 72 runs.

- **El orden lo da `queue_order`, no el `phase_id`.** Los arrays de fases no están en orden de ejecución: en `O5` van `P5, P7, P6, P1, P2, P3` y en `O2` van `P1, P2, P4, P3, P5`. Recorrer el roadmap por fase invierte runs. Ordena siempre por `queue_order`.
- Hay dos carriles: `DEVELOPMENT` y `DOCUMENTATION`. `DEVELOPMENT` es el carril por defecto (`lanes[].default`) y muchos runs lo llevan por **ausencia** de la clave `lane`: hoy 49 de 72 runs no declaran `lane` y 23 declaran `DOCUMENTATION`.
- Un run **se cierra desde la consola, por el operador**, por el endpoint de escritura acotado que escribe el canónico. Un encargo **nunca** cambia `status`, `progress` ni `closeout_result`, y **nunca** re-emite `.project/`. Cada encargo **declara** en qué status debe quedar su run.
- `.project/` es **proyección derivada** (`generated_from: aiw-projector@0.9.0`, con `sources` apuntando a `.aiw/roadmap/roadmap.json`). Si proyección y canónico discrepan, manda el canónico.

Para leer el estado del canónico sin escribir:

```powershell
node tools/project-console/validate-project-console-state.mjs
```
```

**Por qué una subsección nueva y no un ítem en una existente** (criterio 5). No cabía en ninguna:
`### Disciplina de ejecución paralela` responde *cómo corren en paralelo*, no *de dónde sale el
orden*; `## Estado documental y de contexto IA` es sobre documentación, y el roadmap no es
documentación; `## Fuentes de verdad por tipo de tarea` está organizada por tipo de tarea y el
orden es transversal a todas. Se eligió el encaje de menor invención posible: **misma sección
existente** (`## Pipeline operativo vigente`), **mismo nivel** que la subsección hermana, tema
contiguo. No se creó ninguna sección de primer nivel.

### Bloque 2 — `Estado documental vigente`, la afirmación de vigencia

**Antes** (línea 93):

```markdown
- `docs/author-lite/DECISIONS.md` y `docs/author-lite/NEXT_STEPS.md` son documentos operativos vigentes de Author Lite.
```

**Después** (líneas 114–115):

```markdown
- `docs/author-lite/DECISIONS.md` es documento operativo vigente de Author Lite.
- `docs/archive/author-lite/NEXT_STEPS.md` está **archivado** y **no es la fuente de orden de trabajo**; esa fuente es el roadmap canónico. Sigue citado porque conserva material que el roadmap no cubre: reglas operativas de guardado, preview y compilación; los invariantes de la capa de deduplicación de assets; y las notas de QA por componente. **Su disposición final es decisión del operador**, no de un encargo.
```

La frase se parte en dos bullets para poder anotar uno sin alterar la afirmación del otro.
**La afirmación sobre `DECISIONS.md` se conserva literal**, incluida su ruta. Ver §7: esa ruta
también está rota, y es deriva de `#69`, no de este run.

### Bloque 3 — lectura obligatoria de Author Lite

**Antes** (línea 155):

```markdown
2. `docs/author-lite/NEXT_STEPS.md`
```

**Después** (línea 177):

```markdown
2. `docs/archive/author-lite/NEXT_STEPS.md` — archivado. Consúltalo por sus reglas operativas, invariantes y notas de QA, no por su orden de trabajo: el orden lo da el roadmap canónico. Disposición final pendiente de decisión del operador.
```

### Bloque 4 — «Para planear fases o preparar prompts para otros agentes»

**Antes:**

```markdown
1. `prompts/generated/ctx_orchestrator.md`
2. `.aiw/docs/docs_index.json`
3. la vista de Docs de Project Console (estado documental vivo)
4. `docs/shared/AI_CONTEXT_POLICY.md`
5. `AGENTS.md`
```

**Después:**

```markdown
1. `.aiw/roadmap/roadmap.json` (canónico de orden de trabajo; ordena por `queue_order`)
2. `prompts/generated/ctx_orchestrator.md`
3. `.aiw/docs/docs_index.json`
4. la vista de Docs de Project Console (estado documental vivo)
5. `docs/shared/AI_CONTEXT_POLICY.md`
6. `AGENTS.md`
```

Es la lista de *planear fases*: planear es ordenar. Sin el roadmap en primer lugar, la sección
seguía mandando planear desde contextos derivados.

### Bloque 5 — `## Orden de autoridad`

**Antes** (ítems 4–8):

```markdown
4. `.aiw/docs/docs_index.json` (registro documental vigente) prevalece sobre memoria conversacional.
5. `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` prevalece sobre prompts manuales para estado de componentes.
6. Contextos generados en `prompts/generated/` son derivados y regenerables.
7. Prompts manuales en `prompts/` no son fuente de verdad del repo.
8. Documentos históricos o handoffs cerrados no prevalecen sobre documentos vigentes ni archivos reales.
```

**Después** (ítems 4–9; se inserta el 4 y se renumera el resto, sin cambiar ningún texto):

```markdown
4. `.aiw/roadmap/roadmap.json` es el canónico de orden de trabajo y prevalece sobre `.project/`, que es proyección derivada.
5. `.aiw/docs/docs_index.json` (registro documental vigente) prevalece sobre memoria conversacional.
6. `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` prevalece sobre prompts manuales para estado de componentes.
7. Contextos generados en `prompts/generated/` son derivados y regenerables.
8. Prompts manuales en `prompts/` no son fuente de verdad del repo.
9. Documentos históricos o handoffs cerrados no prevalecen sobre documentos vigentes ni archivos reales.
```

La renumeración es segura: `grep` sobre `AGENTS.md` y sobre el generador no encuentra ninguna
referencia a los ítems de esta lista por número (la única referencia numérica del documento es
«La regla 7» de `## Pipeline operativo vigente`, que es otra lista y no se tocó).

### 4.1 Cada afirmación del criterio 4, verificada en disco

| Afirmación escrita en `AGENTS.md` | Cómo se verificó |
|---|---|
| El canónico vive en `.aiw/roadmap/roadmap.json` | El archivo existe (96 850 B) y `.project/roadmap.json` declara `sources: [{path: ".aiw/roadmap/roadmap.json"}]`. El validador lo nombra en su aviso. |
| 7 objectives / 28 phases / 72 runs | Recuento propio sobre el JSON; coincide con el validador. |
| El orden lo da `queue_order`, no el `phase_id` | Arrays de fases leídos tal cual: `O5` = `P5, P7, P6, P1, P2, P3` y `O2` = `P1, P2, P4, P3, P5`. Los `queue_order` de `O5` en orden de array son `7, 8, 9, 1/10, 48, 49`: leer por fase **sí** invierte runs. |
| Dos carriles; `DEVELOPMENT` es el defecto | `lanes` = `[{lane_id: "DEVELOPMENT", default: true}, {lane_id: "DOCUMENTATION"}]`. |
| Muchos runs lo llevan por ausencia de `lane` | Distribución contada: **49** runs sin la clave, **23** con `DOCUMENTATION`, **0** con `DEVELOPMENT` explícito. |
| Un run se cierra desde la consola, por el operador | `serve-project-console.mjs` expone la ruta de escritura acotada `/__project-console/roadmap/edit` con `handleRoadmapEdit(`, exigida por el validador, que la describe como endpoint local que «writes nothing but the canonical roadmap.json». |
| `.project/` es proyección derivada | `.project/roadmap.json` y `.project/snapshot.json` llevan `generated_from: "aiw-projector@0.9.0"`; `snapshot.json` enumera los seis `emitted_artifacts`. El validador **no lee** `.project/` en ningún punto. |

Ninguna se copió del ticket.

---

## 5. `generate_prompt_context.js`

Se leyó primero cómo compone el contexto: constantes de ruta → listas de archivos → funciones
`MODULES[...]` que devuelven string → `PROFILES[].modules` que las encadena → `buildProfile`.
**No se cambió esa forma de trabajar; solo qué incluye.** Todo lo añadido usa el mecanismo que ya
existía: una constante de ruta más, una lista más, un módulo más y su registro en perfiles.

`roadmap`: **0 → 26** ocurrencias. `queue_order`: 0 → 8. 34 356 B → 39 258 B.

**a) `NEXT_STEPS.md` deja de listarse bajo la ruta vacía.** Sale de `AUTHOR_LITE_DOCS_FILES`
(la lista que se **imprime**) y pasa a una lista de referencia anotada bajo la ruta real:

```js
const DOCS_ARCHIVE_AUTHOR_LITE_DIR = path.join(DOCS_DIR, 'archive', 'author-lite');

// NEXT_STEPS.md salió de la lista impresa: vivía bajo DOCS_AUTHOR_LITE_DIR, que hoy no
// contiene archivos. El documento está archivado en DOCS_ARCHIVE_AUTHOR_LITE_DIR y se sigue
// citando como referencia (reglas operativas, invariantes de dedup, notas de QA por
// componente), no como fuente de orden de trabajo: esa fuente es el roadmap canónico.
// No se imprime su contenido para no inyectar ~54 KB de material archivado en cada perfil.
// Su disposición final es decisión del operador.
const ARCHIVED_AUTHOR_LITE_REFERENCE_FILES = [
  path.join(DOCS_ARCHIVE_AUTHOR_LITE_DIR, 'NEXT_STEPS.md')
];
```

**Por qué citada pero no impresa.** `printDocList` vuelca el **contenido** del archivo. Bajo la
ruta vieja el archivo no existía y `includeMissing: false` lo saltaba en silencio; apuntar la
lista impresa a la ruta archivada habría metido **54 574 B** de material archivado en los seis
perfiles que cargan `AUTHOR_LITE_DOCS` — un cambio de comportamiento que nadie pidió, y
justamente lo contrario de «archivado». La cita se conserva donde corresponde: en la lista de
fuentes y en una nota. Así se cumplen a la vez el criterio 6 (no listarlo bajo ruta vacía) y la
rama segunda del criterio 3 (la mención se queda, anotada).

El módulo `AUTHOR_LITE_DOCS` gana dos notas, con el mismo idioma `> …` que ya usaba
`COMPONENT_DOCS`:

```text
> El orden de trabajo NO sale de esta sección: lo da el roadmap canónico `.aiw/roadmap/roadmap.json`, ordenado por `queue_order`.
…
### Referencia archivada, no impresa y no fuente de orden
- `docs/archive/author-lite/NEXT_STEPS.md`
> `NEXT_STEPS.md` está archivado. Sigue citado porque conserva material que el roadmap no cubre: … Su disposición final es decisión del operador; no lo trates como estado vigente ni como orden de trabajo.
```

**b) Módulo nuevo `ROADMAP_ORDERING`.** Lee el canónico y emite lo que un taller necesita para
orientarse: las reglas de lectura, el orden real de los arrays de fases por objetivo, y la cola
ordenada por `queue_order` de los runs no completados. Degrada como el resto del generador
(`> ⚠️ Missing file: …`) si el canónico no está, y captura error de parseo.

Registrado en los tres perfiles que ya cargaban `GOVERNANCE_DOCS`, que son los de planeación y
gobernanza: `ctx_orchestrator.md`, `ctx_architect.md`, `ctx_deep_repo.md`.

**c) Cabecera de perfil.** Su `Orden de autoridad` fijo gana el roadmap como ítem 3, renumerando
sin tocar el texto de los demás:

```text
3. .aiw/roadmap/roadmap.json para orden de trabajo (ordena por queue_order; .project/ es derivado)
```

**d) Tests: no tiene.** No existe `package.json` en la raíz, ni carpeta `tests/`, ni ningún
`*.test.*` que lo cubra; `grep` de `generate_prompt_context` solo aparece en JSON de estado y en
el propio archivo. Verificación aplicada en su lugar, **sin escribir en el repo**:

- `node --check generate_prompt_context.js` → **OK**.
- El archivo llama `generateAll()` al cargarse, así que ejecutarlo habría escrito
  `prompts/generated/` — fuera del alcance de escritura declarado. Se ejecutaron los módulos
  nuevos en un arnés en el scratchpad que reusa **el código real** (copia con `ROOT_DIR` fijado al
  repo y la llamada final sustituida por la impresión del módulo). Salida verificada:
  `7 objectives / 28 phases / 72 runs`, `Carriles: DEVELOPMENT, DOCUMENTATION. Por defecto:
  DEVELOPMENT.`, `49 de 72 runs no declaran la clave lane`, los siete arrays de fases y la cola
  encabezada por `4  active  DEVELOPMENT (por defecto)  O2.P4`. `AUTHOR_LITE_DOCS` renderiza la
  referencia archivada **sin** `⚠️ missing`, confirmando que la ruta ya resuelve.
- `prompts/generated/` sigue con `mtime` de 2026-07-22: **el arnés no escribió en el repo**.

---

## 6. `.aiw/docs/docs_index.json` — edición quirúrgica

El índice **sí** registra frescura por documento (`freshness`, `freshness_status`,
`last_update_source`), así que se actualizó la de `AGENTS.md`.

**Índice de 144 entradas — verificado**, antes y después.

**Respaldo y roundtrip.** Copia fuera del repo en el scratchpad, md5 idéntico al original
(`5a3d70ef10c2d5404536a3e896389b8e`). Roundtrip byte-exacto establecido **antes** de tocar nada:
el archivo es `JSON.stringify(obj, null, 2)` con saltos **CRLF** y CRLF final —
`indent=2` + CRLF reproduce los 309 217 B exactos; `indent=4` no. El script de escritura
**revalida** el roundtrip sobre el objeto sin mutar y aborta si falla.

**Diff a nivel de entradas:** `added: 0`, `removed: 0`, `changed: 1` → `["AGENTS.md"]`.
Claves de primer nivel idénticas.

| Campo | Antes | Después |
|---|---|---|
| `last_update_source` | `RUN-JAME-DOCS-CORPUS-CURATION-AUDIT-AND-KB-TAXONOMY-001` | `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` |
| `notes` | «…preserved as a documentation conflict with the matrix, not flattened.» | idéntico **+** « Names .aiw/roadmap/roadmap.json as the work-ordering source (queue_order, lanes, console-only closure) and marks the archived NEXT_STEPS.md as a reference pending operator disposition.» |

**Lo que deliberadamente no se tocó:** `freshness` (`codex_era_governance`) y `freshness_status`
(`PARTIALLY_CURRENT_WITH_PRESERVED_COMPONENT_STATUS_CONFLICTS`) siguen siendo ciertos — el
conflicto preservado es sobre estado de componentes, que este run no toca. `last_reconciled_by_run`
es otro acto (reconciliación del corpus), no este. `related_run_id` describe el run que originó la
entrada. Poner este run en `last_update_source` es la convención del propio índice: es un `run_id`
en **137** de las 144 entradas (las otras 7 llevan hash de commit o ruta de documento; ninguna
está vacía).

**No ASCII y tamaño:**

| | Antes | Después |
|---|---|---|
| Caracteres no ASCII | **1** | **1** |
| Bytes | 309 217 | 309 399 |
| Entradas | 144 | 144 |
| CRLF / CRLF final | sí / sí | sí / sí |

---

## 7. Deriva vista y **no tocada**

Nombrada, como pide el encargo, sin actuar sobre ella.

1. **`CLAUDE.md` sigue con las dos menciones rotas** (`:89`, `:150`) y 45 de `author-lite`. El run
   no lo nombra. Es `#69`.
2. **`docs/author-lite/DECISIONS.md` tampoco existe** — está en `docs/archive/author-lite/`.
   `AGENTS.md` lo sigue declarando vigente en el bullet que se conservó literal. No lo nombra el
   run; es el mismo barrido de `#69`.
3. **El generador apunta a más rutas vacías de las que este run alcanza.** Medido: de
   `GOVERNANCE_DOCS_FILES` (7 rutas) **falta todo menos `AGENTS.md`** — `docs/README.md`,
   `docs/DOCUMENTATION_MAP.md`, `docs/DOCUMENT_STATUS.md`, `docs/shared/DOCUMENT_CLASSES.md`,
   `docs/shared/AI_CONTEXT_POLICY.md`, `docs/shared/VERSIONING.md`. De los tres restantes de
   `AUTHOR_LITE_DOCS_FILES`, **faltan los tres**. `printDocList` los salta en silencio y
   `compactSourceList` los marca `⚠️ missing`. **Solo se corrigió `NEXT_STEPS.md`**, que es lo que
   el run nombra por línea. Lo demás es `#69`, y es bastante más grande de lo que sugiere el
   ticket.
4. La cabecera del generador y `AGENTS.md` siguen citando `DOCUMENTATION_MAP` / `DOCUMENT_STATUS`,
   ambos inexistentes. Igual: `#69`.
5. `docs/CANONICAL_SOURCES.md`, que el `full_description` menciona como archivado, no se tocó:
   el run lo excluye explícitamente de ser autoridad viva sin la misma decisión.

---

## 8. Validador — antes y después, por la vía que no escribe

```bash
node tools/project-console/validate-project-console-state.mjs
```

**Salida idéntica en ambas corridas**, `EXIT 0`:

```text
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 72 runs; queue groups needs_human_decision=0 now=1 ready_next=9 later=56 history=6
Roadmap v3 active run derived stages: RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001=none
Docs indexed: 144
Docs curated primary-visible: 56 of 144 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 918 commits / 2 branches (2 visible, 0 backup hidden); current=main; run-associated=6; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- … depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap …
```

**7 objectives / 28 phases / 72 runs** y **144** docs, antes y después. Único aviso: el no
bloqueante de la arista externa, que es dependencia de este mismo run y está `completed` en
`aiw-console`. **Cero avisos nuevos.** El encargo tocó `AGENTS.md` (referenciado por el índice de
docs, cuyas rutas el validador comprueba una a una) y `.aiw/docs/docs_index.json` (del que exige
`freshness_status`, `source_role`, `nav_tier` válido y que la vista curada sea subconjunto
propio): las 144 rutas siguen resolviendo y `56 of 144` sigue siendo subconjunto.

---

## 9. Idioma

**Regla sacada de `AGENTS.md:602`**, bajo el encabezado `## Comunicación` de `AGENTS.md:600`:

```text
Responde en español.
```

`AGENTS.md` está íntegramente en español, y así se escribió todo lo añadido, incluidos los
comentarios y las notas `>` del generador, que ya estaban en español. Este record también.
Se respeta la convención del propio archivo, no la del ticket.

---

## 10. Status en el que debe quedar el run

**`active`.** No se tocó `status`, `progress` ni `closeout_result` de ningún run. Comprobado al
cierre releyendo el canónico: el run `#4` sigue `active`, con `title`, `summary`,
`full_description` y `depends_on` byte a byte como al principio, y el roadmap sigue en
7 objectives / 28 phases / 72 runs.

**Aviso al operador — el canónico y `.project/` se movieron durante la sesión, y no fue este
encargo.** Al cerrar, `.aiw/roadmap/roadmap.json` y los seis artefactos de `.project/` aparecen
con `mtime` `2026-07-29T02:00:20`, posterior a la última escritura de este encargo
(`01:54:49`). El **md5 del canónico es idéntico** al medido antes de empezar a escribir —
`799af6ba74125847e25b5c151c671163` en ambos momentos — así que su **contenido no cambió**: solo
se le tocó el `mtime`. Es una re-emisión del proyector desde la consola, del lado del operador,
concurrente con este encargo. Se deja constancia porque altera el `mtime` de superficies que este
record declara, no porque este encargo haya escrito en ellas.

**El cierre es del operador, desde la consola.** Queda pendiente de su criterio la disposición de
`NEXT_STEPS.md` descrita en §3, que este encargo no podía decidir sin invadirle la decisión.

**`.project/` NO se re-emitió por este encargo.** Este encargo no ejecutó ningún emisor ni
escribió en `.project/`: sus únicas escrituras son las tres de §11, todas fuera de esa carpeta.
La re-emisión de `02:00:20` la hizo la consola, del lado del operador, según lo descrito arriba.

---

## 11. Archivos escritos por este encargo, y ninguno más

Barrido de `mtime` sobre **21 324** ficheros de `cantu-studio`, `.git` excluido, con corte en
`2026-07-29T01:46:00Z`. Corrido justo después de la última escritura devolvió **exactamente
tres**, que son los de la tabla. Repetido al cierre devuelve **diez**: esos tres más
`.aiw/roadmap/roadmap.json` y los seis de `.project/`, todos con `mtime` `02:00:20` por la
re-emisión de la consola descrita en §10 — contenido del canónico idéntico por md5, y ninguno
escrito por este encargo.

**Escritos por este encargo, los tres:**

| Archivo | md5 antes | md5 después | No ASCII antes → después |
|---|---|---|---|
| `cantu-studio/AGENTS.md` | `c5afc8f9872e4072d11e9b76d8d14c45` | `2f5b7775f51e7dd7871043d449a5f71d` | 230 → 255 |
| `cantu-studio/generate_prompt_context.js` | `1f07464a31b3ce841e2d6c04c0af4917` | `0eceaec9dfbd548c6137f7d8d58a9b8b` | 172 → 197 |
| `cantu-studio/.aiw/docs/docs_index.json` | `5a3d70ef10c2d5404536a3e896389b8e` | `38b9dc6ec633744f3a49fc14c34ca230` | 1 → 1 |

Más este record, cuarto y último archivo escrito:

| Archivo | Estado |
|---|---|
| `aiw-console/context/aiw-console/records/METODOLOGIA-ROADMAP-FIRST-CANTU.md` | nuevo |

Los tres de `cantu-studio` conservan CRLF y salto final. Respaldos con md5 idéntico al original
fuera del repo, en el scratchpad de sesión, antes de tocar nada.

**Recuento de records:** el directorio tiene **49** contando este, luego había **48**
inmediatamente antes de escribirlo. El recuento se movió durante la sesión — la primera lectura
dio **47** — porque el hilo paralelo está añadiendo records mientras este encargo corría; ver
§12. El nombre `METODOLOGIA-ROADMAP-FIRST-CANTU.md` se comprobó contra el listado y no colisiona
con ninguno.

---

## 12. Superficies disjuntas

Barrido de `mtime` sobre los **189** ficheros de `aiw-console` (`.git` y `node_modules`
excluidos), mismo corte. Devuelve **uno**, y **no es de este encargo**:

```text
2026-07-29T01:55:40.246Z   context\aiw-console\records\DISPOSICION-CARPETAS-COLA-AIW.md
```

Es el hilo paralelo escribiendo su propio record mientras este corría. Se deja constancia y **no
se tocó**. Confirma la disjunción: las escrituras de este encargo están todas en `cantu-studio`;
la suya, en un record distinto.

El hilo paralelo además **creó** al menos un record entre la primera lectura del directorio (47)
y la última (48 sin contar el mío). Por eso el recuento de §11 se declara sobre la lectura final
y no sobre la primera: el directorio es superficie viva del otro hilo, no de este encargo.

**md5 de las superficies protegidas, antes y después — las cuatro idénticas:**

| Archivo | md5 antes | md5 después |
|---|---|---|
| `aiw-console/context/DECISIONES.md` | `3f6bdf8816a0b43818519eb3582f6511` | `3f6bdf8816a0b43818519eb3582f6511` |
| `aiw-console/context/aiw-console/CONTRATO.md` | `f77ccec64d99f2048d4bde41638cb228` | `f77ccec64d99f2048d4bde41638cb228` |
| `aiw-console/roadmap/roadmap.json` | `f299d968fdf781bf31863d696bd9610e` | `f299d968fdf781bf31863d696bd9610e` |
| `aiw-console/.aiw/roadmap/roadmap.json` | `08b9d813d6e3ee31aee464eb02294b61` | `08b9d813d6e3ee31aee464eb02294b61` |

No se tocaron handoffs, tests ni records existentes: el barrido de `mtime` sobre los 189 ficheros
lo demuestra por omisión. **No se ejecutó git en ninguna forma**, no se levantaron servidores y no
se corrieron suites de `aiw-console`.

---

## 13. Fuera de alcance, respetado

- **`#69`** — barrido general de rutas legacy: `CLAUDE.md`, `OPERATIONS-STATE.md`, los 17 packets,
  `DECISIONS.md`, las seis rutas muertas de `GOVERNANCE_DOCS_FILES`. Medido y nombrado en §7; sin
  tocar.
- **Renombrar directorios o decidir sobre las cáscaras vacías** de `docs/author-lite/` — `#69`.
- **`OPERATIONS-STATE.md:31`** — `#6`. No se abrió.
- **Borrar, mover o desarchivar `NEXT_STEPS.md`** — no se hizo; sigue en
  `docs/archive/author-lite/` con `mtime` de 2026-06-23 intacto.
- **Editar el canónico, cambiar status, aplicar `barrier` o resolver la arista externa** — nada de
  eso se hizo.
- **Blueprint, modelo canónico de `#2`, contratos de `#3`, `#7`, `#8`** — no se abrieron.
