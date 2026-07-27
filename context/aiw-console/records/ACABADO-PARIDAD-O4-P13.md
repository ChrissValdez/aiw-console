# ACABADO DE PARIDAD — cuatro correcciones que cierran la migración de la consola

> `O4.P13`. Cierre del QA visual del operador sobre el port (`O4.P11`) y la escritura
> (`O4.P12`). **No es rediseño**: el rediseño por carriles es fase aparte y posterior, y aquí no
> se tocó ni un color, ni una tipografía, ni un componente, ni el esquema del roadmap.
>
> Fecha: 2026-07-27. **Ningún comando de git que escriba** — ni `init`, ni `commit`, ni `branch`,
> ni `checkout`, ni en este repo ni en uno temporal ni en `cantu-studio`. Git se ejecutó en SOLO
> LECTURA (`remote`, `symbolic-ref`, `for-each-ref`, `rev-parse`, `branch --show-current`, `log`,
> y en los tests `rev-list --count`), que es de donde sale el dato que History pinta.
> **No se arrancó el servidor propio de `cantu-studio`** (escribe al arrancar): se verificó por el
> servidor de esta consola, que no escribe al arrancar, y por lectura directa de disco.
>
> **Archivos escritos por este trabajo, y ninguno más:**
> `project-console/assets/project-console.js` · `project-console/assets/project-console.css` ·
> `tools/projector/project.mjs` · `project-console/serve.mjs` (una línea, coherencia con D) ·
> `tests/declared-sources-and-docs-mode.test.mjs` (nuevo) ·
> `tests/emitted-artifacts-declaration.test.mjs` (nuevo) ·
> `tests/git-history-default-branch.test.mjs` (nuevo) ·
> `tests/fixtures/declarado/**` (nuevo) · `tests/shell-two-real-projects.test.mjs` (una aserción,
> ver Bloque B) · los **seis** archivos bajo `.project/` de este repo y los **seis** de
> `cantu-studio` · la nota de `CONTRATO.md` §19 sobre la dependencia de máquina (**la única
> edición a un documento existente**) · este record.
> **No se tocó** el roadmap, `DECISIONES.md`, ningún record existente, el fork D-035
> (`docs/project-console/`), el prototipo retirado (`console/`) ni el tooling viejo
> (`tools/project-console/`).
> **`cantu-studio` no fue modificado fuera de su `.project/`** — verificado con `git status`
> antes y después: seis archivos, todos bajo `.project/`, ninguno más.

---

## BLOQUE A — El banner de fuentes opcionales dejaba de ser un aviso

### El defecto, medido

`showOptionalSourceNotice()` se encendía con `failedSources.length`. El renderer pide **quince**
rutas heredadas (la tabla `PATHS`); este emisor escribe **seis**. Las **nueve** restantes son
exactamente los archivos que §18.a dejó FUERA de `.project/` por no tener emisor. Fallan en cada
carga de cada proyecto, así que el banner estaba encendido **siempre**, en los dos proyectos
reales, sin que faltara nada.

Un aviso permanente no avisa. Es la falla que §20 quiere impedir, llegada por el otro lado: no un
silencio, un ruido constante. Y peor: el día que falle algo de verdad, el banner ya está puesto.

### Por qué `sources` no servía como referencia — y qué se hizo en su lugar

El encargo apuntaba a `sources` del snapshot como "la declaración" del proyecto. **Medido: no lo
es.** `sources` es lo que §6 dice que es —las ENTRADAS de las que el artefacto se derivó, con su
`mtime`— y en disco lo demuestra:

| Proyecto | `snapshot.sources` |
|---|---|
| aiw-console | `roadmap/roadmap.json`, `package.json` |
| cantu-studio | `.aiw/roadmap/roadmap.json` |

