# CARRILES Y BARRIERS — el roadmap gana líneas paralelas y puntos de sincronización (D-051)

> Encargo de taller. Añade al esquema del roadmap la noción de CARRIL (líneas de trabajo que
> avanzan en paralelo) y la de BARRIER (un run que retiene lo posterior hasta completarse), más
> la VISTA MÍNIMA en la consola. Cambio de contrato registrado como **D-051** (número confirmado
> contra `context/DECISIONES.md`: la última era D-050) y como §10.e del CONTRATO con las
> decisiones `w`–`z` de su capa 2.
>
> Fecha: 2026-07-27. **Ningún comando de git que escriba.** Git se ejecutó SOLO EN LECTURA:
> `status`/`rev-parse` (probar intacto), `show HEAD:` (reconstruir el proyector pre-enmienda
> para el A/B en memoria). No se tocó ningún record existente, ni el fork D-035
> (`docs/project-console/`), ni el prototipo retirado (`console/`), ni el tooling viejo
> (`tools/project-console/`). **El tooling de cantu-studio se MIDIÓ y no se modificó** (Bloque E);
> `cantu-studio` entero quedó intacto (`git status --porcelain` vacío antes y después; su
> `.project/` NO se re-emitió porque el cambio no lo exige — su árbol no declara carriles y el
> emitido no cambiaría salvo `generated_from`).
>
> **Archivos escritos por este encargo, y ninguno más:**
> `tools/roadmap/roadmap-core.mjs` · `tools/roadmap/roadmap-plan.mjs` (allowlist, invariantes,
> `set-lane`) · `tools/projector/project.mjs` (transporte de `lanes`, versión 0.8.0→0.9.0) ·
> `project-console/assets/project-console.js`, `project-console/assets/project-console.css`,
> `project-console/index.html` (la vista mínima) · `tests/roadmap-lanes.test.mjs` (nuevo, 23
> tests) · `tests/roadmap-engine.test.mjs` (UN pin: el vocabulario de ops crece con `set-lane`)
> · `tests/fixtures/carriles/` (fixture nuevo con su registro y su `.project/` emitido) ·
> `CONTRATO.md` (§10.e + punteros de §10.a + filas `w`–`z` — la enmienda) · `DECISIONES.md`
> (D-051 — la entrada) · este record. Además `.project/git_history.json` de ESTE repo, reescrito
> por el test de sync de la suite (derivado con emisor propio, la misma nota que O4.P12 F.2).
> **Los dos canónicos reales: byte-idénticos** (md5 en Bloque G). **Ningún roadmap real se migró
> a carriles: los tres siguen sin `lane`.** BATCH quedó fuera (Bloque H).

Insumos usados y no re-medidos: `ESCRITURA-CONSOLA-GLOBAL-O4-P12.md` (el motor trasplantado y
su allowlist, B.2; la arista externa T2), `ANCHO-DE-SUBVISTAS-CAUSA-RAIZ-FLEX.md` (las cifras
962.4/1602.4 que la vista nueva no podía romper), CONTRATO §10–§12, §20, D-049, D-050.

---

## BLOQUE A — El esquema, y B resuelto: qué significa "posterior"

### A.1 Los campos (todo OPCIONAL, todo aditivo)

- **Raíz `lanes`**: array de `{lane_id, title, default?}`. Clave estable + nombre legible;
  `default` es excepción almacenada al estilo `archived` (solo `true`, exactamente una). El
  default es MARCA, no posición: "primera entrada = default" re-alojaría en silencio todos los
  runs sin `lane` al reordenar la declaración. `lanes: []` es malformado: quien no declara,
  omite.
- **Run `lane`**: un `lane_id` declarado. **Ausente resuelve al default AL LEER** — "todo run
  tiene carril" se satisface leyendo, no escribiendo, y los tres roadmaps reales quedaron
  válidos sin migrar un byte. Un proyecto sin `lanes` tiene UN carril implícito (resuelve a
  null): el caso simple es el general degenerado, no una rama.
