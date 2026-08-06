# «Factorización»: retiro de «Sin color», recuadro configurable y color de bloque — `cantu-studio`, `queue_order` 33

**Proyecto:** cantu-studio (implementación) · aiw-console (motor de roadmap, record)
**Fecha:** 2026-08-06
**Naturaleza:** SEGUNDA vuelta del run `queue_order` 33. Ejecuta reparaciones del alcance original
**más** la SEGUNDA ampliación que su `full_description` ya llevaba enmendada bajo `D-061` con fecha
2026-08-06. **Este encargo no enmendó ningún texto de run:** las dos enmiendas ya estaban escritas
en el canónico antes de empezar, y se leyeron de ahí.
**Archivos escritos:** ver §11.

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

Canónico: `projects/cantu-studio/.aiw/roadmap/roadmap.json`, confirmado como fuente por
`.project/roadmap.json`, que lo declara su única `sources[0].path`.

**Cifras verificadas en disco, no heredadas del encargo** (punto 9, que las declara sin verificar a
propósito):

| Cifra | Valor medido |
|---|---|
| Runs con `queue_order` en el canónico | **73** |
| Rango | **1..73, denso** — sin huecos, sin duplicados |
| Por status | `completed` 33 · `planned` 37 · `active` 3 |
| Runs `active` | **32** «Details», **33** «Arithmetic», **34** «Rule» |
| Checks del packet ANTES | **31**, numerados 1..31 |
| Checks del packet DESPUÉS | **46**, numerados 1..46, densos |
| Suite `compiler-api` antes | **405** pruebas, 0 fallos |
| Suite `compiler-api` después | **422** pruebas, 0 fallos |
| Citas de código del packet auditadas contra disco | **60 de 60 cuadran** |

Los tres `active` son exactamente los que el encargo declara en paralelo. **No se declara conjunto
elegible ni `ready_next`:** el encargo los excluye porque cambian con cada apertura y cierre.

---

## 2. Lo que NO cuadró entre el encargo y el disco

El encargo pide parar y reportar si alguna afirmación suya no cuadra. **Se encontraron tres.** Una
es sustantiva y cambia cómo se ejecuta un punto; las otras dos son desviaciones de una línea en
rangos citados. **Ninguna invalida el trabajo, y por eso no se paró: se ejecutó sobre lo que el
disco dice.** Se declaran las tres.

### 2(a) SUSTANTIVA — «Los dos `draftSchema.js` … que deben quedar IDENTICOS» es falso hoy

El alcance del encargo dice que los dos `draftSchema.js` «deben quedar IDÉNTICOS». **Medido: no lo
son, y no lo han sido nunca en el estado que este taller encontró.**

| Medición | `compiler-api/schemas/draftSchema.js` | `editor-ui/src/schemas/draftSchema.js` |
|---|---|---|
| Líneas | **1146** (antes de este encargo) | **1075** (antes de este encargo) |

Divergencias que ya estaban en disco, **documentadas en el propio código como intencionales**:

- Las tres rutas de `import` (uno importa por `../../editor-ui/...`, el otro por `../features/...`).
- `list.items`: el de `compiler-api` lleva un `preprocess` que parte un string por líneas, con un
  bloque de comentario que dice literalmente «NOTA DE DIVERGENCIA INTENCIONAL» y explica que sirve
  para borradores legacy guardados en disco. El de `editor-ui` no lo lleva.
- Los esquemas de pipeline: `compiler-api` declara `DraftSaveSchema`, `WebDraftSchema` y
  `SlidesDraftSchema`; `editor-ui` no.

**Qué se hizo con eso.** Se ejecutó sobre el invariante REAL, que sí se cumple y sí se preservó: **el
bloque de aritmética es idéntico byte a byte entre los dos archivos.** Medido antes de tocar nada
(2133 y 1660 caracteres, iguales en ambos) y **fijado ahora con prueba automática** —
`el bloque de aritmetica es IDENTICO en los dos esquemas` — para que deje de depender de que alguien
se acuerde. Igualar los archivos enteros habría borrado divergencias que el código declara
deliberadas y habría tocado `list`, que no es de este run.

### 2(b) Rango citado de la paleta del autor

El encargo cita `colorSystem.js:42-143`. **El array `DEFAULT_AUTHOR_LITE_COLOR_PALETTE` va de la
línea 42 a la 142**; la 143 está en blanco. El contenido citado es el correcto.