Ninguna de esas rutas es un archivo de `.project/`. Usar `sources` como lista de lo emitido
habría dado "cero artefactos declarados" en los dos proyectos, que es la condición cosmética
prohibida: apagaría el banner para siempre. Y no se puede deducir del HTTP: una fuente declarada
que se borró y una nunca emitida devuelven el **mismo 404**.

Así que la declaración se **transporta de verdad**, con el mismo patrón que el encargo pedía
(el proyecto declara, el consumidor obedece — D-049): el snapshot gana una clave nueva,
`emitted_artifacts`, y el consumidor la lee.

```json
"emitted_artifacts": [
  { "artifact": "guardrails",  "path": ".project/guardrails.json" },
  { "artifact": "no_claims",   "path": ".project/no_claims.json" },
  { "artifact": "docs_index",  "path": ".project/docs_index.json" },
  { "artifact": "roadmap",     "path": ".project/roadmap.json" },
  { "artifact": "git_history", "path": ".project/git_history.json" },
  { "artifact": "snapshot",    "path": ".project/snapshot.json" }
]
```

Cuatro propiedades, cada una deliberada:

1. **Se construye de lo que se escribió**, no de una lista. `writeProjectFolder` la arma a partir
   de su propio registro de escrituras, así que un root sin Git declara cinco archivos y no seis,
   y un root sin `governance/` declara tres. Probado con un fixture temporal: 3 artefactos, y
   `git_history.json` ausente de la declaración **y** del disco.
2. **Construido suelto, el snapshot OMITE la clave.** Un snapshot que no salió de una emisión de
   carpeta no tiene respuesta honesta; una lista vacía sería la afirmación "este proyecto no emite
   nada". §7 aplicado a una clave.
3. **El consumidor sin declaración no estrecha nada.** Un snapshot viejo (sin la clave) hace que
   *cualquier* fallo encienda el banner — la dirección ruidosa. No poder distinguir no es licencia
   para callar.
4. **El emparejamiento es por sufijo de ruta**, no por nombre: la declaración es relativa al repo
   (`.project/roadmap.json`) y la ruta pedida es la virtual del shell
   (`/projects/<key>/.project/roadmap.json`). Cero identidad de proyecto en el código.

### Qué hace ahora el banner, y qué hace Console Diagnostics

El banner se enciende **sólo** por fuentes declaradas que no cargaron —y **nombra el archivo**,
que es lo que §20 exige y el texto agregado nunca hizo—. Console Diagnostics distingue las tres
situaciones que existen:

| Estado | Etiqueta en el panel | Qué es |
|---|---|---|
| declarada y cargada | `Loaded` | el proyecto la prometió y está |
| declarada y fallida | `Failed`, bajo *Declared sources that failed to load* | **la ausencia real** (§20) |
| no declarada | `Not emitted`, bajo *Not emitted by this project* | inexistencia por diseño (§18) — nunca se prometió |

Una ruta que **cargó** se reporta cargada, la declare quien la declare: lo que hay en disco es una
medición y ninguna declaración la contradice.

### Conteos, antes y después, en los dos proyectos reales

Medidos en el DOM del navegador (Status → Console Diagnostics), viewport 1280:

| | aiw-console antes | aiw-console después | cantu-studio antes | cantu-studio después |
|---|---|---|---|---|
| Loaded | 6 | 6 | 6 | 6 |
| Failed | **9** | **0** | **9** | **0** |
| Not emitted | — (el estado no existía) | **9** | — | **9** |
| Banner | **encendido** | **apagado** | **encendido** | **apagado** |

Las nueve son, en los dos proyectos, exactamente las nueve de §18.a: `project.json`,
`state/project_status.json`, `state/component_status.json`, `state/events.jsonl`,
`ledgers/change_ledger.jsonl`, `ledgers/git_provenance.jsonl`, `ledgers/human_qa.jsonl`,
`ledgers/ai_reviews.jsonl`, `guardrails/project_memory.jsonl`.

