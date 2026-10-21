# CLASIFICACIÓN DE RUNS — especificación canónica

> **Documento normativo y TRANSVERSAL a todos los proyectos**: los que lista el
> registro de la consola (`project-console/projects.json`). Vive en `context/` y no en
> la carpeta de ningún proyecto porque
> **la clasificación es del RUN, no del repo que lo aloja**: un run se clasifica
> igual viva en el roadmap que viva, y el mismo vocabulario rige en todos. (Enmendado
> el 2026-10-21 por `RUN-CONSOLE-STALE-TEXTS-REPAIR-003`: nombraba «los tres
> proyectos» `aiw`, `aiw-console` y `cantu-studio`, y el registro ya lista más.)
>
> **Es DOCTRINA, no estado.** Aquí no hay una sola cifra de cuántos runs existen,
> cuántos están clasificados ni en qué status están: **el estado vive en el
> roadmap** y se mide allí. Este archivo dice qué significan los campos y cómo se
> derivan los valores que no se almacenan.
>
> **Tampoco vive en un handoff.** Los handoffs son efímeros y se sobrescriben
> ([[D-038]]); doctrina metida en uno es estado que se pudre.

**Alcance de este documento:** publica el vocabulario, las dos tablas de
derivación, las combinaciones ilegales, la separación de los dos ejes y la tabla
de `care_budget`. **No añade ningún campo a ningún esquema y no clasifica ningún
run** — eso es trabajo de los runs siguientes, no de éste.

**Idioma.** La prosa va en español, como el resto de `context/`. **Los tokens del
vocabulario van en inglés y verbatim** (`SPECIFIED`, `COSMETIC`, `LOCAL`, `LOUD`,
`UNATTENDED`, …): son valores de datos que un esquema y un validador leerán tal
cual, no palabras de prosa. No se traducen ni se castellanizan.

---

## 1. Los cinco campos ALMACENADOS

Cuatro campos de clasificación medida, más una lista de guarda. **Todos son
OPCIONALES en el esquema**, sin excepción.

- **`correctness_model`** — `SPECIFIED` · `JUDGED_ACCEPTS` · `JUDGED_DEFINES`
- **`work_type`** — `COSMETIC` · `FUNCTIONAL` · `FOUNDATIONAL`
- **`blast_radius`** — `LOCAL` · `ADJACENT` · `SYSTEMIC` · `PROJECT_SHAPE`, medido
  **contando consumidores presentes y planificados**
- **`failure_surfaces`** — `LOUD` · `VISIBLE` · `SILENT`
- **`external_effects`** — **lista de guarda, vacía por defecto**

Más **`classified_at`**, la marca de cuándo se clasificó.

**El validador REPORTA los runs vivos sin clasificar; NO rechaza.** La ausencia de
clasificación es información que la consola muestra, no un error que impida nada.

## 2. Los dos DERIVADOS — `severity` y `closure_mode`

**`severity` y `closure_mode` son DERIVADOS y NUNCA se almacenan.** Se calculan al
leer, a partir de los campos de §1. Almacenarlos crearía la segunda copia que se
pudre; publicar aquí su función de derivación es lo que impide que dos
consumidores deriven distinto y muestren dos verdades.

### 2.1 `severity` — tabla `work_type` × `blast_radius`

| | `LOCAL` | `ADJACENT` | `SYSTEMIC` | `PROJECT_SHAPE` |
|---|---|---|---|---|
| `COSMETIC` | MINOR | MINOR | MODERATE | MODERATE |
| `FUNCTIONAL` | MODERATE | MODERATE | MAJOR | MAJOR |
| `FOUNDATIONAL` | MAJOR | MAJOR | CRITICAL | CRITICAL |

Sobre el resultado de esa tabla se aplica **un solo ajuste**, el de
`failure_surfaces`:

- `LOUD` → **−1**
- `VISIBLE` → **0**
- `SILENT` → **+1**

**saturando entre `MINOR` y `CRITICAL`** — el ajuste nunca sale de la escala.

### 2.2 `closure_mode`

