# HANDOFF — hilo `cantu-studio` (el proyecto)

> Escrito por la cabina el **2026-08-18**, al cerrar la sesión que llevó `#108` → `#115`.
> **Sustituye al relevo del 2026-08-17.**
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el canónico al abrir. Gana el
> disco.**

---

## ⚠ LO PRIMERO: DERIVA LA RUTA Y PRUEBA LA CAPACIDAD

La ruta de montaje **cambia entre sesiones**. No la heredes. Prueba que se lee el workspace, que
`git log` responde, **que el borrado está habilitado** y que `.git` es escribible.

**Comprueba `.git/index.lock` en los cinco repos con `ls`, nunca corriendo git.** En esta sesión
no apareció ninguno **pese a que un `diff` murió por timeout** — la tabla dice que eso deja lock,
y esa vez no lo dejó. **Compruébalo igual: la tabla no es una garantía.**

### LOS LÍMITES DE LA CABINA, RE-MEDIDOS

1. **EL TOPE POR LLAMADA SON ~178 SEGUNDOS.** Esta sesión lo tocó una vez, agrupando `status` y
   `diff`. **Las mediciones lentas van solas.**
2. **`--test-concurrency=1` NO ES OPCIONAL.** Sin él la contención produce rojos falsos.
3. **EL BORRADO SE PIDE Y FUNCIONA.** `rm` falla con `Operation not permitted` y se pide con la
   herramienta; es por carpeta y persiste.
4. **`/tmp` NO ES ESCRIBIBLE.** Los auxiliares van a `_scratch/`.
5. **NUEVO — LOS MENSAJES DE COMMIT VAN POR FICHERO, NUNCA POR LÍNEA DE SHELL.** Esta sesión
   perdió una palabra de un mensaje porque el shell interpretó unas comillas invertidas. Se
   enmendó porque el commit **no estaba publicado** — se comprobó antes con `branch -r --contains`.

---

## ⚠⚠ LA VÍA DE ESCRITURA DEL CANÓNICO ES LA CONSOLA

    cd projects/aiw-console
    PC_PORT=<libre> node project-console/serve.mjs > <ruta en _scratch>/pc.log 2>&1 &
    POST http://127.0.0.1:<puerto>/projects/cantu-studio/__project-console/roadmap/edit
      { op, args:{...}, apply:false }                    # dry-run -> remap + baseline
      { op, args:{...}, apply:true, baseline }           # compare-and-swap

**Levanta el servidor y haz el POST en la misma llamada**: los procesos en segundo plano no
sobreviven entre llamadas. `serve.mjs` re-emite los 7 artefactos de `.project/` él solo.

**Nombres de argumento verificados esta sesión:** `set-status` → `run`, `status`,
`closeoutResult` · `set-text` → `targetType:"run"`, `targetId`, `title`, `summary`,
`fullDescription` · `insert` → `runId`, `title`, `summary`, `fullDescription` + `before`/`after`
· `move` → `run` + `toOrder`.

**El canónico es `.aiw/roadmap/roadmap.json`** — con `.aiw/`, y **el `aiw/` sin punto de la raíz
del workspace es OTRO repo**. Forma `objectives[].phases[].runs[]`.

---

## LAS CUATRO REGLAS DE OPERACIÓN DEL OPERADOR — permanentes

**Son cuatro y tienen la MISMA FORMA: retiran de la respuesta trabajo que la cabina le estaba
pasando a él.** Sus récords están en `context/cantu-studio/records/`.

1. **NO SE LE RECUERDA EL PUSH.** Nunca, ni al cerrar sesión.
2. **TODA PETICIÓN DE REVISIÓN VA EN LISTA NUMERADA DE PASOS CORTOS.** Uno por línea.
3. **NO SE LE RECOMIENDA MODELO NI ESFUERZO EN LA MISMA SESIÓN** — no puede cambiarlos sin
   reiniciar. **PERO LA SESIÓN SE DECLARA SIEMPRE**, en las dos direcciones: «misma sesión» o
   «sesión nueva». En sesión nueva sí van modelo y esfuerzo, porque ahí los elige.
4. **EL TICKET NO SE ANUNCIA: SE ENTREGA.** Nada de «dime cuándo la abras y te lo paso». Sólo se
   retiene si falta una decisión suya — y si esa decisión es barata de revertir, se elige, se
   entrega el ticket igual y la elección va marcada dentro como inferencia vetable.

**El patrón, que es lo único que hay que recordar de las cuatro:** antes de escribir una línea
dirigida al operador, preguntarse **si le deja trabajo que la cabina podía haber hecho**. Si se
lo deja, sobra — **y la prueba es por línea, no por bloque**.

