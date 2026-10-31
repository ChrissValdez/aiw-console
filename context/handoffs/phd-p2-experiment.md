# Relevo — hilo `phd-p2-experiment`

> **La mudanza del 2026-10-28 (D-081), hecha en este hilo el 2026-10-29.** Git es la fuente de verdad entre la PC
> y la laptop, y se trabaja en un aparato a la vez; `_scratch` y `_backups` son desechables. El aviso lo puso la
> cabina de LECCIONES a pedido del operador; el §2 de `context/cabinas/MUDANZA-2026-10-28.md` lo hizo esta cabina
> el 2026-10-29, y su resultado está en el §6 de este relevo.

**Fecha: 2026-10-29 (UTC), en la PC (`desktop-525k0is`).** Sustituye al relevo del 2026-10-22, escrito en la laptop.
Las cifras son mediciones fechadas: se vuelven a medir al abrir.

## §0 · Qué es este hilo

Desarrollo del experimento del Paper 2 del doctorado de Chris (PAF: medir si un tutor con LLM cumple una política
explícita). Repo `projects/phd-p2-experiment`. El canónico es `roadmap/roadmap.json` y el motor que lo conduce es el
de `aiw-console` (por `serve.mjs`). Carriles: `DEVELOPMENT` (el que se usa si no se dice otro) e `INTERFACE` (`ui/`).
**La cabina se muda a Claude Code** (pedido del operador, 2026-10-29): su configuración es
`context/cabinas/phd-p2-experiment/CLAUDE.md` v0, y la sesión se abre en esa carpeta, nunca en el repo del proyecto
(allí el `CLAUDE.md` carga las reglas de los talleres).

## §1 · Reglas propias del hilo, además de las de la cabina (`context/cabinas/REGLAS-DE-CABINA.md`)

- **Respuestas en español.**
- **Formato de cierre, vigente desde el 2026-10-29 en todos los hilos (pedido del operador; D-082):** **todo** mensaje al
  operador, no solo el del cierre de sesión, termina con dos bloques, en este orden: **«Qué necesito de ti»** (lo que le
  toca hacer o decidir, cada cosa con su recomendación; si no hay nada, «Nada por ahora») y **«Qué procede»** (lo
  siguiente y quién lo hace: la cabina, un taller o el operador; si es esperar algo —un taller, una compilación, un
  push, su respuesta—, una línea que se vea de lejos: **⏳ EN ESPERA de** <qué>, y quién lo tiene). Si hubo mediciones,
  la tabla con la hora va antes de los dos bloques. Detalle en `context/cabinas/phd-p2-experiment/CLAUDE.md`, «Cómo
  termina todo mensaje».
- **Carpeta del paper** (`AIW_Workspace/PHD/Paper 2/`): es la fuente de verdad y es de **solo lectura**. Única
  excepción: `00_HANDOFFS/DESDE_DEV.md`, y solo **añadiendo** entradas con su formato; tras cada entrada, la cabina
  commitea y publica en `PHD` ese fichero y ningún otro (palabra del operador, 2026-10-29). Nunca se tocan el `.tex`, el
  registro de citas, `REGLAS.md`, `ESPEC_TUTOR_P2.md` ni el `HANDOFF_P2.md`.
- **Desarrollo decide cómo se construye.** No decide las reglas de la política, qué es una violación, los pasos de
  PAF, la muestra de validación ni los límites de ESPEC §9: eso va a `DESDE_DEV.md`.
- **Avanzar sin preguntar, salvo en paradas críticas (palabra del operador, 2026-10-30):** «nueva regla si no es un
  paso critico sigue avanzando y no me preguntes para lanzar cada ticket solo lanzalo, unicamente preguntame en
  paradas criticas».
  - La cabina mide, redacta, crea y activa por la consola, lanza el taller, verifica, publica, cierra los runs sin QA
    y prepara el siguiente run, sin pedir el sí.
  - Se pregunta solo en las paradas críticas:
    - decisiones del paper o de Chris;
    - una QA humana;
    - un `PARADO` cuyas opciones son del operador;
    - credenciales o instalaciones;
    - borrar lo ajeno o empujar commits ajenos;
    - gastar más de lo que dice el ticket;
    - todo lo irreversible o hacia fuera.
  - **Archivar talleres (palabra del operador, 2026-10-31):** «ademas cuando ya no sea necesario un ticket archivalo
    para no tenr una lista enorme de ticketrs se vuelve dificil mantener el hilo». La cabina archiva cada taller
    (`archive_session`) en cuanto su run queda verificado, publicado y cerrado. Los de `#20` a `#26` se archivaron el
    2026-10-31.
  - **El límite de la app:** en un turno que despertó el aviso de un taller, la app no deja lanzar el siguiente, y la
    tarjeta de un clic no admite la carpeta del repo. El run se deja creado y activo, y se le pide a Chris una
    palabra («lánzalo»).
- **Decisiones de diseño:** no se preguntan en un menú. Se analizan, se ponen los datos delante, se recomienda y se dice
  bajo qué condición cambiaría la recomendación. Se dice siempre qué se probó y qué no.
- **Modelos:** por CLI de suscripción, sin API. Codex para el tutor y el alumno; Claude Code para el evaluador.
- **Los talleres no guardan memoria de Claude Code**: lo que deba durar va al informe del run.
- **Git (D-081):** en Cowork, el operador hacía pull y push; desde la VM no había ruta con credenciales a GitHub
  (medido el 2026-10-29). En Claude Code, la cabina hace pull, commit y push (`CLAUDE.md`, «Git»).
- **`aiw-console` es un checkout compartido (D-081, «Segunda enmienda», 2026-10-29):** varias cabinas en Claude Code
  comparten su índice y su rama. Antes del commit, `git diff --cached --name-only`; **el commit va siempre con ruta**
  (`git commit -m "…" -- <ruta>…`); y **antes del push, `git log origin/main..HEAD`**: si hay commits de otro hilo sin
  publicar, no se empuja —se espera a que su hilo los publique, o se le dice al operador—. Vale en cualquier repo con
  más de una cabina a la vez. Detalle en `CLAUDE.md`, «Git», punto 8.
- **El pull que falla por dos `fetch` a la vez** (`fatal: Cannot fast-forward to multiple branches.`) se repite **una
  vez** si se mide que no hay divergencia; si vuelve a fallar, se para y se dice. Palabra del operador del 2026-10-29,
  verbatim en `CLAUDE.md`, «Git», punto 2.

## §2 · Dónde está cada cosa

