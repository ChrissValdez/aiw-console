# Reparación: el `=` fuera del recuadro y el nombre del operando

> Proyecto: `cantu-studio` | Run: `RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001` (`queue_order` 33)
> Fecha: 2026-08-06 | Tercera vuelta del mismo run | Status del run: **sigue `active`**, no lo cambia este taller

---

## 0. Guarda de título

El encargo exige abortar si el canónico no cuadra. Medido en
`projects/cantu-studio/.aiw/roadmap/roadmap.json`:

| `queue_order` | Título en el canónico | Status |
|---|---|---|
| 32 | `Audit and implement the Details component` | `active` |
| **33** | **`Audit and implement the Arithmetic component`** | **`active`** |
| 34 | `Audit and implement the Rule component` | `active` |

**Cuadra.** El 32 es «Nota desplegable» y el 34 «Regla matemática», los dos `active` en paralelo y
ninguno tocado aquí. Se continúa.

---

## 1. Por qué esto son DEFECTOS y no ampliación

**Ésta es la afirmación central del record y se sostiene con fechas, no con opinión.**

El `full_description` de este run lleva **dos enmiendas fechadas 2026-08-06**, y las dos están
transcritas en el canónico. Lo que se repara hoy es **lo que esas dos enmiendas construyeron**:

| Defecto | Qué lo construyó | Cuándo | Por qué es defecto y no alcance nuevo |
|---|---|---|---|
| **El `=` salía dentro del recuadro** | La **SEGUNDA enmienda**: «he asked to choose whether the box sits after the equals sign, before it, or on both sides» | Vuelta anterior, 2026-08-06 | La enmienda autorizó **mover el recuadro**. Al moverlo a la izquierda se descubrió que el `=` viajaba **dentro** de él. La colocación `before` **nunca funcionó bien**: se entregó encerrando un separador. No hay capacidad nueva aquí — el desplegable, sus cuatro valores y su recorrido hasta el motor ya existen y no se tocan |
| **Seis superficies decían «divisor» en multiplicación** | La **PRIMERA enmienda**: «the sign shown beside each divisor be selectable between division and multiplication» | Vuelta anterior a ésa, 2026-08-06 | La enmienda autorizó **la operación por bloque**. Se cambió el glifo de la escalera y **se dejaron sin cambiar las etiquetas que lo nombran**. El bloque quedó diciéndole al autor «Divisor» mientras pintaba `×`. No hay capacidad nueva — `op` ya existe, ya está en los dos esquemas, ya lo emite el compilador y ya lo lee el motor |

**El criterio, dicho sin rodeos:** una ampliación añade algo que el run no contrataba. Aquí no se
añade ni un campo, ni una opción, ni un valor de enum, ni una clave compilada. **Se hace que
funcione y que no mienta lo que las dos enmiendas ya autorizaron.** Un desplegable que encierra el
separador y una etiqueta que nombra la operación equivocada son fallos de la entrega, no huecos del
alcance.

**No se ha enmendado el `full_description`, y al trabajar no ha hecho falta.** El encargo pedía
parar y reportar si concluíamos que sí hacía falta; no es el caso. Ni un campo nuevo, ni una
superficie nueva, ni una decisión que el texto del run no cubra ya.

**El punto de corte del resultado NO se ha hecho configurable.** Sigue siendo el último `=`, y está
fijado con prueba. Eso sí habría sido una tercera ampliación, y está expresamente prohibido.

---

## 2. Cifras del encargo, verificadas — el encargo las daba SIN VERIFICAR a propósito

### 2.1 Las seis citas de línea del punto 2

