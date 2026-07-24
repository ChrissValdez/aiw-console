# VEREDICTO — `roadmap_tree_v1` como formato consumible

> Entregable de conocimiento del run `RUN-CONSOLE-PROTOTIPO-CONSOLA-001`
> (fase `O4.P10`). Es lo que aprueba la compuerta, junto con la pantalla.
> Escrito **como consumidor real**: el prototipo de la consola global
> (`projects/aiw-console/console/`) es el PRIMER lector de `roadmap_tree_v1`, y
> este veredicto reporta qué encontró al leerlo para renderizar tres vistas.
>
> Fecha: 2026-07-24. Read-only: no se modificó `roadmap.json` ni ningún archivo
> del repo en operación. No se ejecutó git.

## Método

Se construyó un consumidor de verdad —no un lint— y se le pidió pintar el árbol
`objetivo → fase → run`, el detalle de run y la cola por `queue_order`, leyendo
`projects/aiw-console/roadmap/roadmap.json` **crudo y directo** (2 objetivos, 30
runs). El veredicto es lo que ese consumidor **necesitó del archivo**, lo que el
archivo **no le dio**, y lo que tuvo que **derivar o suponer** con conocimiento de
fuera del archivo. Es el test-de-consumidor de D-026 aplicado ANTES del emisor
(P2): si el formato no aguantara, se sabría aquí.

Todas las cifras se midieron en disco el 2026-07-24 sobre el archivo real.

## Veredicto en una línea

**El formato aguantó sin inventar datos.** Las claves de nivel-run bastaron para
renderizar las tres vistas sin rellenar huecos con invención. Pero **tres cosas
que el consumidor necesita NO viajan dentro del archivo** y tuvieron que traerse
del contrato: (1) el vocabulario de `status`, (2) la función que deriva el estado
de objetivo/fase, (3) el criterio para distinguir un `depends_on` externo legal de
uno colgante. El archivo suelto **no es auto-descriptivo**: solo es consumible con
seguridad **junto al contrato**. Esa es la conclusión que hereda el emisor.

## 1. Claves que bastaron (medidas)

Presencia por nivel, unión de claves observadas:

| Nivel | Claves en el archivo | ¿Bastaron para renderizar? |
|---|---|---|
| Raíz | `schema_version`, `roadmap_id`, `title`, `objectives` | Sí |
| Objetivo | `objective_id`, `title`, `phases` | Sí (para el nodo; el estado se derivó — §3) |
| Fase | `phase_id`, `title`, `runs` | Sí (ídem) |
| Run | `run_id`, `queue_order`, `title`, `summary`, `full_description`, `status`, `depends_on`, `closeout_result`, `progress` | Sí |

Hechos que sostienen el "sí" del nivel-run:

- **`status`** presente en 30/30. Distribución medida: `completed` 17, `active` 1,
  `planned` 12 — `blocked` **no aparece** en este ejemplar. Todos dentro del
  vocabulario cerrado esperado; **ningún token fuera de él**. El detalle de run y
  el badge se pintaron directo del campo.
- **`queue_order`** presente en 30/30, rango **1..30, único y contiguo** (medido).
  La vista Cola ordenó por él sin ambigüedad. (El prototipo además VERIFICA y
  reporta esta propiedad en pantalla, no la asume; ver §4.)
- **`depends_on`** presente en 30/30 (6 con aristas, resto vacío). **0 referencias
  que no resuelvan localmente** en este archivo. El detalle de run lo pintó como
  lista navegable.
- **`title` / `summary` / `full_description`** en 30/30. Alimentaron fila de run y
  detalle sin recorte ni relleno.
- **`closeout_result`** presente en 15/30 — **opcional, y así se trató**: los runs
  sin él muestran "no presente", no un valor inventado. Es string libre (no enum);
  se renderizó crudo. No hizo falta estructurarlo.
- **`progress`** presente en **1/30** — opcional; se renderizó genéricamente
  (cinco celdas por entrada) donde existe y se omitió donde no, sin inventar una
  línea de tiempo para los otros 29.

Que objetivo y fase lleven **solo título** (sin `summary`/`full_description`) no
fue una carencia: es decisión previa registrada en el propio roadmap, y el árbol
se lee bien con título + estado derivado.

## 2. Lo que faltó: el archivo no declara su propio vocabulario

**El `status` es un token opaco sin el contrato.** El archivo trae `status:
"active"`, `"completed"`, `"planned"` — pero **no trae en ninguna parte la lista de
tokens válidos ni qué significan**. Medido: **no existe `taxonomy_model` en el
archivo** (`taxonomy_model in file: false`). El consumidor tuvo que **hornear el
vocabulario** (los cuatro tokens de run y los cinco derivados) tomándolo del
CONTRATO §11, porque el archivo no se auto-describe.

Consecuencia para el emisor (P2): el CONTRATO §17 ya prescribe que el **snapshot
que transporte el árbol declare el vocabulario** vía `taxonomy_model`. Este
consumidor lo confirma desde el otro lado: leyendo el árbol **suelto** no hay de
dónde sacar el vocabulario, así que el envelope del snapshot **debe** llevarlo, o
todo lector queda obligado a conocer el contrato de antemano. Para un prototipo de
un solo proyecto es tolerable; para el shell multi-proyecto (P3), que leerá árboles
de varios emisores, **no**: dos emisores podrían usar el mismo token con sentidos
distintos y el lector no tendría cómo saberlo.