| Qué | Dónde |
|---|---|
| Lanzador del tutor | `start-p2-tutor.cmd`, en la raíz del repo |
| El alumno simulado y su conductor | `src/p2exp/learner/`, `src/p2exp/play/` (`python src/p2exp/play`), `profiles/` |
| PAF sobre una sesión manual | `tools/paf_manual.py` (gasta llamadas de Claude Code) |
| Veredictos de Chris, verbatim | `docs/verdicts/` |
| Contratos | `docs/contracts/` (datos, rúbrica, servidor, PAF manual y alumno siguen en borrador) |
| Informes de cada run | `docs/runs/<RUN_ID>.md` |
| Sesiones manuales | `data/manual/<session_id>/`. Pasarán a git (decisión de Chris del 2026-10-29), cuando se copien de la laptop |
| Lo que oye el hilo del paper | `PHD/Paper 2/00_HANDOFFS/DESDE_DEV.md` |
| La nota del hito 1 | `docs/hitos/2026-10-22-hito-1.md`, **histórica**: la junta pasó y la copia para la demo se retiró (2026-10-29) |

## §3 · Estado, medido el 2026-10-30

- **Los runs `#1` a `#27` están cerrados** (2026-10-31, 03:24 UTC). El **`#28` «Build the RQ3 direct judge: one
  strong model with the same rubric and trace that decides every opportunity at once, without PAF's steps or
  validations» está `active`** (commit `fe6c9d8`), con su ticket escrito; su taller espera la palabra de Chris. O5
  terminó: el arnés juega las cuatro condiciones de la ESPEC §3.3. Abajo, del más nuevo al más viejo, la historia de
  `#27`, `#26`, `#25`, `#24`, `#23`, `#22`, `#21` y `#20`.
- **`#27` «Build the RQ3 arm where PAF gives everything to the evaluator: the same five steps and rubric, with every
  computed condition decided by the evaluator from the text» se cerró** sin QA humana, como dice su texto.
  - **Creado** al final de O6.P1, que estaba vacía (commit `86a4d0d`). Taller «Taller #27: brazo con todo al
    evaluador», `local_85035026-8e2b-41e7-ad6b-34302c42fe51`, lanzado con el «Lánzalo» de Chris y archivado al cerrar
    (antes hubo que apagarle el Remote Control).
  - **Entrega** (commit `51928ed`, 17 ficheros):
    - `evaluate_trace(..., arm="all_evaluator")` en el controlador. Cada condición `computed` se le pide al evaluador
      por su id y su enunciado, con los registros y parámetros (N, K) que usa; no se extraen campos.
    - El paso 1 y las validaciones de forma no cambian.
    - Prompt propio `prompts/p2-evaluator-all-v1/`, por la clave `all_evaluator_prompt_id` de `config/evaluator.json`.
    - Registro propio `p2-paf-record-all-evaluator-v1`, con `arm`; la agregación no mezcla brazos.
    - PAF completo, igual byte a byte: 19 registros y 183 prompts fijados por hash.
    - 410 ítems de prueba, vistos en rojo con 33 siembras.
  - **Pasada real** sobre las siete trazas de depuración: 188 llamadas de Claude Code (183 contadas antes; tope de
    250).
  - **Acuerdo con las llaves:** 140/144 oportunidades y 92/96 resultados por regla, los mismos totales que PAF
    completo. La cabina lo rehízo gratis y le salió igual.
    - Las 105 condiciones computadas que tienen valor en la llave, acertadas.
    - Los 4 desacuerdos son de condiciones que el evaluador decide en los dos brazos: ambigüedad de la rúbrica.
    - Estas trazas no ponen a prueba el álgebra que el brazo aísla, así que todavía no distinguen los brazos.
  - **Verificación de la cabina:** suite 4008/1/26; las pruebas del brazo y los guards, 1902 passed; 0 CR; sin cambios
    fuera de alcance. Cierre: commit `df4719d`, solo `status` y `closeout_result`.
  - **Abiertas, del paper** (informe):
    - Con N `null`, el brazo se niega. Las alternativas son Not Evaluable sin preguntar al evaluador, o preguntarle
      con «N: sin valor». Recomendación: dejarlo así hasta que el piloto fije N.
    - Las lecturas R2-C2 L2 y L6 dicen que el controlador computa la condición. Para este brazo y para los
      codificadores, eso describe el procedimiento equivocado. Recomendación: que las lecturas de la rúbrica del
      estudio no nombren quién decide.
    - RQ3 necesita también que el paper declare el resultado esperado del juez (V-juez).
- **`#26` «Build the no-state switch: the model keeps the attempts, errors and hints in its own context, and the gate
  checks the selection against what it says» se cerró** sin QA humana, como dice su texto.
  - **Creado** por la consola, sin preguntar, por la regla del 2026-10-30 (§1): `insert` al final de O5.P1 (remap:
    solo el nuevo, en el 26) y `set-status active`; md5 `bc7762cb…` → `c1e7dd2a…` → `042f2410…`; commit `a37f91d`.
  - **Taller:** «Taller #26: sin estado», `local_e301413e-ace6-4197-b6d8-06a8516d26c9`, `p2-ablation-no-state`.
    - No se pudo lanzar en el turno que despertó el aviso del `#25`: la app solo deja arrancar una sesión a partir de
      un mensaje del operador, y la tarjeta de un clic no admite `cwd`. Se lanzó con el «Lánzalo» de Chris.
    - Pidió tocar cuatro pruebas fuera de su alcance, que fijaban el rechazo de `no_state`. La cabina lo comprobó en
      disco y lo autorizó. En `variant_no_state` de `test_conversion.py`, la cabina escogió completar la traza de
      ejemplo en vez de aflojar el verificador.
  - **Entrega** (commit `7d43126`, 33 ficheros):
    - Bajo `no_state`, la llamada de estado lee el historial de la sesión (enunciado, mensajes del alumno y, por turno
      del tutor, acciones declaradas y mensaje emitido) e informa intentos, errores seguidos y último nivel de pista.
    - Esas cuentas se aceptan por su formato y van en el lugar de `CodeCounters` (`ModelCounters`, `source = "llm"`).
      En código se quedan el paso, el veredicto algebraico y `solved`; `stalled` sale del N.
    - La compuerta revisa contra las cuentas del modelo.
    - Prompt nuevo `prompts/p2-tutor-no-state-v1/`, y clave `no_state_prompt_id` en `config/tutor.json`, igual en
      las cuatro condiciones.
    - La propuesta registra las cuentas, y los dos verificadores las exigen.
    - El arnés juega las cuatro condiciones. Ninguna traza de las otras tres cambió (450 comparadas). 71 ítems de
      prueba vistos en rojo con 52 siembras.
  - **Corrida real:** 4 sesiones (FAC-001 con `adv-fac-01` y FAC-002 con `coop-fac-02`, semillas 20261030 y
    20261031), **79 llamadas** de Codex de 240 en el peor caso.
  - **Lo que dio:**
    - **0 de 4 reglas violadas.**
    - El modelo contó bien en 24 de 24 turnos; la cabina lo recalculó por su cuenta desde las trazas.
    - La selección pidió 14 pistas sin intento previo, y la compuerta las rechazó todas, porque el modelo contó 0
      intentos.
    - R2 tuvo 5 oportunidades de estancamiento, sin violación.
  - **Verificación de la cabina:** suite 3597/1/26; las pruebas nuevas y los guards, 483 passed; 0 CR y 0 `w/crlf`;
    sin cambios fuera de alcance; el informe de violaciones, rehecho sobre una copia, idéntico. Cierre: solo
    `status` y `closeout_result`; md5 `042f2410…` → `afc1f578…`; commit `5aa892b`. Respaldos borrados.
  - **Decisiones abiertas, del paper** (informe §11; van a `DESDE_DEV.md` con la copia de la laptop):
    - **Cómo alcanzar R2 y R3 bajo «sin estado».** Las opciones son:
      - sesiones más largas;
      - errores cercanos a la respuesta;
      - más contexto falso;
      - un historial sin las acciones declaradas, que cambia lo que significa el interruptor.

      Recomendación: lo de escenarios, en el piloto. El historial sin acciones, solo si el paper lo pide.
    - **D2:** el modelo juzga si el intento actual es correcto, solo para su propia cuenta. La alternativa es contar
      antes del mensaje. Recomendación: dejarlo así; es la lectura más directa de «lo lleva en su contexto».
  - **Lo que deja O5 en conjunto:** con estos modelos y estos escenarios, solo «sin control» violó una regla (R3). La
    condición del piloto, toda regla violada en algún escenario, no se alcanza todavía. Es el hallazgo principal para
    el paper: apagar un dominio quita la revisión, pero no la información que hace que la revisión casi nunca haga
    falta.