| Lo que decía el encargo | Medido en disco ANTES de tocar nada | Veredicto |
|---|---|---|
| `WebBlockEditor.jsx:3185` — etiqueta del campo | `3185`, `Divisor` | ✅ **exacta** |
| `WebBlockEditor.jsx:3210` — ayuda de «Pasos» | `3210`, `El ultimo paso puede omitir divisor.` | ✅ **exacta** |
| `WebBlockEditor.jsx:3343` — ayuda del color de factor | `3343`, `…tambien el divisor de ese mismo numero` | ✅ **exacta** |
| `WebBlockEditor.jsx:3390` — ayuda de «Operacion» | `3390`, `Signo que acompana a cada divisor.` | ✅ **exacta** |
| `blockCatalog.js:667` — documentación del bloque | `667`, `…con valor y divisor opcional.` | ✅ **exacta** |
| «los **dos** `draftSchema.js:421`» | `editor-ui/src/schemas/draftSchema.js:` **421** ✅ · `compiler-api/schemas/draftSchema.js:` **424** ❌ | ⚠️ **una de las dos falla** |

**La cifra falsa:** el encargo da **421** para los dos esquemas. El de `editor-ui` está en 421; el
de `compiler-api` está en **424**, tres líneas más abajo. Los dos ficheros son espejos pero **no
están alineados línea a línea**: `compiler-api` lleva tres líneas de más antes de ese punto. El
texto de los dos mensajes sí era idéntico, palabra por palabra.

### 2.2 ¿Son seis superficies, o más, o menos?

**Son exactamente seis, y se ha buscado en todo el repo, no sólo donde el encargo apuntaba.**
Barrido de `divisor` sin distinguir mayúsculas sobre `*.js`, `*.jsx` y `*.mjs`, fuera de
`node_modules` y `dist`. Lo que apareció **además** de las seis, y por qué **no** es superficie:

| Otras apariciones | Qué son | ¿Superficie? |
|---|---|---|
| `compiler-api/services/compiler.js:758` | **comentario de código** que explica el mapa de color | ❌ no lo ve ningún autor |
| `tests/webArithmeticResultBoxAndThemeColor.test.mjs:425-427` | mensajes de aserción de pruebas | ❌ internos |
| `tests/webArithmeticFactorizationSafety.test.mjs:435` | comentario de una prueba | ❌ interno |
| `src/content/staging/…/L03_S01…js:261`, `src/content/sandbox/test_theory_complex.js:33,36,37` | **contenido de lecciones reales sobre división** | ❌ ahí «divisor» es lo correcto |
| El packet de QA | documento del operador | ➡️ tratado aparte, en el punto 7 |

**Ninguna de más y ninguna de menos: seis.** Se confirma la cifra del encargo.

### 2.3 Los seis términos del guardrail (`blockCatalog.js:677`)

El encargo pedía verificar **cada uno** contra disco antes de tocar, y decir cuáles eran ciertos.
Medido ejecutando el esquema y el compilador de verdad, no leyendo el código:

| Término | ¿Lo acepta el esquema como entrada del autor? | ¿Lo emite el compilador al motor? | Veredicto |
|---|---|---|---|
| `config` | ❌ rechazado (`Unrecognized key`) | ✅ **SÍ**: `config: { palette: { … } }` | **FALSO** |
| `states` | ❌ rechazado | ❌ no | **cierto** |
| `desc` | ❌ rechazado | ❌ no | **cierto** |
| `themeColor` | ✅ **SÍ**, campo contratado `#RRGGBB` | ✅ **SÍ** | **FALSO** |
| `style` | ❌ rechazado | ❌ no | **cierto** |
| `className` | ❌ rechazado | ❌ no | **cierto** |

**Cuatro de los seis eran ciertos. Dos eran falsos, y el encargo acertaba en los dos y en su
fecha:** `config` desde la primera vuelta —que fue la que cableó la paleta y empezó a emitir
`config.palette`, según su propio record— y `themeColor` desde la segunda.

**Hay una ambigüedad en `config` que conviene dejar dicha, porque la decisión no es obvia.** El
término es verdadero si el guardrail habla de **lo que el autor puede escribir** (no puede escribir
`config`) y falso si habla de **lo que el bloque lleva** (lleva `config.palette`). Se resolvió por
lo segundo, por dos razones: los otros cinco términos de esa misma línea se leen así, y el color
por factor —que es una elección visible del autor— **viaja precisamente dentro de `config`**.
Mantener «No config» sería decirle al autor que el bloque no lleva algo que sí lleva y que además
él mismo controla.

