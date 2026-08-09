# Record — Índice de reportes (`O4.P17`) — RESOLUCIÓN: el séptimo artefacto, implementado

**Fecha:** 2026-08-09. **Proyecto:** `aiw-console`.
**Run:** `RUN-CONSOLE-REPORTS-INDEX-001` — «Reports index: the derived per-project index the
console reads», `O4 — Global Console` / `O4.P17`, `queue_order` 51, `status: active`.
**Desenlace:** **HECHO**. Ninguna condición de parada del criterio 10 se activó. El séptimo
artefacto `.project/reports_index.json` está vivo en el árbol real, los ocho sitios del pin
tratados uno a uno, dieciséis sitios de prosa al día, doce tests nuevos, y la suite en
**568 · 567 pass · 1 fail** — el fallo conocido que no se repara.

El `run_id` se **derivó** del canónico por `queue_order` 51 — nodo
`$.objectives[1].phases[17].runs[0]`, único con ese valor. La guarda de título **pasó**: igualdad
exacta de cadena. La `full_description` enmendada dos veces se leyó entera antes de escribir nada.

Los dos records de parada se leyeron y **no se reescribieron**. Sus mediciones se adoptan; las
tres cosas suyas que este run midió distinto están en §2.3 y §5.

---

## 1. EL INVENTARIO LO PRODUJO LA SUITE, y sale exactamente igual que la segunda parada

El método del criterio 1, repetido de cero y no heredado: copia byte a byte del repositorio en el
scratchpad (17 MB, `.git` incluido), el séptimo artefacto implementado **allí primero**, y
`node --test` sobre la copia entera.

```
copia con el séptimo artefacto : 556 tests · 547 pass · 7 fail · 2 skip
```

Cifra por cifra la de la segunda parada. Los 2 `skip` son de la UBICACIÓN de la copia
(`roadmap-engine.test.mjs:93` y `:160` necesitan `../cantu-studio`); el árbol real cerró con
**0 skip**, lo que confirma ese diagnóstico. De los 7 fallos, 1 es el conocido de la base.
**Los otros 6 son el inventario**, y no hubo un séptimo escondido: el barrido no lo produjo, lo
produjo la ejecución.

| # | sitio (línea original) | qué afirma | lo reportó la suite |
|---|---|---|---|
| 1 | `emitted-artifacts-declaration.test.mjs:93` | `deepEqual` de 3 rutas, raíz mínima, emisión viva | **sí** |
| 2 | `emitted-artifacts-declaration.test.mjs:149` | `equal(declared.length, 6)`, fixtures congelados | **no — siguió VERDE** |
| 3 | `serve-project-emit.test.mjs:523` | `equal(payload.artifacts, 6)`, raíz completa por HTTP | **sí** (`7 !== 6`) |
| 4 | `project-console/serve.mjs:135` | `PROJECT_EMIT_ARTIFACT_PATHS`, allowlist de la guarda | **no** — y eso es un hallazgo, §2.3 |
| 5 | `projector-roadmap-tree.test.mjs:233` | `deepEqual` de 5 nombres, raíz mínima | **sí** |
| 6 | `projector-roadmap-tree.test.mjs:316` | `deepEqual` de 3 nombres, raíz sin `governance/` | **sí** |
| 7 | `serve-project-emit.test.mjs:236` | `deepEqual` de 3 nombres, fixture pelado por HTTP | **sí** |
| 8 | `serve-project-emit.test.mjs:450` | `/^3 artifacts · 12 runs$/`, el conteo **en pantalla** | **sí** |

El assert latente de `:454` (`Re-emitted 3 artifacts…`) apareció al reparar el 8, como estaba
previsto, y se trató con él.

---

## 2. TRATAMIENTO DE CADA FALLO, uno por uno

Ninguno se convirtió en un `6` → `7`. Sólo **uno** de los ocho lo era.

### 2.1 Sitio 1 — `emitted-artifacts-declaration.test.mjs:93` → hoy `:96-107`

**Clase:** lista exhaustiva de RUTAS sobre una emisión viva de raíz mínima.
**Hecho:** añadida `.project/reports_index.json`; la lista pasa de 3 a 4 rutas.

