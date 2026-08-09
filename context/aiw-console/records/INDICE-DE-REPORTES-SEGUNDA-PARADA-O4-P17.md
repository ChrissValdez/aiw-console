# Record — Índice de reportes (`O4.P17`) — SEGUNDA PARADA: el pin está en OCHO sitios, no en cuatro

**Fecha:** 2026-08-09. **Proyecto:** `aiw-console`.
**Run:** `RUN-CONSOLE-REPORTS-INDEX-001` — «Reports index: the derived per-project index the
console reads», `O4 — Global Console` / `O4.P17`, `queue_order` 51, `status: active`.
**Desenlace:** **PARADA** por el criterio 10, primer gatillo — «PARA Y REPORTA si aparece un
QUINTO sitio». No apareció uno: aparecieron **cuatro más**, en **dos ficheros más**, uno de ellos
(`tests/projector-roadmap-tree.test.mjs`) no nombrado ni por el ticket ni por el record anterior.
**Cero ficheros de producción escritos. Cero pins tocados. Cero tests nuevos.** Este record es la
entrega, y trae además todo lo que el criterio 11 pedía declarar, ya medido.

El `run_id` se **derivó** del canónico `roadmap/roadmap.json` por `queue_order` 51 — nodo
`$.objectives[1].phases[17].runs[0]`, único con ese valor en el árbol. La guarda de título
**pasó**: igualdad exacta de cadena con
`Reports index: the derived per-project index the console reads`. La `full_description` enmendada
se leyó entera y manda sobre el ticket donde discrepan; no discrepan.

---

## 1. El record de la parada, leído primero y ADOPTADO — y las tres cosas suyas que no cuadran

Las mediciones de `INDICE-DE-REPORTES-PARADA-O4-P17.md` se adoptan sin rehacerlas: el eje del #50
(§1), la anatomía copiable de `docs_index` (§4), el barrido de sitios vivos (§5) y la base de la
suite (§6). Todas se comprobaron contra el disco de hoy y **sostienen**, salvo tres apuntes. Los
tres son de su §5 y §8, ninguno afecta a lo que este run adopta, y se declaran porque el criterio 1
lo pide.

### 1.a — Los md5 de su §8 ya no son los del disco, y eso está PREVISTO por el propio ticket

Los siete ficheros fuera de alcance tienen hoy otros md5 que los que el record dejó anotados:

| fichero | md5 en el record (§8) | md5 hoy |
|---|---|---|
| `roadmap/roadmap.json` | `fa286f97…` | `cb8cf720e46f80e18384d9a7f8d4c597` |
| `.project/docs_index.json` | `27d52278…` | `09212f1b4398f65973634db270925582` |
| `.project/git_history.json` | `c978fe38…` | `cf850d10422428f16fe4ed1e2f224ac1` |
| `.project/guardrails.json` | `64f71d9b…` | `557005cd98d18780e6576be88bd4d739` |
| `.project/no_claims.json` | `7ea243c2…` | `2e7841bd221304d0a622c0363a9d8e79` |
| `.project/roadmap.json` | `801251f2…` | `8a69243d522bc6b8b3a0a1de6eb79046` |
| `.project/snapshot.json` | `47102dd6…` | `3cb50eca3c163026984204cf0fddb29d` |

**No es una discrepancia con el disco: es la ENMIENDA.** El record se cerró antes de que la
`full_description` fuera enmendada, y el propio ticket declara que los siete cargan «la apertura de
éste **y su enmienda**, SIN COMMITEAR». Verificado:

- el texto `AMENDED 2026-08-09` y `FOUR executable places` está en `roadmap/roadmap.json`, en
  `.project/roadmap.json` y en `.project/snapshot.json`;
- los seis de `.project/` llevan `generated_at: 2026-08-09T17:32:00.208Z` — una re-emisión posterior
  al cierre del record, que cambia el md5 de los seis aunque cuatro de ellos no cambien de contenido
  sustantivo.

`numstat` contra HEAD reproduce el mismo cuadro que el record, con una sola casilla movida:

| fichero | numstat en el record | numstat hoy |
|---|---|---|
| `roadmap/roadmap.json` | 48/7 | **48/7** |
| `.project/roadmap.json` | 50/9 | **50/9** |
| `.project/snapshot.json` | 92/14 | **92/14** |
| `.project/git_history.json` | 16/5 | **16/5** |
| `.project/guardrails.json` | 1/1 | **1/1** |
| `.project/no_claims.json` | 1/1 | **1/1** |
| `.project/docs_index.json` | 1/1 | **13/1** |

