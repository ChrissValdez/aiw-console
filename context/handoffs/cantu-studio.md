# HANDOFF — hilo `cantu-studio` (el proyecto)

> Escrito por la cabina el **2026-08-12**, al cerrar la sesión que llevó `#55` → `#60`.
> Sustituye al relevo del 2026-08-11. Todo lo de aquí está **medido**, no recordado, y lleva
> su fecha. **Las cifras de este documento son mediciones fechadas: contrástalas contra el
> canónico al abrir. Gana el disco.**

---

## ⚠ LO PRIMERO: DERIVA LA RUTA Y PRUEBA LA CAPACIDAD

La ruta de montaje **cambia entre sesiones**. No la heredes. Deriva, prueba que se lee el
workspace, que el validador corre y que `git log` responde en los cinco repos. **Si algo
falla, declara modo ESPEJO.**

**Y tres cosas que costaron tiempo, dos de ellas corrigiendo este mismo documento:**

1. **Todo comando de git lleva `--no-optional-locks` Y un `timeout` explícito.** Un comando
   muerto por timeout deja un `.git/index.lock` huérfano que bloquea los commits del
   operador. **En esta sesión no apareció ni uno**, con esa disciplina y timeouts de 90–280 s.
   `status --porcelain` es seguro aunque se mate; `diff` no.
2. **`dist/` está RASTREADO, no ignorado.** **47 ficheros rastreados según git, 76 en disco**
   — las dos cifras son ciertas y son distintas cosas; el taller sólo puede medir la segunda.
   Un barrido con `require()` sobre `.js` del repo **para descubrir qué cargar** los ejecuta.
   Cargar un módulo nombrado a propósito es otra cosa y es legítima.
3. **LA CABINA NO PUEDE BORRAR. El relevo anterior decía que sí y era FALSO.** Medido el
   2026-08-11: `rm` sobre `_scratch` → `Operation not permitted`. Todo respaldo y todo fichero
   suelto que la cabina cree **lo tiene que borrar el operador**, con su ruta completa.

---

## ⚠⚠ LA VÍA DE ESCRITURA DEL CANÓNICO ES LA CONSOLA, NO EL CLI

**Es el hallazgo que más tiempo costó al arrancar y no está en ningún otro sitio.**

`cantu-studio/tools/roadmap/roadmap-edit.mjs` es el único CLI de edición, e importa **su
propio** `roadmap-plan.mjs`, que es el motor viejo. **Se NIEGA a escribir**, con este mensaje:

    target file already fails the invariants; fix it before editing
    run RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001
      depends on unknown run RUN-CANTU-ROADMAP-CONTENT-AUDIT-001 (orphaned dependency)

**Es un FALSO POSITIVO.** Ese run existe: es el `#4` `completed` del canónico de
`aiw-console`. Es una dependencia externa **legal**. El motor viejo no conoce el concepto;
el nuevo sí — `aiw-console/tools/roadmap/roadmap-core.mjs:423`,
`checkInvariants(obj, { externalRunIds })`.

**La forma que funciona, usada nueve veces esta sesión sin un solo fallo:**

    cd projects/aiw-console/project-console
    PC_PORT=88xx node serve.mjs &          # cero dependencias externas
    POST http://127.0.0.1:88xx/projects/cantu-studio/__project-console/roadmap/edit
      { op, apply:false, args }            # dry-run: devuelve remap + baseline
      { op, apply:true, baseline, args }   # compare-and-swap; re-emite .project/ solo

`serve.mjs` compone `externalRunIds` desde `project-console/projects.json` y se los pasa a
`planEdit`. **Y re-emite los 7 artefactos de `.project/` él solo** tras cada escritura: la
cabina no tiene que hacerlo aparte.

**Nombres de argumento que no son obvios y costaron un turno cada uno:**

- `set-text` NO usa `run`. Usa `targetType:"run"` + `targetId`.
- `move` exige **una** de `after` / `before` / `toOrder`. `toPhase` solo no basta.
- `set-classification` usa `correctnessModel`, `workType`, `blastRadius`, `failureSurfaces`
  en camelCase, y **el vocabulario es cerrado**. `MECHANICAL_ORACLE`, `SYSTEMIC`, `WIDE` y
  `HIDDEN` **NO son válidos** — se probaron y el batch se negó. Deriva el vocabulario real
  del canónico antes de usarlo.

