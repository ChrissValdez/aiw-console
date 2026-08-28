# `#60` `RUN-CONSOLE-REPORT-ENVELOPE-RENDER-001` — la QA del operador y el cierre

**Ejecutada y cerrada el 2026-08-27.** El run llevaba `active` **doce días**: se entregó y
commiteó el 2026-08-15 (`6aee60a`) y su QA esperaba desde entonces al ojo del operador.

**Las palabras del operador van VERBATIM.** Lo que midió la cabina va aparte y marcado.

---

## 1. EL VEREDICTO

**Trece pasos, trece aprobados.** El operador **no firmó la palabra «aprobado»**; dio la QA
por confirmada y pidió seguir. **Se transcribe lo que dijo, no lo que convendría que hubiera
dicho:**

> «entonces ya quedo confirmado el QA? podemos seguir con el siugiente run ?»

### Parte A — el proyecto de ejemplo `reports-qa`, servido con `PC_REGISTRY`

| paso | qué se miró | veredicto |
|---|---|---|
| A1 | un reporte sin bloque de resumen **pinta la ausencia** | **Pass** |
| A2 | la cobertura **por presencia** | **Pass** *(ver §3: la expectativa de la cabina era falsa)* |
| A3 | el reporte ilegible **abre y declara su error** | **Pass** |
| A4 | carpeta registrada **sin reporte dentro** | **Pass** |
| A5 | ausencia que **nombra el fichero del que se midió** | **Pass** |

Verbatim del operador: **«el resto de los A todos pass»**.

### Parte B — el reporte real del piloto de Fracciones

| paso | qué se miró | veredicto |
|---|---|---|
| B1 | las tres respuestas del resumen, **verbatim** | **Pass** |
| B2 | la franja derivada separada · **11 pasos que piden veredicto** | **Pass** |
| B3 | los tres cajones de la D-067 · **13 cumplidos** | **Pass** |
| B4 | **`QZ-C-DISTR` TACHADO** con «también citado…» | **Pass** |
| B5 | las **tres** citas de cabecera con su `where` y su evidencia | **Pass** |
| B6 | las cifras del perfil · **`—` y nunca la palabra `null`** | **Pass** |
| B7 | el ítem `Facil-012` **declara que no cita ningún criterio** | **Pass** |
| B8 | el idioma cambia **los rótulos y no la prosa del emisor** | **Pass** |

**B3-B6 se verificaron sobre el volcado que el operador pegó de la sección entera**, no sobre
su palabra: los tres cajones, el `13`, el tachado con su frase, las tres citas con `counts`,
`counts_note` y `profile_data.position_refs_fixed`, y `count —` donde la cifra va nula.

**B7, verbatim:**

> «Criterios que cita / No cita ningún criterio / criterio inventado por el taller: «dos
> opciones con el mismo valor». NO tiene id en el perfil porque la rubrica no lo contiene. Si
> el operador lo adopta en D1, la v3 le dara un QZ-C-* y este satisfies dejara de estar vacio.»

---

## 2. TRES HALLAZGOS QUE NO SON DEFECTOS DE ESTE RUN

Van al `#67` con las palabras del operador, en
`context/aiw-console/records/HALLAZGOS-67-SUPERFICIE-DEL-REPORTE.md`.

1. **El resumen del emisor queda enterrado** detrás de todos los pasos del índice.
2. **La sección de cobertura es correcta e ilegible** — *«si es info para el AI está bien,
   pero si es para mi juicio está muy denso»*. **Es el hallazgo del día:** una pantalla que
   **aprobó los cuatro pasos que la miden y aun así no sirve para lo que existe**. Sólo lo
   encuentra el ojo del operador.
3. **Los ids internos que la cobertura usa como evidencia no aparecen en ninguna pantalla.**

**Ninguno es defecto del `#60`:** los tres son anteriores a él o de alcance mayor. Se declara
para que el cierre no los absorba en silencio.

---

## 3. DOS EXPECTATIVAS FALSAS DE LA CABINA, CORREGIDAS DELANTE DEL OPERADOR

**Se publican igual de fuerte que se publicaron los errores.**

1. **«El A2 no debe pintar cobertura».** Falso. La cabina sondeó la clave `profile_data`
   cuando **la sección la convoca `profile`**. El reporte de ejemplo trae
   `profile: cantu-studio/definition-of-done@1`. **A2 era Pass desde el principio, y la
   pantalla enseñaba MÁS de lo que la cabina prometía**: «Cumplidos y declarados: ninguno» sin
   fingir un cero.

2. **«Busca el ítem `C1`».** `C1` **no aparece en ninguna pantalla**: el índice nombra los
   ítems por su pregunta —`Facil-012`—. La cabina incumplió la regla de nombrar las cosas como
   el operador las ve. De ahí salió el hallazgo 3.

**Y una tercera, de método, dentro del propio cierre:** la cabina corrió
`tools/project-console/validate-project-console-state.mjs` como si fuera la guarda de este
repo. **No lo es** — valida un layout `.aiw/` que este repo no usa, y su salida iba canalizada
a `tail`, así que el `EXIT=0` era del `tail` y no del validador. **No se publicó ese verde.**
Las cifras del §4 salen de los artefactos que el proyector emitió.

---

## 4. EL CIERRE — evidencia

    motor:            tools/roadmap/roadmap-plan.mjs → roadmap-core.mjs (2 479 líneas, el de este repo)
    vía de escritura: POST /projects/aiw-console/__project-console/roadmap/edit (no hay CLI en este repo)
    op:               set-status · run RUN-CONSOLE-REPORT-ENVELOPE-RENDER-001 · active → completed
    guarda de título: derivada del canónico por queue_order 60, verificada antes de tocar nada
    respaldo:         _backups/roadmap-aiw-console-ANTES-cierre-60-20260827.json (md5 idéntico al original)
    dry-run:          ok · remap: [] · sin warnings · baseline sha256:ec4c31d9…
    md5 canónico:     antes 216921399eeea31105ef3e90438f162a  →  después 83af46fb8a16726b80c18c2b967c6d55
    verificación:     67 runs antes y después · mismos ids · queue_order intacto
                      CAMPOS CAMBIADOS: exactamente dos, y los dos del #60 — status y closeout_result
    .project/:        re-emitido por serve.mjs en el mismo acto · 7 ficheros · layout repo_root
    derivadas:        completed 60 · planned 7 · activos NINGUNO
    proyector:        current_status_summary = «No active run; 60 of 67 runs completed.»
                      validation_summary: unclassified_live_runs = 0
    index.lock:       ninguno, antes y después

**Lo que NO se regeneró, y se declara:** `project-console/projects.digest.json`. Su generador
excedió el tiempo y **no forma parte de la evidencia de este cierre**; queda con su fecha
anterior.

---

## 5. UNA REGLA DE OPERACIÓN QUE FIJÓ EL OPERADOR

Verbatim, 2026-08-27:

> «siempre que quieras que abra esa superficie me vas a tener que dar esos comandos, siempre
> dame ese comando cuando quieras que lo abra para QA. Cuando es la consola normal solo puedes
> pedirme que abra Start console y yo lo abro.»

**Vale para toda sesión futura:** superficie de fixtures → la cabina entrega las tres líneas
con `PC_REGISTRY` y `PC_PORT`; consola normal → basta con nombrar `start-console.cmd`.
