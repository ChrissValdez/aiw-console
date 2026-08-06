# HANDOFF — hilo `cantu-studio` (el proyecto)

> **Este archivo es EFÍMERO y se SOBRESCRIBE.** Es el relevo del hilo de Cantu: se
> reescribe al cerrar cada sesión y se consume al abrir la siguiente. No es un
> record — no acumula historia, no se versiona por tramo. Lleva **solo** lo que la
> próxima sesión necesita para arrancar sin releerlo todo. Lo que seguirá siendo
> cierto dentro de un mes vive en el roadmap, en `CANTU_STUDIO_CONTEXT.md` o en un
> record — no aquí.

> **Disciplina de este handoff:** no afirma hechos, apunta a dónde están medidos. Si
> da una cifra, la da con su fuente y con su unidad. Aquí las cifras viajan con su cita
> y nada se declara "hecho" sin puntero.

> **Vive en `aiw-console` a propósito.** El hilo trabaja sobre el repo
> `projects/cantu-studio`, pero todo el contexto de gobernanza está centralizado en
> `aiw-console/context/`. Este relevo se escribe y se lee ahí.

> **Idioma.** El taller escribe en español; el **contenido del roadmap de Cantu está
> en inglés** y se cita **verbatim**, sin traducir — la regla de idioma
> (`records/CORRECCIONES-QA-CARRILES-Y-REGLA-DE-IDIOMA.md` Bloque C): el proyecto
> declara, el consumidor obedece.

> ## ⚠ TODA COORDENADA `#N` DE ESTE DOCUMENTO ES UNA MEDICIÓN FECHADA
>
> Los `#N` son `queue_order` **del 2026-08-06**. El `queue_order` se renumera cada vez
> que se inserta o se mueve un run, y esta sesión insertó diez. **El relevo anterior
> decía `#17`, `#18`, `#40`, `#58`; ninguna de esas coordenadas significa hoy lo que
> significaba entonces.** Cada `#N` va aquí con su `run_id` y su título verbatim: **el
> `run_id` es lo estable** (`D-047`), el `#N` no. Antes de planificar sobre un `#N`,
> re-derívalo del canónico.

**Última actualización de este handoff: 2026-08-06.** **Reescrito entero.** El relevo
anterior era del 2026-08-01 y **ninguna de sus cifras sigue en pie**: decía 63 runs y
`history=17`; hoy son **73 runs** y `history=33`. **Ninguna cifra de abajo se hereda.**
Todas se midieron en disco hoy contra
`projects/cantu-studio/.aiw/roadmap/roadmap.json` (md5 `37b9edef3ba562d6aa1a59f20b912a96`)
y contra el validador por la vía que no escribe.

---

## QUÉ SIGUE — lo primero

**El ciclo de componentes está en marcha y no está bloqueado.** Esta sesión cerró seis
componentes con QA del operador y dejó el siguiente listo para arrancar.

**El siguiente es el `#32`** — `RUN-JAME-WEB-DETAILS-REPAIR-001`, *"Audit and implement
the Details component"*, componente `details`, **etiqueta de plataforma «Nota
desplegable»**, fase `O1.P1C`, sin `lane` (carril `DEVELOPMENT` por defecto). Es el
menor `queue_order` de los `planned` y es elegible hoy.

**Hay 14 runs elegibles** (`planned` con todas sus `depends_on` en `completed`), contados
sobre el canónico; el validador da `ready_next=14` y coincide. De los 14, **nueve son los
componentes que faltan** (`#32`, `#33`, `#34`, `#36`, `#37`, `#38`, `#39`, `#40`, `#41`).

**Cero runs `active`.** No hay taller abierto: la sesión cerró limpia.

---

## 1. El estado del roadmap, medido hoy

    projects/cantu-studio/.aiw/roadmap/roadmap.json

**La fuente del plan y del estado**, y **el único roadmap** del proyecto. Contado sobre
ese archivo el **2026-08-06**:

| | |
|---|---|
| objetivos / fases / runs | **7 / 28 / 73** |
| status | **33 `completed`, 40 `planned`** · **ninguno `active`**, ninguno `blocked` |
| aristas `depends_on` | **142**, de las que **1 es externa** |
| `queue_order` | **1..73 denso, único y contiguo** |
| carriles | `DEVELOPMENT` **61** (por ausencia de clave) · `DOCUMENTATION` **12** |

**El desglose de los `completed`, medido:** eran **17** al cerrar el 2026-08-01 y hoy son
**33**. De los **16** que se cerraron en medio, **trece se ejecutaron** (`#17`, `#18`, `#19`,
`#20`, `#21`, `#22`, `#23`, `#24`, `#25`, `#26`, `#27`, `#30`, `#31`) y **tres son retiros**
(`#28`, `#29`, `#35`), que cierran como `completed` porque el vocabulario de `status` no tiene
token de descarte — **su `closeout_result` es lo que los distingue** (§4.2).

El validador del propio repo, **el comando de lectura que no escribe**, corrido desde
`projects/cantu-studio`:

```bash
node tools/project-console/validate-project-console-state.mjs
```

`EXIT 0` — `Project Console state validation passed.` · «7 objectives / 28 phases /
**73** runs; queue groups needs_human_decision=**0** now=**0** **ready_next=14**
later=**26** **history=33**». Además: `Docs indexed: 149`, `Docs curated primary-visible:
60 of 149`, **`Component statuses: 16`**, `Git history snapshot: 508 commits`.

Único aviso, el **no bloqueante de siempre**: la arista externa
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` →
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`, que vive en el roadmap de `aiw-console`. Sigue
costando (ver deriva 3).

`DEVELOPMENT` es el carril **por defecto** y **se resuelve al leer**: sus runs **no llevan
clave `lane`**. Sólo `DOCUMENTATION` va escrito (`D-051`).

---

## 2. El ciclo de componentes

**Diecisiete componentes Web.** Ocho cerrados, nueve pendientes. **Los seis de esta
sesión cerraron con QA del operador**: en este proyecto `completed` en el canónico **es
el acto de cierre del operador tras su compuerta de QA** — el cierre lo ejecuta sólo él
desde la consola global, y la QA humana es la compuerta que fija el `full_description` de
estos runs (`records/PUESTA-AL-DIA-DEL-ESTADO-DE-COMPONENTES-CANTU.md` §5).