**Y la escritura del canónico desde la cabina, que el relevo anterior daba por no probada,
ESTÁ PROBADA:** nueve escrituras aplicadas, todas con md5 antes/después y verificación campo
a campo contra respaldo. Funciona pese a que la cabina no pueda borrar.

---

## QUÉ SIGUE — lo primero al abrir

**No hay ningún run `active`.** La cola quedó quieta a propósito.

`history=60` · **84 runs** · `ready_next=4` · canónico **`1d341fe3`** al cerrar (árbol CRLF).

    aiw 38bb00b · aiw-console f21b814 · cantu-studio c7c8e0e
    cantu-lessons eeb2551 · cantu-quizzes-latex 8a0b367

**Elegibles ahora mismo:** `#61` «Verify global Formula Inserter integration», `#62` «Audit
and define the Slide grid system», `#79` y `#80` (documentación).

**El operador dejó dicho el orden: 58 → 60 → 61.** Los dos primeros cerraron; **lo siguiente
por su palabra es `#61`.**

### Cinco cosas esperan decisión suya y NINGUNA se puede lanzar sola

No las repitas como preguntas sueltas: llévalas dentro del ticket que las toque.

1. **«Nota desplegable» como hijo de Dos columnas.** Lo pidió él directamente. Hoy está fuera
   en cuatro capas: `COLUMN_CHILD_OPTIONS` (11 tipos), la unión de los dos esquemas, la
   fábrica, y `renderColumns` sin `case`. **Y `#58` acaba de escribir la guarda que lo
   rechaza**, así que abrirlo obliga a bajar esa lista de seis a cinco — hay una prueba que lo
   fuerza. **Pregunta abierta que él no contestó:** si el run mide también los otros cinco
   (`columns` anidado, `Video`, `Cálculo aritmético`, `Jerarquía`, `Secuencia de pasos`) o se
   acota a uno. La cabina recomendó acotarlo.
2. **Grupo C, tres runs**, sacados de `#58` por decisión suya: los **nueve** márgenes de raíz
   puestos en escala; las **284** declaraciones de color cableadas convertidas a roles; y las
   guardas de HTML. **Los tres mueven todas las lecciones existentes.**
3. **El `findWebComponent` de `main.js`** — hallazgo de `#60`, sin reparar. `main.js:48` lleva
   una **segunda copia** con el mismo empate latente **y una divergencia previa**: no tiene
   `WEB_TYPE_ENGINE_ALIASES`, así que **`split` resuelve distinto allí que en el motor**.
   Repararlo cambia lo que el build de `dist` emite para `split` — es un píxel, es otro run.
4. **`#57`, `#58` y `#60` quedaron SIN CLASIFICACIÓN escrita.** Derívala del vocabulario real
   y pónsela a los tres de una vez.
5. **La deuda con nombre de `#57`:** la regla del último `=` y el recuadro del resultado
   **debe volver como CONTROL, no como texto** — el campo mostrando qué mitad va a quedar en
   recuadro mientras el autor escribe. Hoy **no está explicada en ninguna parte**; sólo es
   observable en la vista previa. Él aceptó perderla sabiendo eso.

---

## EL PATRÓN QUE FUNCIONÓ CUATRO VECES: el encargo en DOS ACTOS

**Es lo más valioso que produjo esta sesión y no está en la configuración.**

**Acto uno: el taller MIDE y PARA, sin implementar nada. Acto dos: el operador decide y el
taller implementa.** Se usó en la pérdida de pasos, en la retirada de la Guía, en los
paquetes y en el determinismo. **En los cuatro, el acto uno desmintió algo que se daba por
cierto**, y en dos de ellos reencuadró el run entero.

Cómo se escribe: el ticket dice en el objetivo que **terminar el acto uno sin implementar
nada es el resultado esperado, no un fallo**, y lo respalda con una condición de parada
explícita. Sin esa frase, un taller competente implementa y decide de paso.

