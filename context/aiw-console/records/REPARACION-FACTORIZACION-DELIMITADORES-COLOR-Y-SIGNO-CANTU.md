# Reparación de «Factorización»: delimitadores, color por paleta y signo — `cantu-studio`, `queue_order` 33

**Proyecto:** cantu-studio (implementación) · aiw-console (motor de roadmap, record)
**Fecha:** 2026-08-06
**Naturaleza:** ejecución del alcance original del run `queue_order` 33 **más** la ampliación que su
`full_description` ya llevaba enmendada bajo `D-061` con fecha 2026-08-06. **Este encargo no enmendó
ningún texto de run:** la enmienda ya estaba escrita en el canónico antes de empezar, y se leyó de ahí.
**Archivos escritos:** ver §10.

---

## 1. Identidad del run, derivada del canónico — NO tecleada

| Campo | Valor derivado del canónico |
|---|---|
| `queue_order` | 33 |
| `run_id` | `RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` |
| `title` | `Audit and implement the Arithmetic component` |
| Objetivo / fase contenedora | `objectives[2]` / `phases[3]`, posición `runs[0]` |
| `status` | `active` (no se toca) |

**El título casa VERBATIM con el criterio del encargo.** La compuerta de parada no se dispara.

**Cifras verificadas en disco, no heredadas del encargo** (punto 6 del encargo, que las declara sin
verificar a propósito):

| Cifra | Valor medido |
|---|---|
| Runs con `queue_order` en el canónico | **73** |
| Rango | **1..73, denso** — sin huecos, sin duplicados |
| Por status | `completed` 33 · `planned` 37 · `active` 3 |
| Runs `active` | **32** «Details», **33** «Arithmetic», **34** «Rule» |

Los tres `active` son exactamente los que el encargo declara en paralelo, y confirman su regla de
no tocar 32 ni 34. **No se declara conjunto elegible ni `ready_next`:** el encargo los excluye
porque cambian con cada apertura y cierre.

---

## 2. Alcance original, veredicto de QA y ampliación — lo que `D-061` exige declarar

**Alcance original del run.** Su `full_description` vigente ordena auditar «Factorización» contra el
contrato de color y paleta y contra el de math/Formula Inserter, partiendo del inventario de
componentes; implementar la integración que falte **allí donde el inventario muestre color local o
codificado en vez de la paleta compartida**; reparar **solo** lo que la auditoría y la QA humana
muestren como defecto real; y verificar por QA visual humana, no por suite automática.

**Qué reveló la QA humana del operador.** El operador pidió, como veredicto escrito de QA, que el
signo de división junto a cada divisor fuera **elegible entre división y multiplicación**, para que
la escalera pueda leerse también como construcción hacia arriba.

**Qué se añadió por la enmienda.** Solo eso: el signo. La enmienda, ya escrita en el canónico con
fecha 2026-08-06, declara además dos mediciones del mismo día: que el símbolo es un literal escrito a
mano dentro de JAME Core, y que el campo `op` del fixture del motor está muerto.

**Por qué no era un run nuevo.** Cumple las cuatro condiciones de `D-061`: (1) lo pidió el operador
por escrito como veredicto de QA; (2) cae sobre la superficie exacta que esa QA ejercitó —la escalera
de divisiones—; (3) no cambia la identidad del run: ni `title`, ni objetivo, ni fase, ni `run_id`, ni
`status` se tocaron; (4) el texto ya estaba enmendado antes de implementar.

**Lo que NO es ampliación, y la enmienda lo dice expresamente:** el defecto de delimitadores y el
cableado de la paleta. **Los dos estaban dentro del alcance original.** El primero es «reparar lo que
la QA muestre como defecto real»; el segundo es literalmente «donde el inventario muestre color
codificado en vez de la paleta compartida», que es este componente.

**Corolario vigilado.** `D-061` para una segunda ampliación y la devuelve al operador. **Este encargo
no amplió por segunda vez.** Todo lo entregado cae dentro de los puntos 1 a 3.

---

## 3. La medición del color, hecha ANTES de escribir una línea

El encargo la exigía como condición previa y con posible parada. Se hizo con sondas ejecutadas contra
el compilador y el motor reales, no leyendo código. **Resultado: no hay que parar.**

### 3(a) Qué roles emite `buildColorRolesOutput` y cuáles llegan a este render

`buildColorRolesOutput` (`compiler.js:162-170`) emite **tres** roles derivados: `surface`, `border` y
`textColor`. Quienes lo llaman añaden aparte el acento como `color`.

