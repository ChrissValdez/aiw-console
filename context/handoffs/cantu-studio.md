# HANDOFF — hilo `cantu-studio` (el proyecto)

> Escrito por la cabina el **2026-08-26**, al cerrar la sesión que re-fijó los árboles del
> corpus y arrancó la enmienda D-061 del color del paso.
> **Sustituye al relevo del 2026-08-26 anterior (el de `#142`).**
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el canónico al abrir. Gana el
> disco.**

---

## ⚠ LO PRIMERO QUE TIENES QUE HACER, Y NO ES EL ARRANQUE

**Esta sesión cerró con una enmienda D-061 APROBADA Y SIN APLICAR.** El operador dijo «A» a la
enmienda y «A» al umbral. Lo primero de la sesión nueva, después del arranque, es entregar **en
UN SOLO TURNO**:

1. **La enmienda del `full_description` de `#134`** — por la consola, con el ritual completo.
2. **El ticket del taller**, debajo, sin anunciarlo.

D-061 exige que el texto del run se enmiende **en el mismo encargo**. No se separan.

---

## LO PRIMERO DEL ARRANQUE: DERIVA LA RUTA Y PRUEBA LA CAPACIDAD

La ruta de montaje **cambia entre sesiones**. No la heredes.

**MEDIDO EL 2026-08-26 Y CORRIGE AL RELEVO ANTERIOR: el borrado NACE DESHABILITADO.** El relevo
de `#142` decía «borrado, `add` y `commit`: funcionan», y al abrir esta sesión **`rm` falló con
`Operation not permitted`**. Hay que **PEDIRLO** con `allow_cowork_file_delete`, y entonces
funciona para toda la sesión. **Pídelo en el arranque, antes de crear el primer fichero de
prueba** — yo no lo hice y dejé dos probes dentro de `.git` que no podía borrar.

Locks: **ninguno en los cinco repos**, ni al abrir ni tras decenas de operaciones de git.
Compruébalo igual, con `ls`.

### EL VEHÍCULO PARA ESCRIBIR EL CANÓNICO — sigue vigente, medido el 2026-08-25

- Canónico: **`cantu-studio/.aiw/roadmap/roadmap.json`**. `roadmap/roadmap.json` NO EXISTE.
- Motor: **`aiw-console/tools/roadmap/roadmap-core.mjs`** (2 479 líneas). El de `cantu-studio`
  (1 213) no conoce `lane`, y el canónico declara `lanes`.
- Se escribe por la consola: `serve.mjs` en puerto libre, POST a
  `/projects/cantu-studio/__project-console/roadmap/edit`. Dry-run, luego apply con baseline.
- Nombres de argumentos: `set-status` → `{ run, status, closeoutResult }` (**`run`, no `runId`**);
  `set-text` → `{ targetType, targetId, fullDescription }`; `insert` → `{ runId, title, summary,
  fullDescription, before }`.

### ⚠ `checkInvariants` — EL RELEVO ANTERIOR ESTABA INCOMPLETO Y ME COSTÓ UN ROJO FALSO

Decía «exige un `Set`, no un array». **Cierto sobre el VALOR y mudo sobre la FORMA.** La firma
real es:

    checkInvariants(obj, { externalRunIds })   // OBJETO DE OPCIONES

Pasé el `Set` **posicional**, `externalRunIds` se quedó en `null`, y obtuve **1 error de
dependencia colgante que era falso**. Estuve a punto de publicarlo como discrepancia contra el
relevo. Con la forma buena: **0 errores**.

Y `externalRunIdsFor('cantu-studio')` **devuelve una PROMESA**. Hay que `await`. Resuelve a un
`Set` de **155**.

---

## ESTADO DEL CANÓNICO — medido el 2026-08-26 a las 03:44

```
total 160 · completed 139 · active 1 · planned 20
validador: 0 errores · history=139 · ready_next=20
densidad 1..N: true · ids únicos: true
md5: b5a27310e8c03a34e661bb832ebaa09a   (SIN TOCAR en toda la sesión)
EOL: \r\n
```

- **Único run activo: `#134` «Make the author palette win over the engine fixed colour tables»**,
  `RUN-CANTU-SLIDE-AUTHOR-PALETTE-WINS-001`, carril `DEVELOPMENT`.
- **Siguiente por cola: `#136` «Decide and migrate the tokens.js fallback, which both rails read».**
- **El carril NO es un campo de `#134`.** Sólo 12 de 160 runs llevan `lane`, y los doce son
  `DOCUMENTATION`. El resto resuelve al defecto, `DEVELOPMENT`. Confirmado con `resolveRunLane`.