**Corrección aplicada, y sólo ésa:** la línea pasa de
`'No config, states, desc, themeColor, style ni className.'` a
`'No states, desc, style ni className.'`
**No se añadió ninguna afirmación nueva.** El encargo pedía corregir sólo lo falso, y retirar los
dos términos falsos es exactamente eso. Los cuatro que quedan siguen fijados con prueba.

---

## 3. Punto 1 — el `=` sale de todos los recuadros

### 3.1 Lo medido

`parseResult` devolvía `pre = text.substring(0, lastEqIndex + 1).trim()`. **El `+1` mete el `=`
dentro de `pre`.** Con `after` no se notaba porque `pre` se pinta en texto plano; con `before` y con
`both` el `=` quedaba **dentro del recuadro**.

### 3.2 Lo hecho

El resultado se parte en **TRES**: `lead` (lo que precede al último `=`), `eq` (el `=`), `val` (lo
que le sigue). **`pre` se conserva intacto**, con su `=` dentro, por dos motivos que se explican
solos:

1. es lo que lee el **pie de `matrix`**, que este encargo prohíbe tocar;
2. es lo que hace que **`after` no cambie ni un carácter**.

**La regla del pie, en una frase:** el `=` nunca entra en un recuadro. Cuando la mitad izquierda va
en **texto plano**, no hay recuadro del que sacarlo y el `=` se queda **en ese mismo span de
siempre**. Cuando la mitad izquierda va **en recuadro**, el recuadro se queda sólo con `lead` y el
`=` sale a **su propio span de texto plano**, con el mismo estilo.

**Esa unión en `after` y `none` no es un atajo: la impone el propio encargo.** Emitir tres spans
siempre haría que `after` pasara de dos `<span>` a tres, y el encargo exige que `after` quede
**byte a byte igual**. Las dos exigencias juntas —«el `=` fuera de todo recuadro» y «`after` no
cambia»— dan exactamente esta regla y ninguna otra.

### 3.3 Las cuatro opciones, verificadas las cuatro

| Opción | Izquierda | `=` | Derecha | ¿Cambió la salida? |
|---|---|---|---|---|
| `after` | plana | **plano** | recuadro | **NO, ni un carácter** |
| `before` | **recuadro** | **plano, fuera** | plana | sí, es la reparación |
| `both` | **recuadro** | **plano, fuera** | recuadro | sí, es la reparación |
| `none` | plana | plano | plana | **NO, ni un carácter** |

### 3.4 `after` byte a byte — comparado, no afirmado

Se capturó la salida HTML del renderer **antes** de tocar nada sobre una malla de **160 casos**: 2
modos (`factorization`, `matrix`) × 5 valores de `resultBox` (ausente, `after`, `before`, `both`,
`none`) × 8 formas de resultado × 2 de `themeColor`. Se volvió a generar **después** y se comparó
carácter a carácter.

| Grupo | Casos que cambian |
|---|---|
| `factorization` / **`after`** (y con el campo ausente) | **0** |
| `factorization` / **`none`** | **0** |
| **`matrix`** (los 40 casos) | **0** |
| `factorization` / `before` | 12 — **sólo los que llevan `=`** |
| `factorization` / `both` | 12 — **sólo los que llevan `=`** |
| **Total** | **24 de 160** |

**Declarado:** `after` no cambió ni un carácter, con `=`, sin `=`, con varios `=`, con y sin color
de bloque. Queda fijado con una prueba que reconstruye el HTML esperado **con la forma literal que
el renderer emitía antes de esta vuelta** y lo compara entero, no por trozos.

### 3.5 Un resultado SIN `=` — qué hace cada una de las cuatro

Sin `=`, `parseResult` deja la izquierda vacía y **todo el texto en `val`**. Es la conducta de
siempre y **no se ha tocado**. `eq` queda vacío y **no se emite ningún span**: no se pinta un `=`
que no existe.

| Opción | Qué hace | ¿Rompe? |
|---|---|---|
| `after` | todo el texto en recuadro; izquierda vacía en plano | no |
| `before` | **recuadro vacío** a la izquierda; el texto en plano | no |
| `both` | **recuadro vacío** a la izquierda y el texto en recuadro | no |
| `none` | todo en plano | no |

