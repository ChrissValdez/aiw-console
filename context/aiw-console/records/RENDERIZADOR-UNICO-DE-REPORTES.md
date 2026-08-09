# RENDERIZADOR ÚNICO DE REPORTES

`RUN-CONSOLE-REPORT-RENDERER-001` — «One renderer for every project's run report»
(`queue_order` 52, derivado del roadmap por orden y verificado contra el título exacto antes
de empezar; no se tecleó el id).

**Todas las cifras de este record son una MEDICIÓN FECHADA DEL 2026-08-09.** Este run es un
PILOTO EN SOLITARIO: estrena el procedimiento «prototipo + contrato + casos reales →
renderizador» que cuatro proyectos van a heredar, y por eso el §F es entrega, no apéndice.

---

## A. Qué se entregó, y dónde

| Pieza | Ruta |
|---|---|
| El renderizador, UNA vez, ejecutable por la consola | `project-console/assets/run-report-renderer.js` |
| Sus estilos, tokens del prototipo bajo `.rr-root` | `project-console/assets/run-report-renderer.css` |
| Los cuatro casos como fixtures versionados | `tests/fixtures/reports/CASO-{1-audit-contenido,2-development,3-creacion-leccion,4-sin-qa}.report.json` |
| La suite de conducta contra los cuatro casos | `tests/run-report-renderer.test.mjs` (22 tests) |
| La prueba MECÁNICA del criterio 4 | `tests/run-report-domain-blind.test.mjs` (3 tests) |

La entrada es `renderRunReport(container, textoOJson, opts)`: recibe UN reporte (texto crudo u
objeto), pinta la superficie entera dentro del contenedor y devuelve el manejador de estado.
Nadie la llama todavía: la pestaña y la ruta desde el run son el `#53`, el `verdict.json` es el
`#54`, y el validador del contrato no existe a propósito (criterio 6). El selector de casos del
prototipo (`window.__REPORTS__` + `<select>`) era andamio y **no se entregó**.

**Suite: base 568/567/1 verificada antes de tocar nada** (el único rojo es el pin deliberado de
`classification-care-budget.test.mjs:153`, que no se reparó). **Después: 594/593/1** — 26 tests
nuevos, todos en verde, cero fallos nuevos, el mismo único pin.

**Superficie de escritura de este run, medida con `git --no-optional-locks status`:** los cinco
paths de la tabla y este record. Los ocho ficheros con estado sin commitear
(`roadmap/roadmap.json` + los siete de `.project/`) **no se tocaron** y siguen en **LF los
ocho**, verificado antes y después. Los tres `CASO-*.json` de `_scratch` **siguen existiendo**
(4 847, 4 874 y 3 421 bytes); las copias de `tests/fixtures/reports/` son ahora las
versionadas. `cantu-quizzes-latex` solo se leyó.

---

## B. Cómo se cumple el criterio 4 — la regla que manda

El renderizador no sabe de ningún dominio: pinta por PRESENCIA DE CAMPOS. La prueba no es una
frase, es mecánica, y `tests/run-report-domain-blind.test.mjs` la ejecuta en cada corrida:

1. **Cero vocabulario de dominio en la vista.** Del los cuatro fixtures se DERIVAN los nombres
   que un renderizador contaminado filtraría — `project`, `run_id`, `run_title`, `profile`,
   `emitted_by`, claves de `counts`, etiquetas y rutas de `locations`, ids/etiquetas/previews de
   cada `subject` —: **91 tokens** (≥4 caracteres) **+ 3 manuales** (`christopher`, `valdez`,
   `cantu` — la falla medida del prototipo descartado que llevaba el nombre del operador
   incrustado). **Cero apariciones en JS y CSS, insensible a mayúsculas.** Es el equivalente de
   la medición del encargo: las 39 menciones de proyecto del prototipo viven en su módulo de
   datos y cero en su vista; aquí son 94 tokens vetados y cero en la vista. Un quinto fixture
   extiende el veto solo con copiarse a la carpeta.
2. **Ninguna comparación contra `type`, `kind` o `mode` de un reporte** (regex sobre el fuente;
   `step.kind` — la taxonomía propia ítem/decisión/run, que son tres ARRAYS distintos del
   reporte — queda excluida y cada literal `"decision"` se verifica como uso de step-kind).
   Ningún valor del vocabulario de `type` aparece como literal citado.
