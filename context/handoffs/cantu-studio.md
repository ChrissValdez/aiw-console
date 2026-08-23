# HANDOFF — hilo `cantu-studio` (el proyecto)

> Escrito por la cabina el **2026-08-22**, al cerrar la sesión de `#131`.
> **Sustituye al relevo del 2026-08-20.**
>
> **Todo lo de aquí está medido y lleva fecha. Contrástalo contra el canónico al abrir. Gana el
> disco.**

---

## ⚠ LO PRIMERO: DERIVA LA RUTA Y PRUEBA LA CAPACIDAD

La ruta de montaje **cambia entre sesiones**. No la heredes. Prueba que se lee el workspace, que
`git log` responde, **que el borrado está habilitado** y que `.git` es escribible.

**Comprueba `.git/index.lock` en los cinco repos con `ls`, nunca corriendo git.** Esta sesión no
apareció ninguno; la anterior sí, en un repo que la cabina no había tocado. **Compruébalo igual.**

### LOS LÍMITES DE LA CABINA, RE-MEDIDOS EL 2026-08-22

1. **EL TOPE POR LLAMADA SON ~120–178 SEGUNDOS.** Esta sesión lo tocó **tres veces**, y una de
   ellas **hizo daño** — ver la sección del arnés. La suite completa **NO CABE**: la mide el
   taller.
2. **`--test-concurrency=1` NO ES OPCIONAL.**
3. **EL BORRADO SE PIDE Y FUNCIONA.** `rm` falla; la herramienta de permiso lo habilita por
   carpeta y persiste. Se pide UNA vez al arrancar.
4. **`/tmp` SÍ ERA ESCRIBIBLE esta sesión**, al contrario de lo que decía el relevo anterior.
   Aun así usa `_scratch/`: es barato y no depende de la medición.
5. **MENSAJES DE COMMIT Y SCRIPTS, POR FICHERO.** Nunca heredoc con backticks, nunca por línea.
6. **`grep -r` SOBRE `src` Y `tools` SIN EXCLUIR `node_modules` SE COME LA LLAMADA ENTERA.**
   Pasó esta sesión, con el aviso ya escrito delante. **Usa la herramienta de búsqueda.**
7. **NUEVO — LA CONSOLA NO SOBREVIVE ENTRE LLAMADAS.** Cada `bash` es un proceso aislado: un
   `serve.mjs` lanzado en una llamada está muerto en la siguiente. **Levanta y haz el POST en la
   MISMA llamada.** Pasó, y costó un intento.

---

## ⚠⚠ EL FALLO MÁS CARO DE ESTA SESIÓN, Y FUE DE LA CABINA

**LA CABINA CORRIÓ EL ARNÉS DE MUTACIÓN PARA VERIFICAR UNA CIFRA, Y LO MATÓ POR TIMEOUT.**

El arnés guarda los originales **en memoria** y restaura al cerrar. Al morir el proceso, **dejó
viva una mutación**: `conceptGridJAMAS` en el despachador del formulario.

**Y lo peligroso es cómo NO se vio:** el fichero ya estaba modificado, así que **el `git status`
seguía diciendo exactamente lo mismo — 17 entradas, ninguna nueva**. Solo se detectó porque la
cabina volvió a correr las guardas **después**. Si no llega a repetir esa medición, habría
commiteado el árbol mutado.

> **REGLA: la cabina NO corre el arnés de mutación. Es del taller, tarda más que su tope, y
> matarlo a mitad deja código mutado que el `git status` no delata.**
>
> **Y la de fondo: después de tocar cualquier cosa, la comprobación se REPITE. Un verde de antes
> del toque no vale.**

---

## ⚠⚠ LOS TRES FALLOS DE COMMIT DE LA SESIÓN ANTERIOR — la regla siguió funcionando

Esta sesión hizo **seis commits, todos completos**, derivando siempre del `git status`:

    FILES=$(git --no-optional-locks status --porcelain | grep -vE "\.aiw/|\.project/" | awk '{print $NF}')
    echo "$FILES" | xargs git --no-optional-locks add

**En `aiw-console` hay que ACOTAR además al hilo**: `| grep -v '^context/aiw/'`. Esa carpeta es
del hilo `aiw` y lleva toda la sesión sin versionar. **No la toques.**