Y el comentario cambió, porque el conjunto ya no es homogéneo: las otras tres están porque esa
raíz tiene la fuente de la que cada una deriva; la cuarta está **porque es incondicional** — la
raíz no tiene `reports/` en absoluto y lo que aterrizó es un índice vacío declarado. Un `4` sin
esa frase habría dejado el test contando bien y explicando mal.

### 2.2 Sitio 2 — `:149` → hoy `:168`. **SE QUEDA EN SEIS**

**Clase:** pin sobre datos históricos, no sobre el conjunto vivo.
**Hecho:** el `6` no se toca. Se le añadió el motivo **en el propio test** (criterio 3), en dos
partes: que mide dos `.project/` congelados el **2026-07-30** que nada regenera, de modo que
subirlo a siete afirmaría que una emisión de julio escribió un fichero que en julio no existía; y
que **con siete artefactos vivos esta línea siguió verde**, medido en la copia de §1 — un pin
sobre datos congelados no puede enterarse de que el conjunto vivo creció, así que nunca lo
guardó. El comentario remite al test nuevo de §3.

### 2.3 Sitio 4 — `serve.mjs:135` → hoy `:145-151`. **La segunda parada se equivocó aquí**

**Clase:** allowlist de destinos que la guarda de frontera comprueba antes del emisor.
**Hecho:** séptima entrada añadida, comentario al día, **y un test nuevo que ata la lista a la
emisión real**.

El segundo record dice: «**ROMPE** sin la séptima entrada — la guarda **rechaza la escritura**».
**Medido, y no es así.** Quitada sólo esa entrada en la copia y ejecutado
`serve-project-emit.test.mjs`, fallan los mismos tres tests con los mismos errores: el fichero
**se escribe igual**, porque el emisor lleva su propia `resolveInsideProject`. Lo que se pierde no
es la escritura sino la **comprobación previa**: el destino deja de estar pre-verificado y la
frase «THE BOUNDARY GUARD, on all … destinations» se vuelve falsa **sin que ningún test se ponga
en rojo**. Un hueco, no un rechazo.

Por eso este sitio no se despacha con la entrada nueva. Se añadió
`tests/projector-reports-index.test.mjs` → «the boundary guard's destination list covers exactly
what an emission can write», que compara la lista contra lo que `writeProjectFolder` escribe de
verdad, **no contra un número**. El octavo artefacto romperá esa línea el día que se añada a un
lado y no al otro.

### 2.4 Sitio 5 — `projector-roadmap-tree.test.mjs:233` → hoy `:228-247`. **Tres afirmaciones, no una**

**Clase:** lista exhaustiva de NOMBRES + el conteo en el **nombre del test** + una lista literal
de rutas.
**Hecho, las tres:** `reports_index` en el `deepEqual`; el nombre del test **renombrado**
«lands exactly **five** files» → «lands exactly **six** files»; y
`PROJECT_REPORTS_INDEX_RELATIVE_PATH` añadida a la lista literal de rutas que comprueba presencia.
Comentario nuevo que explica por qué seis y no siete para esa raíz (no es árbol Git, `git_history`
se salta) y por qué `reports_index` está sin haber `reports/`.

Renombrar es cambiar lo que un test afirma, y el criterio 10 lo pone de mi lado: decidido, hecho,
declarado.

### 2.5 Sitio 6 — `:316` → hoy `:321-328`. **Una doctrina que había que distinguir, no ampliar**

**Clase:** lista exhaustiva en un test cuyo sujeto es «una fuente de gobernanza que falta es
fail-soft» — es decir, un test sobre **omisión**, al que entra el primer artefacto que **nunca se
omite**.

**Hecho:** `reports_index` en el `deepEqual`, un `assert` de que la raíz no tiene `reports/`, y un
comentario que convierte el choque en lo que el test ahora enseña mejor que antes: una fuente de
gobernanza ausente da un **fichero ausente** (§18); un `reports/` ausente da un fichero que dice
«ninguno» (§20). Las dos ausencias no tienen la misma forma, y esta lista es donde se ven juntas.

**No es gatillo del criterio 10:** la afirmación fail-soft del test sigue siendo cierta palabra por
palabra. Lo que le faltaba era una distinción, no una corrección.

### 2.6 Sitio 7 — `serve-project-emit.test.mjs:236` → hoy `:230-245`. **La doctrina en prosa**

**Clase:** lista exhaustiva por HTTP **más** la doctrina de `:230-234`, que no es un número:
«the route never claims six files just because six are possible».