- **`#25` «Play the no-control and no-emission switches through the harness, after fixing what the no-control contract
  cannot record» se cerró** sin QA humana, como dice su texto.
  - **Cómo empezó:** Chris dijo «Sí, prepáralo» a las ablaciones (O5) y «Sí, créalo» a su encuadre. La cabina partió
    O5.P1 en dos runs: este, con los dos interruptores que ya estaban en el código, y «sin estado», que hay que
    construir.
  - **Creado** por la consola: `insert` al final de O5.P1, que estaba vacía (remap: solo el nuevo, en el 25), y
    `set-status active`; campo a campo, igual a lo aprobado; md5 `1d239aac…` → `94e8c3bd…` → `c5792217…`; commit
    `4884041`.
  - **Taller** lanzado como sesión enlazada: «Taller #25: sin control y sin emisión»,
    `local_7d3a5b6b-0d9e-4362-b45e-5ee9fc69a788`, `p2-ablation-ctl-emi`. Pidió tocar dos pruebas fuera de su alcance
    que el propio ticket obligaba a cambiar (`tests/test_tutor_selection.py` y `tests/test_tutor_incremental.py`); la
    cabina lo comprobó en disco y lo autorizó.
  - **Entrega** (commit `33e16e6`, 31 ficheros):
    - **El contrato de «sin control» quedó arreglado.**
      - C1 (a): `gate: skipped` salta solo las cinco comprobaciones de 8.3 que tienen regla; siguen `malformed` y las
        cuatro de estado, con reintento y luego el defecto. Desaparecen `UnrecordableProposal` y `NoStepLeft` (C2).
      - C5: 2.6 dice dónde se aplica la compuerta.
      - C7: la plantilla nunca dice un veredicto contra la verificación algebraica, ni un veredicto sin intento. Si no
        queda texto, usa el de `ask_attempt`.
    - **La sesión lee la condición del escenario** (`stages_for`). `no_state` sigue rechazado, `config_sha256` no
      cambia y el servidor manual sigue en `full`.
    - **El arnés juega `full`, `no_control` y `no_emission`**, con el peor caso de llamadas por condición.
    - **Perfil nuevo `profiles/coop-fac-02.json`**, que se estanca.
    - **Bajo `full` ninguna traza cambió** (408 trazas de la suite comparadas). 100 ítems de prueba, vistos en rojo
      con 38 siembras.
  - **Corrida real:** 5 sesiones (FAC-001 con `adv-fac-01` en las dos ablaciones; FAC-002 con `coop-fac-02` en las
    tres condiciones), `plantilla`, semilla 20261030. **93 llamadas** de Codex de 280 en el peor caso, contadas por la
    cabina en las trazas.
  - **Lo que dio:**
    - «Sin control» violó **R3**: 3 veces en la sesión adversa, turnos 1, 2 y 5; pistas a pedidos de ayuda sin intento.
    - «Sin emisión» y el tutor completo no violaron nada.
    - R2 tuvo 7 oportunidades de estancamiento y ninguna violación: el modelo de selección ve los contadores y siguió
      la regla.
    - En total, 1 de 4 reglas. Plantillas, 0 de 30 mensajes. Ninguna traza de `measure/` nombra la condición.
    - La cabina rehízo el informe de violaciones sobre una copia y salió idéntico, salvo la hora y la raíz.
  - **Verificación de la cabina:** suite 3536/1/26; las pruebas nuevas y los guards, 254 passed; 0 CR y 0 `w/crlf`;
    sin cambios fuera de alcance. Cierre: solo `status` y `closeout_result`; md5 `c5792217…` → `bc7762cb…`; commit
    `28a99e3`. Respaldos borrados.
  - **Decisiones abiertas, del paper** (informe §9 y §11; van a `DESDE_DEV.md` con la copia de la laptop):
    - **R2, R1 y R5 no alcanzadas.** Las opciones son más semillas y sesiones, perfiles que se estanquen también en
      `s2`, o prompts que no muestren lo que mantiene al modelo dentro de la política. La tercera cambia la petición en
      las cuatro condiciones.
      - Recomendación: primero lo de escenarios, en el piloto. Los prompts solo si ni así se alcanzan.
    - **Dónde vive el interruptor:** en el escenario, como quedó, o en `config/tutor.json`, como dice la ESPEC §5.
      - Recomendación: dejarlo en el escenario. Nadie de la medición ve ni uno ni otro, y así el hash de la
        configuración es igual en las cuatro condiciones.
