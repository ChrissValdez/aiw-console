# HANDOFF — hilo `cantu-studio` (el proyecto)

> **Este archivo es EFÍMERO y se SOBRESCRIBE.** Es el relevo del hilo de Cantu: se
> reescribe al cerrar cada sesión y se consume al abrir la siguiente. No es un record —
> no acumula historia. Lleva **solo** lo que la próxima sesión necesita para arrancar sin
> releerlo todo.

> **Disciplina:** no afirma hechos, apunta a dónde están medidos. Si da una cifra, la da
> con su unidad y su fuente.

> ## ⚠ TODA COORDENADA `#N` DE ESTE DOCUMENTO ES UNA MEDICIÓN FECHADA
>
> Los `#N` son `queue_order` **del 2026-08-06 al cierre**. El `run_id` es lo estable; el
> `#N` no. Antes de planificar sobre un `#N`, re-derívalo del canónico.

**Última actualización: 2026-08-06, al cerrar la primera sesión en modalidad Cowork.**
Todas las cifras se midieron en disco ese día contra
`projects/cantu-studio/.aiw/roadmap/roadmap.json`.

---

## ⚠ LO PRIMERO: LA SESIÓN SIGUIENTE ARRANCA EN UNA MÁQUINA NUEVA

El operador migró a otra laptop. **Nada de lo que estaba fuera de los repos viajó por
Git.** Antes de trabajar, comprueba:

1. **La ruta de montaje es OTRA.** Se deriva, nunca se hereda de este documento.
2. **`node_modules` no viaja.** Estaban instalados en tres sitios bajo
   `projects/cantu-studio/tools/author-lite/`. Sin ellos el editor no arranca y la QA no
   se puede ejecutar.
3. **`_scratch\` y `_backups\` no viajan.** Estaban fuera de los cuatro repos.
4. **Node era v22.22.3** en la máquina anterior.
5. **Estado de Git al migrar, los cuatro al día con `origin`:**
   `cantu-studio` **`0ff12d5`** · `aiw-console` **`742bc7e`** · `aiw` **`38bb00b`** ·
   `cantu-lessons` **`eeb2551`**.

---

## QUÉ SIGUE — lo primero

**No hay que abrir ningún run. Hay DOS abiertos esperando QA humana del operador.**

| `#N` | componente | `run_id` | qué falta |
|---|---|---|---|
| **#32** | **«Nota desplegable»** (`details`) | `RUN-JAME-WEB-DETAILS-REPAIR-001` | **QA del operador — 22 checks**, nunca ejecutada |
| **#34** | **«Regla matemática»** (`rule`) | `RUN-JAME-RULE-COMPONENT-REPAIR-AND-ACTIVATION-001` | **QA del operador — 29 checks**, nunca ejecutada |

**Recomendación que la sesión anterior dejó dada: empezar por `#32`.** Es la más corta y
su defecto invisible —el único de los diecisiete componentes sin `.strict()`— es el que
ningún ciclo de QA sano encuentra por sí solo.

Los dos entregaron con **parada por pieza compartida**: reparar cruza los dos
`draftSchema.js`, la fábrica de bloques, el sistema de color o JAME Core. **Después de la
QA viene una decisión del operador sobre qué reparar**, exactamente como pasó con `#33`.

Sus packets están en `projects/cantu-studio/docs/_historical_run_record/`, escritos el
2026-08-06 por la primera vuelta del lote y **sin tocar desde entonces**.

---

## 1. El estado del roadmap, medido al cerrar

    projects/cantu-studio/.aiw/roadmap/roadmap.json

| | |
|---|---|
| objetivos / fases / runs | **7 / 28 / 73** |
| status | **34 `completed`, 37 `planned`, 2 `active`** (`#32` y `#34`) |
| `queue_order` | **1..73 denso, único y contiguo** |
| validador | `EXIT 0` · `now=2` `ready_next=11` `later=26` **`history=34`** |
| conjunto elegible | **11**; el menor es **`#36` «Decide scope and enable the Split component»** |