| `#N` (hoy) | componente | **etiqueta de plataforma** | `run_id` | estado |
|---|---|---|---|---|
| #20 | `list` | **Lista** | `RUN-JAME-WEB-LIST-REVALIDATION-001` | cerrado esta sesión |
| #21 | `iconList` | **Lista con etiquetas** | `RUN-JAME-WEB-ICONLIST-REVALIDATION-001` | cerrado esta sesión |
| #22 | `card` | **Tarjeta** | `RUN-JAME-WEB-CARD-REVALIDATION-001` | cerrado esta sesión |
| #23 | `video` | **Video** | `RUN-JAME-WEB-VIDEO-REVALIDATION-001` | cerrado esta sesión |
| #24 | `narrative` | **Texto** | `RUN-JAME-WEB-NARRATIVE-REPAIR-001` | cerrado esta sesión |
| #31 | `callout` | **Nota destacada** | `RUN-JAME-WEB-CALLOUT-REPAIR-001` | cerrado esta sesión |
| #13 | `columns` | **Dos columnas** | `RUN-JAME-WEB-COLUMNS-REVALIDATION-001` | cerrado antes |
| #15 | `header` | **Encabezado** | `RUN-JAME-WEB-HEADER-REVALIDATION-001` | cerrado antes |

**Quedan nueve**, todos elegibles hoy, en este orden de `queue_order`:

| `#N` (hoy) | componente | **etiqueta de plataforma** | `run_id` | título verbatim |
|---|---|---|---|---|
| #32 | `details` | **Nota desplegable** | `RUN-JAME-WEB-DETAILS-REPAIR-001` | "Audit and implement the Details component" |
| #33 | `arithmetic` | **Factorización** | `RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` | "Audit and implement the Arithmetic component" |
| #34 | `rule` | **Regla matemática** | `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` | "Audit and implement the Rule component" |
| #36 | `split` | **Comparación guiada** | `RUN-JAME-WEB-SPLIT-SCOPE-AND-REPAIR-001` | "Decide scope and enable the Split component" |
| #37 | `table` | **Tabla** | `RUN-JAME-WEB-TABLE-AUDIT-AND-REPAIR-001` | "Audit and implement the Table component" |
| #38 | `conceptGrid` | **Comparador de conceptos** | `RUN-JAME-WEB-CONCEPTGRID-AUDIT-AND-REPAIR-001` | "Audit and implement the ConceptGrid component" |
| #39 | `hierarchy` | **Diagrama jerárquico** | `RUN-JAME-WEB-HIERARCHY-AUDIT-AND-REPAIR-001` | "Audit and implement the Hierarchy component" |
| #40 | `timeline` | **Secuencia de pasos** | `RUN-JAME-WEB-TIMELINE-AUDIT-AND-REPAIR-001` | "Audit and implement the Timeline component" |
| #41 | `visual` | **Recurso visual** | `RUN-JAME-WEB-VISUAL-AUDIT-AND-REPAIR-001` | "Audit and implement the Visual component" |

**`#36`, `#37` y `#40` heredaron una compuerta de compilador cada uno** (ver §4). **`#40`
lleva una condición de parada**: si el destino de los alias de feedback no está decidido
cuando se ejecute, **para y reporta opciones con coste medido**.

---

## 3. El mapeo de etiquetas de plataforma — los diecisiete

**A los componentes se les nombra por su etiqueta de plataforma**, no por su id de código:
es lo que el operador ve en pantalla. Derivado hoy de
`tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js` — las dos
superficies del catálogo coinciden id a id: `WEB_COMPONENT_UI` (`:11-113`) y las 17
entradas `flow: 'web'` de `BLOCK_CATALOG`. El archivo tiene **1 177 líneas** hoy.

| id de código | **etiqueta VERBATIM** | categoría | `#N` de su run |
|---|---|---|---|
| `columns` | **Dos columnas** | `structure` | #13 |
| `header` | **Encabezado** | `basics` | #15 |
| `narrative` | **Texto** | `basics` | #24 |
| `list` | **Lista** | `basics` | #20 |
| `iconList` | **Lista con etiquetas** | `basics` | #21 |
| `callout` | **Nota destacada** | `basics` | #31 |
| `card` | **Tarjeta** | `basics` | #22 |
| `details` | **Nota desplegable** | `basics` | #32 |
| `table` | **Tabla** | `basics` | #37 |
| `visual` | **Recurso visual** | `basics` | #41 |
| `video` | **Video** | `basics` | #23 |
| `hierarchy` | **Diagrama jerárquico** | `basics` | #39 |
| `rule` | **Regla matemática** | `math` | #34 |
| `arithmetic` | **Factorización** | `math` | #33 |
| `conceptGrid` | **Comparador de conceptos** | `math` | #38 |
| `timeline` | **Secuencia de pasos** | `math` | #40 |
| `split` | **Comparación guiada** | `math` | #36 |

> **⚠ ESTO ES UNA MEDICIÓN FECHADA (2026-08-06).** Las etiquetas son superficie visible y
> **cualquier run que renombre superficies visibles las cambia**. **Hay que volver a
> derivarlas del catálogo antes de la QA siguiente**, no copiarlas de esta tabla. El
> catálogo tiene además 3 entradas `flow: 'slide'` (`slide-title`, `slide-columns`,
> `slide-visual`) que **no** son componentes Web y no cuentan.

---

## 4. Los runs que esta sesión insertó y retiró

**El roadmap pasó de 63 a 73 runs: diez altas, ninguna baja.** Ningún run se borró: **el
retiro no borra** (§4.2).

### 4.1 Los diez insertados

Todos por **ticket de taller sin run**, conducidos por el motor de `aiw-console`.

| `#N` (hoy) | `run_id` | título verbatim | quién lo insertó |
|---|---|---|---|
| #17 | `RUN-CANTU-REVALIDATION-DOD-REFRESH-001` | "Update the revalidation Definition of Done to match the measured surfaces" | `records/INSERCION-TRES-RUNS-PIEZAS-COMPARTIDAS-CANTU.md` |
| #19 | `RUN-CANTU-AUTHOR-PALETTE-COMPILER-ENGINE-001` | "Carry the author palette through the compiler and the Web engine" | ídem |
| #35 | `RUN-CANTU-COMPILER-VARIANT-GATES-001` | "Align the compiler variant gates with the author palette" | ídem — **y retirado después** |
| #25 | `RUN-CANTU-INLINE-FORMULA-BEHAVIOUR-LOCK-001` | "Lock the existing inline formula behaviour with tests before any component consumes it" | `records/INSERCION-FORMULA-EN-LINEA-Y-LECCION-CANTU.md` |
| #26 | `RUN-CANTU-LESSON-LOAD-FAILURE-SURFACING-001` | "Repair the lesson that fails to load and stop the build from swallowing the failure" | ídem |
| #27 | `RUN-CANTU-INLINE-FORMULA-INSERTER-MOUNT-001` | "Mount the formula inserter so an author can place a formula at the cursor inside prose" | `records/INSERCION-MONTAJE-INSERTOR-FORMULA-CANTU.md` |
| #28 | `RUN-CANTU-INLINE-FORMULA-PREVIEW-001` | "Show the author a rendered preview of a prose paragraph that contains formulas" | `records/ENMIENDA-INSERTOR-Y-ALTA-PREVISUALIZACION-CANTU.md` — **y retirado después** |
| #29 | `RUN-CANTU-EDITOR-UNDO-REDO-001` | "Give the author undo and redo across the whole editor" | `records/INSERCION-DESHACER-GLOBAL-CANTU.md` — **y retirado después** |
| #30 | `RUN-CANTU-INSERTER-NATIVE-UNDO-001` | "Make the formula inserter write through a path the browser records for undo" | `records/INSERCION-SUCESORES-DEL-DESHACER-CANTU.md` |
| #59 | `RUN-CANTU-EDITOR-HISTORY-SYSTEM-001` | "Design and build a per-field editing history for the editor" | ídem |

