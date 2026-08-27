# HANDOFF — hilo `cantu-studio` (el proyecto)

> Escrito por la cabina al cerrar la sesión del **2026-08-27**. **Sustituye al relevo del mismo
> día escrito por la mañana**, que ya está obsoleto en sus cifras.
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el canónico al abrir. Gana el
> disco.**

---

## ⚠ LA LECCIÓN DE ESTA SESIÓN, Y VA PRIMERA PORQUE COSTÓ SEIS RONDAS

> **UNA VERIFICACIÓN SIN LA SUPERFICIE DECLARADA NO ES UNA VERIFICACIÓN.**

`RUN-CANTU-SLIDE-ARITHMETIC-ITEM-ADMIT-001` acumuló **CUATRO luces verdes con el operador viendo
el defecto**:

1. un arnés del taller en Chrome headless;
2. **la cabina dando ese arnés por bueno sin preguntar sobre qué superficie corría**;
3. una suite de 2 040 pruebas;
4. una ronda entera abriendo la superficie real a 896×504 y contando 7/3/6.

**Las cuatro medían con `QA-material.json`, que ya venía completo. Nadie midió lo que crea el
botón.** Y el defecto era que **la semilla de diapositiva nacía con 3 pasos y 1 grupo mientras su
propio `result` prometía tres factores**.

**Lo encontró el ojo del operador**, en una captura donde **sobraba hueco debajo de las filas**:
si algo se recorta, llena el panel y se corta en el borde; **si sobra sitio, el dato no está.**

**Siete hipótesis, siete retiradas. TRES eran de la cabina** — inyección sin scripts, motor viejo
por el color, y el carril Web. Y la séptima la mató su propia sonda mal escrita: cogió la
**primera** coincidencia de `arithmetic` en `blockFactory.js` —la de Web— y publicó «la semilla
trae 7 y 3» **como si fuera prueba**. Había dos.

**REGLAS QUE SALEN DE AQUÍ:**

- **Declarar SIEMPRE sobre qué superficie corre una medición.** Un arnés no es la pantalla del
  operador mientras no se demuestre que lo es.
- **Medir lo que crea el BOTÓN, no lo que uno escriba.** Un material de QA completo esconde un
  defecto de semilla.
- **Antes de publicar el resultado de una sonda, comprobar si hay MÁS de una coincidencia.**
- **No juntar en el mismo turno un veredicto de QA y una decisión de diseño.** Una respuesta de
  una palabra no puede contestar a dos preguntas — pasó con `#137` y con `#138`.
- **Leer el `full_description` de un run ANTES de recomendarlo.** La cabina recomendó abrir `#140`
  sin leerlo y llevaba una parada dentro.

---

## ESTADO DEL CANÓNICO — medido el 2026-08-27 al cerrar

```
total 165 · completed 147 · active 0 · planned 18
validador: 0 errores · externalRunIds 155 · densidad 1..N: true · ids únicos: true
md5: b968211baaa8d40535f4cb3a7041530b     EOL: \r\n
red de fixtures: 63 comparados · 63 idénticos · 0 movidos
```

**NO HAY NINGÚN RUN ACTIVO.**

### Lo que cerró esta sesión — SIETE runs

| # | run | cómo cerró |
|---|---|---|
| 136 | retirar la tabla de color de `tokens.js` | **sin QA, declarado** — primer cierre sin QA del proyecto |
| 137 | duplicar bloques, diapositivas y componentes en celda | con QA visual |
| 138 | quitar el marco de la colección de términos | con QA visual |
| 139 | canal de tinta de la insignia + tabla privada sin hexes | con QA visual |
| 140 | la puerta del importador rechaza y nombra la clave | con QA visual |
| 141 | admitir «Cálculo aritmético» + ajuste por altura | **con defecto declarado y NO reparado** |
| 145 | completar la semilla que se contradecía | con QA visual — **cerró el defecto de `#141`** |

### La cola, tras la inserción de `#145`

El siguiente `planned` es **`RUN-CANTU-EDITOR-SHOWS-THE-PAINTED-SIZE-001`**. **Derívalo del
canónico; no lo teclees.**

---

## ⚠ LO PRIMERO DE LA PRÓXIMA SESIÓN: ENCUADRAR EL RUN DEL PORTE

El operador abrió una dirección al aprobar `#145`, **él solo y sin que se le preguntara**:

> **«es agarrar los campos de web que están bien pulidos y ponerlos acá»**

Registro verbatim con sus tres piezas y sus fronteras:
`context/cantu-studio/records/DECISION-LOS-CAMPOS-DE-WEB-ESTAN-PULIDOS-Y-HAY-QUE-TRAERLOS.md`

**Y VAN CINCO COSAS APILADAS sobre los formularios del editor, todas en esa misma dirección.
SE LE PONEN LAS CINCO DELANTE JUNTAS**, no de una en una:

| | qué | de dónde viene |
|---|---|---|
| 1 | la separación de la colección de términos — propuesta escrita, la línea `border-t` de los pasos | `#138`, **diferida por él** |
| 2 | «Terminos» con controles propios en vez de `CabeceraDeColeccion`/`ItemDeColeccion` | `#138`, nombrada |
| 3 | **la trampa `''` → `#4F75A8` de «Procedimiento matemático»** | `#139` — **ES UN DEFECTO REAL** |
| 4 | `counts[].color` sin control | `#141`, hueco declarado |
| 5 | las dos faltas de ortografía de la semilla de Web — «Descomposicion», «Agrupacion» | `#145`, **se le pintan a un alumno** |

**Dos fronteras medidas que el encuadre tiene que llevar dentro:**

- **`HexOnlyColorField` es un `const` NO EXPORTADO** de `WebBlockEditor.jsx`. Traer el color por
  factor **exige tocar Web**, y eso es decisión del operador.
- **`resultBox` es de Web y SÓLO de Web.** El motor de diapositiva **nunca lo lee** y su esquema
  **lo excluye explícitamente**. Traer ese desplegable **no es portar un control: es abrir una
  capacidad.** Cuarta vez del patrón «capacidad en un lado, cerrada en el otro».

---

## LO QUE QUEDA VIVO Y ES DEL OPERADOR

**Sin decidir:**

- **Las tres escenas muy estrechas de aritmética** que se quedan en el suelo del ajuste:
  `fact 401`, `fact 186`, `matriz 186`. La rampa de 12 escalones dice que `fact 401` cabría con
  suelo 6px —letra de **6,69px, ilegible**— y que las de 186px **no caben ni a 4px**. **Encoger
  más sería cambiar una pérdida por otra.**
- **La limpieza de la capa 3**: siete ficheros de diapositiva pintan tokens obsoletos, y **dos ya
  tienen dueño** — `renderConceptCard.js` es `#139` (cerrado) y `renderStackSlide.js` es el
  compromiso del verde de `#134`. **Son unos cinco trabajos, no treinta.** Los otros cinco:
  `inkEngine.js`, `renderCard.js`, `renderTitleSlide.js`, `renderArithmetic.js`,
  `renderSplitCard.js`. **⚠ En WEB esos hexes NO son viejos: son los VIGENTES.** Borrarlos sería
  repintar Web, que es la opción que descartó.
- **La puerta de la PREVIA** (`SlidesPreviewDraftSchema`) sigue aceptando y borrando en silencio.
  `#140` sólo cerró la del importador. **Falta medir si el contenido construido la cruza** —
  `problem` vive en cuatro ficheros `.js` ya construidos.
- **La Portada duplicable** (`#137`, paso 4 de su QA): contestó «pass». **Registrado como NO
  decidido**, no como aprobado.

**Declarado y NO reparado, con su aprobación:** el contraste de la insignia se queda en el mando —
**tercera vez que toma esa decisión**, y la primera con número: `focus` 2,60 · `res` 2,65 ·
`str` 1,82 por debajo de 3:1, mientras `def` mejoró solo de 2,83 a **4,03**.

**Sin rastrear, y no los creó la cabina:** `cantu-studio/.claude/launch.json` y
`aiw-console/context/aiw/records/`.

---

## MÉTODOS QUE FUNCIONARON Y CONVIENE REUSAR

1. **EL DIFERENCIAL CON CENTINELAS.** Para saber qué mueve un módulo: enganchar
   `Module.prototype._compile`, sustituir el valor por un centinela único **sólo en ese fichero**,
   renderizar el corpus y contar. **Lo que aparece, pinta.** No toca el disco. Así se midieron las
   41 superficies de `#136` y las 10 de `#139`.
2. **EL DIFF DE LOS PINES ES LA QA ESTRUCTURAL.** Cuando un run re-fija árboles, **no hace falta
   correr la red** —que además no cabe en una llamada—: basta emparejar las líneas `+`/`-` y
   comprobar que sólo cambia lo declarado. En `#136` dio **27 de 27 pares con cero cambios
   estructurales**.
3. **LA RED DE FIXTURES, CORRIDA POR LA CABINA.** El fichero de prueba no cabe; la comparación sí.
   Renderizar cada entrada del corpus y compararla con su pin. Sonda en
   `_scratch/turno2-137-red-de-fixtures.mjs` **(borrada al cerrar — se reescribe en 20 líneas)**.
4. **CONTAR CON LAS HOJAS FUERA.** Contar clases sobre el HTML con el `<style>` dentro **infla la
   cifra**: 7 salieron 9 y 3 salieron 7. Siempre `replace(/<style>[\s\S]*?<\/style>/gi,'')` — y
   **ojo, esa expresión no caza `<script>` con atributos**, que le costó un tropiezo al taller.

---

## EL VEHÍCULO PARA ESCRIBIR EL CANÓNICO — usado **once veces** el 2026-08-27, sin un fallo

