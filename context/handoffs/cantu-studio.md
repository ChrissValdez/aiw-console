# HANDOFF — hilo `cantu-studio` (el proyecto)

> Escrito por la cabina el **2026-08-27**, al cerrarse la PARADA DE ANÁLISIS de
> `RUN-CANTU-TOKENS-JS-SHARED-FALLBACK-CROSSES-RAILS-001`.
> **Sustituye al relevo del 2026-08-26**, que se escribió al cerrar `#134`.
>
> **Se escribe AHORA y no al cerrar sesión, a propósito:** el ticket de este run va en sesión
> nueva (D-070), y esa sesión lee este fichero. Dejarlo con las cifras de ayer la haría arrancar
> sobre un canónico que ya cambió.
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el canónico al abrir. Gana el
> disco.**

---

## ⚠ LO PRIMERO: EL ENCARGO YA ESTÁ DECIDIDO. EMPIEZA CON EL TICKET.

**La parada de análisis de `#136` SE CELEBRÓ el 2026-08-27 y está cerrada.** No la vuelvas a
celebrar. El operador eligió **C** y su veredicto está en disco, verbatim.

**El turno 1 de esta sesión nueva es el ciclo normal de un run:**

1. Derivar `run_id` y título del canónico por `queue_order` — **no teclear ninguno de los dos**.
2. Dry-run de `set-status planned → active`, aplicar, verificar con md5 y validador.
3. Publicar el parte de consola.
4. Debajo, el ticket. **El operador sólo pega el ticket.**

**El alcance del ticket ya está decidido y no se vuelve a preguntar** (el operador lo confirmó el
2026-08-27): se emite **tal como quedó escrito en el `full_description`**, que ya lleva dentro las
cifras medidas y las cuatro exclusiones.

### QUÉ ES «C», en una línea

**Retirar la tabla de color de `src/design/tokens/tokens.js`; cada carril lee el respaldo de SU
PROPIO `commons.js`.** `renderTable.js` pasa a `commons.resolveVariantAccent`;
`web/partials/renderConceptGrid.js` pasa al respaldo de `web/partials/commons.js`, **que ya tiene
su tabla completa** (`PALETTE` + `VARIANTS` por nombre de color) — no hay que inventar ni un hex.

**Los dos registros, y se leen del disco, no de este relevo:**

- `context/cantu-studio/records/PARADA-RUN-CANTU-TOKENS-JS-SHARED-FALLBACK-CROSSES-RAILS-001.md`
- `context/cantu-studio/records/DECISION-TOKENS-JS-EL-RESPALDO-SE-RETIRA-CADA-CARRIL-LEE-EL-SUYO.md`

### ⚠ `PARADA-136-LA-PREMISA-DE-LOS-DOS-CARRILES-ERA-FALSA.md` SIGUE SIN SER DE ESTE RUN

Es de `RUN-CANTU-SHARED-SIZE-CONTROL-STEPPER-001`, que ocupaba la posición 136 el 2026-08-24.
**El número es una coordenada fechada.** La parada de este run se llama por su `run_id`.

---

## ESTADO DEL CANÓNICO — medido el 2026-08-27

```
total 164 · completed 140 · active 0 · planned 24
validador: 0 errores · externalRunIds 155 · densidad 1..N: true · ids únicos: true
md5: e0da373ff155e76e057a283b8cafc21e     EOL: \r\n
```

**NO HAY NINGÚN RUN ACTIVO.** `#136` sigue `planned` — la parada **no** lo abrió.

```
#134 completed  Make the author palette win over the engine fixed colour tables
#135 completed  Repair soloCodigo, which blanks whole files and makes absence guards pass alone
#136 planned    Decide and migrate the tokens.js fallback, which both rails read   ← ESTE
#137 planned    Give the editor a duplicate control for blocks, slides and in-cell items
#138 planned    Remove the outer frame around the terms of Anatomia de formula
#139 planned    Open the badge ink channel of Anatomia de formula and decide its private colour table
#140 planned    Make the JSON import name what it drops instead of dropping it in silence
#141 planned    Admit and implement Calculo aritmetico as an item
```

`#138` y `#139` tocan el MISMO fichero (`SlideConceptGridFields.jsx`) y están pegados a propósito.
**`#139` lleva su propia parada de análisis.**

---

## LO QUE LA PARADA MIDIÓ, Y QUE EL TICKET PUEDE DAR POR TERRENO CONOCIDO

**Método que funcionó, y conviene reusarlo:** renderizar el corpus, **mutar EN MEMORIA** la tabla
del módulo ya cargado —todos los lectores comparten la instancia del `require` cache—, renderizar
otra vez y diffear. Lo que cambia es **por construcción** lo que lee ese módulo. No toca disco.

| carril | componente | superficies distintas |
|---|---|---|
| DIAPOSITIVA | «Tabla» | **27** |
| WEB | rejilla de «Anatomía de fórmula» | **14** |
| | | **41** — no 52 |

