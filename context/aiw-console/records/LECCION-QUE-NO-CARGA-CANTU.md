# LECCIÓN QUE NO CARGA — REPARACIÓN Y VISIBILIDAD DEL FALLO (cantu-studio)

**Fecha:** 2026-08-04
**Repo intervenido:** `projects/cantu-studio`
**Record escrito en:** `projects/aiw-console/context/aiw-console/records/`

---

## 0. EL RUN, DERIVADO DEL CANÓNICO — NO TECLEADO

Derivado de `projects/cantu-studio/.aiw/roadmap/roadmap.json` por `queue_order` **26**,
aplanando `objectives[].phases[].runs[]` (el archivo no tiene un array `runs` en raíz;
`schema_version` es `jame.roadmap_v3.v0.2-progress`).

| Campo | Valor en disco |
|---|---|
| **`run_id`** | **`RUN-CANTU-LESSON-LOAD-FAILURE-SURFACING-001`** |
| `queue_order` | 26 |
| objetivo / fase | `O7` / `O7.P1` |
| `status` | `active` |
| `depends_on` | `[]` |

**Comprobación de título, VERBATIM.** Exigido: `Repair the lesson that fails to load and
stop the build from swallowing the failure`. En disco, carácter a carácter: **idéntico. CASA.**
El validador confirma por vía independiente que es el único run activo (§7).

`full_description` leído íntegro antes de empezar. Este record ejecuta esa especificación
**sin ampliarla**. Sus dos exigencias metodológicas —medir el conjunto entero antes de
reparar, y verificar cada cifra contra disco en lugar de heredarla— se cumplen en §1 y §8.

---

## 1. ⚠ PARADA Y REPORTE — LA ELECCIÓN DEL CRITERIO 3 NO ESTÁ EN REGISTRO

**Va primero porque es lo que bloquea la mitad más importante del run.**

El propio `full_description` lo ordena, VERBATIM:

> implement the one the operator chooses if the choice is already on record, otherwise stop
> and return the options with measured cost

**Búsqueda hecha, y su alcance declarado.** Se barrieron `docs/decisions/` (5 ADRs:
`ADR-001-DUAL-PIPELINE-WEB-SLIDES`, `ADR-002-EDITOR-SATELLITE-NOT-ENGINE`,
`ADR-003-DUAL-SCHEMA-INTENTIONAL-DIVERGENCE`, `ADR-004-SLIDES-NO-BUILD-ENDPOINT`,
`ADR-005-LOCAL-FIRST-STORAGE-MODEL`), `docs/governance/`, `docs/how-to/`,
`docs/operations/`, `docs/reference/`, `docs/architecture/`, los 129 records de
`aiw-console`, y `.aiw/`. **Ninguno registra una elección del operador entre fallar
ruidosamente y reportar y continuar.**

Lo que sí existe es **descripción del estado actual, no elección**, y además referida a
otro punto de captura —el de los renderers, no el de la carga:

```
docs/architecture/ARCHITECTURE-SYSTEM-OVERVIEW.md:111
  (bajo el encabezado "Constraints that shape the design — Current-state facts, not defects")
  "The build swallows individual renderer failures, so one bad block never aborts the run."

docs/reference/REFERENCE-WEB-ENGINE-API.md:134
  "Renderer exception: swallowed; the section contributes nothing and the build continues."
```

Ambas describen `main.js:124`. **El defecto de este run es `main.js:95`, la carga del
módulo, que ninguna de las dos menciona.** Describir lo que hace el código hoy no es una
decisión tomada.

**Consecuencia, aplicada:** se reparó el import (§3) y se hizo la medición completa
(§2, §4), y **NO se implementó ningún cambio en el constructor**. Las opciones con su
coste medido y una recomendación explícita están en §4. **La decisión es del operador.**

---

## 2. CRITERIO 1 — EL CONJUNTO ENTERO, MEDIDO ANTES DE TOCAR NADA

**Método:** se replicó en un arnés de solo lectura, fuera del repo, la lógica exacta de
`main.js` — el recorrido de `main.js:168-172` y las puertas de `buildFile`
(`main.js:84-105`) — hasta la puerta de datos. **No se invocó ningún renderer, no se
escribió un byte y no se tocó `dist/`.** Corrido **antes** de la reparación.

**La unidad es el archivo `.js` bajo `src/content/`, que es exactamente lo que el
constructor considera una lección.**

### 2.1 El conjunto, antes de reparar