**Las cuatro emiten dos spans, nunca tres**, y en ninguna aparece un `=`. El recuadro vacío es
conducta **anterior** a este encargo, ya declarada como límite 5 del packet, y sigue igual.

### 3.6 Varios `=` — la regla no cambia, y se declara

**El corte sigue siendo el ÚLTIMO `=`.** Los `=` anteriores son **contenido del autor** y viajan
**dentro de la mitad izquierda**, encuadrada o no. Con `a = b = c` y `before`, el recuadro lleva
`a = b` —con el primer `=` **dentro**— y sólo el último `=` sale fuera. **Sólo el `=` del corte es
separador.** Fijado con prueba, en las cuatro colocaciones.

---

## 4. Punto 2 — ninguna superficie llama «divisor» a un multiplicador

**Los dos casos se resolvieron distinto, como el encargo pedía, y por razones distintas.**

### 4.1 (a) Etiquetas y ayudas del editor → SIGUEN a la operación

**No hizo falta reestructurar nada, así que no hubo que parar.** El valor de «Operacion» ya está en
el formulario; se lee con `useWatch`, que es **el mismo patrón que este archivo ya usa** para «Dos
columnas». Se baja el nombre resuelto a las dos listas por prop. Coste: un mapa cerrado de dos
entradas, un resolvedor de una línea y tres props.

| Superficie | Antes | Ahora | Línea nueva |
|---|---|---|---|
| Etiqueta del segundo campo del paso | `Divisor` | `{operandNoun.label}` | `WebBlockEditor.jsx:3196` |
| Ayuda de «Pasos» | `…puede omitir divisor.` | `…puede omitir {operandNoun.lower}.` | `:3221` |
| Ayuda del color de factor | `…el divisor de ese mismo numero` | `…el {operandNoun.lower} de ese mismo numero` | `:3354` |
| Ayuda de «Operacion» | `Signo que acompana a cada divisor.` | `Signo que acompana a cada {operandNoun.lower}.` | `:3407` |

**Ausente == división**, igual que en el motor, en los dos esquemas y en el compilador: un borrador
guardado sin `op` sigue viendo «Divisor». El mapa está en `:3124-3130`.

### 4.2 (b) Mensajes del esquema → NEUTRALES, no dinámicos

Los dos mensajes pasan a `"El divisor o multiplicador debe ser entero"` y
`"El divisor o multiplicador debe ser mayor que cero"`, **en los dos esquemas**.

**Por qué neutrales y no dinámicos, dicho como lo dice el encargo:** el esquema valida un **campo
suelto** de un paso y no tiene por qué conocer la operación del bloque. Hacerlo dinámico exigiría
que `ArithmeticFactorizationStepSchema` mirase hacia arriba, al bloque, **por una cadena de
texto** — acoplamiento caro y frágil a cambio de nada. Una redacción que vale para las dos
operaciones es más barata y **no miente en ninguna**. Fijado con prueba: se recorren las dos
operaciones y la ausencia de `op`, y el mensaje es el mismo en los tres casos.

### 4.3 (c) `blockCatalog.js` — en alcance, y por qué es NEUTRAL y no dinámico

El encargo mete el catálogo en alcance, con razón: su texto es una de las seis superficies.

**Pero el catálogo no puede seguir a la operación, y conviene decir por qué en vez de dejarlo
implícito.** `ComponentGuide.jsx` pinta la documentación a partir de la entrada del **tipo de
bloque**, no de una instancia: ahí no hay ningún `op` que leer, porque no hay ningún bloque
concreto. Hacerlo dinámico exigiría llevar la instancia hasta el catálogo — eso **sí** sería
reestructurar. Por eso el texto queda neutro **y además dice de qué depende**:

> `entre 1 y 8 filas con valor y, opcional, divisor o multiplicador segun la operacion del bloque.`

**Esto es una decisión de taller, no una instrucción del encargo**, y queda declarada aquí para que
se pueda revocar si el operador prefiere otra cosa.

---

## 5. Punto 3 — la deuda que la vuelta anterior declaró y no tocó