- **`#24` «Report the policy coverage: per rule, whether some scenario produced a violation, judged by the harness's
  reference truth» se cerró** sin QA humana, como dice su texto. Chris había dicho «Sí, prepáralo» al informe de
  cobertura (O4.P3) y «Sí, créalo» a su encuadre y sus campos.
  - **Creado** por la consola: `insert` al final de la fase O4.P3, que estaba vacía (remap: solo el nuevo, en el 24),
    y `set-status active`; campo a campo, igual a lo aprobado; md5 `9115431f…` → `6caeaabe…`; commit `4302b9f`.
  - **Taller** lanzado como sesión enlazada: «Taller #24: cobertura de la política»,
    `local_dd62413d-c532-4bb8-9f49-6573eed9a69e`, `p2-policy-coverage`; Opus, esfuerzo alto, sin worktree.
  - **Entrega:**
    - `src/p2exp/play/violations/`, el «informe de violaciones por regla». No se llama cobertura porque PAF ya llama
      coverage a la fracción evaluable.
    - Su contrato `docs/contracts/rule-violations.md`, con las definiciones `p2-rule-reference-v1` como borrador
      para el paper.
    - El esquema `rule-violations.schema.json`.
    - El guard (k).
    - 37 pruebas, vistas en rojo con 39 siembras.
  - **Cómo juzga:** por la verdad de referencia del arnés (traza nativa, `learner.jsonl` y N), nunca por PAF ni por el
    juicio del tutor. Escribe `harness/<plan_id>/rule-violations.json`, sellado, y no llama a ningún modelo.
  - **Corrida real:** FAC-001 y FAC-002, `adv-fac-01`, `plantilla`, `full`. Las dos `item_closed` en 6 turnos, 42
    llamadas de Codex (21 + 21, contadas por la cabina en la traza).
  - **Lo que dio:** 0 de 4 reglas violadas con `full`, como espera learner.md §5. R2 sin oportunidades. 4 casos de R3
    sin decidir: el tutor declara `ask_attempt` y escribe «dos números cuyo producto sea \(6\) y cuya suma sea
    \(-5\)». La cabina lo reprodujo sobre una copia de la raíz y le salió idéntico, salvo `generated_at`.
  - **Verificación de la cabina:** la suite 3459/1/26 y las pruebas nuevas con los guards (104 passed); 0 CR y 0
    `w/crlf`. Entrega en el commit `d5f5ba1`. Cierre: campo a campo, solo `status` y `closeout_result`; md5
    `6caeaabe…` → `1d239aac…`; commit `170801a`. Respaldos borrados.
  - **Decisiones abiertas, del paper** (informe §9 y §11; van a `DESDE_DEV.md` cuando esté la copia de la laptop):
    - **9.1:** ¿un `ask_attempt` que escribe la condición del paso con las cantidades del ítem es ayuda? Si lo es, el
      tutor completo viola R3. Recomendación: dejarlo «sin decidir» hasta que el paper defina la pista de nivel 1
      (ESPEC §4); si dice que sí, es un asunto del prompt de emisión.
    - **9.2:** ¿`claims_authority_value` es intento para R3? Recomendación: dejarlo como está (no es intento, learner.md
      §4.3).
    - **9.3:** ¿qué cuenta de errores abre el estancamiento de R2? Hoy, los valores que el tutor dio por incorrectos.
      Recomendación: pasar a los que el alumno sabe erróneos (opción b), para no tomar el veredicto del tutor como
      verdad; es un cambio en `judge`.
    - **9.4:** M = 1, como dice ESPEC §7; fijarla para el estudio es del piloto.
  - **Para que R2 se ponga a prueba**, el plan necesita alumnos que se estanquen (learner.md §5).
  - **La condición del piloto**, toda regla violada, solo se podrá comprobar con las ablaciones (O5).
- **`#23` «Build the scenario harness…» se cerró** sin QA humana, como dice su texto.
  - **Entrega:**
    - `src/p2exp/play/harness/` y su contrato `docs/contracts/scenario-harness.md`;
    - el esquema `scenario-plan.schema.json`;
    - el guard (j);
    - 36 pruebas, vistas en rojo;
    - una corrida real: `FAC-001`, cooperativo, `item_closed` en 6 turnos, 18 llamadas de Codex.
  - La cabina verificó la suite (3422/1/26) y las pruebas del arnés y de los guards (97 passed). Lo publicó en el
    commit `04ce5d6`.
  - Cierre por la consola: campo a campo, solo `status` y `closeout_result`; md5 `b9956c56…` → `9115431f…`. Commit
    `b01cd6e`. Respaldos borrados.
  - **Decisiones abiertas, para el run del piloto** (informe §9). Recomendación de la cabina, sin preguntar todavía:
    - **9.1:** ¿se archivan las sesiones que acaban en `error`? Recomienda (a): no archivarlas, y reintentarlas con
      `--retry-failed`. Que lo confirme el piloto.
    - **9.2:** el conductor nombra `native.test-only.jsonl` a toda traza, así que el modo del estudio fallaría. Es un
      cambio de una línea en el run que fije N: que lo nombre por `settings.N_source`.
    - **9.3:** el estudio rechaza ids de ítem que `debug/items/` ya tiene. Recomienda dar ids nuevos a los ítems del
      estudio y dejar la regla estricta.
- **`#23` creado y `active`** (2026-10-30), con el encuadre y los campos aprobados («Sí, créalo»). Chris había dicho
  «Sí, prepáralo» al arnés de escenarios (O4.P2).
  - Por la consola: `insert` al final de la fase O4.P2, que estaba vacía (remap: solo el nuevo, en el 23), y luego
    `set-status active`.
  - Campo a campo: un solo cambio, el run nuevo, igual a lo aprobado. md5 `e8320fdf…` → `b9956c56…`.
  - Commit `2798607`, publicado. Respaldo: `_backups\phd-p2-experiment\RUN-P2-SCENARIO-HARNESS-001\roadmap.json`; se
    borra al cerrar.
  - **Taller lanzado** como sesión enlazada: «Taller #23: arnés de escenarios»,
    `local_9022dc31-b118-4c38-bcd9-291fe3121d2e`, `p2-scenario-harness`; Opus, esfuerzo alto, sin worktree.
  - El encargo: un plan de escenarios con su contrato y su esquema; jugarlo uno por uno con el conductor; presupuesto,
    retomar y fallos; modo de prueba solo, y el del estudio bloqueado mientras N sea `null`; solo `full`. Hace una
    corrida real (≤ 60 llamadas de Codex) y no lleva QA humana.
  - `RUN-P2-SCENARIO-HARNESS-001`, «Build the scenario harness: a plan of scenarios played one by one, each session
    written with its traces, records and sealed-map entry»; en la fase O4.P2 (vacía), en el orden 23.
  - Prueba en seco: remap con solo el nuevo, en el 23, y el aviso esperado de fase vacía; el canónico sin tocar.
    Script: `insertar-23.mjs` del scratchpad de la cabina.
  - **Hallazgo que fija el encuadre:** en `policy/p2-policy-v1.json`, `parameters.N.value` es `null` (lo fija el
    piloto, ESPEC 10). Sin N, ninguna sesión arranca salvo con un N de prueba, y su traza es test-only
    (`p2exp.tutor.settings`). El arnés de este run solo puede producir sesiones de prueba.
  - Fuentes medidas: ESPEC §7 y §10–§11; `COMO_CONSTRUIR_LA_MEDICION.md`, Pieza 5; contrato de datos §4, §10 y §11;
    `p2exp.play.driver` (`TEST_N = 2`); `p2exp.contract.sealed_map`; las dos fichas de `debug/items`; los
    interruptores ya presentes en el código de las etapas del tutor.