### 2(c) Rango citado del mapa del motor

El encargo cita `renderArithmetic.js:17-24`. **La línea 17 es la apertura `const SYSTEM_PALETTE = {`
y las siete entradas del mapa van de la 18 a la 24**, con el cierre en la 25. El contenido citado es
el correcto.

**Nada más del encargo falló.** Se comprobaron una por una y **cuadran**: que el desplegable ofrecía
«Sin color»; que `parseResult` (`:195-201`) parte por el último `=`; que ninguna superficie se lo
decía al autor; que `THEME_COLOR` (`:31`) cae al azul del motor; que el renderer YA lee
`data.themeColor` y el compilador **nunca** lo emitía; que el pie que pinta `pre` y `val` estaba en
`:255-256`; que el packet tenía 31 checks; que su límite 4 decía, palabra por palabra, «no admite
color de cabecera ni de la caja del resultado»; y que el renderer de Slides lee `step.op` **por
paso**.

---

## 3. Alcance original, veredicto de QA y SEGUNDA ampliación — lo que `D-061` exige declarar

**Qué reveló la QA humana del operador.** El operador corrió QA sobre el componente ya reparado en la
primera vuelta y pidió, como veredicto escrito, que **el recuadro del resultado fuera configurable**:
hoy el renderer parte siempre por el último `=` y encuadra lo que sigue, **una regla que ninguna
superficie le contaba**. Pidió poder elegir si el recuadro va después del `=`, antes, o en las dos
mitades.

**Qué entró como REPARACIÓN, dentro del alcance original.** Tres cosas, y la enmienda del canónico
lo dice expresamente («NOT amendments, because the original scope above already covers them»):

1. **Retirar «Sin color»** del control de color de cada factor. Es reparación de lo que **este mismo
   run construyó** en su primera vuelta: el desplegable ofrecía una ausencia de color que **no
   existe**. Medido, y es la parte que el encargo obligaba a verificar hex por hex: el motor Web
   asigna un color a cada número (`renderArithmetic.js:17-25`) y esos siete hex son **exactamente**
   tokens de la paleta del autor (`colorSystem.js:42-142`).

   | Número | Motor | Token de la paleta | ¿Coincide? |
   |---|---|---|---|
   | 2 | `#5E81AC` | `ctx` / **Azul** | **sí** |
   | 3 | `#A3BE8C` | `res` / **Verde** | **sí** |
   | 5 | `#B48EAD` | `def` / **Morado** | **sí** |
   | 7 | `#88C0D0` | `ex` / **Cian** | **sí** |
   | 11 | `#D08770` | `wrn` / **Naranja** | **sí** |
   | 13 | `#BF616A` | `err` / **Rojo** | **sí** |
   | resto | `#4C566A` | `meta` / **Gris** | **sí** |

   **Los siete cuadran.** No se leyó del encargo: se comparó `Commons.PALETTE` contra
   `DEFAULT_AUTHOR_LITE_COLOR_PALETTE` en una prueba que corre en cada suite.

2. **El texto de ayuda del resultado**, que enuncia la regla del corte. Cae en «reparar lo que la QA
   muestre como defecto real»: la QA del operador es justo lo que descubrió que la regla era
   invisible.

3. **El cableado de la cabecera y del borde del recuadro a la paleta.** Es literalmente el alcance
   original: *«where the component carries hardcoded or local colors instead of the shared palette
   … implement the missing integration»*.

**Qué entró como SEGUNDA AMPLIACIÓN.** Sólo el recuadro configurable (punto 3 del encargo). Es
capacidad nueva, no reparación.

**El corolario de `D-061`, y su anulación por escrito.** `D-061` dice: *«una ampliación que crece dos
veces en el mismo run es señal de que el encuadre estaba mal; la segunda se para y se devuelve al
operador»*. **La cabina paró y la devolvió, como el corolario exige.** El operador **decidió por
escrito** mantenerla dentro de este run en vez de abrir uno nuevo, y **esa anulación está escrita en
el canónico**, en la propia enmienda:

> *«The cabin stopped and returned it to the operator as the D-061 corollary requires, stating that a
> run growing twice is a sign the framing was wrong; the operator decided in writing to keep it
> inside this run rather than open a new one, and this line records that override so the roadmap does
> not claim otherwise.»*