La casilla movida está explicada y medida: `docs_index` creció 12 líneas porque **el record de la
parada entró en el corpus de documentación**. Está indexado en
`.project/docs_index.json` como `context/aiw-console/records/INDICE-DE-REPORTES-PARADA-O4-P17.md`,
`freshness 2026-08-09T17:28:25.766Z`, dentro de 194 documentos. El record se auto-indexó al
re-emitirse `.project/`.

**Los siete siguen en LF.** Comprobado byte a byte con lectura binaria: **cero secuencias CRLF** en
los siete (LF: 993 / 2381 / 2250 / 76 / 63 / 985 / 1446). *Apunte de método para quien repita la
comprobación:* `grep -c $'\r'` bajo Git Bash devuelve aquí el total de líneas y **no** sirve como
medida; hay que contar los bytes.

### 1.b — El `report.json` vivo pesa 19 428 bytes, no 19 150

El record anota «19 150 bytes» para
`projects/cantu-quizzes-latex/reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json`. Medido
hoy: **19 428 bytes**, md5 `db25c998dff27fb610f10ddef67fc154`, `mtime 2026-08-08T22:58:43.767Z`.
La `mtime` es **anterior** al record, así que el fichero no ha cambiado: la cifra del record era
una mala medición. Sus otras cifras del mismo barrido sí son exactas (`report.html` 39 446 B,
`_render.template.html` 20 033 B), y todo lo que este run necesita de ese fichero — `run_id`,
`emitted_at`, ausencia de `verdict.json` — está confirmado en §5.

### 1.c — HEAD se movió a mitad de este run, por una mano que no es la de este run

Al empezar, el working tree llevaba dos entradas ajenas a este trabajo:
`context/aiw-console/records/MEDICION-ALCANCE-COMPARACION-GUIADA-CANTU.md` (modificado, 134/7) y
`context/aiw/records/` (sin seguimiento). **Al terminar, la primera ha desaparecido del working
tree** porque un commit externo se la llevó (la segunda sigue sin seguimiento, intacta):

```
231a1512bb573e4a09ecd44fea099ca751a302c2  2026-08-09 11:46:58 -0600
record: Comparacion guiada a ancho completo y formula por paso (queue_order 40)
```

**No es de este run.** Este run no ejecutó ni un solo comando Git que escriba; es otra carril
trabajando en paralelo sobre el mismo checkout, exactamente el escenario que la doctrina de
`real-like-project.mjs` describe. Se declara porque cambia el `HEAD` contra el que se midió el
`numstat` de §1.a, y porque la cabina no debe atribuirlo aquí.

**Lo que importa para el alcance de este ticket: ese commit NO tocó los siete.** Verificado después
del commit — `roadmap/roadmap.json` y los seis de `.project/` siguen **modificados y sin
commitear**, con el mismo `numstat` (48/7, 13/1, 16/5, 1/1, 1/1, 50/9, 92/14) y los mismos md5 de
§1.a que al empezar.

---

## 2. EL GATILLO — el pin está en OCHO sitios ejecutables, no en cuatro

El ticket declara cuatro y los llama «LOS CUATRO SITIOS DEL PIN». **No son cuatro.** El record
anterior corrigió tres a cuatro leyendo ficheros; este run lo midió **ejecutando la suite entera
contra una copia aislada del repositorio con el séptimo artefacto ya implementado**, que es la
única forma de que el inventario sea exhaustivo en vez de tan bueno como el barrido que lo produjo.

### 2.1 Cómo se midió, para que sea reproducible

Copia byte a byte del repositorio en el scratchpad (17 MB, `.git` incluido), el séptimo artefacto
implementado allí y **sólo allí** (emisor + la séptima entrada de `PROJECT_EMIT_ARTIFACT_PATHS`),
y `node --test` sobre la copia. El repositorio real no recibió una sola escritura: los md5 de
`tools/projector/project.mjs`, `project-console/serve.mjs` y los cuatro ficheros de test implicados
son los mismos al empezar y al terminar.

```
base (repositorio real, intacto) : 556 tests · 555 pass · 1 fail
copia con el séptimo artefacto   : 556 tests · 547 pass · 7 fail · 2 skip
```

Los 2 `skip` son artefacto de la UBICACIÓN de la copia, no del cambio:
`roadmap-engine.test.mjs:93` y `:160` se saltan porque el proyecto hermano `../cantu-studio` no
existe junto al scratchpad. En el árbol real ambos corren y están en verde.

