# REPARACIONES QA DEL REPORTE — LOS CINCO HALLAZGOS DEL OPERADOR

`RUN-CONSOLE-REPORT-QA-REPAIRS-001` — «The five things the operator found while reviewing a
report, repaired» (`queue_order` 55, derivado del roadmap por orden y verificado contra el
título exacto antes de tocar nada; no se tecleó el id).

**Todas las cifras son mediciones fechadas del 2026-08-13**, tomadas contra el renderizador
tal como se sirve, antes y después de cada cambio.

**LOS CINCO LOS ENCONTRÓ EL OPERADOR MIRANDO LA PANTALLA.** Ninguno lo encontró un test: la
suite estaba en verde a 643/642/1 **con los cinco presentes**, y esa base se re-midió al
empezar y al cerrar. Es el argumento entero a favor de la QA humana y queda escrito aquí.

---

## A. Qué se entregó, y dónde

| Pieza | Ruta |
|---|---|
| Tabla de rótulos escritos (`RR_FIELD_LABELS`), humanizador y resolución | `run-report-renderer.js:141-208` |
| `requires_verdict` derivado en el modelo de pasos | `run-report-renderer.js:295-330` |
| «Si se rechaza» plegable, en las dos constructoras de tarjeta | `run-report-renderer.js:732`, `:794` |
| Los doce sitios de rótulo, corregidos | `run-report-renderer.js` (§C) |
| CSS del bloque plegable y de los dos estados nuevos | `run-report-renderer.css` |
| Dos assets reales de la lección | `tests/fixtures/reports-qa/reports/RUN-QA-REPORT-LESSON-001/assets/` |
| Suite nueva de los cuatro defectos reparados | `tests/run-report-qa-repairs.test.mjs` (16 tests) |
| Cinco afirmaciones que fijaban el defecto, actualizadas | `tests/run-report-renderer.test.mjs` |
| Fixtures tocados + sus copias byte-idénticas | `CASO-1`, `CASO-3` y `RUN-QA-REPORT-{AUDIT,LESSON}-001` |

**`roadmap/roadmap.json` y los siete de `.project/` salen como entraron**: cero escrituras,
LF re-verificado uno a uno al cierre. Llevaban la inserción y apertura de este run sin
commitear y siguen igual. **Nada de git. Ningún otro repositorio. El status del run sin
tocar.** El `POST` del veredicto sigue siendo el `#56`.

---

## B. DEFECTO 1 — QUÉ ERA REALMENTE

**El operador tenía razón sobre la pantalla, y el bloque NO se construye dos veces.** Las dos
mitades son de dueños distintos.

### B.1 · Lo medido: el renderizador lo pinta UNA vez

| Medición (fixture de auditoría, ítem `R1`) | Resultado |
|---|---|
| El texto en el dato (`items[R1].if_rejected`) | **1** |
| Sitios de construcción por tarjeta | **1** (ítem `:732`; decisión `:794` — nunca coinciden) |
| Bloques `rr-if-rejected` en la tarjeta de `R1` | **1** |
| Prosa de `if_rejected` en la superficie entera (raíl + tarjeta + contexto) | **1** |
| `content:` en el CSS que pudiera duplicar texto | **0** — el fichero no tiene ninguno |
| Otros sitios de construcción en la consola | **0** (`project-console.js`, `run-report-surface.js`, `project-shell.js`) |
| Montajes del renderizador en la página | **1** (`index.html:299`, un solo `#run-report-mount`) |

Barrido sobre **las cuatro tarjetas × cada paso × los dos idiomas**: ninguna tarjeta pinta el
bloque más de una vez. Fijado en `run-report-qa-repairs.test.mjs`.

### B.2 · Lo que el operador vio: la frase, no el bloque — y es del EMISOR

La duplicación es real y está **en el dato de la lección**, no en la vista. El renderizador
encabeza el bloque con «Si se rechaza», y la prosa del propio reporte **abre repitiendo la
misma frase**:

```
encabezado (lo escribe la vista) :  Si se rechaza
prosa (la escribe el emisor)     :  «REQUERIDO en modo create: no hay versión anterior a la
                                     que volver. Si se rechaza, el borrador se retira y el
                                     planteamiento se rehace…»
```

En pantalla, **2 apariciones**; en el dato, **1**; rótulos escritos por esta vista, **1**. El
operador leyó la frase dos veces seguidas, encabezado y cuerpo, y lo llamó duplicado. Lo era,
a la vista. No lo era en el DOM.

**Por qué la cabina no pudo reproducirlo leyendo el código:** el encargo ancló el defecto en
`items[R1].if_rejected` del fixture de **auditoría**, y allí la prosa no repite el
encabezado. La repetición está en `L1` del fixture de **lección**. La cabina midió donde le
dijeron y midió bien.