**Y sigue midiendo el `git status` al abrir cada entrega.** Esta sesión confirmó por ahí que el
corpus estaba intacto —**cero ficheros de `src/content` o de `fixtures/corpus` en el status**—,
que es una verificación de 63 árboles gratis y por ausencia.

---

## ⚠⚠ LA VÍA DE ESCRITURA DEL CANÓNICO ES LA CONSOLA

    cd projects/aiw-console
    PC_PORT=<libre> node project-console/serve.mjs > /dev/null 2>&1 &
    POST http://127.0.0.1:<puerto>/projects/cantu-studio/__project-console/roadmap/edit
      { op, args:{...}, apply:false }                    # dry-run -> remap + baseline
      { op, args:{...}, apply:true, baseline }           # compare-and-swap

**Levanta el servidor y haz el POST en la MISMA llamada.** `serve.mjs` re-emite los 7 artefactos
de `.project/` él solo y corre `checkInvariants` tras cada escritura.

**Argumentos verificados:** `set-status` → `run`, `status`, `closeoutResult` · `set-text` →
`targetType:"run"`, `targetId`, `fullDescription` · `insert` → `runId`, `title`, `summary`,
`fullDescription` + `before`/`after` · `move` → `run` + `toOrder`.

**El canónico es `.aiw/roadmap/roadmap.json`** — con `.aiw/`. Forma `objectives[].phases[].runs[]`.

### EL VALIDADOR: cuál es y cuál NO

**NO uses `tools/project-console/validate-project-console-state.mjs`.** Reconcilia otro árbol y
sobre `cantu-studio` devuelve **25 líneas de rojo**, incluida una que dice que falta el fichero
que acabas de escribir. La cabina lo corrió y publicó el rojo antes de darse cuenta.

**El que gobierna es `checkInvariants` del motor de `aiw-console`**, con `externalRunIds`
compuestos como los compone `serve.mjs`. **Los `root` del registro se resuelven contra
`project-console/`, no contra la raíz del workspace** — resolverlos mal recoge **cero** externos y
fabrica un rojo por dependencia huérfana que no existe. Bien resueltos: **155 externos, cero
errores.**

> **Las dos caras del mismo defecto en una sesión: una sonda equivocada produce un verde, y
> también produce un rojo. Ninguno de los dos se cuestiona solo.**

---

## LAS OCHO REGLAS DEL OPERADOR — permanentes

1. **NO SE LE RECUERDA EL PUSH.** Nunca.
2. **TODA PETICIÓN DE REVISIÓN VA EN LISTA NUMERADA DE PASOS CORTOS.** Uno por línea.
3. **NO SE LE RECOMIENDA MODELO NI ESFUERZO EN LA MISMA SESIÓN. PERO LA SESIÓN SE DECLARA
   SIEMPRE, en las dos direcciones.**
4. **EL TICKET NO SE ANUNCIA: SE ENTREGA**, en el mismo turno en que se abre el run.
5. **UN RUN NUEVO SE LANZA EN SESIÓN NUEVA; las rondas de corrección, en la misma. EL CORTE ES EL
   `run_id`, NO EL TAMAÑO.** En sesión nueva SÍ van modelo y esfuerzo.
6. **EL MATERIAL DE QA LO PRODUCE LA CABINA Y LO PASA POR LA PUERTA REAL** antes de darlo.
7. **UN TICKET NO LLEVA UNA VALLA DE CÓDIGO DENTRO DE OTRA.** Cuatro espacios de indentación, o
   valla exterior de cuatro tildes. **Y se relee entero buscando triples antes de enviarlo.**
8. **DIBÚJALE LAS OPCIONES ANTES DE PEDIRLE QUE DECIDA.** *«tengo que verlo visual para
   entenderlo».* Esta sesión se le dibujó **tres veces** y las tres decidió en una línea.

---

## QUÉ SIGUE — lo primero al abrir

**CERO RUNS ACTIVOS al cerrar.** El siguiente es **`#132`**,
`RUN-CANTU-SLIDE-TABLE-ADMIT-AND-IMPLEMENT-001` — «Tabla».

**Al cerrar esta sesión: 153 runs, 132 completados, 21 planned, densidad `1..153`, cero activos,
`history=132 · ready_next=7 · later=14`.** Contrástalo.