| Medida | Cifra |
|---|---|
| **Archivos `.js` que el constructor recorre** | **31** |
| **Cargan y emiten salida** | **30** |
| **Se descartan** | **1** |
| descartados por nombre (`_`, filtro sandbox) | 0 |
| `module.exports` vacío | 0 |
| cargan pero sin secciones emitibles | 0 |

### 2.2 Los que se descartan hoy, con ruta y motivo

**Uno, y sólo uno:**

| Ruta | Motivo real, ejecutado | ¿silencioso? |
|---|---|---|
| `src/content/lecciones/Aritmetica/2_operaciones_aritmeticas.js` | `Cannot find module '../../../builders/web/renderIconList'` | **SÍ — `main.js:95`, `catch (e) { return; }`** |

### 2.3 Desglose por carpeta

| Carpeta | Total | Emiten | Descartados |
|---|---:|---:|---:|
| `author_lite/generated/` | 13 | 13 | 0 |
| `sandbox/` | 8 | 8 | 0 |
| `staging/` | 8 | 8 | 0 |
| **`lecciones/`** | **2** | **1** | **1** |
| **Total** | **31** | **30** | **1** |

**La cifra del run —«one of the two lessons measured is affected»— se verificó contra
disco y es CORRECTA:** `src/content/lecciones/` tiene exactamente 2 archivos y exactamente
1 falla. **No se heredó del record previo: se remidió.**

**El conjunto NO resultó mucho mayor de lo que el run supone**, así que ese motivo de
parada (criterio 11) no se disparó. Matiz que hay que decir: el run habla de «dos
lecciones», que son las de `lecciones/`; **el constructor en realidad procesa 31 archivos
de contenido**, y los otros 29 también son lecciones a efectos de build. El número de
**roturas** —una— coincide exactamente en ambas lecturas, así que la reparación no cambia
de tamaño.

---

## 3. CRITERIO 2 — LA REPARACIÓN

**Un solo archivo, una sola línea, y es una ruta de módulo: no se tocó el contenido de
ninguna lección.**

`src/content/lecciones/Aritmetica/2_operaciones_aritmeticas.js:88`

| | Ruta |
|---|---|
| **ANTES** | `require('../../../builders/web/renderIconList')` |
| **DESPUÉS** | `require('../../../builders/web/partials/renderIconList')` |

**Por qué esa y no otra, medido:**

- `src/builders/web/renderIconList.js` → **no existe** (verificado en disco).
- `src/builders/web/partials/renderIconList.js` → **existe**, 6 667 bytes.
- Firma compatible: `module.exports = function renderIconList(data)` consume `data.items`,
  que es exactamente lo que la llamada pasa. No hubo que adaptar nada.
- **Precedente del propio repo:** `src/content/sandbox/test_tables.js:4` ya importa por
  `require('../../builders/web/partials/renderTable')`, con el mismo `partials/`.

**Censo re-ejecutado después de reparar: 31 recorridos, 31 cargan, 0 descartados.**

---

## 4. CRITERIO 3 — QUÉ HACE HOY EL CONSTRUCTOR, Y LAS DOS OPCIONES CON SU COSTE

### 4.1 Qué hace hoy, con archivo y línea

**`main.js:95`** — el punto exacto, VERBATIM:

```js
try { data = require(fullSrcPath); } catch (e) { return; }
```

La excepción se liga a `e` y **`e` no se usa**. Sin `console.error`, sin acumulador, sin
código de salida. La función retorna y el bucle de `main.js:172` sigue con el siguiente
archivo. **El operador ve el mismo `✨ JAME v12.0 (A11y Engine): Built files.` y exit 0
tanto si se construyó todo como si se cayó la mitad.** Verificado ejecutando: el build
terminó en exit 0 con la lección rota en disco.

**Los cuatro puntos de captura del archivo, medidos — y el defecto es la excepción, no la
norma:**

| Línea | Qué captura | Qué hace con el error |
|---|---|---|
| `main.js:40` | carga de un builder Web | **REPORTA** — `console.error(\`❌ ${file}: ${e.message}\`)` |
| **`main.js:95`** | **carga de una lección** | **SILENCIO TOTAL** ← el defecto de este run |
| `main.js:111` | `renderSlides` | **REPORTA en la salida** — `<pre>Error: ${err.message}</pre>` |
| `main.js:124` | un renderer de sección Web | silencio (documentado como *current-state fact*; **fuera de scope**) |

