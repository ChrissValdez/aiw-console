# Relevo — hilo `cantu-quizzes-latex`

**Fecha: 2026-09-13, 01:05 CST.** Sustituye al relevo del **2026-08-06**, que llevaba
cinco semanas sin tocarse y describía el run `#2` como activo. Lo que de aquel sigue
vigente se ha traído aquí; lo que caducó se declara caducado en el §9.

**Motivo del cierre:** la sección de Lectura del Simulador queda terminada en las cuatro
variantes y el operador abre sesión nueva para Redacción.

**Modo de la sesión: CONECTADO DEGRADADO.** `device_bash` no monta el workspace desde la
actualización de Windows del 8 de septiembre (`no Plan9 drive shares mounted`). Se lee con
`device_stage_files`, se escribe con `device_commit_files` y **la cabina NO puede ejecutar
git ni borrar ficheros**. Mientras dure, commit y push son del operador.

---

## 0. LO PRIMERO AL ABRIR

1. **Volver a probar el montaje.** Si `device_bash` monta, la cabina recupera git y borrado
   y este relevo deja de aplicarse en ese punto.
2. **Este hilo NO tiene run propio.** Las 180 preguntas de Lectura se transcribieron sin
   run en el roadmap. No se abrió ninguno y no se tocó la consola en toda la sesión.
3. **OTRO HILO TRABAJA EN ESTE MISMO PROYECTO.** El roadmap pasó de **64 runs a las 06:41
   UTC a 73 a las 00:45 CST**, sin intervención de este hilo. El activo al cierre es
   **`#64` «Write the Statistics block of the fifth form»**. Los runs `#59`–`#67` son un
   bloque nuevo de «quinta forma» de Matemáticas que **no es de este hilo**: se nombra y
   no se toca.
4. **Lo pendiente del operador está en el §7.**

---

## 1. Qué se hizo, y es el entregable

**La sección 1 (Lectura) del `Examen Simulador PAA (Aprende Libre)` queda transcrita
completa en las CUATRO variantes: 180 preguntas, 23 pasajes, 4 figuras reconstruidas.**

| variante | fichero | bytes | md5 | pasajes | figura |
|---|---|---|---|---|---|
| Amarilla | `Secciones/1. Lectura/Amarilla-Lectura.tex` | 262 714 | `f5056438787a97213d88fd19ef79ccfa` | 5 | sectores |
| Verde | `Secciones/1. Lectura/Verde-Lectura.tex` | 319 093 | `a8bc2f92db0743278eafb56fa0ef5374` | 6 | sectores |
| Azul | `Secciones/1. Lectura/Azul-Lectura.tex` | 281 320 | `cfea3fb05f61dbd4994b61a6cb503c60` | 6 | tabla |
| Violeta | `Secciones/1. Lectura/Violeta-Lectura.tex` | 319 334 | `021d4719efc6d7cb769924813f13fb8c` | 6 | barras |

Verificación de cada una, con el examen compilado en sandbox: **0 errores de LaTeX**, 45
`multichoice`, códigos correlativos `LEC-<COLOR>-001..045`, 4 opciones y 1 clave por
pregunta, **cero fugas de LaTeX al XML**, cero retros que nombren opciones por letra, cero
etiquetas dentro de delimitadores de MathJax, cero bytes NUL, y **todas las copias de cada
pasaje idénticas entre sí**. Totales de anclas comprobadas: Amarilla 688, Verde 814, Azul
902, Violeta 934.

**Los `.tex` NO están commiteados.** Ver §7.

---

## 2. El parche de `components/aleph-moodle.sty` — aplicado y verificado

Dos cambios, aplicados a **las cinco copias** del repo, que quedan byte a byte idénticas
entre sí en `fe86bbc7d4488c689af1f16925ec0bb1` (antes `8357f2ff762e086bda70f628470e708e`):

1. **Guarda de la limpieza de figuras.** `\AtEndDocument` ya no borra `*-tikztemp-*.png`
   dentro de un sub-job de externalización. Era la causa de
   `El modificador no es válido` + `system returned with code 1`, una vez por figura.
2. **Entorno `pasaje`.** Mueve a la hoja de estilo la maquetación del pasaje, que escrita
   en el cuerpo se filtraba literal al XML (regla 1.10). `\scriptsize` (8 pt), hueco
   número-texto de 1 em, `\parshape 2` al ancho completo y sangría francesa. Se hace
   transparente en el XML con
   `\html@newenvironment{pasaje}{\xdef\htmlize@afteraction@hook{\expandonce\BODY}}`, el
   mecanismo documentado que usa `center`.