- **Run `barrier`**: `"lane" | "global"`. El run es un punto de sincronización mientras no esté
  `completed`.
- Orden canónico de serialización: `lane` y `barrier` tras `depends_on`, antes de los campos de
  cierre (campos de plan antes que campos de desenlace). Ningún archivo existente los lleva, así
  que el roundtrip byte-exacto de los reales no se movió (test).

### A.2 "Posterior", con precisión (problema B del encargo)

Todo deriva de `queue_order` (que sigue GLOBAL, denso, único y contiguo — no se partió por
carril) más el carril resuelto:

- **Barrier `global` en posición p**: retiene todo run con `queue_order > p`, en todos los
  carriles.
- **Barrier `lane` en posición p**: retiene todo run posterior cuyo carril RESUELTO sea el del
  barrier. La "posición dentro del carril" es el orden global filtrado (el filtro conserva el
  orden), así que definir "posterior" por `queue_order` global es la misma cosa sin un segundo
  orden almacenado.
- **"Retenido" aplica al ARRANQUE**: solo runs `planned`. Un run `active` tras un barrier ya
  arrancó — su status almacenado es la verdad y no se re-etiqueta; un terminal ya cerró.

**Los bordes, decididos y justificados:**

1. **¿Un barrier de carril bloquea runs de OTROS carriles que dependen de él por `depends_on`?**
   No añade nada: la dependencia normal YA los hace esperar, y eso es RETRASO de ese run, no
   bloqueo de su carril. Es exactamente el principio del operador (documentar el componente 1 va
   detrás de construirlo, sin impedir construir el 2, 3 y 4). Las reglas de `depends_on` —
   incluidas las externas de §10.d — no cambian en nada.
2. **¿Dos barriers reteniendo al mismo run?** Ambos aplican (la unión). La consola NOMBRA el más
   temprano incompleto y cuenta el resto ("+N more"): es la frontera activa — dentro de un mismo
   alcance los barriers se despejan en orden, porque el posterior está retenido por el anterior.
   (Con alcances mixtos pueden ser independientes — un global en un carril ajeno no está retenido
   por un barrier de carril — y "el más temprano + conteo" sigue siendo determinista y accionable.)
3. **¿Barrier con `depends_on`?** Legal y ordinario: sus aristas regulan SU arranque; su
   condición de barrier regula lo de detrás. Ninguna regla especial. (El fixture lo instancia:
   el barrier global depende del componente activo.)
4. **¿Barrier en el último run, o solo en su carril?** Legal y vacuo: no retiene a nadie hoy y
   retendrá lo que se inserte detrás mañana. Ni error ni advertencia — es un uso normal
   ("planta el barrier, encola detrás").
5. **¿Barrier con status `blocked`?** Retiene (no está `completed`) y la consola muestra el
   barrier mismo como bloqueado — el estado más ruidoso honesto. No se rechaza: rechazarlo
   impediría REGISTRAR un punto de sincronización humanamente atascado.
6. **¿Barriers entre archivos?** No existen: `queue_order` es por archivo y "posterior" no está
   definido entre proyectos. El alcance de un barrier es su roadmap; lo externo queda como §10.d
   lo dejó.

### A.3 El barrier es REGLA, no aristas

El caso motivador —45 runs que esperan a los primeros 5— serían 225 aristas escritas a mano.
Medido en el fixture: **5 aristas `depends_on` almacenadas** donde la materialización del
bloqueo derivado exigiría 13 (el global retiene 7 runs, el de carril 1); **cero aristas
almacenadas apuntan a ningún barrier** (test que cuenta las dos cosas). La derivación corre en
el consumidor al leer (y en el motor solo para el invariante de satisfacibilidad); no se
persiste NADA de ella.

---

## BLOQUE B — C resuelto: los invariantes