Los ocho primeros ya están `completed`. **`#59` sigue `planned`** en `O4.P5` y es el
sucesor grande del deshacer retirado.

### 4.2 Los tres retirados — y qué pasó con su alcance

**La forma del retiro, derivada del dato en disco y no inventada** (`D-048` es el
precedente): el vocabulario de `status` es cerrado y **no tiene token de descarte**, así
que el run **conserva `run_id`, `title`, `objective`, `phase` y `queue_order`, nadie se
mueve detrás**, cierra como `completed` y lo dice en `closeout_result` con la forma
`discarded_by_<referencia>`.

**1. `#35` — `RUN-CANTU-COMPILER-VARIANT-GATES-001`, "Align the compiler variant gates
with the author palette".** `closeout_result = discarded_by_RETIRO-RUN-COMPUERTAS-VARIANTE-CANTU`.
**Por qué:** el operador midió en QA que **cada una de las tres compuertas está atada a
una decisión de diseño de su propio componente**, así que resolverlas por delante habría
decidido de antemano lo que esas auditorías existen para decidir.
**Dónde fue su alcance — una compuerta a cada destino**, con archivo, líneas, valores
admitidos, mensaje de error y conteo de tests escritos en el texto de cada run:
- la compuerta de `variant` de split → **`#36`** (con la que restringe split a hijo directo
  de Columns y el `disabled` del catálogo: **las tres son la misma decisión de alcance**);
- la del badge de fila de la tabla → **`#37`**, y sólo ésa;
- la de `detailsVariant` de timeline, **con su pregunta abierta de los alias** → **`#40`**.

**Compuertas cerradas SIN DUEÑO que aparecieron al medir y NO se adjudicaron:**
`TABLE_BADGE_STYLE_VALUES` (`compiler.js:23`) gobierna el badge de **Tarjeta** *y* el de
**Tabla**, con **0 tests** en sus dos ramas de rechazo; y `CARD_ICON_VALUES`
(`compiler.js:19`), de Tarjeta, también con **0 tests**. Adjudicarlas por afinidad
temática es justo lo que el retiro evitó. → `records/RETIRO-RUN-COMPUERTAS-VARIANTE-CANTU.md`
§4 y §6.

**2. `#28` — `RUN-CANTU-INLINE-FORMULA-PREVIEW-001`, "Show the author a rendered preview
of a prose paragraph that contains formulas".** `closeout_result = discarded_by_RETIRO-PREVISUALIZACION-PARRAFO-CANTU`.
**No se retiró por defectuoso: se construyó entero y PASÓ la QA del operador.** Se retira
porque **la superficie no compensa su coste**, medido en pantalla: con texto largo la caja
empuja el campo y sus controles hacia abajo; duplica el texto cuando no hay fórmula; y **el
visualizador del HTML ya cubre la necesidad**. **Su alcance no viajó a ningún sitio: se
desmontó el código** y quedó como antes del run (230/16/114 líneas, 762,12 kB / 75,46 kB
de paquete, 39+213 tests en verde). El insertor sigue vivo.

**3. `#29` — `RUN-CANTU-EDITOR-UNDO-REDO-001`, "Give the author undo and redo across the
whole editor".** `closeout_result = discarded_by_RETIRO-PILA-DESHACER-GLOBAL-CANTU`.
**Se construyó entero y la QA del operador lo devolvió `CHANGES_REQUIRED`** con tres
fallos; **el primero no es un defecto de implementación, es la forma**: hay **un solo
`useForm` en todo el editor** (`EditorPage.jsx:253`), así que cada entrada de la pila es un
estado del **documento completo** y no puede distinguir el cambio de un bloque del de otro.
**Dónde fue su alcance — partido en dos runs nuevos:** **`#30`** (el arreglo mínimo del
insertor, ya `completed`) y **`#59`** (el sistema de historial por campo, `planned`). El
código se desmontó; **al desmontarlo el deshacer del insertor volvió a estar roto, y eso lo
reparó `#30`**.

---

## 5. Los defectos medidos y NO reparados, por componente

**46 defectos vivos, cero reparados.** Ninguno tiene veredicto de QA que autorice tocarlo:
rige la cláusula de la Definition of Done — *«An observation made by the workshop itself is
a measurement to declare, never a repair authorization»*. Quedaron recogidos entrada a
entrada en `.aiw/state/component_status.json` (campos `follow_up_required` y `notes`), con
su record como fuente de detalle.

| componente (etiqueta) | defectos | dónde están detallados |
|---|---:|---|
| `list` — **Lista** | **5** (D1–D5) | `records/PILOTO-REVALIDACION-COMPONENTE-LISTA-CANTU.md` §8.4 |
| `iconList` — **Lista con etiquetas** | **6** (D1–D6) | `records/REVALIDACION-COMPONENTE-LISTA-CON-ETIQUETAS-CANTU.md` §8.2 |
| `card` — **Tarjeta** | **7** (D1–D7) | `records/REVALIDACION-COMPONENTE-TARJETA-CANTU.md` §11.2 |
| `video` — **Video** | **8** (D1–D8) | `records/REVALIDACION-COMPONENTE-VIDEO-CANTU.md` |
| `narrative` — **Texto** | **10** (D1–D10) | `records/REVALIDACION-COMPONENTE-TEXTO-CANTU.md` §7.4 |
| `callout` — **Nota destacada** | **10** (D1–D10) | `records/REVALIDACION-COMPONENTE-NOTA-DESTACADA-CANTU.md` |

De `narrative`, **D1 y D2 están reproducidos y AUTORIZADOS por veredicto de QA**, y aun
así fuera de alcance del run de componente porque tocar la reparación exige los dos
esquemas o la fábrica de bloques: su informe de opciones está en la §16 de ese record (ver
§7.3 de este relevo). Los otros ocho, y los 36 restantes, **esperan veredicto**.

### 5.1 Las dos familias que identificó la cabina

**Familia A — texto blanco fijo sobre el color que elige el autor, sin guarda de contraste
en ninguna capa.**
- **Medida y confirmada en `iconList`** (D2): `renderIconList.js:117-118`, `color: #FFF`
  sobre el fondo del badge. Probado con `#FFFF00`: se acepta y se pinta.
