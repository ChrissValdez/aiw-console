# La cola completa de O5, y la clasificación de los 42 runs

**Hilo `cantu-quizzes-latex` · 2026-08-06, 13:25 CST.** Continúa y **corrige hacia adelante** a
`ALTA-O4-O5-Y-RUBRICA-V2.md`, que quedó cerrado con 2 runs. No se reescribe: era cierto a su hora.

---

## 1. Dos defectos de la cabina que detectó el operador en pantalla

**a) Los dos primeros runs se crearon SIN CLASIFICAR.** El procedimiento lo dice: *«un run que se
CREA se clasifica en el mismo acto, o su ticket declara por escrito por qué no y cuándo»*. La
cabina no hizo ninguna de las dos cosas. El operador lo vio en la consola. **Corregido: los 42
runs quedan clasificados, `unclassified_live_runs: total=0` en el snapshot.**

**b) La cabina escribió el canónico mientras el operador ejecutaba un bloque de Git.** El bloque
llevaba la guarda `if ($runs -eq 2)`, y para cuando se ejecutó la cabina ya había insertado 40
runs más, de modo que la guarda ya no describía el estado. **Es una colisión de superficies de
escritura, y la superficie de la cabina cuenta como una más.** El resultado medido: el record
entró en `aiw-console` (`4be24e3`, `HEAD` = `origin/main`), y **el repo del proyecto quedó sin
commitear** con el árbol sucio. Ningún dato se perdió; la guarda dejó de servir, que es justo lo
que la regla existe para evitar.

## 2. Por qué se escribieron los 40 de golpe

La cabina había recomendado dos pasos —piloto primero, los 39 después— para no comprar 39
reescrituras de descripción. **El operador decidió lo contrario y con razón explícita:** quiere
ver el roadmap completo para saber cuántos son y poder planificar. La descripción de un run se
corrige con `set-text`, que es barato; **no tener el mapa es caro todos los días.**

Queda registrado el coste que se acepta: si el piloto cambia el procedimiento, hay 39
descripciones que enmendar.

## 3. La cola: 42 runs

| Fase | Runs | Preguntas | Imágenes |
|---|---|---|---|
| `O4.P1` Every question is well formed | 1 | — | — |
| `O5.P1` Arithmetic | 7 | 490 | 8 |
| `O5.P2` Algebra | 14 | 1 160 | **0** |
| `O5.P3` Functions | 8 | 610 | 45 |
| `O5.P4` Statistics and probability | 5 | 320 | 83 |
| `O5.P5` Geometry | 7 | 420 | **189** |

**41 subtemas de Matemáticas, los 41 con ancla.** Cobertura de examen: mín 10
(`ALG-EQD-Desigualdades`, `GEO-GA-Transformaciones`), mediana 20, máx 50.

**El orden es de temario, no de coste.** Geometría queda last, que es también la más cara, pero
Álgebra —14 subtemas y **cero imágenes**, el bloque más barato por run— queda segunda en vez de
primera. Reordenar es `move`, y es barato: se hará si el piloto muestra que el coste manda.

### Aristas y barrera

- **`#2` el piloto es BARRERA GLOBAL.** Una sola marca en lugar de 39 aristas que dirían lo
  mismo y se pudrirían en cuanto un run se reencuadrara. Nada de la cola arranca antes de que
  el piloto cierre.
- **Dos aristas reales hacia `#1`:** `#7 ARI-PI-Intereses` y `#37 GEO-GP-Triangulos`. Son los
  dos subtemas cuyos códigos llevan la errata; sin reparar, su búsqueda de ancla no encuentra
  nada. La arista **impide**; el número **comunica**; hacen falta las dos.

## 4. Clasificación, y de dónde sale el modo de cierre

| Run | correctness_model | work_type | blast_radius | failure_surfaces | → cierre |
|---|---|---|---|---|---|
| `#1` erratas de código | `SPECIFIED` | `FUNCTIONAL` | `ADJACENT` | `SILENT` | **SEMI_ATTENDED** |
| `#2` piloto | `JUDGED_DEFINES` | `FOUNDATIONAL` | `SYSTEMIC` | `SILENT` | **ATTENDED** |
| `#3`–`#42` revisiones | `JUDGED_ACCEPTS` | `FUNCTIONAL` | `LOCAL` | `SILENT` | **SEMI_ATTENDED** |

**Resultado: 41 SEMI_ATTENDED y 1 ATTENDED**, que es exactamente lo que el operador pidió —
`aiw` ejecuta y él revisa el informe.

**`SILENT` en las tres filas y no es adorno:** una pregunta mal clasificada, una clave errónea o
una retroalimentación que miente **no anuncian nada al fallar**. Nadie ve rojo; el alumno
estudia mal. Eso sube la severidad un escalón en la derivación, y es la razón de que una
revisión de un solo subtema no pueda cerrarse sin que un humano la acepte.

**El piloto es el único `ATTENDED`, y es correcto:** define qué significa «revisado» para los 39
que siguen. El juicio del operador entra como **ENTRADA**, no como sello final. Y la regla de
lotes lo confirma sin que haya que invocarla: *un run `ATTENDED` no se agrupa nunca*.

## 5. Notas que viajan dentro de runs concretos

- **`#35 EST-TCP-Probabilidad` puede no ser una revisión.** Su `full_description` lo declara: el
  plan pide 50 Nivel PAA y el disco tiene 30, copiadas de `EST-TCP-Conteo` con solo los títulos
  cambiados. El banco tiene **cero** preguntas genuinas de probabilidad Nivel PAA. El run ordena
  **parar** si eso se confirma, porque pasaría a ser autoría de ~50 preguntas.
- **Tres descuadres plan/disco viajan en su run**, sin adjudicar cuál gana:
  `ALG-EXP-Radicales` 90→95, `FUN-FF-AnalisisGraficas` 60→65, `FUN-TFG-Funciones` 60→70.
- **Ancla débil declarada** en los de 15 o menos: `ARI-Conjuntos`, `FUN-FF-AnalisisGraficas`,
  `FUN-TFG-Funciones`, `ALG-EQD-Desigualdades`, `GEO-GA-Transformaciones`.

## 6. Evidencia del ritual

- **Respaldo previo:** `_backups/roadmap-cantu-quizzes-latex-ANTES-O4-O5-20260806-1305.json`,
  `cmp` idéntico al original.
- **40 inserciones + 42 clasificaciones + 1 barrera**, cada una con `planEdit` (dry-run)
  inmediatamente antes de su `applyPlan`. **`ok=true` en todas; cero runs desplazados en las 40.**
- **md5 canónico:** `a9602463…` (inicio de sesión) → `07b7cf30…` (alta) → **`7fc00a71e2ebe589f3e25a5d048b4dc0`** (cola completa).
- **Verificación final:** `checkInvariants` **0 errores** · densidad `1..42` OK · ids únicos ·
  **0 aristas colgantes** · **0 sin clasificar** · 0 runs `active` · **O1, O2 y O3 comparados
  campo a campo contra el respaldo: idénticos byte a byte**.
- **`.project/` re-emitido:** `objectives=5 · runs=42 · operational_status=idle`.
- **Diez fases siguen sin runs** —las de O1, O2 y O3—, que es la forma válida por `D-062`.

## 7. Lo que sigue bloqueando a `aiw`

Sin cambio desde el record anterior: `cantu-quizzes-latex` no está en `aiw/config.json`, y
`kernel.mjs:279` aborta sin comando de verificación. **Los 41 SEMI_ATTENDED están listos en
forma, no en vía.** La vía es `O2.P3 The verification command`, que el taller midió en ~1,2 s.