**Quedan DOS componentes por admitir** —Tabla y Cálculo aritmético— **y DOS tipos de diapositiva
por exponer** —Procedimiento matemático y Jerarquía.

### `#132` «Tabla» tiene DOS cosas medidas que le ahorran una ronda

1. **`case 'table'` YA EXISTE en `renderColumnsSlide.js`.** A diferencia de `conceptGrid`, el
   motor ya la pinta: **es plantilla pura de `split`, sin abrir motor.**
2. **El nombre YA EXISTE**: `blockCatalog.js` la rotula **«Tabla»**. Como con `split` y con
   `conceptGrid`: **la compuerta de nombre se cierra midiendo, no proponiendo.**
3. **Su trampa está nombrada desde el plan:** el esquema debe exigir **celdas de objeto** — el
   motor **revienta** con las celdas de cadena que usa Web. Es la incompatibilidad cruzada más
   afilada del proyecto.

---

## LO QUE ESTA SESIÓN CONSTRUYÓ, Y GOBIERNA LO QUE VIENE

### 1 · EL PATRÓN «CAPACIDAD EN LOS HERMANOS, CERRADA EN ESTE»

`conceptGrid` fue el único de seis componentes de celda **sin paleta global**, y no por diseño:
por **residuo de frontera de run**. La frontera era correcta y el resultado era una divergencia
que el operador vio en la primera QA.

> **REGLA: antes de cerrar un run de admisión, pregúntate qué tienen los hermanos que este no.
> Si la respuesta es «lo mismo pero su run se lo dio», el operador lo va a ver.**

### 2 · EL PATRÓN DE MÓDULOS: DUPLICAR Y ATAR, NO COMPARTIR

**Medido el 2026-08-22 y es de arquitectura:** **cero imports cruzan entre `src/builders/` y
`editor-ui/`.** Los motores son CommonJS de Core; el editor es ESM empaquetado. `tokens.js` lo
importan los motores y **los tests**, pero **ningún código de producción de `author-lite`**.

**El patrón de la casa es duplicar y atar con una guarda que ABRE el fichero del motor y le
extrae la lista por expresión regular.** Y un record anterior dejó la puerta abierta: *«Si el
operador prefiere el import directo, es una decisión de arquitectura y la dice él.»*

**El operador eligió GUARDA.** No propongas módulo compartido sin decirle que es arquitectura.

### 3 · LOS SIETE SEPARADORES, Y LA TRAMPA DE LOS CARACTERES GEMELOS

Las dos listas de motor son ahora **idénticas**: `['+', '-', '=', '>', '<', '∙', 'x']`. El `·`
**U+00B7** salió; el que queda es `∙` **U+2219**. **Se ven casi iguales y no son el mismo.**

### 4 · EL DESPLEGABLE DE SIGNOS SE MONTA *ENTRE* TÉRMINOS

`{grupo.sign ? ... : null}` — el primer término no tiene signo delante. **Con un solo término no
aparece ninguno**, igual que Web. **Esto produjo la falsa alarma que abrió el cierre**, porque el
packet no lo decía.

> **REGLA NUEVA PARA TODA QA: un paso que mira un control tiene que decir CUÁNDO ESE CONTROL NO
> DEBE APARECER. Si no, fabrica un rojo.**

---

## LO QUE HAY QUE SEGUIR EXIGIENDO AL TALLER, PORQUE RINDE

- **EL ARNÉS DE MUTACIÓN.** Esta sesión destapó **cuatro guardas flojas** del propio taller —dos
  miraban comentarios en vez de código— y **retiró una defensa inalcanzable**, la quinta
  declarada del proyecto. **PERO EXIGE SU ARTEFACTO**: van **dos rondas seguidas** en que el
  taller publica «46 de 46» **sin dejar salida en disco**, y su script declara **47** entradas.
- **CONDUCIR, NO LEER.** El defecto del `fallbackId` —el desplegable diciendo un color y la
  tarjeta pintando otro— **solo apareció conduciendo el navegador**.
- **QUE CADA GUARDA DECLARE SI PRUEBA EL MECANISMO O LA PANTALLA.**
- **QUE LA SONDA SE CONTRADIGA CON EL CENSO Y GANE EL CENSO.**
- **EL CRITERIO DE LAS CINCO COSAS**, y si alguna no aplica, **que se declare midiendo**.
- **QUE DECLARE SI LA PÁGINA DE QA NECESITA RED.** La de la ronda 0 la necesitaba y el packet la
  presentaba como doble clic: sin internet, **0 nodos KaTeX y 25 delimitadores en crudo**, y dos
  pasos habrían dado MAL por causa ajena.

