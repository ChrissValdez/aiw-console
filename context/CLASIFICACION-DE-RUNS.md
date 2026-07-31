# CLASIFICACIÓN DE RUNS — especificación canónica

> **Documento normativo y TRANSVERSAL a los tres proyectos** (`aiw`, `aiw-console`,
> `cantu-studio`). Vive en `context/` y no en la carpeta de ningún proyecto porque
> **la clasificación es del RUN, no del repo que lo aloja**: un run se clasifica
> igual viva en el roadmap que viva, y el mismo vocabulario rige en los tres.
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