- **Medida y confirmada en `card`** (D5): `renderCard.js:39`, `:209`, `:277` — el badge
  `solid` y el avatar de `persona`, con `#FFFFFF` encima de un color libre.
- **DESMENTIDA en `callout`**: la etiqueta es `#4C566A` (`renderCallout.js:46`); en ese
  archivo **no aparece `#FFF`, `#FFFFFF` ni `white` ni una vez**. No es el mismo defecto.
- **No aplica en `video`**: no tiene superficie de color.
- **SIGUE SIN DUEÑO.** Repararlo es **decisión de diseño del operador** (¿derivar el color
  del texto? ¿acotar la gama?), no una reparación de taller. **Ningún run la posee hoy**, y
  aparece en los dos componentes ya cerrados: quien la decida reabre superficie firmada.

**Familia B — datos del autor que se descartan en silencio.**
- **`card` D4**: una tarjeta de código acepta `badge`/`badgeStyle` en el schema y el
  compilador **los descarta sin error** (`draftSchema.js:673-691` contra `compiler.js:362-374`).
  Hoy sólo muerde por importación de Draft JSON.
- **`video` D1**: un id de Vimeo de más de 32 dígitos pasa los dos schemas y el compilador
  y **el motor lo descarta: salida en blanco, sin error en ninguna capa**
  (`draftSchema.js:283` / espejo `:281` contra `renderVideo.js:4`).
- **`video` D4**: el compilador **descarta la query en silencio** — `&t=`, `&list=` y el
  **hash `?h=` de un Vimeo no listado**, que es lo que permite reproducirlo
  (`compiler.js:291-300`).
- **`callout` D2 / `narrative` D7**: el esquema de nivel superior **no es `.strict()`** y
  descarta cualquier clave extra en silencio, mientras el de slot **rechaza en voz alta**.
  **Forma compartida por `header`, `narrative`, `list`, `iconList`, `callout` y `details`.**
- **SIGUE SIN DUEÑO** en sus dos ramas caras: el descarte de query de `video` es **decisión
  de producto del operador** (¿debe conservarse la marca de tiempo?), y la asimetría
  `.strict()` es de **pieza compartida por los diecisiete**, así que ningún run de
  componente puede cerrarla sin disparar PARA Y REPORTA.

---

## 6. EL PROBLEMA DE LA MATRIZ DE CERTIFICACIÓN

**Es el hallazgo estructural de la sesión.** Las cuatro afirmaciones están **verificadas
contra disco hoy**:

1. **Es la fuente única de estado de componentes.** La Definition of Done lo dice en su §9,
   verbatim: *«`docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md`
   stays the single source of component status, and its Section 8 six-gate checklist stays
   the certification checklist»* (`docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md:340-341`).
2. **Vive dentro del archivo congelado.** Su ruta real es
   `docs/archive/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md` — **422 líneas,
   51 097 bytes**, verificado hoy. El directorio `docs/author-lite/components/`
   **no existe**.
3. **Tiene cinco contradicciones internas duras** — dos estados mutuamente excluyentes del
   mismo eje, afirmados en presente en secciones distintas. Líneas verificadas hoy:

| # | componente | un estado | el otro |
|---|---|---|---|
| C1 | `callout` | `HUMAN_QA_FAILED_REPAIR_REQUIRED` (`:99`, `:186`, `:312`, `:325`) | `HUMAN_QA_PENDING_OR_DEFERRED` (`:329`, `:386`) |
| C2 | `details` | `HUMAN_QA_FAILED_REPAIR_REQUIRED` (`:100`, `:193`, `:313`, `:325`) | `HUMAN_QA_PENDING_OR_DEFERRED` (`:329`, `:387`) |
| C3 | `video` | PASS humano explícito, `COMPONENT_QA_APPROVED_FROM_HUMAN_QA` (`:108`, `:176`, `:192`, `:321`, `:325`) | `HUMAN_QA_PENDING_OR_DEFERRED` + *«Siguiente accion: USER_VIDEO_HUMAN_QA_RESULT»* (`:339`) |
| C4 | `header` | `POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED` (`:96`, `:126`, `:184`, `:306`, `:325`) | `COLOR_PALETTE_RECONCILED` sin flag de reparación (`:329`, `:382`) |
| C5 | `list` | `POST_CERT_COLOR_UI_REGRESSION_REPAIR_REQUIRED` (`:95`, `:127`, `:188`, `:307`, `:325`) | `COLOR_PALETTE_RECONCILED` (`:329`, `:381`) |

   Más **cuatro tensiones blandas** de la misma causa (`arithmetic` `:331`, `hierarchy`
   `:333`, `timeline` `:335`, `visual` `:337`). **Causa raíz medida:** la §10 «Nota Phase 2»
   (`:329`), la §12 entera (`:379-388`) y las Actualizaciones `:331-339` quedaron congeladas
   en el estado **anterior** al batch de Human QA que `:325` reconcilia, y el único banner de
   supersede (`:327`) reemplaza **sólo la recomendación**, no los estados.
4. **La política de retención aprobada prohíbe reescribir lo congelado.**
   `.aiw/docs/docs_retention_archive_policy.json`, clase `evidence`, verbatim: *«Frozen
   evidence is never rewritten; it may gain banners/labels or move intact»*; y la clase
   `historical_run_record`: *«Never rewritten to match later state»*. La política está
   `operator_approved_governing_policy_no_physical_migration_authorized` y **no autoriza
   ningún movimiento físico**: le faltan 8 de 9 precondiciones y una decisión humana por
   cada acción física.

**Conclusión: hoy no hay forma legítima de corregirla donde está.** Y hay una vuelta de
tuerca medida: la propia política **la clasifica como `canonical`** y la lista con la ruta
**muerta** `docs/author-lite/components/…` — un documento con rol normativo vivo, alojado
en el archivo congelado, citado por una ruta que no existe. **Es la decisión H.2 del
operador** (§7.2). Ninguna sesión la ha editado y ninguna debe editarla sin esa decisión.

---

## 7. Las decisiones del operador que siguen abiertas

Se listan **con lo que recomendó quien las midió**, y **no se resuelven aquí**.

### 7.1 ¿Se añade `columns` al registro de estado de componentes?
**Qué se decide:** `.aiw/state/component_status.json` tiene **16** entradas y el catálogo
**17** componentes `flow: 'web'`; la diferencia es **exactamente `columns`**, que tiene
packet (`COLUMNS.md`) y no tiene entrada.
**Opciones:** (a) dejarlo en 16 — el validador **exige las 16 actuales y no exige
`columns`** (`validate-project-console-state.mjs:709-732`), y la DoD §6 ya declara la
ausencia; (b) añadirla — el validador de hoy la tolera, pero **cambian la fila de la DoD §6
y el censo**.
**Recomendación de quien lo midió:** ninguna a favor de (b): **no se añadió ni se quitó
nada porque es decisión del operador**. → `records/PUESTA-AL-DIA-DEL-ESTADO-DE-COMPONENTES-CANTU.md` §2.