Único aviso, el no bloqueante de siempre: la arista externa
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` →
`RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`, que vive en el roadmap de `aiw-console`.

Comando de lectura que no escribe, desde `projects/cantu-studio`:

```bash
node tools/project-console/validate-project-console-state.mjs
```

---

## 2. La modalidad cambió: la cabina opera la consola

**`D-064`** (`context/DECISIONES.md`) autoriza a la cabina, de forma permanente y sin
confirmación por acto, a:

1. Mover status (`planned → active`, `active → completed`).
2. Re-emitir `.project/` — **medido: es automático dentro de la propia edición del
   roadmap**, no un paso aparte.
3. Cambios estructurales **solo con el ritual de cinco puntos**: respaldo en `_backups\`,
   guarda de título que aborta, dry-run antes de aplicar con su `remap` publicado,
   verificación campo a campo, y nunca con un taller corriendo.

**Git sigue siendo exclusivo del operador**, y para la cabina es una pared medida: `.git`
no es escribible, no hay credenciales y no hay red al remoto.

Las reglas de cabina en su versión Cowork están en las instrucciones del Project. **Si la
sesión nueva no las tiene, están sin publicar**: la copia que se escribió vivía en
`_scratch\REGLAS-DE-CABINA-COWORK.md`, que no viajó.

---

## 3. `#33` «Factorización» — cerrado, y cómo

**Cerrado por veredicto escrito de QA del operador.** `history` 33 → 34.

Costó **tres vueltas de taller** y creció **dos veces por ampliación de alcance (D-061)**:

- **Vuelta 1** — auditoría del lote de tres. Midió y no reparó; paró por pieza compartida.
- **Vuelta 2** — reparación: delimitadores rechazados en los dos esquemas, color por
  token de paleta en cada factor, y el signo `÷`/`×` por bloque **(1.ª ampliación)**.
- **Vuelta 3** — el recuadro del resultado configurable **(2.ª ampliación)**, el color de
  bloque, y después la reparación de dos defectos que encontró la QA del operador: el `=`
  atrapado dentro del recuadro, y cuatro superficies llamando «Divisor» a un multiplicador.

**La segunda ampliación disparó el corolario de D-061** —«una ampliación que crece dos
veces indica que el encuadre estaba mal; la segunda se para y se devuelve»—. La cabina
paró y la devolvió; **el operador decidió por escrito mantenerla dentro del run**, y esa
anulación está escrita en el `full_description` para que el roadmap no afirme otra cosa.

**Coste medido de esa decisión:** la QA del componente pasó de **18 → 31 → 51 checks**.

### Pregunta ABIERTA que este relevo no puede responder

**No se sabe si el operador ejecutó los 51 checks o solo la tanda 1** (los 11 de parada,
retrocompatibilidad y las dos reparaciones de la tercera vuelta). Se preguntó tres veces y
no llegó respuesta. **El cierre es válido —el veredicto del operador es la compuerta—,
pero la cobertura de esa QA no está determinada.** Si importa, se pregunta; no se supone.

### Deuda declarada y NO reparada en `#33`

`blockCatalog.js` **no documenta los campos «Operacion» ni «Recuadro del resultado»** en
«Campos que puedes editar». Es documentación incompleta, no falsa. Merece encargo corto.

---

## 4. Las cinco inserciones pendientes — van juntas, en un solo turno

La sesión anterior las acumuló a propósito en vez de insertarlas de una en una. **Ninguna
está en el roadmap todavía.**