| Entrada | `closure_mode` |
|---|---|
| `SPECIFIED` + MINOR / MODERATE | `UNATTENDED` |
| `SPECIFIED` + MAJOR / CRITICAL | `SEMI_ATTENDED` |
| `JUDGED_ACCEPTS` | `SEMI_ATTENDED` |
| `JUDGED_DEFINES` | `ATTENDED` |

**Guarda:** `external_effects` **no vacía → `SEMI_ATTENDED` como mínimo.** La
guarda sube el modo de cierre; nunca lo baja.

## 3. Las tres combinaciones ILEGALES

**La consola las RECHAZA:**

- `SPECIFIED` + `FOUNDATIONAL`
- `FOUNDATIONAL` + `LOUD`
- `JUDGED_*` + `UNATTENDED`

## 4. DOS EJES, NO UNO — la decisión de mayor alcance

**Es la decisión de mayor alcance de todo el sistema, y el resto de este documento
solo cobra sentido bajo ella.**

- **El CIERRE se DERIVA** —qué hace falta para cerrar un run— de la clasificación
  del run, por las tablas de §2.
- **La DELEGABILIDAD se DECLARA a nivel de PROYECTO**, no run por run: si AIW
  puede ejecutar ese trabajo o no.

Son dos preguntas distintas y colapsarlas en una es lo que produjo el desorden que
este documento existe para cerrar. **En el workspace existen cuatro vocabularios
en competencia para este eje, y un run `planned` del roadmap de `aiw` está a punto
de construir uno de ellos: separar los dos ejes es lo que impide que se añada un
quinto.**

**AIW ya declara la suya POR ESCRITO:** todo run de su roadmap es **manual** bajo
la **regla anti-auto-hosting**, con **`aiw-console` como la excepción explícita**.
Esa declaración es del proyecto, está escrita, y no se re-decide run por run.

**La separación es transversal; su ejecución no lo es.** La decisión se registra
una sola vez, en `context/DECISIONES.md`, y **se ejecuta en cada hilo por
separado**.

> **Enmienda del 2026-10-19 — decisión (D) del operador, run `#68`.** Se numera en
> `context/DECISIONES.md` al cerrar el run; el encuadre y el verbatim están en
> `context/aiw-console/records/ENCUADRE-PARADA-68-2026-10-19.md`. **El texto de arriba se
> conserva tal como se publicó**; esta enmienda lo completa y, donde choca, manda ella.
>
> **El proyecto abre o cierra la puerta a AIW; dentro de un proyecto abierto deciden la clase
> de trabajo (§9), cómo se verifica (`correctness_model`, §1) y la relación con los otros runs
> (§10).** La delegabilidad deja de ser SOLO del proyecto. El proyecto sigue declarando una vez,
> por escrito, si AIW puede entrar —y lo que AIW declaró arriba sobre su propio roadmap sigue en
> pie—, pero con la puerta abierta no todo run del proyecto va a AIW. §11 dice qué combinación
> apunta a qué vehículo.
>
> **Por qué:** un proyecto tiene fases donde AIW rinde mucho y fases donde no ([[D-074]]). AIW
> resuelve trabajo SECUENCIAL —cadena y misma superficie—, rinde en funcionalidad y
> documentación, ocasionalmente en investigación y rara vez en UX; el contenido va en paralelo.
>
> **Lo que NO cambia: siguen siendo dos ejes.** El CIERRE se sigue DERIVANDO solo de §2, y ni la
> clase ni la relación entran en ninguna tabla de derivación. Lo que se decide dentro del
> proyecto es a quién va el run, no qué hace falta para cerrarlo.

## 5. `care_budget` — CONFIGURACIÓN POR PROYECTO, no regla dura

**`care_budget` es configuración POR PROYECTO, editable desde la consola.** Se
declara aquí explícitamente: **es CONSEJO, no regla dura.** No bloquea nada, no
condiciona el cierre y un proyecto puede fijar la suya distinta.

| `severity` | `care_budget` |
|---|---|
| MINOR | Opus · Alto |
| MODERATE | Opus · Extra |
| MAJOR | Opus · Max |
| CRITICAL | Fable · Max |

## 6. Qué se clasifica y qué no

- **Los runs `completed` NO se clasifican.**
- **Un puñado PUEDE clasificarse como CALIBRACIÓN**, siempre que **se declare como
  tal**. Clasificar un cerrado sin declararlo calibración no es lo mismo que
  clasificarlo: la calibración existe para tarar el criterio, no para poblar
  campos.

