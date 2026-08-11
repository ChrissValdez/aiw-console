# HANDOFF — hilo `cantu-studio` (el proyecto)

> Escrito por la cabina el **2026-08-11**, al cerrar la sesión que llevó `#32` → `#47`.
> Sustituye al relevo del 2026-08-08. Todo lo de aquí está **medido**, no recordado, y
> lleva su fecha. **Las cifras de este documento son mediciones fechadas: contrástalas
> contra el canónico al abrir. Gana el disco.**

---

## ⚠ LO PRIMERO: DERIVA LA RUTA Y PRUEBA LA CAPACIDAD

La ruta de montaje **cambia entre sesiones**. No la heredes de aquí. Deriva, prueba que se
lee el workspace, que el validador corre y que `git log` responde en los cuatro repos.
**Si algo falla, declara modo ESPEJO.**

**Y dos trampas que costaron tiempo esta sesión:**

1. **Todo comando de git lleva `--no-optional-locks` Y un `timeout` explícito.** Un comando
   que muere por timeout deja un `.git/index.lock` huérfano que **bloquea los commits del
   operador**. Pasó dos veces. Si aparece, se borra —la cabina tiene permiso de borrado en
   este workspace— antes de seguir.
2. **`dist/` está RASTREADO, no ignorado.** Un barrido con `require()` sobre `.js` del repo
   ejecuta scripts y regenera **44 salidas rastreadas**. Pasó una vez y la cabina tuvo que
   revertirlas antes del commit. **Todo ticket lleva la prohibición.**

---

## QUÉ SIGUE — lo primero al abrir

**No hay ningún run `active`.** La cola quedó quieta a propósito.

`history=55` · **81 runs** · `ready_next=5` · canónico `33116521` al cerrar.

**El siguiente por la cola es `#55` «Retire the Component Guide from every surface»**, que
el operador decidió el 2026-08-11 y que **sustituye a dos runs retirados**.

**Tres decisiones del operador siguen ABIERTAS y las he pedido siete veces sin respuesta.
No las repitas como pregunta suelta: llévalas dentro del primer ticket que las toque.**

1. **El contenido de Core que cambió de aspecto** como consecuencia directa de órdenes
   suyas correctas, en `src/content/sandbox/test_math_walkthrough.js`: **tres tarjetas**
   perdieron el naranja al morir la regla de prosa, y **doce detalles** perdieron su icono
   `info` porque ahora la ausencia significa «ninguno». **Se arregla escribiendo el valor
   en el contenido, no tocando código.**
2. **El lote de familia** — ya no hace falta pedirlo: **es el run `#56`**, que lo posee.
3. **T-11**: el compilador **acepta** varios tipos dentro de columnas que el esquema
   rechaza y `renderColumns` no tiene `case`, así que caerían al `default` y **escupirían
   JSON en la lección**. **Siete tipos afectados.** Vive en `#56`.

---

## 1. Lo que hizo esta sesión

**Dieciséis runs cerrados o retirados.** La columna vertebral fue **la serie de cinco
componentes**, que terminó y **cerró un censo**:

| Componente | run | rondas |
|---|---|---|
| «Explicación guiada» (`split`) | `#40` | 11 |
| «Espaciador» (nuevo) | `#41` | 1 |
| El botón del campo de fórmula | `#42` | 4 |
| «Tabla» | `#43` | 2 |
| «Anatomía de fórmula» (antes «Comparador de conceptos») | `#44` | 5 |
| Un concepto = un bloque | `#45` | 2 |
| «Diagrama jerárquico» | `#46` | 5 |
| «Secuencia de pasos» | `#47` | 4 |

### El censo de familia — **lo más valioso que produjo la serie**

| Deuda | En cuántos de los 5 |
|---|---|
| Sin guarda de HTML/SVG propia | **5 / 5** |
| Contraste bajo AA | **5 / 5** |
| Margen de raíz fuera de ritmo | **5 / 5** |
| Recorte cuando el contenido no cabe | 4 / 5 |
| Margen no neutralizado en columna | 3 / 5 |
| `overflow-wrap` | 3 / 5 |
| **Insignia propia** | **2 / 5 — EXCLUIDA del lote** |

**Roles de color leídos, en orden de auditoría: 1 · 2 · 2 · 1 · 0.** El compilador emite
cinco por componente. **«Secuencia de pasos» lee cero**, con 60 declaraciones de color y 57
cableadas.

**Y la causa compartida del 3/5:** `renderColumns` inyecta una regla que pretende
neutralizar los márgenes de los hijos, pero **su selector alcanza solo a su propio
`.j-column-stack`** y por tanto **nunca alcanza a ningún raíz** en lecciones compiladas por
el editor. Lleva así toda la vida del fichero y **las lecciones publicadas se ven con ese
espacio**, así que repararlo cambia maquetas existentes. **Es de `#56`.**

---

## 2. El cambio de roadmap del 2026-08-11