---

## LA SUITE

    node --test --test-concurrency=1 "tools/author-lite/compiler-api/tests/*.test.mjs" \
      "tools/dev/tests/*.test.mjs" "tools/roadmap/tests/*.test.mjs"

**Al cerrar: `1880 · 1875 pasan · 5 fallan`** — cifra del **taller**. Los cinco son previos, en
`tools/roadmap/tests/`, por la dependencia huérfana del canónico. **Ninguno se toca.**

**LA CABINA NO PUEDE MEDIRLA.** Mide subconjuntos —esta sesión midió 133 y 28— y declara que la
completa es del taller.

---

## ABIERTO Y SIN DUEÑO — todo nombrado, nada reparado

- **EL RECORTE DE LA FILA 4 Y EL AGUJERO DEL MOTOR DE AJUSTE**, 150–405 px. Del mecanismo.
- **`.j-anatomy-display { flex: 0 0 300px }`** — 300 de los ~500 px que pide la tarjeta no ceden.
- **EL TOPE DE CINCO TÉRMINOS**: el formulario de diapositiva no lo comprueba y el esquema rebota
  el sexto **después**. Web sí lo comprueba. **Fallo real, fuera por decisión del operador.**
- **EL `fallbackId` SIN GUARDA**: si alguien lo devuelve a `'ctx'`, la suite no se entera.
- **EL TONO QUE NO COINCIDE**: item importado con `variant` y sin color elegido — el desplegable
  muestra el hex de la paleta y la tarjeta pinta el del mapa privado (`focus`: `#B69F58` contra
  `#C2B280`). Declarado en el código.
- **LA DIVERGENCIA DE DELIMITADORES**: Web respeta el del autor, diapositiva envuelve siempre.
- **EL VÍDEO EN SU CELDA.** **Un vídeo no encoge de letra.**
- **TRES COMPONENTES CON LA TRAMPA DE LA CADENA VACÍA:** `card.variant`, `callout.accentColor`,
  `rule.accentColor`. `split` y `conceptGrid` ya la cerraron.
- **LAS 16 MEDIDAS DE ARMAZÓN** en píxeles fijos, 12 de la Tarjeta.
- **`badgeTextVariant`**, el `<details>` «LaTeX avanzado» y el `InlineFormulaField` en
  «Contenido» — los tres fuera **por decisión del operador**.
- **«Extra grande» contra «muy grande»**, que sigue siendo suyo.
- **`CLAUDE.md` describe un árbol `docs/author-lite/` que NO EXISTE.**

---

## LA SUPERFICIE QUE SOLO JUZGA SU OJO

**El proyecto no tiene renderizador de React y la cabina no ve interfaces.**

**Y hay una clase de cosa que la cabina NO PUEDE VERIFICAR NUNCA: su paleta configurada.** No
vive en el repositorio. El packet de la ronda 1 le prometió ver «Malva», «Azul acero», «Verde
Jade», «Dorado Arena» — **esos rótulos no existen en el código**, que dice «Morado», «Azul»,
«Dorado». Puede que su paleta sí los tenga. **La cabina lo declaró como no verificable y le dijo
que lo que importaba del paso era que fuese SU paleta, no los nombres.**

> **Cuando un paso de QA nombre algo que vive fuera del montaje, dilo. Un nombre que la cabina no
> puede medir se marca, no se afirma.**

---

## CÓMO CERRÓ `#131`, PARA QUE NO SE CUENTE MAL

**Veredicto GLOBAL, no paso a paso.** *«se ve bien pass»*, confirmado a pregunta de la cabina que
cubría los quince pasos. **Ningún paso individual tiene BIEN/MAL/VETO escrito**, y el
`closeout_result` lo declara: si mañana aparece un defecto en cualquiera de los quince, **no se
puede afirmar que la QA lo aprobó**.

**Y el veredicto que abrió la ronda 1 fue el que más rindió de toda la sesión**: dos observaciones
suyas de treinta segundos destaparon una divergencia de siete caracteres entre motores y el único
componente de seis sin paleta global.