De los 7 fallos, 1 es el conocido de la base. **Los otros 6 son el mapa real del pin.**

### 2.2 Inventario COMPLETO, medido

| # | sitio | qué afirma | ¿en el ticket? | medido |
|---|---|---|---|---|
| 1 | `tests/emitted-artifacts-declaration.test.mjs:93` | `deepEqual` de 3 rutas, raíz mínima, emisión **viva** | sí (2.a) | **ROMPE** → 4 rutas |
| 2 | `tests/emitted-artifacts-declaration.test.mjs:149` | `equal(declared.length, 6)` sobre fixtures **congelados** | sí (2.b) | **NO rompe** — sigue en verde con siete artefactos vivos |
| 3 | `tests/serve-project-emit.test.mjs:523` | `equal(payload.artifacts, 6)`, raíz completa por HTTP | sí (2.c) | **ROMPE**: `7 !== 6` |
| 4 | `project-console/serve.mjs:135` | `PROJECT_EMIT_ARTIFACT_PATHS`, allowlist de la guarda | sí (2.d) | **ROMPE** sin la séptima entrada |
| **5** | **`tests/projector-roadmap-tree.test.mjs:233`** | `deepEqual` de **5 nombres** de artefacto, raíz mínima, emisión **viva** | **NO** | **ROMPE**: `+ reports_index` |
| **6** | **`tests/projector-roadmap-tree.test.mjs:316`** | `deepEqual` de **3 nombres**, raíz viva sin `governance/` | **NO** | **ROMPE**: `+ reports_index` |
| **7** | **`tests/serve-project-emit.test.mjs:236`** | `deepEqual` de **3 nombres**, emisión viva por HTTP del fixture pelado | **NO** | **ROMPE**: `+ reports_index` |
| **8** | **`tests/serve-project-emit.test.mjs:450`** | `/^3 artifacts · 12 runs$/` — el conteo **en pantalla** | **NO** | **ROMPE**: `4 artifacts · 12 runs` |

Y un noveno assert **latente**, que hoy no llega a ejecutarse porque el test aborta en el sitio 8:
`tests/serve-project-emit.test.mjs:454`, `/Re-emitted 3 artifacts from roadmap\/roadmap\.json/`.
Romperá en cuanto se repare el 8.

El sitio 5 tiene además **dos afirmaciones más** del mismo conjunto dentro del mismo test: el
**nombre** del test dice «lands exactly **five** files under `.project/`», y `:237-243` recorre una
lista literal de cinco rutas comprobando que existen. Ninguna de las dos falla hoy — la primera no
es ejecutable y la segunda sólo comprueba presencia, no exhaustividad — pero ambas **mienten** en
cuanto el conjunto sea siete.

### 2.3 Por qué son sitios del pin y no asserts cualesquiera

Por el mismo criterio con el que el record anterior admitió el cuarto: «un `deepEqual` sobre una
lista ordenada es exhaustivo por construcción … Es un pin». Los sitios 5, 6 y 7 son exactamente
eso — listas exhaustivas de NOMBRES sobre emisiones **vivas** — y son más fuertes que el conteo del
sitio 3, no más débiles. El sitio 8 es el mismo conjunto contado **en la superficie que ve el
operador**.

Y están donde estaba el cuarto: el 7 y el 8 viven **en el mismo fichero que el sitio c declarado**
(`serve-project-emit.test.mjs`), 287 y 73 líneas más arriba de su línea 523. El fallo de método que
el record anterior diagnosticó — «un vistazo al fichero declarado no lo encuentra» — se repitió en
el propio record.

### 2.4 Ninguno de los cuatro nuevos es un `6` → `7`, y por eso no me los invento

El criterio 2 dice que los cuatro declarados «NO son intercambiables» y da a cada uno su
tratamiento. Los cuatro nuevos tampoco lo son entre sí, y tres de ellos piden una decisión que no
está tomada en ninguna parte:

- **Sitio 5** — el conteo está en el **nombre del test** («exactly five files»). Renombrar un test
  es cambiar qué afirma, y hay además la lista literal de `:237-243`: son **tres** afirmaciones en
  un test, no una.
- **Sitio 6** — su sujeto es «una fuente de gobernanza que falta es fail-soft». Añadirle
  `reports_index` mete en un test sobre **omisión** el primer artefacto de la carpeta que **nunca
  se omite**. El test sigue siendo cierto, pero deja de leerse como lo que es.