La allowlist del motor creció (`lanes` en raíz; `lane`, `barrier` en run — el problema A del
encargo: un campo fuera de la lista invalidaba el roadmap ENTERO). Verificaciones nuevas, todas
en `checkInvariants` (acumulan, nunca lanzan):

1. **Forma del vocabulario**: `lanes` presente ⇒ array no vacío; entradas allowlisted
   (`lane_id`, `title`, `default`); ids únicos no vacíos; títulos no vacíos; `default` solo
   `true`; exactamente un default.
2. **Todo `lane` usado está DECLARADO** — la disciplina que D-049 impuso al status. Usar
   cualquier carril en un roadmap sin `lanes` es igualmente malformado. El error nombra el
   vocabulario declarado.
3. **`barrier` ∈ {lane, global}** — vocabulario cerrado de dos tokens.
4. **Satisfacibilidad**: para cada barrier, el conjunto que retiene debe ser disjunto de su
   clausura transitiva de dependencias en el archivo. **TEOREMA, y se registra como tal:** bajo
   la precedencia estricta vigente (`dep.queue_order < run.queue_order`), este invariante NO
   puede dispararse en un archivo que pase precedencia — las dependencias apuntan estrictamente
   hacia atrás y un barrier retiene estrictamente hacia adelante, así que "el barrier espera a
   algo que espera al barrier" es inescribible. El deadlock de barriers es imposible POR
   CONSTRUCCIÓN, y esa construcción es exactamente la disciplina de `queue_order` global denso
   + precedencia (la misma que el encargo mandaba no romper). El chequeo se implementa DIRECTO
   (clausura ∩ retenidos) y no "confiando en la composición", por dos razones dichas: dispara
   JUNTO a la violación de precedencia nombrando el deadlock que causaría (los errores se
   acumulan y el operador lee ambos — probado en dry-run por HTTP, Bloque F), y sostiene la
   propiedad por sí mismo si la precedencia se relajara algún día. No se finge que caza casos
   alcanzables hoy: no los hay, y el test que lo pinna lo dice ("the theorem, pinned").

Los invariantes previos (densidad, unicidad, contigüidad de `queue_order`; colgantes;
precedencia; aciclicidad; identidad) no se tocaron: carriles y barriers no participan de
ninguno. Las clausuras ignoran ids externos (sin orden entre archivos), igual que el walk de
ciclos existente.

**La op nueva `set-lane`** (la única): asigna un carril declarado o LIMPIA la clave (volver al
default almacena nada — el mismo gesto de `archived`/`closeout_result`). Rechaza carriles no
declarados nombrando el vocabulario; no toca `queue_order` ni identidad; es batchable. `KNOWN_OPS`
creció exactamente en ella (pin de suite actualizado con causa, el gesto F.3 de O4.P12).
**No hay op para barriers, y se dice:** ver Bloque H.

---

## BLOQUE C — El transporte: el vocabulario viaja en el envelope

`roadmapTreeBlock` (la ÚNICA función que arma el bloque del árbol para el snapshot Y para
`.project/roadmap.json`) pasa `lanes` VERBATIM cuando el árbol lo declara, y omite la clave
cuando no (§7: ningún hueco inventado). Una sola copia por diseño: **no se duplica en
`taxonomy_model`** — dos declaraciones del mismo dato son dos verdades esperando divergir, y a
diferencia de los vocabularios de status (constantes del emisor que no tienen otra forma de
viajar, D-049), el de carriles es DATO del árbol y viaja con él. El emisor no interpreta nada:
ningún `lane_id` se conoce por nombre (grep en suite = 0).

`PROJECTOR_VERSION` 0.8.0 → **0.9.0** (§6: un emisor que transporta carriles no es el que no
los transportaba).

**Aditividad, probada A/B en memoria** (el método D.4 de O4.P12): proyector pre-enmienda
reconstruido con `git show HEAD:` y comparado contra el vigente con el mismo `now` y
`generated_from` normalizado —