**De esos cuatro, a «Factorización» no llegaba NINGUNO.** Medido: la salida compilada del bloque tenía
exactamente las claves `type, mode, title, labels, steps, counts, result` — ni `color`, ni `surface`,
ni `border`, ni `textColor`. Y el renderer no lee ninguna de las cuatro: leía `data.themeColor` y
`data.config`, **que el compilador nunca emitía para este bloque**. El color salía entero de la tabla
fija del motor indexada por el valor del número (`renderArithmetic.js:210`, `:222`).

### 3(b) Si el defecto ya medido —«los roles derivados no llegan al render»— afecta aquí

**NO afecta.** Ese defecto, medido en `rule` y registrado en
`REVALIDACION-COMPONENTE-REGLA-MATEMATICA-CANTU.md` §5 pregunta 7, dice que el compilador emite el
acento **más tres roles derivados** y que `renderRule.js` **solo lee el acento**: los otros tres
viajan y nadie los lee.

Aquí no aplica, y por una razón medida: **«Factorización» solo necesita el acento.** Pinta un color
plano por número —badge del divisor y bolas del factor— y no tiene superficie, borde ni texto que
teñir. El rol que necesita es justamente el único con camino probado de punta a punta.

**La prueba de que ese camino existe es «Diagrama jerárquico», medido en vivo:** guarda un
`#RRGGBB` ya resuelto por nodo, el compilador lo pasa verbatim (`compiler.js:998`), el motor lo lee
(`renderHierarchy.js:23`) y **aparece en el HTML** — comprobado con `#FFE699` y `#B5651D`, los dos
presentes. Ese camino **no pasa por `buildColorRolesOutput`**, y por eso el defecto no lo alcanza.

### 3(c) Cuántos colores necesita el bloque a la vez, y si el control existente cubre el caso

**El encargo suponía «N divisores y M factores con color independiente». Medido, no es exactamente
eso, y la diferencia manda.** El motor indexa **por el VALOR del número**, no por la fila:
`PALETTE[step.div]` y `PALETTE[grp.num]` leen el **mismo** mapa. Consecuencias medidas:

- El divisor `2` de la escalera y las bolas del factor `2` **comparten color y siempre lo han
  compartido**. No son dos ranuras independientes: son una.
- Si tres pasos dividen entre `2`, los tres llevan el mismo color. **No hay color por fila.**
- Lo que el bloque necesita es **un color por número distinto**, hasta 8 pasos y 8 factores por
  esquema. Medido en vivo: **5 colores de autor simultáneos, los 5 presentes en el HTML.**

**¿Cubre el control de «Tabla»? No.** «Tabla» tiene **un** `variant` por bloque entero.

**¿Cubre el de «Diagrama jerárquico»? SÍ.** Es un control **por elemento** (`HierarchyNodeColorField`),
con desplegable de la paleta activa más «Personalizado», y guarda un hex resuelto. Es exactamente la
forma que hace falta, montado una vez por factor.

### 3(d) Por qué NO se paró, y por qué no se tocó el sistema de color compartido

El encargo mandaba parar **si la entrega exigía arreglar antes el sistema de color compartido**.
**No lo exige, y además no hizo falta tocar JAME Core para el color.**

La medición encontró que el motor **ya** fusiona un mapa de color del autor sobre su tabla fija:
`const PALETTE = { ...SYSTEM_PALETTE, ...(USER_CFG.palette || {}) }` (`renderArithmetic.js:28`). Ese
camino existía y estaba sin usar porque el compilador nunca emitía `config`. Comprobado en vivo antes
de escribir nada: emitiendo `config.palette`, los colores del autor llegan al badge del divisor y a
las bolas del factor, y **las claves que el autor no fija caen a los colores de siempre**.

**Por eso el punto 2 se entregó con CERO líneas de JAME Core.** No hay picker que ofrezca colores que
el render ignore: cada color ofrecido se comprobó en el HTML.

---

## 4. Punto 1 — delimitadores

**El defecto, confirmado en disco.** El renderer envuelve **siempre** en `\( ... \)`
(`renderArithmetic.js:230`, `:255`, `:256`) y además parte el resultado por el último `=`
(`:195-201`). El esquema no impedía que el autor escribiera los suyos, así que quedaban delimitadores
dentro de delimitadores, sin ningún mensaje.

**La reparación.** El patrón exacto de `TableRichMathSchema` (`draftSchema.js:377`, `:383`), aplicado
a `result` y a `counts[].math` en **los dos** `draftSchema.js`.