---

## QUÉ SIGUE — lo primero al abrir

**CERO RUNS ACTIVOS al cerrar.** El siguiente es **`#116`**,
`RUN-CANTU-SLIDE-BODY-TEXT-OWN-SCALES-001` — «Narrativa» y «Lista con etiquetas» reciben su
propia escala de texto anclada en lo de hoy, **y ahí se apaga su «Automático»**, que son las dos
últimas superficies que lo conservan.

**Ese run lleva una deuda declarada dentro:** «Lista con etiquetas» **está contenido y el
operador no puede ni insertarlo**, así que **la mitad de su QA no se puede mirar** hasta que se
levante su contención. Está escrito en el run y hay que decirlo al entregar la QA.

**Detrás, por orden:** `#117` la separación bajo el título de la diapositiva — **que absorbe la
retirada del espaciado de Narrativa**, por decisión del operador · `#118` la convención
campo→tamaño en todos los formularios · `#119` Lista con etiquetas · y el resto de la cadena.

**Contrasta las cifras contra el canónico al abrir. Al cerrar esta sesión: 146 runs, 116
completados, densidad `1..146`, cero activos.**

---

## LA REGLA QUE EL OPERADOR PUSO Y GOBIERNA TODAS LAS ESCALAS

> **«Mediano» significa «lo que ya ves».** En toda escala de tamaño de diapositiva, el peldaño
> mediano vale **exactamente** lo que esa superficie pinta hoy sin campo.

Sus palabras: *«El tamaño mediano deberia ser el tamaño automatico acual hay que actualizar la
escalera de tamaños para esto»*.

**Es lo que hace que apagar «Automático» sea seguro sin negociar superficie por superficie.** Y
hay prueba de que ya era cierta antes de nombrarse: **las escalas que se pudieron apagar sin
mover un píxel eran justo las que se habían anclado así.**

---

## LA LECCIÓN MÁS CARA DE LA SESIÓN: EL DEFECTO VIVE EN EL VALOR POR DEFECTO

El operador tuvo que pedir **dos veces** que se quitara «Automático». No porque se olvidara a
nadie: **porque el control nacía con la opción encendida**, y la reparación anterior se acotó a
una superficie a propósito — *«quien apaga la opción es el llamador, uno por uno»*.

**Cada componente nuevo nacía con el defecto.** Y una prueba lo **congelaba**: fijaba
`automatico = true` como defecto, protegiendo el alcance de su run **y a la vez la fábrica de
defectos**.

**Generaliza:** cuando una reparación se acote a propósito, **preguntarse si el defecto vive en
el valor por defecto**. Si vive ahí, acotarla garantiza que vuelva.

---

## LA CABINA SE CONTRADIJO A SÍ MISMA CUATRO VECES, Y LAS CUATRO LAS CAZÓ EL TALLER

**No es anécdota: es el patrón de fallo dominante de la cabina en esta sesión.**

1. **`#108`** — el ticket decía «la condición de la cola compartida» y la enmienda decía
   «gobernada por la lista». Seguir la enmienda habría roto dos pruebas ajenas.
2. **`#110`** — el ticket ordenaba volver a un total de pruebas congelado **y** añadir una guarda.
3. **`#113`** — ordenaba dar la escalera al título **y** no tocar el esquema. **La distinción que
   faltaba:** sobre el mismo fichero, **retirar** un campo es sustractivo y rompe contrato;
   **añadir** uno es aditivo. Una regla escrita para proteger de lo primero bloqueó lo segundo.
4. **`#115`** — pedía escribir dentro de un fichero que el mismo ticket declaraba fuera de alcance.

**Antes de emitir: leer el ticket entero buscando órdenes que no puedan cumplirse a la vez.**

---

## Y EL OTRO PATRÓN: SONDAS QUE NO DISTINGUEN

**Le falló a la cabina seis o siete veces esta sesión.** Casos: contar apariciones creyendo que
son llamadas (incluida la línea del `import`); `grep -r` arrastrando `node_modules` hasta agotar
el tiempo; `head -3` truncando una lista y casi publicando una discrepancia inexistente; buscar
`automatico={` sin ver el `automatico` a secas; una regex sobre el literal de un ítem que **no
puede** ver un campo que entra por `spread` 40 líneas más arriba.

**Y le falló también al taller, tres veces, cazadas por su propio método:** una guarda que
casaba con la prosa de un comentario; otra que casaba con la hoja de estilo en vez del elemento
pintado; una mutación que moría al cargar y ponía roja la suite sin probar nada.