- Canónico: **`cantu-studio/.aiw/roadmap/roadmap.json`**. `roadmap/roadmap.json` NO EXISTE.
- Motor: **`aiw-console/tools/roadmap/roadmap-core.mjs`** (2 479 líneas). El de `cantu-studio`
  (1 213) no conoce `lanes`.
- **Por la consola, y el servidor no sobrevive entre llamadas de bash: todo el ritual en UN
  script.** `PC_PORT=<libre> node projects/aiw-console/project-console/serve.mjs`, POST a
  `/projects/cantu-studio/__project-console/roadmap/edit`.
- Cuerpo **`{ op, args, apply, baseline }`**. El dry-run devuelve el `baseline`; el apply lo exige.
- `set-status` → `{ run, status, closeoutResult }` (**`run`, no `runId`**)
  `set-text` → `{ targetType:'run', targetId, fullDescription }`
  `insert` → `{ runId, title, summary, fullDescription, status, before }` — **`before` es un
  `run_id`**, y se DERIVA (p. ej. el primer `planned` de la cola).
- **La respuesta trae `errors: undefined` cuando todo va bien.** No leerlo como fallo.
- **Dos ops en el mismo script funcionan** — `set-text` + `set-status` seguidos, cada uno con su
  dry-run y su baseline. Usado en `#139` y `#140`.
- `serve.mjs` **re-emite `.project/` él solo**: los siete artefactos entran en el mismo commit.
- Puertos 8231-8247 libres el 2026-08-27.

### `checkInvariants` y `externalRunIds` — Y RESUELVE UN FALSO ROJO CONOCIDO

    checkInvariants(obj, { externalRunIds })   // OBJETO DE OPCIONES, no posicional

**`externalRunIdsFor` NO vive en el motor:** está en `aiw-console/project-console/serve.mjs`
(definida en :364, exportada en :1342) y **devuelve una PROMESA**. Resuelve a un `Set` de **155**.

**⚠ Y ESTO EXPLICA UN ROJO QUE NO ES UN DEFECTO:** las 5 pruebas rojas de
`cantu-studio/tools/roadmap/tests` son la dependencia colgante
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` → `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`.
**Con `externalRunIds` da 0 errores; esas pruebas no lo pasan.** Es medir con la herramienta que
no conoce el vocabulario del dato. **Nombrado, no abierto.**

### Los runs NO viven en la raíz

`objectives[].phases[].runs[]`. Leer `obj.runs` devuelve **`total 0`**, que es una sonda mal
escrita y no un canónico vacío.

---

## LÍMITES DE LA CABINA — RE-MEDIDOS EL 2026-08-27

- **Borrado: NACE APAGADO.** Se pide con `allow_cowork_file_delete` **antes de crear el primer
  fichero de prueba**; es por carpeta y dura la sesión.
- **`add` y `commit` funcionan. CERO locks en toda la sesión**, en más de veinte operaciones.
- **`git push`: sin ruta a GitHub. Es del operador. NO SE LE RECUERDA. NUNCA.**
- **Tope de una llamada de bash: ~178 s.** **La suite completa NO cabe** — 22 de sus 136 ficheros
  ya lo revientan, y la red de fixtures sola también. **Correr los ficheros que el run tocó sí
  cabe**, y basta para verificar el delta si no se modificó ninguna prueba existente.
- **La cabina NO VE INTERFACES** y **no puede abrir el navegador del operador**. Su borrador vive
  en el `localStorage` de SU perfil de Chrome; **el taller usa otro perfil y tampoco puede**.
- **`_scratch/` NO es todo de la cabina.** Hay material de sesiones anteriores del operador: se
  borra **lo suyo** y se lista lo que no.

---

## REGLAS DEL OPERADOR VIGENTES

- **D-070** — ticket de run nuevo → sesión nueva. **El 2026-08-27 pidió saltarlo** y se declaró en
  el commit; no es la norma.
- **D-071** — la decisión no crítica la toma la cabina y la **explica al tomarla**.
- **D-061** — ampliar el alcance sólo por veredicto humano, con las cuatro condiciones **escritas
  una a una dentro del texto del run**. Se usó en `#141` y la tercera —la identidad— **se declaró
  como tensión en vez de taparse**.
- **El operador decide cuándo se cierra la sesión.**
- **No se le recomienda modelo ni esfuerzo**, pero **la sesión se declara siempre**.
- **Toda petición de revisión en lista numerada de pasos cortos**, diciendo carril, componente y
  qué buscar. **Y con el nombre que él ve en pantalla.**
- **Dibujarle las opciones con su coste MEDIDO antes de pedirle que decida.** Van **catorce veces**
  y contestó en una palabra casi siempre.
- **Mensajes de commit y scripts POR FICHERO**, nunca por línea de shell — **bash se comió dos
  fragmentos entre acentos graves** el 2026-08-27 y hubo que enmendar un commit.
- **`add` dirigido por nombre, nunca `-A`. El trabajo del taller y el cierre del roadmap van en
  commits SEPARADOS.**
- **El taller nunca toca git.**