- **`.bg` NO SE RENDERIZA NUNCA**, en ninguno de los dos carriles. Mutados los nueve: cero cambios.
- **Todo el coste está en `src/content/sandbox/`.** De 63 ficheros del corpus cambian 4, y dos de
  ellos son el agregador repitiendo a los otros dos. **Cero lecciones, cero staging, cero
  borradores de `author_lite`.**
- `.main` alcanza **6 tokens en diapositiva** (`def ctx str res wrn err`) y **2 en Web**
  (`def focus`).

### LAS DOS GUARDAS QUE EL TICKET NO PUEDE ROMPER

`tools/author-lite/compiler-api/tests/slideEngineColourSelfConsistency.test.mjs`:

- **`C1`** — `web/partials/commons.js` y `tokens.js` coinciden en los **nueve**.
- **`C1-bis`** — la tabla de DIAPOSITIVA (`commons.resolveVariantAccent`) **difiere** en los nueve.

**Hoy difieren 0 de 9: las dos están verdes.** C se eligió precisamente porque retirar la LECTURA
no mueve ninguna de las dos referencias. **Si el taller propone tocar los valores de `tokens.js`,
está fuera de alcance.**

---

## HALLAZGOS NOMBRADOS Y NO ABIERTOS — no son de este run

- **La tabla vieja está escrita a mano en 32 ficheros del motor: 145 apariciones EN CÓDIGO**, 8 en
  comentario. Los mayores: `renderStackSlide.js` (20), `inkEngine.js` (16),
  `_deprecated/renderTimelineSlide.js` (13), `renderArithmetic.js` (11),
  `web/partials/renderNarrative.js` (10), `web/partials/commons.js` (9), `renderConceptCard.js` (8).
  **Retirar `tokens.js` los deja igual.**
- **El compromiso pendiente de `#134` NO depende de este run.** El relevo anterior lo mandaba aquí.
  Medido: `renderStackSlide.js:54` tiene `const VERDE_DEL_RESULTADO = '#A3BE8C'` y
  `commons.js:77` tiene `res: '#87A96B'` — **los dos son literales, y `renderStackSlide.js` NO lee
  `tokens.js`**. Cerrarlo es una edición de ese fichero y se puede hacer en cualquier momento.
  El propio fichero ya declara el defecto en sus líneas 409-411: `#FFF` sobre `#A3BE8C`, **2,04:1**.

---

## ⚠ LAS LECCIONES DE SONDA, Y ESTA SESIÓN AÑADIÓ DOS

### Las dos que venían de antes, y siguen vigentes

1. **Un payload de QA se DERIVA de `blockFactory`, nunca se escribe de memoria.**
   `parseAndValidateBlocks` **no rechaza: BORRA** y devuelve `ok:true`. `columns: 3` es
   `layout:{cols:N}`; `accentColor` en `card` es `variant`; `terms` es un array plano que **alterna**
   `f, signo, f`. Hay DOS puertas y **aun las dos no bastan**: el fallo aparece en el FORMULARIO,
   que la cabina no puede ejecutar. Una `x` sola como término se lee como signo de multiplicar.
2. **Una sonda de texto NO VE UN AGREGADOR.** `showcase_library.js` no contiene la palabra
   `stackSlide` y aun así movió un árbol: hace `readdirSync`, `require` de sus hermanos y re-exporta
   **por referencia**. Verificado otra vez el 2026-08-27 por identidad de objeto: re-exporta **5 de
   5** secciones de diapositiva de `test_tables.js` y **10 de 10** web de `test_theory_complex.js`.

### Las dos nuevas, del 2026-08-27

3. **UNA SONDA QUE BUSCA `tokens.def` NO VE UNA INDEXACIÓN DINÁMICA.** Web accede con
   `resolveColorTheme(tokens, item.variant)`. La primera sonda de la cabina concluyó **«un solo
   lector de color en todo el repo»** y era **falso**. Antes de censar accesos a un módulo,
   preguntarse si alguien lo indexa por variable.
4. **CONTAR APARICIONES DE UN VALOR NO ES CONTAR QUIÉN LO LEE.** El primer censo contó todo hex de
   `tokens.js` en el HTML y dio **3 927**: contaba las copias privadas y las hojas de estilo. **La
   cifra honesta sale del diferencial.** La sonda quedó marcada como descartada, no borrada.

**Las sondas van en FICHERO, nunca en `node -e`.**

---

## EL VEHÍCULO PARA ESCRIBIR EL CANÓNICO — usado con éxito otra vez el 2026-08-27

- Canónico: **`cantu-studio/.aiw/roadmap/roadmap.json`**. `roadmap/roadmap.json` NO EXISTE.
- Motor: **`aiw-console/tools/roadmap/roadmap-core.mjs`** (2 479 líneas). El canónico declara
  `lanes` y el motor de `cantu-studio` (1 213) no las conoce.
- **Por la consola**, y **el servidor no sobrevive entre llamadas de bash**: todo el ritual va en
  UN solo script. `PC_PORT=<libre> node projects/aiw-console/project-console/serve.mjs`, POST a
  `/projects/cantu-studio/__project-console/roadmap/edit`.
- Cuerpo: **`{ op, args, apply, baseline }`**. El dry-run con `apply:false` devuelve el `baseline`;
  el apply lo exige como compare-and-swap. Puertos 8231-8234 libres el 2026-08-27.