**Dato que pesa en la decisión: `main.js:40` ya hace «reportar y continuar» dentro del
mismo archivo, para el fallo hermano de cargar un builder.** El tratamiento silencioso de
`:95` es incoherente con su propio vecino.

### 4.2 Cuántos consumidores hay — medido

| Consumidor | Cifra | Cómo se midió |
|---|---:|---|
| Scripts `npm` que invocan el build | **0** | **no hay `package.json` en la raíz** del repo; los 4 que existen son de `tools/` |
| Tests que ejercitan `main.js` | **0** | los 2 candidatos del grep eran falsos positivos: citan `main.jsx` de MathLive, no `main.js` |
| Comandos documentados | **0** | `docs/archive/rewrite-dossiers/*` lo declaran expresamente; `docs/archive/DOCS_MISSING_BACKLOG.md:16` reconoce el hueco |
| Pipelines CI | **0** | ninguno en el repo |
| **Total automatizado** | **0** | |
| **Humano** | **1** | el operador ejecutando `node main.js` a mano |

**El único consumidor del constructor es una persona mirando una consola.** Ningún
proceso automático puede reaccionar hoy a un código de salida.

Consumidores de la **salida**: `dist/` contiene **76** `.html` tras el build de §6.

### 4.3 Opción A — FALLAR RUIDOSAMENTE (el build se detiene)

**Qué se rompe, medido y concreto:** `main.js` escribe archivo a archivo dentro del bucle
(`main.js:163`, `fs.writeFileSync`), **sin transacción ni área de preparación**. Abortar
en el archivo N deja `dist/` en estado mixto: los N-1 anteriores con contenido nuevo, los
posteriores con el contenido del build anterior, **y nada distingue unos de otros**.

Con el fallo real de este run, medido sobre el orden de recorrido:

- La lección rota ocupaba la **posición 15 de 31**.
- Abortar ahí habría dejado **16 archivos sin reconstruir**: **los 8 de `sandbox/` y los
  8 de `staging/`**, es decir el 100 % de los fixtures de paridad y el 100 % del contenido
  en preparación.

| | |
|---|---|
| **Coste hoy, tras la reparación** | **cero.** Con 0 fallos el build no se detiene nunca |
| **Coste ante una rotura futura** | un solo archivo roto bloquea la emisión de los 30 sanos |
| **Beneficio** | imposible de ignorar; con exit ≠ 0 un CI futuro lo detendría |
| **Riesgo específico** | `dist/` mixto y silencioso sobre su propia mezcla |

### 4.4 Opción B — REPORTAR Y CONTINUAR (el build termina y dice qué quedó fuera)

| | |
|---|---|
| **Qué se rompe** | **nada de lo que hoy funciona.** Los 30 sanos se siguen emitiendo; `dist/` queda tan completo como sea posible |
| **Coste** | hay que decidir el código de salida. Con exit 0 el aviso es puramente visual; con exit ≠ 0 sería accionable, pero **hoy hay 0 consumidores automatizados que lo lean** (§4.2) |
| **Beneficio** | el operador obtiene la lista de lo descartado con ruta y motivo, que es exactamente lo que hoy no existe |
| **Riesgo específico** | un mensaje en consola se puede pasar por alto; el build sigue diciendo «terminé» |

### 4.5 RECOMENDACIÓN EXPLÍCITA — Y NO SE DECIDE

**Se recomienda la opción B, reportar y continuar**, por tres razones medidas:

1. **El único consumidor es humano (§4.2).** Detener el build castiga al operador
   quitándole 16 salidas sanas para comunicarle algo que un mensaje comunica igual de bien.
2. **Coherencia con el propio archivo.** `main.js:40` ya reporta y continúa ante el fallo
   hermano. La opción B alinea `:95` con su vecino en lugar de introducir una tercera
   política.
3. **El coste de la opción A es asimétrico.** Su beneficio —imposible de ignorar— hoy no
   se puede cobrar, porque no hay CI ni script que lea el código de salida; su coste
   —`dist/` mixto— sí se paga entero.

**Sugerencia sobre el código de salida, si el operador elige B:** exit ≠ 0 cuando algo se
descartó. No cuesta nada hoy (0 consumidores automatizados) y deja la puerta abierta a que
un CI futuro lo aproveche sin volver a tocar el constructor.

**Esto es una recomendación. No se implementó nada de §4. La elección es del operador.**

---

## 5. CRITERIO 5 — TESTS

### 5.1 Lo que se escribió

**Archivo nuevo:** `tools/dev/tests/contentModulesLoad.test.mjs` (4 tests).