**Cuándo usarlo:** siempre que el trabajo mueva algo que el operador no ha autorizado, o
cuando el encuadre dependa de una medición que aún no existe.

**Lo que hace que funcione es la separación adversaria, y hay una prueba limpia:** en `#58`
el taller del acto dos **era una sesión distinta que no traía las mediciones del acto uno**,
las volvió a hacer desde disco, y **encontró tres discrepancias** — dos de ellas cifras que
la cabina había copiado del acto uno sin re-medir.

---

## Lo que hizo esta sesión

**Cuatro runs cerrados, dos insertados, nueve commits.** Tres de los cuatro **no existían al
abrir**.

| run | qué | rondas |
|---|---|---|
| `#55` Modo matriz de Aritmética por la vía de autoría | insertado y cerrado | **4** |
| `#56` La pérdida de pasos al cambiar de modo | insertado y cerrado | 2 actos |
| `#57` Retirada de la Guía de componentes | cerrado | 2 actos |
| `#58` Paquetes, readiness y las deudas de familia | cerrado | 2 actos |
| `#60` Determinismo de los motores y red de fixtures | insertado y cerrado | 1, sin QA |

**Nueve veredictos y decisiones del operador quedaron versionados en el repo**, verbatim, en
`docs/_historical_run_record/`. Ninguno murió en el chat. Es la primera sesión en que eso se
cumple entero.

### Lo que más cambió el estado del proyecto

**El motor es determinista.** Diez acuñadores sembrados desde un SHA-256 del `data` del
componente. **La estabilidad del corpus pasó de 21/42 a 42/42** — ese es el número que mide
el defecto, no los «942 bytes» de un caso. Probado además **entre procesos distintos**.

**Existe una red de 63 árboles fijados sobre los 42 ficheros de contenido.** Es lo que
permite a los cinco runs pendientes probar qué movieron. La referencia es **la salida
anterior a sembrar**, no lo que produce el motor de hoy.

**`renderColumns` cruza el stack Y alcanza los portadores profundos.** Y aquí está el
hallazgo que reencuadró `#58`: **el texto del run se equivocaba sobre cuál reparación movía
lecciones publicadas**. El selector movía **cero**; la que las movía era una **segunda causa
que nadie había medido** — `card` y `list` llevan el margen **un nivel por debajo** de su
raíz.

**Aritmética tiene dos modos autorables**, matriz acumulada por paso, botón de tachar por
fila, y un diálogo que enumera lo que un cambio de modo pierde.

**La Guía de componentes ya no existe** en ninguna superficie. `blockCatalog.js` bajó de 1 321
a 349 líneas.

---

## Cómo trabaja este operador — lo aprendido, corregido y ampliado

- **Decide mirando el resultado, no leyendo la descripción.**
- **Odia las notas de ayuda pequeñas en el panel.** *Envejecen rápido y hacen ruido visual.*
  **Quítalas por defecto**, y distingue nota de **mensaje de validación**, que sí se queda.
  **ESTO YA ESTABA EN EL RELEVO ANTERIOR Y LA CABINA NO LO TRASLADÓ A NINGÚN TICKET. Costó
  TRES RONDAS de `#55`.** Es el defecto más caro de la sesión y era de lectura, no de juicio.
- **Rechaza los modos automáticos derivados.** Si no elige, no aparece. Una siembra al
  insertar sí la acepta; un recálculo en vivo, no.
- **Quiere que el desplegable sólo ofrezca cosas elegibles.** Por eso cayó el desplegable de
  tres marcas del paso: dos de las tres opciones renderizaban idéntico.
- **Nombra él mismo lo que quiere.** «tachar / no tachar» lo puso él, y era mejor que
  «Este divisor no funcionó», que era invención de la cabina y él rechazó por no entendible.
- **Contesta en prosa y salta preguntas.** **Si una decisión no llega en DOS vueltas, tómala
  con la recomendación escrita y decláralo reversible.** Se aplicó tres veces esta sesión y
  las tres funcionaron — incluido el cierre de esta misma sesión.
- **Pide el comando de borrado, no que borre a mano.** Y **NUNCA le des un comando con un
  «pero no lo ejecutes todavía»**: lo ejecuta. Pasó, y se perdió un respaldo antes de tiempo.
  Si no toca ejecutarlo, no se escribe.