### 7.2 ¿Qué se hace con la matriz de certificación?
**Qué se decide:** dónde vive el documento normativo vivo que está dentro del archivo
congelado, y cuál de sus dos lecturas manda.
**Opciones, con coste medido:**

| Opción | Repara | Rompe |
|---|---:|---:|
| Dejarla donde está (statu quo) | 0 | 0 — pero **462 apariciones en 112 archivos siguen muertas** *(cifra del record; hoy mide otra cosa, ver deriva 2)* |
| Moverla a `docs/author-lite/components/` | **462 apariciones / 112 archivos** | **23 apariciones / 15 archivos** |
| Reescribir las 462 citas a la ruta real | 462 | 0 — pero toca 112 archivos, **muchos evidencia congelada que la política prohíbe reescribir** |

**Recomendación explícita:** **dejarla y decidir por separado.** La tercera opción choca con
el congelado; la segunda es la única que repara el corpus en un solo acto **y es exactamente
el tipo de acto que necesita la firma del operador**. → `records/AUDITORIA-CORPUS-DOCUMENTAL-Y-LISTA-DE-DISPOSICION-CANTU.md`
Bloque H.2.

### 7.3 La §16 del record de «Texto» — el modo oculto del componente de prosa
**Qué se decide:** `narrative` tiene un modo `top` («Superior») que **el editor ocultó
(`editorOptions.js:33`, `legacy: true`) y que sigue vivo en los dos esquemas, el compilador,
el renderer y el packet**: entra, compila y pinta, pero no se puede reelegir.
**Opciones:** **A** — no tocar código; corregir el packet (`NARRATIVE.md:31`) para que no
lo ofrezca; una línea, carril `DOCUMENTATION`, cero riesgo. **B** — retirar `'top'` de los
dos `z.enum`: dos líneas **en archivos compartidos por los diecisiete**, y **rompe cualquier
draft ya guardado con `mode: 'top'`**; riesgo ALTO y silencioso porque **no existe
inventario de drafts guardados**. **C** — B más borrar `renderNarrative.js:60-66`, siete
líneas **en JAME Core**. **D** — la mitad de «naming»: unificar «Texto»/«Narrativa» y
renombrar `CARD_LEGACY_MODE_VALUES`, que **cruza a «Tarjeta», ya cerrada**.
**Recomendación explícita: A.** El desacuerdo real es de documentación, no de
comportamiento: nada en Author Lite puede emitir `top` desde que el editor lo ocultó. Si el
operador quiere cerrar D1 del todo, el orden con menos riesgo es **medir primero el corpus
de drafts con `mode: 'top'` — que es un run propio —, después B, después C, y D aparte**.
→ `records/REVALIDACION-COMPONENTE-TEXTO-CANTU.md` §16.

### 7.4 La selección mixta en el insertor — devuelta con coste medido
**Qué se decide:** qué hace el insertor cuando la selección **tiene delimitadores pero no
es exactamente una fórmula** (prosa mezclada, dos fórmulas, o una fórmula de bloque). Hoy es
el **cuarto caso**: no precarga, no sustituye, inserta en el cursor y **avisa al autor en
una línea, en español**.
**Coste medido:** el localizador de tramos es barato (~50-70 líneas más tests). **El coste
real no es código: es que la decisión no existe.** El editor visual devuelve **UNA** fórmula
(`onConfirm`, un solo `latex`) y una selección mixta tiene **N** tramos: **no hay función de
1 a N**, y las tres lecturas de «aceptar» son las tres reglas de producto. Para N ≥ 2 haría
falta **una superficie que `SmartFormulaModal` no tiene**.
**Recomendación explícita: NO implementarlo como sustitución parcial**; si el operador
quiere cubrirlo, **abrir un run propio cuyo alcance sea «editar una fórmula ya colocada»**,
que es el deseo real que hay debajo. → `records/REGLAS-DE-SELECCION-DEL-INSERTOR-CANTU.md` §6.

### 7.5 Las otras devueltas sin decidir en los records de esta sesión
- **Los alias de feedback y el `success` de `timeline`.** `success`, `warning`, `error` son
  alias del motor (`commons.js:71-90`) y **la paleta del autor no define ninguno**; la
  paleta declara nueve ids (`def`, `ctx`, `ex`, `focus`, `str`, `res`, `wrn`, `err`, `meta`)
  y `success` no está. Opciones: **A** promover los alias a tokens reales (**no toca una
  línea del repo**, 0 drafts, 0 tests), **B** retirarlo del desplegable y del enum, **C**
  mapearlo a `res`. **Recomendación: A; C se desaconseja.** **Es la condición de parada que
  `#40` heredó.** → `records/MEDICION-PIEZAS-COMPARTIDAS-COMPONENTES-CANTU.md` §10.1.
- **¿Debe un run de componente correr la suite antes de pedir QA humana?** Opciones A–D con
  coste. **Recomendación: B —** añadir un script `test` a un `package.json`, **sin obligación
  nueva** — **y no C**, que reescribe la §4 de la DoD y obliga a serializar los lotes.
  Verificado hoy: **4 `package.json` sin `node_modules`, ninguno declara `test`, y
  `compiler-api/package.json` no tiene clave `scripts`**. → `records/REFRESCO-DOD-REVALIDACION-CANTU.md` §9.
- **El `delete` que la política hace inalcanzable** (recomendación: aceptar un resultado de
  dos valores), **el orden entre registrar y mover los cinco packets sin registrar**
  (recomendación: registrar primero, mover después, en dos runs separados) y **si la lista de
  disposición se parte** (recomendación: dejarla entera hasta que cierre el run que la
  consume). → `records/AUDITORIA-CORPUS-DOCUMENTAL-Y-LISTA-DE-DISPOSICION-CANTU.md` H.1, H.3, H.4.

**Siguen abiertas también las que ya traía el relevo anterior** y que esta sesión no cerró:
el contrato de fuente única que contradice la decisión del operador, la ausencia de contrato
de contenido de autor para la Guía, y los huecos del rediseño del carril `DOCUMENTATION`
(`records/REDISENO-CARRIL-DOCUMENTATION-CANTU.md` §17).

---

## 8. Los hechos medidos que deben sobrevivir

Volverán a hacer falta. Cada uno con dónde está medido.