**Ubicación, declarada:** el repo tiene exactamente dos carpetas de tests —
`tools/author-lite/compiler-api/tests` (33 archivos) y `tools/roadmap/tests` (8) — y
**ninguna cubre el contenido de JAME Core ni el constructor**. Se creó `tools/dev/tests/`
dentro de la carpeta de utilidades de desarrollo ya existente, en lugar de meter un test
de JAME Core en la suite del compilador de Author Lite.

Los tests replican el recorrido y las puertas de `main.js` y afirman contra disco que
ningún módulo de contenido está siendo descartado.

### 5.2 Salida ejecutada — el test nuevo

```
✔ every content module main.js requires loads without throwing (27.2349ms)
✔ content modules that load expose sections the build can emit (4.986ms)
✔ the Aritmetica lessons both load and carry web sections (0.55ms)
✔ 2_operaciones_aritmeticas resolves renderIconList and emits its markup (0.2839ms)
ℹ tests 4
ℹ pass 4
ℹ fail 0
```

### 5.3 La aserción MUERDE — verificado revirtiendo

Un test que sólo pasa no demuestra nada. Se revirtió la ruta a la rota, se corrió, y se
restauró. **Salida con el import roto:**

```
✖ every content module main.js requires loads without throwing
✔ content modules that load expose sections the build can emit
✖ the Aritmetica lessons both load and carry web sections
✖ 2_operaciones_aritmeticas resolves renderIconList and emits its markup
ℹ tests 4
ℹ pass 1
ℹ fail 3

  AssertionError: content modules dropped silently by main.js:95:
  src\content\lecciones\Aritmetica\2_operaciones_aritmeticas.js -> Cannot find module '../../../builders/web/renderIconList'
```

**El mensaje nombra el archivo y el motivo — lo que el constructor no hace.** Ruta
restaurada y reverificada en disco tras la prueba.

### 5.4 Lo directamente relacionado

Los 3 archivos de la suite del compilador que tocan `iconList`:

```
node --test tools/author-lite/compiler-api/tests/webIconListBadgeWidth.test.mjs \
            tools/author-lite/compiler-api/tests/webColorSelectorCustomPicker.test.mjs \
            tools/author-lite/compiler-api/tests/webLegacyCertifiedColorPaletteReconciliation.test.mjs

ℹ tests 17
ℹ pass 17
ℹ fail 0
```

**Nada verde se puso rojo. Total ejecutado en este run: 21 tests, 21 verdes, 0 rojos.**

### 5.5 La cifra de la suite — cuál de las dos cosas es

**El ticket avisa de que 350 era un recuento estático y no un resultado de ejecución.
Confirmado, y remedido hoy — también como RECUENTO ESTÁTICO, por `grep` de declaraciones
`test(`, NO como resultado de ejecución:**

| Ámbito | Archivos `*.test.mjs` | Declaraciones `test(` |
|---|---:|---:|
| `tools/author-lite/compiler-api/tests` | 33 | **363** |
| `tools/roadmap/tests` | 8 | 166 |
| `tools/dev/tests` (nuevo) | 1 | 4 |
| **Repo entero** | **42** | **533** |

La medición previa daba 32 archivos / 350 `test()` para la suite del compilador; hoy son
**33 / 363**, también estático. **No se corrió la suite completa** — el ticket lo prohíbe
y `CLAUDE.md` avisa de fallos fantasma entre talleres simultáneos.

---

## 6. CRITERIO 6 — VERIFICADO EN LA SALIDA, NO SÓLO EN EL CÓDIGO

Se ejecutó el constructor real: `node main.js`, exit **0**.

### 6.1 La lección aparece en el build

| Artefacto | Antes | Después |
|---|---|---|
| `dist/lecciones/Aritmetica/1_propiedades_numeros.WEB.html` | existe, 74 238 B | existe, 73 551 B |
| **`dist/lecciones/Aritmetica/2_operaciones_aritmeticas.WEB.html`** | **NO EXISTE** | **existe, 89 368 B** |
| **`dist/_moodle/lecciones/Aritmetica/2_operaciones_aritmeticas.MOODLE.html`** | **NO EXISTE** | **existe, 85 980 B** |

### 6.2 Y el módulo reparado ejecutó de verdad

No basta con que exista el archivo. Se comprobó la firma HTML del renderer y sus datos:

| Comprobación en la salida | WEB | MOODLE |
|---|---:|---:|
| `j-iconlist-root` (única clase raíz que emite `renderIconList.js`) | **1** | **1** |
| `Paréntesis` | 1 | 1 |
| `Exponentes` | 1 | 1 |
| `Mult. y División` | 2 | 2 |
| `Suma y Resta` | 2 | 2 |
| `<title>` | `2. Operaciones Aritméticas` | — |

Los cuatro `items` del `iconList` llegan al HTML final en ambas vías. **El módulo que no
resolvía ahora resuelve, se ejecuta y su markup sale en el producto.**

### 6.3 El total de `dist/` — declarado, porque subió más de lo que la reparación explica

`dist/` pasó de **47** a **76** `.html`. **Sólo 2 son de la reparación.** Separado por
fecha de escritura:

- **70** escritos por este build — coincide **exactamente** con lo que el censo predecía
  (11 archivos × 3 formatos + 17 × 2 + 3 × 1 = 70).
- **6** no tocados: salidas huérfanas de contenido con nombres antiguos, bajo
  `dist/staging/.../Sections_by_lesson/`, con fecha anterior.

El salto de 47 a 76 es que **`dist/` estaba parcialmente construido de un build antiguo**,
no un efecto de la reparación. **Los 6 huérfanos se nombran y no se tocan** (§8).

---

## 7. CRITERIO 7 — VALIDADOR, POR LA VÍA QUE NO ESCRIBE

Desde `projects/cantu-studio`:
`node tools/project-console/validate-project-console-state.mjs` — exit **0**.

**Salida completa, VERBATIM:**

```
Project Console state validation passed.
Roadmap v3 prototype: 7 objectives / 28 phases / 69 runs; queue groups needs_human_decision=0 now=1 ready_next=16 later=25 history=27
Roadmap v3 active run derived stages: RUN-CANTU-LESSON-LOAD-FAILURE-SURFACING-001=none
Docs indexed: 149
Docs curated primary-visible: 60 of 149 registered
Component statuses: 16
Git provenance episodes: 9
Git history snapshot: 508 commits / 1 branches (1 visible, 0 backup hidden); current=main; run-associated=3; source=local_git_autosync
Roadmap rebase warnings (non-blocking):
- .aiw/roadmap/roadmap.json run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001 depends on RUN-CANTU-ROADMAP-CONTENT-AUDIT-001, which does not resolve in this roadmap. With a single roadmap loaded this cannot be decided: it may be a legal external dependency — a run that lives in another project (CONTRATO §10.d Regla 2) — or a typo in the run id. Both are possible and one loaded roadmap cannot tell them apart; resolve it against the full set of projects to distinguish external from write error.
```

**Cifras reales, medidas y no dadas por el ticket:**

| Medida | Valor |
|---|---:|
| **Total de runs** | **69** |
| **`history=`** | **27** |
| **`ready_next=`** | **16** |
| `now=` | 1 |
| `later=` | 25 |
| `needs_human_decision=` | 0 |
| objetivos / fases | 7 / 28 |

**El aviso no bloqueante es el conocido de la dependencia externa. Es legal, no es
hallazgo, y no se tocó.** El validador confirma además, por vía independiente, que el run
activo derivado es `RUN-CANTU-LESSON-LOAD-FAILURE-SURFACING-001`: el mismo que §0.

---

## 8. CRITERIO 8 — LAS CIFRAS DEL TICKET, VERIFICADAS UNA A UNA

| Cifra afirmada | Medida hoy | Veredicto |
|---|---|---|
| «Dos lecciones medidas» | `src/content/lecciones/` tiene **2** archivos `.js` | **CORRECTA** |
| «una afectada» | **1** de esas 2 falla al cargar | **CORRECTA** |
| **«17 componentes»** | **16** — `Component statuses: 16` en el validador, y 16 entradas en `.aiw/state/component_status.json` | **INCORRECTA. Son 16, no 17.** |
| «350 en la suite del compilador» | **363**, y es recuento estático en ambas mediciones (§5.5) | **desactualizada** |

**No se corrigió `component_status.json`:** está fuera de scope explícito. Se nombra.

---

## 9. LO QUE SE NOMBRÓ Y NO SE TOCÓ

Nada de esto es de este run. Ninguno se abrió, se reparó ni se comentó más allá de nombrarlo:

1. **El draft del almacén vivo que no valida** —
   `src/content/author_lite/drafts/matematicas/algebra/test5.json`, que `SlidesDraftSchema`
   y el esquema del editor rechazan.