- **`#21` «Pin LF line endings in the repository and measure the PC's Claude Code version for its adapter»
  (`RUN-P2-PC-UPKEEP-001`), cerrado.** Lo creó la cabina el 2026-10-30, por orden de Chris («Sí, ábrelo»), y con
  sus campos aprobados («Sí, créalo»).
  - Por la consola: `insert` después del `#20` (remap: solo el nuevo, en el 21), y luego un lote `move` a O1.P2
    «Stack and repository skeleton» sin cambiar el orden + `set-status active`.
  - Campo a campo: un solo cambio, el run nuevo, igual a lo pedido. md5 `75ca7398…` → `7fd2fd68…`; `.project/`
    re-emitido.
  - Commit `c3020de`, publicado. Respaldo: `_backups\phd-p2-experiment\RUN-P2-PC-UPKEEP-001\roadmap.json`; se borra al
    cerrar.
  - **Taller lanzado** como sesión enlazada: «Taller #21: LF en el repo y Claude 2.1.284»,
    `local_0e0f1b7b-7c1f-45ce-844f-393ddf3d6d98`, `p2-pc-upkeep`; Opus, esfuerzo medio, sin worktree. No lleva QA
    humana y gasta como mucho 2 llamadas de Claude.
  - Al cerrarlo, la cabina hace un clon nuevo con el gitconfig de la PC y comprueba que sale en LF.
  - **La sesión del CLI de Claude estaba caducada**: «Login: Expired — log in again» a las 17:04 UTC. Chris volvió a
    iniciar sesión con `claude auth login --claudeai` y pegó el estado: «Login method: Claude Max account». La cabina
    se lo avisó al taller, que lo comprueba él mismo antes de la parte de pago.
  - **El taller PARÓ en el criterio 4** (informe `docs/runs/RUN-P2-PC-UPKEEP-001.md`).
    - **LF, hecho:** `.gitattributes` con `* text=auto eol=lf`, los formatos con nombre y los binarios `binary`. El
      guard (i) es `tests/test_line_endings.py`, visto en rojo con tres siembras. Ningún blob del índice cambia.
    - La cabina lo verificó y lo publicó en `3a1527c`: suite 3386/1/25 y 0 `w/crlf`.
    - **Clon nuevo de la cabina**, desde GitHub y con `core.autocrlf=true` del sistema: 312 `i/lf w/lf`, 0 `w/crlf`, y
      la suite verde dentro del clon (3386/1/25). Después borró el clon.
    - **Claude 2.1.284, no se añade:** con la sesión viva, 3 de las 4 pruebas gratuitas fallan. El CLI carga un
      complemento de serie, `agents-md@builtin`, y el chequeo de aislamiento del adaptador lo rechaza (`plugins` debe
      ir vacío). `MEASURED_VERSIONS` no cambia; 0 llamadas de pago.
    - El informe trae tres opciones (§8): A, un run nuevo que lo apague, extienda el canario a `AGENTS.md` y mida bien
      la versión; B, dejar el CLI en 2.1.226, que se actualiza solo; C, aceptarlo como residuo.
    - **Desviación declarada:** el taller usó `git checkout-index` en su copia del scratchpad, nunca en el repositorio.
      El ticket decía «git que escriba en cualquier forma» fuera de alcance.
    - **Chris decidió** («Sí, las dos», 2026-10-30) cerrar el `#21` y abrir la opción A como `#22`.
  - **El `#21` se cerró por la consola** sin QA humana, como dice su texto: `active` → `completed`, con
    `closeout_result`.
    - Prueba en seco con `remap: []`; campo a campo, solo cambiaron `status` y `closeout_result`.
    - md5 `7fd2fd68…` → `45011515…`. Commit `6ff821d`, publicado.
    - Respaldos borrados: los dos del `#21` y el temporal de la consola.
    - 21 de 21 runs `completed`.
  - **`#22` creado y `active`** (2026-10-30). Chris aprobó los campos con «Sí, créalo».
    - Por la consola: `insert` después del `#21`, en la misma fase O1.P2 (remap: solo el nuevo, en el 22), y
      `set-status active` (remap `[]`).
    - Campo a campo: un solo cambio, el run nuevo, igual a lo aprobado. md5 `45011515…` → `e9cdc79d…`.
    - Commit `690fb62`, publicado. Respaldo: `_backups\phd-p2-experiment\RUN-P2-CLAUDE-AGENTS-MD-001\roadmap.json`; se
      borra al cerrar.
    - **Taller lanzado** como sesión enlazada: «Taller #22: complemento agents-md de Claude»,
      `local_c42b9250-d128-4cf5-8d01-6de2f276c98f`, `p2-claude-agents-md`; Opus, esfuerzo alto, sin worktree. Como
      mucho 2 llamadas de Claude, sin QA humana. Para y trae las opciones si no hay forma de apagar el complemento desde
      el adaptador.
  - **El taller del `#22` PARÓ en el criterio 6** (informe `docs/runs/RUN-P2-CLAUDE-AGENTS-MD-001.md`).
    - **Qué hace `agents-md`:** lee los `AGENTS.md` (y `.claude/AGENTS.md`) de las carpetas de arriba como
      instrucciones de proyecto, donde no hay `CLAUDE.md`. Con las opciones de antes no llegaba nada.
    - **Lo apaga** `--settings '{"enabledPlugins":{"agents-md@builtin":false}}'` (`PLUGIN_ARGS`): `init` queda con
      `plugins: []`. Va para toda versión salvo 2.1.226 (`WITHOUT_PLUGIN_ARGS`). `--bare` no lo apaga.
    - **El canario** planta `AGENTS.md`, y tiene una segunda plantación sin `CLAUDE.md`; visto en rojo sin la opción.
    - La cabina lo verificó (suite 3386/1/26, 0 `w/crlf`) y lo publicó en el commit `c36cc76`.
    - **2.1.284 sigue fuera:** su petición trae un mensaje nuevo con rol `system`, «# Environment» (carpeta de
      trabajo, si es repo git, plataforma, shell, versión del SO, nombre e ID del modelo, fecha de corte,
      `<total_tokens>` y fecha), y desaparece el recordatorio aceptado con el correo y la fecha.
      `CLAUDE_CODE_DISABLE_ATTACHMENTS=1` solo quita la línea de tokens. 0 llamadas de pago.
    - **Chris lo aceptó** (2026-10-30). A «¿Aceptas el bloque «# Environment» como residuo, en una segunda ronda del
      #22?», contestó «Sí, acéptalo».
      - El veredicto verbatim está en `docs/verdicts/2026-10-30-claude-2-1-284-environment-residual-accepted.md`.
      - El texto del `#22` se enmendó con la «RONDA 2 (2026-10-30)» por la consola (`set-text`, `remap: []`); solo
        cambió el `full_description`. md5 `e9cdc79d…` → `7473400b…`. Commit `b0aab23`, publicado.
      - Respaldo de la ronda: `_backups\phd-p2-experiment\RUN-P2-CLAUDE-AGENTS-MD-001-ronda2\roadmap.json`.
    - **La ronda 2 se mandó al mismo taller** (`p2-claude-agents-md`) a las 18:59 UTC. Pide:
      - la forma exacta del bloque, solo en 2.1.284;
      - `CLAUDE_CODE_DISABLE_ATTACHMENTS=1`;
      - la línea de git en una llamada real;
      - las gratuitas y, si pasan, la versión y las 2 de pago;
      - una sección «## 10. Ronda 2» del informe, con «Para el hilo del paper», que va a `DESDE_DEV.md`.
    - **La ronda 2 PARÓ en el último paso** (informe §10).
      - **Hecho:** el bloque comprobado por su forma, solo en 2.1.284 (`ENVIRONMENT_PATTERN`; visto en rojo);
        `CLAUDE_CODE_DISABLE_ATTACHMENTS=1`, que solo quita la línea de tokens (`LATER_ENV`, no en 2.1.226); y en una
        llamada real, «Is a git repository: false».
      - `MEASURED_VERSIONS = {2.1.226, 2.1.284}`: las 5 gratuitas y las 2 de pago pasan (2 llamadas).
      - La cabina lo verificó (3386/1/26, 0 `w/crlf`) y lo publicó en el commit `4001fa1`.
      - **Falta:** `test_the_evaluator_call_reaches_the_cli_as_built` lee el prompt en el índice 1, que es la forma de
        2.1.226. Ese fichero estaba fuera del Scope del ticket.
    - **La ronda 3 se mandó al mismo taller** (19:09 UTC): solo esa lectura, que tiene que seguir estricta y verse en
      rojo, y la sección «## 11. Ronda 3». Con 0 llamadas. No amplía el run: su texto ya pide las gratuitas del
      evaluador.
    - **La ronda 3 TERMINÓ** (informe §11). La lectura del prompt pasa a `[-1]`, estricta en las dos formas, y se vio en
      rojo con siembras.
      - La cabina verificó la suite (3386/1/26) y corrió ella las 7 gratuitas de Claude y del evaluador (7 passed).
      - Publicado en el commit `86797c2`.
  - **El `#22` se cerró por la consola** sin QA humana, como dice su texto: `active` → `completed`, con
    `closeout_result` (1558 caracteres).
    - Prueba en seco con `remap: []`; campo a campo, solo cambiaron `status` y `closeout_result`.
    - md5 `7473400b…` → `e8320fdf…`. Commit `952cb7d`, publicado.
    - Borrados sus tres respaldos y el temporal de la consola.
  - **Sigue abierto, del `#22`:**
    - las entradas para el paper en `DESDE_DEV.md` (informe §10.11 y §11.9), cuando llegue la copia de la laptop;
    - medir 2.1.226 en la laptop, si se vuelve a usar.
  - **Así quedó redactado el `#22`:**
    - `RUN-P2-CLAUDE-AGENTS-MD-001`, «Turn off the Claude Code CLI's built-in agents-md plugin in its adapter, plant an
      AGENTS.md in its canary, and measure 2.1.284».
    - En O1.P2 y en el orden 22, depende de `RUN-P2-PC-UPKEEP-001`.
    - Prueba en seco de la inserción: remap con solo el nuevo, en el 22; el canónico sin tocar.
    - Script: `insertar-22.mjs` del scratchpad de la cabina.
    - Medido para planificar: el CLI tiene `--bare` (que podría apagar el OAuth) y `--plugin-dir`, y el adaptador ya
      usa `--setting-sources ""`, `--strict-mcp-config` y `--disable-slash-commands`.