**Siete runs retirados**, con la regla del proyecto: **no se borran**. Pasan a `completed`
con `closeout_result` declarado y **conservan su `queue_order`; nadie se desplazó**.

| retirados | por qué | heredero |
|---|---|---|
| `#48`, `#49` | La Guía de componentes es más mantenimiento que valor | `#55` |
| `#50`–`#53` | Cuatro lotes de verificación de packets partidos por grupo producían veredictos incomparables | `#56` |
| `#54` | La auditoría general se funde con ellos | `#56` |

**Las cinco aristas que apuntaban a `#54` se recolgaron de `#56`**, no se borraron: `#58`,
`#66`, `#68`, `#73` y `#78`.

**La razón del operador para retirar la Guía, textual:** *es más mantenimiento ese botón*.
Y hay evidencia medida que la sostiene: la Guía ya fue cazada **contradiciendo a los
controles entregados** en «Diagrama jerárquico» —negaba la profundidad y el color crudo, y
después describía un estado «sin color» que el control ya no ofrece—. **Cada una era cierta
cuando se escribió y se pudrió después.** Ese es el modo de fallo que se retira.

---

## 3. Cómo trabaja este operador — lo que costó aprender

- **Decide mirando el resultado, no leyendo la descripción.** Los runs largos de esta
  sesión no crecieron por mal alcance sino por veredictos sucesivos suyos sobre lo
  renderizado. **Eso es el sistema funcionando**, y el `full_description` se enmienda al
  cerrar para que el roadmap no afirme algo falso.
- **Odia las notas de ayuda pequeñas en el panel.** Textual: *envejecen rápido y hacen
  ruido visual*. **Se han retirado en cuatro componentes. Quítalas por defecto**, y
  distingue nota de **mensaje de validación**, que sí se queda.
- **Rechaza los modos automáticos derivados del color** —el icono de «Nota desplegable» fue
  el primero, el de «Tabla» el segundo—. Si no elige, no aparece.
- **Quiere que el desplegable solo ofrezca cosas elegibles.** Un valor fuera de la lista
  **es** «Personalizado»; nada de entradas informativas.
- **Pide el comando de borrado**, no que borre a mano: *«muy comúnmente no lo haré»*.
- **Contesta en prosa y salta preguntas.** Si una decisión no llega en dos vueltas, **tómala
  con la recomendación escrita y decláralo como reversible**. Funcionó con «Explicación
  guiada», con los cuatro tamaños del espaciador y con «Anatomía de fórmula».

---

## 4. Las lecciones caras — todas de la cabina equivocándose

**El taller corrigió a la cabina más de treinta veces esta sesión, siempre con medición.**
Estas son las que se repiten:

1. **Una premisa que funcionó una vez no funciona siempre.** «El dato en disco no cambia»
   valía para los términos de «Anatomía de fórmula» y era **falsa** para el árbol de
   «Diagrama jerárquico»: **43,9 millones de árboles probados, 1,87 % supervivientes**,
   contraejemplo de cuatro nodos.
2. **Copiar una clase de otro componente sin medir su contexto da cero.**
   `calc(24px * var(--local-scale))` habría dado **0 px en silencio** porque ese componente
   no define la variable. Lo ordenó la cabina; lo paró el taller.
3. **Un censo hecho con el grep equivocado es peor que no tenerlo.** «Cero nodos sin color»
   eran **20 de 48**; «24 apariciones» eran **143**; «siete sitios» eran **nueve**.
4. **Una condición de alto se escribe con su RAZÓN.** Dos veces el taller comprobó la razón,
   midió que no se cumplía, y entregó — y acertó las dos.
5. **Retirar un campo puede disolver varios defectos a la vez.** «Tipo de detalle» mató
   cuatro hallazgos. **Antes de reparar N defectos, pregunta si comparten causa.**

---

## 5. Punteros

- **Canónico:** `projects/cantu-studio/.aiw/roadmap/roadmap.json` — CRLF, `33116521`.
- **Validador:** `node tools/project-console/validate-project-console-state.mjs`
- **Suite:** `node --test "tests/*.test.mjs"` desde `tools/author-lite/compiler-api` —
  **634 al cerrar**. *(El `full_description` de varios runs afirma que este repo NO tiene
  test runner: es **falso**, medido cuatro veces.)*
- **Records y packets:** `projects/cantu-studio/docs/_historical_run_record/`
- **`tools/roadmap/tests`**: **cuatro fallos preexistentes**, más `C5 [SENTINEL]`, que
  **falla siempre que hay un run abierto** porque afirma que el canónico no tiene ninguno.
  No es un defecto nuestro; es la premisa del candado.
- **El insertor Σ sobre `<textarea>`** de «Diagrama jerárquico» se cerró **sin que ninguna
  mano humana lo tocara**, cuatro rondas seguidas. **Pídelo en la primera QA que pase cerca.**