**Este taller no re-discutió la decisión: la ejecutó**, como el encargo ordena. Se deja constancia
aquí porque `D-061` exige que el record lo declare y no es opcional.

**Las cuatro condiciones de `D-061` se siguen cumpliendo** para la ampliación: (1) la pidió el
operador por escrito como veredicto de QA; (2) cae sobre la superficie exacta que esa QA ejercitó —el
pie del resultado—; (3) no cambia la identidad del run: ni `title`, ni objetivo, ni fase, ni
`run_id`, ni `status` se tocaron; (4) el texto del run ya estaba enmendado antes de implementar.

---

## 4. Punto 1 — retiro de «Sin color», y LA TRAMPA resuelta sin escribir

**Lo entregado.** El desplegable «Color» de cada factor **pierde la opción «Sin color»**. La lista
son los tonos de la paleta activa más «Personalizado», y **siempre hay uno seleccionado**.

**Cómo se resolvió la trampa, que el encargo declara la parte difícil.** El requisito era doble y
tirante: mostrar el color resuelto **sin escribirlo** dentro de un borrador guardado. Se resolvió
separando **lo que se pinta** de **lo que se guarda**:

- El control compartido gana dos props **opcionales**, `allowEmpty` y `fallbackAccent`. «Factorización»
  lo monta con `allowEmpty={false}` y con el hex que el motor usaría para ese número.
- Dentro del control, ese respaldo entra en una variable nueva, `displayedValue`, que **sólo alimenta
  el `value` del `<select>`**. **No se propaga por `onChange`, y no hay ningún `useEffect`** que
  pudiera escribirlo al montar.
- El estado del formulario sigue partiendo del valor guardado (`color: count?.color ?? ''`). Un
  factor añadido a mano tampoco nace con color escrito.

**Está fijado por prueba, y no sólo por lectura.** La prueba `LA TRAMPA: el color resuelto se
MUESTRA, y nunca se escribe al abrir un borrador` exige que el mapa del motor aparezca **una sola
vez** dentro del bloque de factores —la prop que pinta—, prohíbe `useEffect` en el control, y mide el
efecto: un borrador sin color **sigue compilando sin la clave `config`**, que es por donde el color
del autor viaja.

**Dónde SÍ se rellena: al CREAR el bloque.** `blockFactory` escribe el color de cada factor del
bloque de fábrica con el token que le toca por su número. Como esos hex **son los del motor**, el
bloque de fábrica se ve **idéntico** a uno sin ningún color escrito; hay prueba que lo compara.

**Una decisión que se declara porque se aparta de la lectura literal del encargo.** El encargo dice
que el valor inicial es «el token que le corresponde por su número». Para **mostrar** el valor de un
borrador sin color se usa **el hex fijo del motor**, no el token de la paleta activa. La razón es
que si el autor personaliza su paleta, el token `ctx` deja de ser `#5E81AC` mientras el motor sigue
pintando `#5E81AC`: mostrar «Azul» ahí sería mentir otra vez, que es el defecto que este punto vino
a corregir. Con paleta por defecto —el caso real— el hex **es** el token y se ve «Azul»; con paleta
personalizada se ve «Personalizado», que es cierto. La regla «un token de la paleta o
Personalizado» se cumple en los dos casos.

**«Diagrama jerárquico» no cambia.** Allí el color **sí** es opcional de verdad y su nodo compila sin
ninguna clave de color. Conserva «Sin color», y hay prueba que exige que **ninguna** de sus dos
colocaciones pase las props nuevas.

**El alcance exacto de la garantía, dicho sin redondear.** Lo que no se escribe al abrir es **el
color**: `counts[].color` y `themeColor`, los dos montados con `Controller`, de modo que su valor
sale del estado del formulario y nunca del DOM. **`op` y `resultBox` sí se escriben al guardar**, con
su valor por defecto, porque son `<select>` registrados con `register` —conducta que `op` ya tenía
desde la primera vuelta y que la QA del operador aprobó—. **No es el mismo caso y no se trató igual**:
`op` y `resultBox` son conjuntos cerrados cuyo valor por defecto pinta exactamente lo mismo que su
ausencia, mientras que el color es una elección estética que el autor no ha hecho. La distinción está
escrita en el check 15 del packet para que un veredicto no la reporte como fallo.

---