1. **La fórmula en línea FUNCIONA HOY en los cinco campos de prosa.** Una fórmula
   delimitada escrita a mano **sobrevive intacta, byte a byte, en las tres capas** —
   guardado, compilado y HTML final — y el HTML la entrega a **un solo**
   `renderMathInElement(document.body)` **sin objeto `delimiters`**. Los cinco campos:
   **«Nota destacada» → Contenido**, **«Regla matemática» → Descripción**, **«Tarjeta»
   (tipo normal) → Contenido**, **«Nota desplegable» → Contenido de cada ítem**,
   **«Comparador de conceptos» → Contenido de cada ítem**.
   **Está fijado con tests**: `tools/author-lite/compiler-api/tests/webInlineFormulaProseBehaviourLock.test.mjs`,
   **13 declaraciones `test()`**, cero archivos de producción tocados. **Lo que falta no es
   la tubería**: es la autoría, la garantía (nadie valida ese tramo como LaTeX) y el
   contrato (nadie declara que ese campo lleve matemáticas).
   **Y el corpus ya la usaba antes de que nadie lo autorizara:** `\( … \)` aparece **52
   veces en 12 archivos** del universo de drafts, y **4 de esas ocurrencias están en un
   campo de PROSA** — `details.items[].content`, en 4 archivos. → `records/MEDICION-FORMULA-EN-LINEA-CANTU.md`,
   `records/BARRIDO-DIAGNOSTICO-FORMULA-EN-LINEA-CANTU.md` §3.2, `records/BLOQUEO-CONDUCTA-FORMULA-EN-LINEA-CANTU.md` §6.

2. **El deshacer nativo del navegador es POR ELEMENTO y SIGUE AL FOCO.** Medido en
   Chromium 148: con dos `<textarea>`, un `execCommand('undo')` con el foco en el segundo
   deshace **sólo el segundo**; con el foco fuera de todo campo editable,
   `queryCommandEnabled('undo')` es **`false`**. **La pila nativa no puede dar nunca un
   deshacer de documento, y no cruza entre componentes.**
   **La vía que lo conserva está deprecada y es la única viable:** `document.execCommand`
   está marcado `Deprecated` **y** `Non-standard`, **y la misma fuente declara este caso
   exacto como excepción** — conserva el búfer de deshacer, a diferencia de la manipulación
   directa del DOM. Las alternativas se midieron: `setRangeText` **no conserva la pila**;
   `document.undo` / `element.insertText` **no existen**; `beforeinput` sirve para observar,
   no para provocar. Por eso el punto de escritura lleva **red de seguridad de una línea**:
   si `execCommand` fallara, cae al setter de siempre — **se perdería el deshacer, nunca la
   escritura**. **Corrección que hay que conservar:** cada `insertText` es **su propio paso**
   de deshacer (tres llamadas → tres pasos), **no uno agrupado** como midió el record
   anterior. → `records/DESHACER-NATIVO-DEL-INSERTOR-CANTU.md` §3.

3. **Una escritura programática INUTILIZA el historial nativo del campo.** No es que no se
   registre: **destruye la pila que ya había**, y el navegador **miente al preguntarle**
   (`queryCommandEnabled('undo')` sigue diciendo `true` y `execCommand('undo')` devuelve
   `true` sin cambiar nada). Medido con el setter y con el truco del descriptor: da igual.
   Tras una escritura por setter, **el autor pierde también lo que había tecleado antes**.
   → ídem §3.1.

4. **El CLI local de `cantu-studio` REHÚSA editar su propio roadmap.**
   `tools/roadmap/roadmap-edit.mjs` falla en pre-flight: su `checkInvariants` **no tiene el
   concepto de dependencia externa** y trata la arista §10.d como huérfana —
   `Refusing; nothing written`. Y hay una segunda razón terminal: su núcleo declara
   `[lanes: TOLERATE, NOT ADOPT]` y **no ofrece ninguna operación que escriba `lane`**.
   **El motor que sí conduce** es el de `aiw-console`
   (`tools/roadmap/roadmap-core.mjs` + `roadmap-plan.mjs`, conducido por
   `project-console/serve.mjs`), **con los ids externos derivados del registro**
   (`serve.mjs:335 externalRunIdsFor` sobre `project-console/projects.json`, donde
   `cantu-studio` está registrado). → `records/INSERCION-TRES-RUNS-PIEZAS-COMPARTIDAS-CANTU.md` §3.

5. **La vía que funciona para insertar en la fase correcta: ALTA AL FINAL DE LA FASE Y
   LUEGO MOVIMIENTO.** El alta deriva la fase del ancla, así que dar de alta directamente en
   la posición deseada la coloca en la fase equivocada. **Cuatro inserciones consecutivas de
   esta sesión la confirmaron.** → `records/INSERCION-MONTAJE-INSERTOR-FORMULA-CANTU.md`,
   `INSERCION-DESHACER-GLOBAL-CANTU.md`, `INSERCION-SUCESORES-DEL-DESHACER-CANTU.md`.

6. **Dos hechos de operación que acompañan a lo anterior:** el canónico es **CRLF puro** y
   el motor serializa con los finales del propio archivo; y **`git checkout` no se usa para
   deshacer en este workspace porque reescribe los finales de línea** — la vía de reversión
   es un respaldo byte a byte fuera de los dos repos.

---

## 9. Las reglas de cabina que cambiaron

- **La QA se escribe en la respuesta, no se delega a un archivo.** Un encargo sin run **no
  produce packet formal**: la lista de lo que el operador tiene que mirar va en la entrega,
  corta y autocontenida. → `records/RETIRO-TEXTO-DE-AYUDA-DEL-INSERTOR-CANTU.md` §8.
- **A los componentes se les nombra por su etiqueta de plataforma**, derivada del catálogo
  de bloques y **nunca inventada**; si una etiqueta no se puede derivar, se dice. → §3 de
  este relevo; `records/DESHACER-NATIVO-DEL-INSERTOR-CANTU.md` §11.
- **Crear o mover runs va SIEMPRE por ticket de taller, nunca dentro de un run.** Escribir
  la cola es mantenimiento de la cola: meterlo dentro de un run la convertiría en su propio
  sujeto. Los seis encargos de inserción de esta sesión lo declaran igual en su §0.
- **`D-061` — la ampliación de alcance por veredicto humano de QA.** El alcance de un run
  abierto **no lo amplía ni el taller ni la cabina**; sí lo amplía un veredicto de QA del
  operador, y sólo con las cuatro condiciones. **Está en `context/DECISIONES.md`: léela ahí,
  no se copia aquí.** Su corolario mordió esta sesión: `#27` se amplió **dos veces**, la
  segunda se paró y se devolvió al operador, que la autorizó — **un tercer hallazgo debería
  sopesarse como run propio antes que como tercera ampliación**.

---

## 10. La deriva conocida — cada una con su unidad y su dueño

Se nombra; **no se toca**.

1. **Mojibake en los mensajes de error de los dos schemas.** Medido hoy, **líneas con
   marcador** (`Ã`, `Â`, `â`, `�`): `tools/author-lite/compiler-api/schemas/draftSchema.js`
   → **32 líneas de 1 127**; `tools/author-lite/editor-ui/src/schemas/draftSchema.js` →
   **23 líneas de 1 056**. Son mensajes **que ve el autor**. El script guardián vigila esos
   cuatro marcadores **sólo sobre `ComponentGuide.jsx` y `blockCatalog.js`**, no sobre los
   schemas. **SIN DUEÑO.**