Resuelta en el §2.3. `blockCatalog.js:677` pasa a `'No states, desc, style ni className.'`.
Cuatro términos eran ciertos y siguen; dos eran falsos y salen. **Sólo esa línea de guardrails**;
no se tocó ninguna otra entrada del catálogo.

**Deuda observada y NO tocada, porque tocarla sería ampliar:** la sección «Campos que puedes
editar» del mismo bloque **no menciona «Operacion» ni «Recuadro del resultado»**, los dos campos que
este run añadió. Es documentación incompleta, no falsa. **Queda declarada aquí y no se reparó**,
porque el encargo autoriza corregir la línea 667 y la línea 677, no completar el catálogo.

---

## 6. Punto 4 — retrocompatibilidad

**Un borrador guardado antes de este encargo carga y se ve idéntico.** Sostenido por tres cosas:

1. **El punto 1 no altera `after`** — 160 casos comparados byte a byte, 0 diferencias en `after`.
2. **El punto 2 no toca datos** — sólo cadenas de interfaz y de error. Ni un campo, ni un enum, ni
   una clave compilada.
3. **La ausencia de `op` sigue significando división** en las cuatro capas: motor, dos esquemas,
   compilador y **ahora también las etiquetas**.

**Prueba que lo fija:** `un borrador guardado ANTES de este encargo carga, compila y se ve
IDENTICO`. Comprueba que el nodo compilado tiene **exactamente** las siete claves de siempre
(`type`, `mode`, `title`, `labels`, `steps`, `counts`, `result`), que **no** aparecen `op`,
`resultBox`, `themeColor` ni `config`, y que el pie sale con el `=` en la mitad izquierda plana y el
resultado en recuadro azul.

---

## 7. Punto 5 — pruebas

**Comando exacto**, desde `projects/cantu-studio/tools/author-lite/compiler-api`:

```bash
node --test "tests/*.test.mjs"
```

| Qué | Resultado |
|---|---|
| Suite completa **ANTES** de tocar nada | **422 pruebas, 0 fallos** |
| Suite completa **DESPUÉS** | **436 pruebas, 0 fallos** |
| Pruebas nuevas de esta vuelta | **14**, en `webArithmeticEqualsOutsideBoxAndOperandLabels.test.mjs` |
| `npm --prefix tools/author-lite/editor-ui run lint` | limpio |
| `npm --prefix tools/author-lite/editor-ui run build` | correcto (el aviso de tamaño de chunk es previo y ajeno) |

**422 + 14 = 436:** ninguna prueba existente se añadió ni se perdió por el camino.

### 7.1 Cobertura añadida

Las cuatro colocaciones **con** `=` y **sin** `=`; el `=` con varios `=`; `after` byte a byte sobre
seis formas de resultado; el pie de `matrix` sin tocar; el renderer de Slides sin tocar; el nombre
del operando en las **dos** operaciones y con `op` ausente; los mensajes neutros en los **dos**
esquemas ejercitados con las dos operaciones; el catálogo; y el guardrail corregido **campo a
campo** contra lo que el bloque emite hoy.

### 7.2 Prueba ajena modificada — **una**, y se declara

**`webArithmeticResultBoxAndThemeColor.test.mjs`, una sola aserción.** Es el fichero que **la
segunda vuelta de este mismo run creó**, no una prueba de otro run. Su comprobación de `before` y
`both` esperaba `\( a = b = \)` **dentro del recuadro** — es decir, **fijaba el defecto**. Pasa a
esperar `\( a = b \)`, que es lo reparado. **Nada más de ese fichero cambió**, y su prueba de
`after` byte a byte siguió pasando sin tocarla, que es justamente la señal de que la reparación no
se desbordó.

Ninguna otra prueba de ningún otro run se modificó.

---

## 8. Punto 6 — JAME Core

**Un solo fichero de Core tocado, el autorizado:**
`src/builders/web/partials/renderArithmetic.js`, y dentro de él **sólo** `parseResult` y el bloque
del pie de `factorization`.