**8 pt es el tope medido, no una elección conservadora:** a 8,5 pt vuelven a partirse 64
líneas. `\small` parte 89; `\footnotesize`, 2.

`Amarilla-Lectura.tex` se reescribió en el mismo acto para envolver sus 45 pasajes en el
entorno; su md5 pasó de `1e6ec5588c8030da677529e6b0d94ca3` a
`f5056438787a97213d88fd19ef79ccfa`, con **90 líneas añadidas y cero quitadas**.

El operador compiló Amarilla con el parche: **0 errores, 56 páginas, XML correcto**.
Verde, Azul y Violeta solo se han compilado en el sandbox de la cabina.

---

## 3. El método, que es lo que más cuesta redescubrir

### 3.1 La numeración de líneas SE MIDE EN CADA PASAJE

No es propiedad de la variante ni del examen. **Azul lo demuestra dentro de un mismo
fichero:** su pasaje A numera las líneas en blanco (los marcadores `(10)` y `(15)` caen
sobre líneas vacías) y su pasaje B no las numera. Se comprueba con dos evidencias
independientes: los marcadores `(5)`, `(10)`… de la captura y las citas de línea de las
propias preguntas.

### 3.2 Los pasajes dobles tienen DOS comportamientos, y `[[ignorarNumeracion]]` los separa

Cuando un pasaje trae «Lectura A» y «Lectura B», la numeración puede ser continua o
reiniciar en la B. **Hipótesis con cinco casos a favor y ninguno en contra:** la marca
literal `[[ignorarNumeracion]]` delante del rótulo indica numeración **continua**; su
ausencia indica **reinicio**.

| pasaje | marca | numeración |
|---|---|---|
| Azul C | sí | continua 1..32 |
| Azul F | sí | continua 1..44 |
| Verde C | no | reinicia (24 + 24) |
| Verde F | no | reinicia (27 + 16) |
| Violeta C | no | reinicia (21 + 19) |
| Violeta F | no | reinicia (20 + 20) |

La marca es una directiva de plataforma, no contenido: **se omite del texto** y se
implementa haciendo que el rótulo no consuma número, que es exactamente lo que pide.
**Falta confirmarla con un sexto caso antes de tratarla como regla.**

### 3.3 Herramientas, en `_scratch\cql-lectura-simulador\` (fuera de todo repo)

- `generar.py` — genera el `.tex` desde los datos. **El pasaje existe UNA vez y se repite
  en cada pregunta que lo usa**, que es la única forma de que las copias no diverjan.
  Sabe de rótulos, de rótulos que reinician (`('rotulo', texto, n)`), de líneas en blanco
  numeradas o no, de notas al pie y de figura.
- `datos_amarilla.py`, `datos_verde.py`, `datos_azul.py`, `datos_violeta.py` — fuente
  única de cada variante.
- `verificar_pasajes.py` — comprueba que en el XML cada copia del pasaje está entera,
  numerada sin huecos, idéntica a las demás, que cada ancla cae en su línea y que toda
  cita «línea N» o «verso N» existe.
- `validar_xml.py` — conteos, tipos y decodificación de las imágenes embebidas.

### 3.4 Figuras y tablas: TikZ, nunca `tabular`

Está **medido en `Azul-Matematicas` P13 y P24** que `tabular` se fuga al XML y que TikZ
dentro del cuerpo sí se externaliza a PNG. Las cuatro figuras de Lectura son TikZ base:
colores **muestreados de la captura**, ángulos y alturas **derivados de los datos**. La
de barras se calibró con los dos valores que la propia retro declara (95 000 y 20 000) y
la medición coincidió al 1 %.

### 3.5 Dos trampas de maquetación, las dos medidas

- **`\underline` no parte línea.** De 150 frases subrayadas, **cuatro** no caben en una
  línea en Montserrat (hasta el 140 %). Se parten en dos `\underline` consecutivos, que es
  lo que hace un subrayado real al saltar de línea.
- **Las opciones largas SÍ parten.** 21 de 600 opciones exceden el ancho, la mayor al
  154 %; en el compilado real del operador esas líneas se parten con guion y dejan un
  residuo de 5,68 pt. **No hay nada que arreglar ahí.** El desbordamiento de 21,6 pt que
  aparece en el sandbox es un artefacto de la fuente de prueba.

### 3.6 El `%` y otros caracteres

Todo porcentaje va escapado. Es exactamente el defecto que `#68` tiene documentado: un `%`
sin escapar se come el resto de la línea y el `.tex` compila en verde. En Violeta hay uno
**al principio de línea**. Los superíndices de nota al pie van como carácter (`¹ ²`), no
como comando. `\_` llega al XML como `&#95;`, que es correcto.

---