3. **`verdict_options` no se lee** — el aserto es que la cadena no existe en el fuente:
   ignorarlo es estructural, no condicional — mientras `verdict_disposition_options` (que sí es
   dato por ítem, para la DISPOSICIÓN) sí funciona. `RR_VERDICTS` es
   `["APPROVED","CHANGES_REQUIRED","BLOCKED"]` verbatim — los mismos que `aiw/kernel.mjs:213`
   parsea —, no hay «approve all» en ninguna grafía ni idioma, y `reviewer` nace `""`.

La guarda funciona y mordió primero a su autor: cazó la palabra «tests» (etiqueta de
`locations` del CASO-4) y la frase «approve all» en COMENTARIOS del propio renderizador, que
hubo que reescribir. Eso es exactamente lo que le va a pasar al segundo que aplique esto, y
está bien que le pase.

## C. Los cuatro casos, uno a uno

- **CASO-1 (audit de contenido, el piloto real de `cantu-quizzes-latex`).** 9 ítems + 2
  decisiones propias + el run = **12 pasos**; `R1` y `R2` (`stop`) van primero y la sesión abre
  sobre ellos con el razonamiento desplegado. Sus `verdict_options` por ítem («De acuerdo»,
  «Correcto»…) **no llegan a la superficie**: es la deriva que este run cierra. La
  `pilot_deviation` tiene su sección; `verification: null` pinta «no verification» con su
  `verification_reason` al lado; `blind_spots` cuenta 2, `alternatives` `[]` dice «ninguno», y
  `unreviewed` — clave ausente — dice «sin declarar» con el porqué («El reporte no trae este
  campo: nadie lo miró»). `H1` (`before: null`) pinta «Lo que existe ahora · sin versión
  anterior»; `I1` (sin before ni after) no pinta diff ninguno y el ítem queda entero.
- **CASO-2 (development, `cantu-studio`).** 4 ítems + 1 decisión propia sin id (→ `SD1`, y en
  la salida `decision_id: null` — no se inventa identidad) + el run = 6 pasos. El ítem
  `decision` ofrece sus `options_considered` y la elección viaja como `chosen_option`,
  **con `verdict: null` intacto**: el camino elegido no es un cuarto veredicto. El `check`
  pinta su `expected`; el before/after escalar marca ambos lados; `items_note` (el fichero
  lleva 2 de los 22 checks como muestra, declarado por el propio reporte) y la verificación
  `npm test · 436/436` viajan a la sección de compuerta; `unreviewed` con 1 entrada cuenta 1.
- **CASO-3 (create de una lección, `cantu-lessons`).** `L1` con `children: [K1,K2,K3]` son
  **CUATRO entradas del índice** (N+1: cada una se firma aparte) y el contador dice 0/6 con los
  tres hijos indentados. `K3` es `stop` entre los hijos: `K3` lleva su marca plena y **`L1` la
  atenuada** («contiene una parada», borde sin brillo, icono al 55%). Los DOS previews del
  sujeto («Versión web», «Versión diapositiva») abren **en modo Comparar por defecto**, dos
  paneles a la vez; sin `fetch` que confirme, cada panel dice la ruta que no alcanzó en vez de
  fingir un artefacto. El hijo sin previews propios (`K2`, paridad) hereda los del sujeto del
  padre. `before: null` pinta «Lo que existe ahora»; el `if_rejected` requerido está.
- **CASO-4 (cero checks, compuerta mecánica, `aiw-console`).** 2 ítems + 1 decisión + run = 4
  pasos y la superficie está completa. `gate: "mechanical"` cambia la pregunta del run a
  «¿Aceptas estos hallazgos?» (la redacción del prototipo). `blind_spots`, `alternatives` y
  `unreviewed` son `[]` los tres: **seis badges «ninguno»** (rail + sección) y ningún «sin
  declarar» — vacío y ausente son dos hechos y se ven distintos. La verificación en rojo
  (`exit: 1`, el pin) se muestra sin suavizar; `profile: null` viaja con su `profile_reason`.

Robustez (criterio 7): un `report.json` que no parsea produce el mensaje del parser dentro de
un panel honesto y **nada debajo** — nunca pantalla en blanco; un reporte de solo cabecera
(`{"run_id":"RUN-X"}`) renderiza entero: el run como único paso y tres bloques «sin declarar».