- **`src/builders/slides/components/renderArithmetic.js`: NO tocado.** Tiene su propio
  `parseResult` de dos partes y su propio pie; sigue igual, y hay prueba que lo fija.
- El pie de **`matrix`**, dentro del mismo fichero, **no se tocó**: sigue leyendo el mismo `pre` de
  siempre, con su `=` dentro. Es exactamente por eso que `parseResult` conserva `pre`.
- Verificado con un barrido de ficheros modificados: **ningún otro fichero bajo `src/`**.

---

## 9. Punto 7 — el packet de QA

**NO se reescribió.** La QA anterior ya recorrió parte de él y reescribirlo la habría invalidado sin
motivo. Se actualizó **en sitio**, con una cabecera fechada que declara qué se tocó.

| Qué | Checks |
|---|---|
| **Añadidos** — el `=` fuera del recuadro en las cuatro colocaciones, y sin `=` | **47, 48, 49, 50, 51** |
| **Modificados** — cambia lo que hay que ver | **20, 21, 23, 28, 29, 30, 32, 38**, el límite declarado **5**, la fila de «Campos de un paso» de la tabla de nombres, y la nota de cierre |
| **Límites declarados nuevos** | **9** (sólo el `=` del corte sale) y **10** (por qué `after` mantiene el `=` pegado) |
| **Citas de código re-medidas, prueba idéntica** | **7, 11, 17, 18, 19, 35, 36, 40** y la tabla de nombres |
| **Intactos, ni una palabra** | **1–6, 8–10, 12–16, 22, 24–27, 31, 33, 34, 37, 39, 41–46** |

**Las citas de línea se re-midieron porque mis propias ediciones las movieron.** Dejarlas habría
hecho mentir al packet. Se cambió **la cita, no la prueba**: quien ya corrió el check 7 no tiene que
repetirlo.

**Los checks 1, 11 y 27 siguen diciendo «divisor» y es correcto:** los tres se ejecutan sobre el
fixture base, que **no lleva `op`** y por tanto está en división. Se añadió una nota global en la
tabla de nombres para que se lean bien en cualquier caso.

---

## 10. Ficheros tocados

| Fichero | Qué |
|---|---|
| `src/builders/web/partials/renderArithmetic.js` | **Core.** `parseResult` parte en tres conservando `pre`; el pie de `factorization` saca el `=` del recuadro |
| `tools/author-lite/editor-ui/src/features/editor/components/web/WebBlockEditor.jsx` | mapa cerrado del nombre del operando; `useWatch` sobre `op`; las cuatro superficies |
| `tools/author-lite/editor-ui/src/schemas/draftSchema.js` | dos mensajes neutros |
| `tools/author-lite/compiler-api/schemas/draftSchema.js` | dos mensajes neutros (espejo) |
| `tools/author-lite/editor-ui/src/features/editor/constants/blockCatalog.js` | línea 667 neutra; línea 677 corregida |
| `tools/author-lite/compiler-api/tests/webArithmeticEqualsOutsideBoxAndOperandLabels.test.mjs` | **nuevo**, 14 pruebas |
| `tools/author-lite/compiler-api/tests/webArithmeticResultBoxAndThemeColor.test.mjs` | **una** aserción, declarada en §7.2 |
| `docs/_historical_run_record/…-OPERATOR-QA-PACKET.md` | actualizado en sitio, no reescrito |

**No se ejecutó git en ninguna forma.** No se tocó `.project/`, ni el status de ningún run, ni el
orden de la cola, ni los runs 32 y 34.

---

## 11. Qué queda pendiente y de quién es

1. **La QA humana del packet.** Ningún veredicto de este taller cierra nada. Los checks **47 a 51**
   son los nuevos; el **47** es el que garantiza que `after` no cambió.
2. **El status del run.** `#33` **sigue `active`**. Lo cierra el operador desde la consola.
3. **El catálogo incompleto** (§5): «Operacion» y «Recuadro del resultado» no están documentados en
   «Campos que puedes editar». Declarado, no reparado, porque repararlo excedía el encargo.
4. **La decisión de §4.3** —catálogo neutro en vez de dinámico— es del taller y es revocable.