| Comparación | Resultado |
|---|---|
| Modo 1 `buildSnapshot(aiw)` / `buildRoadmap(aiw)` | **IDÉNTICOS**; `detectRootMode(aiw)` = `aiw_objectives` en ambos |
| Modo 2 roadmap/snapshot/docs sobre `aiw-console` | **IDÉNTICOS** |
| Modo 2 roadmap/snapshot/docs sobre `cantu-studio` | **IDÉNTICOS** |

La única diferencia del emisor es `generated_from` (la versión), que §6 exige mover. En suite,
además: un árbol sin `lanes` emite SIN la clave (pin), y el fixture la emite verbatim en los dos
artefactos con igualdad entre ambos (misma función, no pueden divergir).

---

## BLOQUE D — La vista mínima, y la verificación en DOM

**Dónde vive cada cosa** (todo en el renderer; la política de display no viaja en el dato):

- **Selector de carril**: DENTRO de la fila de subvistas existente (`index.html` ganó un slot
  vacío entre los subtabs y "Edit roadmap" — NINGUNA fila nueva). Se renderiza SOLO con MÁS DE
  UN carril declarado; con uno o ninguno el slot queda vacío y el caso simple no ve un píxel
  nuevo. Cambiar de carril re-renderiza las dos subvistas EN SITIO: la subvista activa se
  conserva (el punto del selector es comparar la misma vista entre carriles). Opciones: "All
  lanes (n)" + cada carril con su clave, su nombre, su "(default)" y su conteo. Estado por
  proyecto, reseteado en el switch (un carril de un proyecto no significa nada en otro).
- **Etiquetas**: chip mono `<lane_id>-NN` (clave + posición derivada, `padStart(2)`) en las
  filas de cola y de árbol y en el detalle. Solo en proyectos que declaran carriles. `#N`
  global se conserva intacto — la etiqueta AÑADE identidad de carril, no sustituye el orden
  global.
- **Barriers nombrados**: el run barrier lleva su marca con alcance ("Barrier · GLOBAL" /
  "Barrier · lane" — el global más pesado: borde doble y mayúsculas; peso y copia, ningún color
  nuevo, la disciplina del CSS de edición). Un run retenido dice POR CUÁL barrier en su celda
  "Waiting on" ("Barrier FORJA-04 (global barrier)", "+1 more" si hay más) y en su detalle
  ("Held by barrier", con botón que ABRE el detalle del barrier). La readiness derivada cambia
  SOLO cuando hay barriers: un `planned` con deps satisfechas pero retenido va a Later (y
  "Next up" del Overview jamás nombra un run retenido).
- **Dependencias agrupadas por carril** en el detalle (solo con >1 carril declarado): el carril
  del propio run primero ("(this run's lane)"), luego los demás en orden declarado, con
  cabecera por grupo; ids sin resolver conservan grupo propio. Sin carriles: la lista plana de
  siempre, byte a byte.
- **Asignación de carril desde la consola: SÍ ES PRACTICABLE y se hizo.** El modal de edición
  es de bloques por op; ganó un bloque "Lane" (`set-lane`) con select de los carriles declarados
  + "(project default — …)" que limpia la clave. Entra al batch "Preview all changes" con diff
  propio ("Lane (project default) -> VELA"). Solo se renderiza cuando el proyecto declara
  carriles.

**QA en DOM real** (el panel no compositaba captura — la misma limitación que documentaron
O4.P3, ACABADO F y O4.P12; la evidencia es la medición de DOM, método de esas mismas fases).
Server real con el registro QA (`PC_REGISTRY=tests/fixtures/carriles/qa-projects.json`):

**Sin regresión, primero** — los dos reales, misma sesión:

| Medición | aiw-console | cantu-studio |
|---|---|---|
| Hijos del slot del selector / etiquetas de carril / marcas de barrier / grupos de deps | **0 / 0 / 0 / 0** | **0 / 0 / 0 / 0** |
| Filas de cola · grupos | 35 · Now 1 / Upcoming 9 / History 25 | 53 · Now 0 / Upcoming 51 / History 2 |
| Subtabs | Run Queue 10 · Roadmap 2 | Run Queue 51 · Roadmap 7 |
| Árbol | — | 7 objetivos / 28 fases / 53 filas |
| Drawer (run con deps) | 2 deps PLANAS, celdas = Run order + Current stage, 0 celdas nuevas | — |
| Ancho subvistas 1280 / 1920 | **962.4 / 1602.4 en AMBAS subvistas** | **962.4 / 1602.4 en AMBAS subvistas** |
| Scroll horizontal | ninguno | ninguno |

Los conteos coinciden con los canónicos en disco (35 runs/2 objetivos; 53/7) y los anchos son
LAS MISMAS CIFRAS del record del ancho — la corrección de la fase anterior quedó intacta.

**La conducta nueva, contra el fixture** (12 runs, carriles FORJA default/CRONICA/VELA,
barrier global en #5 y de carril en #8):

- Selector presente con "All lanes (12) / FORJA — … (default) (6) / CRONICA — … (4) /
  VELA — … (2)"; 12 etiquetas; 2 marcas de barrier con clases distintas (`is-global`/`is-lane`).
- Grupos: Now 1 / Upcoming 9 / History 2. Celdas "Waiting on", una por una: el gate espera su
  dep ("#4 Componente 2"); Componente 3 espera SOLO al barrier ("Barrier FORJA-04 (global
  barrier)" — sin arista escrita); Documentar-2 espera dep Y barrier ("#4 · Barrier FORJA-04");
  el barrier de carril está retenido por el global; Preparar entorno (VELA) espera al global y
  NO al barrier de CRONICA (aislamiento entre carriles); Guía de usuario espera a DOS
  ("Barrier FORJA-04 (global barrier) +1 more"); Documentar-1 (deps satisfechas, antes del
  barrier) está READY — el paralelismo del principio, visible.
- Selector → CRONICA **desde Run Queue**: la subvista activa se conserva; 4 filas
  CRONICA-01…04; subtabs siguen el filtro (4 · 1). Cambio a Roadmap con el filtro puesto: 1
  objetivo, las mismas 4; vuelta a All: 3 objetivos, 12 runs. La subvista jamás saltó.
- Drawer de Documentar-2: "Lane = CRONICA-02 Crónica — documentación"; "Held by barrier =
  FORJA-04 (global barrier) — Prototipo integrado" (botón que abre el barrier, verificado); deps
  agrupadas con cabecera "FORJA — Forja — construcción". El barrier abierto declara "Barrier =
  GLOBAL bars every later run…".
- Modal sobre Componente 3: bloque Lane con las 4 opciones; preview batch "1. set-lane / Lane
  (project default) -> VELA"; NO se confirmó (md5 del fixture idéntico tras el QA). Toolbar en
  una sola fila a 1280 (toolbar 962.4×47.8; segmentos → selector → toggle alineados) y a 1920.
- **El punto medio, también en DOM**: una variante temporal del fixture con EXACTAMENTE UN
  carril declarado (`SOLO`, default) rindió slot del selector con **0 hijos y sin `<select>`**
  — y las 12 etiquetas `SOLO-NN` presentes. Declarar es optar a etiquetas; el selector exige
  tener qué comparar (H.7). La variante vivió en temp y se borró al terminar.

---

## BLOQUE E — El impacto en el tooling de cantu-studio, MEDIDO y no tocado

Ejecutado su propio módulo EN MEMORIA (import de `cantu-studio/tools/roadmap/roadmap-core.mjs`,
solo lectura; nada escrito en su repo — porcelain vacío antes y después):

1. **Hoy, sin carriles**: su `checkInvariants` sobre su PROPIO canónico ya devuelve 1 error —
   la arista externa legal de §10.d leída como "orphaned dependency" (su motor no lleva el
   toque T2). Reproduce la medición de O4.P12 E.1: **su endpoint local ya no puede aplicar
   ninguna edición hoy**, antes de cualquier carril.
2. **Con `lanes` declarado + un `lane` asignado** (copia en memoria de su canónico): +2 errores
   — `root carries unexpected field lanes; only schema_version, roadmap_id, title, objectives
   are allowed` y `run … carries unexpected field lane`. Origen: su allowlist propia,
   `roadmap-core.mjs:27` (`ROOT_ALLOWED_FIELDS`) y `:36` (`RUN_ALLOWED_FIELDS`), aplicadas en
   `:166-167` y `:230`.
3. **Con `barrier`**: `run … carries unexpected field barrier` (mismas líneas).
4. **Su validador de consola** rechaza igual, por SUS constantes:
   `validate-project-console-state.mjs:810` (`ROADMAP_V3_ROOT_FIELDS`), `:814-815` (campos de
   run), con los rechazos en `:966-968` ("carries forbidden root field") y `:1018-1021`
   ("carries forbidden field"). Además su gate de schema exacto (`:970-971`) sigue siendo el
   ROMPE ya conocido, ortogonal a esto.

**Consecuencia, para la decisión de la cabina al migrar Cantu:** un roadmap de Cantu con
carriles **deja de ser editable por su consola local y pone rojo su validador**. Las salidas
son actualizar su tooling o aceptar que solo la consola global lo edite hasta el corte
(`O4.P7`) — y el contexto medido abarata la segunda: su motor ya no puede editar su canónico
hoy (punto 1) y el corte retira ese tooling. **Este encargo no tocó un byte de su repo.**

---

## BLOQUE F — Suite y tests

**215/215 verde** (`npm test`): 192 previas + **23 nuevas** (`tests/roadmap-lanes.test.mjs`),
más UN pin actualizado con causa (`roadmap-engine.test.mjs`: el vocabulario de ops es el del
trasplante MÁS `set-lane`, D-051 — cualquier deriva futura sigue siendo decisión, no accidente).

Las 23, por criterio de aceptación:

- **Fixture**: invariantes verdes + roundtrip byte-idéntico; claves arbitrarias declaradas y
  renderizadas sin tocar código (Bloque D).
- **Sin regresión de dato**: los DOS canónicos reales pasan invariantes en lectura (con el set
  externo compuesto igual que el server), roundtrip byte-idéntico, ninguno declara `lanes` ni
  lleva `lane`/`barrier` en ningún run.
- **Cero posiciones persistidas**: toda clave de run del fixture Y de lo emitido ⊆ allowlist
  (ninguna clave derivada existe); **conteo de aristas**: 5 almacenadas, 0 hacia barriers, 7+1
  retenidos derivados.
- **Resolución de carril**: ausente→default (FORJA), mixto por run, y null en un roadmap sin
  carriles (los 35 reales).
- **Etiquetas estables**: declarar un carril nuevo no mueve ninguna secuencia derivada.
- **Invariantes que rechazan**: lanes vacío / id duplicado / 0 y 2 defaults / default:false /
  campo extra / título vacío; lane no declarado (con y sin vocabulario); barrier fuera del
  vocabulario; **barrier insatisfacible** (dep hacia adelante: disparan precedencia Y el guard
  nombrando el deadlock) y su reverso: el teorema pinneado (el fixture con barrier+deps pasa).
- **set-lane**: asigna en posición canónica de clave, limpia (con warning al limpiar lo
  ausente), rechaza no declarados nombrando el vocabulario, rechaza sin vocabulario; por
  `planEdit` con remap vacío; batchable con set-text; dry-run que rechaza no toca el archivo.
- **Transporte**: lanes verbatim e idéntico en los dos artefactos; árbol sin lanes emite sin la
  clave; claves del fixture NO aparecen en motor/emisor/server/renderer/markup (**el grep del
  criterio, automatizado como pin** — y cazó dos comentarios míos durante el desarrollo, que es
  exactamente su trabajo).
- **HTTP (server real, registro generado, copias en temp)**: probe 405; **un roadmap con
  carriles y barriers se edita por dry-run→confirm** (set-text aplicado, re-emisión con lanes en
  el derivado, revert byte-exacto por la misma ruta); set-lane asigna y limpia por HTTP con
  revert byte-exacto; lane no declarado → 422 sin escribir; vocabulario malformado (2 defaults)
  → 409 `roadmap_not_editable` en PRE-FLIGHT nombrando la regla; barrier insatisfacible → 409
  nombrando barrier y run retenido.

---

## BLOQUE G — Verificación sin daño: los números

| Verificación | Resultado |
|---|---|
| `aiw-console/roadmap/roadmap.json` | md5 `0a4c2d919279e1272c8f5400b78bbc2b` antes = después (jamás editado: las pruebas HTTP corren sobre COPIAS en temp) |
| `cantu-studio/.aiw/roadmap/roadmap.json` | md5 `58803b0afcae10142d5fe788ae9959ea` antes = después |
| `cantu-studio` entero | `git status --porcelain` VACÍO antes y después; su `.project/` no se re-emitió (no lo exige el cambio) |
| Fixture tras el QA de navegador | md5 idéntico (solo dry-runs; nada confirmado) |
| Kernel `aiw` | no tocado; el A/B lo leyó puro (builders idénticos) |
| `.project/` de este repo | `git_history.json` reescrito por el test de sync de la suite (derivado, emisor propio — la nota F.2 de O4.P12); el resto intacto: NO se re-emitió la carpeta, el cambio no lo exige (A/B: idéntico salvo versión) |

---

## BLOQUE H — Qué queda abierto, dicho como tal

1. **BATCH, fuera entero** (mandato del encargo): es otro eje — supervisión, no paralelismo —,
   sus reglas no están definidas, y meter dos campos a la vez sobre la allowlist duplicaba el
   riesgo. `category`/`batch` siguen reservados como §16 los dejó.
2. **No hay op ni control para marcar barriers.** `set-lane` existe porque la asignación de
   carril es la operación frecuente de la migración que viene; marcar un barrier es raro y de
   diseño. MIENTRAS TANTO los barriers se escriben editando el canónico a mano (que es fuente,
   no derivado; el siguiente dry-run/emisión los valida) — dicho aquí para no dejarlo implícito.
   Si el uso real lo pide, la op es un calco de `set-lane`.
3. **Migrar los roadmaps reales**: del operador, después, viéndolos aparecer (empezará por
   cantu-studio). Nada aquí lo hace.
4. **La decisión de Cantu** (Bloque E): actualizar su tooling o aceptarlo solo-lectura local
   hasta el corte. De la cabina, al migrar.
5. **Diseño fino de carriles** (columnas lado a lado, agrupaciones): explícitamente fuera; se
   decide con roadmaps reales enfrente. La vista mínima es selector + etiquetas + barriers
   nombrados + deps agrupadas, y nada más.
6. **Renombrar un `lane_id`** hoy es editar la declaración Y cada run que lo use (no hay op de
   renombre). La clave se eligió ESTABLE justamente para no necesitarlo; si algún día se
   necesita, es una op nueva con su decisión.
7. **Un carril declarado y solo uno**: etiquetas SÍ (declarar es optar), selector NO (nada que
   comparar). Anotado como conducta deliberada del punto medio.
8. **Barriers entre archivos: no existen por diseño** (A.2.6). Si el multiproyecto alguna vez
   los pide, es contrato nuevo, no extensión silenciosa.

---

## REPORTE para QA del operador

Ningún proyecto real tiene carriles todavía (a propósito), así que la conducta nueva se ve con
el FIXTURE. El registro QA sirve los tres reales MÁS el fixture:

```bash
PC_REGISTRY=tests/fixtures/carriles/qa-projects.json PC_PORT=8799 node project-console/serve.mjs
```

Abre <http://127.0.0.1:8799/project-console/index.html>. (En PowerShell:
`$env:PC_REGISTRY='tests/fixtures/carriles/qa-projects.json'; $env:PC_PORT='8799'; node project-console/serve.mjs`.
Sin variables, el server sirve el registro real de siempre, sin fixture.)