**El banner sigue siendo alcanzable.** Fixture `tests/fixtures/declarado/falta-uno`: declara
`docs_index.json` y el archivo no está. El banner se enciende y dice
`projects/falta-uno/.project/docs_index.json` — y **no** menciona ninguna de las nueve, que
fallaron en esa misma carga.

---

## BLOQUE B — El modo de apertura de Docs lo decide el DATO

### El defecto

Cantu abre en `newera`, que filtra por `operator_review_status`. La consola global abría en `all`
para todos los proyectos, decisión tomada en O4.P11 Bloque G porque el índice de **este** proyecto
no lleva el campo y en `newera` su pestaña salía vacía. El razonamiento era correcto sobre este
proyecto y falso como regla: aplicado a todos, aplastaba la curaduría de quien **sí** tiene el
campo. Medido: cantu-studio, **38 de 140** documentos revisados, mostrados como 140.

### La corrección

El modo inicial se deriva de la **presencia del campo** en el índice del proyecto activo, con el
mismo predicado que usa el filtro (`hasOperatorReviewStatus`), así que un proyecto abre en
`newera` exactamente cuando ese modo tiene algo que mostrar. Se resuelve **una vez por carga de
proyecto** (`docsOpeningModeResolved`), de modo que un repintado posterior no pisa un modo que el
operador haya cambiado a mano, y se reinicia con el resto del estado por proyecto.

Verificado en DOM, contando filas `docs-nav-item` del árbol:

| Proyecto | Campo en el índice | Modo de apertura | Documentos listados | Índice completo |
|---|---|---|---|---|
| cantu-studio | sí, en 38 entradas | `newera` | **38** | 140 |
| aiw-console | en ninguna | `all` | **34** | 34 |

Los 38 son los mismos que muestra su consola local. Los tres conteos de cantu son distintos
—140 registrados / 53 `default_visible` / 38 revisados—, así que la aserción no puede pasar por
casualidad.

### Cero `operator_review_status` inventado

No se escribió el campo en ningún proyecto, ni se rellenó, ni se simuló. `grep` sobre los índices
emitidos: **0 ocurrencias** en `aiw-console/.project/docs_index.json`; **111** en el de
cantu-studio, que son las suyas y ya estaban. Hay un test que vuelve a leer el índice emitido
después de renderizar y comprueba byte a byte que renderizar no lo modificó.

### El control de modo NO está expuesto (medido)

`index.html` no contiene ningún elemento con `data-docs-mode`: el control *New era / Primary KB /
All registered* fue retirado de la UI en el acabado anterior y sólo queda su listener vivo. Se
dice aquí porque es justamente lo que obliga a derivar el modo de apertura del dato: **el modo con
el que un proyecto abre es el único que su operador puede alcanzar.** Exponer el control otra vez
es trabajo del rediseño, no de este acabado.

---

## BLOQUE C — El ancho: sólo ancho y espaciado

### El defecto

El CSS trasplantado venía de una consola **sin menú lateral** y traía una columna centrada de
1200px (1600px en monitores ≥1600). Bajo este shell el sidebar ya se lleva 256px, y el tope se
aplicaba encima: el contenido quedaba encogido y sobraba pantalla, sobre todo en
Roadmap → Roadmap, cuyas tarjetas de objetivo son lo más ancho que hay.

### La corrección

Dos tokens y nada más:

- `--pc-content-max: 1200px` → **`100%`** (y se retira el override a `1600px` del bloque de
  monitores anchos).
- `--pc-content-pad: 20px`, nuevo, que sustituye los `32px` (y los `48px` del bloque ancho) del
  encabezado, la columna de contenido y el banner, para que los tres no puedan desalinearse.

**`100%` y no `none`, por medición.** La columna es un flex item de un contenedor que scrollea; sin
techo se estira al ancho intrínseco de la fila más ancha y el panel scrollea de lado — a 1280 el
Run Queue llegaba a 1437px dentro de un panel de 1018px. Ese scroll lateral **no era nuevo**: con
el tope de 1200px también ocurría (1264px). `100%` es lo que lo termina, poniendo como techo el
espacio realmente disponible en vez de un número.