**Una decisión que se declara porque se aparta de la letra del encargo.** El patrón copiado rechaza
`\[` y `\]`, que son los delimitadores que el renderer de «Tabla» agrega. **Este renderer agrega
`\(` y `\)`**, no los de bloque. Copiar el patrón literalmente habría dejado pasar justo el par que
rompe este componente. Se aplicó **la misma forma** —dos `.refine()` con el mismo estilo de
mensaje— **a los dos pares**: el de línea porque es el que este renderer duplica, y el de bloque
porque un `\[ ... \]` dentro de una envoltura `\( ... \)` también rompe la fórmula. Ambos comprobados.

**Además:** los campos «Expresion» de los factores ganan el mismo texto de ayuda que ya tenía
«Resultado final», **carácter por carácter**.

**«Tabla» y «Regla» validan igual que antes.** Verificado con sus cinco suites: **59 pruebas, 0
fallos**. Ninguno de los dos esquemas compartidos cambió fuera del bloque de aritmética.

---

## 5. Punto 3 — signo, y el campo muerto

**Verificado por el taller, como el encargo pedía:** en `src/builders/web/partials/renderArithmetic.js`
**ninguna línea leía `op`**. Cero ocurrencias. El fixture del motor lo lleva en las siete filas
(`src/content/sandbox/test_arithmetic.js:21-27`) y el renderer Web lo ignoraba entero.

**DISCREPANCIA CON EL ENCARGO, declarada.** El encargo dice que el campo «está MUERTO: ninguna línea
del renderer lo lee». **Es cierto del renderer Web, y falso del de Slides.** El renderer de Slides
—`src/builders/slides/components/renderArithmetic.js`, otro archivo— **sí lo lee**, en `:196`, `:231`
y `:237`, y lo usa como glifo literal por fila. **No se tocó**: es otro archivo de Core y la
condición de parada sigue en pie para él. Se declara para que nadie lea «el campo `op` está muerto»
como un hecho global del motor.

**Lo entregado.** Una opción **por bloque**, no por fila, como se pidió. Recorrido completo: los dos
esquemas (conjunto cerrado `division` | `multiplication`), el control en el editor, la validación y
emisión en el compilador, y el consumo en el renderer.

**El campo muerto NO se resucitó.** Es deliberado y está cubierto por prueba: un `op` por fila se
rechaza. El campo por fila del fixture de Slides sigue siendo suyo.

### 5.1 El único cambio en JAME Core, y por qué cabe en el levantamiento

Se tocó **un solo archivo de Core**, `renderArithmetic.js`, y **solo el símbolo**: se sustituyó el
literal `÷` por una constante de dos valores con respaldo en división. Cuatro líneas dentro del bloque
`factorization`. **`mode: 'matrix'` no se tocó.** Ningún otro archivo de Core se modificó.

---

## 6. Punto 4 — retrocompatibilidad, verificada y no afirmada

**La pregunta que el encargo obliga a responder con esas palabras:** *¿qué ocurre con un borrador que
hoy lleve delimitadores en `result`?*

**Respuesta medida: en disco no hay ninguno, así que el rechazo nuevo no rompe nada al cargar.**

Barrido de **137 archivos JSON** bajo `src/content/author_lite/drafts`, `QA/`, `src/content/sandbox`
y `tools/`:

| Medición | Valor |
|---|---|
| Bloques `arithmetic` en disco | **7** |
| De ellos, en borradores guardados de autor (`src/content/author_lite/drafts`) | **0** |
| De ellos, artefactos de evidencia de QA (`QA/temp/`, 3 paquetes) | **7** |
| Bloques cuyo `result` lleva delimitadores | **0** |
| Bloques cuyo `counts[].math` lleva delimitadores | **0** |

Los siete llevan el mismo `result`: `360 = 2^3 \times 3^2 \times 5`. **No lleva delimitadores** —las
barras invertidas que se ven son de `\times`, no de `\(`. Ese valor exacto **sigue validando** tras el
cambio, comprobado.

**Si algún día apareciera un borrador con delimitadores en `result`, el rechazo nuevo lo dejaría sin
cargar hasta que el autor los quitara.** Se dice con esas palabras, como el encargo exige. Hoy ese
caso no existe en disco.

Y las dos capacidades nuevas son **opcionales y omitibles**: un bloque sin `op` y sin `color` compila
con **exactamente las mismas siete claves de antes** —`type, mode, title, labels, steps, counts,
result`— y pinta ÷ con el azul, el verde y el morado de siempre. Cubierto por prueba dedicada.

---

## 7. Verificación

| Qué | Resultado |
|---|---|
| Suite completa `compiler-api` | **405 pruebas, 0 fallos** (línea base antes de tocar: 398) |
| Pruebas nuevas de este run | **7**, en `webArithmeticFactorizationSafety.test.mjs` |
| Regresión dirigida de «Tabla» y «Regla» | **59 pruebas, 0 fallos** |
| `npm run lint` (editor-ui) | limpio |
| `npm run build` (editor-ui) | correcto (el aviso de tamaño de chunk es previo y ajeno) |
| Citas de código del packet auditadas contra disco | **35 de 35 cuadran** |

