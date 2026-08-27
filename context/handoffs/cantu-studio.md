# HANDOFF — hilo `cantu-studio` (el proyecto)

> Escrito por la cabina el **2026-08-26**, tras CERRAR `#134` con aprobación visual del operador.
> **Sustituye al relevo anterior del mismo día.**
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el canónico al abrir. Gana el
> disco.**

---

## ⚠ LO PRIMERO: `#136` NO EMPIEZA CON UN TICKET

**`#136` lleva una PARADA DE ANÁLISIS escrita DENTRO de su `full_description`:**

> *«este run NO empieza escribiendo. Empieza midiendo QUÉ MUEVE EN WEB, y llevándoselo al
> operador.»*

**Esa medición es de la CABINA, no del taller.** El primer acto sobre `#136` es medir el terreno
y llevarle el encuadre al operador — no emitir un encargo. El operador ya eligió `#136` como
siguiente (2026-08-26), así que la parada se celebra en cuanto se abra el hilo.

**Lo que hay que medir, y está dicho en el propio run:**

- `renderTable.js` lee `design/tokens/tokens`, **no** `commons.js`. Es el único de los cinco
  componentes de celda que quedó fuera de la convergencia de la tabla compartida.
- **`tokens.js` lo lee TAMBIÉN WEB** — `web/partials/renderConceptGrid.js`.
- Converger su respaldo cuesta **52 superficies**, más del **triple** que todo el lote 2 entero.
- «Tabla» ya tiene hecho su `theme`: lee la paleta desde el lote 2, y con eso se cerró la
  divergencia del `ctx`. **Lo que falta es su RESPALDO**, el caso en que nadie declara nada.

**Y hay un compromiso de la cabina con `#134` que apunta aquí:** la consolidación de los dos
hexes del verde del paso de resultado quedó **nombrada como trabajo de `#136`** y no se hizo
antes a propósito, para no fabricar trabajo que `#136` tendría que deshacer.

### ⚠ `PARADA-136-LA-PREMISA-DE-LOS-DOS-CARRILES-ERA-FALSA.md` NO ES DE ESTE `#136`

**Medido el 2026-08-26.** Ese registro habla de `textScale` y los mandos de tamaño, y pertenece a
**`RUN-CANTU-SHARED-SIZE-CONTROL-STEPPER-001`**, que estaba en la posición 136 el 2026-08-24.
**El número es una coordenada fechada.** Leerlo como propio de `RUN-CANTU-TOKENS-JS-…` arrancaría
la sesión sobre una premisa ajena.

---

## EL ARRANQUE: DERIVA LA RUTA Y PRUEBA LA CAPACIDAD

La ruta de montaje **cambia entre sesiones**. No la heredes.

**EL BORRADO NACE DESHABILITADO.** Al abrir, `rm` falla con `Operation not permitted`. Se **PIDE**
con `allow_cowork_file_delete` y entonces funciona toda la sesión. **Pídelo ANTES de crear el
primer fichero de prueba.**

Locks: **ninguno en toda la sesión del 2026-08-26**, en decenas de operaciones de git.
Compruébalo igual, con `ls`, en los cinco repos.

### EL VEHÍCULO PARA ESCRIBIR EL CANÓNICO — usado con éxito tres veces el 2026-08-26

- Canónico: **`cantu-studio/.aiw/roadmap/roadmap.json`**. `roadmap/roadmap.json` NO EXISTE.
- Motor: **`aiw-console/tools/roadmap/roadmap-core.mjs`** (2 479 líneas). El canónico declara
  `lanes` y el motor de `cantu-studio` (1 213) no las conoce.
- **Por la consola**, y el servidor **no sobrevive entre llamadas de bash**: todo el ritual va en
  UN solo script. `PC_PORT=<libre> node projects/aiw-console/project-console/serve.mjs`, y POST a
  `/projects/cantu-studio/__project-console/roadmap/edit`.
- Cuerpo: **`{ op, args, apply, baseline }`**. Dry-run con `apply:false` devuelve `baseline`;
  el apply lo exige como compare-and-swap.
- Nombres de argumentos: `set-status` → `{ run, status, closeoutResult }` (**`run`, no `runId`**);
  `set-text` → `{ targetType, targetId, fullDescription }`; `insert` → `{ runId, title, summary,
  fullDescription, before }` (`before` es un **run_id**, no un número).