### Medido en DOM, aiw-console, antes → después

| Viewport | Caja de contenido | Tarjeta de objetivo (Roadmap→Roadmap) | Run Queue | Padding lateral |
|---|---|---|---|---|
| 1280 | 954 → **978** | 954 → **978** | 1200 *(con scroll lateral)* → **978 (sin)** | 32 → **20** |
| 1920 | 1562 → **1618** | 1562 → **1618** | 1600 *(con scroll lateral)* → **1618 (sin)** | 48 → **20** |
| 2560 | 2202 → **2258** | 1600 → **1760** | 1600 → **1891** | 48 → **20** |

A 2560 es donde más se ve lo que el tope costaba: Overview pasa de 1600 a **2264**, History y
Status de 1600 a **2258**.

Barrido completo a 1280 en los dos proyectos, **cinco pestañas y las dos subvistas de Roadmap**,
con banner visible y sin él: `contentScrollWidth === contentClientWidth` en los catorce estados
(sin scroll horizontal), `documentElement.scrollWidth === clientWidth` (sin scroll de página), y
el banner alineado con la columna (ancho 978, borde izquierdo 276, el mismo que los paneles) sin
solaparse con ninguno.

### El diff del CSS

Ocho cambios de declaración, **todos de ancho, margen o padding**, más comentarios:

| Línea | Antes | Después |
|---|---|---|
| `:root` | `--pc-content-max: 1200px` | `--pc-content-max: 100%` |
| `:root` | — | `--pc-content-pad: 20px` (nuevo) |
| `.project-header` | `padding: 0 max(32px, calc((100% - var(--pc-content-max)) / 2))` | `padding: 0 var(--pc-content-pad)` |
| `.content` | `padding: 28px 32px` | `padding: 28px var(--pc-content-pad)` |
| `@media (min-width: 1600px) :root` | `--pc-content-max: 1600px` | *(retirada)* |
| `@media (min-width: 1600px) .content` | `padding: 38px 48px` | `padding-top/bottom: 38px` |
| `.content:has(> #tab-docs.active) > #load-notice` | `margin: 28px 32px 16px` | `margin: 28px var(--pc-content-pad) 16px` |
| `@media (max-width: 1040px) .content:has(...)` | `padding: 28px 32px` | `padding: 28px var(--pc-content-pad)` |

**Cero** cambios de color, tipografía, jerarquía, componentes o estructura. El escalado de tipos
del bloque de ≥1600px queda intacto; de ese bloque sólo salieron sus dos declaraciones de ancho.

---

## BLOQUE D — `git_history` acotado a la rama por defecto (decisión CERRADA)

§19 registró como HECHO que éste era el único artefacto cuyo contenido dependía de la máquina, y
dejó su resolución **ABIERTA y nombrada**. Se cierra: **se acota a la rama por defecto del
repositorio, detectada.**

### Cómo se detecta (sin hornear ningún nombre)

1. Lo que declara un remoto como su HEAD: `refs/remotes/<remote>/HEAD`, remotos en el orden de
   `git remote`. Es la afirmación del repositorio sobre cuál es su tronco.
2. Si ninguno declara una (o la declarada no está bajada como rama local), la rama en la que está
   el checkout.
3. Si el HEAD está desprendido, la única rama local, si hay exactamente una.
4. Si nada resuelve, **no se emite el archivo**: mejor una ausencia anunciada que una rama elegida
   al azar.

**En el emisor no aparece la palabra `main`.** Un repo cuyo tronco se llame `trunk` o `master`
funciona sin tocar código, y hay tests que lo ejercitan con las tres palabras.
`init.defaultBranch` **no se consulta**: es la preferencia global del operador para repos NUEVOS
—en esta máquina dice `master`, que no existe en ninguno de los dos repos— y leerla cambiaría una
dependencia de máquina por otra.