**Una prueba ajena se ajustó, y se declara.** `webSharedColorSelectorUnification.test.mjs` contaba
los montajes de `HierarchyNodeColorField` **en todo el archivo** y exigía exactamente 2. Al compartir
el control, ahora hay 3. **No se subió el número a 3**: se acotó el recuento **al interior de
`HierarchyFields`**, que es lo que la prueba dice comprobar por su propio mensaje —«the root node and
the child nodes both get the control»—. Así sigue guardando lo suyo y no vuelve a romperse cada vez
que otro componente adopte el control compartido.

**Lo que NO se verificó, y por qué.** No hay QA visual: el run la exige y **es del operador**. Este
record no la sustituye. El packet reescrito es el instrumento para hacerla.

---

## 8. Fronteras respetadas

- **No se ejecutó git** en ninguna forma.
- **No se cambió el status de ningún run** ni se re-emitió `.project/`. `#33` sigue `active`; lo cierra
  la cabina.
- **No se insertaron, movieron ni renumeraron runs.** El canónico solo se **leyó**.
- **No se tocó «Nota desplegable» (32) ni «Regla matemática» (34).** Verificado: `DetailsFields`,
  `RuleMathField`, `RuleMathControl`, `WebDetailsSchema` y `WebRuleSchema` están intactos. Los dos
  esquemas compartidos se tocaron **solo** dentro del bloque de aritmética.
- **No se arregló el sistema de color compartido.** No hizo falta (§3d) y sigue siendo run propio.
- **No se amplió el alcance** más allá de los puntos 1 a 3.
- **JAME Core:** un solo archivo, solo el símbolo (§5.1). El renderer de Slides se midió y **no se
  tocó**.

---

## 9. Deuda declarada, para que no quede sin dueño

1. **El control compartido se sigue llamando `HierarchyNodeColorField`** aunque ya lo usen dos
   componentes. Renombrar exige aprobación y no se hizo. Es cosmético.
2. **El color es por número, no por fila** (§3c). Un color por fila exigiría cambiar el motor más allá
   de lo autorizado aquí. Declarado en el packet como límite querido, no como fallo.
3. **Un divisor sin factor correspondiente no se puede colorear.** El control vive en los factores.
4. **La cabecera y la caja del resultado siguen con el azul del motor.** Nadie las pidió.
5. **`TimelineFields` es ahora el único componente del despacho por `kind` que no recibe
   `colorPalette`.** Antes eran dos. No es de este run.

---

## 10. Archivos escritos

**cantu-studio**

| Archivo | Qué |
|---|---|
| `tools/author-lite/editor-ui/src/schemas/draftSchema.js` | rechazo de delimitadores, `color` por factor, `op` por bloque |
| `tools/author-lite/compiler-api/schemas/draftSchema.js` | lo mismo, en paridad |
| `tools/author-lite/editor-ui/src/features/editor/components/web/WebBlockEditor.jsx` | control «Operacion», control «Color» por factor, ayuda en «Expresion», paso de `colorPalette` |
| `tools/author-lite/editor-ui/src/features/editor/utils/blockFactory.js` | `op: 'division'` explícito en el bloque de fábrica |
| `tools/author-lite/compiler-api/services/compiler.js` | emisión de `config.palette` y de `op`, validaciones (solo ruta de arithmetic) |
| `src/builders/web/partials/renderArithmetic.js` | **JAME Core** — solo el símbolo |
| `tools/author-lite/compiler-api/tests/webArithmeticFactorizationSafety.test.mjs` | 7 pruebas nuevas |
| `tools/author-lite/compiler-api/tests/webSharedColorSelectorUnification.test.mjs` | recuento acotado a `HierarchyFields` (§7) |
| `docs/_historical_run_record/RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001-OPERATOR-QA-PACKET.md` | reescrito entero contra el componente reparado |

**aiw-console**

| Archivo | Qué |
|---|---|
| `context/aiw-console/records/REPARACION-FACTORIZACION-DELIMITADORES-COLOR-Y-SIGNO-CANTU.md` | este record |

**El canónico de roadmap no se escribió.** Solo se leyó.

---

## 11. Estado en que queda el run

`#33` queda **`active`**, con los tres puntos entregados y verificados por prueba automática, **a la
espera de la QA visual humana** que su `full_description` exige y que este taller no ejecuta. El
packet reescrito es lo que el operador tiene que correr. **Lo cierra la cabina**, no este encargo.
