# RETIRO DE `roadmap_AIW_temp.md` Y PUBLICACIÓN DE LA TABLA DE EQUIVALENCIA

Record de `RUN-AIW-MARKDOWN-RETIREMENT-001` (`queue_order` 20 del canónico de
`aiw`, fase `O2.P6`). Fecha de ejecución: **2026-07-28**.

Toda cifra de este record se midió del disco en esta sesión. Ninguna se heredó de
un `full_description` ni de un record anterior sin re-medirla, y donde la medición
discrepa de la fuente heredada, **gana el disco** y se declara (§3 y §8).

---

## 1. Guardas de apertura

**Guarda de título e id — PASA.** Run de `queue_order` 20 en
`aiw/roadmap/roadmap.json`:

| Campo | Valor leído | Esperado | |
|---|---|---|---|
| `title` | `Retire roadmap_AIW_temp.md and publish the numbering equivalence table` | idéntico | ✓ |
| `run_id` | `RUN-AIW-MARKDOWN-RETIREMENT-001` | idéntico | ✓ |
| `status` | `active` | `active` o `completed` | ✓ |

**Estado de los dos repos al abrir.**

| Repo | HEAD al abrir | HEAD al cerrar |
|---|---|---|
| `aiw` | `18c29a907b3b83a6d31437f945e9981dbeb176b5` | igual |
| `projects/aiw-console` | `0ac78548fa179c2cdfe737e24809276f4580a964` | **`082651697a7dedab4fe5ecc082e3d982f5ed3023`** |

**El HEAD de `aiw-console` se movió durante este run, y no fue este run.** Ver §8.3:
el hilo paralelo commiteó mientras esto se ejecutaba.

`git status --porcelain` de **`aiw`** al abrir — solo `roadmap/roadmap.json` y
archivos de `.project/`, como exige la guarda:

```
 M .project/guardrails.json
 M .project/no_claims.json
 M .project/roadmap.json
 M .project/snapshot.json
 M roadmap/roadmap.json
?? .project/docs_index.json
?? .project/git_history.json
```

`git status --porcelain` de **`aiw-console`** al abrir, reportado **entero** porque
hay otro hilo escribiendo en ese repo y la frontera de salida se mide contra esta
lista, no contra un árbol limpio:

```
?? context/aiw-console/records/FRONTERA-CAPACIDAD-TECLADO-VIRTUAL-KATEX-CANTU.md
```

Ese archivo **no lo tocó este run**: es del hilo paralelo de `aiw-console`.

**Ubicación del Markdown, verificada antes de tocarlo.** Vive en
`projects/aiw-console/context/aiw/roadmap_AIW_temp.md`, **no en `aiw`**, pese a que
su propia cabecera afirme lo contrario. Probado: `git ls-files` de `aiw` no lo
contiene, y `git log --diff-filter=D` de `aiw` lo borra en **`48c427b`** —
*"chore(context): mudar contexto de gobernanza a aiw-console; puntero en
CONTEXTO.md"*—, que es exactamente el commit que el canónico nombra.

---

## 2. Las tres piezas de nivel roadmap — CONFIRMADAS, no re-copiadas