**NO SE REPARA AQUÍ, Y SE NOMBRA:** recortar la prosa para ahorrar la repetición sería esta
vista **editando lo que dijo el run**, que es justo lo que no puede hacer. Que un reporte no
abra su `if_rejected` repitiendo el rótulo bajo el que se va a imprimir es del **emisor y del
sobre** — la misma frontera que la mitad del defecto 2 y todo el defecto 5.

### B.3 · El plegado: eso sí era de la vista, y está hecho

Era el único bloque de prosa de la tarjeta que **no** plegaba: `<div>` mientras «El
razonamiento», justo encima, ya era `<details open>`. Ahora es `<details open>` con su
`<summary>`, **en las dos constructoras** (ítem y decisión), y el CSS le da regla propia.
Llega abierto y se cierra al leerlo, como el resto.

---

## C. DEFECTO 2 — EL BARRIDO ENCONTRÓ **DOCE** SITIOS

La cabina midió **dos** y avisó de que no garantizaba que fueran todos. **No lo eran: son
doce.** Es UN defecto en doce sitios, no doce defectos.

| # | Sitio | Qué rotulaba | Ahora |
|---|---|---|---|
| 1 | `rrLines` — rama de objeto | `k + ": " + x` | humanizado |
| 2 | `rrAuthorityText` — tercera forma no declarada | `k + ": " + v` | rótulo o humanizado |
| 3 | `rrKvEntries` — los tres bloques declarados | claves crudas (`why_not`, `who_could`, `affects`) | humanizadas |
| 4 | Tarjeta de ítem — lista `unchanged` **(medido por la cabina)** | `statement`, `options`, `feedback` | rótulo escrito |
| 5-6 | Tarjeta de ítem — claves de fila del diff (par y solo-después) | `code`, `file`, `level`, `line` | rótulo o humanizado |
| 7 | Tarjeta de decisión — respaldo de `scope_*` | `k.replace(/_/g," ")` | rótulo o humanizado |
| 8 | Contexto — `metaRows` | 15 claves de sobre (`schema_version`, `run_id`, `log_dir`…) | rótulo escrito |
| 9 | Contexto — fila de `profile: null` | `profile` | rótulo escrito |
| 10 | Contexto — `devRows` (`pilot_deviation`) | `how_the_separation_is_preserved` | humanizado |
| 11 | Contexto — etiqueta de `countRows` | claves de `counts` | humanizado |
| 12 | Contexto — `gateRows` **(medido por la cabina, `:852`)** | `gate`, `verification`, `verification_reason`, `items_note`… | rótulo escrito |

**Y el valor, no solo la clave:** una verificación que nadie corrió imprimía la cadena
literal `null`. El operador leía «gate, verification, null». Ahora lee «Compuerta», «Verificación»,
«sin verificación». Los tres, en los dos idiomas.

### C.1 · La frontera del diseño, y es deliberada

La tabla cubre **exactamente el vocabulario que este fichero ya nombra por sí mismo**: las
claves del sobre que están escritas aquí (`metaKeys`, los `push` de `gateRows`) y los campos
de ítem que fija el contrato. Una clave que **inventa el reporte** —cómo se llama un recuento,
qué declara una desviación, qué lleva una entrada de un bloque— **no puede recibir rótulo
escrito sin que el renderizador pase a conocer un dominio**, que es la regla que gobierna a
todas las demás. Esas se **humanizan** (`_` y `.` → espacio): el operador lee palabras, nunca
un identificador, y la vista no se inventa una traducción que no tiene.

### C.2 · La mitad que NO se repara, nombrada

**El dato mezcla identificadores y prosa en el mismo array.** `R1.unchanged` trae
`["statement","options","feedback"]`; `C5` trae `["statement","valores de todas las
opciones"]`; `H1` trae `["todo — el run no lo tocó"]`. La tabla traduce los identificadores
que puede nombrar y **la prosa viaja verbatim**. Que el emisor escriba solo lo que una
persona llama a las cosas **es un cambio del sobre y es de otro hilo.** Fijado con un test
que exige que la frase de `C5` sobreviva intacta.

### C.3 · El pin: barrido, no lista

El test no enumera los doce. Recorre **cada posición de rótulo, de cada tarjeta, de cada
fixture, en los dos idiomas** (>200 rótulos) y rechaza cualquiera con forma de identificador.
**Un decimotercer sitio que aparezca mañana falla aquí sin que nadie recuerde ampliar nada.**

---

## D. DEFECTO 3 — LOS DOS CONTADORES