## 7. Runs mixtos — PENDIENTE

**Las tres reglas mecánicas para runs mixtos fueron acordadas en la auditoría de
cabina del 2026-07-29/30, NO SE LOCALIZARON EN DISCO al publicar este documento, y
se incorporan por CORRECCIÓN HACIA ADELANTE.**

Este documento **no las reconstruye**. No se infieren «por coherencia» con el
resto del sistema, no se deducen de las tablas de §2 y no se aproximan: una regla
inventada que se lea como acordada es peor que un hueco declarado. **El hueco
queda declarado aquí y se cierra con una entrada nueva y una sección nueva, sin
reescribir nada de lo ya publicado.**

Lo único que consta en disco sobre ellas es **la mención** en el `full_description`
del run que publica este documento —«the three mechanical rules for mixed runs»—,
que dice que existen y que se publican, pero no dice cuáles son. La búsqueda
practicada y su resultado están registrados en
`context/aiw-console/records/PUBLICACION-CLASIFICACION-DE-RUNS.md`.

> **Nota hacia adelante, 2026-10-19 (run `#68`).** **Para el eje de la CLASE de trabajo el hueco
> queda CERRADO:** un run que mezcla clases lleva la clase que decide cómo se va a revisar
> —decisión (C) del operador, escrita en §9.2—. **Para los campos de §1 el hueco sigue
> abierto:** las tres reglas mecánicas de la auditoría del 2026-07-29/30 siguen sin localizarse.
> La regla (C) no es una de ellas reconstruida y no se aplica a `correctness_model`, `work_type`,
> `blast_radius` ni `failure_surfaces`.

## 8. Procedencia

El sistema **nació en el hilo de `cantu-studio`**, que midió que **el tipo de
trabajo que representa un run no estaba declarado en ninguna parte**, y **se cerró
en la auditoría humana de cabina del 2026-07-29/30**.

Hasta la publicación de este documento **existía solo como texto pegado en dos
conversaciones de cabina**: ningún ticket podía citarlo, ningún run podía depender
de él, y la consola no podía referenciar la tabla de derivación que debe
implementar. **Este documento es su casa.**

El texto de §1–§3, §5 y §6 se transcribe de la copia provisional que viajaba en
`context/handoffs/aiw-console.md`, sección «EL SISTEMA DE CLASIFICACIÓN —
PROVISIONAL, y es la excepción declarada», que **era la única copia existente** y
que **ordenaba ella misma su propia sustitución por un puntero** en cuanto este
documento existiera. Esa sustitución está ejecutada.

**Lo que este documento NO hace, y es deliberado:** no añade campos a ningún
esquema —del roadmap, del emisor o del validador—, no clasifica ningún run, no
declara la delegabilidad de ningún proyecto que no la tuviera ya declarada por
escrito, y no toca código ni tests. **Es papel.** El esquema es el run siguiente y
la clasificación el de después.

**Los punteros a este documento en `aiw` y en `cantu-studio` son trabajo de SUS
hilos.** Aquí solo se nombran.

---

## 9. La clase de trabajo — `work_class`

> **Añadida hacia adelante el 2026-10-19** (run `#68`, decisiones (A) y (C) del operador). No
> reescribe nada de §1–§8.

**Es la pregunta que faltaba: ¿de qué CLASE es el trabajo?** `work_type` (§1) no la contesta:
mide qué tan PROFUNDO es el cambio (`COSMETIC` · `FUNCTIONAL` · `FOUNDATIONAL`), no de qué clase
es. Leerlo como clase es lo que archivó revisiones de contenido como `FUNCTIONAL` por falta de otro
valor. Son dos preguntas independientes y ninguna se infiere de la otra.

Es un campo ALMACENADO nuevo, **OPCIONAL y ausente por defecto** como los de §1, con un
**vocabulario cerrado de cinco valores, iguales para todos los proyectos**:

| token | clase | qué es | cómo se revisa, de ordinario |
|---|---|---|---|
| `FUNCTIONALITY` | funcionalidad | código o configuración que cambia lo que el sistema HACE: motor, emisor, operaciones, rutas, migraciones del dato, retiro de herramientas | por su comportamiento: tests, invariantes, validador |
| `DOCUMENTATION` | documentación | texto que describe o norma el sistema: doctrina, contratos, records, README, gobernanza, la prosa del roadmap | leyéndolo contra el disco |
| `RESEARCH` | investigación | medir, auditar o explorar para producir hallazgos; el entregable es lo descubierto (un record, una lista de hallazgos, runs nuevos), no un cambio | leyendo los hallazgos y su evidencia |
| `UX_DESIGN` | diseño UX | cómo se ve y se usa una superficie; se define con el ojo del operador, de ordinario en varias rondas | QA visual del operador |
| `CONTENT` | contenido | piezas del producto que consume el usuario final del proyecto —lecciones, quizzes, reactivos—; ningún ítem depende de otro | ítem por ítem, contra el criterio de contenido de su proyecto |

**`UX_DESIGN` lleva su `UX` a propósito.** El diseño de un esquema, de un plan o de una
arquitectura NO es esta clase: se revisa leyendo, y es `DOCUMENTATION` (o `RESEARCH`, si su
producto son hallazgos). Un token de «diseño» a secas lo atraería.

**`FUNCTIONALITY` no es `FUNCTIONAL`.** El primero es una clase (§9), el segundo una profundidad
(`work_type`, §1). Los dos vocabularios no comparten ningún token, así que un valor escrito en el
campo equivocado se RECHAZA nombrándolo, en vez de pasar en silencio.

### 9.1 La clase es del TRABAJO, no del TEMA

Es una precisión de lectura de la decisión (A), no una regla nueva: el campo es la clase del
trabajo. Un run que construye una pantalla de la consola para revisar lotes de contenido no es
`CONTENT`, porque su trabajo es una pantalla. Un run que traduce la prosa del roadmap tampoco es
`CONTENT`, porque el roadmap no es producto para el usuario final. Se clasifica lo que el run hace,
no de qué habla.

### 9.2 Runs mixtos — la regla (C)

**Un run que mezcla clases lleva la clase que decide cómo se va a revisar.** Si en un run de
código y su documentación lo que decide es que pasen los tests, es `FUNCTIONALITY`. Si en un run
de doctrina y del código mecánico que la traduce lo que decide es leer la doctrina, es
`DOCUMENTATION`. Esta regla cierra el hueco de §7 para este eje.

**Lo que la regla NO decide, medido en el piloto del `#68`. Este documento no lo rellena:**

- Cuando dos revisiones pesan igual y las dos son obligatorias, «la que decide» no elige sola.
  Queda a juicio de quien clasifica: no hay regla, y no se infiere ninguna.
- Un run que no mezcla clases, pero que se revisa de una forma que no es la ordinaria de su clase
  (por ejemplo, una verificación de funcionalidad hecha con QA visual), no es un run mixto: lleva
  la clase de su trabajo (§9.1). Si la clase se leyera como «el modo de revisión», sería una copia
  de `correctness_model`.

### 9.3 La clase NO mueve `classified_at`

**`classified_at` sigue siendo la marca de §1:** cuándo se juzgaron los campos de los que se deriva
el cierre. Escribir o limpiar la clase no la estampa ni la borra. Consecuencias:

- escribir la clase en un run clasificado hace semanas no borra cuándo se hizo su juicio de §1;
- un run vivo que solo lleva la clase sigue en la lista de §1 de runs sin clasificar, y la lista
  dice que lleva `work_class` (no lo reporta como intacto).

Decidido por el operador el 2026-10-19.

### 9.4 Lo que la clase NO hace

- **No entra en ninguna derivación de §2:** ni `severity` ni `closure_mode` la leen.
- **No añade ninguna combinación ilegal a §3:** toda clase es legal junto a cualquier valor de §1.
- **No es la relación entre runs:** esa se deriva (§10) y no se almacena.

### 9.5 Cómo se valida y cómo se escribe

- **Ausente es legal**, y el validador no reporta nada por su ausencia.
- **Presente fuera del vocabulario se RECHAZA, nombrando el valor**, igual que las claves de §1.
  Eso incluye `null`, la cadena vacía y un token en minúsculas.