Están en el `full_description` del run de `queue_order` **16**
(`RUN-AIW-CANONICAL-ROADMAP-001`, «Write AIW's first canonical roadmap and flip the
root's mode»), dentro del bloque delimitado por `=== ROADMAP-LEVEL NOTE ===` y
`=== END OF ROADMAP-LEVEL NOTE ===`. Confirmar es comprobar que el retiro **no
borra algo que exista en exactamente un sitio más**.

### Pieza 1 — El hueco permanente de `O4` y su razón

**Dónde está hoy en el canónico:** run 16, punto 1 de la nota, verbatim:

> «**O4 DOES NOT EXIST, AND THE GAP IS PERMANENT.** The objectives array jumps from
> O3 to O5, and the number is NEVER reused. O4 was Global Console; its canonical
> now lives in aiw-console's own roadmap […]. This is legal: `CONTRATO §10.d` Rule 1
> requires global uniqueness of the RUN_ID and says nothing about objective_id.»

**Verificada contra el dato, no solo contra la prosa:** el array `objectives[]` de
`aiw/roadmap/roadmap.json` es `O1, O2, O3, O5, O6, O7` — el salto existe.

**¿Se perdería con el retiro? NO, y ni siquiera está en riesgo.** El Markdown **no
contiene esta pieza**: tiene un `O4` vivo, no un hueco. La declaración nació con el
canónico. Además vive fuera de él, en `context/DECISIONES.md`: `D-046`
(«`objective_id` conserva el hueco (`O0`, `O4`) — es identidad, no se renumeró; el
hueco dice la verdad») y `D-054`, que reitera la legalidad bajo `CONTRATO §10.d`
Regla 1. **Tres sitios, ninguno es el Markdown.**

### Pieza 2 — Los runs contra `aiw-console` SÍ son delegables al kernel

**Dónde está hoy en el canónico:** run 16, punto 2 de la nota, verbatim:

> «**RUNS AGAINST aiw-console ARE DELEGABLE TO THE KERNEL.** Every run in this
> roadmap is category manual for as long as the anti-self-hosting rule stands — the
> kernel NEVER executes against AIW (`CONSTITUCION §3`) — with this one explicit
> exception: runs targeting aiw-console are delegable to the kernel when that flow
> is resumed.»

**En el Markdown está en las líneas 15-16** (numeración original; hoy 35-36).

**¿Se perdería con el retiro? NO.** Sobrevive en el canónico (run 16) **y** en
`context/DECISIONES.md:1097`, dentro de `D-046`, que la lista como declaración
`(b)` del hueco de capa 2: *"el matiz de que los runs contra `aiw-console` sí serían
delegables al kernel (`roadmap_AIW_temp.md:15-16`) — una EXCEPCIÓN a la regla de
categoría manual"*. **Dos sitios más allá del Markdown.**

### Pieza 3 — La nota de puntero: `O4` estuvo duplicado durante una ventana deliberada

**Dónde está hoy en el canónico:** run 16, punto 3 de la nota, verbatim:

> «Three pieces of it are roadmap-level and must survive that retirement: the two
> above, and **its pointer note recording that O4 was duplicated during a deliberate
> window and was knowingly left stale rather than maintained in two places**.»

**En el Markdown está en las líneas 100-106** (numeración original; hoy 120-126),
fechada 2026-07-24.

**¿Se perdería con el retiro? NO.** Sobrevive en el canónico (run 16) **y** en dos
records de este repo, medidos:
`context/aiw-console/records/MEDICION-ESTADO-DE-AIW.md:218` («O4 vive HOY en dos
archivos. Fue **ventana deliberada**, registrada en D-046») y `:226`, que cita la
nota como `RM-AIW:100-106`; y `context/aiw-console/records/REDACCION-O4.md:267`
(«Es la ventana deliberada»).

**Veredicto de la guarda del criterio 3: las tres piezas sobreviven. No se para.**
Además, ninguna existe en un solo sitio más: las tres tienen al menos dos anclas
fuera del Markdown. Nada de esto se re-copió a ningún archivo nuevo.

---

## 3. La tabla de equivalencia de numeración

Construida leyendo **los encabezados `##` reales del Markdown** y **los
`objective_id` y `title` reales del canónico**, y contrastada después contra el
`full_description` del run 20. Se publica completa en el documento
`aiw/docs/docs_management/TABLA-DE-EQUIVALENCIA-DE-NUMERACION.md`; se reproduce
aquí por ser el hecho central del run.

### 3.1 Los dos extremos, medidos

**RM-AIW — seis objetivos** (líneas del archivo **antes** de la cabecera de retiro):

| Línea | Encabezado verbatim |
|---|---|
| 20 | `## O1 — Casa en orden (migración al workspace único, D-031) — **COMPLETADO**` |
| 78 | `## O2 — Run autónomo confiable (kernel)` |
| 87 | `## O3 — Categorías y batches (D-029/D-030 → código)` |
| 98 | `## O4 — Consola global (migrará a su propio roadmap cuando nazca)` |
| 167 | `## O5 — Metodología` |
| 191 | `## O6 — Modo nocturno (horizonte; gated por O2 y O3)` |

**El árbol — siete ranuras, seis ocupadas:**

| `objective_id` | `title` verbatim | Fases | Runs | `queue_order` |
|---|---|---|---|---|
| `O1` | House in order | 2 | 11 | 1–11 |
| `O2` | AIW is readable | 7 | 10 | 12–21 |
| `O3` | Reliable autonomous run | 6 | 6 | 22–27 |
| `O4` | **no existe — hueco permanente** | — | — | — |
| `O5` | Run evidence and observability | 4 | 5 | 28–32 |
| `O6` | Categories and batches | 4 | 4 | 33–36 |
| `O7` | Long unattended execution (batches, lanes and parallelism) | 6 | 6 | 37–42 |

### 3.2 La equivalencia

| RM-AIW | Título Markdown | Destino | Título del árbol | Veredicto |
|---|---|---|---|---|
| `O1` | Casa en orden | **`O1`** | House in order | **Único que conserva número Y sentido.** Diez viñetas → runs 1–10 (`O1.P1`); el árbol le añadió `O1.P2` venida de `O5`. |
| `O2` | Run autónomo confiable | **`O3`** | Reliable autonomous run | Mismo sentido, número distinto. Pre-flight de scope → run 22; estrés en repo grande → run 23. |
| `O3` | Categorías y batches | **`O6`** | Categories and batches | Mismo sentido, número distinto. Campo de categoría → run 34; push por proyecto → run 33; batch→rama → run 35. |
| `O4` | Consola global | **salió de AIW** | — | Es `O4` del roadmap de `aiw-console`: **16 fases y 33 runs** (medido). En AIW el número queda vacío para siempre. |
| `O5` | Metodología | **se partió** | — | Ver §3.3. |
| `O6` | Modo nocturno | **`O7`** | Long unattended execution | Mismo sentido, número distinto. Lanzador desacoplado → run 37; lock huérfano → run 38; noches reales → run 41. |

**Y en la otra dirección, lo que el Markdown nunca tuvo:**

| Árbol | Título | Antecedente en RM-AIW |
|---|---|---|
| `O2` | AIW is readable | **Ninguno.** Nada en el Markdown sobre reconciliación de la cola, reparación de tickets, gobernanza declarada ni convención de documentación. |
| `O5` | Run evidence and observability | **Ninguno.** Nada sobre identidad de run, manifiesto, coste ni señales a mitad de run. |

`O2` y `O5` son las dos etiquetas más peligrosas: existen en ambos extremos con
referentes sin relación entre sí.

### 3.3 El `O5` del Markdown, que se partió

| Viñeta | Estado | Destino | Base de la atribución |
|---|---|---|---|
| Conversión del proyecto Claude | `completed` | `O1.P2`, run 11 `RUN-AIW-CABIN-PROJECT-CONVERSION-001` | Explícita: «History, transcribed from the backlog Markdown». |
| Metodología de 3 proyectos en paralelo | `planned` | `O2.P7`, run 21 `RUN-AIW-THIRD-PROJECT-001` | Explícita, con alcance **reescrito**: «SCOPE REWRITTEN AGAINST THE ORIGINAL BULLET». |
| Normalización de vocabulario de categorías | `planned` | `O6.P2`, run 34 `RUN-AIW-RUN-CATEGORY-FIELD-001` | Explícita: «THIS RUN ABSORBS THE VOCABULARY ITEM THAT WAS LOOSE UNDER METHODOLOGY IN THE OLD BACKLOG». |
| Roadmaps → JSON v3 | `planned` | `O2.P3` (run 16) y `O2.P7` (run 21) | **Por sujeto**; ningún run la nombra. |

### 3.4 Discrepancia con el `full_description`, y gana el disco

El `full_description` del run 20 dice que de `O5` «la viñeta de metodología que
estaba hecha pasó a ser `O1.P2`, y **el resto se disolvió** en los objetivos que
poseen el trabajo». Medido contra el disco, **«el resto» no se disolvió de forma
difusa**: dos de las tres viñetas restantes tienen un run de destino que las nombra
por escrito, y la tercera tiene dos destinos identificables por sujeto. El reparto
es de tres objetivos —`O1`, `O2` y `O6`—, no de uno más una nebulosa. Se declara la
discrepancia; **no se edita el `full_description`** (fuera de alcance).

Todo lo demás del `full_description` se confirmó exacto: los seis títulos del
Markdown, los siete del árbol, el hueco de `O4`, y las tres reasignaciones
`O2→O3`, `O3→O6`, `O6→O7`.

---

## 4. Las diez citas `RM-AIW:` — localizadas y nombradas, NO reparadas

### 4.1 Cifras re-medidas

| Cifra | Heredada | **Medida** | |
|---|---|---|---|
| Runs del canónico de `aiw-console` que citan el Markdown | 8 | **8** | ✓ |
| Citas `RM-AIW:` en ese canónico | 10 (encargo) / *"eight"* (`full_description` run 20) | **10** | ✓ encargo |
| Desfase preexistente | +8 | **+8 en las diez** | ✓ |

**El `full_description` del run 20 dice «eight runs … all eight are already
broken».** Ocho runs es correcto; **ocho citas no**: son **diez**, porque dos runs
citan dos veces cada uno (`#36` y `#38`). Se declara; no se edita.

**El token es `RM-AIW:<línea>`, no la cadena `roadmap_AIW_temp.md`.** Confirmado:
en `projects/aiw-console/roadmap/roadmap.json` hay **10** ocurrencias de `RM-AIW:`
y **1** sola del nombre de archivo literal (en `#37`, en prosa, sin número de
línea — no es una cita por línea y no cuenta).

**Causa del +8:** la nota de puntero al canónico ocupa ocho líneas y se insertó
**después** de que esas citas se escribieran, sin renumerarlas. Prueba
independiente: la única cita que apunta **a la nota misma**, `RM-AIW:100-106` (en
`records/MEDICION-ESTADO-DE-AIW.md`, no en el canónico), **era correcta** antes de
este run — se escribió después de la inserción.

### 4.2 La tabla — insumo del hilo de `aiw-console`

`Línea real` = línea del archivo **hoy, ya con la cabecera de retiro aplicada** =
`cita + 8 + 20`. Es el dato que el otro hilo necesita.

| # | Título verbatim del run | Cita | Dice | **Línea real hoy** | Qué hay de verdad en la línea que dice |
|---|---|---|---|---|---|
| 13 | `Audit / Phase 0 of the migration to the global console` | `RM-AIW:114-120` | 114 | **142** | `  nivel al mudarse). **La consola de AIW ENCIENDE**: el server` |
| 23 | `Multi-project shell reading aiw-console only` | `RM-AIW:152` | 152 | **180** | `- **Digest para la cabina** — ` + "`planned`" |
| 24 | `Cantu emits the new .project/ folder alongside .aiw` | `RM-AIW:133` | 133 | **161** | `  consola, endpoint de edición (tooling Cantu-local), regex ` + "`RUN-JAME-`" + ` del` |
| 35 | `Global console renders Cantu (parity, operator QA)` | `RM-AIW:149-151` | 149 | **177** | `  Lleva REGLAS, no el plan (el plan es estado y vive en este roadmap): qué es` |
| 36 | `UI/UX of the global console` | `RM-AIW:119-120` | 119 | **147** | `  files could not be loaded" (archivos de estado local gitignoreados que no se` |
| 36 | `UI/UX of the global console` | `RM-AIW:157` | 157 | **185** | `- **Consola global en aiw-console** — ` + "`planned`" |
| 37 | `AIW as a third project (roadmap Markdown → JSON v3)` | `RM-AIW:134` | 134 | **162** | `  history builder. Sale un MAPA, no código. Con el sync del repo, buena parte…` |
| 38 | `Cutover: retirement of Cantu's local console and deletion of .aiw` | `RM-AIW:155-157` | 155 | **183** | `  fechado y con SHA para detectar obsolescencia. Chico, derivado, jamás editado…` |
| 38 | `Cutover: retirement of Cantu's local console and deletion of .aiw` | `RM-AIW:151` | 151 | **179** | `  canónico, la estructura de carpetas como regla.` |
| 42 | `Digest for the cockpit` | `RM-AIW:148` | 148 | **176** | `- **Context pack de la consola** — ` + "`planned`" |

**Qué hay en la línea real** (lo que la cita quería decir, verificado):

| Cita | Línea real | Contenido |
|---|---|---|
| `:114` | 142 | `**SECUENCIA ACORDADA (D-034) — la consola es lo SIGUIENTE y va primero.**` |
| `:152` | 180 | `- **Pantalla multi-proyecto** — ` + "`planned`" |
| `:133` | 161 | `- **3. Los tres roadmaps al contrato** — ` + "`planned`" |
| `:149` | 177 | `- **Consola global en aiw-console** — ` + "`planned`" |
| `:119` | 147 | `roadmap + docs + status, READ-ONLY. Nada más; edición y UX vienen después y ya` |
| `:157` | 185 | `  acto deliberado y registrado. Features nuevas (batches, UI) solo en la global.` |
| `:134` | 162 | `  Cantu ya está en v3; AIW pasa de markdown temporal a JSON v3; el de la consola…` |
| `:155` | 183 | `- **Paridad y corte** — ` + "`planned`" |
| `:151` | 179 | `  apuntando a Cantu en read-only primero. La local no se toca hasta paridad.` |
| `:148` | 176 | `  mano. Con el sync del repo ya no es prerequisito: es optimización de contexto.` |

**Arista externa, legal por `CONTRATO §10.d` Regla 2.** La reparación es de un run
del hilo de `aiw-console`, que dependerá de éste. **Este run no editó ese archivo y
no propone cómo repararlo.**

### 4.3 Observación fuera del alcance del criterio 5, reportada por honestidad

El token `RM-AIW:` aparece también fuera del canónico, en este mismo repo:
`context/DECISIONES.md`, `context/handoffs/aiw-console.md`, siete records de
`context/aiw-console/records/`, y los derivados `.project/roadmap.json` y
`.project/snapshot.json`. **Esas citas también se desplazan +20 hoy**, y las
escritas antes de la nota de puntero arrastran además el +8. No se contaron una a
una ni se clasificaron: quedan fuera del alcance de este run y se nombran para que
el hilo de `aiw-console` decida si su reparación entra en el mismo saco.
`[NO VERIFICADO]` cuántas de ellas están rotas.

---

## 5. Cómo se retiró — y por qué así

**Se retiró SUPERSEDIENDO, no borrando.** La decisión va razonada, no por defecto.

**Por qué no se borra.** Borrar el archivo no arregla las diez citas: las convierte
de *diez números de línea equivocados* en *diez punteros a un archivo inexistente*.
Un número equivocado es reparable por quien lea el archivo; un archivo ausente no lo
es. Y las citas viven en el repo del **otro hilo**, que aún no las ha reparado, así
que borrar aquí destruiría, desde fuera, la única referencia que ese hilo necesita
para repararlas.

**Qué se hizo, exactamente.** Se antepusieron **20 líneas** de cabecera al principio
de `context/aiw/roadmap_AIW_temp.md`. La cabecera declara: que el documento **ya no
es autoridad**; que el canónico es `aiw/roadmap/roadmap.json`; que las citas se
resuelven contra
`aiw/docs/docs_management/TABLA-DE-EQUIVALENCIA-DE-NUMERACION.md`; el
desplazamiento que introduce; y, en una línea, que **el borrado definitivo espera a
que se reparen las diez citas en el hilo de `aiw-console`**.

**El cuerpo NO se tocó**, y está probado:

- `git diff --numstat` = **`20  0`** — veinte inserciones, cero borrados.
- Comprobación byte a byte en la escritura: los últimos `len(original)` bytes del
  archivo nuevo son idénticos al original completo (`md5` del original
  `9f784c12c8ad034b8ac8dbc099e5d4ca`).

**Desplazamiento resultante — el dato que el otro hilo necesita:**

| | Antes | Después |
|---|---|---|
| Líneas del archivo | 208 | **228** |
| Línea real de una cita `RM-AIW:n` | `n + 8` | **`n + 28`** |
| Nota de puntero al canónico | 100-106 | **120-126** |

**No es mecanismo bajo `CONST §4`:** retirar un documento es papel (`D-055`).

---

## 6. El documento publicado, y su ruta justificada contra la convención

**Ruta:** `aiw/docs/docs_management/TABLA-DE-EQUIVALENCIA-DE-NUMERACION.md`.

**La convención SÍ cubre esta clase de documento.** No hay hueco que nombrar en la
asignación de clase ni de área. La derivación, regla por regla:

| Paso | Regla | Resultado |
|---|---|---|
| ¿Es documentación? | §1, las tres pruebas | **Sí → clase A**. Ver abajo. |
| ¿Dónde vive la clase A? | §3.1 | Bajo `docs/`. |
| ¿Qué área? | §3.1, regla de creación de áreas | `docs_management/`. Ver abajo. |
| Nombre y lengua | §5.1, §5.3 | `MAYUSCULA-KEBAB.md`, español. |
| Campos de índice | §4.2, fila `docs/docs_management/*.md` | `primary` · `docs_management` · `default_visible: true` · Indexado **Sí**. |

**La prueba que decide es la 1.c (mantenimiento).** La columna izquierda de la tabla
está congelada —el Markdown ya no se edita—, pero **la columna derecha es el
canónico vivo**: el día que un objetivo del árbol se renombre, se añada o cambie de
fases, el documento queda falso y alguien tiene la obligación de corregirlo. Eso es
exactamente lo que separa clase A de clase H: «un registro histórico no queda falso
cuando el sistema cambia» (§1). Éste sí. **No es historia, es clave de lectura
vigente.**

**Por qué `docs_management/` y no un área nueva.** §3.1 abre un área solo si va a
alojar más de un documento **o** si su audiencia difiere de la de toda área
existente. La audiencia aquí —quien escribe, cura o lee el corpus documental y
necesita resolver una cita a un documento retirado— es la de `docs_management`, no
la de `kernel`, ni la de `evidence` (que aloja el documento *sobre* el esquema de
evidencia), ni la de `operation`. Un área propia para un solo documento sería el
«por si acaso» que la regla prohíbe expresamente.

**Costura nombrada, sin enmienda.** Las clases de la convención son binarias sobre
la prueba 1.c y no prevén un documento **mitad congelado, mitad vivo**. No hace
falta enmendar nada: basta con que *cualquier* parte pueda quedar falsa para que
exista la obligación de mantenimiento. Se nombra en el propio documento (§6) para
que el siguiente caso mixto no tenga que redescubrirlo. **No se editó
`CONVENCION-DE-DOCUMENTACION.md`.**

---

## 7. `docs_index.json` — decisión y ejecución

**Decisión: SÍ entra al índice.** La regla lo dicta sin margen: la tabla de §4.2 de
la convención marca la fila `docs/docs_management/*.md` con **Indexado = Sí**, y la
`selection_rule` del propio índice dice «una entrada por archivo cuya clase está
marcada Indexado=Sí». Un documento de clase A en un área declarada no es un caso de
juicio. Tampoco lo bloquea la única exclusión del índice («el índice no se indexa a
sí mismo»), que no aplica.

**Ejecución, verificada:**

| | |
|---|---|
| Entradas antes (curadas por el `#19`) | **12** — medido, no heredado |
| Entradas después | **13** |
| Las 12 originales | **intactas**, probado por `md5` de cada entrada serializada contra `git show HEAD:docs/docs_index.json`, y en el mismo orden |
| Claves de nivel raíz (`selection_rule`, `nav_tier_model`, …) | **idénticas**, comparación exacta |
| `git diff --stat` | 6 inserciones, **0 borrados** |

Entrada añadida, con el mismo esquema que las 12 (`md5` `121055d551e792c31265f0a9b3fdfa9e`):

```json
{
  "path": "docs/docs_management/TABLA-DE-EQUIVALENCIA-DE-NUMERACION.md",
  "nav_tier": "primary",
  "ia_bucket": "docs_management",
  "default_visible": true
}
```

Se insertó inmediatamente después de la entrada de `CONVENCION-DE-DOCUMENTACION.md`
para conservar la agrupación por carpeta. La inserción se hizo a nivel de texto,
respetando los finales de línea `CRLF` del archivo, precisamente para **no**
reformatear los bloques compactos de `nav_tier_model` que una reserialización
habría reescrito. No hizo falta tocar `nav_tier_model.rules`: la regla
`^docs/docs_management/[^/]+\.md$` ya cubre la ruta nueva.

**Cifra heredada que no se sostiene, declarada bajo el criterio 11.** La §4.3 de la
convención afirma: «Aplicada hoy, esta convención produce **11 entradas** (3 de raíz
+ 2 incidentes + 6 records)». Esa cuenta **omite la convención misma**, que su
propia §6 clasifica como clase A indexada. El índice curado por el `#19` tiene 12
—3 raíz + **1 convención** + 2 incidentes + 6 records—, y es el índice el que tiene
razón. Por el mismo error, la proyección «cuando los cinco runs de documentación
hayan escrito lo suyo, **15**» debería ser **16**. **No se corrige la convención**
(fuera de alcance); se nombra para que el próximo run que cure el índice no ajuste
el dato bueno a la cuenta mala.

---

## 8. Fronteras de salida de los dos repos

### `aiw`

`git status --porcelain` al cerrar:

```
 M .project/guardrails.json
 M .project/no_claims.json
 M .project/roadmap.json
 M .project/snapshot.json
 M docs/docs_index.json          <-- este run (criterio 8)
 M roadmap/roadmap.json
?? .project/docs_index.json
?? .project/git_history.json
?? docs/docs_management/TABLA-DE-EQUIVALENCIA-DE-NUMERACION.md   <-- este run (archivo nuevo)
```

Respecto de la lista de apertura: **exactamente dos diferencias**, ambas de este
run —un archivo nuevo y `docs/docs_index.json` modificado—, que es lo que el
criterio 9 autoriza. `roadmap/roadmap.json` de `aiw` **no se editó**: su `M` viene
de la apertura.

### `aiw-console`

`git status --porcelain` al cerrar:

```
 M context/aiw/roadmap_AIW_temp.md                        <-- este run
?? context/aiw-console/records/RETIRO-MARKDOWN-AIW.md     <-- este run
```

**Exactamente dos archivos tocados por este run**, los dos nombrados en el encargo.

### 8.3 El otro hilo commiteó a mitad de este run — medido, no supuesto

`FRONTERA-CAPACIDAD-TECLADO-VIRTUAL-KATEX-CANTU.md` estaba `??` en la lista de
apertura y **ha desaparecido del status**: no porque este run lo tocara, sino
porque el hilo paralelo lo commiteó mientras esto se ejecutaba. Medido:

```
$ git log --oneline 0ac7854..HEAD
0826516 record: math: frontera de capacidad del teclado virtual (#10) y
        normalizacion de exponentialE e imaginaryI; run activo pendiente de QA humana

$ git diff --stat 0ac7854..HEAD
 ...ONTERA-CAPACIDAD-TECLADO-VIRTUAL-KATEX-CANTU.md | 449 +++++++++++++++++++++
 1 file changed, 449 insertions(+)
```

**Un commit, un archivo, y es el suyo.** Atribuido al hilo paralelo con prueba, no
marcado `[NO VERIFICADO]`.

**Consecuencia comprobada sobre las mediciones de este record:** ese commit **no
tocó `roadmap/roadmap.json`** (`git diff --stat 0ac7854..HEAD -- roadmap/roadmap.json`
sin salida), así que las diez citas de §4.2 siguen siendo válidas contra el HEAD
nuevo. Re-verificado tras el commit ajeno: **10 tokens `RM-AIW:`**, los mismos diez
números, y `git diff --numstat` del Markdown sigue siendo **`20  0`**.

**`aiw-console/roadmap/roadmap.json` intacto, probado:**

```
$ git diff --stat roadmap/roadmap.json
(sin salida)
```

Ni una coma. Sus derivados `.project/roadmap.json` y `.project/snapshot.json`
tampoco aparecen en el status: intactos también.

### Lo que este run NO hizo

No commiteó. No cambió el `status` de ningún run. No re-emitió `.project/`. No
levantó consola ni proyector. No corrió la suite. No escribió en `DECISIONES.md`.
No editó `CONVENCION-DE-DOCUMENTACION.md`, ni ningún `full_description`, ni ningún
record ajeno, ni ningún handoff. `cantu-studio` no se tocó en ningún byte. Git se
usó solo en lectura: `status`, `rev-parse`, `diff --stat`, `diff --numstat`,
`ls-files`, `log`, `show`.

---

## 9. Estado del run

**`RUN-AIW-MARKDOWN-RETIREMENT-001` debe quedar en `completed`.** Las dos cosas que
el run tenía que hacer están hechas: las tres piezas de nivel roadmap confirmadas
con su cita, y la tabla de equivalencia publicada como documento en `aiw`, con la
ruta derivada de la convención y la entrada de índice puesta. El retiro se ejecutó
superseder-no-borrar, con el desplazamiento medido y publicado.

**Este record no cambia el estado.** El cambio de `active` a `completed` en
`aiw/roadmap/roadmap.json` es acto del operador, fuera del alcance de este run.

**Queda abierto, y es de otro hilo:** la reparación de las diez citas `RM-AIW:` del
canónico de `aiw-console` (§4.2 es su insumo), y el borrado definitivo del Markdown,
que la cabecera de retiro condiciona a esa reparación.