2. **Los punteros muertos — tres cifras separadas, y una divergencia que hay que declarar.**
   La unidad importa: *apariciones* ≠ *archivos* ≠ *rutas distintas*.
   - **Medido HOY** (`grep -ro` / `grep -rl` de la ruta literal sobre todo `cantu-studio`,
     excluidos `.git` y `node_modules`): `docs/author-lite/components/COMPONENT_CERTIFICATION_MATRIX.md`
     → **363 apariciones en 107 archivos**; la ruta real, `docs/archive/…` → **40
     apariciones en 24 archivos**. Restringido a `docs/**` + raíz, en `.md`: **148
     apariciones**.
   - **El record de esta sesión midió, el 2026-08-02 y con el mismo método, 462 apariciones
     en 112 archivos** (y 23/15 para la ruta real). **La cifra se movió y NO se resuelve
     aquí: se declara.** Quien la necesite **la vuelve a medir**; no se hereda ninguna de
     las dos.
   - **Corpus entero** (347 `.md` de `docs/**` + raíz), medición del 2026-08-02: **830 rutas
     distintas muertas · 3 965 apariciones · 290 archivos**. **Corpus vivo** (59 archivos):
     **161 rutas · 493 apariciones · 52 archivos**. El peor infractor vivo es el propio
     estándar de escritura, `docs/docs_management/DOCUMENTATION-BLUEPRINT.md`, con **114
     citas de ruta muertas**.
   - **DUEÑO: `#69`** — `RUN-CANTU-DOCUMENTATION-CORPUS-CLEANUP-001`, *"Execute the
     documentation corpus disposition list"* (elegible hoy), **salvo la matriz**, cuya
     disposición es la decisión H.2 del operador (§7.2).

3. **El aviso no bloqueante del validador** — la arista externa
   `RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` → `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`.
   **Unidad: 1 arista.** Es también **lo que hace que el CLI local rehúse** (§8.4). **SIN
   DUEÑO.**

4. **Los HTML huérfanos.** **6 archivos `.html`** en `dist/staging/…/Sections_by_lesson/`
   que el build no escribe. **SIN DUEÑO** — nombrados y no tocados por
   `records/LECCION-QUE-NO-CARGA-CANTU.md` §9.

5. **El draft del almacén vivo que no valida.** **1 archivo de los 10** del almacén:
   `src/content/author_lite/drafts/matematicas/algebra/test5.json`. Se **guarda** y
   **compila a Web**, pero `SlidesDraftSchema` y el esquema del **editor lo rechazan**
   (`slideBlocks[0].items[0].content` = **151 palabras** contra un máximo de 40). La rotura
   está en la puerta de esquema del servidor, no en el compilador. **SIN DUEÑO.**

6. **Las evidencias congeladas que ya no validan.** **4 instantáneas** bajo
   `QA/temp/PASS-4D-*` que `WebDraftSchema` **rechaza**. **SIN DUEÑO**, y **la política de
   retención prohíbe reescribirlas** (§6.4).

7. **El anidamiento de fórmulas del insertor.** El emisor tiene la guardia barata — un
   fragmento que **ya trae delimitadores** es no-operación, en vez de producir `\(\(x\)\)`
   (`records/CONSTRUCCION-INSERTOR-FORMULA-EN-LINEA-CANTU.md` §7.3) — pero **el caso general
   no está cubierto**, y los **12 campos que YA son de fórmula** (`*.math`,
   `math.expression`, `math.result`, `result`) son donde meter otro delimitador sería
   anidamiento. **SIN DUEÑO**; nombrado y excluido por cinco records seguidos.

8. **El desajuste entre las dos listas de componentes.** **16 entradas** en
   `.aiw/state/component_status.json` frente a **17 componentes** `flow: 'web'` en el
   catálogo; falta **`columns`**. El validador lo reporta como `Component statuses: 16` y
   **exige exactamente esas 16**. **DUEÑO: nadie — es la decisión del operador §7.1.**

9. **Módulos huérfanos del editor.** **21 huérfanos** sobre **107** archivos `.js/.jsx` en
   `editor-ui/src` sin `experiments/`, de los que **86 son módulos vivos** alcanzables desde
   `src/main.jsx`. *(Medición del 2026-08-05. El record anterior midió 87 vivos y 20
   huérfanos, y declara que la diferencia es exactamente el módulo de la ruta B que el run
   del deshacer creó y que ya no existe.)* **SIN DUEÑO.**

10. **`AGENTS.md` declara cifras de runs caducadas.** Ya estaba en el relevo anterior y
    **hoy está más caducado**: sus cifras son de un roadmap de 72 runs y el canónico trae
    **73** con **61 sin clave `lane`** y **12 `DOCUMENTATION`**. **Ver deriva antes de
    creerle una cifra.** **SIN DUEÑO.**

---

## 11. Lecciones de operación

- **Una cifra se cita con su unidad o no se cita.** El caso: el «55». Un record lo publicó
  como *«archivos JSON con `webBlocks`/`slideBlocks`»*; **hoy esa misma unidad da 76**. Y
  con criterio estricto de parseo, «archivos con campo `lesson`» da **55** — **un 55 distinto
  del histórico, que coincide por casualidad**; tolerando BOM, **56**. Cualquier record que
  vea un «55» debe preguntar **cuál de los dos**. → `records/BARRIDO-DIAGNOSTICO-FORMULA-EN-LINEA-CANTU.md` §2.2.
- **La cabina no pone en un ticket cifras derivadas del estado vivo.** El caso: el primer
  encargo de inserción **paró** porque su criterio 8 afirmaba que un run acabaría en
  `queue_order` 36; medido, partía de 39 y acababa en 42, porque **seis runs que el ticket
  no contemplaba existen hoy en el canónico**. **Se corrigió el ticket, no el canónico**, y
  no se movió un solo run: mover seis para hacer casar una cifra habría cambiado el orden de
  ejecución del proyecto. → `records/INSERCION-TRES-RUNS-PIEZAS-COMPARTIDAS-CANTU.md` §13.
- **Un encargo que para es una entrega.** El mismo acto I paró y entregó plan, ejecución en
  sombra, verificación campo a campo, coste medido y recomendación explícita **sin escribir
  un byte**; el segundo encargo aplicó ese plan tal cual. Igual la parada medida del montaje
  del insertor. **Parar con informe no es no entregar.**
- **Dos capacidades se declinaron TRAS construirse, y está bien.** La previsualización del
  párrafo (`#28`) **pasó la QA** y se retiró porque la superficie no compensa su coste; la
  pila de deshacer global (`#29`) se construyó entera y la QA reveló que **el problema era la
  forma, no la implementación**. Las dos se desmontaron dejando el código exactamente como
  estaba, verificado al dígito por líneas, tamaño de paquete y tests. **Construir para
  medir y luego declinar es una salida legítima; el desperdicio habría sido enviarlas.**