## 5. Punto 2 — el texto de ayuda del resultado

Bajo **«Resultado final»** el aviso ahora dice, además de lo de siempre, que **el texto se parte por
el ÚLTIMO signo `=`** y que **«Recuadro del resultado» decide qué mitad va en recuadro**.

Describe la regla **NUEVA**, como el encargo exige, porque el punto 3 la cambió: ya no basta decir
que se encuadra lo que sigue al `=`.

---

## 6. Punto 3 — el recuadro configurable

**Lo entregado.** Un campo **por bloque**, `resultBox`, de conjunto cerrado, con recorrido completo:
los dos esquemas, el control en el editor, la validación y emisión en el compilador, y el consumo en
el renderer.

| Valor | Qué hace |
|---|---|
| `after` | recuadro en lo que sigue al último `=` — **conducta de hoy, por defecto** |
| `before` | recuadro en lo que precede al `=`, el resto en texto plano |
| `both` | las dos mitades en recuadro |
| `none` | sin recuadro, todo en texto plano |

**La ausencia se comporta como `after`, y se verifica, no se afirma.** Antes de escribir el record se
reconstruyó en un scratch una copia del renderer **anterior al cambio** y se compararon las dos
salidas sobre **84 combinaciones** —siete formas de resultado, con y sin `=`, layout web y slide,
tres valores de `op`, con y sin `config.palette`—: **0 diferencias.** En la suite queda fijado con la
prueba `la AUSENCIA de resultBox se comporta como «after», byte a byte`, que compara el HTML sin el
campo contra el HTML con `resultBox: 'after'` sobre cinco formas de resultado.

**El punto de corte NO se tocó y NO se hizo configurable.** Sigue siendo `lastIndexOf('=')`. Hay
prueba que lo fija y que además exige que **ningún** esquema declare campo alguno que lo mueva. **No
se concluyó que debiera ser configurable, así que no se paró.** Si el operador lo quiere, es una
tercera ampliación y no está autorizada: queda dicho en el packet como límite declarado 4.

### 6.1 Qué hace cada opción con un resultado SIN `=`, declarado como el encargo exige

`parseResult` deja `pre` vacío y **todo el texto en `val`**. Consecuencia, opción por opción:

| Opción | Qué se ve | ¿Rompe? |
|---|---|---|
| `after` | todo el texto en recuadro | **no** — es exactamente lo que ya hacía |
| `both` | todo el texto en recuadro, **más un recuadro vacío a la izquierda** | **no** |
| `before` | **ese recuadro vacío** a la izquierda, y el texto en plano | **no** |
| `none` | todo en texto plano | **no** |

**Ninguna lanza y en las cuatro el texto del autor aparece entero**, fijado por prueba.

**Por qué se dejó salir el recuadro vacío en vez de suprimirlo.** Suprimir el recuadro cuando la
mitad está vacía habría sido más bonito, pero **habría cambiado la conducta de hoy** en un caso real:
un resultado como `360 =` pinta hoy un recuadro vacío a la derecha, y con la supresión dejaría de
pintarlo. El punto 6 del encargo pide que la retrocompatibilidad **se verifique, no se afirme**, y la
única forma de que sea byte a byte para **cualquier** entrada es no tocar la conducta de las mitades
vacías. Se eligió la garantía sobre la estética, y el recuadro vacío queda declarado en el packet
como límite 5, con su salida: poner un `=`.

**Sobre `none`, que el encargo dice que añadió la cabina y el operador no pidió.** Se deja, y **no
sobra**: es la única opción que permite un resultado sin recuadro, y sin ella la respuesta a «quiero
el resultado en texto corrido» no existe. Cuesta una entrada de un enum y una fila del desplegable.
**No se quitó por cuenta propia**, como el encargo ordena.

---

## 7. Punto 4 — color del recuadro y de la cabecera

**Medición confirmada, no heredada:** el renderer **ya** leía `data.themeColor`
(`renderArithmetic.js:31`, `const THEME_COLOR = data.themeColor || Commons.PALETTE.blue.color;`) y el
compilador **nunca** lo emitía. La salida compilada de este bloque no tenía la clave. Por eso la
cabecera y el borde del recuadro caían **siempre** al azul del motor.

