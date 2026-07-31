# Handoff — hilo `aiw`

Última actualización: 2026-07-30. Escrito al cerrar la primera sesión propia de
este hilo. `aiw` en `66255a5` + el commit de este relevo; `aiw-console` en
`37e2d77` + el mismo.

## ⚠️ LOS NÚMEROS DE HOY, Y HOY SE MOVIERON DOS VECES

La cola de `O3` se reordenó dos veces en esta sesión. **Todo record fechado antes
del 2026-07-30 cita los números viejos.** Estos son los de hoy, verificados en el
canónico:

| `#` | `run_id` | Título | Status |
|---:|---|---|---|
| 22 | `RUN-AIW-REAL-LOAD-MEASUREMENT-001` | Run the first real objective against a large repository with a test net | `planned` |
| 23 | `RUN-AIW-SCOPE-PREFLIGHT-GUARD-001` | Make the scope pre-flight demand a real match | `planned`, arista → 22 |
| 24 | `RUN-AIW-TICKET-PARSE-REGRESSION-TEST-001` | Add the regression test that runs the parser against every real ticket | `completed` |
| 25 | `RUN-AIW-EVAL-CASE-CONVENTION-001` | Establish the convention for evaluation cases | `completed` |
| 26 | `RUN-AIW-AGENT-INSTRUCTION-CONVENTION-001` | Establish a compact core plus on-demand modules for agent instructions | `planned` |
| 27 | `RUN-AIW-CYCLE-DOCUMENTATION-001` | Document the run cycle | `planned` |

Totales: **42 runs, 23 `completed`, 19 `planned`**, denso `1..42`, cero `active`,
cero `blocked`. `kernel.mjs` en **478** líneas. Suite de `aiw` en **51/51**.

## LO QUE DEJÓ ESTA SESIÓN

Todo está en `D-058`, que es la lectura obligatoria de arranque. En una línea
cada cosa:

- **`CONST §4` detuvo su primer run.** El guard de scope no tiene incidente —
  medido, no supuesto— y quedó detrás de la medición de carga real, con arista.
- **El test de regresión de parseo entró**, con 0 líneas al kernel, y trajo **la
  frontera derivada del código**: `processed/` es registro, no entrada.
- **La convención de casos de evaluación quedó adjudicada y publicada** en
  `aiw/docs/kernel/`. Un caso es el fixture vivo; el histórico es procedencia.
- **Tres afirmaciones de `D-055`/`D-056` corregidas hacia adelante**, incluida
  «los cinco desenlaces», que eran cuatro y tenía cuatro copias.

## LO PRIMERO DE LA PRÓXIMA SESIÓN, EN ORDEN

1. **Identificar el run que `D-057` señala.** `D-057` avisa de cuatro vocabularios
   en competencia para el eje de delegabilidad y de que **un run `planned` de este
   roadmap está a punto de construir un quinto**. No está identificado. **Hay que
   saber cuál es antes de emitir cualquier ticket de `O3`**, porque los dos
   elegibles —`#26` y `#27`— son candidatos por su materia.
2. **Ejecutar lo que `D-057` encomienda a este hilo**: los punteros a
   `context/CLASIFICACION-DE-RUNS.md` en el `CLAUDE.md` y el `AGENTS.md` de `aiw`.
   Es escritura en las reglas que el agente lee del repo; se difirió a propósito
   para no tomarla de paso al final de una sesión larga.
3. **Analizar `CONST §4` para el `#26` ANTES de su ticket.** Si sus «módulos bajo
   demanda» exigen código de carga en el kernel, es mecanismo y necesita incidente,
   criterio de borrado y presupuesto. Si es solo convención, es papel. Nadie lo ha
   mirado.

## PENDIENTES QUE NO BLOQUEAN, POR ANTIGÜEDAD

- **`governance/` de `aiw` sin ratificar** — 17 guardrails y 4 claims escritos en
  `O2` y nunca aprobados por el operador. Es el pendiente más viejo.
- **La lista de comprobación visual del render** (`AIW-TERCER-PROYECTO.md §5`) —
  diez minutos con la consola abierta; convierte un `[NO VERIFICADO]` en medido.
- **El `git mv -f` que sobrescribe al archivar** (`queue.mjs:26-31`) — defecto real
  del kernel, descubierto hoy. **Necesita run propio con su `CONST §4`.**
- **El fixture de `999-sandbox-imposible`** — declarado, no autorado. Esa rama no
  tiene ejemplar vivo.
- **`aiw` no tiene forma declarada de correr su propia suite** — sin `package.json`,
  sin script. Doce archivos de test y ninguna puerta con nombre. Candidato natural
  del `#27`.
- **La recalificación de los siete casos** — su última ejecución consta
  `[NO VERIFICADO]` desde 2026-07-10.

## EL `#22` ESTÁ BLOQUEADO POR FUERA, Y SE ESTÁ DESBLOQUEANDO SOLO

El `#22` necesita un repo grande **con red de tests verde**. El blanco es
`aiw-console` —la excepción está escrita en el canónico de AIW: *«runs targeting
`aiw-console` are delegable to the kernel»*—, y su suite tenía **10 fallos de 278**
al medirla: pins contra el estado real de dos repos que se movió, no defectos de
código. **Pero el hilo de `aiw-console` está despinneando la suite hacia fixtures
ahora mismo** (`tests/fixtures/neighbours/`, `tests/helpers/real-like-project.mjs`,
`tests/real-projects-smoke.test.mjs`, un record `SUITE-CONTRA-FIXTURES.md`).
**Antes de replantear el `#22`, preguntar a ese hilo si aterrizó.** Y cuando se
lance, coordinar la ventana: el kernel creará rama y diff en su repo.

## CÓMO SE TRABAJA AQUÍ — lecciones medidas de esta sesión

- **PowerShell no es el instrumento para leer estos archivos.** Rompió UTF-8 en dos
  ocasiones (`§` y las rayas largas), no expande globs (`node --test tests/*.mjs`
  falla), y convierte cadenas multilínea en arrays, lo que produjo un ALTO falso.
  **Toda lectura del canónico o de `DECISIONES.md` va por Node.**
- **Las guardas atraparon errores reales cuatro veces** en esta sesión: dos
  guardas de premisa que detuvieron talleres antes de que gastaran su sesión, y
  dos de estado que impidieron commits falsos. **Ninguna guarda salió sobrando.**
- **Una guarda solo comprueba donde tiene ancla.** Anclar en la primera mitad de
  un texto largo no detecta un truncamiento en la segunda.
- **HUECO ABIERTO, y es el hallazgo operativo más caro de la sesión: no se sabe si
  la consola permite editar `full_description`.** Se preguntó tres veces y no se
  obtuvo respuesta. Corregir la premisa de un run antes de ejecutarlo costó cinco
  intercambios, un script a mano sobre el canónico, un respaldo y saltarse la
  re-emisión atómica. **Averiguarlo es barato y hay que hacerlo**; si el campo no
  es editable, es un hueco de la consola que su hilo debe conocer.

## LECTURAS DE ARRANQUE, EN ESTE ORDEN

1. `context/DECISIONES.md`, entrada **`D-058`** — qué pasó y qué rige.
2. `context/DECISIONES.md`, entrada **`D-057`** y `context/CLASIFICACION-DE-RUNS.md`
   — el encargo heredado y el aviso del quinto vocabulario.
3. `aiw/docs/kernel/CONVENCION-DE-CASOS-DE-EVALUACION.md` — la convención vigente.
4. Los cuatro records de esta sesión, citados en `D-058`.

**No hay nada que re-emitir al abrir el hilo.**