---

## LO QUE ESTA SESIÓN HIZO

### 1 · La red de fixtures pasó de 10 rojos a 0

Los árboles seguían fijados en `09d09709`, **antes del lote 0**, mientras los cuatro lotes de la
migración ya estaban en disco. El operador eligió la opción **B**: separar por causa.

- **`14534e33`** — los **7** que movió el color. Pares sistemáticos: `#5E81AC → #4F75A8` (el `ctx`,
  **convergió**), `#C2B280 → #B69F58` (el `focus`), y seis más. Más `#5C4B40` y `#6B6352`
  entrando sin nada que salga: la tinta oscura de la insignia, de 1,55:1 a 5,95:1.
- **`8d0241ac`** — los **3** de «Jerarquía», declarados como **deuda de `#142`**, que cerró sin
  re-fijar los árboles que movió aunque su propio fijador lo manda.

**La red completa tarda ~75 s** y **no cabe en `node --test` dentro de una llamada** (tope
~178 s). Lo que sí cabe: comparar sólo los árboles, por tandas reanudables. La suite entera
sigue sin caber.

**Punto ciego declarado y NO medido:** `#AA00BB` y `#0FA47A` entran una vez cada uno en
«Jerarquía». Hipótesis: colores del autor en el contenido. Sin confirmar.

### 2 · D-070, del operador

Ticket nuevo → sesión nueva; rondas del mismo ticket juntas, y **limitadas**. El corte es el
`run_id`, y hay un **segundo motivo** de corte: el TAMAÑO del contexto arrastrado.
Commit `4b7d66b` en `aiw-console`.

### 3 · La QA de `#134` se ejecutó y PASÓ, salvo un hallazgo

Palabras del operador: **«lo demás jaló ya con este json»**. Tarjeta, Nota destacada, Portada y
«Anatomía de fórmula» pasaron. **Queda un solo defecto**, y es el de abajo.

---

## ⚠ LOS PAYLOADS DE QA SE DERIVAN DE `blockFactory`, NUNCA SE ESCRIBEN DE MEMORIA

**Es la lección más cara de esta sesión y le costó dos rondas al operador.**

Escribí un payload de memoria. Pasó `parseAndValidateBlocks` —la puerta que el relevo manda
usar— **y el editor lo mostró roto y la previa falló**. Tres errores míos:

| escribí | es | qué pasó |
|---|---|---|
| `columns: 3` | **`layout: { cols: N }`** | la rejilla se borra en silencio |
| `accentColor` en `card` | **`variant`** | el color se borra en silencio |
| `terms: [f1, f2, f3]` | **array plano que ALTERNA `f, signo, f, signo, f`** | sin divisores |

**LA PUERTA NO RECHAZA NADA DE ESO: LO BORRA.** Medido: una tarjeta con `accentColor` sale de la
puerta como `{"type":"card","title":"T","content":"C"}`, desnuda. **Pasar la puerta no significa
que el bloque esté bien.**

**Lo que funciona:** partir de `createDefaultSlideItem(...)` / `createDefaultSlideBlock()` /
`createDefaultStackSlideBlock()` y **sólo cambiar los textos**. Luego verificar que el bloque
sale **intacto** de la puerta, comparando **por claves ordenadas** (el orden de claves cambia y
un `JSON.stringify` crudo da falsos «cambiado»).

**Hay DOS puertas, no una.** La segunda es `SlidesPreviewDraftSchema` del `compiler-api`. Pásalo
por las dos. **Y aun así no basta**: el fallo del operador ocurrió en el FORMULARIO, que la
cabina **no puede ejecutar**. No reproduje su error exacto y lo declaré así.

**Trampa medida:** una `x` sola como término se lee como **signo de multiplicar** y deja el
término vacío.

### EL PAYLOAD QUE SÍ FUNCIONÓ, verbatim