### Qué cambia en el artefacto

- `default_branch` (la rama detectada) y `branch_scope: "default_branch"` (la regla), nuevos: el
  lector no tiene que inferir de una lista de un elemento si el repo tiene una rama o si el emisor
  emitió una.
- `head` pasa a ser la punta de esa rama, no la del checkout.
- **`current_branch` desaparece.** Nombraba el checkout que corrió el emisor, que es el dato que
  se está quitando. El lector ya cae a su propio default cuando la clave falta
  (`historyDefaultBranch`), y hay test de que la rama que abriría está en la lista que recibe.

### Antes y después, medido

| Repo | Ramas locales | Ramas en el remoto | Ramas emitidas antes → después | Commits antes → después |
|---|---|---|---|---|
| aiw-console | 6 | 1 (`main`) | 6 → **1** (`main`) | 71 → **43** |
| cantu-studio | 2 | 4 | 2 → **1** (`main`) | 916 → **461** |

Los commits emitidos son los reales de esa rama: los tests lo comprueban contra
`git rev-list --count <rama>` y `git rev-parse <rama>`, calculados aparte del emisor. History
pinta: una pestaña de rama, 43 filas de commit en aiw-console y 461 en cantu-studio, verificado en
el DOM del navegador.

### La divergencia, declarada

Es **divergencia deliberada respecto a la consola de Cantu**, que muestra todas las ramas. El costo
está aceptado y dicho: quien tenga ramas de trabajo bajadas **ya no las ve en History**. El trabajo
no se pierde ni se oculta —sigue en `git`—; deja de publicarse en un artefacto derivado que
prometía ser reproducible entre máquinas. A cambio, una diferencia de conteo entre dos máquinas
vuelve a ser señal (§6) en vez de ruido esperado.

**El acotado es de LECTURA.** No se creó, movió, borró ni renombró ninguna rama en ningún repo.

---

## BLOQUE E — Verificaciones que este trabajo debía dejar hechas

| Qué | Cómo se comprobó | Resultado |
|---|---|---|
| Aditividad del camino viejo | proyección en memoria del kernel AIW con `now` fijo, con el emisor 0.7.0 y con el 0.8.0, `diff` de ambos JSON | **idénticos salvo `generated_from`** (`aiw-projector@0.7.0` → `@0.8.0`), una línea en el snapshot y una en el roadmap. Nada se escribió en `aiw/`. |
| Canónicos reales | no se tocan: el emisor sólo escribe bajo `.project/`, tras su guarda de ruta | sin cambios |
| `cantu-studio` fuera de `.project/` | `git status --porcelain` antes y después | seis archivos modificados, **todos** bajo `.project/` |
| Identidad de proyecto horneada | `grep -inE "cantu\|jame\|aiw-console\|aiw_console"` sobre los tres archivos tocados | **0** en el CSS; **0** en el JS; en `project.mjs`, dos comentarios que citan la ruta `context/aiw-console/CONTRATO.md` (preexistentes, documentación, no comportamiento) |
| Suite | `node --test` | **178 pasan, 0 fallan** (eran 151) |

**Una anotación honesta sobre `"main"`:** aparece dos veces en el renderer
(`project-console.js`), en `historyDefaultBranch` y en el tinte de la pastilla de rama. Son
preexistentes, están en el CONSUMIDOR y son convención de visualización, no identidad de proyecto;
este trabajo no las tocó y no las necesita. El EMISOR, que es donde la decisión de D vive, no
contiene ninguna.

**Una diferencia que no es de este trabajo:** el `docs_index.json` de este repo pasó de 32 a 33
entradas al re-emitir. La entrada nueva es
`context/aiw-console/records/ESCRITURA-CONSOLA-GLOBAL-O4-P12.md`, un record escrito **después** de
la última emisión: el índice estaba viejo, no creció por nada de lo que se hizo aquí. Este record
lo lleva a **34**, que es el número con el que Docs abre en las mediciones finales.