| | Antes | Después |
|---|---|---|
| **Pasos que el operador recorre** (tarjetas) | 12 | **12** |
| **Pasos que piden veredicto** (el contador) | **12** | **11** |
| «Missing N verdicts and the signature» | `12` | `11` |
| «N still without a verdict» en la tarjeta del run | `10` | `9` |

El ítem `I1` del fixture de auditoría es `info` — «medido y relevante, no requiere acción»
(`CONTRATO-REPORTE-DE-CAMBIOS-v1.md`, §tipo) — y sin embargo declaraba `verdict_options` y
consumía uno de los doce. **Ahora se muestra, no se firma y no cuenta.**

**Declarado por CAMPO, nunca por `type`.** `requires_verdict: false` lo declara el emisor y
la vista deriva las tres consecuencias, igual que ya hace con `stop`. Ramificar sobre el valor
de `type` es la regla que este renderizador está construido para no romper, y la suite
ciega-al-dominio lo prueba mecánicamente (`verdict_options` ni siquiera puede aparecer en el
fuente). En el fixture, `I1` cambia `verdict_options` por `requires_verdict: false`: dejarle
un vocabulario de veredicto a un ítem que no toma veredicto reproducía la contradicción.

**Dos números que dejaron de ser el mismo número.** El contador de posición del topbar usaba
el total de *progreso*; ahora la posición cuenta tarjetas (12) y el progreso cuenta firmas
debidas (11). Antes coincidían por accidente.

**Frontera nombrada:** `CASO-2`, `CASO-4` y el fixture de volumen **también** traen ítems
`info` y **no** se tocaron — el encargo acota el criterio 3 al fixture de auditoría, y
propagar `requires_verdict` a todo reporte emitido es del emisor. Un reporte que no declara
nada se comporta exactamente como antes; hay test que lo fija.

---

## E. DEFECTO 4 — EL ASSET, SU TEST, Y **UNA PARADA**

### E.1 · Lo medido antes

- El fixture de la lección traía **solo `report.json`, sin carpeta `assets/`**.
- **Ningún test de la suite mencionaba `iframe`.** Cero.
- La rama que convierte el panel en `iframe` solo dispara si el sondeo responde OK
  (`:1135-1146`), así que **nadie la había ejercitado nunca**.

### E.2 · Lo entregado

Dos HTML pequeños, honestos y **distinguibles entre sí**: `leccion-web.html` (documento que
se desplaza, claro) y `leccion-slide.html` (baraja oscura de tipografía grande). **Inertes por
construcción**: cero `<script>`, cero recurso remoto, cero imagen. Una previsualización es un
documento para LEER.

Las rutas declaradas se reapuntaron de `RUN-LESSONS-FRACCIONES-EQUIVALENTES-001/assets/` a
`RUN-QA-REPORT-LESSON-001/assets/`, que es la carpeta del run que el roadmap de QA sí declara
—en la otra, el pin de huérfanos de `reports-qa-fixture.test.mjs` rechazaba la carpeta— y
**el reporte vuelve a apuntar a assets que existen en disco**. Ambas copias byte-idénticas,
en la dirección buena: original `tests/fixtures/reports/` → copia `reports-qa/`.

**Tres tests nuevos** cubren lo que no existía: que los assets existen, difieren y son
inertes; que un sondeo OK convierte los dos paneles en `iframe` apuntando a la ruta declarada
sin alterarla; y que un sondeo fallido o en vuelo **no enmarca nada**.

### E.3 · PARADA — el `iframe` no está aislado, y este ticket no lo contempla

**Medido sirviendo el fixture de verdad** (`PC_REGISTRY=tests/fixtures/reports-qa`, puerto
8799):

| Medición | Resultado |
|---|---|
| El asset se sirve | `200 text/html; charset=utf-8` |
| Origen del asset | **el mismo que la consola** (`http://127.0.0.1:8799`) |
| `Content-Security-Policy` / `X-Frame-Options` / `frame-ancestors` | **ninguno** |
| Atributo `sandbox` en el `<iframe>` | **ninguno** (`:596`) |
| `POST` a la ruta de escritura con `Origin` del mismo origen | **422** — pasa la puerta |
| `POST` a la misma ruta con `Origin: https://evil.example` | **403** — la puerta la para |

Los dos últimos son la medición que importa: **el `Origin` es la única puerta de las tres
rutas de escritura**, y un documento enmarcado sin `sandbox` la cruza por definición, porque
*es* del mismo origen. Un asset de previsualización —**HTML que escribe un proyecto
cualquiera**, no esta consola— queda con acceso completo al DOM de la consola (incluido el
nombre que el operador teclea al firmar) y con `fetch` mismo-origen contra
`roadmap/edit`, `history/sync` y `project/emit`, que escriben en los repositorios del
operador.