- **Sitio 7** — su prosa (`:230-234`) no es un número, es una **doctrina**: «the route never claims
  six files just because six are possible». Con `reports_index` la doctrina necesita una frase que
  hoy no tiene, porque aparece la primera categoría nueva desde O4.P14: un artefacto **opcional por
  contrato pero incondicional en la emisión**, que no puede aparecer jamás en `skipped`. Para el
  fixture pelado el reparto pasa a ser 4 escritos / 3 saltados, y el `(La raíz real … emits six)`
  del final del comentario también queda obsoleto.
- **Sitio 8** — es texto **de interfaz**. Que la consola pase a decir «4 artifacts» donde decía «3»
  para un proyecto sin reportes es una decisión de producto, no de test.

### 2.5 La prosa obsoleta: el §2.4 del record anterior también estaba incompleto

A las seis entradas que localizó hay que sumar, medidas hoy:

| sitio | texto |
|---|---|
| `tests/serve-project-emit.test.mjs:25-26` | «six real artifacts», «the same six sources» |
| `tests/serve-project-emit.test.mjs:230-234` | la doctrina del sitio 7 |
| `tests/serve-project-emit.test.mjs:521-522` | «all six sources … writes all SIX artifacts» |
| `tests/projector-roadmap-tree.test.mjs:227` | «lands exactly five files» (el nombre del test) |
| `project-console/serve.mjs:727` | «the same six temp names» |
| `project-console/serve.mjs:770` | «THE BOUNDARY GUARD, on all six destinations» |
| `project-console/serve.mjs:821` | «rather than claiming six files every time» |
| `project-console/assets/project-console.js:45` | «extended to all six» |
| `project-console/assets/project-console.js:5246` | «while this emitter declares six» |

Total de prosa a poner al día: **15 sitios**, no 6.

---

## 3. Lo que este run SÍ dejó verificado — y no hay que volver a medir

### 3.1 El criterio 3 tenía razón, y ahora está PROBADO, no deducido

El record anterior **razonó** que el pin b mide fixtures congelados. Este run lo ha **medido**: con
el séptimo artefacto vivo y la suite entera corriendo, `emitted-artifacts-declaration.test.mjs:149`
**siguió en verde**. Un pin que no se entera de que el conjunto vivo creció de seis a siete es un
pin que no cubre el conjunto vivo.

**El sitio b nunca cubrió lo que se creía.** Desde el 2026-07-30 mide dos ficheros que nada
regenera. La garantía que el ticket le atribuía no existió nunca, y la aserción viva nueva del
criterio 3 no la restituye: **la crea por primera vez**.

Su cifra, medida: una emisión viva sobre raíz completa declara **7** artefactos
(`serve-project-emit.test.mjs:523` devolvió `actual: 7`). Es el número que debe fijar la aserción
nueva.

### 3.2 Criterio 4 — `COPIED` es lo que el criterio dice

`tests/helpers/real-like-project.mjs:32` copia `["roadmap", "governance", "docs", "README.md",
"package.json", ".git"]` desde `REPO_ROOT`, que es **este** repositorio
(`resolve(HERE, "..", "..")` = `projects/aiw-console`). Y este repositorio **no tiene `reports/`**:
`ls -d reports` → no existe. Añadir `reports` a `COPIED` copiaría una carpeta ausente y no poblaría
nada. **El criterio 4 es correcto: el caso poblado necesita fixture propio.** No hay nada que
reportar por esa vía.

### 3.3 Criterio 8 — los dos hechos siguen siendo ciertos

Barrido de **todo** el workspace, no sólo del proyecto que el ticket nombra:

```
find . -path "*/reports/*/report.json"  →  1 resultado
    ./projects/cantu-quizzes-latex/reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json
find . -name "verdict.json"             →  0 resultados
```

**Un solo `report.json` en todo el workspace y ningún `verdict.json` en ninguna parte.** Ambos
hechos confirmados hoy. La rama «veredicto presente» sigue sin caso vivo y sólo puede cubrirse con
fixture.

### 3.4 Criterio 9 — la base

| | tests | pass | fail | skip |
|---|---|---|---|---|
| base de hoy, árbol real intacto | **556** | **555** | **1** | 0 |