1. **Sin regresión**: abre `AIW Console` y `Cantu Studio` → Roadmap. Nada nuevo: ni selector,
   ni etiquetas, misma cola y mismo árbol de siempre.
2. **Carriles**: abre `Fixture Carriles` → Roadmap. En la MISMA fila de subvistas, en medio,
   está el selector "Lane" (solo aparece aquí: este proyecto declara 3 carriles). Cada fila
   lleva su etiqueta `FORJA-01`, `CRONICA-02`… (clave + posición dentro del carril).
3. **Selector**: en Run Queue elige `CRONICA` — quedan 4 filas y SIGUES en Run Queue. Pasa a la
   subvista Roadmap sin tocar el selector: el filtro persiste (1 objetivo). Vuelve a "All
   lanes".
4. **Barriers**: en Run Queue (All lanes), el run #5 "Prototipo integrado" lleva la marca
   `Barrier · GLOBAL`; todo lo posterior dice "Waiting on: Barrier FORJA-04 (global barrier)".
   El #8 lleva `Barrier · lane` y solo retiene a la Guía de usuario (#10, "…+1 more" porque la
   retienen los dos); "Preparar entorno" (VELA, #9) espera SOLO al global — el barrier de
   CRONICA no lo toca. "Documentar componente 1" (#3, antes del barrier, deps satisfechas) está
   READY: eso es el paralelismo.
5. **Detalle**: abre "Documentar componente 2" (#7): celdas "Lane = CRONICA-02…", "Held by
   barrier = FORJA-04 (global barrier) — Prototipo integrado" (clic te lleva al barrier), y las
   dependencias agrupadas por carril.
6. **Asignar carril**: botón "Edit roadmap" → "Editing on" → abre un run → Edit → bloque
   "Lane" → elige otro carril → "Preview all changes" (verás "Lane (project default) -> …") →
   Confirm si quieres escribir EL FIXTURE (es un fixture: puedes revertir igual, o dejarlo).
   Los reales no declaran carriles, así que su modal no muestra el bloque.
7. **Rechazos** (opcional, por curl): un `set-lane` con un carril inventado responde 422
   nombrando el vocabulario declarado; edita a mano el fixture para darle dos `default: true` y
   cualquier edición responde 409 nombrando "exactly one lane as default".

---

## Estado de completitud

- Bloque A (esquema + B resuelto con sus seis bordes) — COMPLETO.
- Bloque B (C resuelto: 4 invariantes + teorema + `set-lane`) — COMPLETO.
- Bloque C (transporte, una función, 0.9.0, A/B idéntico salvo `generated_from`) — COMPLETO.
- Bloque D (vista mínima + DOM: sin regresión en los dos reales, conducta nueva en el fixture,
  1280/1920 sin scroll, ancho de la fase anterior intacto) — COMPLETO.
- Bloque E (impacto en Cantu medido con archivo:línea y ejecución en memoria; cero bytes
  tocados allí) — COMPLETO.
- Bloque F (215/215; 23 tests nuevos; grep automatizado) — COMPLETO.
- Bloque G (md5, porcelain, fronteras) — COMPLETO.
- Bloque H (lo abierto, incluido cómo se escriben barriers mientras tanto) — COMPLETO.

Ningún bloque quedó "NO ALCANZADO".