## 3. Lo que hubo que derivar: el estado de objetivo y de fase

**Objetivo y fase no llevan `status` — y es deliberado (CONTRATO §10.b).** El
consumidor lo **derivó al leer**, con la función de precedencia estricta del §12.a
(gana la primera): `active` → `blocked` → `completed` (todos) → `in_progress`
(algunos) → `planned`. Misma función para fase (§13). 0 runs = malformado, sin
token (§12.b) — el prototipo lo anotaría en pantalla; no ocurre en este archivo.

Resultado contra los datos reales, **verificado en pantalla**:

- **O0 → `active`** (medido: 9 `completed`, 1 `active`, 2 `planned`): la regla 1
  gana sobre la 4 — hay avance Y hay algo corriendo, y `active` manda. Confirma la
  precedencia con datos (coincide con CONTRATO §12.d).
- **O4 → `in_progress`** (medido: 8 `completed`, 10 `planned`, 0 `active`): la
  regla 4 — algún `completed`, pero no todos. Es justo el caso para el que existe
  `in_progress`: no colapsar "empezado" contra "no empezado" (`planned`). Sin ese
  token, O4 se vería igual que un objetivo con cero avance.

**Este es el hallazgo central de derivación:** la regla **no viaja en el archivo**.
Vive en el contrato. Dos consumidores razonables con dos reglas razonables pintan
dos pantallas del mismo archivo (el modo de fallo que el §12.c describe). El
formato **externaliza** la derivación a un documento; el archivo por sí solo no
basta para decidir el estado de un objetivo. Para el shell (P3), la función §12
debe ser **una sola implementación compartida**, no re-derivada por vista.

## 4. Lo que hubo que suponer o decidir al leer

- **`depends_on` externo vs colgante.** El formato permite que una entrada apunte a
  un run de OTRO proyecto (CONTRATO §10.d). En este archivo **todas las 6 aristas
  resuelven localmente**, así que el caso no se ejerció con datos — pero el
  consumidor **no puede distinguir, solo desde el archivo**, una referencia externa
  legal de un typo colgante. Decisión tomada (sin inventar): una referencia que no
  resuelve localmente se rotula "externa / fuera de este roadmap" y se muestra, no
  se descarta ni se marca error. El shell (P3), que sí tendrá varios roadmaps
  cargados, podrá resolver esas aristas de verdad; el prototipo de un proyecto no.
- **Unicidad/contigüidad/globalidad de `queue_order`.** El contrato la mide como
  **propiedad, no como norma congelada** (§10.a). El consumidor **no la asumió**:
  la verifica en tiempo de lectura y la reporta en la vista Cola ("orden contiguo y
  único ✓" / aviso si no). Si un emisor futuro rompe la densidad, la pantalla lo
  dice en vez de romperse.
- **Sin marca de frescura en el archivo suelto.** Medido: **no existe
  `generated_at`** en el roadmap crudo (`generated_at in file: false`). Es correcto
  —la frescura es del envelope del snapshot (§6), no del árbol— pero significa que
  un lector del árbol **suelto no puede detectar staleness**. El prototipo lo evita
  leyendo en vivo en cada request; el emisor (P2) debe recordar que la frescura la
  aporta el envelope, nunca el árbol.
- **`schema_version` de la raíz.** El archivo trae `schema_version:
  "roadmap_tree_v1"` (string, nombra el modelo del árbol). El consumidor lo compara
  para **avisar**, no para ramificar ni rechazar (respeta §5: nadie ramifica sobre
  un identificador). Si no casara, renderiza igual y lo anota.

## 5. Insumo directo para el emisor (P2) y el contrato

1. **El árbol suelto no es auto-descriptivo del vocabulario.** El emisor debe hacer
   que el **snapshot** declare `taxonomy_model` con los tokens del modelo que
   transporta (ya normado en §17; este consumidor lo confirma como necesidad real,
   no teórica).
2. **La derivación de objetivo/fase debe ser código compartido**, una sola
   implementación de la función §12, para que el shell no reproduzca el modo de
   fallo "dos pantallas, un archivo".
3. **`depends_on` que cruza proyectos** solo es resoluble con varios roadmaps
   cargados: es trabajo del shell (P3), no del árbol. El emisor no necesita cambiar
   nada aquí; el contrato §10.d ya cubre la semántica.
4. **`closeout_result` y `progress` como strings/objetos opcionales aguantaron.**
   No hubo presión para enumerarlos ni congelar `progress`; el consumidor los pintó
   crudos. Confirma §14 y §15: no estructurar sin emisor y ejemplo.
5. **Nada sobró.** Ninguna clave del archivo quedó sin uso ni estorbó. El formato
   es **suficiente y no redundante** para las tres vistas — su valor quedó
   ejercido, que era el punto de ponerlo primero.

## Cierre

`roadmap_tree_v1` **es consumible** y se sostuvo contra datos reales sin inventar.
Su límite medido no está en lo que tiene, sino en lo que **delega al contrato**: el
vocabulario y la regla de derivación viven fuera del archivo. Mientras el lector
tenga el contrato al lado —como lo tuvo este prototipo— alcanza. El día que el
lector sea genérico (el shell, P3, leyendo N emisores), el envelope del snapshot
tiene que cargar lo que hoy el consumidor tuvo que saber de memoria. Eso es
exactamente lo que el §17 ya pide del emisor, ahora respaldado por un consumidor
que lo probó.