- `set-status` → `{ run, status, closeoutResult }` (**`run`, no `runId`**);
  `set-text` → `{ targetType:'run', targetId, fullDescription }`;
  `insert` → `{ runId, title, summary, fullDescription, before }` (`before` es un **run_id**).
- **La respuesta NO trae `errors` cuando todo va bien: trae `undefined`.** No leerlo como fallo.
- `serve.mjs` **re-emite `.project/` él solo**: los siete artefactos entran en el mismo commit.

### `checkInvariants` — LA FIRMA, Y DÓNDE VIVE CADA PIEZA

    checkInvariants(obj, { externalRunIds })   // OBJETO DE OPCIONES, no posicional

**`externalRunIdsFor` NO vive en el motor.** Vive en `aiw-console/project-console/serve.mjs`
(definida en la línea 364, exportada en la 1342) y **devuelve una PROMESA**: hay que `await`.
Resuelve a un `Set` de **155**. Importarlo del motor deja `externalRunIds` en `null` y produce
**un rojo falso** de dependencia colgante — pasó el 2026-08-27.

### LOS RUNS NO VIVEN EN LA RAÍZ

`objectives[].phases[].runs[]`. Leer `obj.runs` devuelve **`total 0`**, que es una sonda mal
escrita y no un canónico vacío. Pasó el 2026-08-27.

---

## LO QUE QUEDA ABIERTO Y ES DEL OPERADOR

**Resuelto el 2026-08-27:** las tres carpetas de `QA/temp/` **ya están commiteadas**
(`5d26af8a`, 56 ficheros). Y **el relevo anterior atribuía una de ellas a `#142`: era falso.**
`RUN-CANTU-SLIDE-HIERARCHY-TYPE-EXPOSE-001` está en `queue_order` **146**. `#142` es
`…-STACK-TYPE-EXPOSE-001` y **no tiene carpeta en `QA/temp/`**.

**Sigue sin rastrear, y no lo creó la cabina:** `cantu-studio/.claude/launch.json` y
`aiw-console/context/aiw/records/`.

**Declarado y NO reparado en `#134`, con su aprobación explícita:** `res` (`#87A96B`) en 2,04:1 con
blanco; la `P4` del procedimiento retirada como afirmación de contraste —**nada avisará si un token
futuro deja el número ilegible**—; `P4-ter` conserva la afirmación donde sigue siendo cierta; el
`P4` de la Portada **no se tocó**.

**De antes, y siguen vivos:** la Portada con campo de color vacío emite `#4F75A8`; `.j-v14-badge`
fuerza blanco desde la hoja; el desplegable de la Portada miente con el campo vacío; el
DOBLE-ENVUELTO de `getMathContent`; el glifo `Network`; `hideHeader`; los tres hallazgos de `#135`.

---

## LÍMITES DE LA CABINA — RE-MEDIDOS EL 2026-08-27

- **Borrado: NACE APAGADO, se pide** con `allow_cowork_file_delete`, **antes de crear el primer
  fichero de prueba**. Se concede **para toda la carpeta** y dura la sesión.
- **`.git` es escribible**; `add` y `commit` funcionan. **Cero locks en toda la sesión.**
- **`git push`: sin ruta a GitHub. Es del operador. NO SE LE RECUERDA. NUNCA.**
- **Tope de una llamada de bash: ~178 s.** Renderizar el corpus entero **dos veces** cabe (~40 s).
- **`grep -rn` sobre `tools/author-lite` revienta el límite de salida.** Usa `-l`, acota con
  `--include` y `--exclude-dir=node_modules`, evita `dist/`.
- **Los procesos en segundo plano NO sobreviven entre llamadas.** `serve.mjs` va dentro del script.
- **La cabina NO VE INTERFACES**, y **no puede ejecutar el formulario del editor**.
- **`_scratch/` NO es todo de la cabina.** Hay material de sesiones anteriores del operador: la
  cabina borra **lo suyo** y lista lo que no borró.

---

## REGLAS DEL OPERADOR VIGENTES

- **D-070** — ticket de run nuevo → **sesión nueva**; rondas del mismo ticket juntas y **limitadas**.
- **D-071** — **la decisión NO CRÍTICA la toma la cabina y la EXPLICA al tomarla.** Sólo sube lo
  crítico: lo irreversible, el juicio visual, el alcance de un run, los ficheros que la cabina no
  creó, y lo que él ya declaró suyo.
- **El operador decide cuándo se cierra la sesión.** No se cierra por iniciativa de la cabina.
- **No se le recomienda modelo ni esfuerzo**, pero **la sesión se declara siempre**.
- **Toda petición de revisión va en lista numerada de pasos cortos**, uno por línea, diciendo
  primero carril, luego componente, luego qué buscar.
- **Dibujarle las opciones con su coste MEDIDO antes de pedirle que decida.** Van **ocho veces** y
  las ocho contestó en una palabra — la última, «vamos con C».
- **Mensajes de commit y scripts por FICHERO**, nunca por línea de shell. **`add` dirigido por
  nombre, nunca `-A`.** **El taller nunca toca git.**