**Hecho:** la lista pasa a cuatro, `skipped` **se queda en tres**, y se añadió un assert de que
`reports_index` no puede aparecer en `skipped`. La doctrina se reescribió para nombrar la
categoría nueva, que es lo que de verdad apareció aquí: un artefacto **opcional por contrato e
incondicional en la emisión**. Todos los demás opcionales se escriben si su fuente existe y se
saltan si no; éste se escribe igual, porque su sujeto es qué contiene `reports/` y «nada» es una
respuesta que puede dar. De ahí que el reparto sea 4 escritos / 3 saltados y no el 3/4 que
esperaría quien cuenta fuentes.

**Comprobado contra el criterio 10, tercer gatillo:** el séptimo artefacto **no** hace que algo que
hoy nunca se salta pueda saltarse. Va en la dirección contraria — añade un artefacto que nunca se
salta a una lista de la que otros sí se saltan.

### 2.7 Sitio 8 — `:450` y el latente `:454` → hoy `:459-468`. **Texto de interfaz**

**Clase:** el conteo que el operador lee en pantalla.
**Hecho:** `3 artifacts` → `4 artifacts` en la superficie y en el `title` del elemento, con la
razón escrita al lado.

**Por qué no es una decisión de producto que haya que subir al operador:** el contrato del botón es
*reportar lo que se escribió*. La emisión escribe hoy un fichero más en ese fixture; decir «4» es
la misma promesa sobre un hecho distinto, y decir «3» sería el cambio de conducta.

### 2.8 Sitio 3 — `:523` → hoy `:534-540`. **El único `6` → `7` de los ocho**

**Clase:** conteo sobre una emisión real completa por HTTP.
**Hecho:** `6` → `7`, con la prosa de `:521-522` reescrita para que «siete artefactos desde seis
fuentes» no se lea como una errata: `reports_index` deriva de un `reports/` que la copia no
lleva, y se emite igual.

---

## 3. LA ASERCIÓN VIVA NUEVA — la cifra es **7**

`tests/emitted-artifacts-declaration.test.mjs:189` — «a LIVE full emission declares SEVEN
artifacts, and every one of them is on disk».

**Crea la garantía, no la restituye.** El pin de `:168` cuenta julio sobre un conjunto que no puede
crecer, así que nada en la suite afirmaba nunca el tamaño del conjunto que una emisión escribe
**hoy**. El hueco fue invisible exactamente mientras los dos números coincidieron.

Lo que hace: **emite** sobre una copia desechable de este repositorio — el único fixture que lleva
todas las fuentes de una emisión completa — y luego lee la declaración **del fichero que esa
emisión escribió**:

- `assert.equal(declared.length, 7)`;
- los **nombres**, no sólo el tamaño: `docs_index, git_history, guardrails, no_claims,
  reports_index, roadmap, snapshot`;
- cada uno resuelve en disco;
- y `reports_index` está **con la raíz sin `reports/`**, que es la parte que ningún conteo previo
  podía afirmar.

El día del octavo artefacto esta línea se pone roja y la de `:168` no. Esa asimetría es la razón
de tener las dos.

---

## 4. LOS DOS ÍNDICES — traídos al repositorio real y verificados

El emisor de §4 del segundo record **no se rediseñó**. Se aplicó al árbol real con el mismo texto
de parche que se aplicó a la copia (md5 idénticos en `tools/projector/project.mjs` y
`project-console/serve.mjs` entre copia y árbol real tras el parche), y se volvió a ejecutar en
**lectura pura** contra los dos casos medidos. **Sigue dando lo mismo.**

### 4.1 `cantu-quizzes-latex` — caso poblado, LECTURA, sin escribir en ese repositorio

Reproduce §4.1 del segundo record campo por campo:

```json
{
  "schema_version": 1,
  "project_id": "cantu_quizzes_latex",
  "generated_from": "aiw-projector@0.12.0",
  "sources": [
    { "path": "reports", "mtime": "2026-08-08T22:58:43.757Z" },
    { "path": "reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json",
      "mtime": "2026-08-08T22:58:43.767Z" }
  ],
  "reports_source": {
    "mode": "scanned", "reports_dir": "reports", "directory_present": true,
    "run_directories": 1, "indexed": 1, "unreadable": 0, "unresolved": []
  },
  "reports": [
    { "run_id": "RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001",
      "report_path": "reports/RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001/report.json",
      "emitted_at": "2026-08-08T22:40:00Z",
      "verdict_present": false }
  ]
}
```