**La base 556/555/1 es correcta**, verificada ejecutando `node --test` antes de tocar nada. El único
fallo es el pin conocido `tests/classification-care-budget.test.mjs:153` — «C.3: absent is VALID and
is today's state», `AssertionError: this repo declares no care budget, and that is valid`. No se
repara y no es gatillo. **Cero fallos nuevos en el árbol real**, porque no se cambió ni una línea
de producción.

---

## 4. La forma del criterio 5, IMPLEMENTADA Y MEDIDA (y los dos índices del criterio 11)

La anatomía que el record anterior localizó se siguió al pie de la letra —
`projectFileEnvelope`, `resolveInsideProject`, `repoRelative`, un `reports_source` con la misma
forma que `docs_source`, y `[]` declarado en vez de artefacto ausente. Se implementó en la copia
aislada y **se ejecutó contra los dos casos reales**. Esto es lo que el criterio 11 pedía declarar;
va aquí ya medido para que la reanudación no tenga que volver a producirlo.

### 4.1 El índice íntegro de `cantu-quizzes-latex` (caso poblado, lectura pura)

```json
{
  "schema_version": 1,
  "project_id": "cantu_quizzes_latex",
  "generated_at": "2026-08-09T00:00:00.000Z",
  "generated_from": "aiw-projector@0.12.0",
  "sources": [
    { "path": "reports", "mtime": "2026-08-08T22:58:43.757Z" },
    { "path": "reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json",
      "mtime": "2026-08-08T22:58:43.767Z" }
  ],
  "reports_source": {
    "mode": "scanned",
    "reports_dir": "reports",
    "directory_present": true,
    "run_directories": 1,
    "indexed": 1,
    "unreadable": 0,
    "selection": "every immediate subdirectory of reports/ that holds a report.json, by folder name, sorted",
    "field_rules": {
      "run_id": "the name of the folder the report was filed under (reports/<run_id>/), never a field read from inside the report",
      "report_path": "reports/<run_id>/report.json, repo-relative and POSIX",
      "emitted_at": "the report's own `emitted_at`, verbatim, when it carries one; OMITTED when it does not — no mtime is substituted",
      "verdict_present": "whether verdict.json exists beside report.json, measured on disk; the file is never opened",
      "read_error": "present ONLY when report.json could not be parsed; the entry stays, annotated"
    },
    "validation_policy": "This index does not validate a report against the report contract.",
    "unresolved_policy": "A directory under reports/ with no report.json, and any loose file directly under reports/, produce no entry and are listed in `unresolved`.",
    "unresolved": []
  },
  "reports": [
    {
      "run_id": "RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001",
      "report_path": "reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json",
      "emitted_at": "2026-08-08T22:40:00Z",
      "verdict_present": false
    }
  ]
}
```

`report.html` y `_render.template.html` viven **dentro** de la carpeta del run, no sueltos bajo
`reports/`, así que `unresolved` está legítimamente vacío.

### 4.2 El vacío de otra raíz (`aiw-console`, sin carpeta `reports/`)

Idéntico envelope y `reports_source`, con:

```json
  "sources": [],
  "reports_source": { …, "directory_present": false, "run_directories": 0, "indexed": 0, "unreadable": 0, "unresolved": [] },
  "reports": []
```

**El artefacto se emite igual.** Ausencia declarada, nunca omisión — el criterio 6 cumplido por
construcción, porque el emisor no devuelve `null` nunca y `write` sólo salta los nulos.

### 4.3 Cómo quedan resueltos los criterios 6 y 7 en esa forma

- **Sin `reports/`**: `reports: []`, `directory_present: false`. Emitido y declarado.
- **`report.json` que no parsea**: la entrada **entra igual**, con `run_id`, `report_path`,
  `verdict_present` y un `read_error`; sin `emitted_at`, que no se puede leer. Nunca se omite.
- **Carpeta bajo `reports/` sin `report.json`, o fichero suelto bajo `reports/`**: no produce
  entrada — no es un reporte — pero **se declara** en `reports_source.unresolved` con su motivo,
  siguiendo el precedente exacto de `docs_source.unresolved`.
- **`run_id` se toma del NOMBRE DE LA CARPETA**, nunca de un campo dentro del fichero. Es lo que
  pide el criterio 5 (`reports/<run_id>/`) y es lo único que sobrevive a un `report.json` ilegible.
- **Criterio 7 respetado**: el único juicio que se emite sobre un `report.json` es si **parsea**, que
  es un hecho sobre leer el fichero, no sobre su contenido. No se compara nada contra el contrato de
  reportes, y `validation_policy` lo dice dentro del propio artefacto.