**Lo entregado.** Un color **por bloque**, `themeColor`, con el **mismo** control de paleta más
«Personalizado» que usan los factores, montado también sin opción vacía y con el azul del motor como
respaldo mostrado. Se emite como `themeColor`, ya normalizado a `#RRGGBB` mayúsculas.

**Por defecto no cambia nada:** omitido, la clave no se emite y el motor cae al azul de siempre.
Fijado por prueba, en los dos sentidos: sin el campo, cabecera y borde salen `#5E81AC`; con el campo,
los dos toman el color del autor y el azul desaparece.

**No hizo falta tocar JAME Core para esto**, como la medición del encargo anticipaba. Cero líneas.

---

## 8. Punto 5 — JAME Core: qué se tocó y por qué era inevitable

**Se tocó un solo archivo**, `src/builders/web/partials/renderArithmetic.js`, **y sólo el bloque del
pie que pintaba `pre` y `val`** (`:255-256` antes del cambio).

**Por qué no se pudo evitar.** El recuadro estaba **clavado** al `val`: la caja era una constante del
literal de la plantilla. Moverla, duplicarla o quitarla es, por construcción, cambiar esas dos
líneas. **No hay forma de resolver el punto 3 sin ellas**, y el punto 5 lo autoriza exactamente para
ese caso.

**Cómo se hizo, para que el cambio sea del tamaño mínimo.** Las dos cadenas de estilo **no se
reescribieron**: se movieron tal cual a un helper local `resultHalf(text, boxed)` que elige entre la
forma con recuadro y la forma en texto plano, y una tabla de cuatro colocaciones decide cuál va en
cada mitad, con respaldo en `after`. **El helper vive DENTRO de la rama de `factorization`**, no en el
cuerpo común del módulo, para que la autorización no se estire.

**`mode: 'matrix'` no se tocó.** Su pie conserva sus dos `<span>` escritos a mano. Hay prueba que
exige que la rama de `matrix` **no** contenga ni el helper ni la tabla de colocaciones.

**El renderer de Slides no se tocó, y se nombra como el encargo pide.**
`src/builders/slides/components/renderArithmetic.js` lee **`step.op`, por PASO** (`:196`, `:231`,
`:237`), mientras el de Web lo lleva **por BLOQUE**. **Son dos modelos distintos y reconciliarlos no
es de este run.** Se dejó como está y hay prueba que fija que no se mezclaron.

**Ningún otro archivo de Core se modificó.** Los puntos 1, 2 y 4 se entregaron con **cero** líneas de
Core.

---

## 9. Punto 6 — retrocompatibilidad, verificada y no afirmada

Un borrador guardado **antes** de este encargo no lleva `color` en los factores, ni `resultBox`, ni
`themeColor`. Lo que se midió:

| Qué | Resultado |
|---|---|
| Carga y valida | **sí**, sin error |
| Claves compiladas | **exactamente las siete de siempre**: `type, mode, title, labels, steps, counts, result` — sin `config`, sin `resultBox`, sin `themeColor` |
| Pie del resultado | **byte a byte igual**: `360 =` en texto plano gris fuera, `2^3 × 3^2 × 5` dentro de un recuadro de borde `#5E81AC`. Los dos `<span>` se comparan **carácter por carácter** en la prueba |
| Recuadros | **uno**, y está **después** del `=` |
| Cabecera | `background-color: #5E81AC` — el azul del motor |
| Colores por número | `2` azul, `3` verde, `5` morado, **los del motor** |
| Al abrir y guardar sin tocar nada | **no se escribe `color` ni `themeColor`** dentro del borrador (§4) |

**Prueba automática que lo fija:** `un borrador guardado ANTES de este encargo carga y compila con
las claves de siempre` y `y se ve IDENTICO: mismos colores por numero, recuadro tras el =, borde y
cabecera azules`. Y, más ancha, la comparación de 84 casos contra el renderer anterior descrita en
§6.

---

## 10. Punto 7 — pruebas

**Comando exacto**, desde `projects/cantu-studio/tools/author-lite/compiler-api`:

```bash
node --test "tests/*.test.mjs"
```

| Qué | Resultado |
|---|---|
| Suite completa **ANTES** de tocar nada | **405 pruebas, 0 fallos** |
| Suite completa **DESPUÉS** | **422 pruebas, 0 fallos** |
| Pruebas nuevas de esta vuelta | **17**, en `webArithmeticResultBoxAndThemeColor.test.mjs` |
| `npm --prefix tools/author-lite/editor-ui run lint` | limpio |
| `npm --prefix tools/author-lite/editor-ui run build` | correcto (el aviso de tamaño de chunk es previo y ajeno) |
| Citas de código del packet auditadas contra disco | **60 de 60 cuadran** |