2. **Las cuatro evidencias congeladas que tampoco validan**, bajo `QA/temp/PASS-4D-*`.
3. **`main.js:124`** — el segundo catch silencioso, el de los renderers de sección.
   Documentado como *current-state fact*. **Es un defecto hermano del de este run, pero el
   ticket acota el scope a «el punto del constructor que captura el fallo» de carga.**
4. **Los 6 `.html` huérfanos** de `dist/staging/.../Sections_by_lesson/` (§6.3).
5. **`component_status.json` con 16 entradas** frente a las 17 que afirma el ticket (§8).
6. **El aviso no bloqueante del validador** — dependencia externa legal (§7).
7. **La ausencia de comando de build documentado** — `docs/archive/DOCS_MISSING_BACKLOG.md:16`.

---

## 10. QUÉ **NO** SE HIZO

- **No se implementó ningún cambio en `main.js`.** La elección del criterio 3 no está en
  registro (§1). Se reporta con coste medido y recomendación; **no se decide**.
- No se reescribió el contenido de ninguna lección. El único cambio es una ruta de módulo.
- No se tocaron componentes, esquemas, el compilador, los renderers ni el editor.
- No se tocó el draft roto ni las evidencias congeladas.
- No se tocó la Definition of Done, los contratos, `docs_index.json` ni `component_status.json`.
- No se tocó el roadmap canónico, `.project/`, ni el status de ningún run.
- No se insertaron, movieron ni renumeraron runs. **No se ejecutó Git.** No se levantaron servidores.
- **No se corrió la suite completa.**
- No se clasificó ningún run.
- No se repararon derivas conocidas: mojibake de los dos esquemas, punteros muertos, el CLI
  local de roadmap, ni los defectos sin dueño de los componentes revalidados.

---

## 11. CRITERIO 10 — STATUS DECLARADO Y QUÉ FALTA

**No se cambió el status. Lo cierra el operador desde la consola global. No se re-emitió
`.project/`.**

**El run debe quedar en `active`.**

Los únicos statuses en uso en el canónico son `planned` (41), `active` (1) y `completed`
(27). **No hay un status de «esperando decisión», así que `active` es el único que dice la
verdad:** el run está a medias por diseño, no por descuido.

**Por qué NO debe pasar a `completed`:** el `full_description` declara dos cosas y dice
«the second matters more than the first». La primera —reparar el import— está hecha y
verificada en la salida. **La segunda —que el fallo deje de ser invisible— no está
implementada**, porque la propia especificación ordena parar si la elección no está en
registro. Cerrarlo ahora daría por resuelto un defecto que sigue exactamente igual: **hoy,
después de esta reparación, `main.js:95` sigue tragándose cualquier rotura futura en
silencio.**

**Qué falta exactamente para llegar a `completed`:**

1. Que el operador **elija entre la opción A y la opción B de §4** y lo deje en registro.
2. Implementar **sólo** la elegida en `main.js:95`.
3. Test de la conducta elegida y verificación en la salida.

### ¿Hace falta QA del operador?

**Para la reparación del import: NO.** La verificación del criterio 6 basta y es objetiva:
el HTML existe donde antes no existía, contiene `j-iconlist-root` una vez y los cuatro
items del `iconList`, en Web y en Moodle, y el test lo afirma y falla si se revierte.

**Lo que sí requiere al operador es una DECISIÓN, no un QA:** la de §4.

**Si aun así se quiere una mirada visual** —opcional, no bloqueante— el archivo a abrir es
`dist/lecciones/Aritmetica/2_operaciones_aritmeticas.WEB.html`, y lo que hay que mirar es
el bloque PEMDAS: las cuatro filas `P / E / MD / AS` con sus badges de color, dentro de la
columna izquierda, junto a la tarjeta `¡CUIDADO CON EL ORDEN!`. **Lo medido es que el
markup y los datos están; lo que un humano añadiría es el juicio de que se ve bien.**

---

## 12. ARCHIVOS ESCRITOS POR ESTE RUN

| Archivo | Qué |
|---|---|
| `projects/cantu-studio/src/content/lecciones/Aritmetica/2_operaciones_aritmeticas.js` | **1 línea**: la ruta del `require` (§3) |
| `projects/cantu-studio/tools/dev/tests/contentModulesLoad.test.mjs` | **nuevo**, 4 tests (§5) |
| `projects/cantu-studio/dist/**` | 70 `.html` reescritos por `node main.js` (§6) — salida generada |
| este record | |