- **`emitted_at`** viaja **verbatim** del reporte, y se **omite** cuando el reporte no lo trae: la
  `mtime` del disco no se sustituye por él, porque es un hecho sobre el disco y no sobre la emisión.
  La `mtime` no se pierde: `sources` la registra (§6).

---

## 5. Qué haría falta para reanudar

Los cuatro tratamientos del criterio 2 siguen siendo correctos y **no hay que revisarlos**. Lo que
falta son **cuatro decisiones más**, una por sitio nuevo, todas del operador por la misma razón que
las tres anteriores: cambian el mapa que el ticket declaró.

1. **Sitio 5** (`projector-roadmap-tree.test.mjs:227/233/237-243`) — añadir `reports_index` al
   `deepEqual`, **renombrar el test** («five» → «six»), y añadir la ruta a la lista literal.
2. **Sitio 6** (`:316`) — añadir `reports_index` al `deepEqual`, y decidir si el test sobre
   fail-soft dice algo sobre el artefacto que nunca se salta.
3. **Sitio 7** (`serve-project-emit.test.mjs:236` + prosa `:230-234`) — la lista pasa a cuatro,
   `skipped` se queda en tres, y la doctrina del comentario necesita la frase que hoy no tiene.
4. **Sitio 8** (`:450`, y el latente `:454`) — `3 artifacts` → `4 artifacts` en la superficie del
   operador.

Con esas cuatro, más las tres ya tomadas, procede todo lo demás sin obstáculo medido: los sitios
1/3/4 como el ticket dice, la aserción viva nueva fijando **7**, el emisor de §4 (ya escrito y
probado en la copia), los tests de los criterios 6 y 7 con fixture propio, y los **15** sitios de
prosa de §2.5.

**Estimación medida, no supuesta:** con esas decisiones, los 6 fallos nuevos de §2.1 se cierran y la
suite vuelve a 555 pass / 1 fail, más los tests nuevos.

---

## 6. Alcance: qué se tocó y qué se verificó intacto

**Escrito: UN fichero, este record.**

- `context/aiw-console/records/INDICE-DE-REPORTES-SEGUNDA-PARADA-O4-P17.md`

**No escrito, por la parada:** el emisor del índice en el árbol real, los ocho sitios del pin, los
quince de prosa, la aserción viva nueva y los tests nuevos.

**Escrito FUERA del repositorio, y desechable:** la copia de medición, en el scratchpad de la
sesión (`…/scratchpad/probe/`), con el emisor implementado. No es entregable; existe para que el
inventario de §2.2 sea medido en vez de barrido, y puede borrarse.

**Verificado intacto al terminar:**

- Los ficheros que este run habría tocado, **mismo md5 al empezar y al terminar**:
  `tools/projector/project.mjs` `afec9669cb0b5bcd0702bc6ede485deb`,
  `project-console/serve.mjs` `7cda2e391454157ef03b88609848349f`,
  `tests/emitted-artifacts-declaration.test.mjs` `03a6b84c89679f9fcbd70a0ccf132889`,
  `tests/serve-project-emit.test.mjs` `05ceeb5d3310bca3b0970079f09fe4a3`,
  `tests/projector-roadmap-tree.test.mjs` `210336aa405791780688c00f122c9752`,
  `tests/helpers/real-like-project.mjs` `3d1eb87b7084efe7598dbf013dfabaeb`.
- `roadmap/roadmap.json` y los seis de `.project/` — **no tocados**, md5 de §1.a al empezar y al
  terminar, **los siete en LF, cero CRLF**.
- **Los otros repositorios se LEYERON y no se escribieron.** La única lectura fuera de
  `aiw-console` fue el barrido de `reports/` y el `report.json` de `cantu-quizzes-latex`; ese run
  conserva sus tres ficheros con la misma `mtime` de antes, y `cantu-quizzes-latex/.project/` sigue
  con sus cuatro artefactos, sin `reports_index.json`.
- **Ningún comando Git que escriba.** Sólo `git --no-optional-locks diff HEAD --numstat`,
  `git --no-optional-locks status --porcelain` y `git --no-optional-locks log -1`, los tres de
  lectura. No queda ningún `.git/index.lock`. El commit `231a1512` de §1.c es de otro carril.
- No se cambió el `status` del run, no se re-emitió `.project/`, no se tocó `roadmap/roadmap.json`,
  y el record de la parada anterior **se leyó y no se reescribió**.