| qué | por qué | dónde va |
|---|---|---|
| **Inventario del corpus de borradores guardados** | **Desbloquea CINCO decisiones a la vez.** Tres records del lote piden el mismo inventario antes de tocar esquemas; y también lo piden el `mode: 'top'` de «Texto» y el `success` de «Secuencia de pasos» | **Antes de `#36`** |
| **Sistema de color compartido**: rol de contraste-sobre-acento y que los roles derivados lleguen al render | Es la **pieza compartida** que piden `#34`, el operador, y un encargo que ya paró por ella | **Antes de cualquier run de color de componente** |
| **Encuadre de `mode: 'matrix'`** | Ver §5 | después del lote |
| **Color de «Factorización» por token en cabecera y recuadro** | depende del sistema de color | después de él |
| **Recuadro configurable como concepto general** | el corte por el último `=` sigue fijo | sin urgencia |

---

## 5. El hallazgo de producto: `matrix` ya existe y está apagado

**`mode: 'matrix'` está implementado y el renderer lo pinta** (`renderArithmetic.js:258`
en adelante, antes de las ediciones de la vuelta 3 — **re-derivar la línea**). Es la
**escalera de división simultánea de varios números**, para MCD y MCM, y cada paso lleva
**estado** `fail` / `new` / `calc`: el fixture muestra un intento fallido en rojo y luego
continúa. Es pedagógicamente más rico que la factorización.

**El catálogo lo apaga a propósito:** *«Solo mode factorization. No matrix mode.»*

**Encenderlo NO es quitar una línea.** El `matrix` que existe se apoya en tres cosas que
el contrato de Author Lite prohíbe: `themeColor`, `config.textColors`, y `desc` **con HTML
dentro**. Hace falta diseñar un subconjunto seguro. Es un run propio, de tamaño medio.

**Y la factorización algebraica NO es este componente.** Los dos modos son escaleras de
enteros por construcción (`z.coerce.number().int().positive()`). Factorizar `x²−5x+6` es
una cadena de reescrituras, no una división repetida. **Antes de diseñar nada, medir si
«Secuencia de pasos» y «Regla matemática» ya lo cubren.**

---

## 6. Los siete colores del motor SON tokens de la paleta del autor

Medido hex por hex el 2026-08-06 (`renderArithmetic.js:18-24` frente a
`colorSystem.js:42-142`):

| número | hex | token |
|---|---|---|
| 2 | `#5E81AC` | **Azul** (`ctx`) |
| 3 | `#A3BE8C` | **Verde** (`res`) |
| 5 | `#B48EAD` | **Morado** (`def`) |
| 7 | `#88C0D0` | **Cian** (`ex`) |
| 11 | `#D08770` | **Naranja** (`wrn`) |
| 13 | `#BF616A` | **Rojo** (`err`) |
| resto | `#4C566A` | **Gris** (`meta`) |

Por eso se pudo retirar la opción «Sin color» sin cambiar un píxel. **Y por eso el grupo
«Feedback» de la paleta del autor —Verde, Naranja, Rojo— ya cubre lo que los alias del
motor `success`/`warning`/`error` nombran: son alias marcados como tales en
`commons.js`, no tokens de la paleta.**

---

## 7. Las lecciones caras de esta sesión — todas de la modalidad nueva

**1. La cabina sobregeneraliza en los tickets. Cuatro tickets, cuatro veces.**
`op` está muerto → cierto del renderer Web, **falso del de Slides**. «N divisores y M
factores con color independiente» → **el motor indexa por VALOR**, comparten color. «Los
dos esquemas deben quedar idénticos» → **101 líneas difieren, con nota de divergencia
intencional**; obedecerlo habría tocado `list`, de otro run. `draftSchema.js:421` **para
los dos** → el de `compiler-api` estaba en `:424`.
**Regla propuesta y no adoptada aún: una cita de línea vale para UN archivo; dos archivos
son dos citas. Y si no se puede pegar la línea verbatim junto al número, no se pone el
número.**

**2. Las lecturas de git de la cabina dejaban `index.lock` huérfanos**, y la cabina no
puede borrarlos. Bloqueó un commit del operador. **Solución medida: `--no-optional-locks`
en toda lectura de git.** Verificado: no deja lock.