- `serve.mjs` **re-emite `.project/` él solo** tras cada escritura: los siete artefactos.

### `checkInvariants` — LA FIRMA COMPLETA

    checkInvariants(obj, { externalRunIds })   // OBJETO DE OPCIONES, no posicional

Pasarlo posicional deja `externalRunIds` en `null` y produce **un rojo falso** de dependencia
colgante. Y **`externalRunIdsFor('cantu-studio')` devuelve una PROMESA**: hay que `await`.
Resuelve a un `Set` de **155**.

---

## ESTADO DEL CANÓNICO — medido el 2026-08-26 al cerrar

```
total 164 · completed 140 · active 0 · planned 24
validador: 0 errores · densidad 1..N: true · ids únicos: true
md5: 527da8ae98391f44e4f4391958ca20b1     EOL: \r\n
```

**NO HAY NINGÚN RUN ACTIVO.**

```
#134 completed  Make the author palette win over the engine fixed colour tables   ← cerró hoy
#136 planned    Decide and migrate the tokens.js fallback, which both rails read  ← EL SIGUIENTE
#137 planned    Give the editor a duplicate control for blocks, slides and in-cell items
#138 planned    Remove the outer frame around the terms of Anatomia de formula
#139 planned    Open the badge ink channel of Anatomia de formula and decide its private colour table
#140 planned    Make the JSON import name what it drops instead of dropping it in silence
#141 planned    Admit and implement Calculo aritmetico as an item
```

**`#138` y `#139` tocan el MISMO fichero** (`SlideConceptGridFields.jsx`) y están pegados a
propósito. **`#139` lleva su propia parada de análisis**: su segunda mitad —la tabla privada de
seis colores— **no la pidió el operador** y convergerla mueve árboles.

---

## LO QUE ESTA SESIÓN CERRÓ: `#134`, con aprobación visual

Veredicto verbatim en `context/cantu-studio/records/VEREDICTO-134-CIERRE-APROBADO.md`:
**«jala y me gusta»**, tras siete pasos de QA sin ningún `mal`.

**La enmienda D-061 costó dos rondas, y la primera se equivocó de sitio.** Los tres mandos
nacieron con «Automático»; el operador los probó y devolvió que no servía. Medido: con SU paleta,
**Malva da 2,99 con blanco — 0,0089 por debajo de 3** —, así que la regla seguía eligiendo tinta
oscura. **La regla no arreglaba su queja; el mando manual sí.** La ronda 2 retiró «Automático».

**Forma final, y es el precedente a copiar en `#139`:** listas de **UNA opción más
«Personalizado»** — «Color del título» → Negro; «Color del número de paso» → Blanco. El paso de
resultado cae solo en «Personalizado» con el verde, sin una línea escrita para conseguirlo.

**Y una decisión de la cabina que conviene recordar:** no se tocó `tokens.js` aunque el taller lo
propusiera, **por razón de cola**: es el objeto de `#136`.

---

## ⚠ LAS DOS LECCIONES MÁS CARAS DE LA SESIÓN

### 1 · UN PAYLOAD DE QA SE DERIVA DE `blockFactory`, NUNCA SE ESCRIBE DE MEMORIA

Costó **dos rondas del operador**. La cabina escribió un payload que **pasó
`parseAndValidateBlocks`** y llegó roto al editor. Tres errores:

| se escribió | es | qué pasó |
|---|---|---|
| `columns: 3` | **`layout: { cols: N }`** | la rejilla se borra |
| `accentColor` en `card` | **`variant`** | el color se borra |
| `terms: [f1,f2,f3]` | **array plano que ALTERNA `f, signo, f`** | sin divisores |

**LA PUERTA NO RECHAZA: BORRA.** Una tarjeta con `accentColor` sale como
`{"type":"card","title":"T","content":"C"}` y la puerta devuelve `ok:true`. De aquí nace `#140`.

**Lo que funciona:** partir de `createDefaultSlideItem` / `createDefaultSlideBlock` /
`createDefaultStackSlideBlock`, cambiar sólo los textos, y verificar que el bloque sale **intacto**
comparando **por claves ORDENADAS** (el orden cambia y un `JSON.stringify` crudo da falsos
«cambiado»). **Hay DOS puertas** —la del editor y `SlidesPreviewDraftSchema` del compiler-api— y
**aun las dos juntas no bastan**: el fallo del operador ocurrió en el FORMULARIO, que la cabina
**no puede ejecutar**.