Hasta ahora la rama no disparaba nunca porque ningún fixture traía assets, que es
exactamente por qué nadie lo había visto. **Los dos assets de este run son inertes y no
explotan nada**, pero la exposición general queda abierta en el momento en que un proyecto
emita una previsualización propia.

**NO SE ARREGLA AQUÍ Y SE PARA:** poner `sandbox` cambia lo que una previsualización legítima
puede hacer, y elegir su valor es una decisión de diseño que este encargo no contempla. La
recomendación medida, para quien la resuelva: `sandbox` **sin** `allow-same-origin` deja
renderizar HTML/CSS estático —los dos assets de este fixture pasarían tal cual— y corta a la
vez el acceso al padre y a las rutas de escritura. Este repositorio ya tuvo un incidente de
seguridad de `iframe` en `cantu-studio` («harden video iframe renderer», «re-audit video
iframe security repair»), lo que da precedente al riesgo.

---

## F. DEFECTO 5 — NOMBRADO, NO CONSTRUIDO

**`subject.feedback` no se construye aquí.** Medido en el fixture de auditoría: **cero de
nueve** ítems lo llevan, y **dos** (`R1`, `R2`) nombran `feedback` en su `unchanged`. El
reporte afirma que la retroalimentación no cambió **y nunca la enseña**, así que el operador
no puede verificar lo que el reporte asegura.

**Es del sobre y del emisor, y ya está aceptado por los dos hilos.** Se nombra y no se
construye.

**Lo que sí se comprobó al tocar la vista, porque el encargo lo pide:** pintarlo **no**
exigiría nada más que mostrar un campo presente. La tarjeta del ítem ya pinta por presencia
de campo (`item.statement` → bloque de contenido, `:668`), y `subject` ya se lee en la misma
función. Un `subject.feedback` presente entraría con una sección más del mismo patrón, sin
mecanismo nuevo, sin rama de dominio y sin tocar el modelo de pasos. **La única razón de que
no se vea es que el dato no llega.** Y su rótulo ya está escrito en los dos idiomas
(`feedback` → «Feedback» / «Retroalimentación», §C), porque la lista `unchanged` lo nombra:
el día que el emisor lo mande, la vista ya sabe cómo llamarlo.

---

## G. Criterios 6, 7 y 8 — verificados

**6 · El renderizador sigue siendo ciego al dominio.** Los tres tests de
`run-report-domain-blind.test.mjs` en verde. Antes de escribir un solo rótulo se comprobaron
**los 94 tokens vetados** contra las dos listas de rótulos nuevos (EN y ES) y contra las
claves de la tabla: **cero colisiones**. Ningún rótulo nuevo introduce una palabra de dominio,
así que no hubo que parar. Siguen prohibidas y ausentes las comparaciones contra
`type`/`kind`/`mode` y los literales de tipo de ítem.

**7 · La superficie del `#53` y el modelo de veredicto del `#54` no se rompen.**

| Suite | Resultado |
|---|---|
| `run-report-surface.test.mjs` | verde |
| `run-report-route-from-run.test.mjs` | verde |
| `run-report-verdict-model.test.mjs` | verde |
| `reports-qa-fixture.test.mjs` | verde (incluidas las copias byte-idénticas) |

**La base que midió el encargo anterior era 643/642/1: verificada idéntica al empezar.**

| | tests | pass | fail |
|---|---|---|---|
| Al empezar | 643 | 642 | 1 |
| Al cerrar | **659** | **658** | **1** |

Los 16 nuevos son la suite de este run. **El único fallo es el mismo de antes y es el pin de
`classification-care-budget.test.mjs:153`, que no se repara.**

**8 · Los fixtures de QA.** Se tocaron dos (`CASO-1`, `CASO-3`) y sus dos copias de
`reports-qa` se regeneraron **desde el original**, manteniendo la dirección de la copia. El
pin byte a byte pasa. Los assets nuevos cuelgan de la carpeta del run que el roadmap de QA
declara, así que el pin de huérfanos también.

---

## H. Cinco afirmaciones que fijaban el defecto, y por qué cambiaron

`run-report-renderer.test.mjs` afirmaba **la conducta defectuosa**: que el operador leía
`verification_reason`, `items_note` y `verification.exit` en pantalla, y que faltaban `12`
veredictos. No es que los tests se rompieran: **estaban fijando lo que el operador vino a
denunciar.** Cada uno se reescribió para exigir lo contrario —que la clave **no** llegue a la
pantalla, que el rótulo escrito sí, y que el valor declarado siga intacto— conservando la
intención con la que se escribieron.