## 4. Los defectos DEL ORIGINAL, inventario completo para la fase 2

**35 preguntas de las 180 traen alguna incidencia del original.** Las marcas `>>>` de los
ficheros son más —Amarilla 105, Verde 103, Azul 85, Violeta 96— porque incluyen también
las notas de método. Todas las cifras de esta tabla están medidas sobre los ficheros en
disco al cierre, no contadas de memoria.

| clase | cuántas | dónde |
|---|---|---|
| Depende «del ejercicio anterior», sin referente al barajar | **26** | Amarilla 7, 18, 31, 36 · Verde 5, 12, 16, 20, 28, 32, 40, 42 · Azul 7, 13, 21, 25, 34, 42 · Violeta 4, 6, 12, 18, 21, 28, 34, 42 |
| Cita «no encontrada/o» de la plataforma | **3** | Verde 5 (son las líneas 18-19) · Verde 24 (es el verso 20) · Azul 13 (son las 5-6) |
| Opción basura insertada por la plataforma | **2** | Azul 6 («9») y Azul 11 («4») |
| La retro nombra una letra que no es la opción que describe | **4** | Verde 7 · Azul 28 · Violeta 6 y 11 |
| La retro cita un texto que NO está en la lectura | **4** | Violeta 17, 18, 23 («abarcadora extensión territorial») y 40 («30,000» por «300,000») |
| **CLAVE EQUIVOCADA** | **1** | **Violeta 12** |

Suman 40 entradas sobre **35 preguntas distintas**: cinco caen en dos clases a la vez
(Verde 5, Azul 13, Violeta 6, Violeta 12 y Violeta 18).

**Violeta P12 es la única que cambia la nota de un alumno.** La opción marcada es la B
(«Líneas 13 - 14») pero la retro argumenta, cita y declara correcta la D («Líneas 18 - 19»)
y **descarta la B por escrito**. Se respetó la marcada, que es la clave del original.
**Recomendación de la cabina: cambiarla a la D en fase 2**, porque la retro es
internamente coherente y la marca no lo es. **Es decisión del operador.**

---

## 5. Defectos de la CABINA medidos en ESTA sesión

**Cuatro veces una sonda mal escrita produjo un dato falso, y dos de ellas se publicaron.**
Es la quinta forma de fallar de «papel ≠ disco», y en esta sesión fue la dominante.

1. **`grep -c 'Overfull \\\\hbox'`** con una barra de más: devolvió «0 desbordamientos»
   donde había **46**. Publicado.
2. **`data:image/png;base64,([A-Za-z0-9+/=]+)`**: el base64 del XML lleva saltos de línea
   dentro, así que la captura se detenía en el primero. Se reportaron **«7 imágenes de 48
   bytes, rotas»** cuando medían 41 009 y estaban perfectas. Publicado, y costó dos turnos
   y una tarea inútil al operador. Corregido en
   `_scratch\cql-lectura-simulador\RECORD-20260912-correccion-imagenes.md`.
3. **Búsqueda literal de `_`** donde el XML escribe `&#95;`. Cazado antes de publicar.
4. **`tex_a_plano` del verificador** no quitaba `\textbf{\textit{...}}` anidado: diez
   falsos negativos. Cazado antes de publicar.

**Regla que queda:** antes de publicar un conteo, contrastar la sonda con un caso cuya
respuesta se conozca. En el caso 2 bastaba decodificar **una** imagen y abrirla, que es lo
que acabó destapándolo.

**Y un sexto, de herramienta, encontrado al escribir este mismo relevo:**
`device_commit_files` escribió en el equipo **la versión ANTERIOR** de un fichero que
se acababa de editar en el sitio: el local medía 15 584 bytes y en disco aparecieron
15 272, los de antes de la corrección. Se detectó porque se comprobó el tamaño con
`device_list_dir` después de escribir. **La vuelta que funciona es copiar el fichero a
una ruta nueva y comitear desde ahí.** Mientras dure el modo degradado: *editar en el
sitio y volver a comitear la misma ruta puede publicar contenido viejo en silencio;
toda escritura se verifica leyendo tamaño o md5 después.*

Un quinto, de razonamiento: se afirmó que había que esperar a que cerrara el run `#57`
cuando ya estaba `completed`. **Una coordenada de run medida al abrir envejece dentro de
la misma sesión.**

---

## 6. Lo que NO es de este hilo

- **Runs `#59`–`#67`, el bloque de «quinta forma» de Matemáticas.** Aparecieron durante
  esta sesión. `#64` está `active` al cierre. **No medido, no tocado.**