**Trampa medida:** una `x` sola como término se lee como **signo de multiplicar**.

**EL PAYLOAD QUE SÍ FUNCIONÓ está en el commit `f9452062`** y en el relevo anterior; derívalo otra
vez de la fábrica antes de reusarlo, no lo copies a ciegas.

### 2 · UNA SONDA DE TEXTO NO VE UN AGREGADOR

La cabina predijo que se moverían **DOS** árboles y fueron **TRES**. Censó el literal `stackSlide`
con un patrón de texto, y **`showcase_library.js` no contiene esa palabra ni una vez**: hace
`readdirSync` de su directorio, `require` de sus hermanos y re-exporta sus `sectionsSlide` **por
referencia**.

**REGLA: antes de censar el corpus por un literal, acuérdate de `showcase_library.js`.** Vale para
`conceptGrid`, para `card`, para cualquier tipo. **`#139` lleva ese aviso escrito dentro.**

---

## LO QUE QUEDA ABIERTO Y ES DEL OPERADOR

**Sin decidir, y se lo dibujó con coste medido:**

- **Las TRES carpetas de `QA/temp/` sin rastrear** — dos de `#134` y una de `#142`. Eligió
  **ignorarlas hasta que `#134` cerrara y decidirlas juntas**. `#134` ya cerró: toca.
- `cantu-studio/.claude/launch.json` y `aiw-console/context/aiw/records/`, también sin rastrear.

**Declarado y NO reparado en `#134`, con su aprobación explícita:**

- **`res`** (`#87A96B`) en 2,04:1 con blanco.
- **`P4` del procedimiento retirada** como afirmación de contraste. **Su coste: nada avisará si
  un token futuro deja el número ilegible.** `P4-ter` conserva la afirmación donde sigue siendo
  cierta. **El `P4` de la Portada NO se tocó.**
- La consolidación de los dos hexes del verde → `#136`.

**De antes, y siguen vivos:** la Portada con campo de color vacío emite `#4F75A8`;
`.j-v14-badge` fuerza blanco desde la hoja; el desplegable de la Portada miente con el campo
vacío; el DOBLE-ENVUELTO de `getMathContent`; el glifo `Network`; `hideHeader`; los tres
hallazgos de `#135`.

---

## LÍMITES DE LA CABINA — RE-MEDIDOS EL 2026-08-26

- **Borrado: NACE APAGADO, se pide.** `add` y `commit` funcionan; cero locks en toda la sesión.
- **`git push`: sin ruta a GitHub. Es del operador. NO SE LE RECUERDA. NUNCA.**
- **Tope de una llamada de bash: ~178 s.** La red de fixtures comparando sólo árboles cabe
  (~75 s); `node --test` sobre ella **no**.
- **`grep -rn` sobre `tools/author-lite` REVIENTA el límite de salida.** Usa `-l`, acota con
  `--include` y `--exclude-dir=node_modules`, y evita `dist/`.
- **Los procesos en segundo plano NO sobreviven entre llamadas.** `serve.mjs` va dentro del script.
- **La cabina NO VE INTERFACES**, y **no puede ejecutar el formulario del editor**.

---

## REGLAS DEL OPERADOR VIGENTES

- **D-070** — ticket nuevo → sesión nueva; rondas del mismo ticket juntas y **limitadas**.
- **D-071** — **la decisión NO CRÍTICA la toma la cabina y la EXPLICA al tomarla.** Sólo sube lo
  crítico: lo irreversible, el juicio visual, el alcance de un run, los ficheros que la cabina no
  creó, y lo que él ya declaró suyo.
- **El operador decide cuándo se cierra la sesión.** No se cierra por iniciativa de la cabina.
- **No se le recomienda modelo ni esfuerzo en la misma sesión**, pero **la sesión se declara
  siempre**.
- **Toda petición de revisión va en lista numerada de pasos cortos**, uno por línea, diciendo
  primero carril, luego componente, luego qué buscar.
- **Lo que más ha rendido, y son ya siete veces:** dibujarle las opciones **con su coste MEDIDO**
  antes de pedirle que decida. Contestó en una palabra las siete.