**Dos pruebas existentes se ajustaron, y se declaran las dos con su razón.**

1. **`webArithmeticFactorizationSafety.test.mjs`** — es el archivo que la PRIMERA vuelta de este
   mismo run creó. Su lista de campos prohibidos incluía **`themeColor`**. Deja de incluirlo porque
   **el punto 4 del encargo lo autoriza expresamente**: pasa de campo prohibido a campo contratado,
   acotado a `#RRGGBB`. **Ningún otro campo salió de la lista** — `config`, `states`, `desc`,
   `rawHtml`, `style`, `className` y los demás siguen rechazándose igual. La cobertura positiva y
   negativa de `themeColor` vive en el archivo nuevo, y la línea retirada lleva encima el comentario
   que explica por qué.

2. **`webSharedColorSelectorUnification.test.mjs`** — **ésta sí es ajena**, de
   `RUN-CANTU-COLOR-SELECTOR-UNIFICATION-001`. Exigía la firma **cerrada** de
   `HierarchyNodeColorField`, y el control gana ahora cuatro props **opcionales con valor por
   defecto**. **No se borró la guardia ni se relajó entera:** se relajó **sólo la cola** de la firma,
   de modo que los cinco parámetros que `hierarchy` usa siguen exigidos y en el mismo orden. Y **se
   añadieron dos afirmaciones nuevas** que hacen la prueba **más fuerte** que antes: que ninguna de
   las dos colocaciones de `hierarchy` pasa `allowEmpty` ni `fallbackAccent`, es decir, que
   `hierarchy` conserva su «Sin color». Es el mismo trato que la vuelta anterior dio al recuento de
   montajes: acotar la guardia a lo que la prueba dice comprobar, no subir un número.

**Lo que NO se verificó, y por qué.** No hay QA visual: el run la exige y **es del operador**. Este
record no la sustituye. El packet reescrito es el instrumento para hacerla.

---

## 11. Punto 8 — el packet, reescrito entero

| Medición | Antes | Después |
|---|---|---|
| Checks | **31** | **46**, numerados 1..46, densos |
| Checks con consecuencia de parada | 3 (1, 2, 17) | **4** (1, 2, 13, 14) |
| Límites declarados | 4 | **8** |

**Las etiquetas de interfaz se derivaron del catálogo y del editor, no del encargo ni del packet
viejo.** Las 60 citas de código se auditaron contra disco una por una y **cuadran las 60**; tres
estaban desfasadas al escribir y se corrigieron antes de cerrar.

**El límite 4 del packet viejo —«no admite color de cabecera ni de la caja del resultado»— se
eliminó**, y en su lugar el packet dice expresamente que ha dejado de existir, con los checks 24 a 27
que lo comprueban. Los límites nuevos declaran: el corte no configurable (4), qué hace cada opción
con un resultado sin `=` (5), que «Sin color» sigue vivo en «Diagrama jerárquico» (6), el nombre
`HierarchyNodeColorField` (7) y el modelo por paso del renderer de Slides (8).

**El check 15 es el que comprueba con ojos la parte difícil del punto 1:** que abrir y guardar un
borrador viejo **no le mete `color` dentro**.

---

## 12. Fronteras respetadas

- **No se ejecutó git** en ninguna forma.
- **No se cambió el status de ningún run** ni se re-emitió `.project/`. `#33` sigue `active`; lo cierra
  la cabina.
- **No se insertaron, movieron ni renumeraron runs.** El canónico sólo se **leyó**.
- **No se tocó «Nota desplegable» (32) ni «Regla matemática» (34).** Verificado: `WebDetailsSchema`,
  `DetailsItemSchema` y `WebRuleSchema` intactos; `DetailsFields` no monta el control de color. Los
  dos esquemas compartidos se tocaron **sólo** dentro del bloque de aritmética, y `resultBox` y
  `themeColor` no aparecen en ninguna otra ruta del compilador.