`report.html` y `_render.template.html` viven **dentro** de la carpeta del run, así que
`unresolved` está legítimamente vacío. **Ese repositorio no recibió ni una escritura:** su
`.project/` sigue con sus cuatro artefactos y sin `reports_index.json`, y los tres ficheros del
run conservan tamaño y `mtime` (`report.json` 19 428 B).

### 4.2 `aiw-console` — el vacío

Mismo envelope y mismo `reports_source`, con `sources: []`, `directory_present: false`,
`run_directories: 0`, `indexed: 0`, `reports: []`. **El artefacto se emitiría igual.** Ausencia
declarada, nunca omisión.

### 4.3 Criterios 7 y 8, cubiertos por tests propios

`tests/projector-reports-index.test.mjs`, **11 tests**, con fixtures propios porque `reports/`
**no entra en `COPIED`** (criterio 8: este repositorio no tiene `reports/`, copiarlo copiaría nada):

- sin `reports/` → índice emitido, `reports: []`, `directory_present: false`, y **declarado** por
  el snapshot como cualquier otro artefacto;
- `report.json` que **no parsea** → la entrada **entra**, con `read_error` y sin `emitted_at`;
  `unreadable: 1`, y el vecino sano intacto. Nunca se omite;
- `emitted_at` **verbatim**, y **omitido** cuando el reporte no lo trae — ninguna `mtime`
  sustituida; la `mtime` sigue en `sources`;
- `run_id` del **nombre de la carpeta**, probado con un reporte que declara otro dentro;
- carpeta sin `report.json` y fichero suelto bajo `reports/` → sin entrada, **declarados** en
  `unresolved` con su motivo;
- **sin validación contra el contrato**: un `report.json` que parsea y es un disparate se indexa
  igual, y `validation_policy` lo dice dentro del artefacto;
- orden por nombre de carpeta, rutas POSIX, `verdict_present` medido en disco sin abrir el fichero;
- reemisión **byte-idéntica** con el mismo reloj, sin `.tmp`;
- y el test de la allowlist de §2.3.

---

## 5. LA PROSA — **dieciséis** sitios tocados, no quince

Los quince del segundo record, más uno que este run encontró leyendo. El criterio 5 pide declarar
cuántos fueron de verdad.

| # | sitio | qué se hizo |
|---|---|---|
| 1 | `serve.mjs:26` | «ALL SIX artifacts» → «ALL SEVEN» |
| 2 | `serve.mjs:129-135` | «THE SIX ARTIFACTS» → «THE SEVEN»; «between five and six files» → «between four and seven»; **más** el párrafo del hueco medido en §2.3 y la nota de que `reports_index` nunca aparece en `skipped` |
| 3 | `serve.mjs:727` | «the same six temp names» → «seven» |
| 4 | `serve.mjs:731` | «ALL SIX artifacts» → «ALL SEVEN» |
| 5 | `serve.mjs:770` | «on all six destinations» → «on all seven» |
| 6 | `serve.mjs:821` | «claiming six files every time» → «seven» |
| 7 | `serve-project-emit.test.mjs:25` | «the six real artifacts under `.project/`» → «the real artifacts» |
| 8 | `serve-project-emit.test.mjs:230-234` | la doctrina reescrita (§2.6) |
| 9 | `serve-project-emit.test.mjs:321` | nombre del test: «the six artifacts pass» → «**every declared artifact** passes» |
| 10 | `serve-project-emit.test.mjs:521-522` | «writes all SIX artifacts» → «SEVEN», con la explicación de siete-desde-seis-fuentes |
| 11 | `projector-roadmap-tree.test.mjs:227` | nombre del test: «five files» → «six files» (§2.4) |
| 12 | `real-like-project.mjs:5,10,19-20` | cabecera al día + bloque nuevo «SEVEN ARTIFACTS FROM SIX SOURCES», y por qué el caso poblado necesita fixture propio |
| 13 | `build-registry-digest.mjs:9-15` | el razonamiento del #50, reescrito (§6) |
| 14 | `project-console.js:45` | «extended to all six» → «all seven» |
| 15 | `project-console.js:5245-5255` | **no** era un 6 → 7 (§5.a) |
| **16** | **`emitted-artifacts-declaration.test.mjs:147`** | **el que faltaba en la lista de quince** |