- Se escribe con la misma operación que las de §1 (`set-classification`); `null` o vacío la borran
  entera.
- Viaja con el run, y su vocabulario viaja declarado en el envelope como los de §1.
- **Clasificar con la clase un run `completed` sigue §6:** solo como calibración declarada.

### 9.6 Herramientas con allowlist propia

Una clave nueva del motor global no llega sola a las herramientas locales que llevan su propia lista
de claves. **Medido al publicar esta sección:** el motor y el validador locales de `cantu-studio`
rechazan `work_class` si un run suyo la llevara, como ya rechazan `batch` y
`depends_on_human_approved`. Tolerarla es trabajo de su hilo, cuando quiera clasificar sus runs.
Desde aquí no se clasifica ningún run de otro proyecto.

## 10. La relación entre runs — DERIVADA, no almacenada

> **Añadida hacia adelante el 2026-10-19** (run `#68`, decisión (B) del operador, en la lectura
> que eligió tras la parada del taller). No reescribe nada de §1–§8 ni de [[D-051]].

**La relación NO es un campo.** Casi entera ya estaba en el dato; esta sección escribe qué
significa:

| relación | de dónde se deriva | qué significa |
|---|---|---|
| **cadena** | `depends_on` (y `depends_on_human_approved`) | el run 2 necesita al run 1: van en serie, en ese orden |
| **misma superficie, en serie** | el mismo carril DECLARADO (`lane`, [[D-051]]) | no dependen uno del otro, pero no corren a la vez |
| **independiente, en paralelo** | carriles distintos con superficies de escritura disjuntas; o, en un proyecto que no declara carriles, runs sin aristas entre ellos | pueden correr a la vez |

### 10.1 La regla: dos runs del mismo carril no corren a la vez

**Dos runs del mismo carril no corren a la vez.** «Correr» se refiere al ARRANQUE: un taller o AIW
trabajando en el run. El `status` almacenado no distingue un run en ejecución de uno que espera
revisión (un run `active` puede estar esperando al operador). Por eso la regla no se deduce del
dato, ningún validador la comprueba y la obedece quien lanza el trabajo. Que el kernel de AIW la
obedezca es trabajo del hilo `aiw`.

**Obliga solo a los carriles DECLARADOS.** Un proyecto que no declara `lanes` no declara ninguna
serie. El carril implícito de [[D-051]] resuelve la posición y la etiqueta al leer, pero no obliga a
esta regla. Si obligara, todo proyecto sin carriles quedaría en serie, incluidos los de contenido,
que corren en paralelo ([[D-074]]).

**Como disciplina no es nueva.** El run `#37` ya la escribió el 2026-07-27 como disciplina de
proceso de `cantu-studio` («ONE run at a time PER LANE»; record
`context/aiw-console/records/DISCIPLINA-UN-RUN-POR-CARRIL.md`). Aquí pasa a ser doctrina transversal
para todo proyecto que declare carriles.

### 10.2 El carril no autoriza la colisión

**Dos carriles solo son paralelos si sus superficies de escritura son disjuntas.** Si dos runs
tocarían el mismo archivo, van en serie aunque estén en carriles distintos y, en un proyecto sin
carriles, aunque no tengan aristas. Es la condición que escribió el `#37`; sin ella, «carriles
distintos = paralelo» lo contradiría. El carril solo dice que el trabajo no compite.

### 10.3 Lo que no cambia

- **El barrier** ([[D-051]], CONTRATO §10.e) no es una relación entre dos runs: es un punto de
  sincronía que retiene el arranque de lo posterior en su alcance. Sigue igual.
- **El lote** ([[D-030]], run `#48`) es **la rama compartida**: runs que van a la misma rama y se
  aprueban o rechazan juntos. Es lo que AIW necesita para que el run N arranque del resultado del
  run N−1. **Estado al publicar esta sección: existe en el motor** (`root.batches`, `run.batch`, la
  operación `set-batch` y el invariante del interbloqueo con `depends_on_human_approved`) **y ningún
  proyecto lo usa.** Esta sección no lo cambia.
- La relación no viaja como campo: quien la necesite la deriva de `depends_on` y `lane`, que ya
  viajan.