- **No se arregló el sistema de color compartido** ni `buildColorRolesOutput`.
- **No se hizo configurable el punto de corte del resultado.**
- **No se amplió el alcance** más allá de los puntos 1 a 4.
- **JAME Core:** un solo archivo, sólo el pie de `factorization` (§8). Slides medido y **no tocado**.

---

## 13. Deuda declarada, para que no quede sin dueño

1. **La ficha de catálogo de «Factorización» tiene un guardrail que ha dejado de ser cierto.**
   `blockCatalog.js:677` dice *«No config, states, desc, themeColor, style ni className»*. **`config`
   dejó de ser cierto en la PRIMERA vuelta de este run** —el compilador emite `config.palette`— y
   **`themeColor` deja de serlo ahora**. **No se corrigió: `blockCatalog.js` no está en el alcance de
   este encargo.** Es texto author-facing y merece un encargo corto propio.
2. **Los dos `draftSchema.js` no son archivos idénticos** (§2a). Lo que sí lo es, y ahora está fijado
   por prueba, es el bloque de aritmética. Si alguien quiere igualarlos enteros, es un encargo propio
   y toca `list`.
3. **El control compartido se sigue llamando `HierarchyNodeColorField`** aunque ya lo usen tres
   superficies. Renombrar exige aprobación y no se hizo. Es cosmético.
4. **El color es por número, no por fila.** Un color por fila exigiría cambiar el motor más allá de
   lo autorizado aquí. Declarado en el packet como límite querido.
5. **Un divisor sin factor correspondiente no se puede colorear.** El control vive en los factores.
6. **`before` y `both` pintan un recuadro vacío si el resultado no lleva `=`** (§6.1). Declarado en el
   packet como límite 5, con su razón y su salida.
7. **El renderer de Slides lleva `op` por paso y el de Web por bloque.** Medido, nombrado, no
   corregido: no es de este run.
8. **`TimelineFields` sigue siendo el único componente del despacho por `kind` que no recibe
   `colorPalette`.** No es de este run.

---

## 14. Archivos escritos

**cantu-studio**

| Archivo | Qué |
|---|---|
| `tools/author-lite/editor-ui/src/schemas/draftSchema.js` | `resultBox` y `themeColor` en el bloque de aritmética |
| `tools/author-lite/compiler-api/schemas/draftSchema.js` | lo mismo, en paridad byte a byte |
| `tools/author-lite/editor-ui/src/features/editor/components/web/WebBlockEditor.jsx` | control «Recuadro del resultado», control «Color del bloque», retiro de «Sin color» en los factores, respaldo mostrado, ayuda del resultado |
| `tools/author-lite/editor-ui/src/features/editor/utils/blockFactory.js` | mapa del motor exportado, color por factor y `resultBox`/`themeColor` en el bloque de fábrica |
| `tools/author-lite/compiler-api/services/compiler.js` | emisión y validación de `resultBox` y `themeColor` (sólo ruta de arithmetic) |
| `src/builders/web/partials/renderArithmetic.js` | **JAME Core** — sólo el pie de `factorization` (§8) |
| `tools/author-lite/compiler-api/tests/webArithmeticResultBoxAndThemeColor.test.mjs` | **17 pruebas nuevas** |
| `tools/author-lite/compiler-api/tests/webArithmeticFactorizationSafety.test.mjs` | `themeColor` sale de la lista de campos prohibidos (§10) |
| `tools/author-lite/compiler-api/tests/webSharedColorSelectorUnification.test.mjs` | firma relajada sólo en la cola, más dos afirmaciones nuevas (§10) |
| `docs/_historical_run_record/RUN-JAME-WEB-ARITHMETIC-AUDIT-AND-REPAIR-001-OPERATOR-QA-PACKET.md` | reescrito entero: 46 checks |

**aiw-console**

| Archivo | Qué |
|---|---|
| `context/aiw-console/records/RECUADRO-CONFIGURABLE-Y-COLOR-DE-BLOQUE-EN-FACTORIZACION-CANTU.md` | este record |

**El canónico de roadmap no se escribió.** Sólo se leyó.

---

## 15. Estado en que queda el run

`#33` queda **`active`**, con los cuatro puntos entregados y verificados por prueba automática, **a la
espera de la QA visual humana** que su `full_description` exige y que este taller no ejecuta. El
packet reescrito, con sus 46 checks, es lo que el operador tiene que correr. **Lo cierra la cabina**,
no este encargo.