**El 16** decía «a project that stops keeping governance files emits **five**» — una hipótesis
sobre una lectura viva, que con siete artefactos pasaba a ser seis. Quedó **sin número**: «emits
one fewer». No lo señaló la suite (no es ejecutable) ni ninguno de los dos records. El criterio 10
dice que un sitio nuevo es el trabajo, no una parada: se arregló y se declara.

### 5.a Un sitio donde el `6` → `7` habría sido FALSO

`project-console.js:5245`: «the renderer fetches the fifteen legacy routes while this emitter
declares **six**. **The nine** that were never promised…». Quince menos seis son nueve, y ahí está
la fuerza de la frase. Cambiar «six» por «seven» habría dejado el «nine» sin aritmética.

Medido: el renderer **no** pide `reports_index.json` — este run indexa y **no añade superficie de
consola**, como manda la `full_description`. Así que el seis de esa frase no era «lo que el emisor
escribe» sino «cuántas de las quince rutas pedidas tienen emisor detrás», y **sigue siendo seis**.
Quedó dicho así, con un párrafo que separa las dos cifras para que el próximo lector no repita el
cambio automático.

### 5.b Un sitio de la lista de quince que sólo estaba obsoleto a medias

`serve-project-emit.test.mjs:25-26`. La línea 25 («the six real artifacts») sí mentía y se
corrigió. La 26 («carrying the same six **sources**») **es cierta y se deja**: `COPIED` sigue
teniendo seis entradas. Es la distinción de §2.8 vista desde el otro lado — fuentes y artefactos
dejaron de ser el mismo número, y ése es justo el hecho nuevo.

### 5.c Dos nombres de test: uno con número, otro sin

`projector-roadmap-tree.test.mjs:227` se renombró **a «six»** porque su cuerpo comprueba una lista
literal de esa longitud: el número describe el test. `serve-project-emit.test.mjs:321` se renombró
**sin número** («every declared artifact passes») porque su cuerpo **itera la constante**: un
número ahí no describe nada y sólo vuelve a caducar en el octavo artefacto. Decisión mía, criterio
10, declarada.

---

## 6. El precedente del #50, dicho por escrito como el ticket exige

`build-registry-digest.mjs` justificaba no ser el séptimo fichero de `.project/` con dos razones
mezcladas: que es **transversal**, y que rompería «los pins que cuentan esos seis». La segunda se
ha leído desde entonces como si el número fuera la objeción.

**No lo era, y O4.P17 lo resuelve en la otra dirección.** Un índice de reportes es **por
proyecto** — `reports/` es una carpeta de ese repositorio —, así que el eje encaja y es el séptimo
artefacto con todas las de la ley. Lo que sigue descartando al digest es que habla de **todos** los
proyectos, y eso no tiene nada que ver con cuántos ficheros haya a su lado. El comentario ahora lo
dice así: **el argumento es el eje, nunca el conteo**. Este run no hereda ninguna de las dos
conclusiones del #50; adopta la medición y escribe la razón.

---

## 7. Suite al cerrar

| | tests | pass | fail | skip |
|---|---|---|---|---|
| base de los records | 556 | 555 | 1 | 0 |
| copia con el séptimo artefacto, sin reparar | 556 | 547 | 7 | 2 |
| **árbol real al cerrar** | **568** | **567** | **1** | **0** |

**Es exactamente la estimación medida del criterio 9**: 555 pass + **12 tests nuevos** = 567, y
556 + 12 = 568. Los doce nuevos son los 11 de `projector-reports-index.test.mjs` y la aserción
viva de §3.

El único fallo es el pin conocido `tests/classification-care-budget.test.mjs:153` — «C.3: absent is
VALID and is today's state». **No se repara y no es gatillo**, como dice el criterio 9. **Cero
fallos nuevos.**

---

## 8. Por qué NO se paró — criterio 10, gatillo por gatillo

La condición de parada de este ticket ya no es que aparezca un sitio nuevo. Es que una decisión
cambie **lo que el sistema promete**. Los tres gatillos, comprobados:

- **¿Actualizar algún sitio exigió debilitar una garantía?** No. La única garantía que se movió se
  movió **hacia arriba**: el hueco de la allowlist (§2.3), que no estaba guardado por nada, ahora
  lo está por un test atado a la emisión real. El pin congelado se queda en seis y gana su motivo
  por escrito.