- **Trampas de herramienta medidas.** *(Sólo encuentro UNA nombrada como trampa de
  PowerShell en los records de esta sesión; **no invento la segunda**.)*
  1. **PowerShell se come las comillas: nunca `node -e` para volcados verbatim** — la vía
     que funciona es **un script Node a archivo**. → `context/handoffs/aiw.md` §6.
  2. **Trampa de representación de fuente** (no es de PowerShell, pero muerde igual): el
     artefacto compilado **no contiene la subcadena literal** `\(ax^2+bx+c\)` sino
     `\\(ax^2+bx+c\\)`, porque es JavaScript y la barra va escapada para el literal.
     **Cualquier test que busque la subcadena literal en el texto del artefacto da un falso
     negativo.** → `records/BLOQUEO-CONDUCTA-FORMULA-EN-LINEA-CANTU.md` §3.3.

---

## 12. Tema abierto para la sesión siguiente — NO se decide aquí

**El operador plantea usar Cowork para que la cabina lea el workspace directamente.**
**La razón:** hoy **cada hecho del repo viaja por copiar y pegar** entre el operador y la
cabina, lo que cuesta turnos, trunca fragmentos y es el modo de fallo que ya se midió en el
hilo de `aiw` — *«la cabina lo lee en FRAGMENTOS de búsqueda, y un fragmento truncado se lee
igual de completo que uno entero»*.

**Es una decisión transversal a los tres proyectos y su sitio es `context/DECISIONES.md`, no
este relevo.** Se recoge aquí **como pendiente y sin resolver**: este encargo no la decide,
no la evalúa y no escribe en `DECISIONES.md`. **No hay ninguna mención de Cowork en
`context/` hoy** — verificado; si se decide, **es una entrada nueva**.

---

## 13. Punteros

- **Contexto de gobernanza:** `context/cantu-studio/CANTU_STUDIO_CONTEXT.md` — en inglés,
  gobernanza y peligros, **no lleva estado**. Lectura de arranque del hilo.
- **Reglas dentro del repo:** `cantu-studio/AGENTS.md` (autoridad del repositorio) y
  `cantu-studio/CLAUDE.md` — ver deriva 10 antes de creerle una cifra.
- **Roadmap canónico:** `projects/cantu-studio/.aiw/roadmap/roadmap.json`. **El único.**
  `.project/` es **derivada: NO es destino de escritura** — se escribe el canónico y se
  re-emite con el botón *Re-emit `.project/`* de la consola global
  (`records/REEMISION-MANUAL-PROJECT-O4-P14.md`).
- **Decisiones que gobiernan:** `context/DECISIONES.md` — **`D-061`** (ampliación de alcance
  por veredicto de QA), **`D-051`** (carriles, posición derivada), **`D-048`** (el retiro no
  borra; la forma `<participio>_by_<referencia>` en `closeout_result`) y **`D-047`**
  (identidad inmutable: `run_id`, `phase_id`, `objective_id` no se renombran nunca).
- **El procedimiento de revalidación:**
  `cantu-studio/docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md`. Su
  §6 se puso al día esta sesión (**36 archivos de test / 398 declaraciones `test()`**, marca
  *«Measured 2026-08-05 (static count, not an execution)»* — **re-verificado hoy: sigue en
  36/398**).
- **Los records de esta sesión**, en `context/aiw-console/records/`, por orden:
  `MEDICION-PIEZAS-COMPARTIDAS-COMPONENTES-CANTU.md` · `INSERCION-TRES-RUNS-PIEZAS-COMPARTIDAS-CANTU.md` ·
  `REFRESCO-DOD-REVALIDACION-CANTU.md` · `PALETA-DE-AUTOR-COMPILADOR-Y-MOTOR-CANTU.md` ·
  `AUDITORIA-CORPUS-DOCUMENTAL-Y-LISTA-DE-DISPOSICION-CANTU.md` · `RETIRO-RUN-COMPUERTAS-VARIANTE-CANTU.md` ·
  los seis de componente (`PILOTO-REVALIDACION-COMPONENTE-LISTA-CANTU.md`,
  `REVALIDACION-COMPONENTE-LISTA-CON-ETIQUETAS-CANTU.md`, `REVALIDACION-COMPONENTE-TARJETA-CANTU.md`,
  `REVALIDACION-COMPONENTE-VIDEO-CANTU.md`, `REVALIDACION-COMPONENTE-TEXTO-CANTU.md`,
  `REVALIDACION-COMPONENTE-NOTA-DESTACADA-CANTU.md`) · `MEDICION-FORMULA-EN-LINEA-CANTU.md` y
  `BARRIDO-DIAGNOSTICO-FORMULA-EN-LINEA-CANTU.md` · `BLOQUEO-CONDUCTA-FORMULA-EN-LINEA-CANTU.md` ·
  `LECCION-QUE-NO-CARGA-CANTU.md` · `MONTAJE-INSERTOR-FORMULA-CANTU.md` ·
  `ENMIENDA-INSERTOR-Y-ALTA-PREVISUALIZACION-CANTU.md` · `CONSTRUCCION-INSERTOR-FORMULA-EN-LINEA-CANTU.md` ·
  `REGLAS-DE-SELECCION-DEL-INSERTOR-CANTU.md` · `RETIRO-PREVISUALIZACION-PARRAFO-CANTU.md` y
  `RETIRO-PILA-DESHACER-GLOBAL-CANTU.md` · `DESHACER-NATIVO-DEL-INSERTOR-CANTU.md` ·
  `INSERCION-SUCESORES-DEL-DESHACER-CANTU.md` · `PUESTA-AL-DIA-DEL-ESTADO-DE-COMPONENTES-CANTU.md` ·
  `RETIRO-TEXTO-DE-AYUDA-DEL-INSERTOR-CANTU.md`.
  *(Los dos de inserción intermedios, `INSERCION-FORMULA-EN-LINEA-Y-LECCION-CANTU.md` e
  `INSERCION-DESHACER-GLOBAL-CANTU.md`, y los dos de construcción retirados,
  `PREVISUALIZACION-PARRAFO-CON-FORMULAS-CANTU.md` y `DESHACER-Y-REHACER-GLOBAL-CANTU.md`,
  siguen siendo mediciones fechadas válidas de lo que existió.)*

### Cómo levantar la consola global

Desde la raíz de `projects/aiw-console`:

```bash
node project-console/serve.mjs
```

Puerto **8788** por defecto, `PC_PORT` lo sustituye. Cantu está registrado con la clave
`cantu-studio` en `project-console/projects.json`. **Es la única que puede editar el
canónico de Cantu**, con flujo dry-run (`apply:false`) → confirm (`apply:true`).