Además de la suite, se hizo QA de humo en navegador real (andamio en el scratchpad de la
sesión, fuera del repo, no entregado): iframes vivos cuando el fetch confirma, disposición
apareciendo solo con `CHANGES_REQUIRED`, navegación por botones y flechas, tema claro/oscuro
con los colores exactos del prototipo (`#161826`/`#f2f3f9`), chrome ES/EN sin traducir jamás el
texto del reporte.

## D. Lo que el prototipo especificaba y no se siguió igual, con su razón

1. **Iconos Phosphor (fuente externa) → SVG inline.** La consola es cero dependencias y su
   idioma propio ya es SVG inline (`index.html`). Mismos gestos (mano abierta para stop,
   sello para authority, bandera para desviación…).
2. **Inter embebida (woff2 dentro del bundle) → no se embebe.** Vale el fallback que el propio
   prototipo declara: `"Inter", system-ui, sans-serif`. Sin binarios, sin dependencias.
3. **`data-theme`/`lang` en `documentElement` → en el contenedor `.rr-root`.** El documento es
   de la consola; un módulo que ella ejecuta no lo muta. Los tokens viven bajo `.rr-root` y no
   colisionan con `project-console.css`.
4. **Re-render de React por pulsación → estado sin redibujo al teclear.** Con `innerHTML`, un
   redibujo por tecla mata el caret. Teclear muta estado; el redibujo ocurre en el siguiente
   cambio accionado, salvo la fila de firma, que redibuja solo cuando su disponibilidad cambia.
5. **Selector de casos → excluido** (criterio 6: era andamio).
6. **Descarga de `verdict.json` → se conserva tal cual el prototipo.** Descarga al equipo del
   operador, no escribe en ningún repo; `decided_at` queda `null` porque el sello es de quien
   escribe (`#54`).
7. **Rareza del prototipo unificada:** su `cardForDecision` marcaba `hasOptionsConsidered` pero
   nunca construía las tarjetas para `self_decisions`. Aquí las decisiones propias usan el
   mismo camino de código que los ítems. Inobservable en los cuatro casos (ninguna
   `self_decision` trae `options_considered`); uniforme para el quinto.
8. **`options` de las `self_decisions`** (CASO-1: «Se adopta», «Se descarta», «Con matiz») no
   se pintan, igual que en el prototipo: son la misma deriva de vocabulario por ítem que el
   criterio 5 cierra. El operador ratifica con los tres veredictos cerrados.

## E. Contrato ↔ prototipo: las tensiones encontradas, reportadas y no elegidas por el taller

El ticket manda parar si contrato y prototipo se contradicen SIN árbitro. Las dos tensiones
halladas ya llegaron arbitradas por el propio ticket, así que se reportan y no bloquearon:

1. **Vocabulario del veredicto.** El §7 del contrato escribe `verdict: "ok" | "no" | "duda"`
   por ítem en `verdict.json`; el prototipo y el criterio 5 cierran el veredicto en
   `APPROVED | CHANGES_REQUIRED | BLOCKED` — «los mismos que `aiw/kernel.mjs:213` ya parsea»,
   salidos «de tres rondas de decisión». El propio contrato (§15) declara que la INTERFAZ y el
   SOBRE pasan a `aiw-console` y que «este documento deja de ser su fuente en cuanto ellos
   emitan la suya»: el prototipo más este run SON esa emisión. **Queda para el `#54`:** el
   `verdict.json` que se escriba usará el vocabulario cerrado de tres, y el contrato v2 debe
   enmendar su §7 al recogerlo.
2. **`gate: "mechanical"`.** El §1 del contrato cierra la compuerta en
   `suite | human_judgment | both`; el CASO-4 —fichero real que la `full_description` endosa
   («whose gate is mechanical»)— trae `mechanical`, y el prototipo lo maneja explícitamente
   (cambia la pregunta del run). Este renderizador no valida (criterio 6): pinta la compuerta
   como dato y sigue al prototipo en la pregunta. **Queda declarado:** cuando el contrato se
   congele, o su §1 admite el cuarto valor o el CASO-4 se regulariza; hoy las dos fuentes no
   dicen lo mismo y lo arbitró el ticket.

Y un matiz que no es contradicción pero se nombra para que nadie lo descubra después: la
`full_description` describe el CASO-2 como «twenty-two check items and five decision items» y
el fichero real trae 2 checks y 1 decision **declarándolo él mismo** en `items_note` («aquí van
2 como muestra») y en `counts.checks.after = 22`. El papel y el disco cuadran a través de esa
nota; el renderizador la pinta.

