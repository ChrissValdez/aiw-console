# Alta de O4 y O5, y la rúbrica de niveles v2

**Hilo `cantu-quizzes-latex` · 2026-08-06 · cambio estructural del canónico + dos documentos.**
Primera sesión del hilo. Todas las cifras llevan la hora en que se midieron.

---

## 1. Qué se escribió

**Canónico** `projects/cantu-quizzes-latex/roadmap/roadmap.json`

| | antes | después |
|---|---|---|
| md5 | `a9602463959d0821719f7c523f6011ec` | `07b7cf3084376ca7e8afe00de5c84522` |
| objetivos | 3 | **5** |
| fases | 10 | **16** |
| runs | 0 | **2** |

**Documento nuevo** `projects/cantu-quizzes-latex/docs/RUBRICA-DE-NIVELES.md` — v2, 13:00 CST.
Es el **primer `.md` del repositorio**, que hasta hoy tenía 0 sobre 281 `.tex`. El emisor lo
recogió: `docs_index.json` pasó de `docs: []` a **1 entrada**, `nav_tier=secondary`. Queda
cerrada la predicción del §6 del relevo inaugural.

## 2. El ritual, punto por punto

1. **Respaldo byte a byte, fuera de todo repo**, antes de escribir:
   `_backups/roadmap-cantu-quizzes-latex-ANTES-O4-O5-20260806-1305.json`.
   `cmp` con el origen: idénticos. `sha256:666f01a1fe00…`
2. **Precondiciones medidas**: 3 objetivos, 10 fases, 0 runs, y los tres títulos verbatim.
3. **Motor conducido, nunca JSON a mano.** Diez operaciones, cada una con `planEdit` (dry-run)
   inmediatamente antes de su `applyPlan`. `ok=true` en las diez.
   **`remap` vacío en las ocho estructurales; en las dos inserciones solo el run nuevo.
   Ningún run se desplazó, porque no había ninguno.**
4. **Verificación posterior contra el respaldo**: `checkInvariants` **0 errores**; densidad
   `queue_order` `[1,2]`; ids únicos; **0 aristas colgantes**; 0 runs `active`; y **O1, O2 y O3
   comparados campo a campo contra el respaldo: idénticos**.
5. **Sin taller corriendo.**

**`.project/` re-emitido en el mismo turno** con `aiw-projector@0.12.0`:
`objectives=5 · runs=2 · operational_status=idle`.

### La colisión que retrasó esto, y cómo se resolvió

A las 11:25 CST el motor —`tools/roadmap/roadmap-core.mjs` y `roadmap-plan.mjs` en
`aiw-console`— tenía **+360 / −230 líneas reales sin commitear** (medido con
`--ignore-cr-at-eol`; ese repo no tiene `.gitattributes`). La cabina **paró y no escribió**:
conducir un planificador a medio reescribir habría producido un canónico generado por una
versión del motor inexistente en la historia. A las 13:00 el motor estaba limpio en `89c6fc1` y
se procedió. El hallazgo se **nombró** y no se corrigió: es del hilo `aiw-console`.

## 3. Lo que entró

**`O4 — The content can be trusted`** · fase `Every question is well formed`
**`O5 — Mathematics is reviewed, subtopic by subtopic`** · fases `Arithmetic`, `Algebra`,
`Functions`, `Statistics and probability`, `Geometry` — en orden de temario, no de ejecución.

- **`#1 RUN-QUIZZES-CODE-FAMILY-TYPOS-001`** — `Repair the two misspelled code families`.
  `ARI-PI-Interteres` (sobra una `t`, 15 preguntas) y `GEO-GP-Triangulo` (falta la `s`, 45).
- **`#2 RUN-QUIZZES-FRACTIONS-REVIEW-PILOT-001`** — `Review ARI-FA-Fracciones against the
  rubric, as the pilot`. Segundo intento; el primero paró correctamente.

**Catorce fases quedan sin runs.** Es la forma que `D-062` declara válida, y es deliberada: los
39 runs restantes de O5 se escriben **después** del piloto, con la descripción ya corregida por
lo que enseñe.

## 4. El error de la cabina que hizo falta la v2

**La v1 definía el ancla como «las preguntas del Banco que aparecen en los exámenes»,
calculada como intersección de códigos.** La intersección era correcta —989 y 755 códigos
aparecen en ambos árboles— pero **el código es un espacio de nombres local**: cada árbol numera
desde `001`. La cifra medía **colisión de nombres, no reutilización de preguntas**, y la cabina
le puso la unidad equivocada al publicarla.