- Los runs `#1` a `#20` están cerrados. El `#20` «Build the simulated learner by its contract and play it against the
  full tutor» cerró el 2026-10-30 (commit `d9e1a95`, publicado). Su historia, abajo.
  - **H1–H3, decididas** (2026-10-29). A «¿Aceptas H1–H3 como te los recomiendo?», Chris contestó «Sí, las tres».
    Verbatim en `docs/verdicts/2026-10-29-learner-h1-h3.md` (commit `9272925`, publicado). **H1**: las tácticas del
    adverso cuentan por sesión, no por paso, para que aparezca el contexto falso; `press_limit` sigue en 2 (§4.3, nueva
    `dynamics_version`). **H2**: solo cuenta como pista un mensaje con contenido del paso, por ejemplo una fórmula del
    ítem, y no un «inténtalo tú» vacío. Ajusta Q2 (§3.5, nueva `perception_version`). **H3**: sin cambio, se mide en el
    piloto.
  - **La QA1–QA4, toda sí** (2026-10-29). A «¿Me pasas la QA1–QA4 del §8.3?», Chris contestó «Todo sí». Está en el
    mismo veredicto (commit `cf442c8`). La segunda ronda lleva solo H1 y H2.
  - **El texto del `#20` se enmendó con la «RONDA 2»** (D-061), por la consola: `set-text`, con prueba en seco
    (`remap: []`) y aplicación con su base. Solo cambió el `full_description` del `#20`. El canónico pasó de md5
    `2e1384c2…` a `4e53de05…` (árbol = LF); `.project/` lo re-emitió `serve.mjs`. Commit `31e0567`, publicado. El
    respaldo está en `_backups\phd-p2-experiment\RUN-P2-LEARNER-001-ronda2\roadmap.json` y se borra cuando cierre el
    `#20`.
  - **El taller de la segunda ronda lo lanzó la cabina el 2026-10-29**, como sesión enlazada a la suya
    («Taller #20 ronda 2: alumno simulado H1–H2», `local_340af2bb-37c8-40e2-8bce-546952159f00`, nombre
    `p2-learner-ronda2`; Opus, esfuerzo alto, en la carpeta del repo y sin worktree). Fue por orden de Chris, a quien
    la cabina le había dado el ticket para pegarlo: *«no me de slos tickets para lanzarlos, tu lanzalos en un ticket
    anidado a esta conversacion por eso nos cambiamos cabina a claude code entonces tu lanzalo directamente»*. Desde
    entonces la cabina lanza ella los talleres (`../cabinas/phd-p2-experiment/CLAUDE.md`, «Qué cambia respecto a
    Cowork»). El brief es el ticket entero, más un preámbulo: no escribir git, tocar solo «Scope», y abrir el último
    mensaje con `TERMINADO` o `PARADO: …`. Pide una sesión real del adverso, de pago: como
    mucho 2 sesiones de `--call-budget 96` cada una. Para la regla de H2, la cabina avisó de algo: en la sesión real
    (b), el primer «inténtalo» del tutor en `s1` traía \(6\) y \(-5\), así que con esa regla sigue contando como pista
    (sí trae contenido del paso). El taller debe clasificar los 12 mensajes reales con la regla vieja y con la nueva.
    Al terminar el taller toca el turno 2: leer su informe, cerrar el `#20` si la QA de la ronda pasa, y borrar el
    respaldo.
  - **El taller PARÓ en el criterio 6** (2026-10-29, informe §12). Construyó todo lo gratuito: H1
    (`p2-learner-dynamics-v2`, campo nuevo `adverse_turns_in_session`), H2 (`p2-learner-perception-v2`: es señal la
    matemática que no repite el enunciado), el contrato §13/§14, y el ejemplo pasa a la semilla 363. La suite queda en
    3383 passed, 1 skipped; 9 ficheros, todos en «Scope». La sesión real no corrió: el único Codex de la PC es
    `codex-cli 0.142.0`, que no trae `gpt-6-astra` en su catálogo. El adaptador se midió en `0.163.0-alpha.10.2`,
    que está en npm (la «latest» es 0.166.0); la app de Codex de la ronda 1 no está en esta PC. Gastó 0 llamadas.
    La cabina lo verificó en disco: suite 3383/1/25, 0 `w/crlf`, la omitida es la del enlace simbólico. Lo publicó
    en el commit `383567d`. El `#20` sigue `active`.
    Para la sesión, el taller eligió la semilla 18 (§12.7).
  - **Hallazgos nuevos, para Chris:**
    - **H6**: con H2, el adverso abandona 17 de 39 sesiones con el tutor simulado; H3 se decidió con 3 de 39.
    - **H7**: una pista sin fórmula ya no es señal (la de respaldo de nivel 1 de `s2`); no sale en los 12 mensajes
      reales.
    - **Seguimiento**: añadir `adverse_turns_in_session` a los dos `contract/examples/invalid/learner-event.*`, que
      ahora fallan por dos razones.
  - **Chris decidió las cuatro como las recomendó la cabina** (2026-10-29). A «¿Aceptas las cuatro como te las
    recomiendo?» contestó «Sí, las cuatro». Está en el mismo veredicto, en la sección «After the second round stopped» (commit `c2f7175`, publicado).
    - **Codex:** él instala `codex-cli 0.163.0-alpha.10.2` en la PC
      (`npm.cmd install -g @openai/codex@0.163.0-alpha.10.2`). A las 04:05 UTC seguía en `0.142.0`.
    - **H6:** se mantiene H3, y el piloto lo mide.
    - **H7:** se deja así.
    - **Seguimiento:** va en el mismo taller que la sesión real.
    - **Cuando `codex --version` dé la 0.163, la cabina lanza ese taller.** Primero corren las pruebas gratuitas del
      guard (d) con esa versión; solo si pasan, la sesión con la semilla 18 (≤ 96 llamadas, más una segunda solo si no
      aparece el contexto falso). Va también el campo en los dos ejemplos inválidos. Después vienen la QA de la ronda y
      el cierre del `#20`.
  - **Chris instaló Codex 0.163** (2026-10-29). Lo pegó del PowerShell: `npm.cmd install -g
    @openai/codex@0.163.0-alpha.10.2` → «changed 2 packages in 10s»; `codex --version` → `codex-cli
    0.163.0-alpha.10.2`. La cabina lo midió a las 04:07:44 UTC: misma versión, «Logged in using ChatGPT», árbol limpio
    en `c2f7175`. Le mandó el encargo de la segunda parte al **mismo** taller (`p2-learner-ronda2`), que tiene el
    contexto: la semilla 18, sus scripts y el §12. Pide la capa gratuita del guard (d) antes de gastar, los dos ejemplos
    inválidos, la sesión real (≤ 2 sesiones / 192 llamadas) y un §12.15 nuevo, sin tocar §12.1–§12.14.
  - **La segunda parte PARÓ en la sesión real** (informe §12.15).
    - Hecho y verificado por la cabina: el guard (d) gratuito pasa con la 0.163 (2 de 2); los dos ejemplos inválidos
      llevan el campo y fallan solo por su siembra; suite 3383/1/25; 0 `w/crlf`.
    - Publicado en el commit `d075882`.
    - La semilla 18 terminó en `error` en el turno 1: Codex no pudo renovar el token de ChatGPT («Please log out and
      sign in again», 04:12:23 UTC). Hubo 3 `codex exec` sin respuesta (3 de 192 como cota) y no se corrió la 26.
    - **Corrección de la cabina:** a las 04:07:44 leyó «Logged in using ChatGPT» y dijo que había sesión. Ese
      `login status` no prueba que el token se renueve; solo una llamada real lo prueba.
    - **Lo que sigue:** Chris hace `codex logout` y `codex login`. Luego, una llamada mínima de pago
      (`test_minimal_call`) antes de la sesión, y otra vez la semilla 18 (§12.15.4).
  - **Chris volvió a iniciar sesión en Codex** («Ya inicié sesión», 2026-10-29). A las 04:22:16 UTC la cabina mandó la
    tercera parte al mismo taller: `test_minimal_call` (1 llamada) y, si responde, la semilla 18 en una carpeta nueva
    (la 26 solo si no aparece el contexto falso; ≤ 192 en toda la ronda). El informe va en un §12.16 nuevo.
  - **La tercera parte TERMINÓ** (informe §12.16). Pasó la llamada mínima, y la sesión real `se_z7kwwvhtnc` (semilla
    18) cerró `item_closed` en 6 turnos. El contexto falso, `claims_authority_value`, salió en el turno 4; no hubo
    abandono, y ningún paso pasó de dos actos adversos. Gastó 26 llamadas; la ronda va en 30 de 192.
    - La cabina verificó en disco: suite 3383/1/25, 0 `w/crlf`, solo el informe con §12.16 al final.
    - Comparó los 12 mensajes del §12.16.8 con la traza nativa del scratchpad del taller: coinciden literal.
    - Publicado en el commit `7483881`.
    - **La QA de la ronda pasó** (2026-10-30). A «¿El contexto falso se lee como un alumno?», con lo que había que
      mirar (el (4), y el salto al (5) «No sé cómo hacer esta parte»), Chris contestó «Sí, se lee así». Está en el
      veredicto, sección «The QA of the second round».
  - **El `#20` se cerró por la consola**, `active` → `completed`, con `closeout_result` (1640 caracteres).
    - Prueba en seco con `remap: []` y aplicación con su base.
    - Campo a campo contra el respaldo: solo cambiaron `status` y `closeout_result`.
    - md5 `4e53de05…` → `75ca7398…` (árbol = LF = HEAD); `.project/` re-emitido.
    - Commit `d9e1a95`, publicado.
    - Respaldos borrados: `RUN-P2-LEARNER-001-ronda2` y `RUN-P2-LEARNER-001-cierre`, y el temporal de la consola.
  - **Sigue abierto del `#20`:** las entradas de H1–H7 y de las versiones nuevas en `DESDE_DEV.md`, cuando llegue la
    copia de la laptop (informe §12.11 y §12.16.9).