**Antes de publicar el resultado de una sonda, preguntarse si la sonda puede ver lo que se
busca.** Y **si el resultado viene de una lista, si estaba completa**.

---

## LA CORRECCIÓN DE `C5 [SENTINEL]` — el relevo anterior lo encuadraba mal

**El relevo llevaba dos sesiones diciendo que `C5` «exige cero runs activos» y «se enciende y se
apaga con el ciclo».** Medido: su título e intención son **«the canonical file was never written
by this suite»** — es un **centinela de fuga**, no un semáforo del ciclo. Su aserción **sí**
cuenta runs activos, así que el hecho no era falso; **el encuadre sí**, y llevó a la cabina a
predecir un número en un ticket en vez de leer un propósito.

---

## LO QUE FUNCIONÓ Y HAY QUE SEGUIR HACIENDO

- **DIBUJAR OPCIONES, NO DESCRIBIRLAS.** Volvió a rendir dos veces: los glifos y las siete
  conductas de desborde. **Un HTML de un fichero, opciones lado a lado, al tamaño real y
  ampliadas.**
- **LA DISCIPLINA DE MUTACIÓN.** Cada guarda se ve **roja** por mutación y se restaura. Cazó
  guardas que pasaban con el motor roto.
- **VERIFICAR CONTRA LA SALIDA ANTERIOR, NO CONTRA LA PROPIA.** En `#115` las portadas se
  compararon contra los árboles fijados del repositorio.
- **LA PARADA DE ANÁLISIS.** Se usó una vez y **desmintió la mitad de la premisa de su run**: la
  regla que iba a implementarse **ya existía en las dos puertas**.
- **PARAR SIN ESCRIBIR NI LAS GUARDAS** cuando falta una decisión del operador. Escribirlas
  habría fijado lo que él no había decidido.
- **FIJAR ES UN ACTO.** Las pruebas y árboles que se ponen rojos se **enmiendan con su nota**,
  nunca se regeneran en silencio.

---

## LA SUITE

    node --test --test-concurrency=1 "tools/author-lite/compiler-api/tests/*.test.mjs" \
      "tools/dev/tests/*.test.mjs" "tools/roadmap/tests/*.test.mjs"

**Al cerrar: `1639 · 1634 pasan · 5 fallan`.** Los cinco son previos y están todos en
`tools/roadmap/tests/`, por una **dependencia huérfana del canónico real** —
`RUN-JAME-DOCUMENTATION-METHODOLOGY-ROADMAP-FIRST-001` → `RUN-CANTU-ROADMAP-CONTENT-AUDIT-001`,
que no existe — más `clearProgress B7` y el centinela `C5`. **Ninguno se toca.**

**El objetivo de todo run es NINGUNA REGRESIÓN, no un total congelado.**

---

## ABIERTO Y SIN DUEÑO — nombrado, no reparado

- **«Extra grande» contra «muy grande».** El operador lo ha escrito **dos veces**. La lista es
  compartida por Slide y Web, y una prueba la fija verbatim. **Es suyo y no tiene run.**
- **Una etiqueta de sólo espacios pinta una píldora vacía.** Inalcanzable desde el editor; cuesta
  un `trim`; mueve 0 árboles.
- **El suelo del dibujo del gráfico en la fila 4.** En cuatro filas el armazón se lleva casi toda
  la banda. Se alivió al quitar la descripción, **no se cerró**.
- **El ocupante anclado fuera del rectángulo** al fusionar: hoy inalcanzable desde el mapa.
- **El rótulo de éxito de la fusión**: publicado, **no consta elegido**.
- **`dimmed`/`dimmedOpacity`**, `handleDuplicateDraft`, la rama `isLessonGated`, las tildes rotas
  del esquema, `SlidePreviewPanel.jsx` muerto, el alias `columns`, y `dist/` sin limpiar.
- **Tres textos fuera de alcance quedaron falsos y nombrados** en `#115`.

---

## LA SUPERFICIE QUE SÓLO JUZGA EL OJO DEL OPERADOR

**Van ONCE runs consecutivos.** El proyecto no tiene renderizador de React y la cabina no ve
interfaces. **Dos de ellos cerraron con QA parcial, seguidos.**

**Y hay un fallo de la cabina que se repitió y no debe volver:** escribió un paso de QA sobre un
componente que el operador **no puede ni insertar**. **Antes de pedir un paso, comprobar que es
ejecutable.**

---

## AL CERRAR SESIÓN

**El operador lo pidió y es permanente:** la cabina **actualiza este handoff Y entrega el prompt
de reinicio**, sin que se lo pidan. El prompt vive en
`context/cantu-studio/PROMPT-DE-REINICIO.md`.