**Verificado en texto crudo:** `ARI-FA-Fracciones-Medio-001` designa `(3/4−1/2)×…` en el Banco,
un problema de tanque de agua en el Diagnóstico y `(3/4+1/6)×2/5` en el Simulador. Tres
problemas distintos.

**Lo detectó el taller, no la cabina.** Es la separación adversaria funcionando: ningún agente
que hubiera escrito ese ancla la habría contradicho. La cabina había recomendado el piloto
precisamente por su «ancla sólida de 20 de 45», que era el mismo artefacto.

**El ancla no murió, cambió de forma.** La v2 la reconstruye como **corpus de referencia**: se
compara contra las preguntas de examen del mismo subtema, sin exigir identidad. Cobertura
medida: mediana **20** por subtema de Matemáticas, mín 10, máx 50, y **Fracciones tiene 40** en
vez de las 2 que encontraba la regla rota.

## 5. Otras correcciones hacia adelante

- **Las «1 021 preguntas con 5 opciones» no eran anomalía.** `No conozco la respuesta` aparece
  **1 020 veces, todas en el Diagnóstico y ninguna fuera**. Es diseño correcto de instrumento
  diagnóstico: separa «no sé» de «fallé». Se cierra como no-defecto.
- **§6.4 degradada de requisito a observación.** 88 de 90 preguntas de Fracciones no explican
  por qué las distractoras están mal. Un criterio que reprueba el 98 % pide rediseño, no
  revisión, y el operador fue explícito en que quiere revisión.
- **Subtemas: 41 en Matemáticas (media 73,2), 17 en Español (50,0), 58 en total (64,1).** La
  cabina citó 41 y el taller 58 sin declarar alcance; **el defecto era la falta de alcance en
  ambos**, no la cifra.
- **43 familias de código en Matemáticas, no 41**: las dos erratas del run `#1` fingen dos
  subtemas extra.

## 6. Cinco correcciones de contenido aplicadas por el taller, verificadas por la cabina

En los tres ficheros de Fracciones, **+18 / −18 líneas**. Recuentos intactos: **25/45/20 antes y
después**, ninguna baja, ningún hueco.

| Código | Defecto | Comprobación |
|---|---|---|
| `Facil-003` | distractora `5/0` | `9/10−4/10 = 1/2` ✓; un denominador cero no es opción |
| `Facil-020` | distractora `−4/0` | `1−5/4 = −1/4` ✓; ídem |
| `Medio-029` | el enunciado («se le resta 0») contradecía a su feedback | `2/3·x+5 = 3/4·x → x=60`, y el feedback ya decía 60 |
| `Dificil-004` | la respuesta marcada no existía | tiempo real `24/7 h = 3 h 25,71 min`; la clave era `3 h 26 min`. Se cambió la pregunta a «se aproxima mejor», no la clave |
| `Dificil-012` | opciones llamadas `A`/`B`/`C`/`D` en el texto | única violación de §6.2 del subtema |

**Estas cinco quedan PENDIENTES DE VEREDICTO DEL OPERADOR** en el momento de escribir este
record, y no entran en el mismo commit que el alta.

## 7. Estado de `aiw`, medido en solo lectura

- **El puente roadmap→ticket NO EXISTE.** Es el run **#31** de `aiw`, `planned`, y su resumen lo
  dice: *«Build the bridge that does not exist»*. Hoy `aiw` lee `objectives/pending/*.md`.
- **La verificación es obligatoria**: `kernel.mjs:279` aborta sin comando. El de este repo sería
  `O2.P3`, y el taller lo midió en **~1,2 s**, el 0,25 % del presupuesto de 600 000 ms.
- **`cantu-quizzes-latex` no está en `aiw/config.json`** — solo `sandbox` y `console`.
- **`push: false`** en ambos; activarlo es el run #30, `planned`.
- **`# Scope` restringe ESCRITURA, no lectura** (`evaluateGuards` compara contra
  `git status --porcelain`). Por eso un ticket puede leer la rúbrica sin poder editarla, **y la
  idea del fichero de reglas referenciado funciona hoy sin función nueva**.
- **Convergencia NOMBRADA y no tocada:** el run **#22 de `aiw` está `active`** y pide *«un
  repositorio grande con red de pruebas real»*, con la medición como entregable. Es del hilo
  `aiw`.

## 8. Ficheros que la cabina no puede borrar

- `_backups/roadmap-cantu-quizzes-latex-ANTES-O4-O5-20260806-1305.json` — respaldo del ritual.
- `_scratch/PRUEBA-ARRANQUE-cantu-quizzes-latex.txt` — prueba de capacidad del arranque.