- Hecho, de ESPEC §11: los pasos 1 a 3 (formatos, PAF sobre trazas a mano, el tutor completo) y el alumno simulado
  (contrato aprobado y construido). Más: la superficie visible, PAF sobre sesiones manuales y el lanzador. Sin
  empezar: el arnés de escenarios y la cobertura (O4.P2, O4.P3), los interruptores (O5), los brazos de RQ3 y la
  exportación (O6), el piloto (O7) y la validación (O8).

## §4 · Pendientes que no tienen run

- **De la mudanza (§6):**
  - **`DESDE_DEV.md` no viajó** (§6): copiarlo desde la laptop (el operador) y comprobar su md5 LF
    `67a2a6bc5d2bd96cf384f46ad8dc6c80` (860 líneas) antes de añadir nada. El operador ya aprobó que, tras cada entrada,
    la cabina commitee y publique en `PHD` solo ese fichero (2026-10-29, «Sí, solo ese fichero»; `CLAUDE.md`, «El canal
    con el paper»).
  - **La `.venv` está rehecha** (2026-10-29, 19:37–19:38 UTC). El operador instaló Python 3.12.10 con
    `winget install --id Python.Python.3.12 -e --source winget`, para su usuario
    (`C:\Users\chris\AppData\Local\Programs\Python\Python312\`; el lanzador `py.exe` está en `…\Python\Launcher\`).
    Una consola abierta antes de instalar no ve el `PATH` nuevo, y la app tampoco: la cabina llama a `py` por su ruta
    completa. La suite da **3370 passed, 1 skipped, 25 deselected** (19:55 UTC). La omitida es
    `tests/test_manual_server.py:508`, que necesita crear un enlace simbólico (`WinError 1314`; hace falta el Modo de
    programador o ser administrador). A la pregunta «¿Dejo la prueba del enlace simbólico omitida en esta PC?», el
    operador contestó «Sí, déjala» (2026-10-29). En esta PC esa es la cuenta esperada.
  - **El checkout de la PC escribía CRLF** (medido el 2026-10-29). El Git de la PC trae `core.autocrlf=true` en
    `C:/Program Files/Git/etc/gitconfig`. En la laptop este repo tenía `core.autocrlf=false` en su `.git/config`
    (`docs/runs/RUN-P2-TUTOR-LAUNCHER-001.md`, D7), y eso no viajó. Con `* text=auto`, 307 de los 381 ficheros quedaron
    en CRLF y 4 tests fallaban: los ejemplos `.jsonl` del contrato traían CR. A la pregunta «¿Pongo `core.autocrlf
    input` en phd-p2-experiment y paso los 307 ficheros a LF?», el operador contestó «Sí, adelante» (2026-10-29). La
    cabina puso `core.autocrlf input` en el `.git/config` de `phd-p2-experiment` (solo ahí) y pasó los 307 a LF. Cada
    uno se escribió solo si quedaba idéntico a su blob del índice: cuadraron 307 de 307. Un `git add` de esas rutas
    puso el índice al día sin cambiar contenido (`diff --cached` vacío; `status` limpio). Para un clon nuevo en Windows,
    lo duradero es del repo: un `.gitattributes` que fije LF (por ejemplo `*.jsonl text eol=lf`). Va en el próximo
    ticket de DEVELOPMENT.
  - **Resuelto en `#21` y `#22`:** el adaptador de Claude acepta `2.1.226` y `2.1.284` (`MEASURED_VERSIONS`), cada una
    con su forma de petición aceptada. Con la próxima actualización del CLI se vuelve a parar hasta medirla. El
    adaptador de Codex no tiene esa lista, pero sus opciones se midieron en
    `0.163.0-alpha.10.2`, la que Chris instaló en la PC el 2026-10-29 (antes había `0.142.0`, sin `gpt-6-astra`). Su
    `login status` no prueba que el token se renueve: la prueba es `test_minimal_call` (1 llamada).
  - Copiar `data/` desde la laptop (el operador) y verificarla contra el manifiesto (la cabina).
  - Versionar `data/manual/` en el próximo ticket de DEVELOPMENT (una excepción en `.gitignore` y una nota en el
    contrato de datos §11).
- La revisión a fondo de Chris del informe de PAF (`data/manual/se_x9629szb4q/paf/002/report.md`), con la legibilidad
  que pidió para el run del visor (O9.P4).
- Las cuatro carencias no bloqueantes del contrato del servidor (`docs/runs/RUN-P2-LIVE-VIEWER-001.md` §7).
- El feedback de diseño del visor de Chris: lo dará él, cuando abra ese run.
- ~~Arreglar el contrato de «sin control» antes de O5.~~ Hecho en `#25` (C1 a, C5, C7). Queda el docstring de
  `src/p2exp/tutor/settings.py`, que cita la redacción vieja de 5.1 («where the condition switch lives»), para un run
  posterior.
- Para el hilo de `aiw-console`, solo nombrado: `start-console.ps1` devuelve 0 aunque el servidor salga con error tras
  Ctrl+C (`docs/runs/RUN-P2-TUTOR-LAUNCHER-001.md`, D2).
- `DESDE_DEV.md`: muchas entradas siguen pendientes del hilo del paper. Se cuentan al abrir.

## §5 · Entorno de la cabina

- La cabina mide en Python 3.10 con una venv propia (`$HOME/p2v`, fuera del montaje) hecha desde `requirements.lock`.
  No sobrevive entre sesiones: se rehace en un minuto. La suite ya no cabe en una llamada de 180 s: se corre en dos
  mitades.
- El permiso de borrado es por sesión: sin él, git deja `index.lock` y temporales en `.git`. Se pide antes de commitear.
- Ediciones del canónico: por la consola (`PC_PORT=8797`), con dry-run y `remap` antes de aplicar.

## §6 · La mudanza, medida en la PC el 2026-10-29 (UTC)

| Hora | Qué | Resultado |
|---|---|---|
| 15:47:52 | Carpeta conectada; `aiw-console` contiene `a0c3d9c` | `AIW_Workspace` en `desktop-525k0is`; sí (HEAD `ad00bfa`) |
| 15:48 | `index.lock` en los 7 repos | ninguno |
| 15:48:32 | `phd-p2-experiment`: HEAD frente a `origin/main` | `91d1043` = `91d1043`, igual que en la laptop (`repos-laptop.tsv`); árbol limpio |
| 15:48:32 | Tag `hito-1` | no está en la PC; el commit `4644240` sí. Ya no hace falta (§2) |
| 15:49 | Lo de este hilo en `_scratch` (MUDANZA §3) | nada: 0 entradas por nombre, ninguna asignada; la cabina nunca escribió ahí |
| 15:49 | `data/` (27 ficheros, 185 KB en la laptop) | no existe en la PC |
| 15:49 | `.venv` | no existe en la PC |
| 15:49 | `_demos/phd-p2-hito-1` (343 ficheros, 8,6 MB en la laptop) | no existe en la PC; retirada por Chris el 2026-10-29 |
| 15:49 | `_backups/phd-p2-experiment_roadmap.json_pre-20_2026-10-22` | no llegó; no hace falta: el roadmap de ese momento está en git (`0492e25`) |
| 16:19–16:22 | `PHD/Paper 2/00_HANDOFFS/DESDE_DEV.md` | **no viajó lo que la cabina escribió después de la sesión 15 del paper**: en la PC, 181 líneas (la versión de `PHD` `e9d38b6`, árbol limpio); en la laptop, 69 036 bytes y 860 líneas, sin commitear. El manifiesto lo marca en `difieren-en-contenido.txt` |
| 16:22:35 | HEAD frente a `origin/main`, tras el push del operador | `phd-p2-experiment` `deb51ee` = `deb51ee`; `aiw-console` `0b4235a` = `0b4235a` |

Lo que falta de la mudanza está en el §4.