---

## BLOQUE F — Tests nuevos

| Archivo | Qué prueba |
|---|---|
| `tests/declared-sources-and-docs-mode.test.mjs` (11) | banner contra lo declarado: apagado con todo presente, encendido **y nombrando** con un declarado ausente, los tres estados de Diagnostics separados, la caída ruidosa sin declaración, la declaración que no cruza proyectos; y el modo de Docs por presencia del campo, en fixtures y en los dos proyectos reales, con la comprobación de que nada escribe `operator_review_status` |
| `tests/emitted-artifacts-declaration.test.mjs` (5) | la declaración es el conjunto **escrito**, no una lista; un root sin Git no declara `git_history`; suelto se omite la clave; el snapshot sigue llevando todo lo que llevaba y `sources` sigue significando entradas |
| `tests/git-history-default-branch.test.mjs` (11) | la cadena de detección con un lector inyectado (**sin repositorio**: nada de `init`, `commit` ni `checkout`), incluidos tres nombres de tronco distintos; y el artefacto contra los dos repos reales, en solo lectura, con el conteo y el head comprobados aparte del emisor |
| `tests/fixtures/declarado/**` | cuatro `.project/` a mano: `todo-presente`, `falta-uno`, `sin-declaracion`, `con-revision` |

Una aserción existente cambió, en `tests/shell-two-real-projects.test.mjs`: la que decía que tras
un cambio de proyecto Docs vuelve a listar el índice **entero**. Codificaba el default global que
el Bloque B mueve a propósito. Ahora afirma que vuelve al modo que decide el índice del proyecto
(38 para cantu-studio), y sigue fallando si el modo "sucio" (`primary`, 53) sobrevive al cambio —
los tres conteos son distintos, así que no pasa por casualidad.

---

## BLOQUE G — Qué queda ABIERTO

1. **`emitted_artifacts` no está en el contrato.** La clave nueva vive en el emisor, en el
   consumidor y en los tests, pero §3 sigue enumerando las claves del snapshot sin ella y §19
   sigue describiendo los cinco opcionales sin mencionar que ahora se declaran. Este encargo
   permitía **una sola** edición a un documento existente (la nota de §19 sobre la dependencia de
   máquina), así que la deuda se nombra aquí en vez de dejar que la tabla parezca completa —
   exactamente el tratamiento que §19 se dio a sí mismo cuando tres opcionales entraron sin
   declarar su degradación. Entra por la puerta de §8/§18.b: clave nueva, opcional, con su
   degradación declarada (sin ella el consumidor no estrecha y avisa de todo).
2. **El default declarado por el remoto que no está bajado localmente.** Hoy el emisor cae a la
   rama del checkout. Leer el ref remoto en su lugar reintroduciría "qué se ha fetcheado". Se
   decide el día que exista un checkout así; hoy no lo hay en ninguno de los dos repos.
3. **El control de modo de Docs sigue sin estar en la UI.** Medido en el Bloque B. Volver a
   exponerlo —y con él la posibilidad de que el operador salga del modo de apertura— es del
   rediseño.
4. **El scroll lateral del Run Queue a anchos estrechos.** Resuelto a 1280 y por encima (Bloque C),
   pero la causa de fondo sigue ahí: la fila del Run Queue tiene un ancho mínimo intrínseco alto.
   Por debajo de ~1000px de columna volvería a aparecer. Es trabajo del rediseño, no de un cambio
   de tokens.
5. **El bloque de escala de ≥1600px** sigue siendo una regla de presentación heredada del port,
   con su escalado de tipos. Este trabajo sólo le quitó las dos declaraciones de ancho; revisarlo
   entero es del rediseño.