- **¿Alguna doctrina en prosa de un test dejó de ser cierta al cambiarla?** No. La del sitio 6
  (fail-soft) sigue siendo cierta palabra por palabra y ganó una distinción; la del sitio 7 seguía
  siendo cierta y le faltaba nombrar una categoría, que es redacción — y la redacción es mía.
- **¿El séptimo artefacto obliga a que algo que hoy nunca se salta pueda saltarse?** No. Va en la
  dirección contraria: añade a la lista un artefacto que **nunca** se salta.

Lo que sí cambió respecto de lo que los records dejaron escrito está declarado, no escondido: la
allowlist no rechaza escrituras (§2.3), la prosa eran dieciséis sitios y no quince (§5), y uno de
los quince no admitía el cambio que parecía (§5.a).

---

## 9. Alcance: qué se tocó y qué se verificó intacto

**Escrito — 9 ficheros modificados, 2 creados:**

- `tools/projector/project.mjs` — `PROJECT_REPORTS_INDEX_RELATIVE_PATH` (`:756`),
  `REPORTS_SOURCE_DIR` / `REPORT_FILE_NAME` / `VERDICT_FILE_NAME`, `buildReportsIndex` (`:1520`,
  exportada para los tests como las demás), y la llamada de emisión (`:1972`), junto a
  `docs_index` y **sin** el `if (!data) return` que salta los nulos.
- `project-console/serve.mjs` — la séptima entrada de `PROJECT_EMIT_ARTIFACT_PATHS` (`:151`) y
  cinco sitios de prosa.
- `tests/emitted-artifacts-declaration.test.mjs` — sitios 1 y 2, la aserción viva nueva, prosa 16.
- `tests/projector-roadmap-tree.test.mjs` — sitios 5 y 6.
- `tests/serve-project-emit.test.mjs` — sitios 3, 7 y 8, y cuatro sitios de prosa.
- `tests/helpers/real-like-project.mjs` — cabecera. **`COPIED` no se tocó** (criterio 8).
- `tools/project-console/build-registry-digest.mjs` — §6.
- `project-console/assets/project-console.js` — dos sitios de prosa.
- **NUEVO** `tests/projector-reports-index.test.mjs` — 11 tests.
- **NUEVO** `context/aiw-console/records/INDICE-DE-REPORTES-RESOLUCION-O4-P17.md` — este record.

**Verificado intacto al terminar:**

- `roadmap/roadmap.json` y **los seis de `.project/`** — **no tocados**, mismo md5 al empezar y al
  terminar: `roadmap/roadmap.json` `65cbc343b63cd2eb1eba1b45aa1ce31e`, `docs_index`
  `af87fd753a9d9ca578fbdc24217c163c`, `git_history` `a0809428b8187c4e286ac30951679e44`,
  `guardrails` `99482cb860c4997fd6dad6eff8e6d992`, `no_claims` `54da4baf26b0978fcab3238be45d432a`,
  `roadmap` `c9585f0f8d7f83dee54848b774f7c49e`, `snapshot` `dfbc1f4fbceded7f137b6f748dd5eb4b`.
- **Los siete siguen en LF**, contado byte a byte: **cero secuencias CRLF**
  (LF: 993 / 2393 / 2260 / 76 / 63 / 985 / 1446). Los nueve ficheros escritos por este run
  **también están en LF, cero CRLF**.
- **`.project/` sigue con SEIS ficheros.** No se re-emitió: `reports_index.json` **no existe en
  ninguna parte del workspace**, comprobado con `find`. El artefacto está en el emisor, no en el
  disco, y emitirlo es del operador.
- **Los otros repositorios se LEYERON y no se escribieron.** La única lectura fuera de
  `aiw-console` fue `buildReportsIndex` sobre `cantu-quizzes-latex` (§4.1), que no escribe.
- **Ningún comando Git en ninguna forma.** No queda ningún `.git/index.lock`.
- No se cambió el `status` del run, no se tocó `roadmap/roadmap.json`, y **los dos records de
  parada se leyeron y no se reescribieron**.

**Escrito FUERA del repositorio, y desechable:** la copia de medición del criterio 1 y el script
de parche, en el scratchpad de la sesión. No son entregables y pueden borrarse.