- **Acepta perder cosas si le explicas el coste.** Aceptó perder la regla del último `=`
  sabiendo que no es adivinable. Lo que no acepta es enterarse después.

---

## Las lecciones caras — todas de la cabina equivocándose

**El taller corrigió a la cabina más de quince veces esta sesión, siempre con medición.**

1. **Comprimir las palabras del operador es el defecto que más caro sale.** Él escribió «toda
   la matriz»; la cabina lo puso en el ticket como «la fila del paso»; el taller construyó la
   compresión. **Una ronda entera.** Si sus palabras admiten dos lecturas, **pregunta o cita
   verbatim**; no elijas por él.
2. **Copiar una cifra del acto uno al ticket del acto dos sin re-medir**, cuando el propio
   ticket ordena re-medir. Pasó dos veces en `#58`: «17 punteros» eran 16 ficheros, «16» eran
   15. **Las cifras de un acto anterior son mediciones fechadas, aunque sean de esta sesión.**
3. **Convertir una pregunta del operador en una instrucción.** Él pidió recomendación sobre la
   marca del paso; el ticket la escribió como orden. Lo que llegó fue la recomendación de la
   cabina puesta en obra, no algo que él aprobó.
4. **Mandar demostrar algo con una suite que nunca se midió que existiera.** El run de
   colapsabilidad del panel **no tiene pruebas**: se verificó por QA humana y lo dice en su
   texto.
5. **Medir con el instrumento equivocado.** Tres veces, y **dos se cortaron antes de
   publicar**: buscar `j-column-stack` en el contenido para deducir el reparto de formas —esa
   clase la emite el renderer, no vive en el contenido—, y contar `Math.random` restantes que
   eran comentarios. La regla que las cortó: **antes de publicar, pregúntate si la sonda puede
   ver lo que buscas.**
6. **Recomendar sin medir la compatibilidad.** La cabina recomendó montar el insertor de
   fórmula en «Resultado final» bajo D-061; el campo **prohíbe delimitadores** y el insertor
   **los escribe**. El comentario del esquema lo decía y estaba delante desde la primera
   medición. **Produjo el defecto bloqueante de la ronda 3.**

---

## Punteros

- **Canónico:** `projects/cantu-studio/.aiw/roadmap/roadmap.json` — CRLF, `1d341fe3`.
- **Validador:** `node tools/project-console/validate-project-console-state.mjs`
- **Suite:** `node --test "tests/*.test.mjs"` desde `tools/author-lite/compiler-api` —
  **733 al cerrar**. **LA CABINA NO REPRODUJO NI UNA SOLA CIFRA DE LA SUITE EN TODA LA
  SESIÓN**, siete rondas y cuatro runs: **excede el tope de tiempo de su entorno** (se quedó
  en el test 487 tras nueve minutos) mientras corre en **menos de cuatro segundos** en la
  máquina del operador. Toda cifra de suite en los records es del taller.
- **Arnés de comparación:** `tools/author-lite/compiler-api/tests/helpers/webRenderHarness.mjs`
  y `corpusManifest.mjs`. **Su ancla es el atributo `id`, no la forma del token** — anclar por
  forma se llevó clases reales por delante. **Un id mal cableado DEBE romperlo**, y hay una
  prueba que lo fija. No lo debilites al extenderlo.
- **Los árboles fijados:** `tests/fixtures/corpus/`, 63 árboles, 3,54 MB. **Se regeneran a
  mano** con `pinCorpusFixtures.mjs`, nunca desde la suite: una referencia que se regenera
  sola no prueba nada.
- **La siembra:** `src/builders/shared/mintId.js`. **Vive ahí a propósito** — `web/` y
  `partials/` se barren y todo `.js` allí queda registrado como componente del motor.
- **Records y veredictos:** `projects/cantu-studio/docs/_historical_run_record/`
- **Las etiquetas que ve el autor** viven en `blockCatalog.js` y en `COLUMN_CHILD_OPTIONS`.
  Al operador se le nombra siempre por ellas, nunca por el identificador del motor.