**3. La vista del montaje puede ir RANCIA.** Dos casos: `D-063` existía y la cabina lo
leyó como libre —salvado a un turno de escribir un duplicado—; y `aiw` se leyó con
cambios sin commitear y un `_probe.md` que en Windows ya no existían. **Una lectura de
disco también es una medición fechada.**

**4. Hay OTRAS sesiones Cowork escribiendo en `aiw-console` a la vez.** Prueba: scripts en
`_scratch` importando desde `/sessions/funny-wonderful-brown/...`, otro nombre de sesión.
**Y `roadmap-core.mjs` es la pieza que la cabina EJECUTA para operar la consola.** La
superficie de ejecución de un hilo es la de escritura de otro — un caso que las reglas no
cubrían. **La cabina no debe operar el canónico mientras otro hilo reescribe el motor.**

**5. El `git add` dirigido por nombre en `aiw-console` se pagó solo.** Un commit de este
hilo entró a las 15:51:18 en mitad del trabajo de otro; nada ajeno se coló.

**6. El commit `742bc7e` de `aiw-console` describe menos de lo que contiene.** Su mensaje
habla del motor de roadmap del hilo `aiw-console`, y además barrió **un record y el
handoff de `cantu-quizzes-latex`**. No se reescribe historia: **se corrige hacia adelante
avisando a esos hilos.**

---

## 8. Punteros

- **Contexto de gobernanza:** `context/cantu-studio/CANTU_STUDIO_CONTEXT.md` — lectura de
  arranque, no lleva estado.
- **Roadmap canónico:** `projects/cantu-studio/.aiw/roadmap/roadmap.json`. **El único.**
  `.project/` es derivada y NO es destino de escritura.
- **Decisiones que gobiernan:** `context/DECISIONES.md` — **`D-064`** (la cabina opera la
  consola), **`D-061`** (ampliación por veredicto de QA), **`D-051`**, **`D-048`**,
  **`D-047`**. **`D-063` es de `cantu-quizzes-latex`, no de este hilo.**
- **Procedimiento de revalidación:**
  `cantu-studio/docs/reference/REFERENCE-COMPONENT-REVALIDATION-DEFINITION-OF-DONE.md`.
  **Tiene tres filas desfasadas medidas** —dos `Palette-resolves: no` y el «header y list
  son los únicos renderers reconciliados», que son siete— **más ocho huecos nuevos del
  procedimiento** declarados por los tres records del lote. Merece un run de carril
  `DOCUMENTATION` cuando cierre el lote.
- **Packets de QA:** `projects/cantu-studio/docs/_historical_run_record/`.
- **Records de esta sesión**, en `context/aiw-console/records/`:
  `REVALIDACION-COMPONENTE-NOTA-DESPLEGABLE-CANTU.md` ·
  `REVALIDACION-COMPONENTE-FACTORIZACION-CANTU.md` ·
  `REVALIDACION-COMPONENTE-REGLA-MATEMATICA-CANTU.md` ·
  `REPARACION-FACTORIZACION-DELIMITADORES-COLOR-Y-SIGNO-CANTU.md` ·
  `RECUADRO-CONFIGURABLE-Y-COLOR-DE-BLOQUE-EN-FACTORIZACION-CANTU.md` ·
  `REPARACION-SIGNO-IGUAL-FUERA-DEL-RECUADRO-Y-NOMBRE-DEL-OPERANDO-CANTU.md`

### Cómo levantar la consola global

Desde `projects/aiw-console`:

```bash
node project-console/serve.mjs
```

Puerto **8788** por defecto, `PC_PORT` lo sustituye. Cantu está registrado con la clave
`cantu-studio`. **Es la única vía que puede editar el canónico**, con flujo dry-run
(`apply:false`) → confirm (`apply:true`) y compare-and-swap por `baseline`.