## F. Veredicto sobre el PROCEDIMIENTO (criterio 10) — esto es lo que hereda el segundo

**Qué paso no fue ejecutable tal como venía.**

- **«Consigue lo mismo» (criterio 4) no trae su regla de medición.** Las «39 menciones» del
  prototipo están en un módulo de datos que vive dentro de la línea prohibida: no se pueden
  contar sin leerla. Hubo que DEFINIR la medición equivalente (tokens derivados de los
  fixtures, umbral de 4 caracteres, insensible a mayúsculas, JS+CSS). El procedimiento debería
  fijar esa regla de extracción; si cada proyecto inventa la suya, los veredictos no se
  comparan.
- **«Lo ejecuta la consola» no es verificable dentro del #52.** La pestaña es del `#53`: aquí
  no existe ningún camino real de la consola que llame al renderizador. Se cubrió con harness
  de vm (lo que corre la suite es el fichero embarcado) y con humo de navegador en andamio,
  pero el criterio de salida «ejecutado desde la consola» queda pendiente hasta el `#53` y el
  procedimiento debería decirlo en vez de dejarlo implícito.

**Qué hubo que interpretar.**

- **«Desplegados»** en «los ítems stop van primero y desplegados»: en una superficie de UNA
  tarjeta, se leyó como (a) los stop abren la sesión y (b) el razonamiento llega abierto — que
  el prototipo aplica a TODOS los ítems, así que la palabra solo añade el orden. Ambigüedad
  inocua aquí; nómbrese para el siguiente.
- **La base de resolución de los previews.** Las rutas son relativas al repo del reporte
  (`reports/<run_id>/assets/…`) y la consola sirve por `/projects/<clave>/`. El prototipo hace
  `fetch(path)` a secas; se replicó y se añadió `opts.previewBase` para que el `#53` decida.
  Esa decisión —quién resuelve la base— no estaba escrita en ningún sitio.
- **Forma de entrada** (texto crudo vs objeto): sin especificar; se aceptan ambas.

**Qué criterio de salida faltó.**

- **El del ASPECTO.** El prototipo especifica look, pero el run no declara paso de QA visual
  del operador ni umbral de «suficientemente igual». Se midieron tokens (colores exactos,
  espaciados) y se hizo humo de navegador; la firma visual queda para el operador (el `#61`,
  auditoría visual profunda, ya existe en la cola para esto).
- **El de la especificación misma:** `design/run-review-prototype.html` está **sin versionar**
  (`??` en git). La espec de la que todo esto deriva puede desaparecer como desapareció la
  rev.1 del contrato en `_scratch` — el mismo modo de fallo que el §2 del contrato documenta.
  Commitearla es del dueño del repo, no de este run (git que escribe está fuera de alcance),
  y se deja dicho.

**Qué le diría al segundo que aplique esto.**

1. Extrae la plantilla legible del prototipo UNA vez a un fichero de trabajo (la línea 401 es
   JSON de la plantilla; la 389 es el bundle y no se lee) y trabaja desde ahí; no vuelvas al
   fichero gigante.
2. Escribe el test de tokens ANTES que el renderizador. Te va a cazar tus propios comentarios
   — aquí cazó «tests» y «approve all» en comentarios del renderer — y eso es señal de que
   funciona, no estorbo.
3. `node:vm` tiene prototipos propios: `assert.deepEqual` estricto falla contra arrays del
   sandbox; compara valores extraídos (`[...]`), no referencias.
4. Los badges de los bloques pintan DOS veces (rail y sección): cuenta 2N, no N.
5. Lee `items_note` antes de asumir que los ítems del fichero son todos los del run.
6. No heredes `verdict_options` ni el `options` de las `self_decisions`: el vocabulario es el
   del kernel y ya hay dos fuentes (`kernel.mjs:213` y el prototipo) que lo fijan.
7. El nombre del que firma no existe en el código ni en un placeholder: si tu test de tokens
   no incluye el nombre del operador, inclúyelo a mano como aquí.

**Veredicto neto:** el procedimiento ES aplicable en solitario y produjo la pieza completa en
una sesión, con dos huecos de ejecutabilidad (regla de medición del criterio 4; «lo ejecuta la
consola») y dos criterios de salida ausentes (aspecto; espec sin versionar) que conviene cerrar
en el texto del procedimiento antes de que lo hereden los otros cuatro proyectos.