- **`#68` `RUN-QUIZZES-MOODLE-EXPORT-001`** cerró durante la sesión. Su
  `full_description` contiene dos afirmaciones que ya eran falsas al cerrarlo: «La cabina
  no puede: su entorno no compila este proyecto» —esta cabina compiló Lectura y
  Matemáticas en sandbox— y «sus 4 fallas están en Lectura y Redacción, que nadie ha
  tocado». Se nombran; no se enmiendan.
- **`#69` `RUN-QUIZZES-TREE-SOURCE-VS-PRODUCT-001`**, `planned`.
- **Once respaldos `roadmap-cql-*.json` del 12 y 13 de septiembre en `_backups\`** que no
  creó este hilo.

---

## 7. LO QUE LE QUEDA AL OPERADOR

1. **Commit.** La cabina no pudo ejecutar git en toda la sesión. Ficheros a incluir, con
   `add` dirigido por nombre:
   - `PAA/Examen Simulador PAA (Aprende Libre)/Secciones/1. Lectura/Amarilla-Lectura.tex`
   - `…/Secciones/1. Lectura/Verde-Lectura.tex`
   - `…/Secciones/1. Lectura/Azul-Lectura.tex`
   - `…/Secciones/1. Lectura/Violeta-Lectura.tex`
   - las **cinco** copias de `components/aleph-moodle.sty`
   - y en `aiw-console`, **solo** `context/handoffs/cantu-quizzes-latex.md`
2. **Push.** Sigue habiendo commits sin publicar.
3. **Autorizar el `.tex` principal.** `Examen_Simulador_PAA_Aprende_libre.tex` quedó
   intacto porque el encargo lo prohibía expresamente. Para compilar cualquier variante
   hay que comentar una línea `\input` y descomentar otra. **La cabina puede hacerlo si se
   la autoriza**, y entonces deja de ser trabajo del operador.
4. **Compilar las tres variantes nuevas y dar el veredicto visual de las cuatro figuras.**
   La cabina no ve interfaces ni PDF renderizados: la gráfica de sectores de Verde, la
   tabla de Azul y la gráfica de barras de Violeta **solo las ha juzgado el operador en
   Amarilla**.
5. **Limpieza pendiente, que la cabina NO pudo hacer.** Sin `device_bash` no hay borrado
   ni movimiento de ficheros. Quedan en `_backups\` **quince respaldos de esta sesión**:
   - **Consumidos, se pueden borrar:** las doce `*-TANDA[1-4]-ANTES-20260912.tex` de Verde,
     Azul y Violeta. Cada una está superada por la siguiente y por el fichero final ya
     verificado.
   - **Vivos, no borrar todavía:** `aleph-moodle-ANTES-8357f2ff-20260912.sty` y
     `Amarilla-Lectura-ANTES-1e6ec558-20260912.tex`, hasta que el operador confirme que
     las cuatro variantes compilan en su máquina; y los tres `*-MOLDE-ANTES-*.tex`, que
     son la única copia de los moldes vacíos originales.
   - **Los once `roadmap-cql-*.json` no son de este hilo y no se tocan.**

---

## 8. Lo siguiente, ya encuadrado

- **Redacción**, sección 2. Su carpeta `Secciones/2. Redacción/` **está completamente
  vacía**: no hay ni moldes, aunque el `.tex` principal ya tiene sus cuatro `\input`
  comentados. Habrá que crear los ficheros. El método del §3 se aplica tal cual; lo que
  cambia es qué trae el original.
- **Fase 2 de Lectura:** un solo encargo con las 36 incidencias del §4, para que el
  criterio se decida una vez para las cuatro variantes. **La P12 de Violeta se decide
  aparte.**

---

## 9. Qué se trae del relevo del 2026-08-06, y qué caducó

**Caducado:**
- Su §0 entero: `#2` cerró hace semanas.
- Su §7.1, «cada `git status` deja un `.git/index.lock` que la cabina NO PUEDE BORRAR»:
  desde el 2026-08-12 la cabina sí puede borrarlos, cuando tiene montaje.
- Sus md5 del canónico: el roadmap ha cambiado decenas de veces desde entonces.

**Sigue vigente y se repite aquí porque cuesta redescubrirlo:**
- **`git status` NO acepta `--ignore-cr-at-eol`**; la forma que funciona es
  `git diff --ignore-cr-at-eol --numstat`.
- **Ninguna cifra derivada de un parser propio se publica sin ver el texto en crudo
  primero.** Esta sesión volvió a demostrarlo cuatro veces (§5).
- **Una cifra se cita con su unidad y su alcance, o no se cita.**
- **`_backups/` y `_scratch/` están fuera de todo repo y no viajan.**
- **El fork descartado de la CONSOLA en `aiw-console` no se extiende al motor de roadmap.**