## 11. Qué combinación apunta a qué vehículo

> **Añadida hacia adelante el 2026-10-19** (run `#68`), conforme a [[D-074]] y a la enmienda de §4.

**Precondición: la puerta.** Las filas de AIW solo aplican dentro de un proyecto que abrió la puerta
(enmienda de §4). Y mientras rija [[D-074]], **AIW no se prueba en proyectos vivos**: corre en el
proyecto de prueba que conduce el hilo `aiw`. Para la cadena, AIW necesita además la rama compartida
(el lote, §10.3), que el kernel todavía no obedece.

La tabla se lee en orden, y **gana la primera fila que encaja**:

| # | clase | `correctness_model` | relación | vehículo |
|---|---|---|---|---|
| 1 | cualquiera | `JUDGED_DEFINES` | cualquiera | **cabina y taller supervisados**: definir es el trabajo |
| 2 | `UX_DESIGN` | `SPECIFIED` · `JUDGED_ACCEPTS` | cualquiera | **cabina y taller supervisados**; AIW solo si el operador ya definió las correcciones antes del run |
| 3 | `CONTENT` | cualquiera | independiente | **talleres en paralelo**, en lote: un piloto supervisado define el molde, el lote corre en paralelo y al final hay una revisión concentrada |
| 4 | cualquiera | `SPECIFIED` · `JUDGED_ACCEPTS` | independiente | **talleres en paralelo** |
| 5 | `FUNCTIONALITY` · `DOCUMENTATION` | `SPECIFIED` · `JUDGED_ACCEPTS` | cadena, o mismo carril | **AIW de noche**, con una revisión larga en la mañana |
| 6 | `RESEARCH` | `SPECIFIED` · `JUDGED_ACCEPTS` | cadena, o mismo carril | **AIW de noche, ocasional**, con un reporte completo al final |

**La tabla APUNTA; no ejecuta ni bloquea nada.** El operador decide qué manda a dónde. Un run sin
clase, o una combinación que ninguna fila cubre (por ejemplo, contenido en cadena), no apunta a
ningún vehículo: decide la cabina. El cierre se sigue derivando de §2 sin cambios.

## 12. Procedencia de §9–§11 y de las enmiendas del 2026-10-19

- **Origen:** el operador, el 2026-10-04 (verbatim en
  `context/aiw-console/records/REFLEXION-DEL-OPERADOR-2026-10-04-PROPOSITO-Y-FRICCION-DE-LA-CONSOLA.md`,
  decisiones 10 a 18; principio en [[D-074]]). Pidió la clase de trabajo y la relación entre runs, y
  nombró las cinco clases («funcionalidad · documentación · investigación · diseño UX · contenido»).
- **Parada de análisis de la cabina**, el 2026-10-19: midió que la clase faltaba y que la relación
  ya estaba casi entera en el dato. El operador aprobó las cuatro recomendaciones (A–D) con «vamos
  con tus recomendaciones» (`context/aiw-console/records/ENCUADRE-PARADA-68-2026-10-19.md`).
- **Parada del taller del `#68`**, el mismo día, antes de escribir nada. Midió tres cosas: que el
  tooling local de `cantu-studio` rechaza la clave nueva (§9.6); que la regla del carril ya existía
  en el `#37`, con la condición de las superficies disjuntas (§10.2); y que aplicarla al carril
  implícito pondría en serie a los proyectos sin carriles (§10.1). El operador eligió, verbatim:

  ```text
  Retoma el #68 con la opción A (seguir sin tocar Cantu, como con batch) y B1 (la regla del carril obliga solo a carriles declarados, más la condición del #37 sobre superficies disjuntas). Usa UX_DESIGN y la marca que no se mueve.
  ```

- **La decisión se numera** en `context/DECISIONES.md` cuando el `#68` cierre.

**Lo que estas secciones NO hacen, y es deliberado:**

- no clasifican ningún run (el piloto del `#68` es una propuesta en su reporte; la clase la escribe la
  cabina con `set-classification` cuando el operador la apruebe);
- no cambian `work_type`, `correctness_model`, los carriles, los barriers ni el lote;
- no pintan nada en la consola: eso es del run siguiente.