```json
[
  { "kind": "titleSlide", "title": "Migracion de paleta", "subtitle": "Los colores salen de tu paleta", "badge": "QA 134", "description": "" },
  { "kind": "columnsSlide", "title": "Tarjeta y Nota destacada", "subtitle": "", "layout": { "cols": 2 },
    "items": [
      { "type": "card", "variant": "ctx", "title": "Tarjeta A", "content": "Debe pintar el color de tu paleta." },
      { "type": "card", "variant": "ctx", "title": "Tarjeta B", "content": "Mismo color que A: las dos usan el mismo token." },
      { "type": "callout", "variant": "subtle", "accentColor": "meta", "title": "Nota destacada", "content": "Su borde izquierdo sale de la paleta." }
    ] },
  { "kind": "stackSlide", "studioTitle": "QA 134 - contraste de insignias",
    "steps": [
      { "title": "Ecuación lineal", "math": "2x + 3 = 11" },
      { "title": "Restar 3 en los dos lados", "math": "2x = 8", "details": "Lo que hacemos de un lado hay que hacerlo del otro." },
      { "title": "Dividir entre 2", "math": "x = 4", "isResult": true }
    ] },
  { "kind": "columnsSlide", "title": "Anatomia de formula", "subtitle": "", "layout": { "cols": 1 },
    "items": [
      { "type": "conceptGrid", "variant": "def", "accentColor": "def", "title": "Partes de la ecuacion", "badge": "3 TERMINOS",
        "terms": ["a", "+", "b", "+", "c"], "content": "La tinta de la insignia debe leerse oscura, no blanca." }
    ] }
]
```

---

## LA ENMIENDA D-061 APROBADA — lo que la sesión nueva tiene que entregar

Guardada verbatim en `context/cantu-studio/records/DECISION-134-EL-COLOR-DEL-PASO-Y-SUS-TRES-MANDOS.md`,
commit `9705560`.

### El defecto

«Procedimiento matemático» **no tiene canal de color**. Su acento sale de `variantMap`, tabla
privada de siete tokens. Lo dice el propio editor en su cabecera (`SlideStackEditor.jsx:108`).

**Y `#134` PROMETIÓ ESTO EN SU `full_description` Y NO LO ENTREGÓ.** Es el primero de los
pendientes que su texto dice que «ya se acumulan esperando este run». **El lote 1 arregló la
TINTA de la insignia y no abrió el CANAL del color.** Son dos cosas y sólo se hizo una.

### Lo que el operador pidió — tres mandos, con «Regla matemática» (`split`) de referencia

| mando | opciones |
|---|---|
| **Color** | paleta global + personalizado |
| **Color del título** | Automático · Blanco · Negro · Personalizado |
| **Color del número de paso** | Automático · Blanco · Negro · Personalizado |

`ColorTokenOrCustomField` (`components/common/VariantSelect.jsx:131`) **ya existe** y la montan
siete componentes, incluido `SlideSplitFields.jsx:475`. **No se escribe selector nuevo.**

### El umbral de «Automático»: eligió **A**

Medido sobre los nueve tokens cargados de `commons.js`:

| token | acento | blanco | negro | emite HOY |
|---|---|---|---|---|
| `def` | `#9B6FA5` | **4,03** | **5,21** | blanco |
| `ctx` | `#4F75A8` | 4,73 | 4,44 | blanco |
| `ex` | `#6EB4C7` | 2,33 | 9,02 | `#2A4F5B` |
| `focus` | `#B69F58` | 2,60 | 8,09 | `#5C4B40` |
| `str` | `#C9BFAE` | 1,82 | 11,55 | `#6B6352` |
| `res` | `#87A96B` | 2,65 | 7,92 | blanco |
| `wrn` | `#C97353` | 3,46 | 6,06 | blanco |
| `err` | `#B24B5A` | 5,19 | 4,05 | blanco |
| `meta` | `#3F4A5D` | 8,94 | 2,35 | blanco |

**REGLA ELEGIDA (A): blanco si despeja 3:1; si no, la tinta oscura.** Es la que ya aplica el
motor. Su punto flojo declarado es `res` (2,65 con blanco).

**HALLAZGO QUE CAMBIA EL DIAGNÓSTICO, y se midió:** para `def` —el paso que el operador vio— **la
tabla del motor emite BLANCO**, no tinta oscura. Así que **el número oscuro viene de la
derivación de SU paleta** (fuente 1, `accentTextColor`), no del motor. **No se midió su paleta
activa**, y no se debe afirmar más de eso.

**Y una trampa nombrada:** «máximo contraste» **no** es lo que él pidió y le daría negro en `def`
—5,21 contra 4,03—, que es justo lo que rechazó. Él describió un umbral de claridad, no una
maximización. Las dos reglas discrepan en `def`, `res` y `wrn`.

---

## LO QUE QUEDA ABIERTO Y ES DEL OPERADOR

**De `#134`:**

- **La enmienda D-061 de arriba.** Aprobada, sin aplicar.
- El re-fijado de árboles **ya no está pendiente**: se hizo, y la red está verde.

**Runs nuevos que el operador nombró y NO se insertaron en la cola** — decisión suya pendiente:

1. **Duplicar componente y duplicar diapositiva.** No existe en ninguna parte para bloques; sólo
   para lecciones (`LessonExplorerModal`). **`BlockFrame.jsx` es UNA cabecera compartida por los
   dos carriles** —la usan `WebBlockEditor`, `SlideBlockEditor`, `SlideHierarchyEditor`,
   `SlideStackEditor` y `SlideTitleSlideEditor`—, y `useFieldArray` ya trae `insert()` sin usar.
   **LA TRAMPA, MEDIDA:** duplicar byte a byte **repite el id acuñado**. Rendericé un bloque una
   vez y dos: `j-stack-863teqnvk` las dos veces. El id se deriva del CONTENIDO. **El botón tiene
   que re-acuñar.** Son diez prefijos: `j-stack-`, `j-arith-`, `tree-`, `j-table-`, `narr-`,
   `j-video-`, `j-visual-`, `j-container-`, `j-grid-`, `vis-`.
   Y son **dos superficies**: `BlockFrame` y `SlideGridMap` (componentes dentro de «Libre»).
   La cabina recomendó **un solo run** para las dos; el operador **no decidió**.
2. **El recuadro dentro del recuadro de «Anatomía de fórmula».** Palabras suyas: quitar la caja
   grande de TERMINOS y dejarlos colgando como los PASOS de «Procedimiento matemático».
   Superficie: **UNA línea**, `SlideConceptGridFields.jsx:211`. Es el único recuadro de su clase.
3. **La puerta que borra campos en silencio** en vez de avisar. Nombrado, sin run.

**De `#142`, sin dueño:** el glifo `Network`; exponer `hideHeader`; el DOBLE-ENVUELTO de
`getMathContent` en «Procedimiento matemático»; el nodo sin `variant` en el esquema; la guarda de
HTML ciega en el canal del autor.

**De antes:** la Portada con campo de color vacío emite `#4F75A8`; `.j-v14-badge` y
`.j-anatomy-badge` fuerzan blanco desde la hoja; el desplegable de la Portada miente con el campo
vacío; los tres hallazgos de `#135`.

---

## LO QUE ESTA CABINA HIZO MAL

1. **El payload escrito de memoria** — dos rondas del operador. Ya está arriba con su regla.
2. **`checkInvariants` posicional** → rojo falso, casi publicado como discrepancia.
3. **Dos probes dentro de `.git`** creados antes de pedir el permiso de borrado.
4. **Dije que la causa del fallo era `columns` vs `layout` y era INCOMPLETO**: las dos puertas
   aceptan ambas formas. Lo corregí en el mismo turno en vez de dejarlo correr.

**Lo que sí funcionó y conviene repetir:** **dibujarle las opciones con su coste MEDIDO antes de
pedirle que decida.** Cuatro veces esta sesión —el re-fijado, el run de duplicar, la enmienda
D-061 y el umbral— y **las cuatro eligió en una palabra**: «B», «A», «A», «A».

---

## LÍMITES DE LA CABINA RE-MEDIDOS EL 2026-08-26

- **Borrado: NACE APAGADO. Se pide.** `add` y `commit` funcionan; ningún lock en toda la sesión.
- **`git push`: sigue sin ruta a GitHub.** Es del operador. **NO SE LE RECUERDA. NUNCA.**
- **Tope de una llamada de bash: ~178 s.** `node --test` sobre la red de fixtures no cabe.
- **`grep -rn` sobre `tools/author-lite` REVIENTA el límite de salida.** Usa `-l`, acota con
  `--include` y `--exclude-dir=node_modules`, y evita `dist/`.
- **La cabina NO VE INTERFACES.** Todo juicio visual es del operador, y el formulario del editor
  no se puede ejecutar aquí.

---

## HIGIENE AL CIERRE

- **Borrado por la cabina:** sus ~20 sondas de la sesión, sus 4 ficheros de mensaje de commit, el
  respaldo de `DECISIONES.md`, el respaldo de los 63 árboles, y un probe suyo del arranque.
- **NO borrado, porque no es suyo:** los ~130 ficheros de `_scratch` y los respaldos de
  `_backups` de sesiones anteriores. **Hay 7 respaldos de roadmap ahí que probablemente ya no
  hacen falta** — es del operador decidirlo.
- **Sin rastrear, y el operador no ha decidido:** `cantu-studio/.claude/launch.json`,
  `cantu-studio/QA/temp/RUN-CANTU-SLIDE-HIERARCHY-TYPE-EXPOSE-001/` (de un run ya cerrado), y
  `aiw-console/context/aiw/records/`.
